export const DESTINY_RULE_SOURCE_VERSION = {
  generatedAt: "2026-06-05",
  label: "Monument of Triumph pre-release baseline",
  sources: [
    {
      publishedAt: "2026-06-04T18:00:00Z",
      title: "This Week In Destiny - 06/04/2026",
      url: "https://www.bungie.net/7/en/News/Article/twid_06_04_2026",
    },
    {
      publishedAt: "2026-06-04T16:00:00Z",
      title: "Dev Insights - Abilities & Armor Preview",
      url: "https://www.bungie.net/7/en/News/Article/dev_insights_abilities_armor_preview",
    },
    {
      publishedAt: "2026-05-29T15:00:00Z",
      title: "Dev Insights - Weapons, Artifacts, & Focusing Preview",
      url: "https://www.bungie.net/7/en/News/article/dev_insights_weapons_artifacts_focusing_preview",
    },
  ],
} as const;

export const ARMOR_TIER_RULES = {
  commandReadyMinimumTier: 4,
  lowCleanupSignalMaximumTier: 2,
  maxTier: 5,
  saveCandidateMinimumTier: 5,
  scoreWeight: 80,
} as const;

export const ARMOR_STAT_TOTAL_RULES = {
  highArmorStatTotal: 75,
  lowArmorStatTotal: 60,
} as const;

function normalizeTier(tier: number | null | undefined): number | null {
  if (tier == null || !Number.isFinite(tier) || tier <= 0) {
    return null;
  }

  return Math.min(Math.floor(tier), ARMOR_TIER_RULES.maxTier);
}

export function isArmorTierReady(tier: number | null | undefined): boolean {
  const normalizedTier = normalizeTier(tier);
  return (
    normalizedTier != null &&
    normalizedTier >= ARMOR_TIER_RULES.commandReadyMinimumTier
  );
}

export function isArmorTierSaveCandidate(
  tier: number | null | undefined,
): boolean {
  const normalizedTier = normalizeTier(tier);
  return (
    normalizedTier != null &&
    normalizedTier >= ARMOR_TIER_RULES.saveCandidateMinimumTier
  );
}

export function isLowArmorTierCleanupSignal(
  tier: number | null | undefined,
): boolean {
  const normalizedTier = normalizeTier(tier);
  return (
    normalizedTier != null &&
    normalizedTier <= ARMOR_TIER_RULES.lowCleanupSignalMaximumTier
  );
}

export function getArmorTierScore(tier: number | null | undefined): number {
  return (normalizeTier(tier) ?? 0) * ARMOR_TIER_RULES.scoreWeight;
}
