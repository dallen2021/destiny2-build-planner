// Destiny 2 API Client Service
class D2ApiClient {
  constructor() {
    this.baseURL = window.location.origin;
    this.manifestCache = new Map();
    this.isAuthenticated = false;
    this.user = null;
    this.destinyMembership = null;
  }

  // Make authenticated API request
  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important for cookies
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async checkAuthStatus() {
    try {
      const data = await this.request("/auth/status");
      this.isAuthenticated = data.authenticated;
      this.user = data.user;
      this.destinyMembership = data.destinyMembership;
      return data;
    } catch (error) {
      this.isAuthenticated = false;
      this.user = null;
      this.destinyMembership = null;
      throw error;
    }
  }

  login() {
    window.location.href = `${this.baseURL}/auth/login`;
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    this.isAuthenticated = false;
    this.user = null;
    this.destinyMembership = null;
  }

  // Inventory methods
  async getInventory() {
    return this.request("/api/inventory");
  }

  async getCharacter(characterId, components = "200") {
    return this.request(
      `/api/character/${characterId}?components=${components}`
    );
  }

  async searchItems(query, type = "armor") {
    const params = new URLSearchParams({ query, type });
    return this.request(`/api/search?${params}`);
  }

  async transferItem(itemId, itemHash, characterId, stackSize = 1) {
    return this.request("/api/transfer", {
      method: "POST",
      body: JSON.stringify({
        itemId,
        itemHash,
        characterId,
        stackSize,
        membershipType: this.destinyMembership.membershipType,
      }),
    });
  }

  async equipItem(itemId, characterId) {
    return this.request("/api/equip", {
      method: "POST",
      body: JSON.stringify({
        itemId,
        characterId,
        membershipType: this.destinyMembership.membershipType,
      }),
    });
  }

  // Manifest methods
  async getItemDefinition(itemHash) {
    // Check cache first
    const cacheKey = `item:${itemHash}`;
    if (this.manifestCache.has(cacheKey)) {
      return this.manifestCache.get(cacheKey);
    }

    const definition = await this.request(`/manifest/item/${itemHash}`);
    this.manifestCache.set(cacheKey, definition);
    return definition;
  }

  async getItemDefinitions(itemHashes) {
    // Filter out already cached items
    const uncached = itemHashes.filter(
      (hash) => !this.manifestCache.has(`item:${hash}`)
    );

    if (uncached.length === 0) {
      // All items are cached
      const result = {};
      itemHashes.forEach((hash) => {
        result[hash] = this.manifestCache.get(`item:${hash}`);
      });
      return result;
    }

    // Fetch uncached items
    const definitions = await this.request("/manifest/items", {
      method: "POST",
      body: JSON.stringify({ hashes: uncached }),
    });

    // Cache the results
    Object.entries(definitions).forEach(([hash, def]) => {
      this.manifestCache.set(`item:${hash}`, def);
    });

    // Return all requested items
    const result = {};
    itemHashes.forEach((hash) => {
      result[hash] =
        this.manifestCache.get(`item:${hash}`) || definitions[hash];
    });
    return result;
  }

  async getStatDefinitions() {
    const cacheKey = "stats:all";
    if (this.manifestCache.has(cacheKey)) {
      return this.manifestCache.get(cacheKey);
    }

    const stats = await this.request("/manifest/stats");
    this.manifestCache.set(cacheKey, stats);
    return stats;
  }

  async getArmorMods() {
    const cacheKey = "mods:armor";
    if (this.manifestCache.has(cacheKey)) {
      return this.manifestCache.get(cacheKey);
    }

    const mods = await this.request("/manifest/mods/armor");
    this.manifestCache.set(cacheKey, mods);
    return mods;
  }

  // Helper methods
  isArtificeArmor(item) {
    // Check for artifice socket
    if (item.sockets?.socketEntries) {
      return item.sockets.socketEntries.some(
        (socket) =>
          socket.socketTypeHash === 3727270518 || // Artifice socket
          socket.socketTypeHash === 2701840022
      );
    }
    return false;
  }

  isExotic(item) {
    return item.definition?.inventory?.tierType === 6;
  }

  getItemPowerLevel(item) {
    return item.instance?.primaryStat?.value || 0;
  }

  getItemStats(item, statDefinitions) {
    const stats = {};
    if (item.stats?.stats) {
      Object.entries(item.stats.stats).forEach(([hash, stat]) => {
        const def = statDefinitions[hash];
        if (def) {
          const statName = def.displayProperties.name.toLowerCase();
          stats[statName] = stat.value;
        }
      });
    }
    return stats;
  }

  // Process inventory for display
  async processInventoryItems(items) {
    const itemHashes = [...new Set(items.map((item) => item.itemHash))];
    const definitions = await this.getItemDefinitions(itemHashes);
    const statDefinitions = await this.getStatDefinitions();

    return items.map((item) => {
      const definition = definitions[item.itemHash];
      const isMasterworked = item.instance?.energy?.energyCapacity === 10;

      return {
        ...item,
        definition,
        displayName: definition?.displayProperties?.name || "Unknown Item",
        itemType: definition?.itemTypeDisplayName || "Unknown Type",
        tierType: definition?.inventory?.tierTypeName || "Unknown Tier",
        icon: definition?.displayProperties?.icon
          ? `https://www.bungie.net${definition.displayProperties.icon}`
          : null,
        isExotic: this.isExotic({ definition }),
        isArtifice: this.isArtificeArmor(item),
        isMasterworked,
        powerLevel: this.getItemPowerLevel(item),
        classType: definition?.classType,
        stats: this.getItemStats(item, statDefinitions),
        bucketHash: item.bucketHash || definition?.inventory?.bucketTypeHash,
        itemInstanceId: item.itemInstanceId,
      };
    });
  }
}

// Create global instance
window.d2Api = new D2ApiClient();
