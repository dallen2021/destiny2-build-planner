const express = require("express");
const router = express.Router();
const {
  makeApiRequest,
  ensureAuthenticated,
  getCharacter,
} = require("../middleware/bungie");
const { getDefinition } = require("../services/manifestService");

// Get character inventory
router.get("/inventory", ensureAuthenticated, async (req, res) => {
  try {
    const { membershipType, membershipId } = req.session.destinyMembership;

    // Components: 102=Inventory, 201=Character inventories, 205=Equipment,
    // 300=Item instances, 304=Item stats, 305=Item sockets
    const components = "102,201,205,300,304,305";

    // Fetch profile data (character inventories, profile inventory)
    const profileData = await makeApiRequest(
      `/Destiny2/${membershipType}/Profile/${membershipId}/`,
      {
        params: { components },
        session: req.session,
      }
    );

    // Fetch vault inventory (characterId 0)
    const vaultData = await getCharacter(
      membershipType,
      membershipId,
      0,
      "201,205,300,304,305",
      req.session
    );

    // Merge vault items into profile inventory
    if (vaultData.inventory?.data?.items) {
      if (!profileData.profileInventory) {
        profileData.profileInventory = { data: { items: [] } };
      }
      profileData.profileInventory.data.items = profileData.profileInventory.data.items.concat(
        vaultData.inventory.data.items
      );
    }

    // Merge item components
    const mergeComponents = (target, source) => {
      if (!source) return;
      Object.entries(source).forEach(([key, val]) => {
        if (!val?.data) return;
        if (!target[key]) target[key] = { data: {} };
        target[key].data = { ...target[key].data, ...val.data };
      });
    };

    mergeComponents(profileData.itemComponents, vaultData.itemComponents);

    res.json(profileData);
  } catch (error) {
    console.error("Inventory fetch error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch inventory",
    });
  }
});

// Get specific character data
router.get("/character/:characterId", ensureAuthenticated, async (req, res) => {
  try {
    const { membershipType, membershipId } = req.session.destinyMembership;
    const { characterId } = req.params;
    const { components = "200" } = req.query;

    const data = await makeApiRequest(
      `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/`,
      {
        params: { components },
        session: req.session,
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Character fetch error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch character data",
    });
  }
});

// Transfer item
router.post("/transfer", ensureAuthenticated, async (req, res) => {
  try {
    const {
      itemId,
      itemHash,
      stackSize = 1,
      characterId,
      membershipType,
    } = req.body;

    const data = await makeApiRequest("/Destiny2/Actions/Items/TransferItem/", {
      method: "POST",
      data: {
        itemReferenceHash: itemHash,
        stackSize: stackSize,
        itemId: itemId,
        characterId: characterId,
        membershipType: membershipType,
      },
      session: req.session,
    });

    res.json(data);
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to transfer item",
    });
  }
});

// Equip item
router.post("/equip", ensureAuthenticated, async (req, res) => {
  try {
    const { itemId, characterId, membershipType } = req.body;

    const data = await makeApiRequest("/Destiny2/Actions/Items/EquipItem/", {
      method: "POST",
      data: {
        itemId: itemId,
        characterId: characterId,
        membershipType: membershipType,
      },
      session: req.session,
    });

    res.json(data);
  } catch (error) {
    console.error("Equip error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to equip item",
    });
  }
});

// Get item definition
router.get("/item/:itemHash", async (req, res) => {
  try {
    const { itemHash } = req.params;
    const definition = await getDefinition(
      "DestinyInventoryItemDefinition",
      itemHash
    );

    if (!definition) {
      return res.status(404).json({ error: "Item definition not found" });
    }

    res.json(definition);
  } catch (error) {
    console.error("Item definition error:", error);
    res.status(500).json({ error: "Failed to get item definition" });
  }
});

// Get stat definition
router.get("/stat/:statHash", async (req, res) => {
  try {
    const { statHash } = req.params;
    const definition = await getDefinition("DestinyStatDefinition", statHash);

    if (!definition) {
      return res.status(404).json({ error: "Stat definition not found" });
    }

    res.json(definition);
  } catch (error) {
    console.error("Stat definition error:", error);
    res.status(500).json({ error: "Failed to get stat definition" });
  }
});

// Search for items
router.get("/search", ensureAuthenticated, async (req, res) => {
  try {
    const { query, type = "armor" } = req.query;
    const { membershipType, membershipId } = req.session.destinyMembership;

    // Get profile and vault inventories
    const components = "102,201,300,304,305";
    const profileData = await makeApiRequest(
      `/Destiny2/${membershipType}/Profile/${membershipId}/`,
      {
        params: { components },
        session: req.session,
      }
    );

    const vaultData = await getCharacter(
      membershipType,
      membershipId,
      0,
      "201,205,300,304,305",
      req.session
    );

    // Merge item components for unified lookup
    const mergeComponents = (target, source) => {
      if (!source) return;
      Object.entries(source).forEach(([key, val]) => {
        if (!val?.data) return;
        if (!target[key]) target[key] = { data: {} };
        target[key].data = { ...target[key].data, ...val.data };
      });
    };

    mergeComponents(profileData.itemComponents, vaultData.itemComponents);

    // Filter items based on search criteria
    let allItems = [];

    // Add vault items
    if (vaultData.inventory?.data?.items) {
      allItems = allItems.concat(vaultData.inventory.data.items);
    }

    // Add character items
    if (profileData.profileInventory?.data?.items) {
      allItems = allItems.concat(profileData.profileInventory.data.items);
    }

    if (profileData.characterInventories?.data) {
      Object.values(profileData.characterInventories.data).forEach((charInventory) => {
        allItems = allItems.concat(charInventory.items);
      });
    }

    // Filter by type if needed
    if (type === "armor") {
      const armorBuckets = [
        3448274439, 3551918588, 14239492, 20886954, 1585787867,
      ];
      allItems = allItems.filter((item) =>
        armorBuckets.includes(item.bucketHash)
      );
    }

    // Add item details
    const itemsWithDetails = await Promise.all(
      allItems.map(async (item) => {
        const definition = await getDefinition(
          "DestinyInventoryItemDefinition",
          item.itemHash
        );
        return {
          ...item,
          definition: definition
            ? {
                displayProperties: definition.displayProperties,
                itemTypeDisplayName: definition.itemTypeDisplayName,
                tierTypeName: definition.tierTypeName,
              }
            : null,
          stats:
            profileData.itemComponents?.stats?.data?.[item.itemInstanceId]?.stats ||
            null,
          sockets:
            profileData.itemComponents?.sockets?.data?.[item.itemInstanceId] ||
            null,
        };
      })
    );

    // Filter by search query if provided
    let filteredItems = itemsWithDetails;
    if (query) {
      const searchLower = query.toLowerCase();
      filteredItems = itemsWithDetails.filter((item) => {
        const name =
          item.definition?.displayProperties?.name?.toLowerCase() || "";
        const type = item.definition?.itemTypeDisplayName?.toLowerCase() || "";
        return name.includes(searchLower) || type.includes(searchLower);
      });
    }

    res.json({
      items: filteredItems,
      total: filteredItems.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to search items",
    });
  }
});

// Get loadouts
router.get("/loadouts", ensureAuthenticated, async (req, res) => {
  try {
    const { characterId } = req.query;
    const { membershipType, membershipId } = req.session.destinyMembership;

    const data = await makeApiRequest(
      `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/Loadouts/`,
      { session: req.session }
    );

    res.json(data);
  } catch (error) {
    console.error("Loadouts fetch error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch loadouts",
    });
  }
});

// Get vendor data (for mods)
router.get("/vendors", ensureAuthenticated, async (req, res) => {
  try {
    const { characterId } = req.query;
    const { membershipType, membershipId } = req.session.destinyMembership;

    // Components: 400=Vendors, 402=Categories, 300=Item components
    const components = "400,402,300";

    const data = await makeApiRequest(
      `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/Vendors/`,
      {
        params: { components },
        session: req.session,
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Vendors fetch error:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to fetch vendor data",
    });
  }
});

module.exports = router;
