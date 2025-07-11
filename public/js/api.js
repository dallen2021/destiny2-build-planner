// api.js - Frontend API wrapper for Bungie API calls
const API = {
  // Base configuration
  // Determine base URL. If the page is opened directly from the filesystem,
  // window.location.origin will be "null" which breaks API calls.
  // Fallback to localhost in that case so the app still works when the
  // backend is running locally.
  baseURL:
    window.location.origin && window.location.origin !== "null"
      ? window.location.origin
      : "http://localhost:3000",
  isAuthenticated: false,

  // Helper method for API calls
  async request(endpoint, options = {}) {
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
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  },

  // Authentication methods
  auth: {
    async checkStatus() {
      try {
        return await API.request("/auth/status");
      } catch (error) {
        // Return not authenticated if there's an error
        return { authenticated: false, user: null };
      }
    },

    async login() {
      window.location.href = `${API.baseURL}/auth/login`;
    },

    async logout() {
      await API.request("/auth/logout", { method: "POST" });
      window.location.reload();
    },

    async getUser() {
      return API.request("/auth/user");
    },
  },

  // Inventory methods
  inventory: {
    async getAll() {
      return API.request("/api/inventory");
    },

    async getCharacter(characterId, components = "200") {
      return API.request(
        `/api/character/${characterId}?components=${components}`
      );
    },

    async search(query, type = "armor") {
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
      return API.request("/api/transfer", {
        method: "POST",
        body: JSON.stringify({
          itemId,
          itemHash,
          characterId,
          membershipType,
          stackSize,
        }),
      });
    },

    async equip(itemId, characterId, membershipType) {
      return API.request("/api/equip", {
        method: "POST",
        body: JSON.stringify({
          itemId,
          characterId,
          membershipType,
        }),
      });
    },
  },

  // Item/Definition methods
  items: {
    async getDefinition(itemHash) {
      return API.request(`/api/item/${itemHash}`);
    },

    async getStatDefinition(statHash) {
      return API.request(`/api/stat/${statHash}`);
    },
  },

  // Loadout methods
  loadouts: {
    async get(characterId) {
      return API.request(`/api/loadouts?characterId=${characterId}`);
    },
  },
};

// Make API globally available
window.API = API;
