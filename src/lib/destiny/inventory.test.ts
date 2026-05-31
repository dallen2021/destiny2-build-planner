import { describe, expect, it } from "vitest";

import {
  collectArmorItemHashes,
  isArmorBucketHash,
  normalizeArmorInventory,
} from "./inventory";

describe("normalizeArmorInventory", () => {
  it("normalizes equipped, character, and vault armor with definitions and stats", () => {
    const profile = {
      characters: {
        data: {
          char1: {
            characterId: "char1",
            classType: 1,
            light: 2010,
            emblemBackgroundPath: "/img/theme/destiny/bgs/card.png",
          },
        },
      },
      characterEquipment: {
        data: {
          char1: {
            items: [
              {
                itemHash: 1001,
                itemInstanceId: "helmet-instance",
                bucketHash: 3448274439,
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
                itemHash: 1002,
                itemInstanceId: "gauntlet-instance",
                bucketHash: 3551918588,
              },
            ],
          },
        },
      },
      profileInventory: {
        data: {
          items: [
            {
              itemHash: 1003,
              itemInstanceId: "chest-instance",
              bucketHash: 14239492,
            },
          ],
        },
      },
      itemComponents: {
        instances: {
          data: {
            "helmet-instance": { primaryStat: { value: 2010 } },
            "gauntlet-instance": { primaryStat: { value: 2000 } },
            "chest-instance": { primaryStat: { value: 1990 } },
          },
        },
        stats: {
          data: {
            "helmet-instance": {
              stats: {
                2996146975: { value: 12 },
                392767087: { value: 20 },
              },
            },
            "gauntlet-instance": {
              stats: {
                1943323491: { value: 18 },
              },
            },
            "chest-instance": {
              stats: {
                4244567218: { value: 30 },
              },
            },
          },
        },
      },
    };

    const definitions = {
      1001: {
        displayProperties: { name: "Test Helmet", icon: "/helmet.png" },
        itemType: 2,
        classType: 1,
        inventory: { bucketTypeHash: 3448274439, tierTypeName: "Legendary" },
      },
      1002: {
        displayProperties: { name: "Test Gauntlets", icon: "/gauntlets.png" },
        itemType: 2,
        classType: 1,
        inventory: { bucketTypeHash: 3551918588, tierTypeName: "Exotic" },
      },
      1003: {
        displayProperties: { name: "Test Chest", icon: "/chest.png" },
        itemType: 2,
        classType: 3,
        inventory: { bucketTypeHash: 14239492, tierTypeName: "Legendary" },
      },
    };

    const normalized = normalizeArmorInventory(profile, definitions);

    expect(normalized.characters).toEqual([
      {
        id: "char1",
        classType: 1,
        className: "Hunter",
        light: 2010,
        emblemBackgroundPath: "/img/theme/destiny/bgs/card.png",
      },
    ]);
    expect(normalized.armor).toHaveLength(3);
    expect(normalized.armor[0]).toMatchObject({
      id: "helmet-instance",
      itemHash: 1001,
      name: "Test Helmet",
      slot: "Helmet",
      location: "character",
      characterId: "char1",
      isEquipped: true,
      power: 2010,
      tier: "Legendary",
      stats: {
        Mobility: 12,
        Resilience: 20,
      },
    });
    expect(normalized.armor[1]).toMatchObject({
      id: "gauntlet-instance",
      name: "Test Gauntlets",
      slot: "Gauntlets",
      location: "character",
      isEquipped: false,
      tier: "Exotic",
    });
    expect(normalized.armor[2]).toMatchObject({
      id: "chest-instance",
      name: "Test Chest",
      slot: "Chest",
      location: "vault",
      characterId: null,
      isEquipped: false,
    });
  });
});

describe("armor bucket helpers", () => {
  it("identifies Destiny armor buckets", () => {
    expect(isArmorBucketHash(3448274439)).toBe(true);
    expect(isArmorBucketHash(1498876634)).toBe(false);
  });

  it("collects unique armor item hashes from profile buckets", () => {
    const profile = {
      characterEquipment: {
        data: {
          char1: {
            items: [
              { itemHash: 1001, bucketHash: 3448274439 },
              { itemHash: 1001, bucketHash: 3448274439 },
            ],
          },
        },
      },
      characterInventories: {
        data: {
          char1: {
            items: [{ itemHash: 1002, bucketHash: 3551918588 }],
          },
        },
      },
      profileInventory: {
        data: {
          items: [
            { itemHash: 1003, bucketHash: 14239492 },
            { itemHash: 2001, bucketHash: 1498876634 },
          ],
        },
      },
    };

    expect(collectArmorItemHashes(profile)).toEqual([1001, 1002, 1003]);
  });
});
