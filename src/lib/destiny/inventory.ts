type DestinyClassType = 0 | 1 | 2 | 3;

type DestinyInventoryItem = {
  itemHash: number;
  itemInstanceId?: string;
  bucketHash?: number;
};

export type DestinyItemDefinition = {
  displayProperties?: {
    name?: string;
    icon?: string;
  };
  itemType?: number;
  classType?: DestinyClassType;
  inventory?: {
    bucketTypeHash?: number;
    tierTypeName?: string;
  };
};

export type DestinyProfileResponse = {
  characters?: {
    data?: Record<
      string,
      {
        characterId?: string;
        classType?: DestinyClassType;
        light?: number;
        emblemBackgroundPath?: string;
      }
    >;
  };
  characterEquipment?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  characterInventories?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  profileInventory?: {
    data?: {
      items?: DestinyInventoryItem[];
    };
  };
  itemComponents?: {
    instances?: {
      data?: Record<string, { primaryStat?: { value?: number } }>;
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
};

export type CharacterSummary = {
  id: string;
  classType: DestinyClassType | null;
  className: string;
  light: number | null;
  emblemBackgroundPath: string | null;
};

export type ArmorLocation = "character" | "vault";

export type NormalizedArmorItem = {
  id: string;
  itemHash: number;
  name: string;
  icon: string | null;
  slot: string;
  location: ArmorLocation;
  characterId: string | null;
  isEquipped: boolean;
  power: number | null;
  tier: string | null;
  classType: DestinyClassType | null;
  className: string;
  stats: Record<string, number>;
};

export type NormalizedArmorInventory = {
  characters: CharacterSummary[];
  armor: NormalizedArmorItem[];
};

export const ARMOR_SLOT_BY_BUCKET_HASH: Record<number, string> = {
  3448274439: "Helmet",
  3551918588: "Gauntlets",
  14239492: "Chest",
  20886954: "Legs",
  1585787867: "Class Item",
};

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

function getClassName(classType: DestinyClassType | null | undefined): string {
  return classType == null ? "Unknown" : (CLASS_NAME_BY_TYPE[classType] ?? "Unknown");
}

function getDefinition(
  definitions: Record<string, DestinyItemDefinition>,
  itemHash: number,
): DestinyItemDefinition | null {
  return definitions[String(itemHash)] ?? null;
}

function getArmorSlot(
  item: DestinyInventoryItem,
  definition: DestinyItemDefinition,
): string | null {
  const bucketHash = item.bucketHash ?? definition.inventory?.bucketTypeHash;
  if (bucketHash == null) {
    return null;
  }

  return ARMOR_SLOT_BY_BUCKET_HASH[bucketHash] ?? null;
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
  location: ArmorLocation;
  profile: DestinyProfileResponse;
}): NormalizedArmorItem | null {
  const definition = getDefinition(definitions, item.itemHash);
  if (!definition) {
    return null;
  }

  const slot = getArmorSlot(item, definition);
  if (!slot) {
    return null;
  }

  const itemInstanceId = item.itemInstanceId;
  const instance = itemInstanceId
    ? profile.itemComponents?.instances?.data?.[itemInstanceId]
    : undefined;
  const classType = definition.classType ?? null;

  return {
    id: itemInstanceId ?? String(item.itemHash),
    itemHash: item.itemHash,
    name: definition.displayProperties?.name ?? `Unknown item ${item.itemHash}`,
    icon: definition.displayProperties?.icon ?? null,
    slot,
    location,
    characterId,
    isEquipped,
    power: instance?.primaryStat?.value ?? null,
    tier: definition.inventory?.tierTypeName ?? null,
    classType,
    className: getClassName(classType),
    stats: normalizeStats(itemInstanceId, profile),
  };
}

export function normalizeArmorInventory(
  profile: DestinyProfileResponse,
  definitions: Record<string, DestinyItemDefinition>,
): NormalizedArmorInventory {
  const characters = Object.values(profile.characters?.data ?? {}).map(
    (character): CharacterSummary => {
      const classType = character.classType ?? null;

      return {
        id: character.characterId ?? "",
        classType,
        className: getClassName(classType),
        light: character.light ?? null,
        emblemBackgroundPath: character.emblemBackgroundPath ?? null,
      };
    },
  );

  const armor: NormalizedArmorItem[] = [];

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
        armor.push(normalized);
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
        armor.push(normalized);
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
      armor.push(normalized);
    }
  }

  return { characters, armor };
}
