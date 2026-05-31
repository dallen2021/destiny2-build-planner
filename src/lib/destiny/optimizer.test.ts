import { describe, expect, it } from "vitest";

import type { NormalizedArmorItem } from "./inventory";
import { rankArmorForGoal } from "./optimizer";

function makeArmor(
  id: string,
  slotName: string,
  stats: Record<string, number>,
): NormalizedArmorItem {
  const normalizedStats = Object.entries(stats).map(([name, value], index) => ({
    display: "bar" as const,
    hash: index + 1,
    name,
    sortOrder: index + 1,
    value,
  }));

  return {
    bucket: { hash: 3448274439, name: slotName, scope: "character" },
    bucketHash: 3448274439,
    characterId: null,
    className: "Hunter",
    classType: 1,
    damageType: { color: null, hash: null, icon: null, name: null },
    description: null,
    gearTier: 4,
    icon: null,
    iconLayers: {
      background: null,
      featuredWatermark: null,
      ornamentWatermark: null,
      overlay: null,
      shelvedWatermark: null,
      watermark: null,
    },
    id,
    isEquipped: false,
    itemHash: Number(id.replace(/\D/g, "")) || 1,
    itemInstanceId: id,
    kind: "armor",
    location: "vault",
    masterwork: null,
    name: id,
    ornament: null,
    perks: [],
    power: 400,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: 3448274439, name: slotName, order: 10 },
    slotName,
    sockets: [],
    statTotal: Object.values(stats).reduce((total, value) => total + value, 0),
    stats: normalizedStats,
    state: {
      adept: false,
      canEquip: true,
      canTransfer: true,
      crafted: false,
      enhanced: false,
      locked: false,
      masterworked: false,
      tracked: false,
    },
    tier: "Legendary",
    weaponTier: null,
  };
}

describe("rankArmorForGoal", () => {
  it("selects one compatible armor item per slot", () => {
    const result = rankArmorForGoal({
      goal: { classType: 1, preferredStats: ["Health"] },
      items: [
        makeArmor("helmet-1", "Helmet", { Health: 10 }),
        makeArmor("helmet-2", "Helmet", { Health: 30 }),
        makeArmor("arms", "Gauntlets", { Health: 20 }),
        makeArmor("chest", "Chest", { Health: 20 }),
        makeArmor("legs", "Legs", { Health: 20 }),
        makeArmor("class", "Class Item", { Health: 20 }),
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
    expect(result.statTotals.Health).toBe(110);
  });

  it("excludes slop-tagged armor from optimizer candidates", () => {
    const result = rankArmorForGoal({
      goal: { classType: 1, preferredStats: ["Health"] },
      items: [
        makeArmor("helmet-1", "Helmet", { Health: 40 }),
        makeArmor("helmet-2", "Helmet", { Health: 12 }),
      ],
      tagMap: { "helmet-1": ["slop"] },
    });

    expect(result.items.map((item) => item.id)).toEqual(["helmet-2"]);
    expect(result.missingSlots).toEqual(["Gauntlets", "Chest", "Legs", "Class Item"]);
  });
});
