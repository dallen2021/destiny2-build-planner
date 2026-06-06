import { describe, expect, it } from "vitest";

import {
  collectInventoryDefinitionHashes,
  getArmorStatDisplayName,
  getItemStatValue,
  isArmorBucketHash,
  isWeaponBucketHash,
  normalizeDestinyInventory,
  type DestinyDefinitionBundle,
  type DestinyProfileResponse,
} from "./inventory";

function makeDefinitions(): DestinyDefinitionBundle {
  return {
    buckets: {
      3448274439: {
        bucketOrder: 10,
        displayProperties: { name: "Helmet" },
        hash: 3448274439,
        scope: 0,
      },
      1498876634: {
        bucketOrder: 20,
        displayProperties: { name: "Kinetic Weapons" },
        hash: 1498876634,
        scope: 0,
      },
      215593132: {
        bucketOrder: 100,
        displayProperties: { name: "Postmaster" },
        hash: 215593132,
        scope: 0,
      },
      138197802: {
        bucketOrder: 200,
        displayProperties: { name: "Engrams" },
        hash: 138197802,
        scope: 0,
      },
    },
    damageTypes: {
      3373582085: {
        color: { blue: 255, green: 180, red: 60 },
        displayProperties: { icon: "/arc.png", name: "Arc" },
        hash: 3373582085,
      },
    },
    inventoryItems: {
      1001: {
        classType: 1,
        displayProperties: {
          description: "A helmet for testing.",
          icon: "/helmet.png",
          name: "Test Helmet",
        },
        iconWatermark: "/watermark.png",
        inventory: { bucketTypeHash: 3448274439, tierTypeName: "Legendary" },
        itemType: 2,
        itemTypeDisplayName: "Helmet",
      },
      2001: {
        displayProperties: {
          description: "A weapon for testing.",
          icon: "/weapon.png",
          name: "Test Cannon",
        },
        inventory: { bucketTypeHash: 1498876634, tierTypeName: "Legendary" },
        isAdept: true,
        itemType: 3,
        itemTypeDisplayName: "Hand Cannon",
      },
      3001: {
        displayProperties: { icon: "/engram.png", name: "Prime Engram" },
        inventory: { bucketTypeHash: 138197802, tierTypeName: "Legendary" },
        itemType: 8,
        itemTypeDisplayName: "Engram",
      },
      9001: {
        displayProperties: {
          description: "Precision final blows make this better.",
          icon: "/perk.png",
          name: "Peak Perk",
        },
        plug: { plugCategoryIdentifier: "weapon_perks" },
      },
      9002: {
        displayProperties: { icon: "/masterwork.png", name: "Range Masterwork" },
        plug: { plugCategoryIdentifier: "v400.plugs.weapons.masterworks" },
      },
      9003: {
        displayProperties: { icon: "/ornament.png", name: "Shiny Ornament" },
        plug: { plugCategoryIdentifier: "v400.plugs.armor_skins" },
      },
      9004: {
        displayProperties: {
          icon: "/ornamented-weapon.png",
          name: "Ornamented Weapon Style",
        },
      },
      9005: {
        displayProperties: {
          description: "A second selectable perk.",
          icon: "/alt-perk.png",
          name: "Backup Perk",
        },
        plug: { plugCategoryIdentifier: "weapon_perks" },
      },
    },
    stats: {
      1240592695: {
        displayProperties: { name: "Range" },
        hash: 1240592695,
        index: 3,
      },
      4043523819: {
        displayProperties: { name: "Impact" },
        hash: 4043523819,
        index: 1,
      },
    },
  };
}

describe("normalizeDestinyInventory", () => {
  it("uses current Armor 3.0 names for legacy armor stat hashes", () => {
    expect(getArmorStatDisplayName("2996146975", "Mobility")).toBe("Weapons");
    expect(getArmorStatDisplayName("392767087", "Resilience")).toBe("Health");
    expect(getArmorStatDisplayName("1943323491", "Recovery")).toBe("Class");
    expect(getArmorStatDisplayName("1735777505", "Discipline")).toBe("Grenade");
    expect(getArmorStatDisplayName("144602215", "Intellect")).toBe("Super");
    expect(getArmorStatDisplayName("4244567218", "Strength")).toBe("Melee");
  });

  it("normalizes equipped, carried, vault, postmaster, and engram items", () => {
    const profile: DestinyProfileResponse = {
      characters: {
        data: {
          char1: {
            characterId: "char1",
            classType: 1,
            emblemBackgroundPath: "/img/theme/destiny/bgs/card.png",
            light: 2010,
            stats: {
              2996146975: 77,
              392767087: 120,
            },
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
                state: 1,
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
                bucketHash: 1498876634,
                itemHash: 2001,
                itemInstanceId: "weapon-instance",
                overrideStyleItemHash: 9004,
                state: 44,
                transferStatus: 0,
              },
              {
                bucketHash: 215593132,
                itemHash: 3001,
                itemInstanceId: "postmaster-engram",
                quantity: 2,
              },
            ],
          },
        },
      },
      itemComponents: {
        instances: {
          data: {
            "helmet-instance": {
              canEquip: true,
              gearTier: 3,
              primaryStat: { value: 2010 },
            },
            "weapon-instance": {
              canEquip: true,
              damageTypeHash: 3373582085,
              gearTier: 4,
              primaryStat: { value: 550 },
            },
          },
        },
        reusablePlugs: {
          data: {
            "weapon-instance": {
              plugs: {
                0: [{ plugItemHash: 9001 }, { plugItemHash: 9005 }],
              },
            },
          },
        },
        sockets: {
          data: {
            "helmet-instance": {
              sockets: [
                { isEnabled: true, isVisible: true, plugHash: 9003 },
              ],
            },
            "weapon-instance": {
              sockets: [
                { isEnabled: true, isVisible: true, plugHash: 9001 },
                { isEnabled: true, isVisible: true, plugHash: 9002 },
              ],
            },
          },
        },
        stats: {
          data: {
            "helmet-instance": {
              stats: {
                2996146975: { value: 42 },
                392767087: { value: 68 },
              },
            },
            "weapon-instance": {
              stats: {
                1240592695: { value: 72 },
                4043523819: { value: 84 },
              },
            },
          },
        },
      },
      profileInventory: {
        data: {
          items: [
            {
              bucketHash: 1498876634,
              itemHash: 2001,
              itemInstanceId: "vault-weapon",
            },
          ],
        },
      },
    };

    const normalized = normalizeDestinyInventory(profile, makeDefinitions());

    expect(normalized.characters[0]).toMatchObject({
      className: "Hunter",
      stats: [
        { hash: 2996146975, name: "Weapons", value: 77 },
        { hash: 392767087, name: "Health", value: 120 },
      ],
    });
    expect(normalized.items.map((item) => item.location)).toEqual([
      "equipped",
      "carried",
      "postmaster",
      "vault",
    ]);
    expect(normalized.postmasterItems).toHaveLength(1);
    expect(normalized.postmasterSummary).toEqual({
      itemCount: 1,
      quantity: 2,
    });

    const helmet = normalized.items[0];
    expect(helmet).toMatchObject({
      className: "Hunter",
      description: "A helmet for testing.",
      icon: "/helmet.png",
      id: "helmet-instance",
      kind: "armor",
      location: "equipped",
      quantity: 1,
      rarity: "Legendary",
      slot: { hash: 3448274439, name: "Helmet", order: 10 },
      state: {
        canEquip: true,
        canTransfer: true,
        crafted: false,
        enhanced: false,
        locked: true,
        masterworked: false,
        tracked: false,
      },
    });
    expect(helmet.stats).toEqual([
      { base: 42, display: "bar", hash: 2996146975, name: "Weapons", sortOrder: 1, value: 42 },
      { base: 68, display: "bar", hash: 392767087, name: "Health", sortOrder: 2, value: 68 },
    ]);
    expect(helmet.ornament).toMatchObject({ name: "Shiny Ornament" });

    const weapon = normalized.items[1];
    expect(weapon).toMatchObject({
      damageType: {
        color: "rgb(60, 180, 255)",
        hash: 3373582085,
        icon: "/arc.png",
        name: "Arc",
      },
      icon: "/ornamented-weapon.png",
      kind: "weapon",
      location: "carried",
      state: {
        adept: true,
        crafted: true,
        enhanced: true,
        masterworked: true,
      },
      weaponTier: 4,
    });
    expect(weapon.stats.map((stat) => stat.name)).toEqual(["Impact", "Range"]);
    expect(weapon.perks).toEqual([
      expect.objectContaining({
        category: "weapon_perks",
        description: "Precision final blows make this better.",
        icon: "/perk.png",
        name: "Peak Perk",
      }),
    ]);
    expect(weapon.sockets[0]).toMatchObject({
      name: "Peak Perk",
      reusablePlugHashes: [9001, 9005],
      reusablePlugs: [
        { icon: "/perk.png", name: "Peak Perk", plugHash: 9001 },
        { icon: "/alt-perk.png", name: "Backup Perk", plugHash: 9005 },
      ],
    });
    expect(weapon.masterwork).toMatchObject({ name: "Range Masterwork" });
    expect(getItemStatValue(weapon, "Range")).toBe(72);

    const engram = normalized.items[2];
    expect(engram).toMatchObject({
      kind: "engram",
      location: "postmaster",
      name: "Prime Engram",
      quantity: 2,
    });
  });
});

describe("gear bucket helpers", () => {
  it("identifies Destiny armor and weapon buckets", () => {
    expect(isArmorBucketHash(3448274439)).toBe(true);
    expect(isArmorBucketHash(1498876634)).toBe(false);
    expect(isWeaponBucketHash(1498876634)).toBe(true);
  });

  it("collects unique gear, non-gear, and socket plug definition hashes", () => {
    const profile: DestinyProfileResponse = {
      characterEquipment: {
        data: {
          char1: {
            items: [{ bucketHash: 1498876634, itemHash: 2001 }],
          },
        },
      },
      characterInventories: {
        data: {
          char1: {
            items: [{ bucketHash: 215593132, itemHash: 3001 }],
          },
        },
      },
      itemComponents: {
        reusablePlugs: {
          data: {
            "weapon-instance": {
              plugs: {
                123: [{ plugItemHash: 9003 }],
              },
            },
          },
        },
        sockets: {
          data: {
            "weapon-instance": {
              sockets: [{ plugHash: 9001 }, { plugHash: 9002 }],
            },
          },
        },
      },
    };

    expect(collectInventoryDefinitionHashes(profile)).toEqual([
      2001,
      3001,
      9001,
      9002,
      9003,
    ]);
  });
});

describe("normalizeDestinyInventory set bonuses", () => {
  it("attaches 2/4-piece set-bonus state to equipped armor in a set", () => {
    const profile: DestinyProfileResponse = {
      characters: {
        data: { c1: { characterId: "c1", classType: 1, light: 100 } },
      },
      characterEquipment: {
        data: {
          c1: {
            items: [
              { itemHash: 7001, itemInstanceId: "i1" },
              { itemHash: 7002, itemInstanceId: "i2" },
            ],
          },
        },
      },
      itemComponents: {
        instances: {
          data: {
            i1: { primaryStat: { value: 100 } },
            i2: { primaryStat: { value: 100 } },
          },
        },
      },
    };
    const definitions: DestinyDefinitionBundle = {
      buckets: {
        3448274439: { displayProperties: { name: "Helmet" }, hash: 3448274439, scope: 0 },
        3551918588: { displayProperties: { name: "Gauntlets" }, hash: 3551918588, scope: 0 },
      },
      inventoryItems: {
        7001: {
          displayProperties: { name: "Warden Helm" },
          inventory: { bucketTypeHash: 3448274439, tierTypeName: "Legendary" },
          itemType: 2,
        },
        7002: {
          displayProperties: { name: "Warden Arms" },
          inventory: { bucketTypeHash: 3551918588, tierTypeName: "Legendary" },
          itemType: 2,
        },
      },
      equipableItemSets: {
        900: {
          displayProperties: { name: "Warden's Vigil" },
          hash: 900,
          setItems: [7001, 7002, 7003, 7004],
          // intentionally out of order to exercise the sort
          setPerks: [
            { requiredSetCount: 4, sandboxPerkHash: 5002 },
            { requiredSetCount: 2, sandboxPerkHash: 5001 },
          ],
        },
      },
      sandboxPerks: {
        5001: { displayProperties: { description: "Two-piece bonus.", name: "2pc" } },
        5002: { displayProperties: { description: "Four-piece bonus.", name: "4pc" } },
      },
    };

    const result = normalizeDestinyInventory(profile, definitions);
    const helm = result.items.find((item) => item.itemHash === 7001);

    expect(helm?.kind).toBe("armor");
    expect(helm?.inspector?.setBonus).toMatchObject({
      equippedCount: 2,
      name: "Warden's Vigil",
      requiredForFull: 4,
    });
    expect(helm?.inspector?.setBonus?.perks).toEqual([
      { active: true, description: "Two-piece bonus.", name: "2pc", requiredCount: 2 },
      { active: false, description: "Four-piece bonus.", name: "4pc", requiredCount: 4 },
    ]);
  });
});
