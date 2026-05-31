export type DestinyClassType = 0 | 1 | 2 | 3;

export type DestinyInventoryItem = {
  bucketHash?: number;
  itemHash: number;
  itemInstanceId?: string;
  state?: number;
};

export type DestinyItemDefinition = {
  classType?: DestinyClassType;
  displayProperties?: {
    description?: string;
    icon?: string;
    name?: string;
  };
  equippingBlock?: {
    equipmentSlotTypeHash?: number;
    uniqueLabel?: string;
  };
  inventory?: {
    bucketTypeHash?: number;
    tierType?: number;
    tierTypeHash?: number;
    tierTypeName?: string;
  };
  itemCategoryHashes?: number[];
  itemSubType?: number;
  itemType?: number;
  plug?: {
    plugCategoryHash?: number;
    plugCategoryIdentifier?: string;
  };
  setData?: {
    itemList?: { itemHash?: number }[];
    questLineName?: string;
    requireOrderedSetItemAdd?: boolean;
    setIsFeatured?: boolean;
  };
  sockets?: {
    intrinsicSockets?: { plugItemHash?: number }[];
    socketEntries?: {
      randomizedPlugSetHash?: number;
      reusablePlugItems?: { plugItemHash?: number }[];
      reusablePlugSetHash?: number;
      singleInitialItemHash?: number;
      socketTypeHash?: number;
    }[];
  };
};

type DestinyItemInstanceComponent = {
  damageType?: number;
  energy?: {
    energyCapacity?: number;
    energyType?: number;
    energyUnused?: number;
    energyUsed?: number;
  };
  gearTier?: number;
  itemLevel?: number;
  primaryStat?: { value?: number };
  quality?: number;
};

type DestinyItemSocketComponent = {
  sockets?: {
    enableFailIndexes?: number[];
    isEnabled?: boolean;
    isVisible?: boolean;
    plugHash?: number;
  }[];
};

export type DestinyProfileResponse = {
  characters?: {
    data?: Record<
      string,
      {
        characterId?: string;
        classType?: DestinyClassType;
        emblemBackgroundPath?: string;
        light?: number;
      }
    >;
  };
  characterEquipment?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  characterInventories?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  itemComponents?: {
    instances?: {
      data?: Record<string, DestinyItemInstanceComponent>;
    };
    sockets?: {
      data?: Record<string, DestinyItemSocketComponent>;
    };
    stats?: {
      data?: Record<
        string,
        {
          stats?: Record<string, { value?: number }>;
        }
      >;
    };
  };
  profileInventory?: {
    data?: {
      items?: DestinyInventoryItem[];
    };
  };
};

export type CharacterSummary = {
  className: string;
  classType: DestinyClassType | null;
  emblemBackgroundPath: string | null;
  id: string;
  light: number | null;
};

export type GearLocation = "character" | "vault";
export type NormalizedItemKind = "armor" | "weapon";

export type NormalizedSocket = {
  category: string | null;
  icon: string | null;
  index: number;
  isEnabled: boolean;
  isVisible: boolean;
  name: string;
  plugHash: number;
};

export type NormalizedSetData = {
  itemCount: number;
  itemHashes: number[];
  name: string | null;
};

export type NormalizedDestinyItem = {
  bucketHash: number | null;
  characterId: string | null;
  className: string;
  classType: DestinyClassType | null;
  gearTier: number | null;
  icon: string | null;
  id: string;
  isEquipped: boolean;
  itemHash: number;
  kind: NormalizedItemKind;
  location: GearLocation;
  name: string;
  perks: NormalizedSocket[];
  power: number | null;
  setData: NormalizedSetData | null;
  slot: string;
  sockets: NormalizedSocket[];
  statTotal: number;
  stats: Record<string, number>;
  tier: string | null;
  weaponTier: number | null;
};

export type NormalizedArmorItem = NormalizedDestinyItem & { kind: "armor" };
export type NormalizedWeaponItem = NormalizedDestinyItem & { kind: "weapon" };

export type NormalizedDestinyInventory = {
  armor: NormalizedArmorItem[];
  characters: CharacterSummary[];
  items: NormalizedDestinyItem[];
  weapons: NormalizedWeaponItem[];
};

export type DestinyInventoryApiPayload = NormalizedDestinyInventory & {
  definitionSource: "manifest" | "manifest+entity-fallback";
  fetchedAt: string;
  manifestDefinitionCount: number;
  manifestLanguage: string;
  manifestMissingDefinitionCount: number;
  manifestVersion: string;
  membershipDisplayName?: string;
  membershipId: string;
  membershipType: number;
};

export const ARMOR_SLOT_BY_BUCKET_HASH: Record<number, string> = {
  3448274439: "Helmet",
  3551918588: "Gauntlets",
  14239492: "Chest",
  20886954: "Legs",
  1585787867: "Class Item",
};

export const WEAPON_SLOT_BY_BUCKET_HASH: Record<number, string> = {
  1498876634: "Kinetic",
  2465295065: "Energy",
  953998645: "Power",
};

const DESTINY_ITEM_TYPE_ARMOR = 2;
const DESTINY_ITEM_TYPE_WEAPON = 3;

const STAT_NAME_BY_HASH: Record<string, string> = {
  "2996146975": "Mobility",
  "392767087": "Resilience",
  "1943323491": "Recovery",
  "1735777505": "Discipline",
  "144602215": "Intellect",
  "4244567218": "Strength",
};

const CLASS_NAME_BY_TYPE: Record<number, string> = {
  0: "Titan",
  1: "Hunter",
  2: "Warlock",
  3: "Any",
};

export function isArmorBucketHash(bucketHash: number | undefined): boolean {
  return bucketHash != null && bucketHash in ARMOR_SLOT_BY_BUCKET_HASH;
}

export function isWeaponBucketHash(bucketHash: number | undefined): boolean {
  return bucketHash != null && bucketHash in WEAPON_SLOT_BY_BUCKET_HASH;
}

export function isGearBucketHash(bucketHash: number | undefined): boolean {
  return isArmorBucketHash(bucketHash) || isWeaponBucketHash(bucketHash);
}

export function collectArmorItemHashes(
  profile: DestinyProfileResponse,
): number[] {
  const hashes = new Set<number>();
  const addItem = (item: DestinyInventoryItem) => {
    if (isArmorBucketHash(item.bucketHash)) {
      hashes.add(item.itemHash);
    }
  };

  for (const inventory of Object.values(profile.characterEquipment?.data ?? {})) {
    inventory.items?.forEach(addItem);
  }

  for (const inventory of Object.values(
    profile.characterInventories?.data ?? {},
  )) {
    inventory.items?.forEach(addItem);
  }

  profile.profileInventory?.data?.items?.forEach(addItem);

  return [...hashes];
}

export function collectInventoryDefinitionHashes(
  profile: DestinyProfileResponse,
): number[] {
  const hashes = new Set<number>();
  const addItem = (item: DestinyInventoryItem) => hashes.add(item.itemHash);

  for (const inventory of Object.values(profile.characterEquipment?.data ?? {})) {
    inventory.items?.forEach(addItem);
  }

  for (const inventory of Object.values(
    profile.characterInventories?.data ?? {},
  )) {
    inventory.items?.forEach(addItem);
  }

  profile.profileInventory?.data?.items?.forEach(addItem);

  for (const socketComponent of Object.values(
    profile.itemComponents?.sockets?.data ?? {},
  )) {
    for (const socket of socketComponent.sockets ?? []) {
      if (socket.plugHash != null) {
        hashes.add(socket.plugHash);
      }
    }
  }

  return [...hashes];
}

function getClassName(classType: DestinyClassType | null | undefined): string {
  return classType == null ? "Unknown" : (CLASS_NAME_BY_TYPE[classType] ?? "Unknown");
}

function getDefinition(
  definitions: Record<string, DestinyItemDefinition>,
  itemHash: number,
): DestinyItemDefinition | null {
  return definitions[String(itemHash)] ?? null;
}

function getBucketHash(
  item: DestinyInventoryItem,
  definition: DestinyItemDefinition,
): number | null {
  return item.bucketHash ?? definition.inventory?.bucketTypeHash ?? null;
}

function getItemKind(
  item: DestinyInventoryItem,
  definition: DestinyItemDefinition,
): NormalizedItemKind | null {
  const bucketHash = getBucketHash(item, definition) ?? undefined;

  if (isArmorBucketHash(bucketHash) || definition.itemType === DESTINY_ITEM_TYPE_ARMOR) {
    return "armor";
  }

  if (isWeaponBucketHash(bucketHash) || definition.itemType === DESTINY_ITEM_TYPE_WEAPON) {
    return "weapon";
  }

  return null;
}

function getSlot(
  item: DestinyInventoryItem,
  definition: DestinyItemDefinition,
  kind: NormalizedItemKind,
): string {
  const bucketHash = getBucketHash(item, definition);
  if (bucketHash != null) {
    const bucketName =
      kind === "armor"
        ? ARMOR_SLOT_BY_BUCKET_HASH[bucketHash]
        : WEAPON_SLOT_BY_BUCKET_HASH[bucketHash];

    if (bucketName) {
      return bucketName;
    }
  }

  return kind === "armor" ? "Armor" : "Weapon";
}

function normalizeStats(
  itemInstanceId: string | undefined,
  profile: DestinyProfileResponse,
): Record<string, number> {
  if (!itemInstanceId) {
    return {};
  }

  const rawStats = profile.itemComponents?.stats?.data?.[itemInstanceId]?.stats ?? {};

  return Object.fromEntries(
    Object.entries(rawStats)
      .map(([hash, stat]) => [STAT_NAME_BY_HASH[hash] ?? hash, stat.value ?? 0] as const)
      .filter(([, value]) => value > 0),
  );
}

function normalizeSockets({
  definitions,
  itemInstanceId,
  profile,
}: {
  definitions: Record<string, DestinyItemDefinition>;
  itemInstanceId: string | undefined;
  profile: DestinyProfileResponse;
}): NormalizedSocket[] {
  if (!itemInstanceId) {
    return [];
  }

  const sockets = profile.itemComponents?.sockets?.data?.[itemInstanceId]?.sockets ?? [];

  return sockets.flatMap((socket, index) => {
    if (socket.plugHash == null) {
      return [];
    }

    const plugDefinition = getDefinition(definitions, socket.plugHash);
    const plugName =
      plugDefinition?.displayProperties?.name?.trim() ||
      `Plug ${socket.plugHash}`;

    return {
      category: plugDefinition?.plug?.plugCategoryIdentifier ?? null,
      icon: plugDefinition?.displayProperties?.icon ?? null,
      index,
      isEnabled: socket.isEnabled ?? true,
      isVisible: socket.isVisible ?? true,
      name: plugName,
      plugHash: socket.plugHash,
    };
  });
}

function normalizePerks(sockets: NormalizedSocket[]): NormalizedSocket[] {
  return sockets
    .filter((socket) => {
      const category = socket.category?.toLowerCase() ?? "";
      return (
        socket.isVisible &&
        socket.isEnabled &&
        !category.includes("shader") &&
        !category.includes("ornament") &&
        !category.includes("masterwork")
      );
    })
    .slice(0, 8);
}

function normalizeSetData(
  definition: DestinyItemDefinition,
): NormalizedSetData | null {
  const itemHashes =
    definition.setData?.itemList
      ?.map((item) => item.itemHash)
      .filter((itemHash): itemHash is number => itemHash != null) ?? [];

  if (itemHashes.length === 0 && !definition.setData?.questLineName) {
    return null;
  }

  return {
    itemCount: itemHashes.length,
    itemHashes,
    name: definition.setData?.questLineName ?? null,
  };
}

function normalizeItem({
  characterId,
  definitions,
  isEquipped,
  item,
  location,
  profile,
}: {
  characterId: string | null;
  definitions: Record<string, DestinyItemDefinition>;
  isEquipped: boolean;
  item: DestinyInventoryItem;
  location: GearLocation;
  profile: DestinyProfileResponse;
}): NormalizedDestinyItem | null {
  const definition = getDefinition(definitions, item.itemHash);
  if (!definition) {
    return null;
  }

  const kind = getItemKind(item, definition);
  if (!kind) {
    return null;
  }

  const itemInstanceId = item.itemInstanceId;
  const instance = itemInstanceId
    ? profile.itemComponents?.instances?.data?.[itemInstanceId]
    : undefined;
  const stats = normalizeStats(itemInstanceId, profile);
  const statTotal = Object.values(stats).reduce((total, value) => total + value, 0);
  const sockets = normalizeSockets({ definitions, itemInstanceId, profile });
  const classType = definition.classType ?? null;
  const gearTier = instance?.gearTier ?? null;

  return {
    bucketHash: getBucketHash(item, definition),
    characterId,
    className: getClassName(classType),
    classType,
    gearTier,
    icon: definition.displayProperties?.icon ?? null,
    id: itemInstanceId ?? `${item.itemHash}:${characterId ?? "profile"}`,
    isEquipped,
    itemHash: item.itemHash,
    kind,
    location,
    name: definition.displayProperties?.name ?? `Unknown item ${item.itemHash}`,
    perks: normalizePerks(sockets),
    power: instance?.primaryStat?.value ?? null,
    setData: normalizeSetData(definition),
    slot: getSlot(item, definition, kind),
    sockets,
    statTotal,
    stats,
    tier: definition.inventory?.tierTypeName ?? null,
    weaponTier: kind === "weapon" ? gearTier : null,
  };
}

export function normalizeDestinyInventory(
  profile: DestinyProfileResponse,
  definitions: Record<string, DestinyItemDefinition>,
): NormalizedDestinyInventory {
  const characters = Object.values(profile.characters?.data ?? {}).map(
    (character): CharacterSummary => {
      const classType = character.classType ?? null;

      return {
        className: getClassName(classType),
        classType,
        emblemBackgroundPath: character.emblemBackgroundPath ?? null,
        id: character.characterId ?? "",
        light: character.light ?? null,
      };
    },
  );

  const items: NormalizedDestinyItem[] = [];

  for (const [characterId, equipment] of Object.entries(
    profile.characterEquipment?.data ?? {},
  )) {
    for (const item of equipment.items ?? []) {
      const normalized = normalizeItem({
        characterId,
        definitions,
        isEquipped: true,
        item,
        location: "character",
        profile,
      });
      if (normalized) {
        items.push(normalized);
      }
    }
  }

  for (const [characterId, inventory] of Object.entries(
    profile.characterInventories?.data ?? {},
  )) {
    for (const item of inventory.items ?? []) {
      const normalized = normalizeItem({
        characterId,
        definitions,
        isEquipped: false,
        item,
        location: "character",
        profile,
      });
      if (normalized) {
        items.push(normalized);
      }
    }
  }

  for (const item of profile.profileInventory?.data?.items ?? []) {
    const normalized = normalizeItem({
      characterId: null,
      definitions,
      isEquipped: false,
      item,
      location: "vault",
      profile,
    });
    if (normalized) {
      items.push(normalized);
    }
  }

  return {
    armor: items.filter(
      (item): item is NormalizedArmorItem => item.kind === "armor",
    ),
    characters,
    items,
    weapons: items.filter(
      (item): item is NormalizedWeaponItem => item.kind === "weapon",
    ),
  };
}

export const normalizeArmorInventory = normalizeDestinyInventory;
