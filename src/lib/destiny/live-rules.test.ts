import { describe, expect, it } from "vitest";

import {
  ARMOR_STAT_TOTAL_RULES,
  ARMOR_TIER_RULES,
  DESTINY_RULE_SOURCE_VERSION,
  getArmorTierScore,
  isArmorTierReady,
  isArmorTierSaveCandidate,
  isLowArmorTierCleanupSignal,
} from "./live-rules";

describe("live Destiny rules", () => {
  it("records the official Monument of Triumph source baseline", () => {
    expect(DESTINY_RULE_SOURCE_VERSION.label).toContain("Monument of Triumph");
    expect(DESTINY_RULE_SOURCE_VERSION.sources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          publishedAt: "2026-06-04T18:00:00Z",
          url: "https://www.bungie.net/7/en/News/Article/twid_06_04_2026",
        }),
        expect.objectContaining({
          publishedAt: "2026-06-04T16:00:00Z",
          url: "https://www.bungie.net/7/en/News/Article/dev_insights_abilities_armor_preview",
        }),
      ]),
    );
  });

  it("centralizes conservative armor tier thresholds", () => {
    expect(ARMOR_TIER_RULES.maxTier).toBe(5);
    expect(isArmorTierReady(3)).toBe(false);
    expect(isArmorTierReady(4)).toBe(true);
    expect(isArmorTierReady(5)).toBe(true);
    expect(isArmorTierReady(null)).toBe(false);

    expect(isArmorTierSaveCandidate(4)).toBe(false);
    expect(isArmorTierSaveCandidate(5)).toBe(true);

    expect(isLowArmorTierCleanupSignal(2)).toBe(true);
    expect(isLowArmorTierCleanupSignal(3)).toBe(false);
    expect(isLowArmorTierCleanupSignal(undefined)).toBe(false);
  });

  it("clamps tier scoring so unknown or future tiers do not explode cleanup scores", () => {
    expect(getArmorTierScore(null)).toBe(0);
    expect(getArmorTierScore(-1)).toBe(0);
    expect(getArmorTierScore(1)).toBe(80);
    expect(getArmorTierScore(5)).toBe(400);
    expect(getArmorTierScore(6)).toBe(400);
  });

  it("keeps armor stat total thresholds named for future tuning", () => {
    expect(ARMOR_STAT_TOTAL_RULES.highArmorStatTotal).toBe(75);
    expect(ARMOR_STAT_TOTAL_RULES.lowArmorStatTotal).toBe(60);
  });
});
