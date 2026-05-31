"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  Boxes,
  Brain,
  CheckCircle2,
  ChevronRight,
  Database,
  Eraser,
  Filter,
  Gauge,
  Layers3,
  RefreshCcw,
  Search,
  ShieldCheck,
  Target,
  Trash2,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type {
  CharacterSummary,
  DestinyClassType,
  DestinyInventoryApiPayload,
  NormalizedDestinyItem,
} from "@/lib/destiny/inventory";
import { rankArmorForGoal } from "@/lib/destiny/optimizer";
import { ITEM_TAGS, type ItemTag } from "@/lib/destiny/tags";
import {
  evaluateVaultItems,
  type VaultRecommendation,
  type VaultRecommendationAction,
} from "@/lib/destiny/vault-clean";

import { useDestinyInventory } from "./use-destiny-inventory";
import { useItemTags } from "./use-item-tags";

const CLASS_TYPE_BY_NAME: Record<string, DestinyClassType> = {
  Hunter: 1,
  Titan: 0,
  Warlock: 2,
};

const STAT_NAMES = [
  "Mobility",
  "Resilience",
  "Recovery",
  "Discipline",
  "Intellect",
  "Strength",
] as const;

const TAG_LABELS: Record<ItemTag, string> = {
  build: "Build",
  infusion: "Infusion",
  keep: "Keep",
  peak: "Peak",
  review: "Review",
  slop: "Slop",
};

const RECOMMENDATION_COPY: Record<VaultRecommendationAction, string> = {
  "delete-candidate": "Delete candidate",
  review: "Review",
  save: "Save",
};

function bungieImage(path: string | null): string | null {
  if (!path) {
    return null;
  }

  return path.startsWith("http") ? path : `https://www.bungie.net${path}`;
}

function formatDefinitionSource(
  source: DestinyInventoryApiPayload["definitionSource"],
) {
  return source === "manifest+entity-fallback"
    ? "manifest + fallback"
    : "manifest";
}

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

function getEquippedItems(
  items: readonly NormalizedDestinyItem[],
  selectedCharacterId: string | null,
) {
  return items.filter(
    (item) => item.isEquipped && item.characterId === selectedCharacterId,
  );
}

function getStatLine(item: NormalizedDestinyItem): string {
  const entries = Object.entries(item.stats);
  if (entries.length === 0) {
    return item.kind === "weapon" ? `${item.perks.length} visible perks` : "No roll";
  }

  return entries.map(([name, value]) => `${name} ${value}`).join(" / ");
}

function ItemIcon({ item }: { item: NormalizedDestinyItem }) {
  const iconUrl = bungieImage(item.icon);

  if (!iconUrl) {
    return <span className="d2-item-icon-fallback" aria-hidden="true" />;
  }

  return (
    <Image
      alt=""
      className="d2-item-icon"
      height={56}
      src={iconUrl}
      width={56}
    />
  );
}

function WorkspaceLoading() {
  return (
    <div className="d2-loading-grid" aria-label="Loading">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="d2-loading-card" key={index} />
      ))}
    </div>
  );
}

function WorkspaceError({
  error,
  reload,
}: {
  error: string;
  reload: () => void;
}) {
  const needsAuth = error.toLowerCase().includes("authentication");

  return (
    <Alert aria-live="polite" className="d2-alert-panel">
      <AlertTriangle data-icon="inline-start" />
      <AlertTitle>{needsAuth ? "Bungie connection required" : "Inventory unavailable"}</AlertTitle>
      <AlertDescription>
        {error}
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
      </AlertDescription>
    </Alert>
  );
}

function ManifestStatus({ data }: { data: DestinyInventoryApiPayload }) {
  return (
    <div className="d2-status-row">
      <span>
        <CheckCircle2 aria-hidden="true" />
        {data.items.length} gear items
      </span>
      <span>
        <Database aria-hidden="true" />
        Manifest {data.manifestVersion} / {data.manifestLanguage}
      </span>
      <span>{formatDefinitionSource(data.definitionSource)}</span>
      {data.manifestMissingDefinitionCount > 0 ? (
        <span>{data.manifestMissingDefinitionCount} missing definitions</span>
      ) : null}
    </div>
  );
}

function CharacterSelector({
  characters,
  selectedCharacterId,
  setSelectedCharacterId,
}: {
  characters: readonly CharacterSummary[];
  selectedCharacterId: string | null;
  setSelectedCharacterId: (characterId: string) => void;
}) {
  if (characters.length === 0) {
    return null;
  }

  return (
    <div className="d2-character-grid" aria-label="Characters">
      {characters.map((character) => {
        const emblemUrl = bungieImage(character.emblemBackgroundPath);
        const selected = character.id === selectedCharacterId;

        return (
          <button
            aria-pressed={selected}
            className="d2-character-card"
            key={character.id}
            onClick={() => setSelectedCharacterId(character.id)}
            type="button"
          >
            {emblemUrl ? (
              <Image
                alt=""
                className="d2-character-emblem"
                height={72}
                src={emblemUrl}
                width={320}
              />
            ) : (
              <span className="d2-character-emblem d2-character-emblem-empty" />
            )}
            <span>
              <strong>{character.className}</strong>
              <small>{character.light ?? "-"} Power</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GuardianStage({
  character,
  equippedItems,
}: {
  character: CharacterSummary | null;
  equippedItems: readonly NormalizedDestinyItem[];
}) {
  const armorCount = equippedItems.filter((item) => item.kind === "armor").length;
  const weaponCount = equippedItems.filter((item) => item.kind === "weapon").length;

  return (
    <section className="d2-guardian-stage" aria-label="Guardian stage">
      <div className="d2-stage-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="d2-guardian-silhouette" aria-hidden="true">
        <span className="d2-guardian-head" />
        <span className="d2-guardian-body" />
        <span className="d2-guardian-cape" />
      </div>
      <div className="d2-stage-readout">
        <span>{character?.className ?? "Guardian"}</span>
        <strong>{character?.light ?? "----"}</strong>
        <small>
          {weaponCount} weapons / {armorCount} armor equipped
        </small>
      </div>
    </section>
  );
}

function TagBar({
  itemId,
  tags,
  toggleTag,
}: {
  itemId: string;
  tags: readonly ItemTag[];
  toggleTag: (itemId: string, tag: ItemTag) => void;
}) {
  return (
    <div className="d2-tag-bar">
      {ITEM_TAGS.map((tag) => (
        <button
          aria-pressed={tags.includes(tag)}
          key={tag}
          onClick={(event) => {
            event.stopPropagation();
            toggleTag(itemId, tag);
          }}
          type="button"
        >
          {TAG_LABELS[tag]}
        </button>
      ))}
    </div>
  );
}

function ItemCard({
  item,
  onOpen,
  recommendation,
  tags,
  toggleTag,
}: {
  item: NormalizedDestinyItem;
  onOpen: (item: NormalizedDestinyItem) => void;
  recommendation?: VaultRecommendation;
  tags: readonly ItemTag[];
  toggleTag: (itemId: string, tag: ItemTag) => void;
}) {
  return (
    <article className="d2-item-card">
      <button className="d2-item-main" onClick={() => onOpen(item)} type="button">
        <ItemIcon item={item} />
        <span className="d2-item-copy">
          <span>
            <strong>{item.name}</strong>
            <small>
              {item.slot} / {item.tier ?? "Unknown tier"}
            </small>
          </span>
          <span className="d2-item-meta">
            <Badge variant="secondary">{item.kind}</Badge>
            {item.gearTier != null ? (
              <Badge variant="outline">T{item.gearTier}</Badge>
            ) : null}
            {item.isEquipped ? <Badge>Equipped</Badge> : null}
            {recommendation ? (
              <Badge data-action={recommendation.action} variant="outline">
                {RECOMMENDATION_COPY[recommendation.action]}
              </Badge>
            ) : null}
          </span>
        </span>
        <ChevronRight aria-hidden="true" />
      </button>
      <p>{getStatLine(item)}</p>
      <TagBar itemId={item.id} tags={tags} toggleTag={toggleTag} />
    </article>
  );
}

function ItemDetailSheet({
  item,
  onOpenChange,
  recommendation,
  tags,
  toggleTag,
}: {
  item: NormalizedDestinyItem | null;
  onOpenChange: (open: boolean) => void;
  recommendation?: VaultRecommendation;
  tags: readonly ItemTag[];
  toggleTag: (itemId: string, tag: ItemTag) => void;
}) {
  return (
    <Sheet open={Boolean(item)} onOpenChange={onOpenChange}>
      <SheetContent className="d2-item-sheet">
        {item ? (
          <>
            <SheetHeader>
              <SheetTitle>{item.name}</SheetTitle>
              <SheetDescription>
                {item.slot} / {item.tier ?? "Unknown tier"} /{" "}
                {item.power ?? "No power"}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="d2-item-sheet-scroll">
              <div className="d2-sheet-hero">
                <ItemIcon item={item} />
                <div>
                  <span>{item.kind}</span>
                  <strong>{item.gearTier != null ? `Tier ${item.gearTier}` : "Tier unknown"}</strong>
                  <small>{item.className}</small>
                </div>
              </div>

              <Separator />

              <section className="d2-sheet-section">
                <h3>Tags</h3>
                <TagBar itemId={item.id} tags={tags} toggleTag={toggleTag} />
              </section>

              {recommendation ? (
                <section className="d2-sheet-section">
                  <h3>{RECOMMENDATION_COPY[recommendation.action]}</h3>
                  <ul>
                    {recommendation.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="d2-sheet-section">
                <h3>Stats</h3>
                <div className="d2-stat-grid">
                  {Object.entries(item.stats).length > 0 ? (
                    Object.entries(item.stats).map(([statName, value]) => (
                      <span key={statName}>
                        <small>{statName}</small>
                        <strong>{value}</strong>
                      </span>
                    ))
                  ) : (
                    <p>No stat data returned for this item.</p>
                  )}
                </div>
              </section>

              <section className="d2-sheet-section">
                <h3>Sockets and perks</h3>
                <div className="d2-plug-list">
                  {item.perks.length > 0 ? (
                    item.perks.map((socket) => (
                      <span key={`${socket.index}:${socket.plugHash}`}>
                        {socket.name}
                      </span>
                    ))
                  ) : (
                    <p>No visible socket perks returned.</p>
                  )}
                </div>
              </section>
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
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

function useTagScope(data: DestinyInventoryApiPayload | null) {
  return data
    ? {
        membershipId: data.membershipId,
        membershipType: data.membershipType,
      }
    : null;
}

export function CommandCenter() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const equippedItems = getEquippedItems(data?.items ?? [], selectedCharacter?.id ?? null);

  return (
    <div className="d2-page-shell">
      <section className="d2-command-hero">
        <div className="d2-command-copy">
          <h1>D2 Build Planner</h1>
          <p>
            Build optimization, inventory triage, and vault cleanup for the new
            tiered gear era.
          </p>
          <div className="d2-hero-actions">
            <Button asChild size="lg">
              <Link href="/inventory">
                <Archive data-icon="inline-start" />
                Open inventory
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/optimizer">
                <Target data-icon="inline-start" />
                Optimize build
              </Link>
            </Button>
          </div>
        </div>
        <GuardianStage character={selectedCharacter} equippedItems={equippedItems} />
      </section>

      {isLoading ? <WorkspaceLoading /> : null}
      {error ? <WorkspaceError error={error} reload={reload} /> : null}

      {data ? (
        <>
          <ManifestStatus data={data} />
          <CharacterSelector
            characters={data.characters}
            selectedCharacterId={selectedCharacter?.id ?? null}
            setSelectedCharacterId={setSelectedCharacterId}
          />
          <section className="d2-command-grid">
            <Link className="d2-command-tile" href="/inventory">
              <Boxes aria-hidden="true" />
              <span>Inventory</span>
              <strong>{data.weapons.length} weapons / {data.armor.length} armor</strong>
            </Link>
            <Link className="d2-command-tile" href="/optimizer">
              <Brain aria-hidden="true" />
              <span>Optimizer</span>
              <strong>Class-aware armor goals</strong>
            </Link>
            <Link className="d2-command-tile" href="/vault-clean">
              <Eraser aria-hidden="true" />
              <span>Vault Clean</span>
              <strong>Explainable keep/delete lanes</strong>
            </Link>
          </section>
        </>
      ) : null}
    </div>
  );
}

export function InventoryWorkspace() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const { tagMap, toggleTag } = useItemTags(useTagScope(data));
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "armor" | "weapon">("all");
  const [slot, setSlot] = useState("all");
  const [selectedItem, setSelectedItem] = useState<NormalizedDestinyItem | null>(null);

  const recommendations = useMemo(
    () =>
      Object.fromEntries(
        evaluateVaultItems(data?.items ?? [], tagMap).map((recommendation) => [
          recommendation.itemId,
          recommendation,
        ]),
      ),
    [data?.items, tagMap],
  );

  const slots = useMemo(
    () => ["all", ...new Set((data?.items ?? []).map((item) => item.slot))],
    [data?.items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (data?.items ?? []).filter((item) => {
      const tags = tagMap[item.id] ?? [];
      const characterMatch =
        selectedCharacterId == null ||
        item.location === "vault" ||
        item.characterId === selectedCharacterId;
      const kindMatch = kind === "all" || item.kind === kind;
      const slotMatch = slot === "all" || item.slot === slot;
      const queryMatch =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.slot.toLowerCase().includes(normalizedQuery) ||
        item.className.toLowerCase().includes(normalizedQuery) ||
        tags.some((tag) => tag.includes(normalizedQuery));

      return characterMatch && kindMatch && slotMatch && queryMatch;
    });
  }, [data?.items, kind, query, selectedCharacterId, slot, tagMap]);

  return (
    <div className="d2-page-shell">
      <header className="d2-workspace-heading">
        <div>
          <h1>Inventory</h1>
          <p>Search, filter, inspect sockets, and tag everything that matters.</p>
        </div>
        <Button disabled={isLoading} onClick={reload} type="button" variant="outline">
          <RefreshCcw data-icon="inline-start" />
          Refresh
        </Button>
      </header>

      {isLoading ? <WorkspaceLoading /> : null}
      {error ? <WorkspaceError error={error} reload={reload} /> : null}

      {data ? (
        <>
          <ManifestStatus data={data} />
          <CharacterSelector
            characters={data.characters}
            selectedCharacterId={selectedCharacterId}
            setSelectedCharacterId={setSelectedCharacterId}
          />

          <section className="d2-inventory-layout">
            <aside className="d2-filter-rail">
              <div className="d2-filter-title">
                <Filter aria-hidden="true" />
                <span>Filters</span>
              </div>
              <Input
                aria-label="Search inventory"
                autoComplete="off"
                name="inventory-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search gear, tags, slots"
                type="search"
                value={query}
              />
              <Tabs
                onValueChange={(value) => setKind(value as typeof kind)}
                value={kind}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="weapon">Weapons</TabsTrigger>
                  <TabsTrigger value="armor">Armor</TabsTrigger>
                </TabsList>
              </Tabs>
              <ToggleGroup
                className="d2-slot-toggles"
                onValueChange={(value) => value && setSlot(value)}
                type="single"
                value={slot}
                variant="outline"
              >
                {slots.map((slotName) => (
                  <ToggleGroupItem key={slotName} value={slotName}>
                    {slotName === "all" ? "All slots" : slotName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </aside>

            <section className="d2-item-grid" aria-label="Inventory items">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ItemCard
                    item={item}
                    key={item.id}
                    onOpen={setSelectedItem}
                    recommendation={recommendations[item.id]}
                    tags={tagMap[item.id] ?? []}
                    toggleTag={toggleTag}
                  />
                ))
              ) : (
                <div className="d2-empty-panel">
                  <Search aria-hidden="true" />
                  <span>No gear matched this view.</span>
                </div>
              )}
            </section>
          </section>

          <ItemDetailSheet
            item={selectedItem}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedItem(null);
              }
            }}
            recommendation={selectedItem ? recommendations[selectedItem.id] : undefined}
            tags={selectedItem ? (tagMap[selectedItem.id] ?? []) : []}
            toggleTag={toggleTag}
          />
        </>
      ) : null}
    </div>
  );
}

export function VaultCleanWorkspace() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const { tagMap, toggleTag } = useItemTags(useTagScope(data));
  const [selectedItem, setSelectedItem] = useState<NormalizedDestinyItem | null>(null);

  const recommendations = useMemo(
    () => evaluateVaultItems(data?.items ?? [], tagMap),
    [data?.items, tagMap],
  );
  const recommendationsById = useMemo(
    () =>
      Object.fromEntries(
        recommendations.map((recommendation) => [
          recommendation.itemId,
          recommendation,
        ]),
      ),
    [recommendations],
  );
  const itemsByLane = useMemo(() => {
    const grouped: Record<VaultRecommendationAction, NormalizedDestinyItem[]> = {
      "delete-candidate": [],
      review: [],
      save: [],
    };

    for (const item of data?.items ?? []) {
      grouped[recommendationsById[item.id]?.action ?? "review"].push(item);
    }

    return grouped;
  }, [data?.items, recommendationsById]);

  return (
    <div className="d2-page-shell">
      <header className="d2-workspace-heading">
        <div>
          <h1>Vault Clean</h1>
          <p>Fast triage lanes with reasons before you delete anything.</p>
        </div>
        <Button disabled={isLoading} onClick={reload} type="button" variant="outline">
          <RefreshCcw data-icon="inline-start" />
          Refresh
        </Button>
      </header>

      {isLoading ? <WorkspaceLoading /> : null}
      {error ? <WorkspaceError error={error} reload={reload} /> : null}

      {data ? (
        <>
          <ManifestStatus data={data} />
          <section className="d2-vault-lanes">
            {(
              [
                ["save", ShieldCheck],
                ["review", Gauge],
                ["delete-candidate", Trash2],
              ] as const
            ).map(([lane, Icon]) => (
              <section className="d2-vault-lane" data-lane={lane} key={lane}>
                <header>
                  <Icon aria-hidden="true" />
                  <span>{RECOMMENDATION_COPY[lane]}</span>
                  <strong>{itemsByLane[lane].length}</strong>
                </header>
                <div className="d2-vault-list">
                  {itemsByLane[lane].map((item) => (
                    <ItemCard
                      item={item}
                      key={item.id}
                      onOpen={setSelectedItem}
                      recommendation={recommendationsById[item.id]}
                      tags={tagMap[item.id] ?? []}
                      toggleTag={toggleTag}
                    />
                  ))}
                </div>
              </section>
            ))}
          </section>
          <ItemDetailSheet
            item={selectedItem}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedItem(null);
              }
            }}
            recommendation={selectedItem ? recommendationsById[selectedItem.id] : undefined}
            tags={selectedItem ? (tagMap[selectedItem.id] ?? []) : []}
            toggleTag={toggleTag}
          />
        </>
      ) : null}
    </div>
  );
}

export function OptimizerWorkspace() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const { tagMap } = useItemTags(useTagScope(data));
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const [preferredStats, setPreferredStats] = useState<string[]>([
    "Resilience",
    "Discipline",
  ]);

  const result = useMemo(() => {
    const classType = selectedCharacter?.classType ?? 3;

    return rankArmorForGoal({
      goal: {
        classType,
        minimumStats: { Resilience: 100 },
        preferredStats,
      },
      items: data?.items ?? [],
      tagMap,
    });
  }, [data?.items, preferredStats, selectedCharacter?.classType, tagMap]);

  return (
    <div className="d2-page-shell">
      <header className="d2-workspace-heading">
        <div>
          <h1>Optimizer</h1>
          <p>Start with explainable armor picks; keep the math visible.</p>
        </div>
        <Button disabled={isLoading} onClick={reload} type="button" variant="outline">
          <RefreshCcw data-icon="inline-start" />
          Refresh
        </Button>
      </header>

      {isLoading ? <WorkspaceLoading /> : null}
      {error ? <WorkspaceError error={error} reload={reload} /> : null}

      {data ? (
        <>
          <ManifestStatus data={data} />
          <CharacterSelector
            characters={data.characters}
            selectedCharacterId={selectedCharacterId}
            setSelectedCharacterId={setSelectedCharacterId}
          />
          <section className="d2-optimizer-grid">
            <aside className="d2-filter-rail">
              <div className="d2-filter-title">
                <Target aria-hidden="true" />
                <span>Goal</span>
              </div>
              <div className="d2-class-pills">
                {Object.entries(CLASS_TYPE_BY_NAME).map(([className, classType]) => (
                  <Badge
                    data-active={selectedCharacter?.classType === classType}
                    key={className}
                    variant="outline"
                  >
                    {className}
                  </Badge>
                ))}
              </div>
              <Separator />
              <span className="d2-filter-caption">Preferred stats</span>
              <ToggleGroup
                className="d2-slot-toggles"
                onValueChange={setPreferredStats}
                type="multiple"
                value={preferredStats}
                variant="outline"
              >
                {STAT_NAMES.map((statName) => (
                  <ToggleGroupItem key={statName} value={statName}>
                    {statName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <p className="d2-filter-note">
                `slop` tagged items are excluded. Keep/peak tags are protected
                in vault cleaning and still available for builds.
              </p>
            </aside>
            <section className="d2-optimizer-results">
              <div className="d2-score-panel">
                <span>Build score</span>
                <strong>{Math.max(0, result.score)}</strong>
                <small>
                  {result.missingSlots.length > 0
                    ? `${result.missingSlots.length} slot gaps`
                    : "All armor slots filled"}
                </small>
              </div>
              <div className="d2-stat-grid d2-stat-grid-wide">
                {STAT_NAMES.map((statName) => (
                  <span key={statName}>
                    <small>{statName}</small>
                    <strong>{result.statTotals[statName] ?? 0}</strong>
                  </span>
                ))}
              </div>
              <section className="d2-item-grid">
                {result.items.length > 0 ? (
                  result.items.map((item) => (
                    <ItemCard
                      item={item}
                      key={item.id}
                      onOpen={() => undefined}
                      tags={tagMap[item.id] ?? []}
                      toggleTag={() => undefined}
                    />
                  ))
                ) : (
                  <div className="d2-empty-panel">
                    <Layers3 aria-hidden="true" />
                    <span>No complete armor set can be ranked yet.</span>
                  </div>
                )}
              </section>
            </section>
          </section>
        </>
      ) : null}
    </div>
  );
}
