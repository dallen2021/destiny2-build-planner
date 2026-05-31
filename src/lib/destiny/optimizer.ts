import type {
  DestinyClassType,
  NormalizedArmorItem,
  NormalizedDestinyItem,
} from "./inventory";
import { scoreVaultItem } from "./vault-clean";
import type { ItemTagMap } from "./tags";

export type OptimizerGoal = {
  classType: DestinyClassType;
  minimumStats?: Partial<Record<string, number>>;
  preferredStats: string[];
};

export type OptimizerResult = {
  items: NormalizedArmorItem[];
  missingSlots: string[];
  score: number;
  statTotals: Record<string, number>;
};

const REQUIRED_ARMOR_SLOTS = [
  "Helmet",
  "Gauntlets",
  "Chest",
  "Legs",
  "Class Item",
] as const;

function isClassCompatible(
  item: NormalizedDestinyItem,
  classType: DestinyClassType,
): boolean {
  return item.classType == null || item.classType === 3 || item.classType === classType;
}

function getGoalScore(
  item: NormalizedArmorItem,
  preferredStats: readonly string[],
): number {
  const preferredScore = preferredStats.reduce(
    (total, statName) => total + (item.stats[statName] ?? 0),
    0,
  );

  return scoreVaultItem(item) + preferredScore * 4;
}

function sumStats(items: readonly NormalizedArmorItem[]): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const item of items) {
    for (const [statName, value] of Object.entries(item.stats)) {
      totals[statName] = (totals[statName] ?? 0) + value;
    }
  }

  return totals;
}

function meetsMinimumStats(
  totals: Record<string, number>,
  minimumStats: OptimizerGoal["minimumStats"],
): boolean {
  return Object.entries(minimumStats ?? {}).every(
    ([statName, minimum]) =>
      minimum == null || (totals[statName] != null && totals[statName] >= minimum),
  );
}

export function rankArmorForGoal({
  goal,
  items,
  tagMap = {},
}: {
  goal: OptimizerGoal;
  items: readonly NormalizedDestinyItem[];
  tagMap?: ItemTagMap;
}): OptimizerResult {
  const selectedItems: NormalizedArmorItem[] = [];
  const missingSlots: string[] = [];

  for (const slot of REQUIRED_ARMOR_SLOTS) {
    const candidates = items
      .filter(
        (item): item is NormalizedArmorItem =>
          item.kind === "armor" &&
          item.slot === slot &&
          isClassCompatible(item, goal.classType) &&
          !(tagMap[item.id] ?? []).includes("slop"),
      )
      .sort(
        (first, second) =>
          getGoalScore(second, goal.preferredStats) -
          getGoalScore(first, goal.preferredStats),
      );

    const bestCandidate = candidates[0];
    if (bestCandidate) {
      selectedItems.push(bestCandidate);
    } else {
      missingSlots.push(slot);
    }
  }

  const statTotals = sumStats(selectedItems);
  const minimumPenalty = meetsMinimumStats(statTotals, goal.minimumStats) ? 0 : 500;

  return {
    items: selectedItems,
    missingSlots,
    score:
      selectedItems.reduce(
        (total, item) => total + getGoalScore(item, goal.preferredStats),
        0,
      ) - minimumPenalty,
    statTotals,
  };
}
