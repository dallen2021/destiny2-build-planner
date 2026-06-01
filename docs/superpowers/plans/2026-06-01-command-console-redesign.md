# Command Console Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/` Command page into the approved premium command console, including logo C, a stronger app shell, a 2.5D Guardian stage, an inline item inspector, and a compact utility panel strip.

**Architecture:** Add command-specific pure selectors under `src/lib/destiny/command.ts`, then move the Command UI into `src/components/destiny/command-center.tsx` so the existing Inventory and Vault Clean surfaces stay stable. Extract only the shared visual primitives needed by both files into `src/components/destiny/item-presentation.tsx`; keep broad inventory behavior unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS in `src/app/globals.css`, Vitest for pure data helpers, lucide-react for navigation/action icons, existing Bungie normalized inventory types.

---

## File Structure

- Create `src/lib/destiny/command.ts`: pure, testable selectors for Command page equipped gear, default inspector item, slot groupings, tier summary, set summaries, and vault pressure.
- Create `src/lib/destiny/command.test.ts`: unit tests for command selectors using small normalized item fixtures.
- Create `src/components/destiny/item-presentation.tsx`: shared `bungieImage`, `ItemIcon`, `StatBars`, `PlugList`, and `TagPillList` primitives used by Command and the existing workspaces.
- Create `src/components/destiny/brand-logo.tsx`: project-native SVG implementation of logo direction C plus a compact mark variant.
- Create `src/components/destiny/command-center.tsx`: Command-only React component tree.
- Modify `src/components/destiny/workspaces.tsx`: remove the old `CommandCenter` export, import shared presentation primitives, and preserve Inventory/Vault Clean behavior.
- Modify `src/app/page.tsx`: import `CommandCenter` from the new command component file.
- Modify `src/app/globals.css`: replace and extend Command page styles while preserving Inventory/Vault Clean selectors.
- Modify no auth, Bungie token, optimizer, inventory action, or Vercel config files in this slice.

---

### Task 1: Add Command Data Selectors

**Files:**
- Create: `src/lib/destiny/command.ts`
- Create: `src/lib/destiny/command.test.ts`

- [ ] **Step 1: Write tests for command item selection and summaries**

Create `src/lib/destiny/command.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import {
  getArmorTierSummary,
  getCommandEquippedItems,
  getCommandGearSlots,
  getCommandSetSummaries,
  getVaultPressure,
  selectCommandInspectItem,
} from "./command";
import type { NormalizedDestinyItem } from "./inventory";

function makeItem(
  overrides: Partial<NormalizedDestinyItem> & Pick<NormalizedDestinyItem, "id">,
): NormalizedDestinyItem {
  return {
    bucket: { hash: 1, name: "Bucket", scope: "character" },
    bucketHash: 1,
    characterId: "char1",
    className: "Hunter",
    classType: 1,
    damageType: { color: null, hash: null, icon: null, name: null },
    description: null,
    gearTier: null,
    icon: null,
    iconLayers: {
      background: null,
      featuredWatermark: null,
      ornamentWatermark: null,
      overlay: null,
      shelvedWatermark: null,
      watermark: null,
    },
    isEquipped: true,
    itemHash: 1,
    itemInstanceId: overrides.id,
    kind: "armor",
    location: "equipped",
    masterwork: null,
    name: overrides.id,
    ornament: null,
    perks: [],
    power: 1810,
    quantity: 1,
    rarity: "Legendary",
    setData: null,
    slot: { hash: 1, name: "Helmet", order: 10 },
    slotName: "Helmet",
    sockets: [],
    statTotal: 0,
    stats: [],
    state: {
      adept: false,
      canEquip: true,
      canTransfer: true,
      crafted: false,
      enhanced: false,
      locked: false,
      masterworked: false,
      tracked: false,
    },
    tier: "Legendary",
    weaponTier: null,
    ...overrides,
  };
}

describe("command selectors", () => {
  it("returns equipped gear for the selected character sorted by slot order", () => {
    const equipped = getCommandEquippedItems(
      [
        makeItem({ id: "class-banner", kind: "unknown", slot: { hash: 3, name: "Clan Banners", order: 1 } }),
        makeItem({ id: "energy", kind: "weapon", slot: { hash: 2, name: "Energy Weapons", order: 20 } }),
        makeItem({ id: "helmet", kind: "armor", slot: { hash: 1, name: "Helmet", order: 10 } }),
        makeItem({ id: "other-character", characterId: "char2", kind: "armor" }),
      ],
      "char1",
    );

    expect(equipped.map((item) => item.id)).toEqual([
      "class-banner",
      "helmet",
      "energy",
    ]);
  });

  it("selects only weapons or armor for the default Command inspector", () => {
    const banner = makeItem({ id: "banner", kind: "unknown", slot: { hash: 8, name: "Clan Banners", order: 1 } });
    const helmet = makeItem({ id: "helmet", kind: "armor", slot: { hash: 1, name: "Helmet", order: 10 } });

    expect(selectCommandInspectItem([banner, helmet], null)?.id).toBe("helmet");
    expect(selectCommandInspectItem([banner, helmet], helmet)?.id).toBe("helmet");
    expect(selectCommandInspectItem([banner], null)).toBeNull();
  });

  it("groups equipped command slots by weapon, armor, ghost, and other", () => {
    const slots = getCommandGearSlots([
      makeItem({ id: "kinetic", kind: "weapon", slot: { hash: 1, name: "Kinetic Weapons", order: 10 } }),
      makeItem({ id: "ghost", kind: "ghost", slot: { hash: 2, name: "Ghost", order: 40 } }),
      makeItem({ id: "helmet", kind: "armor", slot: { hash: 3, name: "Helmet", order: 50 } }),
      makeItem({ id: "banner", kind: "unknown", slot: { hash: 4, name: "Clan Banners", order: 90 } }),
    ]);

    expect(slots.weapons.map((item) => item.id)).toEqual(["kinetic"]);
    expect(slots.armor.map((item) => item.id)).toEqual(["helmet"]);
    expect(slots.ghost?.id).toBe("ghost");
    expect(slots.other.map((item) => item.id)).toEqual(["banner"]);
  });

  it("summarizes armor tiers and vault pressure conservatively", () => {
    const summary = getArmorTierSummary([
      makeItem({ id: "helmet", gearTier: 5 }),
      makeItem({ id: "arms", gearTier: 4 }),
      makeItem({ id: "chest", gearTier: 2 }),
      makeItem({ id: "weapon", kind: "weapon", gearTier: 5 }),
    ]);

    expect(summary.averageTier).toBe(3.7);
    expect(summary.readyPieces).toBe(2);
    expect(summary.byTier).toMatchObject({ 2: 1, 4: 1, 5: 1 });

    expect(getVaultPressure({ itemCount: 640, capacity: 700 })).toBe(91);
    expect(getVaultPressure({ itemCount: 0, capacity: 0 })).toBeNull();
  });

  it("summarizes set data only when manifest-backed set names exist", () => {
    const summaries = getCommandSetSummaries([
      makeItem({
        id: "set-helmet",
        setData: { itemCount: 2, itemHashes: [1, 2], name: "Rapid Charge" },
      }),
      makeItem({
        id: "set-arms",
        setData: { itemCount: 2, itemHashes: [1, 2], name: "Rapid Charge" },
      }),
      makeItem({
        id: "unknown-set",
        setData: { itemCount: 2, itemHashes: [3, 4], name: null },
      }),
    ]);

    expect(summaries).toEqual([
      { activePieces: 2, requiredPieces: 2, name: "Rapid Charge" },
    ]);
  });
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

Run:

```bash
npm test -- src/lib/destiny/command.test.ts
```

Expected: fail because `src/lib/destiny/command.ts` does not exist yet.

- [ ] **Step 3: Implement command selectors**

Create `src/lib/destiny/command.ts`:

```ts
import type { NormalizedDestinyItem } from "./inventory";

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

export function getCommandEquippedItems(
  items: readonly NormalizedDestinyItem[],
  selectedCharacterId: string | null,
): NormalizedDestinyItem[] {
  return items
    .filter(
      (item) =>
        item.location === "equipped" &&
        item.characterId === selectedCharacterId,
    )
    .sort((first, second) => first.slot.order - second.slot.order);
}

export function isCommandInspectableItem(item: NormalizedDestinyItem): boolean {
  return item.kind === "weapon" || item.kind === "armor";
}

export function selectCommandInspectItem(
  equippedItems: readonly NormalizedDestinyItem[],
  requestedItem: NormalizedDestinyItem | null,
): NormalizedDestinyItem | null {
  const inspectableItems = equippedItems.filter(isCommandInspectableItem);

  if (
    requestedItem &&
    inspectableItems.some((item) => item.id === requestedItem.id)
  ) {
    return requestedItem;
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
  const tieredPieces = armorPieces.filter((item) => item.gearTier != null);
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
    readyPieces: armorPieces.filter((item) => (item.gearTier ?? 0) >= 4).length,
    totalPieces: armorPieces.length,
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

  return Math.min(100, Math.round((itemCount / capacity) * 100));
}
```

- [ ] **Step 4: Run selector tests**

Run:

```bash
npm test -- src/lib/destiny/command.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit selector layer**

```bash
git add src/lib/destiny/command.ts src/lib/destiny/command.test.ts
git commit -m "feat: add command page selectors"
```

---

### Task 2: Extract Shared Item Presentation Primitives

**Files:**
- Create: `src/components/destiny/item-presentation.tsx`
- Modify: `src/components/destiny/workspaces.tsx`

- [ ] **Step 1: Create shared presentation primitives**

Create `src/components/destiny/item-presentation.tsx` by moving the existing `bungieImage`, `ItemIcon`, `StatBars`, and `PlugList` implementations out of `workspaces.tsx`. Keep this exact public surface:

```tsx
"use client";

import Image from "next/image";

import type {
  NormalizedDestinyItem,
  NormalizedPerk,
  NormalizedStat,
} from "@/lib/destiny/inventory";

const ARMOR_STAT_NAMES = [
  "Weapons",
  "Health",
  "Class",
  "Grenade",
  "Super",
  "Melee",
] as const;

export function bungieImage(path: string | null): string | null {
  if (!path) {
    return null;
  }

  return path.startsWith("http") ? path : `https://www.bungie.net${path}`;
}

export function ItemIcon({
  item,
  size = 56,
}: {
  item: NormalizedDestinyItem;
  size?: number;
}) {
  const iconUrl = bungieImage(item.icon);

  if (!iconUrl) {
    return <span className="d2-item-icon-fallback" aria-hidden="true" />;
  }

  return (
    <Image
      alt=""
      className="d2-item-icon"
      height={size}
      src={iconUrl}
      width={size}
    />
  );
}

export function StatBars({
  itemKind,
  stats,
}: {
  itemKind: NormalizedDestinyItem["kind"];
  stats: readonly NormalizedStat[];
}) {
  if (stats.length === 0) {
    return <p className="d2-muted-note">No stat data returned for this item.</p>;
  }

  return (
    <div className="d2-stat-bars">
      {stats.map((stat) => {
        const maxValue =
          itemKind === "armor" && ARMOR_STAT_NAMES.includes(stat.name as never)
            ? 200
            : 100;
        const percent = Math.min(100, Math.round((stat.value / maxValue) * 100));

        return (
          <div className="d2-stat-bar" key={`${stat.hash}:${stat.name}`}>
            <span>{stat.name}</span>
            <strong>{stat.value}</strong>
            <i>
              <b style={{ width: `${percent}%` }} />
            </i>
          </div>
        );
      })}
    </div>
  );
}

export function PlugList({ perks }: { perks: readonly NormalizedPerk[] }) {
  if (perks.length === 0) {
    return <p className="d2-muted-note">No visible perks or traits returned.</p>;
  }

  return (
    <div className="d2-perk-grid">
      {perks.map((perk) => {
        const icon = bungieImage(perk.icon);

        return (
          <div className="d2-perk-row" key={`${perk.index}:${perk.plugHash}`}>
            {icon ? (
              <Image alt="" height={32} src={icon} width={32} />
            ) : (
              <span />
            )}
            <div>
              <strong>{perk.name}</strong>
              {perk.description ? <small>{perk.description}</small> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Update workspace imports**

Modify `src/components/destiny/workspaces.tsx`:

```tsx
import {
  bungieImage,
  ItemIcon,
  PlugList,
  StatBars,
} from "./item-presentation";
```

Remove the local `ARMOR_STAT_NAMES`, `bungieImage`, `ItemIcon`, `StatBars`, and
`PlugList` definitions from `workspaces.tsx`.

- [ ] **Step 3: Verify no duplicate definitions remain**

Run:

```bash
rg -n "function bungieImage|function ItemIcon|function StatBars|function PlugList|const ARMOR_STAT_NAMES" src/components/destiny
```

Expected: each symbol appears only in `item-presentation.tsx`, except import usages in `workspaces.tsx`.

- [ ] **Step 4: Run tests and lint**

Run:

```bash
npm test
npm run lint
```

Expected: both pass.

- [ ] **Step 5: Commit presentation extraction**

```bash
git add src/components/destiny/item-presentation.tsx src/components/destiny/workspaces.tsx
git commit -m "refactor: share destiny item presentation"
```

---

### Task 3: Add Project-Native Logo Components

**Files:**
- Create: `src/components/destiny/brand-logo.tsx`

- [ ] **Step 1: Create SVG logo mark components**

Create `src/components/destiny/brand-logo.tsx`:

```tsx
import type { SVGProps } from "react";

export function D2Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        d="M32 5 46 13 55 29 50 48 32 59 14 48 9 29 18 13 32 5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20 20 32 12 44 20 40 42 32 50 24 42 20 20Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M24 27 32 22 40 27 37 35H27l-3-8Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M25 35h14M28 42h8M32 22v28M17 31h10M37 31h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M28 31h8"
        stroke="var(--d2-logo-visor, #63d7ff)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function D2BrandLockup() {
  return (
    <div className="d2-brand-lockup">
      <D2Mark className="d2-brand-mark" />
      <div>
        <strong>D2 Build Planner</strong>
        <small>Build. Optimize. Conquer.</small>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the component compiles**

Run:

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 3: Commit logo component**

```bash
git add src/components/destiny/brand-logo.tsx
git commit -m "feat: add command brand mark"
```

---

### Task 4: Move Command Page Into a Dedicated Component

**Files:**
- Create: `src/components/destiny/command-center.tsx`
- Modify: `src/components/destiny/workspaces.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the command component file**

Create `src/components/destiny/command-center.tsx` with the current Command behavior ported from `workspaces.tsx` and wired to the new command selectors. The first version should compile before visual polish:

```tsx
"use client";

import Link from "next/link";
import {
  Archive,
  Bell,
  Boxes,
  Check,
  CircleHelp,
  Crosshair,
  Database,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Sword,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  getArmorTierSummary,
  getCommandEquippedItems,
  getCommandGearSlots,
  getCommandSetSummaries,
  getVaultPressure,
  selectCommandInspectItem,
} from "@/lib/destiny/command";
import type {
  CharacterSummary,
  DestinyInventoryApiPayload,
  NormalizedDestinyItem,
} from "@/lib/destiny/inventory";
import { ITEM_TAGS } from "@/lib/destiny/tags";

import { D2BrandLockup } from "./brand-logo";
import {
  bungieImage,
  ItemIcon,
  PlugList,
  StatBars,
} from "./item-presentation";
import { useDestinyInventory } from "./use-destiny-inventory";

const NAV_ITEMS = [
  { href: "/", icon: Crosshair, label: "Command" },
  { href: "/inventory", icon: Boxes, label: "Inventory" },
  { href: "/optimizer", icon: Sword, label: "Optimizer" },
  { href: "/vault-clean", icon: Archive, label: "Vault Clean" },
] as const;

const TAG_LABELS = {
  build: "Build",
  infusion: "Infusion",
  keep: "Keep",
  peak: "Peak",
  review: "Review",
  slop: "Slop",
} as const;

function getSelectedCharacter(
  characters: readonly CharacterSummary[],
  selectedCharacterId: string | null,
) {
  return (
    characters.find((character) => character.id === selectedCharacterId) ??
    characters[0] ??
    null
  );
}

function useSelectedCharacter(data: DestinyInventoryApiPayload | null) {
  const [requestedCharacterId, setRequestedCharacterId] = useState<string | null>(
    null,
  );
  const selectedCharacterId =
    requestedCharacterId &&
    data?.characters.some((character) => character.id === requestedCharacterId)
      ? requestedCharacterId
      : (data?.characters[0]?.id ?? null);

  return [selectedCharacterId, setRequestedCharacterId] as const;
}

function CommandNav() {
  return (
    <aside className="d2-console-rail">
      <D2BrandLockup />
      <nav className="d2-console-nav" aria-label="Primary">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
          <Link
            className="d2-console-link"
            data-active={href === "/"}
            href={href}
            key={href}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="d2-guardian-status">
        <ShieldCheck aria-hidden="true" />
        <div>
          <strong>Guardian</strong>
          <small>Online</small>
        </div>
      </div>
    </aside>
  );
}

function CommandToolbar({ reload }: { reload: () => void }) {
  return (
    <header className="d2-console-toolbar">
      <div className="d2-search-shell">
        <Search aria-hidden="true" />
        <span>Search builds, items, perks...</span>
      </div>
      <div className="d2-command-toolbar-actions">
        <Button aria-label="Notifications" size="icon" type="button" variant="ghost">
          <Bell aria-hidden="true" />
        </Button>
        <Button aria-label="Help" size="icon" type="button" variant="ghost">
          <CircleHelp aria-hidden="true" />
        </Button>
        <Button aria-label="Settings" size="icon" type="button" variant="ghost">
          <Settings aria-hidden="true" />
        </Button>
        <Button onClick={reload} type="button" variant="outline">
          <RefreshCcw data-icon="inline-start" />
          Refresh
        </Button>
      </div>
    </header>
  );
}
```

Complete `command-center.tsx` in Task 5 before running the build. The file must
export `CommandCenter` and include `CommandCharacterCards`, `GuardianStage`,
`CommandItemInspector`, and `CommandUtilityPanels` from the exact snippets below.

- [ ] **Step 2: Remove old Command export from workspaces**

In `src/components/destiny/workspaces.tsx`, remove the entire existing
`export function CommandCenter()` declaration and its matched closing brace. The
next top-level declaration after removal should be `function InventorySectionHeader`.
Keep `InventoryWorkspace` and `VaultCleanWorkspace` exported.

- [ ] **Step 3: Update the home page import**

Modify `src/app/page.tsx`:

```tsx
import { CommandCenter } from "@/components/destiny/command-center";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <CommandCenter />;
}
```

- [ ] **Step 4: Run TypeScript through the build**

Run:

```bash
npm run build
```

Expected: pass, or fail only on missing command subcomponents that will be added in Task 5.

---

### Task 5: Implement Stage, Inspector, and Utility Panels

**Files:**
- Modify: `src/components/destiny/command-center.tsx`

- [ ] **Step 1: Add character cards**

Add `CommandCharacterCards` to `command-center.tsx`:

```tsx
function CommandCharacterCards({
  characters,
  items,
  selectedCharacterId,
  setSelectedCharacterId,
}: {
  characters: readonly CharacterSummary[];
  items: readonly NormalizedDestinyItem[];
  selectedCharacterId: string | null;
  setSelectedCharacterId: (characterId: string) => void;
}) {
  return (
    <div className="d2-character-command-row" aria-label="Characters">
      {characters.map((character) => {
        const selected = character.id === selectedCharacterId;
        const emblemUrl = bungieImage(character.emblemBackgroundPath);
        const carriedCount = items.filter(
          (item) =>
            item.characterId === character.id &&
            (item.location === "carried" || item.location === "equipped"),
        ).length;
        const vaultPressure = getVaultPressure({ capacity: 700, itemCount: carriedCount });

        return (
          <button
            aria-pressed={selected}
            className="d2-command-character-card"
            key={character.id}
            onClick={() => setSelectedCharacterId(character.id)}
            type="button"
          >
            {emblemUrl ? (
              <img alt="" className="d2-character-emblem" src={emblemUrl} />
            ) : (
              <span className="d2-character-emblem d2-character-emblem-empty" />
            )}
            <span className="d2-class-mark" data-class={character.className}>
              {character.className.slice(0, 1)}
            </span>
            <span className="d2-character-card-copy">
              <strong>{character.className}</strong>
              <small>{character.light ?? "-"} Power</small>
            </span>
            <span className="d2-character-card-meta">
              <small>{carriedCount} gear</small>
              <small>{vaultPressure == null ? "Vault -" : `Vault ${vaultPressure}%`}</small>
              {selected ? <Check aria-hidden="true" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Add stage gear rows**

Add `GuardianStage` with slot rails and connector lines:

```tsx
function GearRail({
  items,
  side,
  onOpen,
  selectedItem,
}: {
  items: readonly NormalizedDestinyItem[];
  onOpen: (item: NormalizedDestinyItem) => void;
  selectedItem: NormalizedDestinyItem | null;
  side: "left" | "right";
}) {
  return (
    <div className={`d2-stage-gear-rail d2-stage-gear-rail-${side}`}>
      {items.map((item) => (
        <button
          aria-pressed={selectedItem?.id === item.id}
          key={item.id}
          onClick={() => onOpen(item)}
          type="button"
        >
          <ItemIcon item={item} />
          <span>
            <small>{item.slot.name}</small>
            <strong>{item.name}</strong>
          </span>
        </button>
      ))}
    </div>
  );
}

function GuardianStage({
  character,
  equippedItems,
  inspectedItem,
  onOpen,
}: {
  character: CharacterSummary | null;
  equippedItems: readonly NormalizedDestinyItem[];
  inspectedItem: NormalizedDestinyItem | null;
  onOpen: (item: NormalizedDestinyItem) => void;
}) {
  const slots = getCommandGearSlots(equippedItems);
  const leftItems = [...slots.weapons.slice(0, 3), ...(slots.ghost ? [slots.ghost] : [])];
  const rightItems = slots.armor.slice(0, 5);

  return (
    <section className="d2-command-stage" aria-label="Guardian command stage">
      <div className="d2-stage-ring" aria-hidden="true" />
      <div className="d2-stage-lines" aria-hidden="true" />
      <GearRail items={leftItems} onOpen={onOpen} selectedItem={inspectedItem} side="left" />
      <div className="d2-stage-guardian" aria-hidden="true">
        <span className="d2-stage-head" />
        <span className="d2-stage-shoulders" />
        <span className="d2-stage-core" />
        <span className="d2-stage-cloak" />
        <span className="d2-stage-legs" />
      </div>
      <GearRail items={rightItems} onOpen={onOpen} selectedItem={inspectedItem} side="right" />
      <div className="d2-stage-caption">
        <span>{character?.className ?? "Guardian"}</span>
        <strong>{character?.light ?? "----"}</strong>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add inline inspector**

Add `CommandItemInspector`:

```tsx
function CommandItemInspector({ item }: { item: NormalizedDestinyItem | null }) {
  const damageIcon = item ? bungieImage(item.damageType.icon) : null;

  return (
    <aside className="d2-command-inspector">
      {item ? (
        <>
          <div className="d2-command-inspector-hero" data-kind={item.kind}>
            <ItemIcon item={item} size={84} />
            <div>
              <span>{item.slot.name}</span>
              <strong>{item.power ?? item.quantity}</strong>
              <small>
                {item.rarity ?? "Unknown rarity"} / {item.location}
              </small>
              {damageIcon ? (
                <span className="d2-damage-line">
                  <img alt="" src={damageIcon} />
                  {item.damageType.name}
                </span>
              ) : null}
            </div>
          </div>
          <section className="d2-command-inspector-section">
            <h3>Stats</h3>
            <StatBars itemKind={item.kind} stats={item.stats} />
          </section>
          <section className="d2-command-inspector-section">
            <h3>Perks</h3>
            <PlugList perks={item.perks.slice(0, 5)} />
          </section>
        </>
      ) : (
        <p className="d2-muted-note">No equipped gear returned yet.</p>
      )}
    </aside>
  );
}
```

- [ ] **Step 4: Add utility panels**

Add `CommandUtilityPanels`:

```tsx
function CommandPanel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="d2-command-panel">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function CommandUtilityPanels({
  character,
  equippedItems,
}: {
  character: CharacterSummary | null;
  equippedItems: readonly NormalizedDestinyItem[];
}) {
  const tierSummary = getArmorTierSummary(equippedItems);
  const setSummaries = getCommandSetSummaries(equippedItems);

  return (
    <div className="d2-bottom-panels">
      <CommandPanel title="Recent Loadouts">
        <div className="d2-loadout-list">
          {["Nightfall", "Raid", "PvP"].map((name) => (
            <span key={name}>
              <strong>{name}</strong>
              <small>Local draft</small>
            </span>
          ))}
        </div>
      </CommandPanel>
      <CommandPanel title="Stat Overview">
        <StatBars itemKind="armor" stats={character?.stats ?? []} />
      </CommandPanel>
      <CommandPanel title="Armor Tiers">
        <div className="d2-tier-summary">
          {[1, 2, 3, 4, 5].map((tier) => (
            <span data-active={(tierSummary.byTier[tier] ?? 0) > 0} key={tier}>
              T{tier}
            </span>
          ))}
        </div>
        <strong>
          {tierSummary.averageTier == null ? "No tier data" : `T${tierSummary.averageTier} average`}
        </strong>
        <small>{tierSummary.readyPieces} ready pieces</small>
      </CommandPanel>
      <CommandPanel title="Set Bonuses">
        {setSummaries.length > 0 ? (
          <div className="d2-set-list">
            {setSummaries.slice(0, 3).map((set) => (
              <span key={set.name}>
                <strong>{set.name}</strong>
                <small>{set.activePieces} / {set.requiredPieces}</small>
              </span>
            ))}
          </div>
        ) : (
          <p className="d2-muted-note">No set bonus data found.</p>
        )}
      </CommandPanel>
      <CommandPanel title="Constraints">
        <div className="d2-constraint-list">
          <span>Exotics: 1 / 1</span>
          <span>Locked gear protected</span>
        </div>
      </CommandPanel>
      <CommandPanel title="Tags">
        <div className="d2-tag-cloud">
          {ITEM_TAGS.map((tag) => (
            <span key={tag}>{TAG_LABELS[tag]}</span>
          ))}
        </div>
      </CommandPanel>
    </div>
  );
}
```

- [ ] **Step 5: Wire exported CommandCenter**

Finish `CommandCenter` in `command-center.tsx`:

```tsx
export function CommandCenter() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const [inspectedItem, setInspectedItem] = useState<NormalizedDestinyItem | null>(null);
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const equippedItems = getCommandEquippedItems(
    data?.items ?? [],
    selectedCharacter?.id ?? null,
  );
  const selectedInspectItem = selectCommandInspectItem(equippedItems, inspectedItem);

  return (
    <div className="d2-command-console">
      <CommandNav />
      <section className="d2-console-main">
        <CommandToolbar reload={reload} />
        {isLoading ? <div className="d2-command-loading">Loading command data...</div> : null}
        {error ? <div className="d2-command-error">{error}</div> : null}
        {data ? (
          <>
            <div className="d2-console-title">
              <h1>Command / Character Select</h1>
              <p>Select a Guardian to inspect, optimize, and manage loadouts.</p>
            </div>
            <CommandCharacterCards
              characters={data.characters}
              items={data.items}
              selectedCharacterId={selectedCharacter?.id ?? null}
              setSelectedCharacterId={setSelectedCharacterId}
            />
            <div className="d2-command-actions">
              <Button asChild variant="outline"><Link href="/inventory">Open inventory</Link></Button>
              <Button asChild variant="outline"><Link href="/optimizer">Optimize build</Link></Button>
              <Button asChild variant="outline"><Link href="/vault-clean">Clean vault</Link></Button>
            </div>
            <div className="d2-stage-layout">
              <GuardianStage
                character={selectedCharacter}
                equippedItems={equippedItems}
                inspectedItem={selectedInspectItem}
                onOpen={setInspectedItem}
              />
              <CommandItemInspector item={selectedInspectItem} />
            </div>
            <CommandUtilityPanels character={selectedCharacter} equippedItems={equippedItems} />
          </>
        ) : null}
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Build for type safety**

Run:

```bash
npm run build
```

Expected: pass.

---

### Task 6: Replace Command Styling

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace command shell and navigation styles**

In `src/app/globals.css`, update the `.d2-command-console`, `.d2-console-rail`,
`.d2-brand-lockup`, `.d2-console-link`, `.d2-console-main`, and
`.d2-console-toolbar` blocks so they use the approved mock's compact dark/gold
surface:

```css
.d2-command-console {
  --d2-command-gold: #e2b960;
  --d2-command-gold-soft: #f5e5b7;
  --d2-command-blue: #63d7ff;
  --d2-command-purple: #b879ff;
  --d2-command-panel: rgba(5, 15, 23, 0.84);
  display: grid;
  grid-template-columns: 286px minmax(0, 1fr);
  min-height: 100vh;
  background:
    radial-gradient(circle at 52% 28%, rgba(60, 134, 160, 0.18), transparent 34%),
    linear-gradient(135deg, #06131d 0%, #03080d 58%, #010306 100%);
  color: #f3ead8;
}

.d2-console-rail {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(226, 185, 96, 0.16);
  background: linear-gradient(180deg, rgba(6, 18, 27, 0.98), rgba(2, 7, 11, 0.98));
  padding: 22px 16px;
}

.d2-brand-lockup {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 14px;
  align-items: center;
  margin-bottom: 34px;
  text-transform: uppercase;
}

.d2-brand-mark {
  width: 48px;
  color: var(--d2-command-gold);
  filter: drop-shadow(0 0 18px rgba(226, 185, 96, 0.22));
}

.d2-brand-lockup strong {
  display: block;
  color: var(--d2-command-gold-soft);
  font-size: 0.95rem;
  letter-spacing: 0.17em;
}

.d2-brand-lockup small {
  display: block;
  margin-top: 4px;
  color: rgba(243, 234, 216, 0.58);
  font-size: 0.64rem;
  letter-spacing: 0.2em;
}

.d2-console-nav {
  display: grid;
  gap: 9px;
}

.d2-console-link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0 14px;
  color: rgba(243, 234, 216, 0.72);
  text-decoration: none;
}

.d2-console-link svg {
  width: 19px;
  height: 19px;
}

.d2-console-link[data-active="true"] {
  border-color: rgba(226, 185, 96, 0.7);
  background: linear-gradient(90deg, rgba(226, 185, 96, 0.18), rgba(226, 185, 96, 0.03));
  box-shadow: inset -4px 0 0 rgba(226, 185, 96, 0.88), 0 0 24px rgba(226, 185, 96, 0.1);
  color: var(--d2-command-gold-soft);
}
```

- [ ] **Step 2: Add stage and inspector styles**

Add or replace the stage/inspector styles in `globals.css`:

```css
.d2-stage-layout {
  display: grid;
  grid-template-columns: minmax(620px, 1fr) 340px;
  gap: 16px;
}

.d2-command-stage {
  position: relative;
  min-height: 470px;
  overflow: hidden;
  border: 1px solid rgba(111, 151, 164, 0.2);
  border-radius: 8px;
  background:
    radial-gradient(circle at center, rgba(226, 185, 96, 0.1), transparent 32%),
    linear-gradient(180deg, rgba(7, 21, 32, 0.8), rgba(2, 7, 11, 0.9));
}

.d2-stage-lines {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(26deg, transparent 33%, rgba(226, 185, 96, 0.18) 33.2%, transparent 34%),
    linear-gradient(-26deg, transparent 33%, rgba(226, 185, 96, 0.18) 33.2%, transparent 34%);
  opacity: 0.36;
  pointer-events: none;
}

.d2-stage-gear-rail {
  position: absolute;
  top: 54px;
  z-index: 2;
  display: grid;
  gap: 11px;
  width: min(240px, 30%);
}

.d2-stage-gear-rail-left {
  left: 24px;
}

.d2-stage-gear-rail-right {
  right: 24px;
}

.d2-stage-gear-rail button {
  display: grid;
  grid-template-columns: 54px 1fr;
  align-items: center;
  gap: 11px;
  min-height: 68px;
  border: 1px solid rgba(226, 185, 96, 0.2);
  border-radius: 6px;
  background: rgba(3, 10, 15, 0.78);
  color: #f5ecd7;
  padding: 8px;
  text-align: left;
}

.d2-stage-gear-rail button[aria-pressed="true"] {
  border-color: rgba(245, 229, 183, 0.9);
  box-shadow: 0 0 0 1px rgba(226, 185, 96, 0.2), 0 0 24px rgba(226, 185, 96, 0.16);
}

.d2-command-inspector {
  display: grid;
  align-content: start;
  gap: 16px;
  border: 1px solid rgba(226, 185, 96, 0.44);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(8, 18, 25, 0.94), rgba(2, 7, 12, 0.94));
  padding: 16px;
}

.d2-command-inspector-hero {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 14px;
  align-items: center;
  border-bottom: 1px solid rgba(226, 185, 96, 0.18);
  padding-bottom: 16px;
}

.d2-command-inspector-hero span,
.d2-command-inspector-section h3 {
  color: var(--d2-command-gold);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.d2-command-inspector-hero strong {
  display: block;
  color: var(--d2-command-gold-soft);
  font-size: 2.45rem;
  line-height: 1;
  margin: 6px 0;
}
```

- [ ] **Step 3: Add responsive command rules**

Add responsive rules:

```css
@media (max-width: 1200px) {
  .d2-command-console {
    grid-template-columns: 230px minmax(0, 1fr);
  }

  .d2-stage-layout {
    grid-template-columns: 1fr;
  }

  .d2-command-inspector {
    min-height: 0;
  }
}

@media (max-width: 860px) {
  .d2-command-console {
    grid-template-columns: 1fr;
  }

  .d2-console-rail {
    position: static;
    border-right: 0;
    border-bottom: 1px solid rgba(226, 185, 96, 0.16);
  }

  .d2-console-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .d2-character-command-row,
  .d2-bottom-panels {
    grid-template-columns: 1fr;
  }

  .d2-command-stage {
    min-height: auto;
    padding: 18px;
  }

  .d2-stage-gear-rail {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    width: 100%;
  }
}
```

- [ ] **Step 4: Run visual lint and build**

Run:

```bash
npm run lint
npm run build
```

Expected: both pass.

- [ ] **Step 5: Commit Command UI implementation**

```bash
git add src/app/page.tsx src/app/globals.css src/components/destiny/command-center.tsx src/components/destiny/workspaces.tsx
git commit -m "feat: redesign command console"
```

---

### Task 7: Browser Verification And Final Polish

**Files:**
- Modify only files touched by earlier tasks if verification finds visual or responsive issues.

- [ ] **Step 1: Run full local verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 2: Verify desktop Command flow in Browser**

Use the Browser plugin on the deployed dev URL after pushing, or local dev server before pushing.

Required checks:

- Page URL is `/`.
- Page title is `D2 Build Planner`.
- First meaningful screen renders.
- No framework overlay is visible.
- Console warnings/errors are empty or explained.
- Clicking a stage gear row changes the inline inspector.
- `document.querySelectorAll('[role="dialog"]').length` remains `0` after Command stage clicks.

- [ ] **Step 3: Verify responsive layouts**

Use Browser viewport checks around:

- 1440 desktop
- 1024 tablet
- 768 narrow tablet
- 390 mobile

At each size verify:

- no horizontal overflow
- nav remains usable
- class cards do not clip text
- stage rows do not overlap guardian caption
- inspector stats/perks remain readable
- bottom panels wrap without nested card clutter

- [ ] **Step 4: Commit polish fixes if needed**

If verification requires adjustments:

```bash
git add src/app/globals.css src/components/destiny/command-center.tsx
git commit -m "polish: tune command console responsiveness"
```

Skip this commit only when no polish edits are needed.

- [ ] **Step 5: Push to feature branch and dev**

```bash
git push origin codex/destiny-aware-inventory
git push origin HEAD:dev
```

- [ ] **Step 6: Confirm Vercel dev deployment**

Use the Vercel deployment list and confirm the newest `dev` deployment for the pushed commit is `READY`.

- [ ] **Step 7: Final browser smoke on Vercel dev**

Open `https://dev.d2buildplanner.com/` and repeat the core interaction:

- load Command page
- click a character card
- click a stage item
- confirm inline inspector updates
- confirm no drawer opens
- confirm no console errors

---

## Self-Review

- Spec coverage: logo C, shell, toolbar, character cards, stage, inline
  inspector, utility panels, data rules, responsive behavior, and verification
  are all mapped to tasks.
- Scope control: Inventory/Vault Clean behavior is preserved except for shared
  presentation primitive imports.
- Type consistency: command helpers consume `NormalizedDestinyItem` and
  `CharacterSummary` from the existing inventory model.
- Test coverage: pure command selectors are unit-tested; rendered behavior is
  verified through Browser after implementation.
