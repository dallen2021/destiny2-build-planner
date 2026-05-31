import { describe, expect, it } from "vitest";

import {
  collectArmorItemHashes,
  collectInventoryDefinitionHashes,
  isArmorBucketHash,
  isWeaponBucketHash,
  normalizeDestinyInventory,
  type DestinyItemDefinition,
  type DestinyProfileResponse,
} from "./inventory";

describe("normalizeDestinyInventory", () => {
  it("normalizes equipped, character, and vault armor with definitions and stats", () => {
    const profile: DestinyProfileResponse = {
      characters: {
        data: {
          char1: {
            characterId: "char1",
            classType: 1,
            emblemBackgroundPath: "/img/theme/destiny/bgs/card.png",
            light: 2010,
          },
        },
      },
      characterEquipment: {
        data: {
          char1: {
            items: [
              {
                bucketHash: 3448274439,
                itemHash: 1001,
                itemInstanceId: "helmet-instance",
              },
            ],
          },
        },
      },
      characterInventories: {
        data: {
          char1: {
            items: [
              {
                bucketHash: 3551918588,
                itemHash: 1002,
                itemInstanceId: "gauntlet-instance",
              },
            ],
          },
        },
      },
      itemComponents: {
        instances: {
          data: {
            "chest-instance": { gearTier: 4, primaryStat: { value: 1990 } },
            "gauntlet-instance": { gearTier: 5, primaryStat: { value: 2000 } },
            "helmet-instance": { gearTier: 3, primaryStat: { value: 2010 } },
          },
        },
        sockets: {
          data: {
            "helmet-instance": {
              sockets: [{ isEnabled: true, isVisible: true, plugHash: 9001 }],
            },
          },
        },
        stats: {
          data: {
            "chest-instance": {
              stats: {
                4244567218: { value: 30 },
              },
            },
            "gauntlet-instance": {
              stats: {
                1943323491: { value: 18 },
              },
            },
            "helmet-instance": {
              stats: {
                2996146975: { value: 12 },
                392767087: { value: 20 },
              },
            },
          },
        },
      },
      profileInventory: {
        data: {
          items: [
            {
              bucketHash: 14239492,
              itemHash: 1003,
              itemInstanceId: "chest-instance",
            },
          ],
        },
      },
    };

    const definitions: Record<string, DestinyItemDefinition> = {
      1001: {
        classType: 1,
        displayProperties: { icon: "/helmet.png", name: "Test Helmet" },
        inventory: { bucketTypeHash: 3448274439, tierTypeName: "Legendary" },
        itemType: 2,
      },
      1002: {
        classType: 1,
        displayProperties: { icon: "/gauntlets.png", name: "Test Gauntlets" },
        inventory: { bucketTypeHash: 3551918588, tierTypeName: "Exotic" },
        itemType: 2,
      },
      1003: {
        classType: 3,
        displayProperties: { icon: "/chest.png", name: "Test Chest" },
        inventory: { bucketTypeHash: 14239492, tierTypeName: "Legendary" },
        itemType: 2,
      },
      9001: {
        displayProperties: { icon: "/perk.png", name: "Peak Perk" },
        plug: { plugCategoryIdentifier: "weapon_perks" },
      },
    };

    const normalized = normalizeDestinyInventory(profile, definitions);

    expect(normalized.characters).toEqual([
      {
        className: "Hunter",
        classType: 1,
        emblemBackgroundPath: "/img/theme/destiny/bgs/card.png",
        id: "char1",
        light: 2010,
      },
    ]);
    expect(normalized.items).toHaveLength(3);
    expect(normalized.armor).toHaveLength(3);
    expect(normalized.armor[0]).toMatchObject({
      gearTier: 3,
      id: "helmet-instance",
      isEquipped: true,
      itemHash: 1001,
      kind: "armor",
      location: "character",
      name: "Test Helmet",
      power: 2010,
      slot: "Helmet",
      statTotal: 32,
      stats: {
        Mobility: 12,
        Resilience: 20,
      },
      tier: "Legendary",
    });
    expect(normalized.armor[0].perks).toEqual([
      {
        category: "weapon_perks",
        icon: "/perk.png",
        index: 0,
        isEnabled: true,
        isVisible: true,
        name: "Peak Perk",
        plugHash: 9001,
      },
    ]);
    expect(normalized.armor[1]).toMatchObject({
      gearTier: 5,
      id: "gauntlet-instance",
      name: "Test Gauntlets",
      slot: "Gauntlets",
      tier: "Exotic",
    });
    expect(normalized.armor[2]).toMatchObject({
      characterId: null,
      id: "chest-instance",
      location: "vault",
      name: "Test Chest",
      slot: "Chest",
    });
  });

  it("normalizes weapons alongside armor", () => {
    const profile: DestinyProfileResponse = {
      characterEquipment: {
        data: {
          char1: {
            items: [
              {
                bucketHash: 1498876634,
                itemHash: 2001,
                itemInstanceId: "weapon-instance",
              },
            ],
          },
        },
      },
      itemComponents: {
        instances: {
          data: {
            "weapon-instance": { gearTier: 4, primaryStat: { value: 400 } },
          },
        },
      },
    };
    const definitions: Record<string, DestinyItemDefinition> = {
      2001: {
        displayProperties: { icon: "/weapon.png", name: "Test Cannon" },
        inventory: { bucketTypeHash: 1498876634, tierTypeName: "Legendary" },
        itemType: 3,
      },
    };

    const normalized = normalizeDestinyInventory(profile, definitions);

    expect(normalized.armor).toHaveLength(0);
    expect(normalized.weapons).toHaveLength(1);
    expect(normalized.weapons[0]).toMatchObject({
      gearTier: 4,
      kind: "weapon",
      name: "Test Cannon",
      power: 400,
      slot: "Kinetic",
      weaponTier: 4,
    });
  });
});

describe("gear bucket helpers", () => {
  it("identifies Destiny armor and weapon buckets", () => {
    expect(isArmorBucketHash(3448274439)).toBe(true);
    expect(isArmorBucketHash(1498876634)).toBe(false);
    expect(isWeaponBucketHash(1498876634)).toBe(true);
  });

  it("collects unique armor item hashes from profile buckets", () => {
    const profile: DestinyProfileResponse = {
      characterEquipment: {
        data: {
          char1: {
            items: [
              { bucketHash: 3448274439, itemHash: 1001 },
              { bucketHash: 3448274439, itemHash: 1001 },
            ],
          },
        },
      },
      characterInventories: {
        data: {
          char1: {
            items: [{ bucketHash: 3551918588, itemHash: 1002 }],
          },
        },
      },
      profileInventory: {
        data: {
          items: [
            { bucketHash: 14239492, itemHash: 1003 },
            { bucketHash: 1498876634, itemHash: 2001 },
          ],
        },
      },
    };

    expect(collectArmorItemHashes(profile)).toEqual([1001, 1002, 1003]);
  });

  it("collects gear and socket plug definition hashes", () => {
    const profile: DestinyProfileResponse = {
      characterEquipment: {
        data: {
          char1: {
            items: [{ bucketHash: 1498876634, itemHash: 2001 }],
          },
        },
      },
      itemComponents: {
        sockets: {
          data: {
            "weapon-instance": {
              sockets: [{ plugHash: 9001 }, { plugHash: 9002 }],
            },
          },
        },
      },
    };

    expect(collectInventoryDefinitionHashes(profile)).toEqual([2001, 9001, 9002]);
  });
});
