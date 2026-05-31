import { describe, expect, it } from "vitest";

import type { NormalizedDestinyItem } from "./inventory";
import { evaluateVaultItems } from "./vault-clean";

function makeItem(
  overrides: Partial<NormalizedDestinyItem>,
): NormalizedDestinyItem {
  return {
    bucket: { hash: 3448274439, name: "Helmet", scope: "character" },
    bucketHash: 3448274439,
    characterId: null,
    className: "Hunter",
    classType: 1,
    damageType: { color: null, hash: null, icon: null, name: null },
    description: null,
    gearTier: 2,
    icon: null,
    iconLayers: {
      background: null,
      featuredWatermark: null,
      ornamentWatermark: null,
      overlay: null,
      shelvedWatermark: null,
      watermark: null,
    },
    id: "item-1",
    isEquipped: false,
    itemHash: 1001,
    itemInstanceId: "item-1",
    kind: "armor",
    location: "vault",
    masterwork: null,
    name: "Test Item",
    ornament: null,
    perks: [],
    power: 320,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: 3448274439, name: "Helmet", order: 10 },
    slotName: "Helmet",
    sockets: [],
    statTotal: 55,
    stats: [
      { display: "bar", hash: 2996146975, name: "Weapons", sortOrder: 1, value: 10 },
    ],
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
    ...overrides,
  };
}

describe("evaluateVaultItems", () => {
  it("protects keep and peak tags", () => {
    const [recommendation] = evaluateVaultItems([makeItem({})], {
      "item-1": ["peak"],
    });

    expect(recommendation.action).toBe("save");
    expect(recommendation.reasons).toContain("Protected by a save tag.");
  });

  it("marks manually tagged slop as a delete candidate", () => {
    const [recommendation] = evaluateVaultItems([makeItem({})], {
      "item-1": ["slop"],
    });

    expect(recommendation.action).toBe("delete-candidate");
    expect(recommendation.reasons).toContain("Manually tagged as slop.");
  });

  it("keeps exotics and equipped gear", () => {
    const recommendations = evaluateVaultItems([
      makeItem({ id: "exotic", tier: "Exotic" }),
      makeItem({ id: "equipped", isEquipped: true }),
    ]);

    expect(recommendations.map((recommendation) => recommendation.action)).toEqual([
      "save",
      "save",
    ]);
  });

  it("flags lower-scoring duplicate low-tier armor conservatively", () => {
    const recommendations = evaluateVaultItems([
      makeItem({ gearTier: 5, id: "best", statTotal: 75 }),
      makeItem({ gearTier: 1, id: "dupe", statTotal: 54 }),
    ]);

    expect(recommendations.find((item) => item.itemId === "dupe")).toMatchObject({
      action: "delete-candidate",
      confidence: "low",
    });
  });
});
