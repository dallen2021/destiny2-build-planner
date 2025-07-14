/**
 * public/js/loadout-worker.js
 * This script runs in a separate thread to handle the computationally
 * intensive task of generating and evaluating Destiny 2 loadouts.
 */

/**
 * Entry point for the worker
 */
onmessage = function (e) {
  const { allItems, character, state } = e.data;

  if (!allItems || !character || !state) {
    postMessage({ type: "error", payload: "Invalid data received by worker." });
    return;
  }

  // Start the loadout generation process
  const { loadouts, limits } = generateLoadouts(allItems, character, state);

  // Send the results back to the main thread
  postMessage({ type: "loadoutsGenerated", payload: { loadouts, limits } });
};

/**
 * Generates loadout combinations with progress updates
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

    // Check if all target stats are at 10 (no mods strategy)
    const allStatsMinimal = Object.values(state.statValues).every(
      (v) => v === 10
    );

    // Generate combinations and calculate stats with progress
    let validLoadouts = [];
    let count = 0;
    let lastProgress = 0;

    // Calculate total combinations for progress tracking
    const totalCombinations =
      armorPieces.helmet.length *
      armorPieces.gauntlets.length *
      armorPieces.chest.length *
      armorPieces.legs.length *
      armorPieces.classItem.length;

    let combinationCount = 0;

    for (const helmet of armorPieces.helmet) {
      for (const gauntlets of armorPieces.gauntlets) {
        for (const chest of armorPieces.chest) {
          for (const legs of armorPieces.legs) {
            for (const classItem of armorPieces.classItem) {
              combinationCount++;

              // Send progress updates
              const progress = Math.floor(
                (combinationCount / totalCombinations) * 100
              );
              if (progress > lastProgress + 2) {
                lastProgress = progress;
                postMessage({
                  type: "progress",
                  payload: { progress, count: Math.min(count, 1000) },
                });
              }

              const set = [helmet, gauntlets, chest, legs, classItem];

              // Check exotic constraints
              const exoticCount = set.filter(
                (p) => p.definition.inventory.tierTypeName === "Exotic"
              ).length;

              // Skip if more than one exotic
              if (exoticCount > 1) continue;

              // If an exotic is selected, must include that specific exotic
              if (state.selectedExoticHash) {
                if (!set.some((p) => p.itemHash == state.selectedExoticHash)) {
                  continue;
                }
              }
              // If no exotic selected, allow any combination (including exotics)

              // Calculate the loadout stats
              const result = evaluateLoadout(set, state, allStatsMinimal);
              if (result) {
                validLoadouts.push(result);
                count++;

                // Stop after 1000 valid loadouts
                if (count >= 1000) {
                  postMessage({
                    type: "progress",
                    payload: { progress: 100, count: 1000 },
                  });
                  break;
                }
              }
            }
            if (count >= 1000) break;
          }
          if (count >= 1000) break;
        }
        if (count >= 1000) break;
      }
      if (count >= 1000) break;
    }

    // Sort loadouts
    validLoadouts.sort((a, b) => {
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

    // Calculate stat limits
    const limits = calculateStatLimits(armorPieces, state);

    return { loadouts: validLoadouts, limits };
  } catch (e) {
    console.error("Error generating loadouts in worker:", e);
    postMessage({ type: "error", payload: e.message });
    return { loadouts: [], limits: {} };
  }
}

/**
 * Evaluates a single loadout combination
 */
function evaluateLoadout(set, state, preferNoMods) {
  const targetTiers = {
    Weapons: state.statValues.Weapons / 10,
    Health: state.statValues.Health / 10,
    Class: state.statValues.Class / 10,
    Grenade: state.statValues.Grenade / 10,
    Super: state.statValues.Super / 10,
    Melee: state.statValues.Melee / 10,
  };

  const statMap = {
    2996146975: "Weapons",
    392767087: "Health",
    1943323491: "Class",
    1735777505: "Grenade",
    144602215: "Super",
    4244567218: "Melee",
  };

  // Calculate base stats
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
    // Add masterwork bonus (+2 to all stats for non-class items)
    if (piece.definition.inventory.bucketTypeHash !== 1585787867) {
      for (const statName in currentStats) {
        currentStats[statName] += 2;
      }
    }
  }

  // If preferNoMods is true and all targets are 10, check if we meet targets without mods
  if (preferNoMods) {
    let meetsAllTargets = true;
    for (const statName in targetTiers) {
      if (currentStats[statName] < targetTiers[statName] * 10) {
        meetsAllTargets = false;
        break;
      }
    }

    if (meetsAllTargets) {
      // Return loadout with no mods
      return {
        set,
        stats: currentStats,
        modPlan: {
          Weapons: 0,
          Health: 0,
          Class: 0,
          Grenade: 0,
          Super: 0,
          Melee: 0,
        },
      };
    }
  }

  // Calculate required mods
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

    if (needed > 0) {
      // Calculate optimal mod combination
      const majorMods = Math.floor(needed / 10);
      const remainder = needed % 10;

      // Use major mods first
      if (majorMods > 0) {
        totalModCost += majorMods * 3;
        modPlan[statName] += majorMods * 10;
        moddedStats[statName] += majorMods * 10;
      }

      // Use minor mods for remainder
      if (remainder > 0) {
        const minorMods = Math.ceil(remainder / 5);
        totalModCost += minorMods * 1;
        modPlan[statName] += minorMods * 5;
        moddedStats[statName] += minorMods * 5;
      }
    }
  }

  // Check if mod cost is within limit (5 armor pieces * 3 energy each = 15)
  if (totalModCost <= 15) {
    return { set, stats: moddedStats, modPlan };
  }

  return null;
}

/**
 * Calculates the maximum possible value for each stat
 */
function calculateStatLimits(armorPieces, state) {
  const statMap = {
    2996146975: "Weapons",
    392767087: "Health",
    1943323491: "Class",
    1735777505: "Grenade",
    144602215: "Super",
    4244567218: "Melee",
  };

  const limits = {
    Weapons: 0,
    Health: 0,
    Class: 0,
    Grenade: 0,
    Super: 0,
    Melee: 0,
  };

  // For each stat, find the best possible loadout
  for (const statHash in statMap) {
    const statName = statMap[statHash];
    let maxTotal = 0;

    // Find best piece for this stat in each slot
    const slots = ["helmet", "gauntlets", "chest", "legs", "classItem"];
    for (const slot of slots) {
      let maxForSlot = 0;

      for (const piece of armorPieces[slot]) {
        const statValue = piece.stats?.[statHash]?.value || 0;

        // Check exotic constraints
        const isExotic = piece.definition.inventory.tierTypeName === "Exotic";
        if (state.selectedExoticHash) {
          if (isExotic && piece.itemHash != state.selectedExoticHash) continue;
        }

        maxForSlot = Math.max(maxForSlot, statValue);
      }

      maxTotal += maxForSlot;

      // Add masterwork bonus for non-class items
      if (slot !== "classItem") {
        maxTotal += 2;
      }
    }

    // Add maximum possible mods (5 major mods = +50)
    maxTotal += 50;

    // Cap at game maximum
    limits[statName] = Math.min(maxTotal, 200);
  }

  return limits;
}
