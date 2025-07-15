/**
 * public/js/loadout-worker.js
 * This script runs in a separate thread to handle the computationally
 * intensive task of generating and evaluating Destiny 2 loadouts.
 */

const STATS_ORDER = ["Weapons", "Health", "Class", "Grenade", "Super", "Melee"];
const STAT_HASHES = [
  2996146975, 392767087, 1943323491, 1735777505, 144602215, 4244567218,
];
const CLASS_ITEM_BUCKET = 1585787867;

let precomputedDistributions = [];

/**
 * Entry point for the worker
 */
onmessage = function (e) {
  const { type, payload } = e.data;

  if (type === "precompute") {
    const { allItems, character, state } = payload;
    const distributions = precomputeStatDistributions(
      allItems,
      character,
      state
    );
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
    postMessage({ type: "loadoutsGenerated", payload: { loadouts, limits } });
  }
};

function precomputeStatDistributions(allItems, character, state) {
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

  // Precompute contributions for each piece
  for (const slot in armorPieces) {
    for (const piece of armorPieces[slot]) {
      piece.contrib = new Array(6).fill(0);
      for (let i = 0; i < 6; i++) {
        piece.contrib[i] = piece.stats?.[STAT_HASHES[i]]?.value || 0;
      }
      if (
        piece.definition.inventory.bucketTypeHash !== CLASS_ITEM_BUCKET &&
        piece.energy === 10
      ) {
        for (let i = 0; i < 6; i++) piece.contrib[i] += 2;
      }
    }
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
                "Combination count exceeds 10,000,000. Aborting pre-computation to avoid performance issues."
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
 * Generates loadout combinations
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

    // Precompute contributions for each piece
    for (const slot in armorPieces) {
      for (const piece of armorPieces[slot]) {
        piece.contrib = new Array(6).fill(0);
        for (let i = 0; i < 6; i++) {
          piece.contrib[i] = piece.stats?.[STAT_HASHES[i]]?.value || 0;
        }
        if (
          piece.definition.inventory.bucketTypeHash !== CLASS_ITEM_BUCKET &&
          piece.energy === 10
        ) {
          for (let i = 0; i < 6; i++) piece.contrib[i] += 2;
        }
      }
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
      for (const slot in armorPieces) {
        armorPieces[slot] = armorPieces[slot].filter(
          (p) => p.definition.inventory.tierTypeName !== "Exotic"
        );
      }
    }

    // Precompute target points (actual stat values like 100)
    const targetPoints = new Array(6);
    targetPoints[0] = state.statValues.Weapons;
    targetPoints[1] = state.statValues.Health;
    targetPoints[2] = state.statValues.Class;
    targetPoints[3] = state.statValues.Grenade;
    targetPoints[4] = state.statValues.Super;
    targetPoints[5] = state.statValues.Melee;

    // Generate combinations
    let validLoadouts = [];

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

              // Compute base stats
              const base = new Array(6);
              for (let i = 0; i < 6; i++) {
                base[i] =
                  h_cont[i] + g_cont[i] + c_cont[i] + l_cont[i] + cl_cont[i];
              }

              const result = evaluateLoadout(
                [helmet, gauntlets, chest, legs, classItem],
                base,
                targetPoints
              );
              if (result) {
                validLoadouts.push(result);
              }
            }
          }
        }
      }
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

    // Calculate stat limits (using precomputed distributions)
    const limits = calculateStatLimits(precomputedDistributions, targetPoints);

    return { loadouts: validLoadouts, limits };
  } catch (e) {
    console.error("Error generating loadouts in worker:", e);
    postMessage({ type: "error", payload: e.message });
    return { loadouts: [], limits: {} };
  }
}

/**
 * Evaluates a single loadout combination using array-based stats
 */
function evaluateLoadout(set, base, targetPoints) {
  let totalMods = 0;
  const added = new Array(6).fill(0);

  for (let i = 0; i < 6; i++) {
    let needed = targetPoints[i] - base[i];
    if (needed > 0) {
      let mods = Math.ceil(needed / 10);
      totalMods += mods;
      added[i] = mods * 10;
    }
  }

  if (totalMods <= 5) {
    const stats = {};
    for (let i = 0; i < 6; i++) {
      stats[STATS_ORDER[i]] = base[i] + added[i];
    }
    return { set, stats };
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
