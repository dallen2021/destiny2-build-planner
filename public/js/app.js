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
        "Dealing sustained weapon damage while Radiant or defeating a scorched combatant with a weapon causes the target to release a Solar projectile that deal damage and scorch on impact",
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
  // Profile methods
  profile: {
    async get(membershipType, membershipId, components = "200") {
      return API.request(
        `/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components}`
      );
    },
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
  selectedExoticHash: null,
  // NEW: For stat priority weighting
  statPriorities: {},
};

// Stat hash constants for armor stats
const STAT_HASHES = [
  2996146975, // Mobility/Weapons
  392767087, // Resilience/Health
  1943323491, // Recovery/Class
  1735777505, // Discipline/Grenade
  144602215, // Intellect/Super
  4244567218, // Strength/Melee
];

/* -------- NEW: WEB WORKER FOR LOADOUTS -------- */
let loadoutWorker;
let isWorkerBusy = false;
let precomputedDistributions = [];

/* -------- CHARACTER SELECTOR VARIABLES -------- */
let currentCharacterId = null;
let charactersData = {};

// --- START: NEW CONSTANT FOR ARMOR ORDER ---
const bucketOrder = [
  { hash: 3448274439, name: "Helmets" },
  { hash: 3551918588, name: "Gauntlets" },
  { hash: 14239492, name: "Chest Armor" },
  { hash: 20886954, name: "Leg Armor" },
  { hash: 1585787867, name: "Class Items" },
];
// --- END: NEW CONSTANT FOR ARMOR ORDER ---

// Add this global variable for tracking progress per class
let progressByClass = {}; // { classType: { current, total, percentage } }

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Content Loaded - initializing app");

  await initializeApp();
  initializeArtifact();
  initStatAllocator();
  // NEW: initialize stat priorities UI
  initStatPriorities();
  updateAllStatCalculations();
  const savedClass = localStorage.getItem("d2SelectedClass") || "hunter";
  selectClass(savedClass);

  // Initialize armor display
  displayNoArmorMessage();
  setupArmorFilters();

  // Initialize the loadout worker
  initLoadoutWorker();

  // NEW: Keyboard shortcuts, offline mode, saved loadouts UI
  KeyboardShortcuts.init();
  initOfflineMode();
  loadSavedLoadoutsUI();

  console.log("App initialization complete");
});

/* -------- INITIALIZATION -------- */
async function initializeApp() {
  try {
    showLoading(true);
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
  } catch (error) {
    console.error("Initialization error:", error);
    showNotification("Failed to initialize application", "error");
  } finally {
    showLoading(false);
  }
}

function updateAuthUI(authStatus) {
  const authButton = document.getElementById("authButton");
  const userInfo = document.getElementById("userInfo");
  const usernameEl = document.getElementById("username");
  const sideMenuUsernameEl = document.getElementById("sideMenuUsername");

  isAuthenticated = authStatus.authenticated;

  if (authStatus.authenticated && authStatus.user) {
    authButton.textContent = "Sign Out";
    authButton.onclick = handleSignOut;
    userInfo.style.display = "flex";

    const bungieNetUser = authStatus.user.bungieNetUser;
    const destinyMembership = authStatus.destinyMembership;

    const primaryName =
      bungieNetUser?.cachedBungieGlobalDisplayName ||
      bungieNetUser?.displayName ||
      "Guardian";
    usernameEl.textContent = primaryName;
    sideMenuUsernameEl.textContent = primaryName;

    const activeTab = document.querySelector(".nav-tab.active");
    if (
      activeTab &&
      (activeTab.textContent.trim() === "Armor" ||
        activeTab.textContent.trim() === "Loadout Builder")
    ) {
      loadArmorInventory();
    }
  } else {
    // User is not logged in
    authButton.textContent = "Sign in with Bungie";
    authButton.onclick = handleAuth;
    userInfo.style.display = "none";
    usernameEl.textContent = "Guardian";
    sideMenuUsernameEl.textContent = "Guardian";

    // Clear armor display
    armorLoaded = false;
    allItems = [];
    displayNoArmorMessage();
  }
}

/* -------- CHARACTER SELECTOR FUNCTIONS -------- */
async function loadCharacters() {
  try {
    // Get auth status first
    const authStatus = await API.auth.checkStatus();
    if (!authStatus.authenticated || !authStatus.destinyMembership) {
      console.log("Not authenticated or no destiny membership");
      return;
    }

    const { membershipType, membershipId } = authStatus.destinyMembership;

    try {
      // Try to get full character data from the API
      const profileData = await API.request(
        `/api/profile/${membershipType}/${membershipId}?components=200`
      );

      if (profileData.characters?.data) {
        const characterSelector = document.getElementById("characterSelector");
        characterSelector.innerHTML = "";
        charactersData = profileData.characters.data;

        // Create emblem for each character
        for (const [characterId, character] of Object.entries(
          profileData.characters.data
        )) {
          const characterEmblem = createCharacterEmblem(characterId, character);
          characterSelector.appendChild(characterEmblem);
        }

        // Select first character by default
        const firstCharacterId = Object.keys(profileData.characters.data)[0];
        selectCharacter(firstCharacterId);

        // Show the character selector
        characterSelector.style.display = "flex";
      }
    } catch (profileError) {
      console.error("Failed to get profile data:", profileError);
    }
  } catch (error) {
    console.error("Failed to load characters:", error);
  }
}

function createCharacterEmblem(characterId, character) {
  const emblemDiv = document.createElement("div");
  emblemDiv.className = "character-emblem";
  emblemDiv.dataset.characterId = characterId;
  emblemDiv.dataset.class = character.classType;

  // Get class name
  const className = getClassName(character.classType);

  // Create emblem background
  const emblemBg = document.createElement("div");
  emblemBg.className = "character-emblem-bg";
  if (character.emblemBackgroundPath) {
    emblemBg.style.backgroundImage = `url('https://www.bungie.net${character.emblemBackgroundPath}')`;
  }

  // Create content overlay
  const emblemContent = document.createElement("div");
  emblemContent.className = "character-emblem-content";

  // Character info
  const emblemInfo = document.createElement("div");
  emblemInfo.className = "character-emblem-info";

  const classDiv = document.createElement("div");
  classDiv.className = "character-emblem-class";
  classDiv.textContent = className;

  const lightDiv = document.createElement("div");
  lightDiv.className = "character-emblem-light";
  lightDiv.innerHTML = "<span>⚡</span><span>Power</span>";

  emblemInfo.appendChild(classDiv);
  emblemInfo.appendChild(lightDiv);

  // Power level
  const powerDiv = document.createElement("div");
  powerDiv.className = "character-emblem-power";
  powerDiv.textContent = character.light || "0";

  emblemContent.appendChild(emblemInfo);
  emblemContent.appendChild(powerDiv);

  emblemDiv.appendChild(emblemBg);
  emblemDiv.appendChild(emblemContent);

  // Add click handler
  emblemDiv.addEventListener("click", () => selectCharacter(characterId));

  return emblemDiv;
}

function getClassName(classType) {
  const classNames = {
    0: "Titan",
    1: "Hunter",
    2: "Warlock",
  };
  return classNames[classType] || "Unknown";
}

async function selectCharacter(characterId) {
  if (currentCharacterId === characterId) return;
  currentCharacterId = characterId;

  // Update active state
  document.querySelectorAll(".character-emblem").forEach((emblem) => {
    emblem.classList.toggle(
      "active",
      emblem.dataset.characterId === characterId
    );
  });

  // Update side menu username with character class
  const character = charactersData[currentCharacterId];
  if (character) {
    const className = getClassName(character.classType);
    console.log(`Swapped to character: ${characterId} (${className})`);
    const username = document.getElementById("username");
    const sideMenuUsername = document.getElementById("sideMenuUsername");

    if (username && username.textContent !== "Guardian") {
      const displayName = username.textContent.split(" - ")[0]; // Remove any existing class suffix
      username.textContent = `${displayName} - ${className}`;
      if (sideMenuUsername) {
        sideMenuUsername.textContent = `${displayName} - ${className}`;
      }
    }
  }

  // Reapply armor filters to show only selected character's items
  if (armorLoaded) {
    applyArmorFilters();
  }

  // Update exotics for the new character
  await populateExoticSelector();
  // Trigger a new loadout generation process
  generateLoadouts();
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

  // Load armor when switching to armor display or loadout builder tab if authenticated
  if (
    (tabName === "armorDisplay" || tabName === "loadoutBuilder") &&
    isAuthenticated
  ) {
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
}

/* -------- ARMOR DISPLAY & DATA FUNCTIONS -------- */
let allItems = [];
let armorLoaded = false;
let armorLoading = false;

function combineInventoryItems(inventoryData) {
  let all = [];
  if (inventoryData.profileInventory?.data?.items) {
    const vaultItems = inventoryData.profileInventory.data.items.map(
      (item) => ({ ...item, location: 2 })
    );
    all = all.concat(vaultItems);
  }
  if (inventoryData.characterInventories?.data) {
    Object.entries(inventoryData.characterInventories.data).forEach(
      ([charId, inv]) => {
        if (inv.items) {
          const charItems = inv.items.map((item) => ({
            ...item,
            location: 1,
            characterId: charId,
          }));
          all = all.concat(charItems);
        }
      }
    );
  }
  if (inventoryData.characterEquipment?.data) {
    Object.entries(inventoryData.characterEquipment.data).forEach(
      ([charId, equip]) => {
        if (equip.items) {
          const equipItems = equip.items.map((item) => ({
            ...item,
            location: 1,
            characterId: charId,
            isEquipped: true,
          }));
          all = all.concat(equipItems);
        }
      }
    );
  }
  return all;
}

async function loadArmorInventory() {
  if (armorLoaded || armorLoading) return;
  armorLoading = true;

  try {
    showLoading(true);

    const inventoryData = await API.inventory.getInventory();
    window.inventory = inventoryData;

    const itemComponents = inventoryData.itemComponents || {};
    allItems = combineInventoryItems(inventoryData);

    const uniqueHashes = [...new Set(allItems.map((item) => item.itemHash))];
    const itemDefinitions = await Manifest.getItems(uniqueHashes);

    allItems = allItems.map((item) => {
      const definition = itemDefinitions[item.itemHash];
      const stats =
        itemComponents.stats?.data?.[item.itemInstanceId]?.stats || {};
      const sockets =
        itemComponents.sockets?.data?.[item.itemInstanceId]?.sockets || {};
      return {
        ...item,
        definition: definition || {
          displayProperties: { name: `Item ${item.itemHash}` },
        },
        stats: stats,
        sockets: sockets,
        power:
          itemComponents.instances?.data?.[item.itemInstanceId]?.primaryStat
            ?.value || 0,
        energy:
          itemComponents.energy?.data?.[item.itemInstanceId]?.energyCapacity ||
          0,
      };
    });

    armorLoaded = true;
    applyArmorFilters();
    setupArmorFilters();
    await loadCharacters();

    showLoading(false);
  } catch (error) {
    console.error("Failed to load armor inventory:", error);
    armorLoaded = false;
    if (
      error.message.includes("Not authenticated") ||
      error.message.includes("401")
    ) {
      displayNoArmorMessage("Please sign in with Bungie to view your armor.");
    } else {
      showNotification("Failed to load armor inventory", "error");
      displayNoArmorMessage("Failed to load armor. Please try refreshing.");
    }
    showLoading(false);
  } finally {
    armorLoading = false;
  }
}

function displayCharacterItems(groupedItems) {
  const container = document.getElementById("character-inventories");
  if (!container) return;
  container.innerHTML = "";

  bucketOrder.forEach((bucketInfo) => {
    const items = groupedItems[bucketInfo.hash] || [];
    if (items.length === 0) return;

    const section = document.createElement("div");
    section.className = "armor-slot-section";
    section.innerHTML = `<h3>${bucketInfo.name}</h3>`;

    const grid = document.createElement("div");
    grid.className = "character-armor-slot-grid";

    const equippedItem = items.find((item) => item.isEquipped);
    const unequippedItems = items.filter((item) => !item.isEquipped);

    const equippedContainer = document.createElement("div");
    equippedContainer.className = "equipped-item";
    if (equippedItem) {
      equippedContainer.appendChild(createUniversalItemElement(equippedItem));
    }
    grid.appendChild(equippedContainer);

    const unequippedGrid = document.createElement("div");
    unequippedGrid.className = "unequipped-items-grid";
    unequippedItems.forEach((item) => {
      unequippedGrid.appendChild(createUniversalItemElement(item));
    });
    grid.appendChild(unequippedGrid);

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function displayVaultItems(groupedItems) {
  const container = document.getElementById("vault-items-container");
  if (!container) return;
  container.innerHTML = "";

  let filterClass = null;
  if (currentCharacterId && charactersData[currentCharacterId]) {
    filterClass = charactersData[currentCharacterId].classType;
  }

  bucketOrder.forEach((bucketInfo) => {
    const items = groupedItems[bucketInfo.hash] || [];
    if (items.length === 0) return;

    let filteredItems = items;
    if (filterClass !== null) {
      filteredItems = items.filter((item) => {
        const itemClass = item.definition?.classType;
        return itemClass === filterClass || itemClass === 3;
      });
    }

    if (filteredItems.length === 0) return;

    filteredItems.sort((a, b) => {
      const aIsExotic = a.definition?.inventory?.tierTypeName === "Exotic";
      const bIsExotic = b.definition?.inventory?.tierTypeName === "Exotic";
      if (aIsExotic && !bIsExotic) return -1;
      if (!aIsExotic && bIsExotic) return 1;
      return b.power - a.power;
    });

    const section = document.createElement("div");
    section.className = "armor-slot-section";
    section.innerHTML = `<h3>${bucketInfo.name}</h3>`;

    const row = document.createElement("div");
    row.className = "vault-armor-row";
    filteredItems.forEach((item) => {
      row.appendChild(createUniversalItemElement(item));
    });

    section.appendChild(row);
    container.appendChild(section);
  });
}

function applyArmorFilters() {
  const searchValue =
    document.getElementById("armorSearchInput")?.value.toLowerCase() || "";
  const classValue =
    document.getElementById("armorClassFilter")?.value || "all";
  const slotValue = document.getElementById("armorSlotFilter")?.value || "all";

  const characterItems = [];
  const vaultItems = [];

  allItems.forEach((item) => {
    const isArmor = item.definition?.itemType === 2;
    if (!isArmor) return;

    if (searchValue) {
      const name =
        item.definition?.displayProperties?.name?.toLowerCase() || "";
      const type = item.definition?.itemTypeDisplayName?.toLowerCase() || "";
      if (!name.includes(searchValue) && !type.includes(searchValue)) return;
    }

    if (classValue !== "all") {
      const itemClass = item.definition?.classType;
      if (
        itemClass !== undefined &&
        itemClass !== parseInt(classValue) &&
        itemClass !== 3
      )
        return;
    }

    if (slotValue !== "all") {
      const bucketHash =
        item.definition?.inventory?.bucketTypeHash || item.bucketHash;
      if (bucketHash != parseInt(slotValue)) return;
    }

    if (item.location === 2) {
      vaultItems.push(item);
    } else {
      if (!currentCharacterId || item.characterId === currentCharacterId) {
        characterItems.push(item);
      }
    }
  });

  const groupItemsByBucket = (items) =>
    items.reduce((acc, item) => {
      const bucketHash =
        item.definition?.inventory?.bucketTypeHash || item.bucketHash;
      if (!acc[bucketHash]) acc[bucketHash] = [];
      acc[bucketHash].push(item);
      return acc;
    }, {});

  displayCharacterItems(groupItemsByBucket(characterItems));
  displayVaultItems(groupItemsByBucket(vaultItems));
}

function createUniversalItemElement(item) {
  const name = item.definition?.displayProperties?.name || "Unknown Item";
  const icon = item.definition?.displayProperties?.icon
    ? `https://www.bungie.net${item.definition.displayProperties.icon}`
    : "";
  const tierType = item.definition?.inventory?.tierTypeName || "";

  const rarityClass = tierType.toLowerCase();
  const isMasterworked =
    window.inventory?.itemComponents?.instances?.data?.[item.itemInstanceId]
      ?.energy?.energyCapacity === 10;

  const wrapper = document.createElement("div");
  wrapper.className = `armor-item ${rarityClass} ${isMasterworked ? "masterwork" : ""}`;
  wrapper.dataset.itemId = item.itemInstanceId || item.itemHash;

  const iconDiv = document.createElement("div");
  iconDiv.className = "armor-icon";
  if (icon) {
    iconDiv.innerHTML = `<img src="${icon}" alt="${name}" />`;
  }
  wrapper.appendChild(iconDiv);

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    showItemTooltip(item, wrapper);
  });

  return wrapper;
}

function showItemTooltip(item, element) {
  const existingTooltip = document.querySelector(".armor-tooltip");
  if (existingTooltip) {
    existingTooltip.remove();
    if (
      existingTooltip.dataset.itemId === (item.itemInstanceId || item.itemHash)
    ) {
      return;
    }
  }

  const tooltip = document.createElement("div");
  tooltip.className = "armor-tooltip";
  tooltip.dataset.itemId = item.itemInstanceId || item.itemHash;

  const name = item.definition?.displayProperties?.name || "Unknown Item";
  const itemType = item.definition?.itemTypeDisplayName || "";
  const tierType = item.definition?.inventory?.tierTypeName || "";

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

  const rarityClass = tierType.toLowerCase();
  const isMasterworked =
    window.inventory?.itemComponents?.instances?.data?.[item.itemInstanceId]
      ?.energy?.energyCapacity === 10;

  let tooltipContent = `
        <div class="armor-details ${rarityClass}">
          <div class="armor-info">
              <div class="armor-name">${name}</div>
              <div class="armor-type">${itemType}</div>
              ${item.quantity > 1 ? `<div style="color: #8af295;">Quantity: ${item.quantity}</div>` : ""}
          </div>
    `;

  if (item.power) {
    tooltipContent += `<div class="armor-power">${item.power}</div>`;
  }

  if (item.definition?.itemType === 2 && item.stats) {
    tooltipContent += `
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
          ${isMasterworked ? '<span class="armor-tag artifice">Masterwork</span>' : ""}
        </div>
      `;
  }

  tooltipContent += `</div>`;
  tooltip.innerHTML = tooltipContent;

  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.right + 10}px`;
  tooltip.style.top = `${rect.top}px`;
  tooltip.style.display = "block";
}

document.addEventListener("click", (e) => {
  const tooltip = document.querySelector(".armor-tooltip");
  if (
    tooltip &&
    !tooltip.contains(e.target) &&
    !e.target.closest(".armor-item") &&
    !e.target.closest(".loadout-armor-piece")
  ) {
    tooltip.remove();
  }
});

function displayNoArmorMessage(
  message = "Sign in with Bungie to view your armor collection"
) {
  const charContainer = document.getElementById("character-inventories");
  if (charContainer)
    charContainer.innerHTML = `<div class="empty-state">${message}</div>`;
  const vaultContainer = document.getElementById("vault-items-container");
  if (vaultContainer)
    vaultContainer.innerHTML = `<div class="empty-state"></div>`;
}

function setupArmorFilters() {
  const searchInput = document.getElementById("armorSearchInput");
  if (searchInput && !searchInput.dataset.initialized) {
    searchInput.addEventListener(
      "input",
      debounce(() => applyArmorFilters(), 300)
    );
    searchInput.dataset.initialized = "true";
  }
  const classFilter = document.getElementById("armorClassFilter");
  if (classFilter && !classFilter.dataset.initialized) {
    classFilter.addEventListener("change", () => applyArmorFilters());
    classFilter.dataset.initialized = "true";
  }
  const slotFilter = document.getElementById("armorSlotFilter");
  if (slotFilter && !slotFilter.dataset.initialized) {
    slotFilter.addEventListener("change", () => applyArmorFilters());
    slotFilter.dataset.initialized = "true";
  }
}

async function refreshData() {
  showNotification("Refreshing armor data...", "info");
  if (API && typeof API.clearCache === "function") API.clearCache();
  armorLoaded = false;
  armorLoading = false;
  try {
    await loadArmorInventory();
    showNotification("Armor data refreshed!", "success");
  } catch (error) {
    console.error("Failed to refresh data:", error);
    showNotification("Failed to refresh data. Please try again.", "error");
  }
}

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

/* ---------------- Stat allocator via BOXES ---------------- */
function initStatAllocator() {
  const alloc = document.getElementById("statAllocator");
  alloc.innerHTML = "";
  statsArr.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `<label>${stat}</label><div class="stat-box-wrapper" id="${stat.toLowerCase()}Boxes"></div><div class="stat-value-display" id="${stat.toLowerCase()}Value">10</div>`;
    alloc.appendChild(row);
    buildStatBoxes(stat);
  });
}

function buildStatBoxes(stat) {
  const wrapper = document.getElementById(`${stat.toLowerCase()}Boxes`);
  wrapper.innerHTML = "";
  for (let val = 10; val <= 200; val += 10) {
    const box = document.createElement("div");
    box.className = "stat-box";
    box.dataset.stat = stat;
    box.dataset.value = val;
    box.textContent = val;
    box.addEventListener("click", onStatBoxClick);
    wrapper.appendChild(box);
  }
}

function onStatBoxClick(e) {
  // FIX: Prevent clicking on disabled (grayed-out) boxes.
  if (e.currentTarget.classList.contains("disabled")) {
    return;
  }
  const stat = e.currentTarget.dataset.stat;
  const val = Number(e.currentTarget.dataset.value);
  state.statValues[stat] = val;
  updateAllStatCalculations();
  updateDynamicLimits();
  generateLoadouts();
}

/* ----------- Calculation & UI refresh ----------- */
function updateAllStatCalculations() {
  statsArr.forEach((stat) => {
    const cur = state.statValues[stat];
    document.getElementById(`${stat.toLowerCase()}Value`).textContent = cur;
    document
      .querySelectorAll(`.stat-box[data-stat='${stat}']`)
      .forEach((box) => {
        box.classList.toggle("selected", Number(box.dataset.value) <= cur);
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
    window.calculatedStatBonuses[stat.toLowerCase()] = {};
    for (const [k, pts] of Object.entries(bonuses)) {
      const num = interpolate(pts, val);
      if (num !== 0) {
        window.calculatedStatBonuses[stat.toLowerCase()][k] = num / 100;
      }
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
      showNotification("Maximum 12 mods can be selected!", "error");
    } else if (4 === e && columnCounts[4] >= 2) {
      showNotification("Maximum 2 mods can be selected in Column 5!", "error");
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

  if (n.heavy_boss_damage) {
    t *= 1 + n.heavy_boss_damage;
    e.push("Heavy Boss Dmg");
  }
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

  let o = { value: 1 };
  [
    { id: "radiant", value: 1.25, name: "Radiant" },
    { id: "wellOfRadiance", value: 1.25, name: "Well" },
    { id: "nobleRounds", value: 1.35, name: "Noble Rds" },
  ].forEach((buff) => {
    if (document.getElementById(buff.id)?.checked && buff.value > o.value)
      o = buff;
  });
  if (o.value > 1) {
    t *= o.value;
    e.push(o.name);
  }

  let l = { value: 1 };
  [{ id: "weaponSurge3x", value: 1.22, name: "Surge x3" }].forEach((buff) => {
    if (document.getElementById(buff.id)?.checked && buff.value > l.value)
      l = buff;
  });
  if (l.value > 1) {
    t *= l.value;
    e.push(l.name);
  }

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

  let d = { value: 1 };
  [
    { id: "weakenDebuff", value: 1.15, name: "Weaken" },
    { id: "tetherDebuff", value: 1.3, name: "Tether" },
    { id: "divinityDebuff", value: 1.15, name: "Divinity" },
    { id: "tractorCannon", value: 1.3, name: "Tractor" },
  ].forEach((debuff) => {
    if (document.getElementById(debuff.id)?.checked && debuff.value > d.value)
      d = debuff;
  });
  if (d.value > 1) {
    t *= d.value;
    e.push(d.name);
  }

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
  document.querySelectorAll(".buff-item[data-exotic]").forEach((item) => {
    item.classList.remove("disabled");
  });
  if (isClassItem) {
    document.querySelectorAll('[data-column="0"]').forEach((item) => {
      item.classList.add("disabled");
      const checkbox = item.querySelector("input");
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
        selectedExotics.delete(checkbox.id);
      }
    });
    const combos = exoticClassItemCombinations[currentClass];
    const selectedColumn1 = [...selectedExotics].filter((id) =>
      combos.column1.includes(id)
    );
    const selectedColumn2 = [...selectedExotics].filter((id) =>
      combos.column2.includes(id)
    );
    if (selectedColumn1.length > 0) {
      combos.column1.forEach((exoticId) => {
        if (!selectedColumn1.includes(exoticId)) {
          const item = document.querySelector(`[data-exotic="${exoticId}"]`);
          if (item) item.classList.add("disabled");
        }
      });
    }
    if (selectedColumn2.length > 0) {
      combos.column2.forEach((exoticId) => {
        if (!selectedColumn2.includes(exoticId)) {
          const item = document.querySelector(`[data-exotic="${exoticId}"]`);
          if (item) item.classList.add("disabled");
        }
      });
    }
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

/* -------- NEW ADDITIONS: Keyboard Shortcuts, Loadout Manager, Offline Mode, Stat Priority System, Saved Loadouts, Enhanced Refresh, Drag & Drop --- */
// Guard against redefinition if file is reloaded
if (typeof KeyboardShortcuts === "undefined") {
  const KeyboardShortcuts = {
    shortcuts: {
      r: { handler: () => refreshData(), description: "Refresh data" },
      1: { handler: () => switchTab("armorDisplay"), description: "Armor tab" },
      2: {
        handler: () => switchTab("loadoutBuilder"),
        description: "Loadout Builder tab",
      },
      3: {
        handler: () => switchTab("artifact"),
        description: "Artifact Mods tab",
      },
      4: {
        handler: () => switchTab("damage"),
        description: "Damage Calculator tab",
      },
      5: { handler: () => switchTab("build"), description: "Build Info tab" },
      Escape: { handler: () => closeAllModals(), description: "Close modals" },
      s: {
        handler: () => saveCurrentLoadout(),
        description: "Save current loadout",
      },
      l: {
        handler: () => showSavedLoadouts(),
        description: "Show saved loadouts",
      },
      "?": {
        handler: () => showKeyboardShortcuts(),
        description: "Show shortcuts",
      },
    },
    init() {
      document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
          return;
        const shortcut = this.shortcuts[e.key];
        if (shortcut && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          shortcut.handler();
        }
      });
    },
  };
  window.KeyboardShortcuts = KeyboardShortcuts;
}

if (typeof LoadoutManager === "undefined") {
  class LoadoutManager {
    static saveLoadout(loadout, name) {
      const id = API.loadouts.saveLocal(loadout, name);
      showNotification(`Loadout "${name}" saved!`, "success");
      return id;
    }
    static getLoadouts() {
      return API.loadouts.getLocal();
    }
    static deleteLoadout(id) {
      API.loadouts.deleteLocal(id);
      showNotification("Loadout deleted", "info");
    }
    static exportLoadout(loadout) {
      const dimFormat = API.utils.exportToDIM(loadout);
      navigator.clipboard
        .writeText(dimFormat)
        .then(() =>
          showNotification(
            "Loadout copied to clipboard (DIM format)",
            "success"
          )
        );
    }
    static shareLoadout(loadout) {
      const shareLink = API.utils.generateShareLink(loadout);
      navigator.clipboard
        .writeText(shareLink)
        .then(() =>
          showNotification("Share link copied to clipboard", "success")
        );
    }
  }
  window.LoadoutManager = LoadoutManager;
}

// Offline mode detection
function initOfflineMode() {
  window.addEventListener("online", () => {
    showNotification("Connection restored", "success");
    disableOfflineMode();
  });
  window.addEventListener("offline", () => {
    showNotification("Connection lost. Working offline", "warning");
    enableOfflineMode();
  });
}
function enableOfflineMode() {
  document.body.classList.add("offline-mode");
  document.querySelectorAll(".requires-connection").forEach((el) => {
    el.disabled = true;
  });
}
function disableOfflineMode() {
  document.body.classList.remove("offline-mode");
  document.querySelectorAll(".requires-connection").forEach((el) => {
    el.disabled = false;
  });
  if (isAuthenticated) refreshData();
}

// Stat priority system
function initStatPriorities() {
  const container = document.createElement("div");
  container.className = "stat-priorities-container";
  container.innerHTML = `
    <h3>Stat Priorities (Optional)</h3>
    <div class="stat-priorities-grid">
      ${statsArr
        .map(
          (stat) => `
        <div class="priority-row">
          <label>${stat}</label>
          <input type="range" id="priority-${stat}" min="0" max="10" value="5" onchange="updateStatPriority('${stat}', this.value)">
          <span id="priority-value-${stat}">5</span>
        </div>`
        )
        .join("")}
    </div>
    <button onclick="resetPriorities()">Reset Priorities</button>`;
  const builderSection = document.querySelector(".exotic-selection-container");
  if (builderSection)
    builderSection.parentNode.insertBefore(
      container,
      builderSection.nextSibling
    );
}
function updateStatPriority(stat, value) {
  state.statPriorities[stat] = parseInt(value);
  const vEl = document.getElementById(`priority-value-${stat}`);
  if (vEl) vEl.textContent = value;
  if (window.loadoutWorker && typeof armorLoaded !== "undefined" && armorLoaded)
    generateLoadouts();
}
function resetPriorities() {
  statsArr.forEach((stat) => {
    state.statPriorities[stat] = 5;
    const input = document.getElementById(`priority-${stat}`);
    const span = document.getElementById(`priority-value-${stat}`);
    if (input) input.value = 5;
    if (span) span.textContent = 5;
  });
  if (window.loadoutWorker && typeof armorLoaded !== "undefined" && armorLoaded)
    generateLoadouts();
}

// Saved loadouts UI
function loadSavedLoadoutsUI() {
  if (document.getElementById("saved-loadouts-container")) return; // prevent duplicates
  const savedContainer = document.createElement("div");
  savedContainer.id = "saved-loadouts-container";
  savedContainer.className = "saved-loadouts-section";
  savedContainer.innerHTML = `<h3>Saved Loadouts</h3><div id="saved-loadouts-list" class="saved-loadouts-grid"></div>`;
  const loadoutBuilder = document.getElementById("loadoutBuilder");
  if (loadoutBuilder)
    loadoutBuilder.insertBefore(savedContainer, loadoutBuilder.firstChild);
  updateSavedLoadoutsList();
}
function updateSavedLoadoutsList() {
  const container = document.getElementById("saved-loadouts-list");
  if (!container) return;
  const savedLoadouts = LoadoutManager.getLoadouts();
  const loadoutIds = Object.keys(savedLoadouts);
  if (loadoutIds.length === 0) {
    container.innerHTML = '<div class="empty-state">No saved loadouts</div>';
    return;
  }
  container.innerHTML = loadoutIds
    .map((id) => {
      const loadout = savedLoadouts[id];
      return `<div class="saved-loadout-card" data-id="${id}">
      <div class="loadout-name">${loadout.name}</div>
      <div class="loadout-date">${new Date(loadout.created).toLocaleDateString()}</div>
      <div class="loadout-actions">
        <button onclick="loadSavedLoadout('${id}')">Load</button>
        <button onclick="exportSavedLoadout('${id}')">Export</button>
        <button onclick="deleteSavedLoadout('${id}')">Delete</button>
      </div></div>`;
    })
    .join("");
}
function saveCurrentLoadout() {
  const selectedLoadout = document.querySelector(".loadout-card.selected");
  if (!selectedLoadout) {
    showNotification("Please select a loadout first", "warning");
    return;
  }
  const name = prompt("Enter a name for this loadout:");
  if (name) {
    const loadoutData = selectedLoadout.dataset.loadout;
    if (loadoutData) {
      LoadoutManager.saveLoadout(JSON.parse(loadoutData), name);
      updateSavedLoadoutsList();
    }
  }
}
function loadSavedLoadout(id) {
  const savedLoadouts = LoadoutManager.getLoadouts();
  const loadout = savedLoadouts[id];
  if (loadout) showLoadoutModal(loadout);
}
function exportSavedLoadout(id) {
  const savedLoadouts = LoadoutManager.getLoadouts();
  const loadout = savedLoadouts[id];
  if (loadout) LoadoutManager.exportLoadout(loadout);
}
function deleteSavedLoadout(id) {
  if (confirm("Are you sure you want to delete this loadout?")) {
    LoadoutManager.deleteLoadout(id);
    updateSavedLoadoutsList();
  }
}
function showSavedLoadouts() {
  const container = document.getElementById("saved-loadouts-container");
  if (container) container.scrollIntoView({ behavior: "smooth" });
}

// UI helper modals
function showKeyboardShortcuts() {
  const modal = document.createElement("div");
  modal.className = "shortcuts-modal";
  modal.innerHTML = `<div class="shortcuts-content"><h2>Keyboard Shortcuts</h2><div class="shortcuts-list">${Object.entries(
    KeyboardShortcuts.shortcuts
  )
    .map(
      ([key, info]) =>
        `<div class="shortcut-item"><kbd>${key}</kbd><span>${info.description}</span></div>`
    )
    .join(
      ""
    )}</div><button onclick="this.closest('.shortcuts-modal').remove()">Close</button></div>`;
  document.body.appendChild(modal);
}
function closeAllModals() {
  document
    .querySelectorAll(".loadout-modal-overlay, .shortcuts-modal")
    .forEach((modal) => modal.remove());
}

// Drag & Drop support
function initDragAndDrop() {
  document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("armor-item")) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemId", e.target.dataset.itemId);
      e.target.classList.add("dragging");
    }
  });
  document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("armor-item"))
      e.target.classList.remove("dragging");
  });
  document.querySelectorAll(".loadout-slot").forEach((slot) => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("drag-over");
    });
    slot.addEventListener("dragleave", () =>
      slot.classList.remove("drag-over")
    );
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("itemId");
      slot.classList.remove("drag-over");
      handleArmorDrop(itemId, slot);
    });
  });
}
function handleArmorDrop(itemId, slot) {
  console.log(`Dropped item ${itemId} on slot`, slot);
}

// Enhanced data refresh overrides earlier refreshData
async function refreshData() {
  showNotification("Refreshing armor data...", "info");
  if (API && typeof API.clearCache === "function") API.clearCache();
  armorLoaded = false;
  armorLoading = false;
  try {
    await loadArmorInventory();
    showNotification("Armor data refreshed!", "success");
  } catch (error) {
    console.error("Failed to refresh data:", error);
    showNotification("Failed to refresh data. Please try again.", "error");
  }
}
