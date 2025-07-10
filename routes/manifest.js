const express = require("express");
const router = express.Router();
const {
  getDefinition,
  getDefinitions,
  getAllDefinitions,
  getStatDefinitions,
  getAllArmorMods,
  updateManifest,
} = require("../services/manifestService");

// Cache for frequently accessed definitions
const definitionCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Helper to get from cache or fetch
async function getCachedDefinition(type, hash, fetcher) {
  const cacheKey = `${type}:${hash}`;
  const cached = definitionCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetcher();
  definitionCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

// Get item definitions (batch)
router.post("/items", async (req, res) => {
  try {
    const { hashes } = req.body;

    if (!Array.isArray(hashes)) {
      return res.status(400).json({ error: "hashes must be an array" });
    }

    const definitions = await getDefinitions(
      "DestinyInventoryItemDefinition",
      hashes
    );
    res.json(definitions);
  } catch (error) {
    console.error("Item definitions error:", error);
    res.status(500).json({ error: "Failed to get item definitions" });
  }
});

// Get single item definition
router.get("/item/:hash", async (req, res) => {
  try {
    const { hash } = req.params;

    const definition = await getCachedDefinition("item", hash, () =>
      getDefinition("DestinyInventoryItemDefinition", hash)
    );

    if (!definition) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(definition);
  } catch (error) {
    console.error("Item definition error:", error);
    res.status(500).json({ error: "Failed to get item definition" });
  }
});

// Get stat definitions
router.get("/stats", async (req, res) => {
  try {
    const stats = await getCachedDefinition("stats", "all", () =>
      getStatDefinitions()
    );

    res.json(stats);
  } catch (error) {
    console.error("Stat definitions error:", error);
    res.status(500).json({ error: "Failed to get stat definitions" });
  }
});

// Get socket type definition
router.get("/socket/:hash", async (req, res) => {
  try {
    const { hash } = req.params;

    const definition = await getCachedDefinition("socket", hash, () =>
      getDefinition("DestinySocketTypeDefinition", hash)
    );

    if (!definition) {
      return res.status(404).json({ error: "Socket type not found" });
    }

    res.json(definition);
  } catch (error) {
    console.error("Socket definition error:", error);
    res.status(500).json({ error: "Failed to get socket definition" });
  }
});

// Get plug/mod definition
router.get("/plug/:hash", async (req, res) => {
  try {
    const { hash } = req.params;

    const definition = await getCachedDefinition("plug", hash, () =>
      getDefinition("DestinyInventoryItemDefinition", hash)
    );

    if (!definition) {
      return res.status(404).json({ error: "Plug not found" });
    }

    res.json(definition);
  } catch (error) {
    console.error("Plug definition error:", error);
    res.status(500).json({ error: "Failed to get plug definition" });
  }
});

// Get all armor mods
router.get("/mods/armor", async (req, res) => {
  try {
    const mods = await getCachedDefinition("mods", "armor", () =>
      getAllArmorMods()
    );

    res.json(mods);
  } catch (error) {
    console.error("Armor mods error:", error);
    res.status(500).json({ error: "Failed to get armor mods" });
  }
});

// Get bucket definitions
router.get("/buckets", async (req, res) => {
  try {
    const buckets = await getCachedDefinition("buckets", "all", () =>
      getAllDefinitions("DestinyInventoryBucketDefinition")
    );

    res.json(buckets);
  } catch (error) {
    console.error("Bucket definitions error:", error);
    res.status(500).json({ error: "Failed to get bucket definitions" });
  }
});

// Get class definitions
router.get("/classes", async (req, res) => {
  try {
    const classes = await getCachedDefinition("classes", "all", () =>
      getAllDefinitions("DestinyClassDefinition")
    );

    res.json(classes);
  } catch (error) {
    console.error("Class definitions error:", error);
    res.status(500).json({ error: "Failed to get class definitions" });
  }
});

// Get damage type definitions
router.get("/damageTypes", async (req, res) => {
  try {
    const damageTypes = await getCachedDefinition("damageTypes", "all", () =>
      getAllDefinitions("DestinyDamageTypeDefinition")
    );

    res.json(damageTypes);
  } catch (error) {
    console.error("Damage type definitions error:", error);
    res.status(500).json({ error: "Failed to get damage type definitions" });
  }
});

// Force manifest update (admin only)
router.post("/update", async (req, res) => {
  try {
    // In production, add admin authentication here
    const apiKey = req.headers["x-admin-key"];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await updateManifest();
    res.json({
      success: true,
      updated,
      message: updated
        ? "Manifest updated successfully"
        : "Manifest already up to date",
    });
  } catch (error) {
    console.error("Manifest update error:", error);
    res.status(500).json({ error: "Failed to update manifest" });
  }
});

// Get manifest status
router.get("/status", async (req, res) => {
  try {
    const fs = require("fs").promises;
    const path = require("path");

    const versionFile = path.join(
      __dirname,
      "..",
      "data",
      "manifest",
      "version.json"
    );
    let version = null;

    try {
      const data = await fs.readFile(versionFile, "utf8");
      version = JSON.parse(data);
    } catch {
      // No version file
    }

    res.json({
      hasManifest: !!version,
      version: version?.version || null,
      updated: version?.updated || null,
    });
  } catch (error) {
    console.error("Manifest status error:", error);
    res.status(500).json({ error: "Failed to get manifest status" });
  }
});

module.exports = router;
