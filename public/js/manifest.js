// manifest.js - Frontend Manifest API wrapper
const Manifest = {
  // Cache for definitions to avoid repeated API calls
  cache: new Map(),
  cacheExpiry: 60 * 60 * 1000, // 1 hour

  // Helper to get from cache or fetch
  async getCached(key, fetcher) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
    return data;
  },

  // Get multiple item definitions at once
  async getItems(hashes) {
    return API.request("/manifest/items", {
      method: "POST",
      body: JSON.stringify({ hashes }),
    });
  },

  // Get single item definition
  async getItem(hash) {
    return this.getCached(`item_${hash}`, () =>
      API.request(`/manifest/item/${hash}`)
    );
  },

  // Get stat definitions
  async getStats() {
    return this.getCached("stats", () => API.request("/manifest/stats"));
  },

  // Get socket type definition
  async getSocket(hash) {
    return this.getCached(`socket_${hash}`, () =>
      API.request(`/manifest/socket/${hash}`)
    );
  },

  // Get plug/mod definition
  async getPlug(hash) {
    return this.getCached(`plug_${hash}`, () =>
      API.request(`/manifest/plug/${hash}`)
    );
  },

  // Get all armor mods
  async getArmorMods() {
    return this.getCached("armor_mods", () =>
      API.request("/manifest/mods/armor")
    );
  },

  // Get bucket definitions
  async getBuckets() {
    return this.getCached("buckets", () => API.request("/manifest/buckets"));
  },

  // Get class definitions
  async getClasses() {
    return this.getCached("classes", () => API.request("/manifest/classes"));
  },

  // Get damage type definitions
  async getDamageTypes() {
    return this.getCached("damage_types", () =>
      API.request("/manifest/damageTypes")
    );
  },

  // Get manifest status
  async getStatus() {
    return API.request("/manifest/status");
  },

  // Clear cache
  clearCache() {
    this.cache.clear();
  },

  // Helper to get stat names
  statHashes: {
    2996146975: "Mobility",
    392767087: "Resilience",
    1943323491: "Recovery",
    1735777505: "Discipline",
    144602215: "Intellect",
    4244567218: "Strength",
  },

  // Helper to get armor bucket hashes
  armorBuckets: {
    3448274439: "Helmet",
    3551918588: "Gauntlets",
    14239492: "Chest",
    20886954: "Legs",
    1585787867: "Class",
  },
};

// Make Manifest globally available
window.Manifest = Manifest;
