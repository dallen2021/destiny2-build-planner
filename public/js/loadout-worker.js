/**
 * public/js/loadout-worker.js
 * * This script runs in a separate thread to handle the computationally
 * intensive task of generating and evaluating Destiny 2 loadouts.
 * By offloading this work from the main thread, it prevents the UI
 * from freezing, ensuring a smooth and responsive user experience,
 * especially for players with a large number of armor pieces.
 */

/**
 * Entry point for the worker. Listens for messages from the main thread.
 * The main thread will send a message with the necessary data to start
 * the loadout generation process.
 * * @param {MessageEvent} e The event object containing the data sent from the main thread.
 * e.data should contain { allItems, character, state }.
 */
onmessage = function (e) {
  const { allItems, character, state } = e.data;

  if (!allItems || !character || !state) {
    postMessage({ error: "Invalid data received by worker." });
    return;
  }

  // Start the loadout generation process
  const { loadouts, limits } = generateLoadouts(allItems, character, state);

  // Send the results back to the main thread
  postMessage({ type: "loadoutsGenerated", payload: { loadouts, limits } });
};

/**
 * Generates all possible loadout combinations based on the provided armor items and state.
 * This is the core computational logic that was moved from the main thread.
 * * @param {Array} allItems - An array of all armor items for the user.
 * @param {Object} character - The currently selected character object.
 * @param {Object} state - The current application state, including target stats and selected exotic.
 * @returns {Object} An object containing an array of valid loadouts and an object with stat limits.
 */
function generateLoadouts(allItems, character, state) {
  try {
    const armorPieces = {
      helmet: [],
      gauntlets: [],
      chest: [],
      legs: [],
      classItem: [],
    };

    const bucketHashes = {
      helmet: 3448274439,
      gauntlets: 3551918588,
      chest: 14239492,
      legs: 20886954,
      classItem: 1585787867,
    };

    const armorItems = allItems.filter(
      (item) =>
        item.definition?.itemType === 2 &&
        (item.definition?.classType === character.classType ||
          item.definition?.classType === 3)
    );

    for (const item of armorItems) {
      const bucketHash = item.definition.inventory.bucketTypeHash;
      if (bucketHash === bucketHashes.helmet) armorPieces.helmet.push(item);
      else if (bucketHash === bucketHashes.gauntlets)
        armorPieces.gauntlets.push(item);
      else if (bucketHash === bucketHashes.chest) armorPieces.chest.push(item);
      else if (bucketHash === bucketHashes.legs) armorPieces.legs.push(item);
      else if (bucketHash === bucketHashes.classItem)
        armorPieces.classItem.push(item);
    }

    let combinations = [];
    for (const helmet of armorPieces.helmet) {
      for (const gauntlets of armorPieces.gauntlets) {
        for (const chest of armorPieces.chest) {
          for (const legs of armorPieces.legs) {
            for (const classItem of armorPieces.classItem) {
              const set = [helmet, gauntlets, chest, legs, classItem];
              const exoticCount = set.filter(
                (p) => p.definition.inventory.tierTypeName === "Exotic"
              ).length;
              if (exoticCount > 1) continue;
              if (
                state.selectedExoticHash &&
                !set.some((p) => p.itemHash == state.selectedExoticHash)
              )
                continue;
              if (!state.selectedExoticHash && exoticCount > 0) continue;
              combinations.push(set);
            }
          }
        }
      }
    }

    const loadouts = calculateLoadoutStats(combinations, state);

    // NEW: Calculate the maximum possible value for each stat from the valid loadouts
    const limits = {
      Weapons: 0,
      Health: 0,
      Class: 0,
      Grenade: 0,
      Super: 0,
      Melee: 0,
    };
    if (loadouts.length > 0) {
      for (const statName in limits) {
        const maxStat = Math.max(...loadouts.map((l) => l.stats[statName]));
        limits[statName] = maxStat;
      }
    }

    return { loadouts, limits };
  } catch (e) {
    console.error("Error generating loadouts in worker:", e);
    // In case of an error, post an error message back to the main thread
    postMessage({ type: "error", payload: e.message });
    return { loadouts: [], limits: {} };
  }
}

/**
 * Calculates the final stats for each loadout combination, considering mods.
 * * @param {Array} combinations - An array of armor set combinations.
 * @param {Object} state - The application state with target stat values.
 * @returns {Array} A sorted array of valid loadouts with their calculated stats.
 */
function calculateLoadoutStats(combinations, state) {
  const targetTiers = {
    Weapons: state.statValues.Weapons / 10,
    Health: state.statValues.Health / 10,
    Class: state.statValues.Class / 10,
    Grenade: state.statValues.Grenade / 10,
    Super: state.statValues.Super / 10,
    Melee: state.statValues.Melee / 10,
  };

  const statMap = {
    2996146975: "Weapons", // Corresponds to Mobility
    392767087: "Health", // Corresponds to Resilience
    1943323491: "Class", // Corresponds to Recovery
    1735777505: "Grenade", // Corresponds to Discipline
    144602215: "Super", // Corresponds to Intellect
    4244567218: "Melee", // Corresponds to Strength
  };

  const fontMods = {
    Weapons: [20, 40, 50],
    Health: [20, 40, 50],
    Class: [20, 40, 50],
    Grenade: [20, 40, 50],
    Super: [20, 40, 50],
    Melee: [20, 40, 50],
  };

  const results = [];

  for (const set of combinations) {
    let currentStats = {
      Weapons: 0,
      Health: 0,
      Class: 0,
      Grenade: 0,
      Super: 0,
      Melee: 0,
    };

    for (const piece of set) {
      if (piece.stats) {
        for (const statHash in piece.stats) {
          const statName = statMap[statHash];
          if (statName) {
            currentStats[statName] += piece.stats[statHash].value;
          }
        }
      }
      // Assume masterworked (+2 to all stats for each of the 4 main armor pieces)
      if (piece.definition.inventory.bucketTypeHash !== 1585787867) {
        // Not a class item
        for (const statName in currentStats) {
          currentStats[statName] += 2;
        }
      }
    }

    let modPlan = {
      Weapons: 0,
      Health: 0,
      Class: 0,
      Grenade: 0,
      Super: 0,
      Melee: 0,
    };
    let moddedStats = { ...currentStats };
    let totalModCost = 0;

    for (const statName in targetTiers) {
      let needed = targetTiers[statName] * 10 - moddedStats[statName];

      const fontBonus = fontMods[statName].find(
        (b) => b + moddedStats[statName] >= targetTiers[statName] * 10
      );
      if (fontBonus) {
        needed -= fontBonus;
      }

      if (needed > 0) {
        const majorMods = Math.floor(needed / 10);
        totalModCost += majorMods * 3;
        modPlan[statName] += majorMods * 10;
        moddedStats[statName] += majorMods * 10;

        let remainingNeeded =
          targetTiers[statName] * 10 - moddedStats[statName];
        if (remainingNeeded > 0) {
          const minorMods = Math.ceil(remainingNeeded / 5);
          totalModCost += minorMods * 1;
          modPlan[statName] += minorMods * 5;
          moddedStats[statName] += minorMods * 5;
        }
      }
    }

    if (totalModCost <= 15) {
      results.push({ set, stats: moddedStats, modPlan });
    }
  }

  // Sort results: higher total tiers first, then by less wasted stats
  results.sort((a, b) => {
    const aTiers = Object.values(a.stats).reduce(
      (sum, val) => sum + Math.floor(val / 10),
      0
    );
    const bTiers = Object.values(b.stats).reduce(
      (sum, val) => sum + Math.floor(val / 10),
      0
    );
    if (bTiers !== aTiers) return bTiers - aTiers;

    const aWasted = Object.values(a.stats).reduce(
      (sum, val) => sum + (val % 10),
      0
    );
    const bWasted = Object.values(b.stats).reduce(
      (sum, val) => sum + (val % 10),
      0
    );
    return aWasted - bWasted;
  });

  return results;
}
