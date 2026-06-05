import type { NormalizedDestinyItem } from "./inventory";
import { isArmorTierReady } from "./live-rules";

export type CommandGearSlots = {
  armor: NormalizedDestinyItem[];
  ghost: NormalizedDestinyItem | null;
  other: NormalizedDestinyItem[];
  weapons: NormalizedDestinyItem[];
};

export type ArmorTierSummary = {
  averageTier: number | null;
  byTier: Record<number, number>;
  readyPieces: number;
  totalPieces: number;
};

export type CommandSetSummary = {
  activePieces: number;
  name: string;
  requiredPieces: number;
};

export type CommandStageMetrics = {
  armorCount: number;
  averageArmorTier: number | null;
  exoticCount: number;
  power: number | null;
  totalEquipped: number;
  weaponCount: number;
};

export function getCommandEquippedItems(
  items: readonly NormalizedDestinyItem[],
  selectedCharacterId: string | null,
): NormalizedDestinyItem[] {
  if (!selectedCharacterId) {
    return [];
  }

  return items
    .filter(
      (item) =>
        item.location === "equipped" &&
        item.characterId === selectedCharacterId,
    )
    .sort((first, second) => {
      const orderDiff = first.slot.order - second.slot.order;

      if (orderDiff !== 0) {
        return orderDiff;
      }

      return first.name.localeCompare(second.name);
    });
}

export function isCommandInspectableItem(item: NormalizedDestinyItem): boolean {
  return item.kind === "weapon" || item.kind === "armor";
}

export function selectCommandInspectItem(
  equippedItems: readonly NormalizedDestinyItem[],
  requestedItem: NormalizedDestinyItem | null,
): NormalizedDestinyItem | null {
  const inspectableItems = equippedItems.filter(isCommandInspectableItem);
  const refreshedRequestedItem = requestedItem
    ? (inspectableItems.find((item) => item.id === requestedItem.id) ?? null)
    : null;

  if (refreshedRequestedItem) {
    return refreshedRequestedItem;
  }

  return inspectableItems[0] ?? null;
}

export function getCommandGearSlots(
  equippedItems: readonly NormalizedDestinyItem[],
): CommandGearSlots {
  return {
    armor: equippedItems.filter((item) => item.kind === "armor"),
    ghost:
      equippedItems.find(
        (item) =>
          item.kind === "ghost" || item.slot.name.toLowerCase() === "ghost",
      ) ?? null,
    other: equippedItems.filter(
      (item) =>
        item.kind !== "weapon" &&
        item.kind !== "armor" &&
        item.kind !== "ghost" &&
        item.slot.name.toLowerCase() !== "ghost",
    ),
    weapons: equippedItems.filter((item) => item.kind === "weapon"),
  };
}

export function getArmorTierSummary(
  equippedItems: readonly NormalizedDestinyItem[],
): ArmorTierSummary {
  const armorPieces = equippedItems.filter((item) => item.kind === "armor");
  const tieredPieces = armorPieces.filter(
    (item) => item.gearTier != null && item.gearTier > 0,
  );
  const tierTotal = tieredPieces.reduce(
    (total, item) => total + (item.gearTier ?? 0),
    0,
  );

  return {
    averageTier:
      tieredPieces.length === 0
        ? null
        : Math.round((tierTotal / tieredPieces.length) * 10) / 10,
    byTier: tieredPieces.reduce<Record<number, number>>((tiers, item) => {
      const tier = item.gearTier ?? 0;
      tiers[tier] = (tiers[tier] ?? 0) + 1;
      return tiers;
    }, {}),
    readyPieces: armorPieces.filter((item) => isArmorTierReady(item.gearTier))
      .length,
    totalPieces: armorPieces.length,
  };
}

export function getCommandStageMetrics({
  characterPower,
  equippedItems,
}: {
  characterPower: number | null | undefined;
  equippedItems: readonly NormalizedDestinyItem[];
}): CommandStageMetrics {
  const armorPieces = equippedItems.filter((item) => item.kind === "armor");
  const tieredArmorPieces = armorPieces.filter(
    (item) => item.gearTier != null && item.gearTier > 0,
  );
  const armorTierTotal = tieredArmorPieces.reduce(
    (total, item) => total + (item.gearTier ?? 0),
    0,
  );

  return {
    armorCount: armorPieces.length,
    averageArmorTier:
      tieredArmorPieces.length === 0
        ? null
        : Math.round((armorTierTotal / tieredArmorPieces.length) * 10) / 10,
    exoticCount: equippedItems.filter((item) => item.rarity === "Exotic").length,
    power: characterPower ?? null,
    totalEquipped: equippedItems.length,
    weaponCount: equippedItems.filter((item) => item.kind === "weapon").length,
  };
}

export function getCommandSetSummaries(
  equippedItems: readonly NormalizedDestinyItem[],
): CommandSetSummary[] {
  const summaries = new Map<string, CommandSetSummary>();

  for (const item of equippedItems) {
    if (!item.setData?.name) {
      continue;
    }

    const current = summaries.get(item.setData.name) ?? {
      activePieces: 0,
      name: item.setData.name,
      requiredPieces: item.setData.itemCount,
    };

    summaries.set(item.setData.name, {
      ...current,
      activePieces: current.activePieces + 1,
      requiredPieces: Math.max(current.requiredPieces, item.setData.itemCount),
    });
  }

  return [...summaries.values()].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}

export function getVaultPressure({
  capacity,
  itemCount,
}: {
  capacity: number;
  itemCount: number;
}): number | null {
  if (capacity <= 0) {
    return null;
  }

  return Math.max(0, Math.min(100, Math.round((itemCount / capacity) * 100)));
}
