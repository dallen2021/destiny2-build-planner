// public/js/app.js

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Content Loaded - initializing app");
  await initializeApp();
});

async function initializeApp() {
  try {
    console.log("Fetching manifest...");
    window.manifest = await getManifest();
    console.log("Manifest loaded.", window.manifest);

    console.log("Fetching profile...");
    const profile = await getProfile();
    console.log("Full profile response received:", profile);

    if (profile && profile.destinyMemberships) {
      // --- NAME DISPLAY FIX & LOGGING ---
      const primaryMembership =
        profile.destinyMemberships.find(
          (m) => m.membershipId === profile.primaryMembershipId
        ) || profile.destinyMemberships[0];
      const playerName = primaryMembership.bungieGlobalDisplayName;
      const playerCode = primaryMembership.bungieGlobalDisplayNameCode;
      console.log(`Primary Membership found:`, primaryMembership);
      console.log(`Displaying player name: ${playerName}#${playerCode}`);
      document.getElementById(
        "player-name"
      ).innerText = `${playerName}#${playerCode}`;
      // --- END NAME FIX ---

      console.log("Fetching inventory...");
      window.inventory = await getInventory();
      console.log("Full inventory data with merged stats:", window.inventory);

      setupEventListeners();
      applyFilters(); // Initial filter application
    } else {
      console.error("Profile or destinyMemberships not found in the response.");
    }
    console.log("App initialization complete");
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
}

function displayArmorItems(armorItems, manifest) {
  console.log("--- Displaying Character Armor ---");
  const charactersContainer = document.getElementById("character-inventories");
  charactersContainer.innerHTML = ""; // Clear previous content

  const characters = window.inventory.characters.data;
  const characterEquipment = window.inventory.characterEquipment.data;

  console.log("Processing characters:", Object.keys(characters));

  Object.values(characters).forEach((character) => {
    const characterId = character.characterId;
    const characterItemsInInventory =
      window.inventory.characterInventories.data[characterId]?.items || [];
    const characterItemsEquipped = characterEquipment[characterId]?.items || [];

    // Combine inventory and equipped items for each character
    const allCharacterItems = [
      ...characterItemsInInventory,
      ...characterItemsEquipped,
    ];

    const characterArmor = armorItems.filter((item) =>
      allCharacterItems.some((ci) => ci.itemInstanceId === item.itemInstanceId)
    );

    const characterName = getCharacterName(characterId, manifest);
    console.log(
      `Character: ${characterName} (${characterId}) has ${characterArmor.length} armor pieces.`
    );

    if (characterArmor.length > 0) {
      const characterDiv = document.createElement("div");
      characterDiv.className = "character-inventory";
      characterDiv.innerHTML = `<h3>${characterName}</h3>`;

      const itemsContainer = document.createElement("div");
      itemsContainer.className = "items-container";

      characterArmor.forEach((item) => {
        const itemElement = createItemElement(item, manifest);
        itemsContainer.appendChild(itemElement);
      });

      characterDiv.appendChild(itemsContainer);
      charactersContainer.appendChild(characterDiv);
    }
  });

  // Now, display vault items in their own section
  displayVaultItems(armorItems, manifest);
}

function displayVaultItems(armorItems, manifest) {
  console.log("--- Displaying Vault Armor ---");
  const vaultContainer = document.getElementById("vault-items-container");
  if (!vaultContainer) {
    console.error("Vault container not found in HTML!");
    return;
  }
  vaultContainer.innerHTML = "";

  // FIX: Filter for items specifically in the vault (location: 2)
  const vaultItems = armorItems.filter((item) => item.location === 2);
  console.log(`Found ${vaultItems.length} armor items in the vault.`);

  vaultItems.forEach((item) => {
    const itemElement = createItemElement(item, manifest);
    vaultContainer.appendChild(itemElement);
  });
}

function getCharacterName(characterId, manifest) {
  const characterData = window.inventory.characters.data[characterId];
  if (characterData) {
    const classDef = manifest.DestinyClassDefinition[characterData.classHash];
    return classDef
      ? classDef.displayProperties.name
      : `Character ${characterId}`;
  }
  return `Character ${characterId}`;
}

function combineInventoryItems(inventoryData) {
  let all = [];
  if (inventoryData.profileInventory?.data?.items) {
    console.log(
      `Vault items fetched: ${inventoryData.profileInventory.data.items.length}`
    );
    all = all.concat(inventoryData.profileInventory.data.items);
  }
  if (inventoryData.characterInventories?.data) {
    Object.values(inventoryData.characterInventories.data).forEach((inv) => {
      all = all.concat(inv.items || []);
    });
  }
  if (inventoryData.characterEquipment?.data) {
    Object.values(inventoryData.characterEquipment.data).forEach((equip) => {
      all = all.concat(equip.items || []);
    });
  }
  console.log(`Total combined items (before filtering): ${all.length}`);
  return all;
}

// --- Keep all your other functions below this line ---

function createItemElement(item, manifest) {
  // ... (no changes needed here)
  const itemElement = document.createElement("div");
  itemElement.className = "item";
  const itemDefinition = manifest.DestinyInventoryItemDefinition[item.itemHash];
  item.definition = itemDefinition;

  if (itemDefinition) {
    const iconUrl = `https://www.bungie.net${itemDefinition.displayProperties.icon}`;
    itemElement.innerHTML = `
            <img src="${iconUrl}" alt="${
      itemDefinition.displayProperties.name
    }" title="${itemDefinition.displayProperties.name}">
            <div class="item-power">${item.power || ""}</div>
        `;
  }

  itemElement.addEventListener("click", () => showItemDetails(item));
  return itemElement;
}

function showItemDetails(item) {
  // ... (no changes needed here)
  const modal = document.getElementById("item-details-modal");
  const modalContent = document.getElementById("modal-content");

  const statsHtml = Object.entries(item.stats || {})
    .map(([statHash, stat]) => {
      const statDef = window.manifest.DestinyStatDefinition[statHash];
      return `<li>${statDef.displayProperties.name}: ${stat.value}</li>`;
    })
    .join("");

  modalContent.innerHTML = `
        <h2>${item.definition.displayProperties.name}</h2>
        <p>${item.definition.displayProperties.description}</p>
        <ul>${statsHtml}</ul>
    `;
  modal.style.display = "block";

  const closeButton = document.querySelector(".modal .close");
  closeButton.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function setupEventListeners() {
  // ... (no changes needed here)
  document.getElementById("search").addEventListener("input", applyFilters);
  document
    .getElementById("class-filter")
    .addEventListener("change", applyFilters);
  document
    .getElementById("slot-filter")
    .addEventListener("change", applyFilters);
  document.getElementById("refresh-button").addEventListener("click", () => {
    console.log("Refreshing inventory data...");
    initializeApp();
  });
}

function applyFilters() {
  // ... (no changes needed here)
  const searchValue = document.getElementById("search").value.toLowerCase();
  const classValue = document.getElementById("class-filter").value;
  const slotValue = document.getElementById("slot-filter").value;
  const allItems = combineInventoryItems(window.inventory);
  console.log("Applying filters: ", {
    searchValue,
    classValue,
    slotValue,
    totalItems: allItems.length,
  });

  const armorItems = allItems.filter((item) => {
    const itemDefinition =
      window.manifest.DestinyInventoryItemDefinition[item.itemHash];
    return itemDefinition && itemDefinition.itemType === 2;
  });

  const filteredItems = armorItems.filter((item) => {
    const itemDefinition =
      window.manifest.DestinyInventoryItemDefinition[item.itemHash];

    const nameMatch = itemDefinition.displayProperties.name
      .toLowerCase()
      .includes(searchValue);

    const classMatch =
      classValue === "all" || itemDefinition.classType == classValue;

    const slotMatch =
      slotValue === "all" ||
      itemDefinition.inventory.bucketTypeHash == slotValue;

    return nameMatch && classMatch && slotMatch;
  });
  console.log(`Filtered to ${filteredItems.length} items`);

  displayArmorItems(filteredItems, window.manifest);
}
