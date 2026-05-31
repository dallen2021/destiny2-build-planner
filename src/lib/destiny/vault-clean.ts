import type { NormalizedDestinyItem } from "./inventory";
import type { ItemTag, ItemTagMap } from "./tags";

export type VaultRecommendationAction = "save" | "review" | "delete-candidate";

export type VaultRecommendation = {
  action: VaultRecommendationAction;
  confidence: "high" | "medium" | "low";
  itemId: string;
  reasons: string[];
  score: number;
};

const PROTECTIVE_TAGS: ItemTag[] = ["peak", "keep", "build"];

function hasAnyTag(tags: readonly ItemTag[], checkedTags: readonly ItemTag[]) {
  return checkedTags.some((tag) => tags.includes(tag));
}

export function scoreVaultItem(item: NormalizedDestinyItem): number {
  const gearTierScore = (item.gearTier ?? 0) * 80;
  const statScore = item.kind === "armor" ? item.statTotal : 0;
  const powerScore = item.power == null ? 0 : Math.min(item.power / 10, 70);
  const perkScore = item.perks.length * 5;
  const setScore = item.setData ? 20 : 0;
  const equippedScore = item.isEquipped ? 500 : 0;
  const exoticScore = item.tier === "Exotic" ? 250 : 0;

  return Math.round(
    gearTierScore +
      statScore +
      powerScore +
      perkScore +
      setScore +
      equippedScore +
      exoticScore,
  );
}

function getDuplicateKey(item: NormalizedDestinyItem): string {
  return `${item.kind}:${item.itemHash}:${item.slot}:${item.classType ?? "any"}`;
}

function getDuplicateBestScores(items: NormalizedDestinyItem[]): Map<string, number> {
  const bestScores = new Map<string, number>();

  for (const item of items) {
    const key = getDuplicateKey(item);
    bestScores.set(key, Math.max(bestScores.get(key) ?? 0, scoreVaultItem(item)));
  }

  return bestScores;
}

export function evaluateVaultItem({
  bestDuplicateScores,
  item,
  tags,
}: {
  bestDuplicateScores: Map<string, number>;
  item: NormalizedDestinyItem;
  tags: readonly ItemTag[];
}): VaultRecommendation {
  const reasons: string[] = [];
  const score = scoreVaultItem(item);

  if (hasAnyTag(tags, PROTECTIVE_TAGS)) {
    return {
      action: "save",
      confidence: "high",
      itemId: item.id,
      reasons: ["Protected by a save tag."],
      score,
    };
  }

  if (item.isEquipped) {
    return {
      action: "save",
      confidence: "high",
      itemId: item.id,
      reasons: ["Currently equipped."],
      score,
    };
  }

  if (item.tier === "Exotic") {
    return {
      action: "save",
      confidence: "high",
      itemId: item.id,
      reasons: ["Exotic item; keep unless you manually mark it."],
      score,
    };
  }

  if (tags.includes("slop")) {
    return {
      action: "delete-candidate",
      confidence: "medium",
      itemId: item.id,
      reasons: ["Manually tagged as slop."],
      score,
    };
  }

  if (item.gearTier != null && item.gearTier >= 5) {
    return {
      action: "save",
      confidence: "high",
      itemId: item.id,
      reasons: ["Tier 5 gear is currently a chase-quality drop."],
      score,
    };
  }

  if (item.setData) {
    reasons.push("Has set-bonus metadata.");
  }

  if (item.kind === "armor") {
    if (item.statTotal >= 75) {
      return {
        action: "save",
        confidence: "high",
        itemId: item.id,
        reasons: ["High Armor 3.0 stat total."],
        score,
      };
    }

    if (item.statTotal > 0 && item.statTotal < 60) {
      reasons.push("Low stat total.");
    }
  }

  const bestDuplicateScore = bestDuplicateScores.get(getDuplicateKey(item));
  if (bestDuplicateScore != null && bestDuplicateScore - score >= 45) {
    reasons.push("Lower-scoring duplicate of the same item.");
  }

  if (item.gearTier != null && item.gearTier <= 2) {
    reasons.push("Lower gear tier than current chase gear.");
  }

  if (reasons.length >= 2) {
    return {
      action: "delete-candidate",
      confidence: "low",
      itemId: item.id,
      reasons,
      score,
    };
  }

  return {
    action: reasons.length > 0 ? "review" : "save",
    confidence: reasons.length > 0 ? "medium" : "low",
    itemId: item.id,
    reasons: reasons.length > 0 ? reasons : ["No cleanup risk detected."],
    score,
  };
}

export function evaluateVaultItems(
  items: readonly NormalizedDestinyItem[],
  tagMap: ItemTagMap = {},
): VaultRecommendation[] {
  const bestDuplicateScores = getDuplicateBestScores([...items]);

  return items.map((item) =>
    evaluateVaultItem({
      bestDuplicateScores,
      item,
      tags: tagMap[item.id] ?? [],
    }),
  );
}
