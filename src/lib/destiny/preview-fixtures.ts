/**
 * Dev-only fixtures for visually iterating on the Command console without a live
 * Bungie session. NOT imported by any production code path — only the
 * `/preview/*` routes use this. Icons are intentionally left null so the premium
 * CSS fallbacks render (no external image dependency); real icons flow in
 * automatically once the component receives live `/api/destiny/inventory` data.
 */
import type {
  CharacterSummary,
  DestinyClassType,
  DestinyInventoryApiPayload,
  NormalizedArmorItem,
  NormalizedDestinyItem,
  NormalizedPerk,
  NormalizedSocket,
  NormalizedStat,
  NormalizedWeaponItem,
} from "./inventory";

const ARMOR_STAT_HASH: Record<string, number> = {
  Weapons: 2996146975,
  Health: 392767087,
  Class: 1943323491,
  Grenade: 1735777505,
  Super: 144602215,
  Melee: 4244567218,
};

const ARMOR_STAT_ORDER = ["Weapons", "Health", "Class", "Melee", "Grenade", "Super"] as const;

function armorStats(values: Record<(typeof ARMOR_STAT_ORDER)[number], number>): NormalizedStat[] {
  return ARMOR_STAT_ORDER.map((name, index) => ({
    display: "bar",
    hash: ARMOR_STAT_HASH[name],
    name,
    sortOrder: index,
    value: values[name],
  }));
}

function weaponStats(
  entries: Array<[string, number, "bar" | "number"]>,
): NormalizedStat[] {
  return entries.map(([name, value, display], index) => ({
    display,
    hash: 1000 + index,
    name,
    sortOrder: index,
    value,
  }));
}

let plugSeq = 9000;
function plug(
  name: string,
  description: string | null,
  options: { category?: string; enabled?: boolean } = {},
): NormalizedPerk {
  plugSeq += 1;
  return {
    category: options.category ?? null,
    description,
    icon: null,
    index: plugSeq,
    isEnabled: options.enabled ?? true,
    isVisible: true,
    name,
    plugHash: plugSeq,
  };
}

function socket(
  index: number,
  selected: NormalizedPerk,
  alternates: NormalizedPerk[] = [],
): NormalizedSocket {
  return {
    ...selected,
    index,
    reusablePlugHashes: alternates.map((p) => p.plugHash),
    reusablePlugs: alternates,
  };
}

const EMPTY_ICON_LAYERS = {
  background: null,
  featuredWatermark: null,
  ornamentWatermark: null,
  overlay: null,
  shelvedWatermark: null,
  watermark: null,
};

const BASE_STATE = {
  adept: false,
  canEquip: true,
  canTransfer: true,
  crafted: false,
  enhanced: false,
  locked: false,
  masterworked: false,
  tracked: false,
};

type ItemSeed = Partial<NormalizedDestinyItem> &
  Pick<NormalizedDestinyItem, "name" | "kind" | "itemHash">;

let idSeq = 6_900_000_000;
function makeItem(seed: ItemSeed): NormalizedDestinyItem {
  idSeq += 7;
  const instanceId = String(idSeq);
  return {
    bucket: { hash: null, name: seed.slotName ?? "Unknown", scope: "character" },
    bucketHash: null,
    characterId: HUNTER_ID,
    className: "Hunter",
    classType: 1,
    damageType: { color: null, hash: null, icon: null, name: null },
    description: null,
    gearTier: null,
    icon: null,
    iconLayers: { ...EMPTY_ICON_LAYERS },
    id: instanceId,
    isEquipped: true,
    itemInstanceId: instanceId,
    location: "equipped",
    masterwork: null,
    ornament: null,
    perks: [],
    power: 251,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: null, name: seed.slotName ?? "Unknown", order: 0 },
    slotName: seed.slotName ?? "Unknown",
    sockets: [],
    statTotal: 0,
    stats: [],
    state: { ...BASE_STATE },
    tier: seed.rarity ?? "Legendary",
    weaponTier: null,
    ...seed,
  };
}

const HUNTER_ID = "2305843009300000001";
const TITAN_ID = "2305843009300000002";
const WARLOCK_ID = "2305843009300000003";

const VOID = { color: "#B283E0", hash: 3454344768, icon: null, name: "Void" };
const ARC = { color: "#7AE7FF", hash: 2303181850, icon: null, name: "Arc" };
const SOLAR = { color: "#F0631E", hash: 1847026933, icon: null, name: "Solar" };

// ── Selected Hunter equipped loadout ──────────────────────────────────────────

const novaJudicator = makeItem({
  name: "Nova Judicator",
  kind: "weapon",
  itemHash: 100000001,
  slotName: "Kinetic",
  rarity: "Legendary",
  weaponTier: 5,
  damageType: VOID,
  inspector: { ammoType: "Primary" },
  description: "Precision Frame. Recoil pattern on this weapon is more predictably vertical.",
  power: 251,
  state: { ...BASE_STATE, masterworked: true },
  stats: weaponStats([
    ["Impact", 84, "bar"],
    ["Range", 71, "bar"],
    ["Stability", 58, "bar"],
    ["Handling", 67, "bar"],
    ["Reload Speed", 53, "bar"],
    ["Aim Assistance", 78, "bar"],
    ["Airborne Effectiveness", 20, "bar"],
    ["Rounds Per Minute", 140, "number"],
    ["Magazine", 10, "number"],
  ]),
  sockets: [
    socket(0, plug("Precision Frame", "Recoil pattern is more predictably vertical.", { category: "intrinsics" })),
    socket(1, plug("Corkscrew Rifling", "Balanced barrel. Slightly increases range and stability.", { category: "barrels" }), [
      plug("Hammer-Forged Rifling", "Increases range.", { category: "barrels" }),
      plug("Smallbore", "Increases range and stability.", { category: "barrels" }),
    ]),
    socket(2, plug("Accurized Rounds", "Increases effective range.", { category: "magazines" }), [
      plug("Tactical Mag", "Improves stability, reload, and magazine.", { category: "magazines" }),
    ]),
    socket(3, plug("Keep Away", "Increased range and reload speed when no enemies are nearby.", { category: "frames" }), [
      plug("Perpetual Motion", "Movement grants stability, handling, and reload.", { category: "frames" }),
      plug("Rapid Hit", "Precision hits temporarily increase stability and reload.", { category: "frames" }),
    ]),
    socket(4, plug("Explosive Payload", "Rounds deal bonus area damage on impact.", { category: "frames" }), [
      plug("Frenzy", "Being in combat boosts damage, handling, and reload.", { category: "frames" }),
      plug("Kill Clip", "Reloading after a kill grants increased damage.", { category: "frames" }),
    ]),
    socket(5, plug("Veist Stinger", "Damage has a chance to reload from reserves.", { category: "origins" })),
    // these should NOT become perk columns — they route to mods / cosmetics / hidden:
    socket(6, plug("Backup Mag", "Increases magazine size.", { category: "v400.weapon.mod_magazine" })),
    socket(7, plug("Default Shader", "Restores your gear to its default colors.", { category: "shader" }), [
      plug("Cryptochroic Vandal", "A shader.", { category: "shader" }),
      plug("Monochromatic", "A shader.", { category: "shader" }),
    ]),
    socket(8, plug("Kill Tracker", "Tracks kills with this weapon.", { category: "v400.plugs.weapons.trackers" })),
  ],
});

const energyWeapon = makeItem({
  name: "Eriana's Vow",
  kind: "weapon",
  itemHash: 100000002,
  slotName: "Energy",
  rarity: "Exotic",
  weaponTier: 5,
  damageType: SOLAR,
  inspector: { ammoType: "Special" },
  description: "Exotic Hand Cannon. Fires special ammo and unleashes a powerful blast when fully charged.",
  power: 251,
  state: { ...BASE_STATE, masterworked: true },
  stats: weaponStats([
    ["Impact", 90, "bar"],
    ["Range", 78, "bar"],
    ["Stability", 46, "bar"],
    ["Handling", 40, "bar"],
    ["Reload Speed", 35, "bar"],
    ["Aim Assistance", 62, "bar"],
    ["Rounds Per Minute", 90, "number"],
    ["Magazine", 6, "number"],
  ]),
  sockets: [
    socket(0, plug("Looks Can Kill", "Fires a special heavy-hitting round. Penetrates shields and disrupts Barrier Champions.", { category: "Intrinsic" })),
    socket(1, plug("Fluted Barrel", "Lightweight barrel. Increases handling and stability.", { category: "Barrel" }), [
      plug("Extended Barrel", "Increases range; decreases handling.", { category: "Barrel" }),
    ]),
    socket(2, plug("Armor-Piercing Rounds", "Rounds overpenetrate targets and partially ricochet off hard surfaces.", { category: "Magazine" })),
    socket(3, plug("Tactical Reload", "Reloading from cover restores ammo and grants handling.", { category: "Trait" }), [
      plug("Fourth Time's the Charm", "Rapid precision hits return rounds to the magazine.", { category: "Trait" }),
    ]),
    socket(4, plug("Adept Charge Time", "Reduces charge time for the next shot.", { category: "Masterwork" })),
  ],
});

const powerWeapon = makeItem({
  name: "Hammerhead",
  kind: "weapon",
  itemHash: 100000003,
  slotName: "Power",
  rarity: "Legendary",
  weaponTier: 4,
  damageType: ARC,
  inspector: { ammoType: "Heavy" },
  description: "Adaptive Frame. A reliable and sturdy machine gun.",
  power: 251,
  stats: weaponStats([
    ["Impact", 25, "bar"],
    ["Range", 55, "bar"],
    ["Stability", 61, "bar"],
    ["Handling", 48, "bar"],
    ["Reload Speed", 52, "bar"],
    ["Rounds Per Minute", 450, "number"],
    ["Magazine", 57, "number"],
  ]),
  sockets: [
    socket(0, plug("Adaptive Frame", "Reliable, sturdy, and consistent.", { category: "Intrinsic" })),
    socket(1, plug("Hammer-Forged Rifling", "Increases range.", { category: "Barrel" }), [
      plug("Arrowhead Brake", "Greatly controls recoil; increases handling.", { category: "Barrel" }),
    ]),
    socket(2, plug("Rampage", "Kills temporarily grant a stacking damage bonus.", { category: "Trait" }), [
      plug("Killing Tally", "Sustained kills boost damage; resets on reload or stowing.", { category: "Trait" }),
    ]),
  ],
});

const ghost = makeItem({
  name: "Tower Ghost",
  kind: "ghost",
  itemHash: 100000004,
  slotName: "Ghost",
  rarity: "Legendary",
  power: null,
  damageType: { color: null, hash: null, icon: null, name: null },
});

const voidforgedSet = { itemCount: 4, itemHashes: [200000001, 200000002, 200000003, 200000004], name: "Voidforged Battlegear" };

function makeArmor(
  name: string,
  itemHash: number,
  slotName: string,
  stats: NormalizedStat[],
  opts: { rarity?: string; gearTier?: number; locked?: boolean } = {},
): NormalizedArmorItem {
  const statTotal = stats.reduce((sum, stat) => sum + stat.value, 0);
  return makeItem({
    name,
    kind: "armor",
    itemHash,
    slotName,
    rarity: opts.rarity ?? "Legendary",
    gearTier: opts.gearTier ?? 5,
    damageType: { color: null, hash: null, icon: null, name: null },
    stats,
    statTotal,
    setData: voidforgedSet,
    state: { ...BASE_STATE, locked: opts.locked ?? false },
    sockets: [
      socket(0, plug("Tactical Frame", "Balanced stats. Well-rounded for all combat roles.", { category: "Intrinsic" })),
      socket(1, plug("Minor Resilience Mod", "Increases Health.", { category: "Mod" }), [
        plug("Minor Recovery Mod", "Increases Class ability regeneration.", { category: "Mod" }),
      ]),
      socket(2, plug("Void Siphon", "Rapid Void weapon final blows create Orbs of Power.", { category: "Mod" })),
    ],
  }) as NormalizedArmorItem;
}

const helmet = makeArmor("Tactical Cowl", 200000001, "Helmet",
  armorStats({ Weapons: 16, Health: 10, Class: 12, Melee: 18, Grenade: 12, Super: 8 }),
  { gearTier: 5, locked: true });
helmet.inspector = {
  energy: { capacity: 10, used: 8 },
  archetype: {
    name: "Tactical",
    description: "Balanced stats. Well-rounded for all combat roles.",
    primaryStat: "Weapons",
    secondaryStat: "Health",
  },
  setBonus: {
    name: "Voidforged Battlegear",
    equippedCount: 4,
    requiredForFull: 4,
    perks: [
      {
        name: "2-Piece",
        requiredCount: 2,
        active: true,
        description:
          "Your Void abilities weaken targets, and your weapons gain increased stability and aim assist.",
      },
      {
        name: "4-Piece",
        requiredCount: 4,
        active: true,
        description:
          "Defeating a weakened target with a Void damage ability grants overshields and ability energy.",
      },
    ],
  },
  source: "Dungeon Chest · Duality",
  acquired: "05/12/2025",
  reason: "High Resilience Roll · Added to Builds",
  instanceNumber: 3,
};
const arms = makeArmor("Gloves of the Hunt", 200000002, "Gauntlets",
  armorStats({ Weapons: 14, Health: 6, Class: 18, Melee: 10, Grenade: 16, Super: 6 }));
const chest = makeArmor("Veiled Plate", 200000003, "Chest",
  armorStats({ Weapons: 10, Health: 22, Class: 8, Melee: 12, Grenade: 6, Super: 14 }), { gearTier: 4 });
const legs = makeArmor("Nightstalker Strides", 200000004, "Legs",
  armorStats({ Weapons: 18, Health: 8, Class: 16, Melee: 6, Grenade: 10, Super: 12 }));
const classItem = makeArmor("Gambler's Cloak", 200000005, "Class Item",
  armorStats({ Weapons: 4, Health: 2, Class: 2, Melee: 2, Grenade: 2, Super: 2 }), { rarity: "Legendary" });

const hunterEquipped: NormalizedDestinyItem[] = [
  novaJudicator, energyWeapon, powerWeapon, ghost,
  helmet, arms, chest, legs, classItem,
];

// ── A few carried / vault items so arrays + counts feel real ──────────────────

const extraItems: NormalizedDestinyItem[] = Array.from({ length: 6 }).map((_, i) =>
  makeItem({
    name: `Vault Weapon ${i + 1}`,
    kind: "weapon",
    itemHash: 300000000 + i,
    slotName: i % 2 === 0 ? "Kinetic" : "Energy",
    rarity: i % 3 === 0 ? "Exotic" : "Legendary",
    weaponTier: 3 + (i % 3),
    isEquipped: false,
    location: "vault",
    characterId: null,
    damageType: [VOID, ARC, SOLAR][i % 3],
  }),
);

function character(
  id: string,
  className: string,
  classType: DestinyClassType,
  light: number,
  stats: Record<(typeof ARMOR_STAT_ORDER)[number], number>,
): CharacterSummary {
  return {
    className,
    classType,
    emblemBackgroundPath: null,
    id,
    light,
    stats: armorStats(stats),
  };
}

const characters: CharacterSummary[] = [
  character(HUNTER_ID, "Hunter", 1, 251, { Weapons: 62, Health: 78, Class: 55, Melee: 51, Grenade: 44, Super: 62 }),
  character(TITAN_ID, "Titan", 0, 249, { Weapons: 40, Health: 90, Class: 48, Melee: 70, Grenade: 30, Super: 55 }),
  character(WARLOCK_ID, "Warlock", 2, 250, { Weapons: 55, Health: 60, Class: 80, Melee: 35, Grenade: 75, Super: 48 }),
];

const allItems = [...hunterEquipped, ...extraItems];

export const PREVIEW_COMMAND_PAYLOAD: DestinyInventoryApiPayload = {
  armor: allItems.filter((item): item is NormalizedArmorItem => item.kind === "armor"),
  weapons: allItems.filter((item): item is NormalizedWeaponItem => item.kind === "weapon"),
  characters,
  currencies: [
    { icon: null, itemHash: 3159615086, name: "Glimmer", quantity: 142350 },
    { icon: null, itemHash: 2817410917, name: "Bright Dust", quantity: 4820 },
  ],
  items: allItems,
  postmasterItems: [],
  postmasterSummary: { itemCount: 0, quantity: 0 },
  vaultSummary: { itemCount: extraItems.length },
  definitionSource: "manifest",
  fetchedAt: "2026-06-05T19:00:00.000Z",
  manifestDefinitionCount: 0,
  manifestLanguage: "en",
  manifestMissingDefinitionCount: 0,
  manifestVersion: "preview",
  membershipDisplayName: "Guardian#3137",
  membershipId: "preview",
  membershipType: 3,
  requiresMoveEquipReauth: false,
};
