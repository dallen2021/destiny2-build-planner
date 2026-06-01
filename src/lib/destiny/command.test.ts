import { describe, expect, it } from "vitest";

import {
  getArmorTierSummary,
  getCommandEquippedItems,
  getCommandGearSlots,
  getCommandSetSummaries,
  getVaultPressure,
  selectCommandInspectItem,
} from "./command";
import type { NormalizedDestinyItem } from "./inventory";

function makeItem(
  overrides: Partial<NormalizedDestinyItem> & Pick<NormalizedDestinyItem, "id">,
): NormalizedDestinyItem {
  return {
    bucket: { hash: 1, name: "Bucket", scope: "character" },
    bucketHash: 1,
    characterId: "char1",
    className: "Hunter",
    classType: 1,
    damageType: { color: null, hash: null, icon: null, name: null },
    description: null,
    gearTier: null,
    icon: null,
    iconLayers: {
      background: null,
      featuredWatermark: null,
      ornamentWatermark: null,
      overlay: null,
      shelvedWatermark: null,
      watermark: null,
    },
    id: overrides.id,
    isEquipped: true,
    itemHash: 1,
    itemInstanceId: overrides.id,
    kind: "armor",
    location: "equipped",
    masterwork: null,
    name: overrides.id,
    ornament: null,
    perks: [],
    power: 1810,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: 1, name: "Helmet", order: 10 },
    slotName: "Helmet",
    sockets: [],
    statTotal: 0,
    stats: [],
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

describe("command selectors", () => {
  it("returns equipped gear for the selected character sorted by slot order", () => {
    const equipped = getCommandEquippedItems(
      [
        makeItem({
          id: "class-banner",
          kind: "unknown",
          slot: { hash: 3, name: "Clan Banners", order: 1 },
          slotName: "Clan Banners",
        }),
        makeItem({
          id: "energy",
          kind: "weapon",
          slot: { hash: 2, name: "Energy Weapons", order: 20 },
          slotName: "Energy Weapons",
        }),
        makeItem({ id: "helmet" }),
        makeItem({ id: "other-character", characterId: "char2" }),
        makeItem({ id: "vault-item", location: "vault" }),
      ],
      "char1",
    );

    expect(equipped.map((item) => item.id)).toEqual([
      "class-banner",
      "helmet",
      "energy",
    ]);
    expect(getCommandEquippedItems([makeItem({ id: "helmet" })], null)).toEqual(
      [],
    );
  });

  it("selects only weapons or armor for the default Command inspector", () => {
    const banner = makeItem({
      id: "banner",
      kind: "unknown",
      slot: { hash: 8, name: "Clan Banners", order: 1 },
      slotName: "Clan Banners",
    });
    const helmet = makeItem({ id: "helmet", kind: "armor" });
    const weapon = makeItem({
      id: "weapon",
      kind: "weapon",
      slot: { hash: 2, name: "Kinetic Weapons", order: 2 },
      slotName: "Kinetic Weapons",
    });

    expect(selectCommandInspectItem([banner, helmet], null)?.id).toBe("helmet");
    expect(selectCommandInspectItem([weapon, helmet], helmet)?.id).toBe(
      "helmet",
    );
    expect(
      selectCommandInspectItem(
        [weapon, makeItem({ id: "helmet", name: "fresh helmet" })],
        helmet,
      )?.name,
    ).toBe("fresh helmet");
    expect(selectCommandInspectItem([weapon, helmet], banner)?.id).toBe(
      "weapon",
    );
    expect(selectCommandInspectItem([banner], null)).toBeNull();
  });

  it("groups equipped command slots by weapon, armor, ghost, and other", () => {
    const slots = getCommandGearSlots([
      makeItem({
        id: "kinetic",
        kind: "weapon",
        slot: { hash: 1, name: "Kinetic Weapons", order: 10 },
        slotName: "Kinetic Weapons",
      }),
      makeItem({
        id: "ghost",
        kind: "ghost",
        slot: { hash: 2, name: "Ghost", order: 40 },
        slotName: "Ghost",
      }),
      makeItem({ id: "helmet", kind: "armor" }),
      makeItem({
        id: "banner",
        kind: "unknown",
        slot: { hash: 4, name: "Clan Banners", order: 90 },
        slotName: "Clan Banners",
      }),
    ]);

    expect(slots.weapons.map((item) => item.id)).toEqual(["kinetic"]);
    expect(slots.armor.map((item) => item.id)).toEqual(["helmet"]);
    expect(slots.ghost?.id).toBe("ghost");
    expect(slots.other.map((item) => item.id)).toEqual(["banner"]);
  });

  it("summarizes armor tiers and vault pressure conservatively", () => {
    const summary = getArmorTierSummary([
      makeItem({ id: "helmet", gearTier: 5 }),
      makeItem({ id: "arms", gearTier: 4 }),
      makeItem({ id: "chest", gearTier: 2 }),
      makeItem({ id: "class", gearTier: null }),
      makeItem({ id: "weapon", gearTier: 5, kind: "weapon" }),
    ]);

    expect(summary.averageTier).toBe(3.7);
    expect(summary.readyPieces).toBe(2);
    expect(summary.totalPieces).toBe(4);
    expect(summary.byTier).toMatchObject({ 2: 1, 4: 1, 5: 1 });

    expect(getVaultPressure({ itemCount: 640, capacity: 700 })).toBe(91);
    expect(getVaultPressure({ itemCount: 900, capacity: 700 })).toBe(100);
    expect(getVaultPressure({ itemCount: -1, capacity: 700 })).toBe(0);
    expect(getVaultPressure({ itemCount: 0, capacity: 0 })).toBeNull();
  });

  it("summarizes set data only when manifest-backed set names exist", () => {
    const summaries = getCommandSetSummaries([
      makeItem({
        id: "set-helmet",
        setData: { itemCount: 2, itemHashes: [1, 2], name: "Rapid Charge" },
      }),
      makeItem({
        id: "set-arms",
        setData: { itemCount: 2, itemHashes: [1, 2], name: "Rapid Charge" },
      }),
      makeItem({
        id: "arc-helmet",
        setData: { itemCount: 4, itemHashes: [3, 4, 5, 6], name: "Arc Core" },
      }),
      makeItem({
        id: "unknown-set",
        setData: { itemCount: 2, itemHashes: [7, 8], name: null },
      }),
    ]);

    expect(summaries).toEqual([
      { activePieces: 1, name: "Arc Core", requiredPieces: 4 },
      { activePieces: 2, name: "Rapid Charge", requiredPieces: 2 },
    ]);
  });
});
