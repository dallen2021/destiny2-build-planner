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
  Lock,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sword,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getArmorTierSummary,
  getCommandEquippedItems,
  getCommandGearSlots,
  getCommandStageMetrics,
  getCommandSetSummaries,
  selectCommandInspectItem,
} from "@/lib/destiny/command";
import type {
  CharacterSummary,
  DestinyInventoryApiPayload,
  NormalizedDestinyItem,
} from "@/lib/destiny/inventory";
import { isItemMasterworked } from "@/lib/destiny/presentation";
import { ITEM_TAGS, type ItemTag } from "@/lib/destiny/tags";

import { D2BrandLockup } from "./brand-logo";
import {
  bungieImage,
  ItemIcon,
  ItemPlugDetails,
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

function getStagePowerLabel(item: NormalizedDestinyItem) {
  if (item.power != null) {
    return String(item.power);
  }

  if (item.quantity > 1) {
    return `x${item.quantity}`;
  }

  return "--";
}

function getStageTier(item: NormalizedDestinyItem) {
  const tier = item.kind === "weapon"
    ? (item.weaponTier ?? item.gearTier)
    : item.gearTier;

  return tier != null && tier > 0 ? tier : null;
}

function getSelectedStageSide({
  inspectedItem,
  leftItems,
  rightItems,
}: {
  inspectedItem: NormalizedDestinyItem | null;
  leftItems: readonly NormalizedDestinyItem[];
  rightItems: readonly NormalizedDestinyItem[];
}): "left" | "right" | "none" {
  if (!inspectedItem) {
    return "none";
  }

  if (leftItems.some((item) => item.id === inspectedItem.id)) {
    return "left";
  }

  if (rightItems.some((item) => item.id === inspectedItem.id)) {
    return "right";
  }

  return "none";
}

function CommandStageItemNode({
  item,
  onOpen,
  selected,
  side,
}: {
  item: NormalizedDestinyItem;
  onOpen: (item: NormalizedDestinyItem) => void;
  selected: boolean;
  side: "left" | "right";
}) {
  const damageIcon = bungieImage(item.damageType.icon);
  const watermarkIcon = bungieImage(
    item.iconLayers.featuredWatermark ??
      item.iconLayers.ornamentWatermark ??
      item.iconLayers.watermark,
  );
  const tier = getStageTier(item);
  const hasMasterwork = isItemMasterworked(item);

  return (
    <button
      aria-label={`${item.slot.name}: ${item.name}${hasMasterwork ? ", masterworked" : ""}`}
      aria-pressed={selected}
      className="d2-stage-item-node"
      data-kind={item.kind}
      data-masterworked={hasMasterwork}
      data-rarity={item.rarity ?? "unknown"}
      data-side={side}
      onClick={() => onOpen(item)}
      type="button"
    >
      <span className="d2-stage-node-icon">
        <ItemIcon item={item} size={58} />
        {watermarkIcon ? (
          <Image
            alt=""
            className="d2-stage-node-watermark"
            height={58}
            src={watermarkIcon}
            width={58}
          />
        ) : null}
        {hasMasterwork ? (
          <span className="d2-stage-masterwork-frame" aria-hidden="true" />
        ) : null}
        {damageIcon ? (
          <Image
            alt=""
            className="d2-stage-node-damage"
            height={18}
            src={damageIcon}
            width={18}
          />
        ) : null}
        <span className="d2-stage-node-flags">
          {item.state.locked ? <Lock aria-label="Locked" /> : null}
          {item.state.crafted ? <Sparkles aria-label="Crafted" /> : null}
          {item.state.enhanced ? <Zap aria-label="Enhanced" /> : null}
        </span>
      </span>
      <span className="d2-stage-node-copy">
        <small>{item.slot.name}</small>
        <strong>{item.name}</strong>
        <span className="d2-stage-node-meta">
          <b>{getStagePowerLabel(item)}</b>
          {tier != null ? <em>T{tier}</em> : null}
        </span>
        {tier != null ? (
          <span
            aria-label={`Tier ${tier}`}
            className="d2-stage-tier-pips"
          >
            {Array.from({ length: Math.min(tier, 5) }).map((_, index) => (
              <i key={index} />
            ))}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function CommandStageConnectors({
  activeSide,
}: {
  activeSide: "left" | "right" | "none";
}) {
  return (
    <div
      aria-hidden="true"
      className="d2-stage-connectors"
      data-active-side={activeSide}
    >
      <span className="d2-stage-connector d2-stage-connector-left" />
      <span className="d2-stage-connector d2-stage-connector-right" />
      <span className="d2-stage-connector-core" />
    </div>
  );
}

function CommandGuardianSilhouette({
  guardianClass,
  power,
}: {
  guardianClass: string;
  power: number | null | undefined;
}) {
  return (
    <div
      aria-hidden="true"
      className="d2-stage-guardian"
      data-class={guardianClass}
    >
      <span className="d2-stage-aura" />
      <span className="d2-stage-floor" />
      <span className="d2-stage-cloak" />
      <span className="d2-stage-head" />
      <span className="d2-stage-shoulders" />
      <span className="d2-stage-core" />
      <span className="d2-stage-belt" />
      <span className="d2-stage-legs" />
      <span className="d2-stage-class-accent" />
      <span className="d2-stage-caption">
        <small>{guardianClass}</small>
        <strong>{power ?? "----"}</strong>
      </span>
    </div>
  );
}

function CommandStageFooter({
  character,
  equippedItems,
}: {
  character: CharacterSummary | null;
  equippedItems: readonly NormalizedDestinyItem[];
}) {
  const metrics = getCommandStageMetrics({
    characterPower: character?.light,
    equippedItems,
  });
  const metricItems = [
    { label: "Power", value: metrics.power ?? "----" },
    { label: "Weapons", value: `${metrics.weaponCount}/3` },
    { label: "Armor", value: `${metrics.armorCount}/5` },
    {
      label: "Avg Tier",
      value:
        metrics.averageArmorTier == null
          ? "--"
          : `T${metrics.averageArmorTier}`,
    },
    { label: "Exotic", value: metrics.exoticCount },
  ];

  return (
    <dl className="d2-stage-footer" aria-label="Equipped loadout metrics">
      {metricItems.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
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
  const selectedSide = getSelectedStageSide({
    inspectedItem,
    leftItems,
    rightItems,
  });
  const guardianClass = character?.className ?? "Guardian";

  return (
    <section
      aria-label="Guardian command stage"
      className="d2-command-stage"
      data-class={guardianClass}
      data-selected-side={selectedSide}
    >
      <div className="d2-stage-ring" aria-hidden="true" />
      <div className="d2-stage-lines" aria-hidden="true" />
      <CommandStageConnectors activeSide={selectedSide} />
      <div className="d2-stage-loadout-nodes d2-stage-loadout-nodes-left">
        {leftItems.map((item) => (
          <CommandStageItemNode
            item={item}
            key={item.id}
            onOpen={onOpen}
            selected={inspectedItem?.id === item.id}
            side="left"
          />
        ))}
      </div>
      <CommandGuardianSilhouette
        guardianClass={guardianClass}
        power={character?.light}
      />
      <div className="d2-stage-loadout-nodes d2-stage-loadout-nodes-right">
        {rightItems.map((item) => (
          <CommandStageItemNode
            item={item}
            key={item.id}
            onOpen={onOpen}
            selected={inspectedItem?.id === item.id}
            side="right"
          />
        ))}
      </div>
      <CommandStageFooter character={character} equippedItems={equippedItems} />
    </section>
  );
}

function CommandItemInspector({ item }: { item: NormalizedDestinyItem | null }) {
  const damageIcon = item ? bungieImage(item.damageType.icon) : null;

  return (
    <aside
      className="d2-command-inspector"
      data-kind={item?.kind ?? "none"}
      data-rarity={item?.rarity ?? "unknown"}
    >
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
          <ItemPlugDetails item={item} />
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
