"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  Bell,
  Boxes,
  Check,
  CircleHelp,
  Crosshair,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Sword,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getArmorTierSummary,
  getCommandEquippedItems,
  getCommandGearSlots,
  getCommandSetSummaries,
  selectCommandInspectItem,
} from "@/lib/destiny/command";
import type {
  CharacterSummary,
  DestinyInventoryApiPayload,
  NormalizedDestinyItem,
} from "@/lib/destiny/inventory";
import { ITEM_TAGS, type ItemTag } from "@/lib/destiny/tags";

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

const TAG_LABELS: Record<ItemTag, string> = {
  build: "Build",
  infusion: "Infusion",
  keep: "Keep",
  peak: "Peak",
  review: "Review",
  slop: "Slop",
};

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
            data-active={label === "Command"}
            href={href}
            key={href}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="d2-rail-account">
        <span className="d2-rail-avatar" aria-hidden="true">
          D2
        </span>
        <div>
          <strong>Guardian</strong>
          <small>Online</small>
        </div>
      </div>
    </aside>
  );
}

function CommandToolbar({
  isLoading,
  reload,
  selectedCharacter,
}: {
  isLoading: boolean;
  reload: () => void;
  selectedCharacter: CharacterSummary | null;
}) {
  return (
    <header className="d2-console-toolbar">
      <div className="d2-search-shell">
        <Search aria-hidden="true" />
        <span>Search builds, items, perks...</span>
        <kbd>Ctrl K</kbd>
      </div>
      <div className="d2-toolbar-actions" aria-label="Command actions">
        <Button aria-label="Notifications" size="icon" type="button" variant="ghost">
          <Bell aria-hidden="true" />
        </Button>
        <Button aria-label="Help" size="icon" type="button" variant="ghost">
          <CircleHelp aria-hidden="true" />
        </Button>
        <Button aria-label="Settings" size="icon" type="button" variant="ghost">
          <Settings aria-hidden="true" />
        </Button>
        <Button
          disabled={isLoading}
          onClick={reload}
          size="icon"
          type="button"
          variant="outline"
        >
          <RefreshCcw aria-hidden="true" />
          <span className="sr-only">Refresh</span>
        </Button>
        <div className="d2-guardian-select">
          <span data-class={selectedCharacter?.className ?? "Guardian"}>
            {selectedCharacter?.className.slice(0, 1) ?? "G"}
          </span>
          <strong>{selectedCharacter?.className ?? "Guardian"}</strong>
        </div>
      </div>
    </header>
  );
}

function CommandLoading() {
  return (
    <div className="d2-loading-grid" aria-label="Loading command data">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="d2-loading-card" key={index} />
      ))}
    </div>
  );
}

function CommandError({
  error,
  reload,
}: {
  error: string;
  reload: () => void;
}) {
  const needsAuth = error.toLowerCase().includes("authentication");

  return (
    <section className="d2-alert-panel" aria-live="polite">
      <h2>{needsAuth ? "Bungie connection required" : "Inventory unavailable"}</h2>
      <p>{error}</p>
      <div className="d2-alert-actions">
        {needsAuth ? (
          <Button asChild>
            <Link href="/api/auth/login">
              <ShieldCheck data-icon="inline-start" />
              Connect Bungie
            </Link>
          </Button>
        ) : null}
        <Button onClick={reload} type="button" variant="outline">
          <RefreshCcw data-icon="inline-start" />
          Retry
        </Button>
      </div>
    </section>
  );
}

function CommandReauthBanner({ data }: { data: DestinyInventoryApiPayload }) {
  if (!data.requiresMoveEquipReauth) {
    return null;
  }

  return (
    <section className="d2-alert-panel d2-reauth-panel" aria-live="polite">
      <h2>Item actions need Bungie reauthorization</h2>
      <p>
        Drag/drop, equip, lock, and postmaster actions require the
        MoveEquipDestinyItems scope. Reading inventory still works.
      </p>
      <div className="d2-alert-actions">
        <Button asChild>
          <Link href="/api/auth/login">Reauthorize Bungie</Link>
        </Button>
      </div>
    </section>
  );
}

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
  if (characters.length === 0) {
    return null;
  }

  return (
    <div className="d2-character-command-row" aria-label="Characters">
      {characters.map((character) => {
        const emblemUrl = bungieImage(character.emblemBackgroundPath);
        const selected = character.id === selectedCharacterId;
        const carriedCount = items.filter(
          (item) =>
            item.characterId === character.id &&
            (item.location === "carried" || item.location === "equipped"),
        ).length;
        return (
          <button
            aria-pressed={selected}
            className="d2-command-character-card"
            key={character.id}
            onClick={() => setSelectedCharacterId(character.id)}
            type="button"
          >
            {emblemUrl ? (
              <Image
                alt=""
                className="d2-character-emblem"
                height={96}
                src={emblemUrl}
                width={420}
              />
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
              <small>Character load</small>
              {selected ? <Check aria-hidden="true" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GearRail({
  items,
  onOpen,
  selectedItem,
  side,
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
  const leftItems = [
    ...slots.weapons.slice(0, 3),
    ...(slots.ghost ? [slots.ghost] : []),
  ];
  const rightItems = slots.armor.slice(0, 5);

  return (
    <section className="d2-command-stage" aria-label="Guardian command stage">
      <div className="d2-stage-ring" aria-hidden="true" />
      <div className="d2-stage-lines" aria-hidden="true" />
      <GearRail
        items={leftItems}
        onOpen={onOpen}
        selectedItem={inspectedItem}
        side="left"
      />
      <div className="d2-stage-guardian" aria-hidden="true">
        <span className="d2-stage-head" />
        <span className="d2-stage-shoulders" />
        <span className="d2-stage-core" />
        <span className="d2-stage-cloak" />
        <span className="d2-stage-legs" />
      </div>
      <GearRail
        items={rightItems}
        onOpen={onOpen}
        selectedItem={inspectedItem}
        side="right"
      />
      <div className="d2-stage-caption">
        <span>{character?.className ?? "Guardian"}</span>
        <strong>{character?.light ?? "----"}</strong>
      </div>
    </section>
  );
}

function CommandItemInspector({ item }: { item: NormalizedDestinyItem | null }) {
  const damageIcon = item ? bungieImage(item.damageType.icon) : null;

  return (
    <aside className="d2-command-inspector">
      {item ? (
        <>
          <header className="d2-command-inspector-title">
            <span>{item.kind}</span>
            <h2>{item.name}</h2>
            <small>
              {item.rarity ?? "Unknown rarity"} {item.slot.name}
            </small>
          </header>
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
                  <Image alt="" height={18} src={damageIcon} width={18} />
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
          <section className="d2-command-inspector-section">
            <h3>Item State</h3>
            <div className="d2-inspector-meta">
              <span>{item.masterwork ? item.masterwork.name : "No masterwork"}</span>
              <span>{item.ornament ? item.ornament.name : "No ornament"}</span>
              <span>{item.state.locked ? "Locked" : "Unlocked"}</span>
              <span>{item.state.crafted ? "Crafted" : "Not crafted"}</span>
            </div>
          </section>
          <div className="d2-command-inspector-actions">
            <Button disabled type="button" variant="outline">
              Lock
            </Button>
            <Button disabled type="button">
              Equip
            </Button>
          </div>
        </>
      ) : (
        <p className="d2-muted-note">No equipped weapon or armor returned yet.</p>
      )}
    </aside>
  );
}

function CommandPanel({
  children,
  title,
}: {
  children: ReactNode;
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
          {tierSummary.averageTier == null
            ? "No tier data"
            : `T${tierSummary.averageTier} average`}
        </strong>
        <small>{tierSummary.readyPieces} ready pieces</small>
      </CommandPanel>
      <CommandPanel title="Set Bonuses">
        {setSummaries.length > 0 ? (
          <div className="d2-set-list">
            {setSummaries.slice(0, 3).map((set) => (
              <span key={set.name}>
                <strong>{set.name}</strong>
                <small>
                  {set.activePieces} / {set.requiredPieces}
                </small>
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

export function CommandCenter() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const [inspectedItem, setInspectedItem] = useState<NormalizedDestinyItem | null>(
    null,
  );
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const equippedItems = getCommandEquippedItems(
    data?.items ?? [],
    selectedCharacter?.id ?? null,
  );
  const selectedInspectItem = selectCommandInspectItem(
    equippedItems,
    inspectedItem,
  );

  return (
    <div className="d2-command-console">
      <CommandNav />
      <section className="d2-console-main">
        <CommandToolbar
          isLoading={isLoading}
          reload={reload}
          selectedCharacter={selectedCharacter}
        />
        {isLoading ? <CommandLoading /> : null}
        {error ? <CommandError error={error} reload={reload} /> : null}
        {data ? (
          <>
            <CommandReauthBanner data={data} />
            <div className="d2-console-title">
              <h1>Command / Character Select</h1>
              <p>Select a Guardian to inspect, optimize, and manage loadouts.</p>
            </div>
            <CommandCharacterCards
              characters={data.characters}
              items={data.items}
              selectedCharacterId={selectedCharacter?.id ?? null}
              setSelectedCharacterId={(characterId) => {
                setInspectedItem(null);
                setSelectedCharacterId(characterId);
              }}
            />
            <div className="d2-command-actions">
              <Button asChild variant="outline">
                <Link href="/inventory">Open inventory</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/optimizer">Optimize build</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/vault-clean">Clean vault</Link>
              </Button>
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
            <CommandUtilityPanels
              character={selectedCharacter}
              equippedItems={equippedItems}
            />
          </>
        ) : null}
      </section>
    </div>
  );
}
