// api.js - Enhanced Frontend API wrapper with retry logic and caching
const API = {
  // Base configuration
  baseURL:
    window.location.origin && window.location.origin !== "null"
      ? window.location.origin
      : "http://localhost:3000",
  isAuthenticated: false,

  // Cache configuration
  cache: new Map(),
  cacheConfig: {
    inventory: 30000, // 30 seconds for inventory
    character: 60000, // 1 minute for character data
    definitions: 3600000, // 1 hour for definitions
    profile: 30000, // 30 seconds for profile
  },

  // Retry configuration
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000, // Start with 1 second
    retryMultiplier: 2, // Double the delay each retry
    retryableStatuses: [429, 502, 503, 504], // Rate limited or server errors
  },

  // Helper method for API calls with retry logic
  async request(endpoint, options = {}, retryCount = 0) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: `HTTP ${response.status}` }));

        // Check if we should retry
        if (
          retryCount < this.retryConfig.maxRetries &&
          this.retryConfig.retryableStatuses.includes(response.status)
        ) {
          const delay =
            this.retryConfig.retryDelay *
            Math.pow(this.retryConfig.retryMultiplier, retryCount);
          console.warn(
            `Request failed with status ${response.status}, retrying in ${delay}ms...`
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.request(endpoint, options, retryCount + 1);
        }

        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Network errors - retry if appropriate
      if (
        retryCount < this.retryConfig.maxRetries &&
        !error.message.includes("401")
      ) {
        const delay =
          this.retryConfig.retryDelay *
          Math.pow(this.retryConfig.retryMultiplier, retryCount);
        console.warn(`Network error, retrying in ${delay}ms...`, error);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.request(endpoint, options, retryCount + 1);
      }

      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  },

  // Cache helper methods
  getCacheKey(type, ...params) {
    return `${type}:${params.join(":")}`;
  },

  setCache(key, data, ttl) {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  },

  getCache(key) {
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  },

  clearCache(pattern = null) {
    if (!pattern) {
      this.cache.clear();
    } else {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    }
  },

  // Authentication methods
  auth: {
    async checkStatus() {
      try {
        const cacheKey = API.getCacheKey("auth", "status");
        const cached = API.getCache(cacheKey);
        if (cached) return cached;

        const result = await API.request("/auth/status");
        API.setCache(cacheKey, result, 10000); // Cache for 10 seconds
        return result;
      } catch (error) {
        return { authenticated: false, user: null };
      }
    },

    async login() {
      window.location.href = `${API.baseURL}/auth/login`;
    },

    async logout() {
      await API.request("/auth/logout", { method: "POST" });
      API.clearCache(); // Clear all cache on logout
      window.location.reload();
    },

    async getUser() {
      const cacheKey = API.getCacheKey("auth", "user");
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request("/auth/user");
      API.setCache(cacheKey, result, 30000); // Cache for 30 seconds
      return result;
    },
  },

  // Inventory methods with caching
  inventory: {
    async getInventory(forceRefresh = false) {
      const cacheKey = API.getCacheKey("inventory", "all");

      if (!forceRefresh) {
        const cached = API.getCache(cacheKey);
        if (cached) {
          console.log("Using cached inventory data");
          return cached;
        }
      }

      const response = await fetch(`${API.baseURL}/api/inventory`, {
        credentials: "include",
      });
      const inventoryData = await response.json();
      const itemComponents = inventoryData.itemComponents || {};

      const mergeData = (items) => {
        if (!items) return [];
        return items.map((item) => {
          const instance =
            itemComponents.instances?.data?.[item.itemInstanceId];
          const stats =
            itemComponents.stats?.data?.[item.itemInstanceId]?.stats;
          const sockets =
            itemComponents.sockets?.data?.[item.itemInstanceId]?.sockets;
          const power = instance?.primaryStat?.value;
          return { ...item, ...instance, stats, sockets, power };
        });
      };

      if (inventoryData.profileInventory?.data) {
        inventoryData.profileInventory.data.items = mergeData(
          inventoryData.profileInventory.data.items
        );
      }

      if (inventoryData.characterInventories?.data) {
        for (const charId in inventoryData.characterInventories.data) {
          inventoryData.characterInventories.data[charId].items = mergeData(
            inventoryData.characterInventories.data[charId].items
          );
        }
      }

      if (inventoryData.characterEquipment?.data) {
        for (const charId in inventoryData.characterEquipment.data) {
          inventoryData.characterEquipment.data[charId].items = mergeData(
            inventoryData.characterEquipment.data[charId].items
          );
        }
      }

      API.setCache(cacheKey, inventoryData, API.cacheConfig.inventory);
      return inventoryData;
    },

    async getAll(forceRefresh = false) {
      return API.inventory.getInventory(forceRefresh);
    },

    async getCharacter(characterId, components = "200") {
      const cacheKey = API.getCacheKey("character", characterId, components);
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request(
        `/api/character/${characterId}?components=${components}`
      );
      API.setCache(cacheKey, result, API.cacheConfig.character);
      return result;
    },

    async search(query, type = "armor") {
      // Search results shouldn't be cached as they're query-specific
      return API.request(
        `/api/search?query=${encodeURIComponent(query)}&type=${type}`
      );
    },

    async transfer(
      itemId,
      itemHash,
      characterId,
      membershipType,
      stackSize = 1
    ) {
      const result = await API.request("/api/transfer", {
        method: "POST",
        body: JSON.stringify({
          itemId,
          itemHash,
          characterId,
          membershipType,
          stackSize,
        }),
      });

      // Clear inventory cache after transfer
      API.clearCache("inventory");
      API.clearCache("character");

      return result;
    },

    async equip(itemId, characterId, membershipType) {
      const result = await API.request("/api/equip", {
        method: "POST",
        body: JSON.stringify({
          itemId,
          characterId,
          membershipType,
        }),
      });

      // Clear inventory cache after equip
      API.clearCache("inventory");
      API.clearCache("character");

      return result;
    },

    // Batch transfer and equip with progress callback
    async batchTransferAndEquip(
      items,
      characterId,
      membershipType,
      progressCallback
    ) {
      const results = {
        transferred: [],
        equipped: [],
        failed: [],
      };

      let completed = 0;
      const total = items.length * 2; // Transfer + equip for each item

      for (const item of items) {
        try {
          // Transfer if needed
          if (
            item.location === 2 ||
            (item.characterId && item.characterId !== characterId)
          ) {
            await API.inventory.transfer(
              item.itemInstanceId,
              item.itemHash,
              characterId,
              membershipType,
              item.quantity || 1
            );
            results.transferred.push(item);
            completed++;
            if (progressCallback) progressCallback(completed, total);

            // Small delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 250));
          }

          // Equip
          await API.inventory.equip(
            item.itemInstanceId,
            characterId,
            membershipType
          );
          results.equipped.push(item);
          completed++;
          if (progressCallback) progressCallback(completed, total);

          await new Promise((resolve) => setTimeout(resolve, 250));
        } catch (error) {
          console.error(
            `Failed to process item ${item.itemInstanceId}:`,
            error
          );
          results.failed.push({ item, error: error.message });
        }
      }

      return results;
    },
  },

  // Item/Definition methods with caching
  items: {
    async getDefinition(itemHash) {
      const cacheKey = API.getCacheKey("definition", itemHash);
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request(`/api/item/${itemHash}`);
      API.setCache(cacheKey, result, API.cacheConfig.definitions);
      return result;
    },

    async getStatDefinition(statHash) {
      const cacheKey = API.getCacheKey("stat", statHash);
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request(`/api/stat/${statHash}`);
      API.setCache(cacheKey, result, API.cacheConfig.definitions);
      return result;
    },

    // Batch get definitions with caching
    async getDefinitions(itemHashes) {
      const uncached = [];
      const results = {};

      // Check cache first
      for (const hash of itemHashes) {
        const cacheKey = API.getCacheKey("definition", hash);
        const cached = API.getCache(cacheKey);
        if (cached) {
          results[hash] = cached;
        } else {
          uncached.push(hash);
        }
      }

      // Fetch uncached items
      if (uncached.length > 0) {
        const response = await API.request("/manifest/items", {
          method: "POST",
          body: JSON.stringify({ hashes: uncached }),
        });

        // Cache individual items
        for (const hash in response) {
          const cacheKey = API.getCacheKey("definition", hash);
          API.setCache(cacheKey, response[hash], API.cacheConfig.definitions);
          results[hash] = response[hash];
        }
      }

      return results;
    },
  },

  // Loadout methods
  loadouts: {
    async get(characterId) {
      const cacheKey = API.getCacheKey("loadouts", characterId);
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request(
        `/api/loadouts?characterId=${characterId}`
      );
      API.setCache(cacheKey, result, 60000); // Cache for 1 minute
      return result;
    },

    // Save loadout locally (in localStorage)
    saveLocal(loadout, name) {
      const savedLoadouts = JSON.parse(
        localStorage.getItem("d2_saved_loadouts") || "{}"
      );
      const id = Date.now().toString();
      savedLoadouts[id] = {
        ...loadout,
        name,
        id,
        created: new Date().toISOString(),
      };
      localStorage.setItem("d2_saved_loadouts", JSON.stringify(savedLoadouts));
      return id;
    },

    getLocal() {
      return JSON.parse(localStorage.getItem("d2_saved_loadouts") || "{}");
    },

    deleteLocal(id) {
      const savedLoadouts = JSON.parse(
        localStorage.getItem("d2_saved_loadouts") || "{}"
      );
      delete savedLoadouts[id];
      localStorage.setItem("d2_saved_loadouts", JSON.stringify(savedLoadouts));
    },
  },

  // Profile methods
  profile: {
    async get(membershipType, membershipId, components = "200") {
      const cacheKey = API.getCacheKey(
        "profile",
        membershipType,
        membershipId,
        components
      );
      const cached = API.getCache(cacheKey);
      if (cached) return cached;

      const result = await API.request(
        `/api/profile/${membershipType}/${membershipId}?components=${components}`
      );
      API.setCache(cacheKey, result, API.cacheConfig.profile);
      return result;
    },
  },

  // Utility methods
  utils: {
    // Export loadout to DIM format
    exportToDIM(loadout) {
      const dimLoadout = {
        name: loadout.name || "D2 Builder Loadout",
        classType: loadout.classType,
        equipped: loadout.set.map((item) => ({
          id: item.itemInstanceId,
          hash: item.itemHash,
        })),
        unequipped: [],
      };
      return JSON.stringify(dimLoadout, null, 2);
    },

    // Generate shareable link
    generateShareLink(loadout) {
      const data = {
        items: loadout.set.map((item) => item.itemHash),
        stats: loadout.stats,
      };
      const encoded = btoa(JSON.stringify(data));
      return `${window.location.origin}/share?loadout=${encoded}`;
    },
  },
};

// Make API globally available
window.API = API;
