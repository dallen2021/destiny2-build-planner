const axios = require("axios");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const zlib = require("zlib");
const { promisify } = require("util");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);

const MANIFEST_URL = "https://www.bungie.net/Platform/Destiny2/Manifest/";
const BUNGIE_ROOT = "https://www.bungie.net";
const MANIFEST_DIR = path.join(__dirname, "..", "data", "manifest");
const MANIFEST_VERSION_FILE = path.join(MANIFEST_DIR, "version.json");

let db = null;
let manifestVersion = null;
let definitionCache = new Map();
const CACHE_MAX_SIZE = 1000;
const CACHE_TTL = 3600000; // 1 hour

// Ensure manifest directory exists
async function ensureManifestDir() {
  try {
    await fs.access(MANIFEST_DIR);
  } catch {
    await fs.mkdir(MANIFEST_DIR, { recursive: true });
  }
}

// Get current manifest version
async function getCurrentManifestVersion() {
  try {
    const data = await fs.readFile(MANIFEST_VERSION_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Save manifest version
async function saveManifestVersion(version) {
  await fs.writeFile(MANIFEST_VERSION_FILE, JSON.stringify(version, null, 2));
}

// Download file with progress and retry logic
async function downloadFile(url, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "stream",
        headers: {
          "X-API-Key": process.env.BUNGIE_API_KEY,
        },
        timeout: 60000, // 60 second timeout
      });

      const totalLength = response.headers["content-length"];
      let downloaded = 0;

      response.data.on("data", (chunk) => {
        downloaded += chunk.length;
        const percentage = ((downloaded / totalLength) * 100).toFixed(2);
        process.stdout.write(
          `Downloading manifest: ${percentage}% (Attempt ${attempt}/${retries})\r`
        );
      });

      // Create write stream
      const writer = fsSync.createWriteStream(outputPath);

      // Pipe the response to file
      await pipeline(response.data, writer);

      console.log("\nManifest download complete");
      return; // Success, exit the retry loop
    } catch (error) {
      console.error(`\nDownload attempt ${attempt} failed:`, error.message);
      if (attempt === retries) {
        throw new Error(
          `Failed to download manifest after ${retries} attempts`
        );
      }
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// Extract SQLite database from zip
async function extractDatabase(zipPath, outputPath) {
  const AdmZip = require("adm-zip");
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();

  // Find the .content file (SQLite database)
  const dbEntry = entries.find((entry) => entry.entryName.endsWith(".content"));

  if (!dbEntry) {
    throw new Error("No database file found in manifest zip");
  }

  // Extract to output path
  zip.extractEntryTo(dbEntry, path.dirname(outputPath), false, true);

  // Rename to proper name
  const extractedPath = path.join(path.dirname(outputPath), dbEntry.entryName);
  await fs.rename(extractedPath, outputPath);

  console.log("Manifest database extracted");
}

// Optimize database with indexes
async function optimizeDatabase(dbPath) {
  console.log("Optimizing database with indexes...");
  const database = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  try {
    // Create indexes for commonly queried tables
    const indexQueries = [
      "CREATE INDEX IF NOT EXISTS idx_inventory_items ON DestinyInventoryItemDefinition(id)",
      "CREATE INDEX IF NOT EXISTS idx_stats ON DestinyStatDefinition(id)",
      "CREATE INDEX IF NOT EXISTS idx_sockets ON DestinySocketTypeDefinition(id)",
      "CREATE INDEX IF NOT EXISTS idx_buckets ON DestinyInventoryBucketDefinition(id)",
      "CREATE INDEX IF NOT EXISTS idx_classes ON DestinyClassDefinition(id)",
    ];

    for (const query of indexQueries) {
      await database.exec(query);
    }

    // Analyze database for query optimization
    await database.exec("ANALYZE");

    console.log("Database optimization complete");
  } finally {
    await database.close();
  }
}

// Update manifest if needed
async function updateManifest() {
  try {
    await ensureManifestDir();

    // Get manifest info from Bungie
    const response = await axios.get(MANIFEST_URL, {
      headers: {
        "X-API-Key": process.env.BUNGIE_API_KEY,
      },
      timeout: 10000,
    });

    const manifest = response.data.Response;
    const currentVersion = manifest.version;
    const savedVersion = await getCurrentManifestVersion();

    // Check if update is needed
    if (savedVersion && savedVersion.version === currentVersion) {
      console.log("Manifest is up to date");
      manifestVersion = savedVersion;
      return false;
    }

    console.log(
      `Updating manifest from version ${savedVersion?.version || "none"} to ${currentVersion}`
    );

    // Download the English manifest database
    const dbPath = manifest.mobileWorldContentPaths.en;
    const dbUrl = BUNGIE_ROOT + dbPath;
    const zipPath = path.join(MANIFEST_DIR, "manifest.zip");
    const dbFilePath = path.join(MANIFEST_DIR, "manifest.db");

    // Download manifest with retry logic
    await downloadFile(dbUrl, zipPath);

    // Extract database
    await extractDatabase(zipPath, dbFilePath);

    // Optimize the database
    await optimizeDatabase(dbFilePath);

    // Clean up zip file
    await fs.unlink(zipPath);

    // Save version info
    manifestVersion = {
      version: currentVersion,
      path: dbFilePath,
      updated: new Date().toISOString(),
    };
    await saveManifestVersion(manifestVersion);

    // Close existing database connection if any
    if (db) {
      await db.close();
      db = null;
    }

    // Clear definition cache
    definitionCache.clear();

    console.log("Manifest update complete");
    return true;
  } catch (error) {
    console.error("Failed to update manifest:", error);
    throw error;
  }
}

// Get database connection with connection pooling
async function getDatabase() {
  if (db) return db;

  const version = await getCurrentManifestVersion();
  if (!version) {
    throw new Error("No manifest database available. Please update manifest.");
  }

  db = await open({
    filename: version.path,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  // Enable query optimizations
  await db.exec("PRAGMA cache_size = 10000"); // Increase cache size
  await db.exec("PRAGMA temp_store = MEMORY"); // Use memory for temp storage

  return db;
}

// Cache management
function getCached(key) {
  const cached = definitionCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    cached.lastAccessed = Date.now();
    return cached.data;
  }
  definitionCache.delete(key);
  return null;
}

function setCache(key, data) {
  // Implement LRU cache eviction
  if (definitionCache.size >= CACHE_MAX_SIZE) {
    // Find and remove least recently accessed item
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [k, v] of definitionCache.entries()) {
      if (v.lastAccessed < oldestTime) {
        oldestTime = v.lastAccessed;
        oldestKey = k;
      }
    }

    if (oldestKey) {
      definitionCache.delete(oldestKey);
    }
  }

  definitionCache.set(key, {
    data,
    timestamp: Date.now(),
    lastAccessed: Date.now(),
  });
}

// Get definition from manifest with caching
async function getDefinition(tableName, hash) {
  const cacheKey = `${tableName}:${hash}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const database = await getDatabase();

    // Bungie uses signed 32-bit integers for hashes
    const id =
      parseInt(hash) > 0x7fffffff
        ? parseInt(hash) - 0x100000000
        : parseInt(hash);

    const row = await database.get(
      `SELECT json FROM ${tableName} WHERE id = ?`,
      [id]
    );

    const result = row ? JSON.parse(row.json) : null;
    if (result) {
      setCache(cacheKey, result);
    }
    return result;
  } catch (error) {
    console.error(`Failed to get definition from ${tableName}:`, error);
    return null;
  }
}

// Get multiple definitions with batching and caching
async function getDefinitions(tableName, hashes) {
  const results = {};
  const uncachedHashes = [];

  // Check cache first
  for (const hash of hashes) {
    const cacheKey = `${tableName}:${hash}`;
    const cached = getCached(cacheKey);
    if (cached) {
      results[hash] = cached;
    } else {
      uncachedHashes.push(hash);
    }
  }

  // Fetch uncached items in batches
  if (uncachedHashes.length > 0) {
    try {
      const database = await getDatabase();
      const batchSize = 100; // Process in batches to avoid query size limits

      for (let i = 0; i < uncachedHashes.length; i += batchSize) {
        const batch = uncachedHashes.slice(i, i + batchSize);

        // Convert hashes to signed integers
        const ids = batch.map((hash) => {
          const parsed = parseInt(hash);
          return parsed > 0x7fffffff ? parsed - 0x100000000 : parsed;
        });

        const placeholders = ids.map(() => "?").join(",");
        const rows = await database.all(
          `SELECT id, json FROM ${tableName} WHERE id IN (${placeholders})`,
          ids
        );

        // Convert back to unsigned hashes and cache
        rows.forEach((row) => {
          const hash = row.id < 0 ? row.id + 0x100000000 : row.id;
          const data = JSON.parse(row.json);
          results[hash] = data;
          setCache(`${tableName}:${hash}`, data);
        });
      }
    } catch (error) {
      console.error(`Failed to get definitions from ${tableName}:`, error);
    }
  }

  return results;
}

// Get all definitions of a type with streaming for large datasets
async function getAllDefinitions(tableName, filter = null) {
  try {
    const database = await getDatabase();
    const results = {};

    // Use streaming for large tables
    const query = `SELECT id, json FROM ${tableName}`;

    await database.each(query, [], (err, row) => {
      if (err) {
        console.error(`Error reading from ${tableName}:`, err);
        return;
      }

      const definition = JSON.parse(row.json);

      // Apply filter if provided
      if (!filter || filter(definition)) {
        const hash = row.id < 0 ? row.id + 0x100000000 : row.id;
        results[hash] = definition;

        // Cache frequently accessed definitions
        if (
          tableName === "DestinyInventoryItemDefinition" &&
          definition.itemType === 2
        ) {
          setCache(`${tableName}:${hash}`, definition);
        }
      }
    });

    return results;
  } catch (error) {
    console.error(`Failed to get all definitions from ${tableName}:`, error);
    return {};
  }
}

// Common definition getters
async function getItemDefinition(itemHash) {
  return getDefinition("DestinyInventoryItemDefinition", itemHash);
}

async function getStatDefinition(statHash) {
  return getDefinition("DestinyStatDefinition", statHash);
}

async function getSocketDefinition(socketHash) {
  return getDefinition("DestinySocketTypeDefinition", socketHash);
}

async function getPlugDefinition(plugHash) {
  return getDefinition("DestinyInventoryItemDefinition", plugHash);
}

// Get all armor mods with caching
async function getAllArmorMods() {
  const cacheKey = "all:armor_mods";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const result = await getAllDefinitions(
    "DestinyInventoryItemDefinition",
    (def) => {
      return (
        def.itemType === 19 && // Mods
        def.plug &&
        def.plug.plugCategoryIdentifier &&
        (def.plug.plugCategoryIdentifier.includes("armor") ||
          def.plug.plugCategoryIdentifier.includes("enhancements.v2"))
      );
    }
  );

  setCache(cacheKey, result);
  return result;
}

// Get stat definitions with caching
async function getStatDefinitions() {
  const cacheKey = "all:stat_definitions";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const statHashes = [
    2996146975, // Mobility
    392767087, // Resilience
    1943323491, // Recovery
    1735777505, // Discipline
    144602215, // Intellect
    4244567218, // Strength
  ];

  const result = await getDefinitions("DestinyStatDefinition", statHashes);
  setCache(cacheKey, result);
  return result;
}

// Preload common definitions
async function preloadCommonDefinitions() {
  console.log("Preloading common definitions...");

  // Preload stat definitions
  await getStatDefinitions();

  // Preload common item types
  const database = await getDatabase();
  const armorQuery = `
    SELECT id, json FROM DestinyInventoryItemDefinition 
    WHERE json LIKE '%"itemType":2%' 
    LIMIT 500
  `;

  const rows = await database.all(armorQuery);
  for (const row of rows) {
    const hash = row.id < 0 ? row.id + 0x100000000 : row.id;
    const data = JSON.parse(row.json);
    setCache(`DestinyInventoryItemDefinition:${hash}`, data);
  }

  console.log("Common definitions preloaded");
}

// Health check
async function checkDatabaseHealth() {
  try {
    const database = await getDatabase();
    const result = await database.get(
      "SELECT COUNT(*) as count FROM DestinyInventoryItemDefinition"
    );
    return {
      healthy: true,
      itemCount: result.count,
      cacheSize: definitionCache.size,
    };
  } catch (error) {
    return {
      healthy: false,
      error: error.message,
    };
  }
}

module.exports = {
  updateManifest,
  getDefinition,
  getDefinitions,
  getAllDefinitions,
  getItemDefinition,
  getStatDefinition,
  getSocketDefinition,
  getPlugDefinition,
  getAllArmorMods,
  getStatDefinitions,
  preloadCommonDefinitions,
  checkDatabaseHealth,
};
