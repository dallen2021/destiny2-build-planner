/* ---------------- CONSTANTS (unchanged artifact + bonus objects) ------------- */
const artifactMods = [
  [
    {
      type: "Champion Mod",
      name: "Anti-Barrier Scout and Pulse",
      description:
        "Your equipped Scout Rifles and Pulse Rifles fire shield-piercing rounds and stun Barrier Champions",
      elements: [],
    },
    {
      type: "Champion Mod",
      name: "Unstoppable Sidearm and Hand Cannon",
      description:
        "Aiming down the sights of a Hand Cannon or Sidearm for a short time loads a powerful payload that stuns unshielded combatants. Strong against Unstoppable champions",
      elements: [],
    },
    {
      type: "Champion Mod",
      name: "Unstoppable Sniper Rifle",
      description:
        "Aiming down the sights of a Sniper Rifle for a short time loads a powerful payload that stuns unshielded combatants. Strong against Unstoppable champions",
      elements: [],
    },
    {
      type: "Champion Mod",
      name: "Overload Shotgun",
      description:
        "Your equipped shotguns fire disrupting rounds which stun the target, delaying ability regeneration and lowering combatant damage output. Strong against Overload champions",
      elements: [],
    },
    {
      type: "Champion Mod",
      name: "Overload Rapid Fire",
      description:
        "Uninterrupted fire from your equipped Auto Rifles and Submachine Guns grants bullets that stun combatants, delaying ability regeneration and lowering combatant damage output",
      elements: [],
    },
  ],
  [
    {
      type: "Elemental Mod",
      name: "Flame, Fiber, and Freeze",
      description:
        "Combines the Solar/Strand and Solar/Stasis siphon mods into one",
      elements: ["solar", "strand", "stasis"],
    },
    {
      type: "Economy Mod",
      name: "Diviner's Discount",
      description: "All Scavenger mods are discounted",
      elements: [],
    },
    {
      type: "Armor Mod",
      name: "One With Frost",
      description:
        "While Frost Armor is active, Stasis weapons gain increased reload speed and stability. Stasis Swords gain increased guard resistance",
      elements: ["stasis"],
    },
    {
      type: "Armor Mod",
      name: "Tightly Woven",
      description:
        "While Woven Mail is active, gain increased Super and Grenade stats",
      elements: ["strand"],
    },
    {
      type: "Weapon Mod",
      name: "Rapid Precision Rifling",
      description:
        "Rapid precision hits or final blows with Scout Rifles grant them increased reload and reduced incoming flinch",
      elements: [],
    },
  ],
  [
    {
      type: "Combat Mod",
      name: "Fever and Chill",
      description:
        "Rapid Precision hits with Solar weapons grant Radiant. Rapid precision hits with Stasis weapons grant Frost Armor",
      elements: ["solar", "stasis"],
    },
    {
      type: "Support Mod",
      name: "Elemental Benevolence",
      description:
        "Granting allies an elemental buff gives Class ability energy",
      elements: ["solar", "arc", "void", "stasis", "strand"],
    },
    {
      type: "Armor Mod",
      name: "Frost Renewal",
      description:
        "While you have Frost Armor, taking critical damage releases a burst that freezes nearby combatants and grants Frost Armor to you and nearby allies",
      elements: ["stasis"],
    },
    {
      type: "Weapon Mod",
      name: "Reciprocal Draw",
      description:
        "Rapid non-Sidearm final blows grant Sidearms a period of increased damage for a short time upon next draw",
      elements: [],
    },
    {
      type: "Ability Mod",
      name: "Refresh Threads",
      description:
        "Picking up an elemental pickup matching your subclass element or Tangle while you have a Strand Super grants energy to your least charged ability",
      elements: ["strand"],
    },
  ],
  [
    {
      type: "Damage Mod",
      name: "Threaded Blast",
      description:
        "Destroying a Tangle with Strand damage increases the radius of the explosion and its damage",
      elements: ["strand"],
    },
    {
      type: "Elemental Mod",
      name: "Cauterized Darkness",
      description:
        "Stasis or Strand debuffed non-boss combatants take increased Solar damage from all sources",
      elements: ["solar", "stasis", "strand"],
    },
    {
      type: "Champion Mod",
      name: "Elemental Daze",
      description:
        "Stunning a Champion with an elemental weapon creates an elementally aligned explosion, applying a matching elemental debuff to them and nearby targets",
      elements: ["solar", "arc", "void", "stasis", "strand"],
    },
    {
      type: "Support Mod",
      name: "Shoulder to Shoulder",
      description:
        "Dealing sustained precision damage against combatants while near two or more allies grants you damage resistance",
      elements: [],
    },
    {
      type: "Elemental Mod",
      name: "Elemental Coalescence",
      description:
        "Defeating targets has the chance to create an elemental pickup matching your equipped Super element",
      elements: ["solar", "arc", "void", "stasis", "strand"],
    },
  ],
  [
    {
      type: "Ultimate Mod",
      name: "Radiant Shrapnel",
      description:
        "Dealing sustained weapon damage while Radiant or defeating a scorched combatant with a weapon causes the target to release Solar projectiles that deal damage and scorch on impact",
      elements: ["solar"],
    },
    {
      type: "Ultimate Mod",
      name: "Shieldcrush",
      description:
        "While you have Woven Mail, Frost Armor, or a Void overshield, your melee recharges faster and deals increased damage. While you are Amplified or Radiant, your grenade recharges faster and deals increased damage",
      elements: ["strand", "stasis", "void", "arc", "solar"],
    },
    {
      type: "Ultimate Mod",
      name: "Elemental Overdrive",
      description:
        "Picking up an elemental pickup or Tangle grants increased damage to weapons of the same element",
      elements: ["solar", "arc", "void", "stasis", "strand"],
    },
    {
      type: "Ultimate Mod",
      name: "Tangled Web",
      description:
        "Creating a Tangle by defeating a Strand debuffed target suspends nearby combatants",
      elements: ["strand"],
    },
    {
      type: "Ultimate Mod",
      name: "Frigid Glare",
      description:
        "While Frost Armor is active, Stasis precision final blows cause combatants to release a freezing burst",
      elements: ["stasis"],
    },
  ],
];

const statsArr = ["Weapons", "Health", "Class", "Grenade", "Super", "Melee"];
const statBonusData = {
  weapons: {
    reload_handling_speed: { 10: 1, 50: 5, 100: 10, 150: 10, 200: 10 },
    minor_major_damage: { 10: 1.5, 50: 7.5, 100: 15, 150: 15, 200: 15 },
    additional_ammo_chance: { 150: 49, 200: 100 },
    primary_special_boss_damage: { 100: 0, 200: 15 },
    primary_special_guardian_damage: { 100: 0, 200: 6 },
    heavy_boss_damage: { 100: 0, 200: 10 },
    heavy_guardian_damage: { 100: 0, 200: 6 },
  },
  health: {
    health_per_orb: { 10: 7, 50: 35, 100: 70, 150: 70, 200: 70 },
    flinch_resistance: { 10: 1, 50: 5, 100: 10, 150: 10, 200: 10 },
    shield_recharge_rate: { 100: 0, 200: 45 },
    shield_health: { 100: 0, 200: 20 },
  },
  class: {
    cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
    energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
    overshield_health: { 100: 0, 200: 40 },
  },
  grenade: {
    cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
    energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
    damage_increase_pve: { 100: 0, 200: 65 },
    damage_increase_pvp: { 100: 0, 200: 20 },
  },
  super: {
    energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
    damage_increase_pve: { 100: 0, 200: 45 },
    damage_increase_pvp: { 100: 0, 200: 15 },
  },
  melee: {
    cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
    energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
    damage_increase_pve: { 100: 0, 200: 30 },
    damage_increase_pvp: { 100: 0, 200: 20 },
  },
};

/* Define exotic class item combinations for each class */
const exoticClassItemCombinations = {
  hunter: {
    column1: ["assassinsCowl", "caliban"],
    column2: ["liarsHandshake", "synthocepsHunter"],
  },
  titan: {
    column1: ["severanceEnclosure"],
    column2: ["synthocepsTitan"],
  },
  warlock: {
    column1: ["necroticGrip"],
    column2: ["synthocepsWarlock"],
  },
};

/* ------------------- GLOBAL STATE ------------------- */
let selectedMods = new Set();
let columnCounts = [0, 0, 0, 0, 0];
let activeElementFilters = new Set();
let currentClass = "hunter";
let selectedExotics = new Set();
window.calculatedStatBonuses = {};
let isAuthenticated = false;
const state = {
  statValues: {
    Weapons: 10,
    Health: 10,
    Class: 10,
    Melee: 10,
    Grenade: 10,
    Super: 10,
  },
};

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Content Loaded - initializing app");

  await initializeApp();
  initializeArtifact();
  initStatAllocator();
  updateAllStatCalculations();
  const savedClass = localStorage.getItem("d2SelectedClass") || "hunter";
  selectClass(savedClass);

  // Initialize armor display
  displayNoArmorMessage();
  setupArmorFilters();

  console.log("App initialization complete");
});

/* -------- INITIALIZATION -------- */
async function initializeApp() {
  try {
    // Check for auth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authResult = urlParams.get("auth");

    if (authResult === "success") {
      showNotification("Successfully signed in with Bungie!", "success");
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authResult === "error") {
      showNotification("Failed to sign in. Please try again.", "error");
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Load class definitions for character names
    classDefinitions = await Manifest.getClasses();

    // Check authentication status
    const authStatus = await API.auth.checkStatus();
    updateAuthUI(authStatus);
    showLoading(false);
  } catch (error) {
    console.error("Initialization error:", error);
    showNotification("Failed to initialize application", "error");
    showLoading(false);
  }
}

/* -------- AUTH FUNCTIONS -------- */
function updateAuthUI(authStatus) {
  const authButton = document.getElementById("authButton");
  const userInfo = document.getElementById("userInfo");
  const username = document.getElementById("username");
  const sideMenuUsername = document.getElementById("sideMenuUsername");

  isAuthenticated = authStatus.authenticated;

  if (authStatus.authenticated) {
    // User is logged in
    authButton.textContent = "Sign Out";
    authButton.onclick = handleSignOut;

    if (authStatus.user?.destinyMemberships?.length) {
      const displayName = authStatus.user.destinyMemberships[0].displayName;
      username.textContent = displayName || "Guardian";
      sideMenuUsername.textContent = displayName || "Guardian";
    } else if (authStatus.destinyMembership) {
      username.textContent =
        authStatus.destinyMembership.displayName || "Guardian";
      sideMenuUsername.textContent =
        authStatus.destinyMembership.displayName || "Guardian";
    }

    userInfo.style.display = "flex";

    // Load armor inventory when authenticated if on armor display tab
    const activeTab = document.querySelector(".nav-tab.active");
    if (activeTab && activeTab.textContent.trim() === "Armor") {
      loadArmorInventory();
    }
  } else {
    // User is not logged in
    authButton.textContent = "Sign in with Bungie";
    authButton.onclick = handleAuth;
    userInfo.style.display = "none";
    sideMenuUsername.textContent = "Guardian";

    // Clear armor display when not authenticated
    armorLoaded = false;
    allItems = []; // Changed from armorItems
    displayNoArmorMessage();
  }
}

async function handleAuth() {
  API.auth.login();
}

async function handleSignOut() {
  if (confirm("Are you sure you want to sign out?")) {
    await API.auth.logout();
  }
}

/* -------- GENERAL UI FUNCTIONS -------- */
function switchTab(tabName) {
  document
    .querySelectorAll(".nav-tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".content-section")
    .forEach((section) => section.classList.remove("active"));
  document
    .querySelector(`.nav-tab[onclick="switchTab('${tabName}')"]`)
    .classList.add("active");
  document.getElementById(tabName).classList.add("active");

  // Load armor when switching to armor display tab if authenticated
  if (tabName === "armorDisplay" && isAuthenticated) {
    loadArmorInventory();
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function showLoading(show) {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = show ? "flex" : "none";
  }
}

function toggleSideMenu() {
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.classList.toggle("active");
}

function openSettings() {
  showNotification("Settings feature coming soon!", "info");
  // TODO: Implement settings panel in the future
}

/* -------- ARMOR DISPLAY FUNCTIONS -------- */
let allItems = []; // Store ALL items, not just armor
let filteredArmorItems = [];
let armorLoaded = false;
let armorLoading = false;
let armorCurrentPage = 1;
const armorItemsPerPage = 20;
let classDefinitions = {};

function combineInventoryItems(inventoryData) {
  console.log("=== COMBINING INVENTORY ITEMS ===");
  let all = [];

  // Log the entire inventory data structure
  console.log("Full inventory data structure:", inventoryData);

  // Check vault items (profileInventory)
  if (inventoryData.profileInventory?.data?.items) {
    console.log(
      `Vault items found: ${inventoryData.profileInventory.data.items.length}`
    );
    console.log(
      "First 5 vault items:",
      inventoryData.profileInventory.data.items.slice(0, 5)
    );

    // Add location property to vault items
    const vaultItems = inventoryData.profileInventory.data.items.map(
      (item) => ({
        ...item,
        location: 2, // Vault location
      })
    );

    all = all.concat(vaultItems);
  } else {
    console.log("No vault items found in profileInventory");
  }

  // Check character inventories
  if (inventoryData.characterInventories?.data) {
    console.log(
      "Character inventories found:",
      Object.keys(inventoryData.characterInventories.data)
    );
    Object.entries(inventoryData.characterInventories.data).forEach(
      ([charId, inv]) => {
        console.log(`Character ${charId} has ${inv.items?.length || 0} items`);
        if (inv.items) {
          // Add location property to character inventory items
          const charItems = inv.items.map((item) => ({
            ...item,
            location: 1, // Character inventory location
            characterId: charId,
          }));
          all = all.concat(charItems);
        }
      }
    );
  } else {
    console.log("No character inventories found");
  }

  // Check equipped items
  if (inventoryData.characterEquipment?.data) {
    console.log(
      "Character equipment found:",
      Object.keys(inventoryData.characterEquipment.data)
    );
    Object.entries(inventoryData.characterEquipment.data).forEach(
      ([charId, equip]) => {
        console.log(
          `Character ${charId} has ${equip.items?.length || 0} equipped items`
        );
        if (equip.items) {
          // Add location property to equipped items
          const equipItems = equip.items.map((item) => ({
            ...item,
            location: 1, // Character location (equipped)
            characterId: charId,
            isEquipped: true,
          }));
          all = all.concat(equipItems);
        }
      }
    );
  } else {
    console.log("No character equipment found");
  }

  console.log(`Total combined items: ${all.length}`);
  return all;
}

async function loadArmorInventory() {
  const armorGrid = document.getElementById("character-inventories");
  if (!armorGrid) return;

  if (armorLoaded && allItems.length > 0) {
    applyArmorFilters();
    return;
  }

  if (armorLoading) return;
  armorLoading = true;

  try {
    showLoading(true);
    armorGrid.innerHTML =
      '<div class="loading-spinner" style="margin: 40px auto;"></div>';

    const inventoryData = await API.inventory.getInventory();
    window.inventory = inventoryData;
    classDefinitions = await Manifest.getClasses();

    const itemComponents = inventoryData.itemComponents || {};
    allItems = combineInventoryItems(inventoryData); // Store ALL items

    console.log("=== ANALYZING ALL ITEMS ===");
    console.log(`Total items before any filtering: ${allItems.length}`);

    // Log bucket distribution
    const bucketCounts = {};
    allItems.forEach((item) => {
      bucketCounts[item.bucketHash] = (bucketCounts[item.bucketHash] || 0) + 1;
    });
    console.log("Items by bucket hash:", bucketCounts);

    // Log location distribution
    const locationCounts = {};
    allItems.forEach((item) => {
      locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
    });
    console.log("Items by location:", locationCounts);

    // Get unique hashes for ALL items
    const uniqueHashes = [...new Set(allItems.map((item) => item.itemHash))];
    console.log(`Unique item hashes: ${uniqueHashes.length}`);

    const itemDefinitions = await Manifest.getItems(uniqueHashes);

    // Process ALL items, not just armor
    allItems = allItems.map((item) => {
      const definition = itemDefinitions[item.itemHash];
      const stats =
        itemComponents.stats?.data?.[item.itemInstanceId]?.stats || {};

      return {
        ...item,
        definition: definition || {
          displayProperties: { name: `Item ${item.itemHash}` },
        },
        stats: stats,
        power:
          itemComponents.instances?.data?.[item.itemInstanceId]?.primaryStat
            ?.value || 0,
      };
    });

    // Log some vault items to see what they are
    const vaultItems = allItems.filter((item) => item.location === 2);
    console.log(`Vault items after processing: ${vaultItems.length}`);
    if (vaultItems.length > 0) {
      console.log("Sample vault items (first 10):");
      vaultItems.slice(0, 10).forEach((item, index) => {
        console.log(
          `${index + 1}. ${item.definition?.displayProperties?.name} (${
            item.definition?.itemTypeDisplayName
          })`
        );
      });
    }

    armorLoaded = true;
    armorLoading = false;
    applyArmorFilters();
    setupArmorFilters();

    showLoading(false);
  } catch (error) {
    console.error("Failed to load armor inventory:", error);
    armorLoaded = false;
    armorLoading = false;

    if (
      error.message.includes("Not authenticated") ||
      error.message.includes("401")
    ) {
      displayNoArmorMessage(
        "Please sign in with Bungie to view your armor collection"
      );
    } else {
      showNotification("Failed to load armor inventory", "error");
      displayNoArmorMessage("Failed to load armor. Please try refreshing.");
    }
    showLoading(false);
  }
}

function displayArmorItems(items) {
  console.log("=== DISPLAYING ALL ITEMS ===");
  console.log(`Total items to display: ${items.length}`);

  const charactersContainer = document.getElementById("character-inventories");
  if (!charactersContainer) {
    console.error("Character inventories container not found!");
    return;
  }

  charactersContainer.innerHTML = "";

  // Create a grid to display all items
  const itemsGrid = document.createElement("div");
  itemsGrid.className = "armor-grid";
  itemsGrid.style.cssText =
    "display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;";

  // Display each item
  items.forEach((item) => {
    const itemElement = createUniversalItemElement(item);
    itemsGrid.appendChild(itemElement);
  });

  charactersContainer.appendChild(itemsGrid);

  // Hide the vault section since we're showing everything here
  const vaultSection = document.getElementById("vault-inventory");
  if (vaultSection) {
    vaultSection.style.display = "none";
  }
}

function displayVaultItems(armorItems) {
  // We're not using this function anymore since everything is displayed in the main grid
  return;
}

function getCharacterName(characterId) {
  const characterData = window.inventory.characters?.data?.[characterId];
  if (characterData) {
    const classDef = classDefinitions[characterData.classHash];
    return classDef
      ? classDef.displayProperties.name
      : `Character ${characterId}`;
  }
  return `Character ${characterId}`;
}

function createUniversalItemElement(item) {
  const name = item.definition?.displayProperties?.name || "Unknown Item";
  const icon = item.definition?.displayProperties?.icon
    ? `https://www.bungie.net${item.definition.displayProperties.icon}`
    : "";
  const tierType = item.definition?.inventory?.tierTypeName || "";
  const itemType = item.definition?.itemTypeDisplayName || "";

  let totalStats = 0;
  const statValues = {};
  if (item.stats) {
    const mainStatHashes = Object.keys(Manifest.statHashes);
    for (const statHash of mainStatHashes) {
      const statValue = item.stats[statHash]?.value || 0;
      totalStats += statValue;
      statValues[statHash] = statValue;
    }
  }

  const rarityClass =
    tierType.toLowerCase() === "exotic"
      ? "exotic"
      : tierType.toLowerCase() === "legendary"
        ? "legendary"
        : "";

  const wrapper = document.createElement("div");
  wrapper.className = `armor-item ${rarityClass}`;
  wrapper.dataset.itemId = item.itemInstanceId || item.itemHash;
  wrapper.addEventListener("click", () => selectArmorItem(item.itemInstanceId));

  // Determine if this is armor
  const armorBuckets = [3448274439, 3551918588, 14239492, 20886954, 1585787867];
  const isArmor = armorBuckets.includes(item.bucketHash);

  // Basic item info that all items have
  let itemHtml = `
    <div class="armor-header">
      <div class="armor-icon">
        ${icon ? `<img src="${icon}" alt="${name}" />` : ""}
      </div>
      <div class="armor-info">
        <div class="armor-name">${name}</div>
        <div class="armor-type">${itemType}</div>
        ${
          item.quantity > 1
            ? `<div style="color: #8af295;">Quantity: ${item.quantity}</div>`
            : ""
        }
      </div>
    </div>
  `;

  // Add power level if it exists
  if (item.power) {
    itemHtml = `<div class="armor-power">${item.power}</div>` + itemHtml;
  }

  // Add stats for armor items
  if (isArmor && item.stats) {
    itemHtml += `
      <div class="armor-stats">
        ${Object.entries(Manifest.statHashes)
          .map(
            ([hash, statName]) => `
          <div class="stat-item">
            <div class="stat-name">${statName.substring(0, 3)}</div>
            <div class="stat-value">${statValues[hash] || 0}</div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="armor-tags">
        <span class="armor-tag">Total: ${totalStats}</span>
      </div>
    `;
  } else {
    // For non-armor items, show basic tags
    itemHtml += `
      <div class="armor-tags">
        <span class="armor-tag">${tierType || "Common"}</span>
        ${
          item.isEquipped
            ? '<span class="armor-tag" style="background: #8af295; color: #000;">EQUIPPED</span>'
            : ""
        }
        <span class="armor-tag" style="background: rgba(138, 43, 226, 0.5);">
          ${item.location === 2 ? "Vault" : "Character"}
        </span>
      </div>
    `;
  }

  wrapper.innerHTML = itemHtml;

  return wrapper;
}

function createItemElement(item) {
  // Redirect to universal element creator
  return createUniversalItemElement(item);
}

function displayNoArmorMessage(
  message = "Sign in with Bungie to view your armor collection"
) {
  const container = document.getElementById("character-inventories");
  if (container) {
    container.innerHTML = `<div class="empty-state">${message}</div>`;
  }
  const vault = document.getElementById("vault-items-container");
  if (vault) {
    vault.innerHTML = "";
  }
}

function updateArmorPagination(totalPages) {
  const info = document.getElementById("armorPageInfo");
  const prev = document.getElementById("armorPrevPage");
  const next = document.getElementById("armorNextPage");
  const container = document.getElementById("armorPagination");
  if (!info || !prev || !next || !container) return;

  info.textContent = `Page ${armorCurrentPage} of ${totalPages}`;
  prev.disabled = armorCurrentPage <= 1;
  next.disabled = armorCurrentPage >= totalPages;
  container.style.display = totalPages > 1 ? "flex" : "none";
}

function renderArmorPage() {
  const totalPages =
    Math.ceil(filteredArmorItems.length / armorItemsPerPage) || 1;
  if (armorCurrentPage > totalPages) armorCurrentPage = totalPages;
  if (armorCurrentPage < 1) armorCurrentPage = 1;
  const start = (armorCurrentPage - 1) * armorItemsPerPage;
  const end = start + armorItemsPerPage;
  const pageItems = filteredArmorItems.slice(start, end);
  displayArmorItems(pageItems);
  updateArmorPagination(totalPages);
}

function goToNextArmorPage() {
  armorCurrentPage++;
  renderArmorPage();
}

function goToPrevArmorPage() {
  armorCurrentPage--;
  renderArmorPage();
}

function setupArmorFilters() {
  // Check if already set up
  const searchInput = document.getElementById("armorSearchInput");
  if (searchInput && searchInput.dataset.initialized) {
    return;
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(() => applyArmorFilters(), 300)
    );
    searchInput.dataset.initialized = "true";
  }

  // Class filter
  const classFilter = document.getElementById("armorClassFilter");
  if (classFilter && !classFilter.dataset.initialized) {
    classFilter.addEventListener("change", () => applyArmorFilters());
    classFilter.dataset.initialized = "true";
  }

  // Slot filter
  const slotFilter = document.getElementById("armorSlotFilter");
  if (slotFilter && !slotFilter.dataset.initialized) {
    slotFilter.addEventListener("change", () => applyArmorFilters());
    slotFilter.dataset.initialized = "true";
  }

  const prev = document.getElementById("armorPrevPage");
  const next = document.getElementById("armorNextPage");
  if (prev && !prev.dataset.initialized) {
    prev.addEventListener("click", () => goToPrevArmorPage());
    prev.dataset.initialized = "true";
  }
  if (next && !next.dataset.initialized) {
    next.addEventListener("click", () => goToNextArmorPage());
    next.dataset.initialized = "true";
  }
}

function applyArmorFilters() {
  const searchValue =
    document.getElementById("armorSearchInput")?.value.toLowerCase() || "";
  const classValue =
    document.getElementById("armorClassFilter")?.value || "all";
  const slotValue = document.getElementById("armorSlotFilter")?.value || "all";

  console.log("=== APPLYING FILTERS ===");
  console.log("Filters:", {
    searchValue,
    classValue,
    slotValue,
    totalItems: allItems.length,
  });

  // For now, just show ALL items without filtering by armor type
  filteredArmorItems = allItems.filter((item) => {
    // Search filter
    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      const type = item.definition?.itemTypeDisplayName?.toLowerCase() || "";
      if (!name.includes(searchValue) && !type.includes(searchValue)) {
        return false;
      }
    }

    // Class filter - only apply to armor items
    const armorBuckets = [
      3448274439, 3551918588, 14239492, 20886954, 1585787867,
    ];
    if (classValue !== "all" && armorBuckets.includes(item.bucketHash)) {
      const itemClass = item.definition?.classType;
      if (
        itemClass !== undefined &&
        itemClass !== parseInt(classValue) &&
        itemClass !== 3 // 3 = all classes
      ) {
        return false;
      }
    }

    // Slot filter - only apply to items in armor slots
    if (slotValue !== "all" && armorBuckets.includes(parseInt(slotValue))) {
      if (item.bucketHash !== parseInt(slotValue)) {
        return false;
      }
    }

    return true;
  });

  console.log(`Filtered to ${filteredArmorItems.length} items`);

  armorCurrentPage = 1;
  renderArmorPage();
}

async function refreshData() {
  showNotification("Refreshing armor data...", "info");
  armorLoaded = false; // Force reload
  armorLoading = false; // Reset loading flag
  await loadArmorInventory();
  showNotification("Armor data refreshed!", "success");
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle armor item selection
function selectArmorItem(itemId) {
  // TODO: Implement armor item selection logic
  // For now, just show item details
  const item = allItems.find((i) => i.itemInstanceId === itemId);
  if (item) {
    showNotification(
      `Selected: ${item.definition?.displayProperties?.name || "Unknown Item"}`,
      "info"
    );
  }
}

// Debug function to manually check inventory
window.debugInventory = async function () {
  try {
    console.log("=== MANUAL INVENTORY DEBUG ===");
    const data = await API.inventory.getInventory();
    console.log("Full API Response:", data);

    // Check response structure
    console.log("Response keys:", Object.keys(data));

    let totalItems = 0;

    // Check each possible location
    if (data.characterInventories?.data) {
      console.log("characterInventories structure:", data.characterInventories);
      for (const charId in data.characterInventories.data) {
        const items = data.characterInventories.data[charId].items || [];
        console.log(`Character ${charId} inventory:`, items.length, "items");
        totalItems += items.length;
      }
    } else {
      console.log("No characterInventories.data found");
    }

    if (data.characterEquipment?.data) {
      console.log("characterEquipment structure:", data.characterEquipment);
      for (const charId in data.characterEquipment.data) {
        const items = data.characterEquipment.data[charId].items || [];
        console.log(`Character ${charId} equipment:`, items.length, "items");
        totalItems += items.length;
      }
    } else {
      console.log("No characterEquipment.data found");
    }

    if (data.profileInventory?.data?.items) {
      console.log("profileInventory structure:", data.profileInventory);
      console.log("Vault items:", data.profileInventory.data.items.length);
      totalItems += data.profileInventory.data.items.length;
    } else {
      console.log("No profileInventory.data.items found");
    }

    console.log("Total items found:", totalItems);

    // Check item components
    console.log(
      "Item components available:",
      Object.keys(data.itemComponents || {})
    );

    return data;
  } catch (error) {
    console.error("Debug inventory error:", error);
    throw error;
  }
};

// Debug vault items specifically
window.debugVault = function () {
  console.log("=== VAULT DEBUG ===");

  const vaultItems = allItems.filter((item) => item.location === 2);
  console.log(`Total vault items: ${vaultItems.length}`);

  // Group by item type
  const itemTypes = {};
  vaultItems.forEach((item) => {
    const type = item.definition?.itemTypeDisplayName || "Unknown";
    itemTypes[type] = (itemTypes[type] || 0) + 1;
  });

  console.log("Vault items by type:");
  Object.entries(itemTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

  // Show first 20 vault items with details
  console.log("\nFirst 20 vault items:");
  vaultItems.slice(0, 20).forEach((item, index) => {
    console.log(`${index + 1}. ${item.definition?.displayProperties?.name}`);
    console.log(`   Type: ${item.definition?.itemTypeDisplayName}`);
    console.log(`   Tier: ${item.definition?.inventory?.tierTypeName}`);
    console.log(`   Bucket: ${item.bucketHash}`);
    console.log(`   Location: ${item.location}`);
  });
};

// Rest of the code remains the same...
/* ---------------- Stat allocator via BOXES ---------------- */
function initStatAllocator() {
  const alloc = document.getElementById("statAllocator");
  statsArr.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `<label>${stat}</label><div id="${stat.toLowerCase()}Row" class="stat-row-data"></div>`;
    alloc.appendChild(row);
    buildStatBoxes(stat);
  });
}

function buildStatBoxes(stat) {
  const wrapper = document.createElement("div");
  wrapper.className = "stat-box-wrapper";
  for (let val = 10; val <= 200; val += 10) {
    const box = document.createElement("div");
    box.className = "stat-box";
    box.dataset.stat = stat;
    box.dataset.value = val;
    box.textContent = val;
    box.addEventListener("click", onStatBoxClick);
    wrapper.appendChild(box);
  }
  document.getElementById(stat.toLowerCase() + "Row").appendChild(wrapper);
  const bonusDiv = document.createElement("div");
  bonusDiv.className = "stat-bonuses";
  bonusDiv.id = `${stat.toLowerCase()}Bonuses`;
  document.getElementById(stat.toLowerCase() + "Row").appendChild(bonusDiv);
}

function onStatBoxClick(e) {
  const stat = e.currentTarget.dataset.stat;
  const val = Number(e.currentTarget.dataset.value);
  state.statValues[stat] = val;
  updateAllStatCalculations();
}

/* ----------- Calculation & UI refresh ----------- */
function updateAllStatCalculations() {
  const allocated = Object.values(state.statValues).reduce((a, b) => a + b, 0);

  const summary = document.getElementById("statPointSummary");
  if (summary) {
    summary.textContent = `Total Points: ${allocated}`;
  }

  statsArr.forEach((stat) => {
    const cur = state.statValues[stat];
    document
      .querySelectorAll(`.stat-box[data-stat='${stat}']`)
      .forEach((box) => {
        const value = Number(box.dataset.value);
        box.classList.toggle("selected", value === cur);
        box.classList.remove("disabled");
      });
  });

  applyStatBonuses();
}

function interpolate(points, x) {
  const ks = Object.keys(points)
    .map(Number)
    .sort((a, b) => a - b);
  let lower = ks[0];
  for (const k of ks) {
    if (x >= k) lower = k;
    else break;
  }
  if (x < ks[0]) return 0;
  const upper = ks[ks.indexOf(lower) + 1];
  if (upper == undefined) return points[lower] || 0;
  const v1 = points[lower] || 0,
    v2 = points[upper] || 0;
  return v1 + ((v2 - v1) * (x - lower)) / (upper - lower);
}

function applyStatBonuses() {
  window.calculatedStatBonuses = {};
  statsArr.forEach((stat) => {
    const val = state.statValues[stat];
    const bonuses = statBonusData[stat.toLowerCase()];
    const display = document.getElementById(`${stat.toLowerCase()}Bonuses`);
    let parts = [];
    window.calculatedStatBonuses[stat.toLowerCase()] = {};
    for (const [k, pts] of Object.entries(bonuses)) {
      const num = interpolate(pts, val);
      if (num !== 0) {
        const text = k
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        parts.push(
          `${text}: <span style='color:#8af295;'>${
            num > 0 ? "+" : ""
          }${num.toFixed(1)}%</span>`
        );
        window.calculatedStatBonuses[stat.toLowerCase()][k] = num / 100;
      }
    }
    if (display) {
      display.innerHTML = parts.join(" | ");
    }
  });

  updateTheoreticalBuffState();
  recalculateAllDamage();
}

function updateTheoreticalBuffState() {
  const superStat = state.statValues.Super;
  const container = document.getElementById("theoreticalWellBuffContainer");
  const checkbox = document.getElementById("theoreticalWellBuff");

  if (superStat >= 110) {
    if (container) container.classList.remove("disabled");
    if (checkbox) checkbox.disabled = false;
  } else {
    if (container) container.classList.add("disabled");
    if (checkbox) {
      checkbox.disabled = true;
      checkbox.checked = false;
    }
  }
}

/* ---- ARTIFACT / DAMAGE / CLASS functions ---- */
function initializeArtifact() {
  const t = document.getElementById("columnsWrapper");
  if (!t) return;
  t.innerHTML = "";
  artifactMods.forEach((e, n) => {
    const o = document.createElement("div");
    o.className = "column";
    const l = document.createElement("div");
    l.className = "column-header";
    l.textContent = `Column ${n + 1}`;
    o.appendChild(l);
    e.forEach((e, l) => {
      o.appendChild(createModCard(e, n, l));
    });
    t.appendChild(o);
  });
  const artifactFilters = document.getElementById("artifactFilters");
  if (artifactFilters) {
    artifactFilters.addEventListener("click", (t) => {
      if (t.target.classList.contains("element-filter-btn")) {
        const e = t.target.dataset.element;
        t.target.classList.toggle("active");
        activeElementFilters.has(e)
          ? activeElementFilters.delete(e)
          : activeElementFilters.add(e);
        applyArtifactFilters();
      }
    });
  }
  updateUI();
}

function createModCard(t, e, n) {
  const o = document.createElement("div");
  o.className = "mod-card";
  o.dataset.column = e;
  o.dataset.index = n;
  const l = document.createElement("div");
  l.className = "mod-type";
  l.textContent = t.type;
  const d = document.createElement("div");
  d.className = "mod-name";
  d.textContent = t.name;
  const a = document.createElement("div");
  a.className = "mod-description";
  a.textContent = t.description;
  o.appendChild(l);
  o.appendChild(d);
  o.appendChild(a);
  o.addEventListener("click", () => toggleMod(`${e}-${n}`, e));
  return o;
}

function applyArtifactFilters() {
  const t = document.querySelectorAll(".mod-card");
  if (0 === activeElementFilters.size)
    return void t.forEach((t) => t.classList.remove("highlighted", "dimmed"));
  t.forEach((t) => {
    const e = artifactMods[t.dataset.column][t.dataset.index].elements.some(
      (t) => activeElementFilters.has(t)
    );
    t.classList.toggle("highlighted", e);
    t.classList.toggle("dimmed", !e);
  });
}

function toggleMod(t, e) {
  const n = document.querySelector(
    `[data-column='${e}'][data-index='${t.split("-")[1]}']`
  );
  if (n && !n.classList.contains("locked")) {
    if (selectedMods.has(t)) {
      selectedMods.delete(t);
      columnCounts[e]--;
    } else if (selectedMods.size >= 12) {
      alert("Maximum 12 mods can be selected!");
    } else if (4 === e && columnCounts[4] >= 2) {
      alert("Maximum 2 mods can be selected in Column 5!");
    } else {
      selectedMods.add(t);
      columnCounts[e]++;
    }
    updateUI();
    updateArtifactBuffs();
  }
}

function updateUI() {
  const modCount = document.getElementById("modCount");
  if (modCount) {
    modCount.textContent = selectedMods.size;
  }
  document.querySelectorAll(".mod-card").forEach((t) => {
    const e = parseInt(t.dataset.column);
    const n = parseInt(t.dataset.index);
    const o = `${e}-${n}`;
    t.classList.remove("selected", "locked");
    if (selectedMods.has(o)) t.classList.add("selected");
    if (isColumnLocked(e)) t.classList.add("locked");
  });
}

function isColumnLocked(t) {
  const e = selectedMods.size;
  switch (t) {
    case 1:
      return columnCounts[0] < 3;
    case 2:
      return e < 5;
    case 3:
      return e < 8;
    case 4:
      return e < 10;
    default:
      return false;
  }
}

function resetSelection() {
  selectedMods.clear();
  columnCounts = [0, 0, 0, 0, 0];
  updateUI();
  updateArtifactBuffs();
}

function updateArtifactBuffs() {
  const elementalOverdrive = document.getElementById("elementalOverdrive");
  const radiantShrapnel = document.getElementById("radiantShrapnel");
  if (elementalOverdrive) {
    elementalOverdrive.checked = selectedMods.has("4-2");
  }
  if (radiantShrapnel) {
    radiantShrapnel.checked = selectedMods.has("4-0");
  }
  recalculateAllDamage();
}

function recalculateAllDamage() {
  calculateWeaponDamage();
  calculateMeleeDamage();
  calculateGrenadeDamage();
  calculateSuperDamage();
}

function calculateWeaponDamage() {
  let t = 1,
    e = [];
  const n = window.calculatedStatBonuses.weapons || {};

  // Stat Bonus Damage
  if (n.heavy_boss_damage) {
    t *= 1 + n.heavy_boss_damage;
    e.push("Heavy Boss Dmg");
  }

  // Global Stacking Buffs
  if (document.getElementById("newGearWeapon")?.checked) {
    t *= 1.1;
    e.push("New Gear (Art.)");
  }

  const theoreticalBuffCheckbox = document.getElementById(
    "theoreticalWellBuff"
  );
  if (theoreticalBuffCheckbox?.checked && !theoreticalBuffCheckbox.disabled) {
    t *= 1.15;
    e.push("Theo. Well User");
  }

  // Empowering Buffs (Highest Applies)
  let o = { value: 1 };
  [
    { id: "radiant", value: 1.25, name: "Radiant" },
    { id: "wellOfRadiance", value: 1.25, name: "Well" },
    { id: "nobleRounds", value: 1.35, name: "Noble Rds" },
  ].forEach((buff) => {
    if (document.getElementById(buff.id)?.checked && buff.value > o.value) {
      o = buff;
    }
  });
  if (o.value > 1) {
    t *= o.value;
    e.push(o.name);
  }

  // Weapon Damage Buffs (Highest Applies)
  let l = { value: 1 };
  [{ id: "weaponSurge3x", value: 1.22, name: "Surge x3" }].forEach((buff) => {
    if (document.getElementById(buff.id)?.checked && buff.value > l.value) {
      l = buff;
    }
  });
  if (l.value > 1) {
    t *= l.value;
    e.push(l.name);
  }

  // Weapon Perks (All Stack Multiplicatively)
  [
    { id: "elementalOverdrive", value: 1.25, name: "Overdrive" },
    { id: "killClip", value: 1.25, name: "Kill Clip" },
    { id: "vorpalWeapon", value: 1.15, name: "Vorpal" },
    { id: "frenzy", value: 1.15, name: "Frenzy" },
    { id: "baitSwitch", value: 1.3, name: "B&S" },
    { id: "radiantShrapnel", value: 1.15, name: "Shrapnel" },
  ].forEach((perk) => {
    if (document.getElementById(perk.id)?.checked) {
      t *= perk.value;
      e.push(perk.name);
    }
  });

  // Debuffs (Highest Applies)
  let d = { value: 1 };
  [
    { id: "weakenDebuff", value: 1.15, name: "Weaken" },
    { id: "tetherDebuff", value: 1.3, name: "Tether" },
    { id: "divinityDebuff", value: 1.15, name: "Divinity" },
    { id: "tractorCannon", value: 1.3, name: "Tractor" },
  ].forEach((debuff) => {
    if (document.getElementById(debuff.id)?.checked && debuff.value > d.value) {
      d = debuff;
    }
  });
  if (d.value > 1) {
    t *= d.value;
    e.push(d.name);
  }

  // Update UI
  const weaponDamageResult = document.getElementById("weaponDamageResult");
  const weaponBreakdown = document.getElementById("weaponBreakdown");
  if (weaponDamageResult)
    weaponDamageResult.textContent = Math.round(100 * (t - 1) + 100) + "%";
  if (weaponBreakdown)
    weaponBreakdown.textContent =
      e.length > 0 ? "Active: " + e.join(" + ") : "Base damage";
}

function calculateMeleeDamage() {
  let t = 0,
    e = [];
  const n = {
    onetwoPunch: { v: 300, n: "1-2 Punch" },
    roaringFlames: { v: 200, n: "Roaring Flames" },
    bannerOfWar: { v: 100, n: "Banner" },
    combinationBlow: { v: 165, n: "Combo Blow" },
    liarsHandshake: { v: 400, n: "Liar's" },
    assassinsCowl: { v: 150, n: "Assassin's" },
    caliban: { v: 100, n: "Caliban's" },
    synthocepsHunter: { v: 400, n: "Syntho (CI)" },
    synthocepsTitan: { v: 400, n: "Syntho" },
    wormgodCaress: { v: 400, n: "Wormgod" },
    severanceEnclosure: { v: 200, n: "Severance" },
    wintersGuile: { v: 400, n: "Winter's" },
    necroticGrip: { v: 100, n: "Necrotic" },
    synthocepsWarlock: { v: 400, n: "Syntho (CI)" },
  };
  if (
    window.calculatedStatBonuses.melee &&
    window.calculatedStatBonuses.melee.damage_increase_pve
  ) {
    t += 100 * window.calculatedStatBonuses.melee.damage_increase_pve;
    e.push("Stat Bonus");
  }
  for (const o in n) {
    const l = document.getElementById(o);
    if (l && l.checked && !l.disabled) {
      t += n[o].v;
      e.push(n[o].n);
    }
  }
  const meleeDamageResult = document.getElementById("meleeDamageResult");
  const meleeBreakdown = document.getElementById("meleeBreakdown");
  if (meleeDamageResult)
    meleeDamageResult.textContent = (100 + t).toFixed(0) + "%";
  if (meleeBreakdown)
    meleeBreakdown.textContent = e.length
      ? "Active: " + e.join(" + ")
      : "Base damage (additive)";
}

function calculateGrenadeDamage() {
  let t = 1,
    e = [];
  if (
    window.calculatedStatBonuses.grenade &&
    window.calculatedStatBonuses.grenade.damage_increase_pve
  ) {
    t *= 1 + window.calculatedStatBonuses.grenade.damage_increase_pve;
    e.push("Stat Bonus");
  }
  const grenadeDamageResult = document.getElementById("grenadeDamageResult");
  const grenadeBreakdown = document.getElementById("grenadeBreakdown");
  if (grenadeDamageResult)
    grenadeDamageResult.textContent = Math.round(100 * t) + "%";
  if (grenadeBreakdown)
    grenadeBreakdown.textContent = e.length
      ? "Active: " + e.join(" + ")
      : "Base damage";
}

function calculateSuperDamage() {
  let t = 1,
    e = [];
  if (
    window.calculatedStatBonuses.super &&
    window.calculatedStatBonuses.super.damage_increase_pve
  ) {
    t *= 1 + window.calculatedStatBonuses.super.damage_increase_pve;
    e.push("Stat Bonus");
  }
  const superDamageResult = document.getElementById("superDamageResult");
  const superBreakdown = document.getElementById("superBreakdown");
  if (superDamageResult)
    superDamageResult.textContent = Math.round(100 * t) + "%";
  if (superBreakdown)
    superBreakdown.textContent = e.length
      ? "Active: " + e.join(" + ")
      : "Base damage";
}

function selectClass(t) {
  currentClass = t;
  localStorage.setItem("d2SelectedClass", t);
  document
    .querySelectorAll(".class-button")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(`.class-button[data-class='${t}']`)
    .forEach((b) => b.classList.add("active"));
  document
    .querySelectorAll(".exotic-group")
    .forEach((el) => (el.style.display = "none"));
  const group = document.querySelector("." + t + "-exotics");
  if (group) group.style.display = "block";
  selectedExotics.clear();
  document.querySelectorAll(".exotic-checkbox").forEach((c) => {
    c.checked = false;
  });
  updateExoticRestrictions();
  updateMeleeClassRestrictions();
}

function handleExoticSelection(t) {
  const e = document.getElementById(t);
  if (e?.checked) {
    selectedExotics.add(t);
  } else {
    selectedExotics.delete(t);
  }
  updateExoticRestrictions();
}

function updateExoticRestrictions() {
  const isClassItem = document.getElementById("exoticClassItem")?.checked;

  // Reset all disabled states
  document.querySelectorAll(".buff-item[data-exotic]").forEach((item) => {
    item.classList.remove("disabled");
  });

  if (isClassItem) {
    // Disable column 0 items
    document.querySelectorAll('[data-column="0"]').forEach((item) => {
      item.classList.add("disabled");
      const checkbox = item.querySelector("input");
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
        selectedExotics.delete(checkbox.id);
      }
    });

    // Get class item combinations for current class
    const combos = exoticClassItemCombinations[currentClass];

    // Check column 1 selections
    const selectedColumn1 = [...selectedExotics].filter((id) =>
      combos.column1.includes(id)
    );

    // Check column 2 selections
    const selectedColumn2 = [...selectedExotics].filter((id) =>
      combos.column2.includes(id)
    );

    // If one from column 1 is selected, disable others from column 1
    if (selectedColumn1.length > 0) {
      combos.column1.forEach((exoticId) => {
        if (!selectedColumn1.includes(exoticId)) {
          const item = document.querySelector(`[data-exotic="${exoticId}"]`);
          if (item) item.classList.add("disabled");
        }
      });
    }

    // If one from column 2 is selected, disable others from column 2
    if (selectedColumn2.length > 0) {
      combos.column2.forEach((exoticId) => {
        if (!selectedColumn2.includes(exoticId)) {
          const item = document.querySelector(`[data-exotic="${exoticId}"]`);
          if (item) item.classList.add("disabled");
        }
      });
    }

    // If 2 exotics are selected (one from each column), disable all others
    if (selectedExotics.size >= 2) {
      document
        .querySelectorAll('.buff-item[data-exotic]:not([data-column="0"])')
        .forEach((item) => {
          const checkbox = item.querySelector(".exotic-checkbox");
          if (checkbox && !checkbox.checked) {
            item.classList.add("disabled");
          }
        });
    }
  } else {
    // Regular exotic armor rules - only one exotic allowed
    if (selectedExotics.size >= 1) {
      document.querySelectorAll(".buff-item[data-exotic]").forEach((item) => {
        const checkbox = item.querySelector(".exotic-checkbox");
        if (checkbox && !checkbox.checked) {
          item.classList.add("disabled");
        }
      });
    }
  }

  recalculateAllDamage();
}

function updateMeleeClassRestrictions() {
  document.querySelectorAll("[data-melee-classes]").forEach((t) => {
    const e = t.dataset.meleeClasses.split(" ");
    const n = t.querySelector("input");
    const o = !e.includes("all") && !e.includes(currentClass);
    t.classList.toggle("disabled", o);
    if (n) {
      if (o) n.checked = false;
      n.disabled = o;
    }
  });
  recalculateAllDamage();
}
