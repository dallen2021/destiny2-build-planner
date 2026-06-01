# D2 Build Planner Command Console Redesign

## Status

Design approved for planning. The chosen direction is the Command Console pass
with logo refinement option C from the helmet-crest exploration.

This spec is for the next implementation slice on `dev`. It does not cover the
full DIM-grade inventory rebuild, optimizer math, or real 3D guardian rendering.

## Goal

Make the Command page feel like the product's signature first screen: a compact,
premium Destiny-aware command surface with strong brand identity, class-aware
guardian selection, a heroic gear stage, and an in-place item inspector.

The page should move closer to the accepted mockup without pretending we have a
full 3D Guardian renderer. The immediate visual target is a polished 2.5D
command console that uses real Bungie inventory data where available.

## Visual Direction

- Deep blue-black command center background with disciplined gold accents.
- Compact, uppercase UI typography with deliberate label spacing.
- Dark glass panels, fine gold borders, and restrained cyan/purple class accents.
- Fewer generic cards; more rails, rows, inspectors, and purpose-built panels.
- Stronger visual hierarchy: brand, character cards, guardian stage, item
  inspector, then utility panels.
- No official Bungie, Destiny, class, faction, or weapon manufacturer logo
  copying.

## Logo Direction

Use the selected imagegen variant C as the logo direction:

- Original angular helmet-crest / command-glyph hybrid.
- Gold and ivory primary mark with optional tiny cyan visor accent.
- Abstract enough to belong to D2 Build Planner rather than any official game.
- Rebuild as project-native SVG before shipping in the app.
- Produce three forms:
  - sidebar/full lockup: mark plus `D2 Build Planner`
  - standalone app mark for collapsed nav and social avatar
  - tiny favicon-safe mark with simplified geometry

The generated image is a concept reference only. It should not be shipped as the
final UI logo unless used temporarily during exploration.

## Command Page Layout

### App Shell

- Left rail remains the primary navigation on desktop.
- Replace text-only rail rows with icon + label navigation.
- Brand block uses the new logo direction, product name, and compact tagline.
- Add lower account/status affordance matching the mock's "Guardian online"
  area when user/session data is available.
- Keep mobile responsive behavior simple: top compact shell or stacked nav, no
  horizontal overflow.

### Top Bar

- Search remains visual-only for this pass unless existing search behavior is
  already wired.
- Right side should include compact icon buttons for future notifications, help,
  settings, and a guardian selector.
- Use icons consistently, not plain text badges.

### Character Cards

- Keep Hunter, Titan, and Warlock as the page's primary entry point.
- Use real character class, light/power, equipped/carried count, and class-aware
  accent color.
- Add armor tier/vault-pressure style summaries only when data is available or
  can be conservatively derived.
- Selected card must be obvious with a gold border and check state.

### Guardian Stage

- Upgrade the current 2.5D sketch into a polished stage:
  - central guardian silhouette with more armor-like segmentation
  - circular star-map/radar rings behind the guardian
  - left gear rail for kinetic, energy, power, and ghost
  - right gear rail for helmet, arms, chest, legs, and class item
  - subtle connector lines from gear rows toward the guardian
  - selected gear row highlight
- Use real equipped item icons from Bungie.
- Do not fake a real 3D model. The existing documented 3D boundary still
  applies.

### Inline Item Inspector

- The Command page uses only the in-place right inspector. It must not open the
  inventory drawer when stage gear is clicked.
- The inspector should display:
  - item icon, slot, name, rarity, location/equipped state, power or quantity
  - large power number for gear
  - damage type or energy/armor signals when available
  - real weapon stat names or Armor 3.0 stat names
  - visible perks/mods/traits with icons and descriptions
  - lock/equip/vault actions only when we intentionally enable live actions here
- Non-gear items must not be the default inspector item on Command.

### Bottom Panels

Replace the current three-panel lower area with a mock-inspired utility strip:

- Recent loadouts: local/static shell for now unless real loadouts are added.
- Stat overview: selected character stats using Armor 3.0 naming.
- Armor tiers: average tier, pieces by tier, ready count.
- Set bonuses: show only if real set data is present; otherwise use a
  conservative empty state that explains no set bonus data was found.
- Constraints: exotic and build constraints shell.
- Tags: local tag chips and manage affordance.

Panels should be compact, aligned, and useful rather than decorative filler.

## Data Rules

- Use normalized inventory data already returned from `/api/destiny/inventory`.
- Do not add stale hard-coded Destiny stat names.
- Prefer manifest-backed display names for stats, perks, sockets, buckets, and
  item types.
- Keep server-only token handling unchanged.
- No destructive actions or dismantle automation.

## Component Boundaries

Refactor the current large workspace file only as much as needed to make the
Command page maintainable.

Target components:

- `CommandCenter`
- `CommandShell`
- `CommandNav`
- `CommandToolbar`
- `CommandCharacterCards`
- `GuardianStage`
- `CommandItemInspector`
- `CommandUtilityPanels`
- small shared stat/perk/icon helpers when they are already used elsewhere

Avoid a broad rewrite of Inventory, Vault Clean, or item action internals in this
slice.

## Responsive Behavior

- Desktop: left rail, main command workspace, right inspector, bottom panels.
- Tablet: keep stage and inspector visible, allow bottom panels to wrap.
- Mobile: stack character selector, stage, inspector, and panels; stage gear
  rails may collapse into compact rows.
- No horizontal scrolling, clipped buttons, or overlapping text.
- Respect reduced motion.

## Verification

Before pushing implementation:

- `npm test`
- `npm run lint`
- `npm run build`
- Browser verification on `dev` or local equivalent:
  - `/` loads with no framework overlay
  - clicking stage gear updates the inline inspector
  - no Command-page drawer opens from stage clicks
  - console has no relevant errors/warnings
  - desktop visual comparison against the accepted mock
  - responsive checks around 1440, 1024, 768, and 390 widths

## Out Of Scope

- Real Three.js Guardian rendering.
- Full DIM-grade inventory transfer UX.
- Server-side tag persistence.
- Loadout save/import/export.
- Optimizer algorithm changes.
- Shipping generated bitmap logo as the final production mark.

## Open Implementation Notes

- The logo should be recreated in SVG from the selected C silhouette during
  implementation.
- If the generated mark feels too close to protected Destiny iconography after
  vectorization, simplify it further into a more abstract command crest.
- The first implementation should prioritize visual structure and data-correct
  display over adding new item actions to Command.
