/**
 * public/js/loadout-worker.js
 * Optimized with pruning and sorting for large inventories.
 * Updated to track required mods for achieving target stats.
 */

const STATS_ORDER = ["Weapons", "Health", "Class", "Grenade", "Super", "Melee"];
const STAT_HASHES = [
  2996146975, 392767087, 1943323491, 1735777505, 144602215, 4244567218,
];
const CLASS_ITEM_BUCKET = 1585787867;
const MAX_COMBOS_WARNING = 5000000; // Warn if >5M combos
const MAX_DISPLAY_COMBOS = 100000; // Cap for progress display

let precomputedDistributions = [];

/**
 * Entry point for the worker
 */
onmessage = function (e) {
  console.log("Loadout worker received message:", e.data.type);
  const { type, payload } = e.data;

  if (type === "precompute") {
    const { allItems, character, state } = payload;
    const distributions = precomputeStatDistributions(
      allItems,
      character,
      state
    );
    precomputedDistributions = distributions; // Add this line to update worker global
    postMessage({ type: "precomputeDone", payload: { distributions } });
    return;
  }

  if (type === "generate") {
    const { allItems, character, state } = payload;
    if (!allItems || !character || !state) {
      postMessage({
        type: "error",
        payload: "Invalid data received by worker.",
      });
      return;
    }

    // Start the loadout generation process
    const { loadouts, limits } = generateLoadouts(allItems, character, state);

    // Send the results back to the main thread
    console.log(`Worker found ${loadouts.length} valid loadouts.`);
    postMessage({ type: "loadoutsGenerated", payload: { loadouts, limits } });
  }
};

function prepareArmorPieces(allItems, character, state) {
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

  // Precompute contributions and total stat sum for sorting
  for (const slot in armorPieces) {
    for (const piece of armorPieces[slot]) {
      piece.contrib = new Array(6).fill(0);
      piece.totalStats = 0;

      // Base stats from the armor
      for (let i = 0; i < 6; i++) {
        piece.contrib[i] = piece.stats?.[STAT_HASHES[i]]?.value || 0;
        piece.totalStats += piece.contrib[i];
      }

      // Check if the armor is already masterworked (energy capacity 10)
      const isMasterworked = piece.energy === 10;

      // For non-class items, add +2 to all stats for masterwork
      // Class items don't get stat bonuses from masterworking
      if (piece.definition.inventory.bucketTypeHash !== CLASS_ITEM_BUCKET) {
        // If already masterworked, the +2 is already in the base stats
        // If not masterworked, assume it will be and add +2
        if (!isMasterworked) {
          for (let i = 0; i < 6; i++) {
            piece.contrib[i] += 2;
            piece.totalStats += 2;
          }
        }
      }
    }
    // Sort by descending total stats for better pruning
    armorPieces[slot].sort((a, b) => b.totalStats - a.totalStats);
  }

  if (state.selectedExoticHash) {
    let exoticFound = false;
    let exoticSlot = null;

    for (const slot in armorPieces) {
      const piece = armorPieces[slot].find(
        (p) => p.itemHash == state.selectedExoticHash
      );
      if (piece) {
        armorPieces[slot] = [piece];
        exoticFound = true;
        exoticSlot = slot;
        break;
      }
    }

    if (exoticFound) {
      for (const slot in armorPieces) {
        if (slot !== exoticSlot) {
          armorPieces[slot] = armorPieces[slot].filter(
            (p) => p.definition.inventory.tierTypeName !== "Exotic"
          );
        }
      }
    }
  } else {
    // If no exotic is selected, filter out all exotics
    for (const slot in armorPieces) {
      armorPieces[slot] = armorPieces[slot].filter(
        (p) => p.definition.inventory.tierTypeName !== "Exotic"
      );
    }
  }

  console.log("Prepared armor pieces for loadout generation:", {
    helmets: armorPieces.helmet.length,
    gauntlets: armorPieces.gauntlets.length,
    chests: armorPieces.chest.length,
    legs: armorPieces.legs.length,
    classItems: armorPieces.classItem.length,
  });

  return armorPieces;
}

function precomputeStatDistributions(allItems, character, state) {
  const armorPieces = prepareArmorPieces(allItems, character, state);
  const distributions = [];
  let combinationCount = 0;

  // Compute max per stat per slot for pruning (not used in precompute, but for consistency)
  const maxPerSlot = computeMaxPerSlot(armorPieces);

  for (const helmet of armorPieces.helmet) {
    const h_cont = helmet.contrib;
    for (const gauntlets of armorPieces.gauntlets) {
      const g_cont = gauntlets.contrib;
      for (const chest of armorPieces.chest) {
        const c_cont = chest.contrib;
        for (const legs of armorPieces.legs) {
          const l_cont = legs.contrib;
          for (const classItem of armorPieces.classItem) {
            const cl_cont = classItem.contrib;
            const base = new Array(6);
            for (let i = 0; i < 6; i++) {
              base[i] =
                h_cont[i] + g_cont[i] + c_cont[i] + l_cont[i] + cl_cont[i];
            }
            distributions.push(base);
            combinationCount++;
            if (combinationCount > 10000000) {
              console.warn(
                "Combination count exceeds 10,000,000. Aborting pre-computation."
              );
              return distributions;
            }
          }
        }
      }
    }
  }
  return distributions;
}

/**
 * Generates loadouts with pruning
 */
function generateLoadouts(allItems, character, state) {
  try {
    const armorPieces = prepareArmorPieces(allItems, character, state);

    // Precompute target points
    const targetPoints = new Array(6);
    targetPoints[0] = state.statValues.Weapons;
    targetPoints[1] = state.statValues.Health;
    targetPoints[2] = state.statValues.Class;
    targetPoints[3] = state.statValues.Grenade;
    targetPoints[4] = state.statValues.Super;
    targetPoints[5] = state.statValues.Melee;

    // Compute max per stat per remaining slots for pruning
    const maxPerSlot = computeMaxPerSlot(armorPieces);

    // Generate combinations with pruning
    let validLoadouts = [];

    // Total combos estimate
    let totalCombos =
      armorPieces.helmet.length *
      armorPieces.gauntlets.length *
      armorPieces.chest.length *
      armorPieces.legs.length *
      armorPieces.classItem.length;
    console.log(`Estimated total combinations: ${totalCombos}`);
    let combinationCount = 0;
    postMessage({
      type: "progress",
      payload: {
        current: 0,
        total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
        classType: character.classType,
      },
    }); // Initial progress

    if (totalCombos > MAX_COMBOS_WARNING) {
      console.warn(
        `Large inventory: ${totalCombos} combinations. May take time. Consider selecting an exotic to reduce.`
      );
    }

    for (const helmet of armorPieces.helmet) {
      const partial1 = helmet.contrib.slice();
      if (
        !canReachTarget(
          partial1,
          targetPoints,
          maxPerSlot.gauntlets +
            maxPerSlot.chest +
            maxPerSlot.legs +
            maxPerSlot.classItem
        )
      )
        continue;

      for (const gauntlets of armorPieces.gauntlets) {
        const partial2 = addArrays(partial1, gauntlets.contrib);
        if (
          !canReachTarget(
            partial2,
            targetPoints,
            maxPerSlot.chest + maxPerSlot.legs + maxPerSlot.classItem
          )
        )
          continue;

        for (const chest of armorPieces.chest) {
          const partial3 = addArrays(partial2, chest.contrib);
          if (
            !canReachTarget(
              partial3,
              targetPoints,
              maxPerSlot.legs + maxPerSlot.classItem
            )
          )
            continue;

          for (const legs of armorPieces.legs) {
            const partial4 = addArrays(partial3, legs.contrib);
            if (!canReachTarget(partial4, targetPoints, maxPerSlot.classItem))
              continue;

            for (const classItem of armorPieces.classItem) {
              const base = addArrays(partial4, classItem.contrib);

              const result = evaluateLoadout(
                [helmet, gauntlets, chest, legs, classItem],
                base,
                targetPoints
              );
              if (result) {
                validLoadouts.push(result);
              }

              combinationCount++;
              if (combinationCount % 1000 === 0) {
                postMessage({
                  type: "progress",
                  payload: {
                    current: combinationCount,
                    total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
                    percentage: (
                      (combinationCount /
                        Math.min(totalCombos, MAX_DISPLAY_COMBOS)) *
                      100
                    ).toFixed(2),
                    classType: character.classType,
                  },
                });
              }
            }
          }
        }
      }
    }

    // Final progress
    postMessage({
      type: "progress",
      payload: {
        // Corrected the final progress report
        current: Math.min(combinationCount, MAX_DISPLAY_COMBOS),
        total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
        percentage: 100,
        classType: character.classType,
      },
    });

    // Sort loadouts (unchanged)
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

    // Limit to 100,000 loadouts
    if (validLoadouts.length > MAX_DISPLAY_COMBOS) {
      validLoadouts = validLoadouts.slice(0, MAX_DISPLAY_COMBOS);
    }

    // Calculate stat limits (using precomputed distributions)
    const limits = calculateStatLimits(precomputedDistributions, targetPoints);

    return { loadouts: validLoadouts, limits };
  } catch (e) {
    console.error("Error generating loadouts in worker:", e);
    postMessage({ type: "error", payload: e.message });
    return { loadouts: [], limits: {} };
  }
}

/** Helper: Add two arrays */
function addArrays(a, b) {
  const result = new Array(6);
  for (let i = 0; i < 6; i++) {
    result[i] = a[i] + b[i];
  }
  return result;
}

function computeMaxPerSlot(armorPieces) {
  const maxPerSlot = {};
  for (const slot in armorPieces) {
    const maxStats = new Array(6).fill(0);
    for (const piece of armorPieces[slot]) {
      for (let i = 0; i < 6; i++) {
        if (piece.contrib[i] > maxStats[i]) maxStats[i] = piece.contrib[i];
      }
    }
    maxPerSlot[slot] = maxStats; // Array now
  }
  return maxPerSlot;
}

// In canReachTarget, sum per-stat max from remaining slots
function canReachTarget(partial, targetPoints, maxRemaining) {
  // maxRemaining is now array sum of remaining slots' maxStats
  for (let i = 0; i < 6; i++) {
    if (partial[i] + maxRemaining[i] < targetPoints[i] - 50) return false;
  }
  return true;
}
// When calling, precompute summed max for each partial (e.g., for partial1: sum max.gauntlets[i] + max.chest[i] + ... for each i)

/**
 * Evaluates a single loadout combination using array-based stats
 * Now tracks which mods are required to achieve target stats
 */
function evaluateLoadout(set, base, targetPoints) {
  let totalMods = 0;
  const added = new Array(6).fill(0);
  const requiredMods = [];

  // Calculate mods needed for each stat
  for (let i = 0; i < 6; i++) {
    let needed = targetPoints[i] - base[i];
    if (needed > 0) {
      let mods = Math.ceil(needed / 10);
      totalMods += mods;
      added[i] = mods * 10;

      // Track which mods are needed
      for (let j = 0; j < mods; j++) {
        requiredMods.push({
          stat: STATS_ORDER[i],
          statIndex: i,
          value: 10, // Major mod value
        });
      }
    }
  }

  if (totalMods <= 5) {
    const stats = {};
    for (let i = 0; i < 6; i++) {
      stats[STATS_ORDER[i]] = base[i] + added[i];
    }
    return { set, stats, requiredMods };
  }

  return null;
}

/**
 * Calculates the maximum possible value for each stat using precomputed distributions
 */
function calculateStatLimits(distributions, targetPoints) {
  const limits = {};
  const statsOrder = STATS_ORDER;

  for (let s = 0; s < 6; s++) {
    let maxForThis = 0;
    for (const dist of distributions) {
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
    limits[statsOrder[s]] = Math.min(200, maxForThis);
  }

  return limits;
}
