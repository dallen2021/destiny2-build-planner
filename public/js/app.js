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
  updateAllStatCalculations();
  const savedClass = localStorage.getItem("d2SelectedClass") || "hunter";
  selectClass(savedClass);

  // Initialize armor display
  displayNoArmorMessage();
  setupArmorFilters();

  // Initialize the loadout worker
  initLoadoutWorker();

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
  armorLoaded = false;
  armorLoading = false;
  await loadArmorInventory();
  showNotification("Armor data refreshed!", "success");
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

/* -------- NEW/UPDATED LOADOUT BUILDER FUNCTIONS -------- */

/**
 * Resets the worker by terminating it if it exists and creating a new one.
 * Posts a message to the new worker.
 * @param {string} type - The type of message to post (e.g., 'generate', 'precompute').
 * @param {object} payload - The data payload for the message.
 */
function resetAndRunWorker(type, payload) {
  if (isWorkerBusy) {
    console.log("Worker is busy, terminating previous job...");
    loadoutWorker.terminate();
  }
  console.log(`Initializing new worker for task: ${type}`);
  initLoadoutWorker();

  isWorkerBusy = true;
  showLoadingIndicator();
  loadoutWorker.postMessage({ type, payload });
}

function initLoadoutWorker() {
  if (window.Worker) {
    loadoutWorker = new Worker("js/loadout-worker.js");
    loadoutWorker.onmessage = function (e) {
      const { type, payload } = e.data;
      console.log(`Main thread received message from worker: ${type}`);

      if (type === "loadoutsGenerated") {
        const { loadouts } = payload;
        displayLoadouts(loadouts);
        updateDynamicLimits();
        isWorkerBusy = false;
        hideLoadingIndicator();
      } else if (type === "error") {
        console.error("Loadout Worker Error:", payload);
        showNotification(
          "An error occurred in the loadout generator.",
          "error"
        );
        const resultsGrid = document.getElementById("loadoutResultsGrid");
        resultsGrid.innerHTML =
          '<div class="empty-state">An error occurred while generating loadouts.</div>';
        isWorkerBusy = false;
        hideLoadingIndicator();
      } else if (type === "precomputeDone") {
        precomputedDistributions = payload.distributions;
        console.log("Pre-computation complete. Now starting full generation.");
        generateLoadouts(); // Chain the full generation after pre-computation
      } else if (type === "progress") {
        const { current, total, percentage, classType } = payload;
        progressByClass[classType] = { current, total, percentage };
        updateProgressDisplay();
      }
    };
    loadoutWorker.onerror = function (e) {
      console.error("An error occurred in the loadout worker:", e);
      showNotification("Failed to run loadout generator.", "error");
      const resultsGrid = document.getElementById("loadoutResultsGrid");
      resultsGrid.innerHTML =
        '<div class="empty-state">The loadout generator failed to start.</div>';
      isWorkerBusy = false;
      hideLoadingIndicator();
    };
  } else {
    console.error("Web Workers are not supported in this browser.");
    showNotification(
      "Your browser does not support features required for the loadout builder.",
      "error"
    );
  }
}

// New function to update visual progress
function updateProgressDisplay() {
  const progressText = document.getElementById("progress-text");
  if (!progressText) {
    // Dynamically add if not present
    const indicator = document.getElementById("loading-indicator");
    if (indicator) {
      const textEl = document.createElement("span");
      textEl.id = "progress-text";
      indicator.appendChild(textEl);
    } else {
      return;
    }
  }

  let displayStr = "";
  Object.entries(progressByClass).forEach(([classType, prog]) => {
    const className = getClassName(classType); // Use existing getClassName function
    displayStr += `${className}: ${prog.current} / ${prog.total} (${prog.percentage}%) | `;
  });

  document.getElementById("progress-text").textContent = displayStr
    .trim()
    .slice(0, -1); // Remove trailing |
}

function showLoadingIndicator() {
  const indicator = document.getElementById("loading-indicator");
  if (indicator) {
    indicator.style.display = "inline-flex";
  }
}

function hideLoadingIndicator() {
  const indicator = document.getElementById("loading-indicator");
  if (indicator) {
    indicator.style.display = "none";
  }
}

async function populateExoticSelector() {
  const selector = document.getElementById("exoticSelector");
  if (!selector) return;
  selector.innerHTML = ""; // Clear previous exotics

  const character = charactersData[currentCharacterId];
  if (!character) return;
  const characterClass = character.classType;

  // Add "No Exotic" option
  const noExoticEl = document.createElement("div");
  noExoticEl.className = "exotic-item-icon selected";
  noExoticEl.dataset.hash = "none";
  noExoticEl.innerHTML = `<div class="placeholder">Ø</div>`;
  noExoticEl.title = "No Exotic";
  noExoticEl.addEventListener("click", () => selectExotic("none"));
  selector.appendChild(noExoticEl);
  state.selectedExoticHash = null; // Default to no exotic

  const exoticArmor = allItems.filter(
    (item) =>
      item.definition?.inventory?.tierTypeName === "Exotic" &&
      item.definition?.itemType === 2 && // is Armor
      (item.definition?.classType === characterClass ||
        item.definition?.classType === 3)
  );

  // Create a unique set of exotics based on hash
  const uniqueExotics = [
    ...new Map(exoticArmor.map((item) => [item.itemHash, item])).values(),
  ];

  uniqueExotics.sort((a, b) =>
    a.definition.displayProperties.name.localeCompare(
      b.definition.displayProperties.name
    )
  );

  uniqueExotics.forEach((item) => {
    const iconUrl = `https://www.bungie.net${item.definition.displayProperties.icon}`;
    const el = document.createElement("div");
    el.className = "exotic-item-icon";
    el.dataset.hash = item.itemHash;
    el.title = item.definition.displayProperties.name;
    el.innerHTML = `<img src="${iconUrl}" alt="${item.definition.displayProperties.name}">`;
    el.addEventListener("click", () => selectExotic(item.itemHash));
    selector.appendChild(el);
  });
}

async function selectExotic(hash) {
  state.selectedExoticHash = hash === "none" ? null : hash;
  console.log(
    `Selected exotic with hash: ${hash}. Triggering pre-computation.`
  );

  // Update visual selection
  document.querySelectorAll(".exotic-item-icon").forEach((el) => {
    el.classList.toggle("selected", el.dataset.hash === String(hash));
  });

  if (loadoutWorker && armorLoaded) {
    const character = charactersData[currentCharacterId];
    // This will now terminate the old worker and start a new one for pre-computation
    resetAndRunWorker("precompute", { allItems, character, state });
  }
}

/**
 * Asynchronously generates loadouts by offloading the work to a Web Worker.
 * Updates the UI to show a loading state while the worker is busy.
 */
async function generateLoadouts() {
  const character = charactersData[currentCharacterId];
  if (!character) {
    document.getElementById("loadoutResultsGrid").innerHTML =
      '<div class="empty-state">Please select a character.</div>';
    return;
  }

  console.log("Preparing to generate loadouts with state:", state);
  resetAndRunWorker("generate", { allItems, character, state });
}

/**
 * Updates the enabled/disabled state of stat boxes based on calculated limits.
 * @param {Object} limits - An object with stat names as keys and their max possible value as values.
 */
function updateStatButtons(limits) {
  // First, remove all disabled classes to reset the state
  document
    .querySelectorAll(".stat-box.disabled")
    .forEach((box) => box.classList.remove("disabled"));

  // Then, apply new limits
  document.querySelectorAll(".stat-box").forEach((box) => {
    const stat = box.dataset.stat;
    const value = parseInt(box.dataset.value, 10);
    if (limits[stat] !== undefined && value > limits[stat]) {
      box.classList.add("disabled");
    }
  });
}

function displayLoadouts(loadouts) {
  const resultsGrid = document.getElementById("loadoutResultsGrid");
  resultsGrid.innerHTML = "";

  if (loadouts.length === 0) {
    resultsGrid.innerHTML =
      '<div class="empty-state">No loadouts found with the selected criteria. Try different stats or another exotic.</div>';
    return;
  }

  const itemsPerPage = 12;
  let currentPage = 1;

  const renderPage = () => {
    resultsGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = loadouts.slice(start, end);

    pageItems.forEach((loadout) => {
      const card = document.createElement("div");
      card.className = "loadout-card";

      // Armor icons first
      let armorHtml = '<div class="loadout-armor">';
      loadout.set.forEach((piece) => {
        const isExotic = piece.definition.inventory.tierTypeName === "Exotic";
        armorHtml += `<div class="loadout-armor-piece">
                    <img src="https://www.bungie.net${piece.definition.displayProperties.icon}" title="${piece.definition.displayProperties.name}">
                    ${isExotic ? '<div class="exotic-glow"></div>' : ""}
                </div>`;
      });
      armorHtml += "</div>";

      // Then stats in two columns
      let statsHtml = '<div class="loadout-stats-grid">';
      const statNames = Object.keys(loadout.stats);
      const mid = Math.ceil(statNames.length / 2);

      // Column 1
      statsHtml += '<div class="loadout-stats-col">';
      for (let i = 0; i < mid; i++) {
        const statName = statNames[i];
        statsHtml += `<div class="loadout-stat"><span class="stat-name">${statName}</span> <span class="stat-value">${loadout.stats[statName]} (T${Math.floor(loadout.stats[statName] / 10)})</span></div>`;
      }
      statsHtml += "</div>";

      // Column 2
      statsHtml += '<div class="loadout-stats-col">';
      for (let i = mid; i < statNames.length; i++) {
        const statName = statNames[i];
        statsHtml += `<div class="loadout-stat"><span class="stat-name">${statName}</span> <span class="stat-value">${loadout.stats[statName]} (T${Math.floor(loadout.stats[statName] / 10)})</span></div>`;
      }
      statsHtml += "</div>";

      statsHtml += "</div>";

      card.innerHTML = armorHtml + statsHtml;

      // Add click handler to show detailed modal
      card.addEventListener("click", () => showLoadoutModal(loadout));

      resultsGrid.appendChild(card);
    });
  };

  const setupPagination = () => {
    const paginationContainer = document.getElementById("loadoutPagination");
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(loadouts.length / itemsPerPage);

    if (pageCount <= 1) {
      paginationContainer.style.display = "none";
      return;
    }
    paginationContainer.style.display = "flex";

    const prevButton = document.createElement("button");
    prevButton.textContent = "◀";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        setupPagination();
      }
    });
    paginationContainer.appendChild(prevButton);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Page ${currentPage} of ${pageCount}`;
    paginationContainer.appendChild(pageInfo);

    const nextButton = document.createElement("button");
    nextButton.textContent = "▶";
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        renderPage();
        setupPagination();
      }
    });
    paginationContainer.appendChild(nextButton);
  };

  renderPage();
  setupPagination();
}

/**
 * Shows a detailed modal popup for a loadout
 * @param {Object} loadout - The loadout object containing armor set and stats
 */
async function showLoadoutModal(loadout) {
  // Remove any existing modal
  const existingModal = document.querySelector(".loadout-modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "loadout-modal-overlay";

  // Create modal content
  const modal = document.createElement("div");
  modal.className = "loadout-modal";

  // Modal header
  const header = document.createElement("div");
  header.className = "loadout-modal-header";
  header.innerHTML = `
    <h2 class="loadout-modal-title">Loadout Details</h2>
    <button class="loadout-modal-close">&times;</button>
  `;

  // Modal content
  const content = document.createElement("div");
  content.className = "loadout-modal-content";

  // Show loading while fetching mod definitions
  content.innerHTML =
    '<div style="text-align: center; padding: 40px;">Loading mod details...</div>';

  // Assemble modal temporarily
  modal.appendChild(header);
  modal.appendChild(content);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  // Collect all unique mod hashes
  const modHashes = new Set();
  loadout.set.forEach((piece) => {
    const sockets = piece.sockets || [];
    sockets.forEach((socket, index) => {
      if (index >= 2 && socket.plugHash && socket.isEnabled !== false) {
        modHashes.add(socket.plugHash);
      }
    });
  });

  // Fetch mod definitions
  let modDefinitions = {};
  if (modHashes.size > 0) {
    try {
      modDefinitions = await Manifest.getItems([...modHashes]);
    } catch (error) {
      console.error("Failed to fetch mod definitions:", error);
    }
  }

  // Armor showcase section
  let armorShowcaseHtml = '<div class="loadout-armor-showcase">';
  loadout.set.forEach((piece) => {
    const isExotic = piece.definition.inventory.tierTypeName === "Exotic";
    const power = piece.power || 0;
    const bucketName = getBucketName(piece.definition.inventory.bucketTypeHash);

    armorShowcaseHtml += `
      <div class="loadout-armor-showcase-item ${isExotic ? "exotic" : ""}">
        <div class="loadout-armor-icon-large">
          <img src="https://www.bungie.net${piece.definition.displayProperties.icon}" 
               alt="${piece.definition.displayProperties.name}">
          ${isExotic ? '<span class="exotic-badge">Exotic</span>' : ""}
        </div>
        <div class="loadout-armor-name">${piece.definition.displayProperties.name}</div>
        <div class="loadout-armor-type">${bucketName}</div>
        <div class="loadout-armor-power">${power}</div>
      </div>
    `;
  });
  armorShowcaseHtml += "</div>";

  // Total stats section
  let totalStatsHtml = `
    <div class="loadout-total-stats">
      <h3>Total Stats Distribution</h3>
      <div class="total-stats-grid">
  `;

  Object.entries(loadout.stats).forEach(([statName, value]) => {
    const tier = Math.floor(value / 10);
    totalStatsHtml += `
      <div class="total-stat-item">
        <div class="total-stat-name">${statName}</div>
        <div class="total-stat-value">${value}</div>
        <div class="total-stat-tier">Tier ${tier}</div>
      </div>
    `;
  });

  totalStatsHtml += "</div></div>";

  // Detail sections container
  let detailSectionsHtml = '<div class="loadout-detail-sections">';

  // Individual armor stats section
  detailSectionsHtml += `
    <div class="loadout-detail-section">
      <h3>Individual Armor Stats</h3>
      <div class="armor-stats-grid">
  `;

  loadout.set.forEach((piece) => {
    const bucketName = getBucketName(piece.definition.inventory.bucketTypeHash);
    detailSectionsHtml += `
      <div class="armor-stat-item">
        <h4>${bucketName}</h4>
        <div class="armor-stat-values">
    `;

    // Get stats for this piece
    ["Weapons", "Health", "Class", "Grenade", "Super", "Melee"].forEach(
      (statName, index) => {
        const statHash = STAT_HASHES[index];
        const statValue = piece.stats?.[statHash]?.value || 0;
        const statAbbr = statName.substring(0, 3);

        detailSectionsHtml += `
        <div class="mini-stat">
          <div class="mini-stat-name">${statAbbr}</div>
          <div class="mini-stat-value">${statValue}</div>
        </div>
      `;
      }
    );

    detailSectionsHtml += "</div></div>";
  });

  detailSectionsHtml += "</div></div>";

  // Mods section
  detailSectionsHtml += `
    <div class="loadout-detail-section">
      <h3>Equipped Mods</h3>
      <div class="loadout-mods-grid">
  `;

  loadout.set.forEach((piece) => {
    const bucketName = getBucketName(piece.definition.inventory.bucketTypeHash);
    const sockets = piece.sockets || [];

    detailSectionsHtml += `
      <div class="armor-mods-column">
        <h4>${bucketName}</h4>
    `;

    // Get mod sockets (usually the last few sockets are for mods)
    let modCount = 0;
    const modSockets = [];

    // In Destiny 2, mod sockets are typically after the first few sockets
    // First sockets are usually for perks/intrinsic traits
    sockets.forEach((socket, index) => {
      // Skip first few sockets (usually intrinsic perks)
      if (index >= 2 && socket.plugHash && socket.isEnabled !== false) {
        modSockets.push(socket);
      }
    });

    // Display found mods with names
    modSockets.slice(0, 5).forEach((socket) => {
      const modDef = modDefinitions[socket.plugHash];
      const modName = modDef?.displayProperties?.name || `Unknown Mod`;

      // Skip empty mod slots, default plugs, or deprecated mods
      if (
        modName.toLowerCase().includes("empty") ||
        modName.toLowerCase().includes("default") ||
        modName.toLowerCase().includes("no mod") ||
        modName.toLowerCase().includes("deprecated") ||
        modName === "Unknown Mod"
      ) {
        return;
      }

      // Clean up mod names
      const cleanModName = modName
        .replace(/\s+Mod$/i, "") // Remove trailing "Mod"
        .replace(/^Armor\s+/i, ""); // Remove leading "Armor"

      detailSectionsHtml += `
        <div class="mod-slot filled" title="${modDef?.displayProperties?.description || ""}">
          <div class="mod-name">${cleanModName}</div>
        </div>
      `;
      modCount++;
    });

    // Fill empty mod slots if less than 3 mods
    while (modCount < 3) {
      detailSectionsHtml += `
        <div class="mod-slot empty">Empty Slot</div>
      `;
      modCount++;
    }

    detailSectionsHtml += "</div>";
  });

  detailSectionsHtml += "</div></div></div>";

  // Update content with all HTML
  content.innerHTML = armorShowcaseHtml + totalStatsHtml + detailSectionsHtml;

  // Add transfer & equip button
  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText = "text-align: center; margin-top: 24px;";
  buttonContainer.innerHTML = `
    <button id="transferEquipBtn" class="transfer-equip-btn">
      Transfer & Equip Loadout
    </button>
  `;
  content.appendChild(buttonContainer);

  // Add click handler for transfer & equip
  const transferBtn = document.getElementById("transferEquipBtn");
  transferBtn.addEventListener("click", () => transferAndEquipLoadout(loadout));

  // Add close functionality
  const closeBtn = modal.querySelector(".loadout-modal-close");
  closeBtn.addEventListener("click", () => modalOverlay.remove());

  // Close on overlay click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
    }
  });

  // Close on escape key
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      modalOverlay.remove();
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

/**
 * Helper function to get bucket name from hash
 * @param {number} bucketHash - The bucket type hash
 * @returns {string} The bucket name
 */
function getBucketName(bucketHash) {
  const bucketNames = {
    3448274439: "Helmet",
    3551918588: "Gauntlets",
    14239492: "Chest",
    20886954: "Legs",
    1585787867: "Class Item",
  };
  return bucketNames[bucketHash] || "Unknown";
}

/**
 * Transfers and equips a complete loadout to the current character
 * @param {Object} loadout - The loadout object containing armor set
 */
async function transferAndEquipLoadout(loadout) {
  const transferBtn = document.getElementById("transferEquipBtn");
  if (!transferBtn) return;

  const originalText = transferBtn.textContent;
  transferBtn.disabled = true;
  transferBtn.classList.add("processing");
  transferBtn.textContent = "Processing...";

  try {
    if (!currentCharacterId) {
      throw new Error("No character selected");
    }

    // Get auth status for membership info
    const authStatus = await API.auth.checkStatus();
    if (!authStatus.authenticated || !authStatus.destinyMembership) {
      throw new Error("Not authenticated");
    }

    const { membershipType } = authStatus.destinyMembership;

    // Process each armor piece
    const transferPromises = [];
    let transferCount = 0;
    let equipCount = 0;

    for (const piece of loadout.set) {
      const itemId = piece.itemInstanceId;
      const itemHash = piece.itemHash;
      const itemName = piece.definition.displayProperties.name;
      const bucketName = getBucketName(
        piece.definition.inventory.bucketTypeHash
      );

      transferBtn.textContent = `Transferring ${bucketName}...`;

      // Check if item needs to be transferred
      if (piece.location === 2) {
        // Item is in vault, transfer to character
        console.log(`Transferring ${itemName} from vault to character`);
        transferCount++;

        await API.inventory.transfer(
          itemId,
          itemHash,
          currentCharacterId,
          membershipType,
          piece.quantity || 1
        );

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 250));
      } else if (
        piece.characterId &&
        piece.characterId !== currentCharacterId
      ) {
        // Item is on another character, transfer to vault first then to target character
        console.log(`Transferring ${itemName} from another character`);
        transferCount++;

        // Transfer to vault (characterId = false)
        await API.inventory.transfer(
          itemId,
          itemHash,
          false,
          membershipType,
          piece.quantity || 1
        );

        await new Promise((resolve) => setTimeout(resolve, 250));

        // Then transfer to target character
        await API.inventory.transfer(
          itemId,
          itemHash,
          currentCharacterId,
          membershipType,
          piece.quantity || 1
        );

        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    // Now equip all items
    transferBtn.textContent = "Equipping armor...";

    for (const piece of loadout.set) {
      const itemId = piece.itemInstanceId;
      const bucketName = getBucketName(
        piece.definition.inventory.bucketTypeHash
      );

      console.log(`Equipping ${piece.definition.displayProperties.name}`);
      equipCount++;

      await API.inventory.equip(itemId, currentCharacterId, membershipType);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    transferBtn.classList.remove("processing");
    transferBtn.classList.add("success");
    transferBtn.textContent = "✓ Loadout Equipped!";

    showNotification(
      `Successfully equipped loadout! Transferred ${transferCount} items and equipped ${equipCount} pieces.`,
      "success"
    );

    // Reset button after 3 seconds
    setTimeout(() => {
      transferBtn.textContent = originalText;
      transferBtn.disabled = false;
      transferBtn.classList.remove("success");
    }, 3000);

    // Refresh armor display to show the changes
    if (armorLoaded) {
      applyArmorFilters();
    }
  } catch (error) {
    console.error("Failed to transfer/equip loadout:", error);
    transferBtn.classList.remove("processing");
    transferBtn.classList.add("error");
    transferBtn.textContent = "❌ Failed";

    showNotification(`Failed to equip loadout: ${error.message}`, "error");

    // Reset button after 3 seconds
    setTimeout(() => {
      transferBtn.textContent = originalText;
      transferBtn.disabled = false;
      transferBtn.classList.remove("error");
    }, 3000);
  }
}

function updateDynamicLimits() {
  if (!precomputedDistributions || precomputedDistributions.length === 0) {
    document
      .querySelectorAll(".stat-box.disabled")
      .forEach((box) => box.classList.remove("disabled"));
    return;
  }

  const targetPoints = [
    state.statValues.Weapons,
    state.statValues.Health,
    state.statValues.Class,
    state.statValues.Grenade,
    state.statValues.Super,
    state.statValues.Melee,
  ];

  const validDistributions = precomputedDistributions.filter((dist) => {
    let totalMods = 0;
    for (let i = 0; i < 6; i++) {
      let needed = targetPoints[i] - dist[i];
      if (needed > 0) totalMods += Math.ceil(needed / 10);
    }
    return totalMods <= 5;
  });

  const newLimits = {};
  const statsOrder = [
    "Weapons",
    "Health",
    "Class",
    "Grenade",
    "Super",
    "Melee",
  ];
  for (let s = 0; s < 6; s++) {
    let maxForThis = 0;
    for (const dist of validDistributions) {
      let modsOthers = 0;
      for (let o = 0; o < 6; o++) {
        if (o !== s) {
          let needed = targetPoints[o] - dist[o];
          if (needed > 0) modsOthers += Math.ceil(needed / 10);
        }
      }
      let remainingMods = 5 - modsOthers;
      if (remainingMods >= 0) {
        let potential = dist[s] + remainingMods * 10;
        if (potential > maxForThis) maxForThis = potential;
      }
    }
    newLimits[statsOrder[s]] = Math.floor(Math.min(200, maxForThis) / 10) * 10;
  }

  updateStatButtons(newLimits);
}
