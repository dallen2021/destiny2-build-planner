import { describe, expect, it } from "vitest";

import type { NormalizedArmorItem } from "./inventory";
import { rankArmorForGoal } from "./optimizer";

function makeArmor(
  id: string,
  slot: string,
  stats: Record<string, number>,
): NormalizedArmorItem {
  return {
    bucketHash: 3448274439,
    characterId: null,
    className: "Hunter",
    classType: 1,
    gearTier: 4,
    icon: null,
    id,
    isEquipped: false,
    itemHash: Number(id.replace(/\D/g, "")) || 1,
    kind: "armor",
    location: "vault",
    name: id,
    perks: [],
    power: 400,
    setData: null,
    slot,
    sockets: [],
    statTotal: Object.values(stats).reduce((total, value) => total + value, 0),
    stats,
    tier: "Legendary",
    weaponTier: null,
  };
}

describe("rankArmorForGoal", () => {
  it("selects one compatible armor item per slot", () => {
    const result = rankArmorForGoal({
      goal: { classType: 1, preferredStats: ["Resilience"] },
      items: [
        makeArmor("helmet-1", "Helmet", { Resilience: 10 }),
        makeArmor("helmet-2", "Helmet", { Resilience: 30 }),
        makeArmor("arms", "Gauntlets", { Resilience: 20 }),
        makeArmor("chest", "Chest", { Resilience: 20 }),
        makeArmor("legs", "Legs", { Resilience: 20 }),
        makeArmor("class", "Class Item", { Resilience: 20 }),
      ],
    });

    expect(result.items.map((item) => item.id)).toEqual([
      "helmet-2",
      "arms",
      "chest",
      "legs",
      "class",
    ]);
    expect(result.missingSlots).toEqual([]);
    expect(result.statTotals.Resilience).toBe(110);
  });

  it("excludes slop-tagged armor from optimizer candidates", () => {
    const result = rankArmorForGoal({
      goal: { classType: 1, preferredStats: ["Resilience"] },
      items: [
        makeArmor("helmet-1", "Helmet", { Resilience: 40 }),
        makeArmor("helmet-2", "Helmet", { Resilience: 12 }),
      ],
      tagMap: { "helmet-1": ["slop"] },
    });

    expect(result.items.map((item) => item.id)).toEqual(["helmet-2"]);
    expect(result.missingSlots).toEqual(["Gauntlets", "Chest", "Legs", "Class Item"]);
  });
});
