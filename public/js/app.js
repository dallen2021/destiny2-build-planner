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
let selectedCharacterClass = "all"; // For armor/weapons display
let currentCharacterId = null; // Track current character
let charactersData = {}; // Store character data
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
    if (activeTab) {
      const tabText = activeTab.textContent.trim();
      if (tabText === "Armor") {
        loadArmorInventory();
      } else if (tabText === "Weapons") {
        loadWeaponsInventory();
      }
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

  // Load weapons when switching to weapons display tab if authenticated
  if (tabName === "weaponsDisplay" && isAuthenticated) {
    loadWeaponsInventory();
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
let allItems = []; // Store ALL items
let armorItems = []; // Filtered armor items
let weaponItems = []; // Filtered weapon items
let armorLoaded = false;
let armorLoading = false;
let classDefinitions = {};

// Armor bucket hashes
const ARMOR_BUCKETS = {
  3448274439: "Helmet",
  3551918588: "Gauntlets",
  14239492: "Chest Armor",
  20886954: "Leg Armor",
  1585787867: "Class Item",
};

// Weapon bucket hashes
const WEAPON_BUCKETS = {
  1498876634: "Kinetic Weapons",
  2465295065: "Energy Weapons",
  953998645: "Power Weapons",
};

function selectCharacterClass(className) {
  selectedCharacterClass = className;

  // Update button states for both tabs
  document.querySelectorAll(".class-button").forEach((btn) => {
    if (btn.dataset.class === className) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Find the character of this class
  if (charactersData && Object.keys(charactersData).length > 0) {
    for (const [charId, charData] of Object.entries(charactersData)) {
      const classType = charData.classType;
      if (
        (classType === 0 && className === "titan") ||
        (classType === 1 && className === "hunter") ||
        (classType === 2 && className === "warlock")
      ) {
        currentCharacterId = charId;
        break;
      }
    }
  }

  // Refresh current view
  const activeTab = document.querySelector(".nav-tab.active");
  if (activeTab) {
    if (activeTab.textContent.trim() === "Armor") {
      displayArmorInventory();
    } else if (activeTab.textContent.trim() === "Weapons") {
      displayWeaponsInventory();
    }
  }
}

function filterArmorItems(items) {
  return items.filter((item) =>
    Object.keys(ARMOR_BUCKETS).includes(String(item.bucketHash))
  );
}

function filterWeaponItems(items) {
  return items.filter((item) =>
    Object.keys(WEAPON_BUCKETS).includes(String(item.bucketHash))
  );
}

function combineInventoryItems(inventoryData) {
  console.log("=== COMBINING INVENTORY ITEMS ===");
  let all = [];

  // Store characters data for class filtering
  if (inventoryData.characters?.data) {
    charactersData = inventoryData.characters.data;
  }

  // Check vault items (profileInventory)
  // Important: profileInventory contains BOTH vault items AND consumables
  // Only items with bucketHash: 138197802 are actual vault items
  if (inventoryData.profileInventory?.data?.items) {
    const vaultItems = inventoryData.profileInventory.data.items.map(
      (item) => ({
        ...item,
        // Only mark items with vault bucket hash as vault items
        location: item.bucketHash === 138197802 ? 2 : 3, // 2 = Vault, 3 = Consumables/Other
      })
    );
    all = all.concat(vaultItems);
  }

  // Check character inventories
  if (inventoryData.characterInventories?.data) {
    Object.entries(inventoryData.characterInventories.data).forEach(
      ([charId, inv]) => {
        if (inv.items) {
          const charItems = inv.items.map((item) => ({
            ...item,
            location: 1, // Character inventory location
            characterId: charId,
          }));
          all = all.concat(charItems);
        }
      }
    );
  }

  // Check equipped items
  if (inventoryData.characterEquipment?.data) {
    Object.entries(inventoryData.characterEquipment.data).forEach(
      ([charId, equip]) => {
        if (equip.items) {
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
  }

  console.log(`Total combined items: ${all.length}`);
  return all;
}

async function loadArmorInventory() {
  if (armorLoaded && allItems.length > 0) {
    displayArmorInventory();
    return;
  }

  if (armorLoading) return;
  armorLoading = true;

  try {
    showLoading(true);

    const inventoryData = await API.inventory.getInventory();
    window.inventory = inventoryData;
    classDefinitions = await Manifest.getClasses();

    const itemComponents = inventoryData.itemComponents || {};
    allItems = combineInventoryItems(inventoryData);

    // Get unique hashes for ALL items
    const uniqueHashes = [...new Set(allItems.map((item) => item.itemHash))];
    const itemDefinitions = await Manifest.getItems(uniqueHashes);

    // Process ALL items
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

    // Filter armor and weapons
    armorItems = filterArmorItems(allItems);
    weaponItems = filterWeaponItems(allItems);

    armorLoaded = true;
    armorLoading = false;

    // Auto-select first character's class
    if (Object.keys(charactersData).length > 0) {
      const firstChar = Object.values(charactersData)[0];
      const className =
        firstChar.classType === 0
          ? "titan"
          : firstChar.classType === 1
            ? "hunter"
            : "warlock";
      selectCharacterClass(className);
    } else {
      displayArmorInventory();
    }

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

async function loadWeaponsInventory() {
  // If armor is already loaded, we have the data
  if (armorLoaded && weaponItems.length > 0) {
    displayWeaponsInventory();
    return;
  }

  // Otherwise load it
  await loadArmorInventory();
  displayWeaponsInventory();
}

function displayArmorInventory() {
  const characterSection = document.getElementById("character-armor-slots");
  const vaultSection = document.getElementById("vault-armor-items");

  if (!characterSection || !vaultSection) return;

  characterSection.innerHTML = "";
  vaultSection.innerHTML = "";

  // Get search filter
  const searchValue =
    document.getElementById("armorSearchInput")?.value.toLowerCase() || "";

  // Filter armor for current character
  const characterArmor = armorItems.filter((item) => {
    if (currentCharacterId && item.characterId !== currentCharacterId)
      return false;
    if (item.location === 2) return false; // Skip vault items

    // Apply search filter
    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      if (!name.includes(searchValue)) return false;
    }

    return true;
  });

  // Group by slot
  const armorBySlot = {};
  Object.keys(ARMOR_BUCKETS).forEach((bucketHash) => {
    armorBySlot[bucketHash] = characterArmor.filter(
      (item) => String(item.bucketHash) === bucketHash
    );
  });

  // Display character armor in grid layout
  Object.entries(ARMOR_BUCKETS).forEach(([bucketHash, slotName]) => {
    const slotItems = armorBySlot[bucketHash] || [];
    const equipped = slotItems.find((item) => item.isEquipped);
    const unequipped = slotItems.filter((item) => !item.isEquipped);

    const slotSection = document.createElement("div");
    slotSection.className = "armor-slot-section";

    const header = document.createElement("div");
    header.className = "slot-header";
    header.innerHTML = `
      <span>${slotName}</span>
      ${equipped ? `<span class="equipped-item">${equipped.definition?.displayProperties?.name || "Equipped"}</span>` : ""}
    `;
    slotSection.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "slot-items-grid";

    // Add equipped item first if exists
    if (equipped) {
      grid.appendChild(createItemIcon(equipped, true));
    }

    // Add unequipped items (limit to 8 to make 3x3 grid with equipped)
    unequipped.slice(0, equipped ? 8 : 9).forEach((item) => {
      grid.appendChild(createItemIcon(item, false));
    });

    slotSection.appendChild(grid);
    characterSection.appendChild(slotSection);
  });

  // Display vault armor sorted by type and rarity
  displayVaultArmor(vaultSection, searchValue);
}

function displayVaultArmor(container, searchValue) {
  const vaultArmor = armorItems.filter((item) => {
    if (item.location !== 2) return false; // Only vault items

    // Apply search filter
    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      if (!name.includes(searchValue)) return false;
    }

    // Filter by class if specific class is selected
    if (selectedCharacterClass !== "all") {
      const itemClass = item.definition?.classType;
      const classNum =
        selectedCharacterClass === "titan"
          ? 0
          : selectedCharacterClass === "hunter"
            ? 1
            : 2;
      if (
        itemClass !== undefined &&
        itemClass !== classNum &&
        itemClass !== 3
      ) {
        return false;
      }
    }

    return true;
  });

  // Group by slot and sort by rarity
  const categories = {};
  Object.entries(ARMOR_BUCKETS).forEach(([bucketHash, slotName]) => {
    const slotItems = vaultArmor.filter(
      (item) => String(item.bucketHash) === bucketHash
    );

    // Sort: Exotics first, then by power level
    slotItems.sort((a, b) => {
      const aExotic =
        a.definition?.inventory?.tierTypeName?.toLowerCase() === "exotic";
      const bExotic =
        b.definition?.inventory?.tierTypeName?.toLowerCase() === "exotic";

      if (aExotic && !bExotic) return -1;
      if (!aExotic && bExotic) return 1;

      return (b.power || 0) - (a.power || 0);
    });

    if (slotItems.length > 0) {
      categories[slotName] = slotItems;
    }
  });

  // Display categories
  Object.entries(categories).forEach(([slotName, items]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "vault-category";

    const header = document.createElement("div");
    header.className = "vault-category-header";
    header.textContent = `${slotName} (${items.length})`;
    categoryDiv.appendChild(header);

    const itemsGrid = document.createElement("div");
    itemsGrid.className = "vault-category-items";

    items.forEach((item) => {
      itemsGrid.appendChild(createItemIcon(item, false));
    });

    categoryDiv.appendChild(itemsGrid);
    container.appendChild(categoryDiv);
  });
}

function displayWeaponsInventory() {
  const characterSection = document.getElementById("character-weapon-slots");
  const vaultSection = document.getElementById("vault-weapon-items");

  if (!characterSection || !vaultSection) return;

  characterSection.innerHTML = "";
  vaultSection.innerHTML = "";

  // Get search filter
  const searchValue =
    document.getElementById("weaponsSearchInput")?.value.toLowerCase() || "";

  // Filter weapons for current character
  const characterWeapons = weaponItems.filter((item) => {
    if (currentCharacterId && item.characterId !== currentCharacterId)
      return false;
    if (item.location === 2) return false; // Skip vault items

    // Apply search filter
    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      if (!name.includes(searchValue)) return false;
    }

    return true;
  });

  // Group by slot
  const weaponsBySlot = {};
  Object.keys(WEAPON_BUCKETS).forEach((bucketHash) => {
    weaponsBySlot[bucketHash] = characterWeapons.filter(
      (item) => String(item.bucketHash) === bucketHash
    );
  });

  // Display character weapons in grid layout
  Object.entries(WEAPON_BUCKETS).forEach(([bucketHash, slotName]) => {
    const slotItems = weaponsBySlot[bucketHash] || [];
    const equipped = slotItems.find((item) => item.isEquipped);
    const unequipped = slotItems.filter((item) => !item.isEquipped);

    const slotSection = document.createElement("div");
    slotSection.className = "weapon-slot-section";

    const header = document.createElement("div");
    header.className = "slot-header";
    header.innerHTML = `
      <span>${slotName}</span>
      ${equipped ? `<span class="equipped-item">${equipped.definition?.displayProperties?.name || "Equipped"}</span>` : ""}
    `;
    slotSection.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "slot-items-grid";

    // Add equipped item first if exists
    if (equipped) {
      grid.appendChild(createItemIcon(equipped, true));
    }

    // Add unequipped items
    unequipped.slice(0, equipped ? 8 : 9).forEach((item) => {
      grid.appendChild(createItemIcon(item, false));
    });

    slotSection.appendChild(grid);
    characterSection.appendChild(slotSection);
  });

  // Display vault weapons
  displayVaultWeapons(vaultSection, searchValue);
}

function displayVaultWeapons(container, searchValue) {
  const vaultWeapons = weaponItems.filter((item) => {
    if (item.location !== 2) return false; // Only vault items

    // Apply search filter
    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      if (!name.includes(searchValue)) return false;
    }

    return true;
  });

  // Group by slot and sort by rarity
  const categories = {};
  Object.entries(WEAPON_BUCKETS).forEach(([bucketHash, slotName]) => {
    const slotItems = vaultWeapons.filter(
      (item) => String(item.bucketHash) === bucketHash
    );

    // Sort: Exotics first, then by power level
    slotItems.sort((a, b) => {
      const aExotic =
        a.definition?.inventory?.tierTypeName?.toLowerCase() === "exotic";
      const bExotic =
        b.definition?.inventory?.tierTypeName?.toLowerCase() === "exotic";

      if (aExotic && !bExotic) return -1;
      if (!aExotic && bExotic) return 1;

      return (b.power || 0) - (a.power || 0);
    });

    if (slotItems.length > 0) {
      categories[slotName] = slotItems;
    }
  });

  // Display categories
  Object.entries(categories).forEach(([slotName, items]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "vault-category";

    const header = document.createElement("div");
    header.className = "vault-category-header";
    header.textContent = `${slotName} (${items.length})`;
    categoryDiv.appendChild(header);

    const itemsGrid = document.createElement("div");
    itemsGrid.className = "vault-category-items";

    items.forEach((item) => {
      itemsGrid.appendChild(createItemIcon(item, false));
    });

    categoryDiv.appendChild(itemsGrid);
    container.appendChild(categoryDiv);
  });
}

function createItemIcon(item, isEquippedSlot) {
  const icon = document.createElement("div");
  icon.className = "item-icon";

  if (item.isEquipped || isEquippedSlot) {
    icon.classList.add("equipped");
  }

  const tierType = item.definition?.inventory?.tierTypeName?.toLowerCase();
  if (tierType === "exotic") {
    icon.classList.add("exotic");
  }

  // Check if highlighted by search
  const searchInput =
    document.querySelector(".nav-tab.active").textContent.trim() === "Armor"
      ? document.getElementById("armorSearchInput")
      : document.getElementById("weaponsSearchInput");

  if (searchInput?.value) {
    const searchValue = searchInput.value.toLowerCase();
    const name = item.definition?.displayProperties?.name?.toLowerCase() || "";
    if (name.includes(searchValue)) {
      icon.classList.add("highlighted");
    }
  }

  const iconUrl = item.definition?.displayProperties?.icon
    ? `https://www.bungie.net${item.definition.displayProperties.icon}`
    : "";

  if (iconUrl) {
    const img = document.createElement("img");
    img.src = iconUrl;
    img.alt = item.definition?.displayProperties?.name || "Item";
    icon.appendChild(img);
  }

  if (item.power) {
    const powerSpan = document.createElement("span");
    powerSpan.className = "item-power";
    powerSpan.textContent = item.power;
    icon.appendChild(powerSpan);
  }

  // Add click handler for details
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    showItemDetails(item, e.currentTarget);
  });

  return icon;
}

function showItemDetails(item, iconElement) {
  // Remove any existing popup
  const existingPopup = document.querySelector(".item-details-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.className = "item-details-popup";

  const tierType = item.definition?.inventory?.tierTypeName?.toLowerCase();
  const isArmor = Object.keys(ARMOR_BUCKETS).includes(String(item.bucketHash));

  let detailsHtml = `
    <div class="item-details-header">
      <div class="item-details-icon">
        ${
          item.definition?.displayProperties?.icon
            ? `<img src="https://www.bungie.net${item.definition.displayProperties.icon}" alt="${item.definition?.displayProperties?.name || "Item"}" />`
            : ""
        }
      </div>
      <div class="item-details-info">
        <div class="item-details-name ${tierType === "exotic" ? "exotic" : ""}">${item.definition?.displayProperties?.name || "Unknown Item"}</div>
        <div class="item-details-type">${item.definition?.itemTypeDisplayName || ""}</div>
        ${item.power ? `<div style="margin-top: 5px; color: #ffd700; font-weight: bold;">Power: ${item.power}</div>` : ""}
      </div>
    </div>
  `;

  // Add stats for armor
  if (isArmor && item.stats) {
    let totalStats = 0;
    const statHtml = Object.entries(Manifest.statHashes)
      .map(([hash, statName]) => {
        const value = item.stats[hash]?.value || 0;
        totalStats += value;
        return `
          <div class="stat-detail">
            <span class="stat-detail-name">${statName}</span>
            <span class="stat-detail-value">${value}</span>
          </div>
        `;
      })
      .join("");

    detailsHtml += `
      <div class="item-details-stats">
        ${statHtml}
      </div>
      <div class="item-details-total">Total: ${totalStats}</div>
    `;
  }

  // Add weapon info
  if (!isArmor && item.definition?.damageTypeHashes?.length > 0) {
    const damageType = item.definition.damageTypeHashes[0];
    detailsHtml += `
      <div class="weapon-damage-type">
        <span>Damage Type: ${damageType}</span>
      </div>
    `;
  }

  popup.innerHTML = detailsHtml;

  // Position popup near the icon
  const rect = iconElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  popup.style.position = "fixed";

  // Position horizontally
  if (rect.left > viewportWidth / 2) {
    // Show on left side of icon
    popup.style.right = `${viewportWidth - rect.left + 10}px`;
  } else {
    // Show on right side of icon
    popup.style.left = `${rect.right + 10}px`;
  }

  // Position vertically
  if (rect.top > viewportHeight / 2) {
    // Show above
    popup.style.bottom = `${viewportHeight - rect.bottom}px`;
  } else {
    // Show below
    popup.style.top = `${rect.top}px`;
  }

  document.body.appendChild(popup);

  // Close popup when clicking anywhere else
  const closePopup = (e) => {
    if (!popup.contains(e.target) && e.target !== iconElement) {
      popup.remove();
      document.removeEventListener("click", closePopup);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", closePopup);
  }, 0);
}

function displayNoArmorMessage(
  message = "Sign in with Bungie to view your armor collection"
) {
  const characterArmor = document.getElementById("character-armor-slots");
  const vaultArmor = document.getElementById("vault-armor-items");
  const characterWeapons = document.getElementById("character-weapon-slots");
  const vaultWeapons = document.getElementById("vault-weapon-items");

  [characterArmor, vaultArmor, characterWeapons, vaultWeapons].forEach(
    (container) => {
      if (container) {
        container.innerHTML = `<div class="empty-state">${message}</div>`;
      }
    }
  );
}

function setupArmorFilters() {
  // Armor search input
  const armorSearchInput = document.getElementById("armorSearchInput");
  if (armorSearchInput && !armorSearchInput.dataset.initialized) {
    armorSearchInput.addEventListener(
      "input",
      debounce(() => displayArmorInventory(), 300)
    );
    armorSearchInput.dataset.initialized = "true";
  }

  // Weapons search input
  const weaponsSearchInput = document.getElementById("weaponsSearchInput");
  if (weaponsSearchInput && !weaponsSearchInput.dataset.initialized) {
    weaponsSearchInput.addEventListener(
      "input",
      debounce(() => displayWeaponsInventory(), 300)
    );
    weaponsSearchInput.dataset.initialized = "true";
  }
}

async function refreshData() {
  showNotification("Refreshing inventory data...", "info");
  armorLoaded = false; // Force reload
  armorLoading = false; // Reset loading flag
  if (
    document.querySelector(".nav-tab.active").textContent.trim() === "Armor"
  ) {
    await loadArmorInventory();
  } else if (
    document.querySelector(".nav-tab.active").textContent.trim() === "Weapons"
  ) {
    await loadWeaponsInventory();
  }
  showNotification("Inventory data refreshed!", "success");
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

/* ---- ARTIFACT / DAMAGE / CLASS functions ---- */
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
