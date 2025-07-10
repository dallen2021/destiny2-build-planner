const axios = require("axios");
const fs = require("fs").promises;
const fsSync = require("fs"); // ADD THIS LINE
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

// Download file with progress
async function downloadFile(url, outputPath) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
    headers: {
      "X-API-Key": process.env.BUNGIE_API_KEY,
    },
  });

  const totalLength = response.headers["content-length"];
  let downloaded = 0;

  response.data.on("data", (chunk) => {
    downloaded += chunk.length;
    const percentage = ((downloaded / totalLength) * 100).toFixed(2);
    process.stdout.write(`Downloading manifest: ${percentage}%\r`);
  });

  // Create write stream
  const writer = fsSync.createWriteStream(outputPath);

  // Pipe the response to file
  await pipeline(response.data, writer);

  console.log("\nManifest download complete");
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

// Update manifest if needed
async function updateManifest() {
  try {
    await ensureManifestDir();

    // Get manifest info from Bungie
    const response = await axios.get(MANIFEST_URL, {
      headers: {
        "X-API-Key": process.env.BUNGIE_API_KEY,
      },
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

    // Download manifest
    await downloadFile(dbUrl, zipPath);

    // Extract database
    await extractDatabase(zipPath, dbFilePath);

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

    console.log("Manifest update complete");
    return true;
  } catch (error) {
    console.error("Failed to update manifest:", error);
    throw error;
  }
}

// Get database connection
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

  return db;
}

// Get definition from manifest
async function getDefinition(tableName, hash) {
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

    return row ? JSON.parse(row.json) : null;
  } catch (error) {
    console.error(`Failed to get definition from ${tableName}:`, error);
    return null;
  }
}

// Get multiple definitions
async function getDefinitions(tableName, hashes) {
  try {
    const database = await getDatabase();

    // Convert hashes to signed integers
    const ids = hashes.map((hash) => {
      const parsed = parseInt(hash);
      return parsed > 0x7fffffff ? parsed - 0x100000000 : parsed;
    });

    const placeholders = ids.map(() => "?").join(",");
    const rows = await database.all(
      `SELECT id, json FROM ${tableName} WHERE id IN (${placeholders})`,
      ids
    );

    // Convert back to unsigned hashes
    const results = {};
    rows.forEach((row) => {
      const hash = row.id < 0 ? row.id + 0x100000000 : row.id;
      results[hash] = JSON.parse(row.json);
    });

    return results;
  } catch (error) {
    console.error(`Failed to get definitions from ${tableName}:`, error);
    return {};
  }
}

// Get all definitions of a type
async function getAllDefinitions(tableName, filter = null) {
  try {
    const database = await getDatabase();

    let query = `SELECT id, json FROM ${tableName}`;
    const rows = await database.all(query);

    const results = {};
    rows.forEach((row) => {
      const definition = JSON.parse(row.json);

      // Apply filter if provided
      if (!filter || filter(definition)) {
        const hash = row.id < 0 ? row.id + 0x100000000 : row.id;
        results[hash] = definition;
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

// Get all armor mods
async function getAllArmorMods() {
  return getAllDefinitions("DestinyInventoryItemDefinition", (def) => {
    return (
      def.itemType === 19 && // Mods
      def.plug &&
      def.plug.plugCategoryIdentifier &&
      (def.plug.plugCategoryIdentifier.includes("armor") ||
        def.plug.plugCategoryIdentifier.includes("enhancements.v2"))
    );
  });
}

// Get stat definitions
async function getStatDefinitions() {
  const statHashes = [
    2996146975, // Mobility
    392767087, // Resilience
    1943323491, // Recovery
    1735777505, // Discipline
    144602215, // Intellect
    4244567218, // Strength
  ];

  return getDefinitions("DestinyStatDefinition", statHashes);
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
};
