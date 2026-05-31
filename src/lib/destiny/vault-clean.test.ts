import { describe, expect, it } from "vitest";

import type { NormalizedDestinyItem } from "./inventory";
import { evaluateVaultItems } from "./vault-clean";

function makeItem(
  overrides: Partial<NormalizedDestinyItem>,
): NormalizedDestinyItem {
  return {
    bucketHash: 3448274439,
    characterId: null,
    className: "Hunter",
    classType: 1,
    gearTier: 2,
    icon: null,
    id: "item-1",
    isEquipped: false,
    itemHash: 1001,
    kind: "armor",
    location: "vault",
    name: "Test Item",
    perks: [],
    power: 320,
    setData: null,
    slot: "Helmet",
    sockets: [],
    statTotal: 55,
    stats: { Mobility: 10 },
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
