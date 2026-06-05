# Monument Of Triumph Rules Audit

Generated: 2026-06-05

This document turns the final pre-launch Bungie updates into implementation
tasks. Treat it as a moving audit, not permanent game truth. Manifest fields and
live profile payloads stay the source of truth once Monument of Triumph ships.

## Official Sources

- This Week In Destiny - 06/04/2026
  - URL: https://www.bungie.net/7/en/News/Article/twid_06_04_2026
  - Published: 2026-06-04T18:00:00Z
  - Verified implication: Monument of Triumph is the next major launch beat,
    dated for June 9, 2026 in the article copy.
- Dev Insights - Abilities & Armor Preview
  - URL: https://www.bungie.net/7/en/News/Article/dev_insights_abilities_armor_preview
  - Published: 2026-06-04T16:00:00Z
  - Verified implication: this is the armor/abilities rules baseline for
    Monument of Triumph and the final pre-launch Dev Insights article.
- Dev Insights - Weapons, Artifacts, & Focusing Preview
  - URL: https://www.bungie.net/7/en/News/article/dev_insights_weapons_artifacts_focusing_preview
  - Published: 2026-05-29T15:00:00Z
  - Verified implication: weapon tier upgrading, Tier 5 weapon benefits, and
    Tier 5 cosmetic treatment must be represented without fabricating extra perk
    choices.

## Immediate Product Implications

- Keep Armor 3.0 stat labels in UI: Weapons, Health, Class, Grenade, Super, and
  Melee. Do not regress to Mobility, Resilience, Recovery, Discipline,
  Intellect, or Strength unless showing raw legacy manifest data in a developer
  diagnostic.
- Centralize volatile tier thresholds in `src/lib/destiny/live-rules.ts`.
  Current conservative thresholds are UI/rules defaults only:
  - Tier 4+ counts as command-stage ready.
  - Tier 5 is a save candidate.
  - Tier 2 or below is a cleanup signal only when another reason also exists.
  - Vault Clean remains advisory and never destructive.
- Armor set bonuses and armor archetypes must come from sockets/plugs/manifest
  metadata where possible. Do not create a parallel hard-coded set list unless a
  temporary migration table is required and covered by tests.
- Weapon tile and inspector presentation must distinguish:
  - base icon
  - watermark/season or source icon
  - ornament/appearance icon data
  - tier pips
  - masterwork state/border
  - selected plugs vs available/reusable plugs
- Weapon perk grouping should match Destiny mental models:
  Barrel, Magazine, Trait 1, Trait 2, Origin Trait, then mods and intrinsics.
- Armor inspection should use Armor Mods, energy, armor tier, set bonuses, and
  Armor 3.0 stat labels. Do not label armor sockets as weapon-style perks.

## Implementation Queue

- P0: Keep the live rule constants tested and imported by optimizer,
  command-stage, and vault-clean logic.
- P0: Build one shared Destiny item tile component used by Command, Inventory,
  Vault Clean, and inspectors so tier pips, source marks, ornament indicators,
  and masterwork borders cannot drift page to page.
- P0: Expand normalized socket data enough to identify selected weapon plugs in
  the Bungie order: Barrel, Magazine, Trait 1, Trait 2, Origin Trait.
- P0: Fix armor icon selection so ornament sockets do not replace the actual
  armor icon unless the Bungie payload explicitly provides an equipped
  appearance override.
- P1: Add rule metadata to optimizer results explaining which Monument source or
  manifest field informed each recommendation.
- P1: Add manifest-backed armor archetype and set-bonus display once the live
  manifest exposes stable names, sockets, and plug relationships.
- P1: Store a generated article/body snapshot once Bungie's content API body
  endpoint is reliable. Current source metadata is verified from official URLs
  and RSS entries.

## Do Not Hard-Code Yet

- Exact armor archetype scoring weights.
- Exact optimizer breakpoints for ability cooldowns after the new stat ceiling.
- Exact Tier 5 cosmetic rendering beyond generic pips/border treatments.
- Activity-specific artifact/focusing rules.
- Any dismantle/delete automation.

## Code Touchpoints

- Rules baseline: `src/lib/destiny/live-rules.ts`
- Inventory normalization: `src/lib/destiny/inventory.ts`
- Tile presentation: `src/lib/destiny/presentation.ts`
- Command stage selectors: `src/lib/destiny/command.ts`
- Vault Clean recommendations: `src/lib/destiny/vault-clean.ts`
- Optimizer ranking: `src/lib/destiny/optimizer.ts`
