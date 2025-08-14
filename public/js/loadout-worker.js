/**
 * public/js/loadout-worker.js
 * Optimized with bug fixes, memoization, and improved performance
 */

const STATS_ORDER = ["Weapons", "Health", "Class", "Grenade", "Super", "Melee"];
const STAT_HASHES = [
  2996146975, 392767087, 1943323491, 1735777505, 144602215, 4244567218,
];
const CLASS_ITEM_BUCKET = 1585787867;
const MAX_COMBOS_WARNING = 5000000;
const MAX_DISPLAY_COMBOS = 100000;

let precomputedDistributions = [];
const memoizedEvaluations = new Map(); // Memoization cache

/**
 * Entry point for the worker
 */
onmessage = function (e) {
  console.log("Loadout worker received message:", e.data.type);
  const { type, payload } = e.data;

  if (type === "precompute") {
    const { allItems, character, state } = payload;
    memoizedEvaluations.clear(); // Clear cache for new computation
    const distributions = precomputeStatDistributions(
      allItems,
      character,
      state
    );
    precomputedDistributions = distributions;
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

    memoizedEvaluations.clear(); // Clear cache for new generation
    const { loadouts, limits } = generateLoadouts(allItems, character, state);
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

      // Check if the armor is already masterworked
      const isMasterworked = piece.energy === 10;

      // For non-class items, add +2 to all stats for masterwork
      if (piece.definition.inventory.bucketTypeHash !== CLASS_ITEM_BUCKET) {
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

  // Handle exotic selection
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
 * Helper: Add two arrays element-wise
 */
function addArrays(a, b) {
  const result = new Array(6);
  for (let i = 0; i < 6; i++) {
    result[i] = a[i] + b[i];
  }
  return result;
}

/**
 * Helper: Sum multiple arrays element-wise
 */
function sumArrays(...arrays) {
  const result = new Array(6).fill(0);
  for (const arr of arrays) {
    for (let i = 0; i < 6; i++) {
      result[i] += arr[i];
    }
  }
  return result;
}

/**
 * Compute maximum stats per slot
 */
function computeMaxPerSlot(armorPieces) {
  const maxPerSlot = {};
  for (const slot in armorPieces) {
    const maxStats = new Array(6).fill(0);
    for (const piece of armorPieces[slot]) {
      for (let i = 0; i < 6; i++) {
        if (piece.contrib[i] > maxStats[i]) maxStats[i] = piece.contrib[i];
      }
    }
    maxPerSlot[slot] = maxStats;
  }
  return maxPerSlot;
}

/**
 * Check if target can be reached with remaining pieces
 */
function canReachTarget(partial, targetPoints, maxRemaining) {
  for (let i = 0; i < 6; i++) {
    // Allow 50 points of mod flexibility
    if (partial[i] + maxRemaining[i] < targetPoints[i] - 50) return false;
  }
  return true;
}

/**
 * Generates loadouts with proper pruning and memoization
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

    // Compute max per stat per slot for pruning
    const maxPerSlot = computeMaxPerSlot(armorPieces);

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
    let lastProgressUpdate = Date.now();

    postMessage({
      type: "progress",
      payload: {
        current: 0,
        total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
        percentage: 0,
        classType: character.classType,
      },
    });

    if (totalCombos > MAX_COMBOS_WARNING) {
      console.warn(
        `Large inventory: ${totalCombos} combinations. May take time. Consider selecting an exotic to reduce.`
      );
    }

    // Main generation loop with proper array summing
    for (const helmet of armorPieces.helmet) {
      const partial1 = helmet.contrib.slice();
      const maxRemaining1 = sumArrays(
        maxPerSlot.gauntlets,
        maxPerSlot.chest,
        maxPerSlot.legs,
        maxPerSlot.classItem
      );
      if (!canReachTarget(partial1, targetPoints, maxRemaining1)) continue;

      for (const gauntlets of armorPieces.gauntlets) {
        const partial2 = addArrays(partial1, gauntlets.contrib);
        const maxRemaining2 = sumArrays(
          maxPerSlot.chest,
          maxPerSlot.legs,
          maxPerSlot.classItem
        );
        if (!canReachTarget(partial2, targetPoints, maxRemaining2)) continue;

        for (const chest of armorPieces.chest) {
          const partial3 = addArrays(partial2, chest.contrib);
          const maxRemaining3 = sumArrays(
            maxPerSlot.legs,
            maxPerSlot.classItem
          );
          if (!canReachTarget(partial3, targetPoints, maxRemaining3)) continue;

          for (const legs of armorPieces.legs) {
            const partial4 = addArrays(partial3, legs.contrib);
            const maxRemaining4 = maxPerSlot.classItem;
            if (!canReachTarget(partial4, targetPoints, maxRemaining4))
              continue;

            for (const classItem of armorPieces.classItem) {
              const base = addArrays(partial4, classItem.contrib);
              const set = [helmet, gauntlets, chest, legs, classItem];

              // Use memoized evaluation
              const result = evaluateLoadoutMemoized(set, base, targetPoints);
              if (result) {
                validLoadouts.push(result);
              }

              combinationCount++;

              // Update progress less frequently to improve performance
              const now = Date.now();
              if (now - lastProgressUpdate > 100) {
                // Update every 100ms
                lastProgressUpdate = now;
                postMessage({
                  type: "progress",
                  payload: {
                    current: Math.min(combinationCount, MAX_DISPLAY_COMBOS),
                    total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
                    percentage: (
                      (Math.min(combinationCount, MAX_DISPLAY_COMBOS) /
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

    // Final progress update
    postMessage({
      type: "progress",
      payload: {
        current: Math.min(combinationCount, MAX_DISPLAY_COMBOS),
        total: Math.min(totalCombos, MAX_DISPLAY_COMBOS),
        percentage: 100,
        classType: character.classType,
      },
    });

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

    // Limit results
    if (validLoadouts.length > MAX_DISPLAY_COMBOS) {
      validLoadouts = validLoadouts.slice(0, MAX_DISPLAY_COMBOS);
    }

    // Calculate stat limits
    const limits = calculateStatLimits(precomputedDistributions, targetPoints);

    return { loadouts: validLoadouts, limits };
  } catch (e) {
    console.error("Error generating loadouts in worker:", e);
    postMessage({ type: "error", payload: e.message });
    return { loadouts: [], limits: {} };
  }
}

/**
 * Evaluates a loadout with memoization
 */
function evaluateLoadoutMemoized(set, base, targetPoints) {
  // Create a unique key for this combination
  const key = set.map((p) => p.itemInstanceId || p.itemHash).join("-");

  if (memoizedEvaluations.has(key)) {
    return memoizedEvaluations.get(key);
  }

  const result = evaluateLoadout(set, base, targetPoints);
  memoizedEvaluations.set(key, result);

  // Limit cache size to prevent memory issues
  if (memoizedEvaluations.size > 100000) {
    // Clear half of the cache when it gets too large
    const entriesToDelete = Math.floor(memoizedEvaluations.size / 2);
    const iterator = memoizedEvaluations.keys();
    for (let i = 0; i < entriesToDelete; i++) {
      memoizedEvaluations.delete(iterator.next().value);
    }
    console.log(`Cleared ${entriesToDelete} entries from memoization cache`);
  }

  return result;
}

/**
 * Evaluates a single loadout combination
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
          value: 10,
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
 * Calculates the maximum possible value for each stat
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
