export type DestinyClassType = 0 | 1 | 2 | 3;

export type DestinyInventoryItem = {
  bucketHash?: number;
  itemHash: number;
  itemInstanceId?: string;
  location?: number;
  lockable?: boolean;
  overrideStyleItemHash?: number;
  quantity?: number;
  state?: number;
  transferStatus?: number;
};

export type DestinyDisplayProperties = {
  description?: string;
  icon?: string;
  name?: string;
};

export type DestinyItemDefinition = {
  classType?: DestinyClassType;
  collectibleHash?: number;
  displayProperties?: DestinyDisplayProperties;
  displaySource?: string;
  equippingBlock?: {
    ammoType?: number;
    equipmentSlotTypeHash?: number;
    uniqueLabel?: string;
  };
  flavorText?: string;
  iconWatermark?: string;
  iconWatermarkFeatured?: string;
  iconWatermarkShelved?: string;
  inventory?: {
    bucketTypeHash?: number;
    tierType?: number;
    tierTypeHash?: number;
    tierTypeName?: string;
  };
  investmentStats?: {
    isConditionallyActive?: boolean;
    statTypeHash?: number;
    value?: number;
  }[];
  isAdept?: boolean;
  isFeaturedItem?: boolean;
  isHolofoil?: boolean;
  itemCategoryHashes?: number[];
  itemSubType?: number;
  itemType?: number;
  itemTypeAndTierDisplayName?: string;
  itemTypeDisplayName?: string;
  plug?: {
    plugCategoryHash?: number;
    plugCategoryIdentifier?: string;
  };
  screenshot?: string;
  secondaryIcon?: string;
  secondaryOverlay?: string;
  secondarySpecial?: string;
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

export type DestinyStatDefinition = {
  displayProperties?: DestinyDisplayProperties;
  hash?: number;
  index?: number;
  statCategory?: number;
};

export type DestinyInventoryBucketDefinition = {
  bucketOrder?: number;
  category?: number;
  displayProperties?: DestinyDisplayProperties;
  hash?: number;
  itemCount?: number;
  location?: number;
  scope?: number;
};

export type DestinyDamageTypeDefinition = {
  color?: {
    alpha?: number;
    blue?: number;
    green?: number;
    red?: number;
  };
  displayProperties?: DestinyDisplayProperties;
  hash?: number;
  transparentIconPath?: string;
};

export type DestinySandboxPerkDefinition = {
  displayProperties?: DestinyDisplayProperties;
  hash?: number;
};

export type DestinyEquipableItemSetDefinition = {
  displayProperties?: DestinyDisplayProperties;
  hash?: number;
  setItems?: number[];
  setPerks?: {
    requiredSetCount?: number;
    sandboxPerkHash?: number;
  }[];
};

export type DestinyDefinitionBundle = {
  buckets?: Record<string, DestinyInventoryBucketDefinition>;
  damageTypes?: Record<string, DestinyDamageTypeDefinition>;
  equipableItemSets?: Record<string, DestinyEquipableItemSetDefinition>;
  inventoryItems: Record<string, DestinyItemDefinition>;
  sandboxPerks?: Record<string, DestinySandboxPerkDefinition>;
  stats?: Record<string, DestinyStatDefinition>;
};

type DestinyItemInstanceComponent = {
  canEquip?: boolean;
  damageType?: number;
  damageTypeHash?: number;
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

type DestinyItemReusablePlugComponent = {
  plugs?: Record<string, { plugItemHash?: number }[]>;
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
        stats?: Record<string, number>;
      }
    >;
  };
  characterEquipment?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  characterRenderData?: {
    data?: Record<
      string,
      {
        peerView?: {
          equipment?: {
            itemHash?: number;
            dyes?: { channelHash?: number; dyeHash?: number }[];
          }[];
        };
      }
    >;
  };
  characterInventories?: {
    data?: Record<string, { items?: DestinyInventoryItem[] }>;
  };
  itemComponents?: {
    instances?: {
      data?: Record<string, DestinyItemInstanceComponent>;
    };
    reusablePlugs?: {
      data?: Record<string, DestinyItemReusablePlugComponent>;
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
  profileCurrencies?: {
    data?: {
      items?: DestinyInventoryItem[];
    };
  };
  profileInventory?: {
    data?: {
      items?: DestinyInventoryItem[];
    };
  };
};

export type NormalizedStat = {
  /** Intrinsic value before mod/masterwork contributions (armor only). */
  base?: number;
  display: "bar" | "number";
  hash: number;
  name: string;
  sortOrder: number;
  value: number;
};

export type CharacterSummary = {
  className: string;
  classType: DestinyClassType | null;
  emblemBackgroundPath: string | null;
  id: string;
  light: number | null;
  stats: NormalizedStat[];
};

export type ItemLocation = "equipped" | "carried" | "vault" | "postmaster";
export type GearLocation = ItemLocation;
export type ItemKind =
  | "weapon"
  | "armor"
  | "ghost"
  | "ship"
  | "vehicle"
  | "engram"
  | "consumable"
  | "currency"
  | "mod"
  | "quest"
  | "unknown";
export type NormalizedItemKind = ItemKind;

export type NormalizedBucket = {
  hash: number | null;
  name: string;
  scope: "character" | "account" | "unknown";
};

export type NormalizedSlot = {
  hash: number | null;
  name: string;
  order: number;
};

export type NormalizedDamageType = {
  color: string | null;
  hash: number | null;
  icon: string | null;
  name: string | null;
};

export type NormalizedIconLayers = {
  background: string | null;
  featuredWatermark: string | null;
  ornamentWatermark: string | null;
  overlay: string | null;
  shelvedWatermark: string | null;
  watermark: string | null;
};

export type NormalizedPlug = {
  category: string | null;
  description: string | null;
  icon: string | null;
  index: number;
  isEnabled: boolean;
  isVisible: boolean;
  name: string;
  plugHash: number;
};

export type NormalizedSocket = NormalizedPlug & {
  reusablePlugHashes: number[];
  reusablePlugs: NormalizedPlug[];
};

export type NormalizedPerk = NormalizedPlug;

export type NormalizedSetData = {
  itemCount: number;
  itemHashes: number[];
  name: string | null;
};

export type NormalizedItemState = {
  adept: boolean;
  canEquip: boolean;
  canTransfer: boolean;
  crafted: boolean;
  enhanced: boolean;
  locked: boolean;
  masterworked: boolean;
  tracked: boolean;
};

export type NormalizedDestinyItem = {
  bucket: NormalizedBucket;
  bucketHash: number | null;
  characterId: string | null;
  className: string;
  classType: DestinyClassType | null;
  damageType: NormalizedDamageType;
  description: string | null;
  gearTier: number | null;
  icon: string | null;
  iconLayers: NormalizedIconLayers;
  id: string;
  isEquipped: boolean;
  itemHash: number;
  itemInstanceId: string | null;
  kind: ItemKind;
  location: ItemLocation;
  masterwork: NormalizedPlug | null;
  name: string;
  ornament: NormalizedPlug | null;
  perks: NormalizedPerk[];
  power: number | null;
  quantity: number;
  rarity: string | null;
  setData: NormalizedSetData | null;
  slot: NormalizedSlot;
  slotName: string;
  sockets: NormalizedSocket[];
  statTotal: number;
  stats: NormalizedStat[];
  state: NormalizedItemState;
  tier: string | null;
  weaponTier: number | null;
  inspector?: ItemInspectorExtras | null;
};

/**
 * Optional, richer inspector display data. Currently supplied by the preview
 * fixture; server-side population from the manifest + instance components is a
 * follow-up. The Command inspector renders each section only when present.
 */
export type ItemInspectorExtras = {
  ammoType?: string | null;
  energy?: { capacity: number; used: number } | null;
  archetype?: {
    name: string;
    description: string | null;
    icon?: string | null;
    primaryStat: string | null;
    secondaryStat: string | null;
  } | null;
  setBonus?: {
    name: string;
    equippedCount: number;
    requiredForFull: number;
    perks: { name?: string; description: string; requiredCount: number; active: boolean }[];
  } | null;
  shader?: { name: string; icon: string | null } | null;
  ornament?: { name: string; icon: string | null } | null;
  source?: string | null;
  acquired?: string | null;
  reason?: string | null;
  instanceNumber?: number | null;
};

export type NormalizedArmorItem = NormalizedDestinyItem & { kind: "armor" };
export type NormalizedWeaponItem = NormalizedDestinyItem & { kind: "weapon" };

export type CurrencySummary = {
  icon: string | null;
  itemHash: number;
  name: string;
  quantity: number;
};

export type NormalizedDestinyInventory = {
  armor: NormalizedArmorItem[];
  characters: CharacterSummary[];
  currencies: CurrencySummary[];
  items: NormalizedDestinyItem[];
  postmasterItems: NormalizedDestinyItem[];
  postmasterSummary: {
    itemCount: number;
    quantity: number;
  };
  vaultSummary: {
    itemCount: number;
  };
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
  requiresMoveEquipReauth: boolean;
};

export const ARMOR_SLOT_BY_BUCKET_HASH: Record<number, string> = {
  3448274439: "Helmet",
  3551918588: "Gauntlets",
  14239492: "Chest",
  20886954: "Legs",
  1585787867: "Class Item",
};

export const WEAPON_SLOT_BY_BUCKET_HASH: Record<number, string> = {
  1498876634: "Kinetic Weapons",
  2465295065: "Energy Weapons",
  953998645: "Power Weapons",
};

const DESTINY_ITEM_TYPE_ARMOR = 2;
const DESTINY_ITEM_TYPE_WEAPON = 3;
const DESTINY_ITEM_TYPE_ENGRAM = 8;
const DESTINY_ITEM_TYPE_CONSUMABLE = 9;
const DESTINY_ITEM_TYPE_QUEST = 12;
const DESTINY_ITEM_TYPE_MOD = 19;

const ITEM_STATE_LOCKED = 1;
const ITEM_STATE_TRACKED = 2;
const ITEM_STATE_MASTERWORK = 4;
const ITEM_STATE_CRAFTED = 8;
const ITEM_STATE_ENHANCED = 32;

const ITEM_LOCATION_POSTMASTER = 4;
const TRANSFER_STATUS_CAN_TRANSFER = 0;

const CLASS_NAME_BY_TYPE: Record<number, string> = {
  0: "Titan",
  1: "Hunter",
  2: "Warlock",
  3: "Any",
};

const ARMOR_3_STAT_NAME_BY_HASH: Record<string, string> = {
  "2996146975": "Weapons",
  "392767087": "Health",
  "1943323491": "Class",
  "1735777505": "Grenade",
  "144602215": "Super",
  "4244567218": "Melee",
};

const ARMOR_3_STAT_ORDER_BY_NAME: Record<string, number> = {
  Weapons: 1,
  Health: 2,
  Class: 3,
  Grenade: 4,
  Super: 5,
  Melee: 6,
};

const LEGACY_ARMOR_STAT_NAME: Record<string, string> = {
  Discipline: "Grenade",
  Intellect: "Super",
  Mobility: "Weapons",
  Recovery: "Class",
  Resilience: "Health",
  Strength: "Melee",
};

function isDefinitionBundle(
  definitions: Record<string, DestinyItemDefinition> | DestinyDefinitionBundle,
): definitions is DestinyDefinitionBundle {
  return "inventoryItems" in definitions;
}

function normalizeDefinitions(
  definitions: Record<string, DestinyItemDefinition> | DestinyDefinitionBundle,
): DestinyDefinitionBundle {
  return isDefinitionBundle(definitions)
    ? definitions
    : { inventoryItems: definitions };
}

export function getArmorStatDisplayName(
  hash: string,
  manifestName?: string,
): string {
  if (ARMOR_3_STAT_NAME_BY_HASH[hash]) {
    return ARMOR_3_STAT_NAME_BY_HASH[hash];
  }

  if (manifestName && LEGACY_ARMOR_STAT_NAME[manifestName]) {
    return LEGACY_ARMOR_STAT_NAME[manifestName];
  }

  return manifestName?.trim() || "Unknown Stat";
}

function getClassName(classType: DestinyClassType | null | undefined): string {
  return classType == null ? "Unknown" : (CLASS_NAME_BY_TYPE[classType] ?? "Unknown");
}

function getByHash<T>(
  definitions: Record<string, T> | undefined,
  hash: number | null | undefined,
): T | null {
  if (hash == null) {
    return null;
  }

  return definitions?.[String(hash)] ?? null;
}

function getInventoryDefinition(
  definitions: DestinyDefinitionBundle,
  itemHash: number,
): DestinyItemDefinition | null {
  return getByHash(definitions.inventoryItems, itemHash);
}

function getBucketHash(
  item: DestinyInventoryItem,
  definition: DestinyItemDefinition,
): number | null {
  return item.bucketHash ?? definition.inventory?.bucketTypeHash ?? null;
}

function getBucketScope(scope: number | undefined): NormalizedBucket["scope"] {
  if (scope === 0) {
    return "character";
  }

  if (scope === 1) {
    return "account";
  }

  return "unknown";
}

function normalizeBucket(
  bucketHash: number | null,
  definitions: DestinyDefinitionBundle,
): NormalizedBucket {
  const bucketDefinition = getByHash(definitions.buckets, bucketHash);

  return {
    hash: bucketHash,
    name:
      bucketDefinition?.displayProperties?.name?.trim() ||
      (bucketHash == null ? "Unknown Bucket" : `Bucket ${bucketHash}`),
    scope: getBucketScope(bucketDefinition?.scope),
  };
}

function normalizeSlot(
  bucketHash: number | null,
  bucket: NormalizedBucket,
  kind: ItemKind,
  definitions: DestinyDefinitionBundle,
): NormalizedSlot {
  const bucketDefinition = getByHash(definitions.buckets, bucketHash);
  const knownSlotName =
    bucketHash == null
      ? null
      : kind === "armor"
        ? ARMOR_SLOT_BY_BUCKET_HASH[bucketHash]
        : kind === "weapon"
          ? WEAPON_SLOT_BY_BUCKET_HASH[bucketHash]
          : null;

  return {
    hash: bucketHash,
    name: knownSlotName ?? bucket.name,
    order: bucketDefinition?.bucketOrder ?? 9999,
  };
}

export function isArmorBucketHash(bucketHash: number | undefined): boolean {
  return bucketHash != null && bucketHash in ARMOR_SLOT_BY_BUCKET_HASH;
}

export function isWeaponBucketHash(bucketHash: number | undefined): boolean {
  return bucketHash != null && bucketHash in WEAPON_SLOT_BY_BUCKET_HASH;
}

export function isGearBucketHash(bucketHash: number | undefined): boolean {
  return isArmorBucketHash(bucketHash) || isWeaponBucketHash(bucketHash);
}

function addItemDefinitionHash(hashes: Set<number>, item: DestinyInventoryItem) {
  hashes.add(item.itemHash);
  if (item.overrideStyleItemHash != null) {
    hashes.add(item.overrideStyleItemHash);
  }
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

  for (const inventory of Object.values(profile.characterEquipment?.data ?? {})) {
    inventory.items?.forEach((item) => addItemDefinitionHash(hashes, item));
  }

  for (const inventory of Object.values(
    profile.characterInventories?.data ?? {},
  )) {
    inventory.items?.forEach((item) => addItemDefinitionHash(hashes, item));
  }

  profile.profileInventory?.data?.items?.forEach((item) =>
    addItemDefinitionHash(hashes, item),
  );
  profile.profileCurrencies?.data?.items?.forEach((item) =>
    addItemDefinitionHash(hashes, item),
  );

  for (const socketComponent of Object.values(
    profile.itemComponents?.sockets?.data ?? {},
  )) {
    for (const socket of socketComponent.sockets ?? []) {
      if (socket.plugHash != null) {
        hashes.add(socket.plugHash);
      }
    }
  }

  for (const reusablePlugComponent of Object.values(
    profile.itemComponents?.reusablePlugs?.data ?? {},
  )) {
    for (const plugs of Object.values(reusablePlugComponent.plugs ?? {})) {
      for (const plug of plugs) {
        if (plug.plugItemHash != null) {
          hashes.add(plug.plugItemHash);
        }
      }
    }
  }

  return [...hashes];
}

function getKindFromText(value: string | undefined): ItemKind | null {
  const text = value?.toLowerCase() ?? "";

  if (!text) {
    return null;
  }

  if (text.includes("ghost")) {
    return "ghost";
  }

  if (text.includes("ship")) {
    return "ship";
  }

  if (text.includes("sparrow") || text.includes("vehicle")) {
    return "vehicle";
  }

  if (text.includes("engram")) {
    return "engram";
  }

  if (text.includes("mod")) {
    return "mod";
  }

  if (text.includes("quest") || text.includes("bounty")) {
    return "quest";
  }

  if (text.includes("currency")) {
    return "currency";
  }

  if (text.includes("consumable")) {
    return "consumable";
  }

  return null;
}

function getItemKind({
  bucket,
  bucketHash,
  definition,
}: {
  bucket: NormalizedBucket;
  bucketHash: number | null;
  definition: DestinyItemDefinition;
}): ItemKind {
  const bucketHashOrUndefined = bucketHash ?? undefined;

  if (
    isArmorBucketHash(bucketHashOrUndefined) ||
    definition.itemType === DESTINY_ITEM_TYPE_ARMOR
  ) {
    return "armor";
  }

  if (
    isWeaponBucketHash(bucketHashOrUndefined) ||
    definition.itemType === DESTINY_ITEM_TYPE_WEAPON
  ) {
    return "weapon";
  }

  if (definition.itemType === DESTINY_ITEM_TYPE_ENGRAM) {
    return "engram";
  }

  if (definition.itemType === DESTINY_ITEM_TYPE_CONSUMABLE) {
    return "consumable";
  }

  if (definition.itemType === DESTINY_ITEM_TYPE_QUEST) {
    return "quest";
  }

  if (definition.itemType === DESTINY_ITEM_TYPE_MOD) {
    return "mod";
  }

  return (
    getKindFromText(definition.itemTypeDisplayName) ??
    getKindFromText(definition.itemTypeAndTierDisplayName) ??
    getKindFromText(bucket.name) ??
    "unknown"
  );
}

function getStatDisplayMode(statName: string): NormalizedStat["display"] {
  return /rpm|rounds per minute|magazine|ammo/i.test(statName) ? "number" : "bar";
}

function normalizeItemStats({
  definitions,
  isArmor,
  itemInstanceId,
  profile,
}: {
  definitions: DestinyDefinitionBundle;
  isArmor: boolean;
  itemInstanceId: string | undefined;
  profile: DestinyProfileResponse;
}): NormalizedStat[] {
  if (!itemInstanceId) {
    return [];
  }

  return normalizeRawStats({
    definitions,
    isArmor,
    rawStats: Object.fromEntries(
      Object.entries(
        profile.itemComponents?.stats?.data?.[itemInstanceId]?.stats ?? {},
      ).map(([hash, stat]) => [hash, stat.value ?? 0]),
    ),
  });
}

function normalizeRawStats({
  definitions,
  isArmor,
  rawStats,
}: {
  definitions: DestinyDefinitionBundle;
  isArmor: boolean;
  rawStats: Record<string, number>;
}): NormalizedStat[] {
  return Object.entries(rawStats)
    .map(([hash, value]) => {
      const statHash = Number(hash);
      const statDefinition = getByHash(definitions.stats, statHash);
      const manifestName = statDefinition?.displayProperties?.name;
      const name = isArmor
        ? getArmorStatDisplayName(hash, manifestName)
        : manifestName?.trim() || "Unknown Stat";

      return {
        display: getStatDisplayMode(name),
        hash: statHash,
        name,
        sortOrder:
          (isArmor ? ARMOR_3_STAT_ORDER_BY_NAME[name] : undefined) ??
          statDefinition?.index ??
          statHash,
        value,
      };
    })
    .filter((stat) => stat.value > 0)
    .sort((first, second) => first.sortOrder - second.sortOrder);
}

function normalizePlug(
  definitions: DestinyDefinitionBundle,
  plugHash: number,
  index: number,
  state: {
    isEnabled?: boolean;
    isVisible?: boolean;
  } = {},
): NormalizedPlug {
  const plugDefinition = getInventoryDefinition(definitions, plugHash);

  return {
    category: plugDefinition?.plug?.plugCategoryIdentifier ?? null,
    description: plugDefinition?.displayProperties?.description ?? null,
    icon: plugDefinition?.displayProperties?.icon ?? null,
    index,
    isEnabled: state.isEnabled ?? true,
    isVisible: state.isVisible ?? true,
    name:
      plugDefinition?.displayProperties?.name?.trim() ||
      `Plug ${plugHash}`,
    plugHash,
  };
}

function normalizeSockets({
  definitions,
  itemInstanceId,
  profile,
}: {
  definitions: DestinyDefinitionBundle;
  itemInstanceId: string | undefined;
  profile: DestinyProfileResponse;
}): NormalizedSocket[] {
  if (!itemInstanceId) {
    return [];
  }

  const socketComponent =
    profile.itemComponents?.sockets?.data?.[itemInstanceId]?.sockets ?? [];
  const reusablePlugGroups =
    profile.itemComponents?.reusablePlugs?.data?.[itemInstanceId]?.plugs ?? {};

  return socketComponent.flatMap((socket, index) => {
    if (socket.plugHash == null) {
      return [];
    }

    const reusablePlugHashes = (reusablePlugGroups[String(index)] ?? [])
      .map((plug) => plug.plugItemHash)
      .filter((plugHash): plugHash is number => plugHash != null);

    return {
      ...normalizePlug(definitions, socket.plugHash, index, socket),
      reusablePlugHashes,
      reusablePlugs: reusablePlugHashes.map((plugHash) =>
        normalizePlug(definitions, plugHash, index),
      ),
    };
  });
}

function categoryIncludes(plug: NormalizedPlug, pattern: RegExp): boolean {
  return pattern.test(`${plug.category ?? ""} ${plug.name}`.toLowerCase());
}

function normalizePerks(sockets: NormalizedSocket[]): NormalizedPerk[] {
  return sockets
    .filter((socket) => {
      if (!socket.isVisible || !socket.isEnabled) {
        return false;
      }

      return !categoryIncludes(
        socket,
        /shader|ornament|skin|masterwork|tracker|memento/,
      );
    })
    .slice(0, 12);
}

function findPlugByCategory(
  sockets: readonly NormalizedSocket[],
  pattern: RegExp,
): NormalizedPlug | null {
  return sockets.find((socket) => categoryIncludes(socket, pattern)) ?? null;
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

function normalizeColor(
  color: DestinyDamageTypeDefinition["color"],
): string | null {
  if (!color) {
    return null;
  }

  return `rgb(${color.red ?? 0}, ${color.green ?? 0}, ${color.blue ?? 0})`;
}

function normalizeDamageType({
  definitions,
  instance,
}: {
  definitions: DestinyDefinitionBundle;
  instance: DestinyItemInstanceComponent | undefined;
}): NormalizedDamageType {
  const hash = instance?.damageTypeHash ?? null;
  const definition = getByHash(definitions.damageTypes, hash);

  return {
    color: normalizeColor(definition?.color),
    hash,
    icon:
      definition?.transparentIconPath ??
      definition?.displayProperties?.icon ??
      null,
    name: definition?.displayProperties?.name ?? null,
  };
}

function normalizeIconLayers(
  definition: DestinyItemDefinition,
): NormalizedIconLayers {
  return {
    background: definition.secondarySpecial ?? null,
    featuredWatermark: definition.iconWatermarkFeatured ?? null,
    ornamentWatermark: null,
    overlay: definition.secondaryOverlay ?? null,
    shelvedWatermark: definition.iconWatermarkShelved ?? null,
    watermark: definition.iconWatermark ?? null,
  };
}

function hasStateBit(state: number | undefined, bit: number): boolean {
  return Boolean((state ?? 0) & bit);
}

function normalizeItemState({
  definition,
  instance,
  item,
}: {
  definition: DestinyItemDefinition;
  instance: DestinyItemInstanceComponent | undefined;
  item: DestinyInventoryItem;
}): NormalizedItemState {
  return {
    adept: Boolean(definition.isAdept),
    canEquip: instance?.canEquip ?? Boolean(definition.equippingBlock),
    canTransfer:
      item.transferStatus == null ||
      item.transferStatus === TRANSFER_STATUS_CAN_TRANSFER,
    crafted: hasStateBit(item.state, ITEM_STATE_CRAFTED),
    enhanced: hasStateBit(item.state, ITEM_STATE_ENHANCED),
    locked: hasStateBit(item.state, ITEM_STATE_LOCKED),
    masterworked: hasStateBit(item.state, ITEM_STATE_MASTERWORK),
    tracked: hasStateBit(item.state, ITEM_STATE_TRACKED),
  };
}

function getItemLocation({
  bucket,
  isEquipped,
  item,
  source,
}: {
  bucket: NormalizedBucket;
  isEquipped: boolean;
  item: DestinyInventoryItem;
  source: "character" | "profile";
}): ItemLocation {
  if (isEquipped) {
    return "equipped";
  }

  if (
    item.location === ITEM_LOCATION_POSTMASTER ||
    bucket.name.toLowerCase().includes("postmaster")
  ) {
    return "postmaster";
  }

  return source === "profile" ? "vault" : "carried";
}

/**
 * Sets each armor stat's `base` (the intrinsic roll) by subtracting the stat
 * contributions of inserted mod/masterwork plugs, so the inspector can show the
 * base segment + the green delta from mods.
 */
function applyArmorStatBases({
  definitions,
  sockets,
  stats,
}: {
  definitions: DestinyDefinitionBundle;
  sockets: NormalizedSocket[];
  stats: NormalizedStat[];
}): void {
  const contributions = new Map<number, number>();
  for (const socket of sockets) {
    if (!socket.isEnabled || !socket.isVisible) {
      continue;
    }
    // Only stat-bearing mod/masterwork plugs add to base; the intrinsic
    // archetype roll and cosmetics do not.
    if (
      !categoryIncludes(socket, /mod|masterwork|enhancement/) ||
      categoryIncludes(socket, /shader|ornament|intrinsic/)
    ) {
      continue;
    }
    const plugDefinition = getInventoryDefinition(definitions, socket.plugHash);
    for (const investment of plugDefinition?.investmentStats ?? []) {
      if (
        investment.isConditionallyActive ||
        investment.statTypeHash == null ||
        investment.value == null
      ) {
        continue;
      }
      contributions.set(
        investment.statTypeHash,
        (contributions.get(investment.statTypeHash) ?? 0) + investment.value,
      );
    }
  }

  for (const stat of stats) {
    stat.base = Math.max(0, stat.value - (contributions.get(stat.hash) ?? 0));
  }
}

const AMMO_TYPE_LABEL: Record<number, string> = {
  1: "Primary",
  2: "Special",
  3: "Heavy",
};

/**
 * Best-effort inspector extras derived from data we already fetch (item def +
 * instance components). Energy/archetype only apply to armor; ammo to weapons.
 * Set-bonus and stat deltas are populated elsewhere (cross-item / mod math).
 */
function buildInspectorExtras({
  definition,
  instance,
  kind,
  sockets,
  stats,
}: {
  definition: DestinyItemDefinition;
  instance: DestinyItemInstanceComponent | undefined;
  kind: ItemKind;
  sockets: NormalizedSocket[];
  stats: NormalizedStat[];
}): ItemInspectorExtras | null {
  const extras: ItemInspectorExtras = {};

  const ammoType = definition.equippingBlock?.ammoType;
  if (kind === "weapon" && ammoType && AMMO_TYPE_LABEL[ammoType]) {
    extras.ammoType = AMMO_TYPE_LABEL[ammoType];
  }

  const energy = instance?.energy;
  if (energy && (energy.energyCapacity ?? 0) > 0) {
    extras.energy = {
      capacity: energy.energyCapacity ?? 0,
      used: energy.energyUsed ?? 0,
    };
  }

  if (kind === "armor") {
    const intrinsic = findPlugByCategory(sockets, /intrinsic|archetype/);
    if (intrinsic) {
      const ranked = stats
        .filter((stat) => stat.value > 0)
        .sort((first, second) => second.value - first.value);
      // The intrinsic description usually states the authoritative focus
      // ("Primary Stat: X Secondary Stat: Y"); fall back to the top stats.
      const description = intrinsic.description ?? "";
      const primaryMatch = description.match(/primary stat:\s*([a-z]+)/i);
      const secondaryMatch = description.match(/secondary stat:\s*([a-z]+)/i);
      extras.archetype = {
        name: intrinsic.name,
        description: intrinsic.description,
        icon: intrinsic.icon,
        primaryStat: primaryMatch?.[1] ?? ranked[0]?.name ?? null,
        secondaryStat: secondaryMatch?.[1] ?? ranked[1]?.name ?? null,
      };
    }
  }

  const source = definition.displaySource?.trim();
  if (source) {
    extras.source = source;
  }

  return Object.keys(extras).length > 0 ? extras : null;
}

function normalizeItem({
  characterId,
  definitions,
  isEquipped,
  item,
  profile,
  source,
}: {
  characterId: string | null;
  definitions: DestinyDefinitionBundle;
  isEquipped: boolean;
  item: DestinyInventoryItem;
  profile: DestinyProfileResponse;
  source: "character" | "profile";
}): NormalizedDestinyItem | null {
  const definition = getInventoryDefinition(definitions, item.itemHash);
  if (!definition) {
    return null;
  }

  const styleOverrideDefinition = item.overrideStyleItemHash
    ? getInventoryDefinition(definitions, item.overrideStyleItemHash)
    : null;
  const bucketHash = getBucketHash(item, definition);
  const bucket = normalizeBucket(bucketHash, definitions);
  const kind = getItemKind({ bucket, bucketHash, definition });
  const slot = normalizeSlot(bucketHash, bucket, kind, definitions);
  const itemInstanceId = item.itemInstanceId;
  const instance = itemInstanceId
    ? profile.itemComponents?.instances?.data?.[itemInstanceId]
    : undefined;
  const sockets = normalizeSockets({ definitions, itemInstanceId, profile });
  const stats = normalizeItemStats({
    definitions,
    isArmor: kind === "armor",
    itemInstanceId,
    profile,
  });
  if (kind === "armor") {
    applyArmorStatBases({ definitions, sockets, stats });
  }
  const location = getItemLocation({ bucket, isEquipped, item, source });
  const classType = definition.classType ?? null;
  const gearTier = instance?.gearTier ?? null;
  const rarity = definition.inventory?.tierTypeName ?? null;

  return {
    bucket,
    bucketHash,
    characterId,
    className: getClassName(classType),
    classType,
    damageType: normalizeDamageType({ definitions, instance }),
    description:
      definition.displayProperties?.description ??
      definition.flavorText ??
      null,
    gearTier,
    icon:
      styleOverrideDefinition?.displayProperties?.icon ??
      definition.displayProperties?.icon ??
      null,
    iconLayers: normalizeIconLayers(definition),
    id: itemInstanceId ?? `${item.itemHash}:${characterId ?? "profile"}`,
    isEquipped: location === "equipped",
    itemHash: item.itemHash,
    itemInstanceId: itemInstanceId ?? null,
    kind,
    location,
    masterwork: findPlugByCategory(sockets, /masterwork/),
    name: definition.displayProperties?.name ?? `Unknown item ${item.itemHash}`,
    ornament: findPlugByCategory(sockets, /ornament|skin/),
    perks: normalizePerks(sockets),
    power: instance?.primaryStat?.value ?? null,
    quantity: item.quantity ?? 1,
    rarity,
    setData: normalizeSetData(definition),
    slot,
    slotName: slot.name,
    sockets,
    statTotal: stats.reduce((total, stat) => total + stat.value, 0),
    stats,
    state: normalizeItemState({ definition, instance, item }),
    tier: rarity,
    weaponTier: kind === "weapon" ? gearTier : null,
    inspector: buildInspectorExtras({ definition, instance, kind, sockets, stats }),
  };
}

function normalizeCharacterStats(
  definitions: DestinyDefinitionBundle,
  rawStats: Record<string, number> | undefined,
): NormalizedStat[] {
  return normalizeRawStats({
    definitions,
    isArmor: true,
    rawStats: rawStats ?? {},
  });
}

function normalizeCurrency(
  item: DestinyInventoryItem,
  definitions: DestinyDefinitionBundle,
): CurrencySummary | null {
  const definition = getInventoryDefinition(definitions, item.itemHash);
  if (!definition) {
    return null;
  }

  return {
    icon: definition.displayProperties?.icon ?? null,
    itemHash: item.itemHash,
    name: definition.displayProperties?.name ?? `Currency ${item.itemHash}`,
    quantity: item.quantity ?? 0,
  };
}

export function getItemStatValue(
  item: Pick<NormalizedDestinyItem, "stats">,
  statName: string,
): number {
  return item.stats.find((stat) => stat.name === statName)?.value ?? 0;
}

export function getItemStatTotals(
  items: readonly Pick<NormalizedDestinyItem, "stats">[],
): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const item of items) {
    for (const stat of item.stats) {
      totals[stat.name] = (totals[stat.name] ?? 0) + stat.value;
    }
  }

  return totals;
}

/**
 * Cross-item pass: for each equipped armor piece in an Armor 3.0 set, count how
 * many set members are equipped on the same character and attach the set-bonus
 * (2-/4-piece) state to the item's inspector extras.
 */
function applySetBonuses(
  items: NormalizedDestinyItem[],
  definitions: DestinyDefinitionBundle,
): void {
  const sets = definitions.equipableItemSets;
  if (!sets) {
    return;
  }

  const setByItemHash = new Map<number, DestinyEquipableItemSetDefinition>();
  for (const setDefinition of Object.values(sets)) {
    for (const memberHash of setDefinition.setItems ?? []) {
      setByItemHash.set(memberHash, setDefinition);
    }
  }
  if (setByItemHash.size === 0) {
    return;
  }

  const equippedByCharacter = new Map<string, Set<number>>();
  for (const item of items) {
    if (item.kind === "armor" && item.isEquipped && item.characterId) {
      const equipped = equippedByCharacter.get(item.characterId) ?? new Set<number>();
      equipped.add(item.itemHash);
      equippedByCharacter.set(item.characterId, equipped);
    }
  }

  for (const item of items) {
    if (item.kind !== "armor" || !item.isEquipped || !item.characterId) {
      continue;
    }
    const setDefinition = setByItemHash.get(item.itemHash);
    if (!setDefinition) {
      continue;
    }

    const equipped = equippedByCharacter.get(item.characterId) ?? new Set<number>();
    const equippedCount = (setDefinition.setItems ?? []).filter((hash) =>
      equipped.has(hash),
    ).length;
    const perks = (setDefinition.setPerks ?? [])
      .slice()
      .sort((a, b) => (a.requiredSetCount ?? 0) - (b.requiredSetCount ?? 0))
      .map((perk) => {
        const sandbox =
          perk.sandboxPerkHash != null
            ? definitions.sandboxPerks?.[String(perk.sandboxPerkHash)]
            : undefined;
        const required = perk.requiredSetCount ?? 0;
        return {
          active: equippedCount >= required,
          description: sandbox?.displayProperties?.description ?? "",
          name: sandbox?.displayProperties?.name,
          requiredCount: required,
        };
      });
    const requiredForFull =
      perks.reduce((max, perk) => Math.max(max, perk.requiredCount), 0) ||
      (setDefinition.setItems?.length ?? 0);

    item.inspector = {
      ...(item.inspector ?? {}),
      setBonus: {
        equippedCount,
        name: setDefinition.displayProperties?.name ?? "Armor Set",
        perks,
        requiredForFull,
      },
    };
  }
}

export function normalizeDestinyInventory(
  profile: DestinyProfileResponse,
  inputDefinitions: Record<string, DestinyItemDefinition> | DestinyDefinitionBundle,
): NormalizedDestinyInventory {
  const definitions = normalizeDefinitions(inputDefinitions);
  const characters = Object.values(profile.characters?.data ?? {}).map(
    (character): CharacterSummary => {
      const classType = character.classType ?? null;

      return {
        className: getClassName(classType),
        classType,
        emblemBackgroundPath: character.emblemBackgroundPath ?? null,
        id: character.characterId ?? "",
        light: character.light ?? null,
        stats: normalizeCharacterStats(definitions, character.stats),
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
        profile,
        source: "character",
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
        profile,
        source: "character",
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
      profile,
      source: "profile",
    });
    if (normalized) {
      items.push(normalized);
    }
  }

  const postmasterItems = items.filter((item) => item.location === "postmaster");
  const currencies = (profile.profileCurrencies?.data?.items ?? [])
    .map((item) => normalizeCurrency(item, definitions))
    .filter((item): item is CurrencySummary => Boolean(item));

  applySetBonuses(items, definitions);

  return {
    armor: items.filter(
      (item): item is NormalizedArmorItem => item.kind === "armor",
    ),
    characters,
    currencies,
    items,
    postmasterItems,
    postmasterSummary: {
      itemCount: postmasterItems.length,
      quantity: postmasterItems.reduce((total, item) => total + item.quantity, 0),
    },
    vaultSummary: {
      itemCount: items.filter((item) => item.location === "vault").length,
    },
    weapons: items.filter(
      (item): item is NormalizedWeaponItem => item.kind === "weapon",
    ),
  };
}

export const normalizeArmorInventory = normalizeDestinyInventory;
