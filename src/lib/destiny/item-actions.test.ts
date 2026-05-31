import { describe, expect, it } from "vitest";

import {
  buildDestinyItemActionCommand,
  planItemDropTransaction,
  type ItemActionRequest,
} from "./item-actions";
import type { NormalizedDestinyItem } from "./inventory";

function makeRequest(
  overrides: Partial<ItemActionRequest>,
): ItemActionRequest {
  return {
    action: "transfer-to-vault",
    characterId: "char1",
    itemId: "item-instance",
    itemReferenceHash: 1001,
    membershipType: 3,
    ...overrides,
  } as ItemActionRequest;
}

function makeItem(
  overrides: Partial<NormalizedDestinyItem>,
): NormalizedDestinyItem {
  return {
    bucket: { hash: 1498876634, name: "Kinetic Weapons", scope: "character" },
    bucketHash: 1498876634,
    characterId: "char1",
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
    id: "item-instance",
    isEquipped: false,
    itemHash: 1001,
    itemInstanceId: "item-instance",
    kind: "weapon",
    location: "carried",
    masterwork: null,
    name: "Test Weapon",
    ornament: null,
    perks: [],
    power: 550,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: 1498876634, name: "Kinetic Weapons", order: 20 },
    slotName: "Kinetic Weapons",
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
    weaponTier: 4,
    ...overrides,
  };
}

describe("buildDestinyItemActionCommand", () => {
  it("maps transfer, equip, postmaster, and lock actions to Bungie requests", () => {
    expect(
      buildDestinyItemActionCommand(makeRequest({ action: "transfer-to-vault" })),
    ).toEqual({
      body: {
        characterId: "char1",
        itemId: "item-instance",
        itemReferenceHash: 1001,
        membershipType: 3,
        stackSize: 1,
        transferToVault: true,
      },
      path: "/Destiny2/Actions/Items/TransferItem/",
    });
    expect(
      buildDestinyItemActionCommand(
        makeRequest({ action: "transfer-to-character", characterId: "char2" }),
      ),
    ).toMatchObject({
      body: { characterId: "char2", transferToVault: false },
      path: "/Destiny2/Actions/Items/TransferItem/",
    });
    expect(
      buildDestinyItemActionCommand(makeRequest({ action: "equip" })),
    ).toEqual({
      body: {
        characterId: "char1",
        itemId: "item-instance",
        membershipType: 3,
      },
      path: "/Destiny2/Actions/Items/EquipItem/",
    });
    expect(
      buildDestinyItemActionCommand(
        makeRequest({ action: "pull-postmaster", stackSize: 2 }),
      ),
    ).toMatchObject({
      body: { stackSize: 2 },
      path: "/Destiny2/Actions/Items/PullFromPostmaster/",
    });
    expect(
      buildDestinyItemActionCommand(
        makeRequest({ action: "set-lock", locked: true }),
      ),
    ).toMatchObject({
      body: { state: true },
      path: "/Destiny2/Actions/Items/SetLockState/",
    });
  });

  it("maps equip-set to Bungie bulk equip", () => {
    expect(
      buildDestinyItemActionCommand({
        action: "equip-set",
        characterId: "char1",
        itemIds: ["a", "b"],
        membershipType: 3,
      }),
    ).toEqual({
      body: {
        characterId: "char1",
        itemIds: ["a", "b"],
        membershipType: 3,
      },
      path: "/Destiny2/Actions/Items/EquipItems/",
    });
  });
});

describe("planItemDropTransaction", () => {
  it("routes cross-character equip through the vault", () => {
    const transaction = planItemDropTransaction({
      item: makeItem({ characterId: "char1", location: "carried" }),
      membershipType: 3,
      target: { characterId: "char2", location: "equipped" },
    });

    expect(transaction.map((action) => action.action)).toEqual([
      "transfer-to-vault",
      "transfer-to-character",
      "equip",
    ]);
    expect(transaction[0]).toMatchObject({ characterId: "char1" });
    expect(transaction[1]).toMatchObject({ characterId: "char2" });
    expect(transaction[2]).toMatchObject({ characterId: "char2" });
  });

  it("pulls postmaster items before equipping or carrying", () => {
    expect(
      planItemDropTransaction({
        item: makeItem({ characterId: "char1", location: "postmaster" }),
        membershipType: 3,
        target: { characterId: "char1", location: "carried" },
      }).map((action) => action.action),
    ).toEqual(["pull-postmaster"]);
    expect(
      planItemDropTransaction({
        item: makeItem({ characterId: "char1", location: "postmaster" }),
        membershipType: 3,
        target: { characterId: "char1", location: "equipped" },
      }).map((action) => action.action),
    ).toEqual(["pull-postmaster", "equip"]);
  });
}
);
