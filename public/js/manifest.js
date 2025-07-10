// Destiny 2 Manifest Service
// Handles caching and display of game definitions

class ManifestService {
  constructor() {
    this.cache = new Map();
    this.db = null;
    this.dbName = "D2Manifest";
    this.storeName = "definitions";
    this.version = 1;
    this.initialized = false;
  }

  // Initialize IndexedDB for client-side caching
  async init() {
    if (this.initialized) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store for definitions
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "key",
          });
          store.createIndex("type", "type", { unique: false });
          store.createIndex("hash", "hash", { unique: false });
        }
      };
    });
  }

  // Get from cache or fetch from server
  async getDefinition(type, hash) {
    const cacheKey = `${type}:${hash}`;

    // Check memory cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check IndexedDB
    const cached = await this.getFromDB(cacheKey);
    if (cached) {
      this.cache.set(cacheKey, cached.data);
      return cached.data;
    }

    // Fetch from server
    try {
      const definition = await window.d2Api.getItemDefinition(hash);
      if (definition) {
        await this.saveToCache(cacheKey, type, hash, definition);
      }
      return definition;
    } catch (error) {
      console.error(`Failed to get ${type} definition for ${hash}:`, error);
      return null;
    }
  }

  // Get from IndexedDB
  async getFromDB(key) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Save to cache
  async saveToCache(key, type, hash, data) {
    // Save to memory cache
    this.cache.set(key, data);

    // Save to IndexedDB
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put({
        key,
        type,
        hash,
        data,
        timestamp: Date.now(),
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get item icon URL
  getItemIcon(item) {
    if (item.definition?.displayProperties?.icon) {
      return `https://www.bungie.net${item.definition.displayProperties.icon}`;
    }
    return "/images/placeholder-icon.png";
  }

  // Get item watermark (for seasonal/event items)
  getItemWatermark(item) {
    if (item.definition?.iconWatermark) {
      return `https://www.bungie.net${item.definition.iconWatermark}`;
    }
    return null;
  }

  // Format stat value with tier
  formatStat(value) {
    const tier = Math.floor(Math.min(value, 100) / 10);
    return {
      value,
      tier,
      display: `${value} (T${tier})`,
    };
  }

  // Get stat bar color based on value
  getStatColor(value) {
    if (value >= 90) return "#4caf50"; // Green
    if (value >= 70) return "#ffd700"; // Gold
    if (value >= 50) return "#ff9800"; // Orange
    return "#f44336"; // Red
  }

  // Create stat bar HTML
  createStatBar(stat, value, max = 100) {
    const percentage = (value / max) * 100;
    const color = this.getStatColor(value);

    return `
            <div class="stat-bar-container">
                <div class="stat-bar-label">${stat}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${percentage}%; background: ${color}"></div>
                    <div class="stat-bar-value">${value}</div>
                </div>
            </div>
        `;
  }

  // Get armor tier name
  getArmorTierName(tierType) {
    const tiers = {
      2: "Common",
      3: "Uncommon",
      4: "Rare",
      5: "Legendary",
      6: "Exotic",
    };
    return tiers[tierType] || "Unknown";
  }

  // Get element type info
  getElementInfo(damageType) {
    const elements = {
      1: { name: "Kinetic", color: "#ffffff", icon: "⚪" },
      2: { name: "Arc", color: "#86b1f3", icon: "⚡" },
      3: { name: "Solar", color: "#ef642d", icon: "🔥" },
      4: { name: "Void", color: "#b18ee9", icon: "🌀" },
      6: { name: "Stasis", color: "#4b88b2", icon: "❄️" },
      7: { name: "Strand", color: "#55a84e", icon: "🌿" },
    };
    return (
      elements[damageType] || { name: "Unknown", color: "#888", icon: "?" }
    );
  }

  // Clear cache (for updates)
  async clearCache() {
    this.cache.clear();

    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get cache size
  async getCacheSize() {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Create global instance
window.manifestService = new ManifestService();

// Initialize on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.manifestService.init().catch(console.error);
  });
} else {
  window.manifestService.init().catch(console.error);
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ManifestService;
}
