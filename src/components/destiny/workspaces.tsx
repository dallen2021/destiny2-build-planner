"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  type DragEndEvent,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  AlertTriangle,
  Archive,
  Boxes,
  Check,
  CheckCircle2,
  CircleHelp,
  Database,
  Filter,
  Gauge,
  Gem,
  Lock,
  LockOpen,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sword,
  Target,
  Trash2,
  Zap,
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
import {
  type CharacterSummary,
  type DestinyClassType,
  type DestinyInventoryApiPayload,
  type ItemLocation,
  type NormalizedDestinyItem,
  type NormalizedPerk,
  type NormalizedStat,
} from "@/lib/destiny/inventory";
import {
  planItemDropTransaction,
  type ItemActionRequest,
} from "@/lib/destiny/item-actions";
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

const ARMOR_STAT_NAMES = [
  "Weapons",
  "Health",
  "Class",
  "Grenade",
  "Super",
  "Melee",
] as const;

const TAG_LABELS: Record<ItemTag, string> = {
  build: "Build",
  infusion: "Infusion",
  keep: "Keep",
  peak: "Peak",
  review: "Review",
  slop: "Slop",
};

const TAG_SHORT_LABELS: Record<ItemTag, string> = {
  build: "B",
  infusion: "I",
  keep: "K",
  peak: "P",
  review: "R",
  slop: "S",
};

const RECOMMENDATION_COPY: Record<VaultRecommendationAction, string> = {
  "delete-candidate": "Delete candidate",
  review: "Review",
  save: "Save",
};

type ActionStatus =
  | { tone: "info" | "success" | "error"; message: string }
  | null;

type ItemDropTarget = {
  characterId: string;
  location: Extract<ItemLocation, "carried" | "equipped" | "vault">;
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

function isClassCompatible(
  item: NormalizedDestinyItem,
  character: CharacterSummary | null,
): boolean {
  if (!character || item.kind !== "armor") {
    return true;
  }

  return (
    item.classType == null ||
    item.classType === 3 ||
    item.classType === character.classType
  );
}

function getEquippedItems(
  items: readonly NormalizedDestinyItem[],
  selectedCharacterId: string | null,
) {
  return items
    .filter(
      (item) =>
        item.location === "equipped" && item.characterId === selectedCharacterId,
    )
    .sort((first, second) => first.slot.order - second.slot.order);
}

function getSearchText(item: NormalizedDestinyItem, tags: readonly ItemTag[]) {
  return [
    item.name,
    item.description,
    item.kind,
    item.slot.name,
    item.bucket.name,
    item.rarity,
    item.damageType.name,
    ...item.stats.map((stat) => `${stat.name} ${stat.value}`),
    ...item.perks.map((perk) => `${perk.name} ${perk.description ?? ""}`),
    ...tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getItemPowerLabel(item: NormalizedDestinyItem) {
  if (item.quantity > 1) {
    return String(item.quantity);
  }

  return item.power == null ? "" : String(item.power);
}

function getPrimaryTag(tags: readonly ItemTag[]): ItemTag | null {
  return (
    tags.find((tag) => tag === "peak" || tag === "keep" || tag === "slop") ??
    tags[0] ??
    null
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
      <AlertTitle>
        {needsAuth ? "Bungie connection required" : "Inventory unavailable"}
      </AlertTitle>
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
        {data.items.length} items
      </span>
      <span>
        <Archive aria-hidden="true" />
        {data.vaultSummary.itemCount} vault
      </span>
      <span>
        <Boxes aria-hidden="true" />
        {data.postmasterSummary.itemCount} postmaster
      </span>
      <span>
        <Database aria-hidden="true" />
        Manifest {data.manifestVersion} / {data.manifestLanguage}
      </span>
      <span>{formatDefinitionSource(data.definitionSource)}</span>
    </div>
  );
}

function ReauthBanner({ data }: { data: DestinyInventoryApiPayload }) {
  if (!data.requiresMoveEquipReauth) {
    return null;
  }

  return (
    <Alert className="d2-alert-panel d2-reauth-panel">
      <AlertTriangle data-icon="inline-start" />
      <AlertTitle>Item actions need Bungie reauthorization</AlertTitle>
      <AlertDescription>
        Drag/drop, equip, lock, and postmaster actions require the
        MoveEquipDestinyItems scope. Reading inventory still works.
        <div className="d2-alert-actions">
          <Button asChild>
            <Link href="/api/auth/login">Reauthorize Bungie</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

function CharacterSelector({
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
                height={72}
                src={emblemUrl}
                width={320}
              />
            ) : (
              <span className="d2-character-emblem d2-character-emblem-empty" />
            )}
            <span className="d2-class-mark" data-class={character.className}>
              {character.className.slice(0, 1)}
            </span>
            <span>
              <strong>{character.className}</strong>
              <small>{character.light ?? "-"} Power</small>
            </span>
            <span className="d2-character-card-meta">
              <small>{carriedCount} gear</small>
              {selected ? <Check aria-hidden="true" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ItemIcon({ item, size = 56 }: { item: NormalizedDestinyItem; size?: number }) {
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

function TileOverlayImage({
  alt,
  className,
  path,
}: {
  alt: string;
  className: string;
  path: string | null;
}) {
  const src = bungieImage(path);
  if (!src) {
    return null;
  }

  return (
    <Image
      alt={alt}
      className={className}
      height={56}
      src={src}
      width={56}
    />
  );
}

function ItemTile({
  disabledDrag = false,
  item,
  onOpen,
  tags,
}: {
  disabledDrag?: boolean;
  item: NormalizedDestinyItem;
  onOpen: (item: NormalizedDestinyItem) => void;
  tags: readonly ItemTag[];
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      data: { item },
      disabled: disabledDrag,
      id: item.id,
    });
  const primaryTag = getPrimaryTag(tags);
  const damageIcon = bungieImage(item.damageType.icon);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      {...attributes}
      {...listeners}
      aria-label={item.name}
      className="d2-dim-tile"
      data-dragging={isDragging}
      data-kind={item.kind}
      data-rarity={item.rarity ?? "unknown"}
      onClick={() => onOpen(item)}
      ref={setNodeRef}
      style={style}
      type="button"
    >
      <ItemIcon item={item} />
      <TileOverlayImage
        alt=""
        className="d2-tile-watermark"
        path={item.iconLayers.featuredWatermark ?? item.iconLayers.watermark}
      />
      {damageIcon ? (
        <Image
          alt=""
          className="d2-tile-damage"
          height={18}
          src={damageIcon}
          width={18}
        />
      ) : null}
      <span className="d2-tile-flags">
        {item.state.locked ? <Lock aria-label="Locked" /> : null}
        {item.state.crafted ? <Sparkles aria-label="Crafted" /> : null}
        {item.state.enhanced ? <Zap aria-label="Enhanced" /> : null}
      </span>
      <span className="d2-tier-pips" aria-label={item.gearTier ? `Tier ${item.gearTier}` : undefined}>
        {Array.from({ length: Math.min(item.gearTier ?? 0, 5) }).map((_, index) => (
          <i key={index} />
        ))}
      </span>
      {primaryTag ? (
        <span className="d2-tile-tag" data-tag={primaryTag}>
          {TAG_SHORT_LABELS[primaryTag]}
        </span>
      ) : null}
      <span className="d2-tile-power">{getItemPowerLabel(item)}</span>
    </button>
  );
}

function DropZone({
  children,
  characterId,
  className = "",
  disabled = false,
  label,
  location,
}: {
  children: React.ReactNode;
  characterId: string;
  className?: string;
  disabled?: boolean;
  label: string;
  location: ItemDropTarget["location"];
}) {
  const { isOver, setNodeRef } = useDroppable({
    data: { characterId, location } satisfies ItemDropTarget,
    disabled,
    id: `${location}:${characterId}`,
  });

  return (
    <section
      aria-label={label}
      className={`d2-drop-zone ${className}`}
      data-over={isOver}
      ref={setNodeRef}
    >
      {children}
    </section>
  );
}

function GearTileGrid({
  disabledDrag,
  items,
  onOpen,
  tagMap,
}: {
  disabledDrag: boolean;
  items: readonly NormalizedDestinyItem[];
  onOpen: (item: NormalizedDestinyItem) => void;
  tagMap: Record<string, ItemTag[]>;
}) {
  if (items.length === 0) {
    return <div className="d2-empty-strip">No items in this section.</div>;
  }

  return (
    <div className="d2-dim-grid">
      {items.map((item) => (
        <ItemTile
          disabledDrag={disabledDrag || !item.state.canTransfer}
          item={item}
          key={item.id}
          onOpen={onOpen}
          tags={tagMap[item.id] ?? []}
        />
      ))}
    </div>
  );
}

function StatBars({
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

function PlugList({ perks }: { perks: readonly NormalizedPerk[] }) {
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

function ItemActionButtons({
  data,
  item,
  onAction,
  targetCharacterId,
}: {
  data: DestinyInventoryApiPayload;
  item: NormalizedDestinyItem;
  onAction: (actions: ItemActionRequest[], label: string) => void;
  targetCharacterId?: string | null;
}) {
  const disabled = data.requiresMoveEquipReauth;
  const itemCharacterId = item.characterId ?? targetCharacterId ?? data.characters[0]?.id;
  const equipCharacterId = targetCharacterId ?? item.characterId ?? data.characters[0]?.id;

  return (
    <div className="d2-inspector-actions">
      <Button
        disabled={disabled || !itemCharacterId}
        onClick={() => {
          if (!itemCharacterId) {
            return;
          }
          onAction(
            [
              {
                action: "set-lock",
                characterId: itemCharacterId,
                itemId: item.itemInstanceId ?? item.id,
                locked: !item.state.locked,
                membershipType: data.membershipType,
              },
            ],
            item.state.locked ? "Unlocking item" : "Locking item",
          );
        }}
        type="button"
        variant="outline"
      >
        {item.state.locked ? <LockOpen /> : <Lock />}
        {item.state.locked ? "Unlock" : "Lock"}
      </Button>
      <Button
        disabled={disabled || item.location === "vault" || !itemCharacterId}
        onClick={() => {
          if (!itemCharacterId) {
            return;
          }
          onAction(
            planItemDropTransaction({
              item,
              membershipType: data.membershipType,
              target: { characterId: itemCharacterId, location: "vault" },
            }),
            "Moving to vault",
          );
        }}
        type="button"
        variant="outline"
      >
        <Archive />
        Vault
      </Button>
      <Button
        disabled={disabled || !item.state.canEquip || !equipCharacterId}
        onClick={() => {
          if (!equipCharacterId) {
            return;
          }
          onAction(
            planItemDropTransaction({
              item,
              membershipType: data.membershipType,
              target: { characterId: equipCharacterId, location: "equipped" },
            }),
            "Equipping item",
          );
        }}
        type="button"
      >
        <Sword />
        Equip
      </Button>
    </div>
  );
}

function ItemDetailSheet({
  data,
  item,
  onAction,
  onOpenChange,
  recommendation,
  tags,
  toggleTag,
  targetCharacterId,
}: {
  data: DestinyInventoryApiPayload | null;
  item: NormalizedDestinyItem | null;
  onAction: (actions: ItemActionRequest[], label: string) => void;
  onOpenChange: (open: boolean) => void;
  recommendation?: VaultRecommendation;
  targetCharacterId?: string | null;
  tags: readonly ItemTag[];
  toggleTag: (itemId: string, tag: ItemTag) => void;
}) {
  const damageIcon = item ? bungieImage(item.damageType.icon) : null;

  return (
    <Sheet open={Boolean(item)} onOpenChange={onOpenChange}>
      <SheetContent className="d2-item-sheet">
        {item ? (
          <>
            <SheetHeader>
              <SheetTitle>{item.name}</SheetTitle>
              <SheetDescription>
                {item.rarity ?? "Unknown"} {item.slot.name} /{" "}
                {item.power ?? "No power"}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="d2-item-sheet-scroll">
              <div className="d2-inspector-hero" data-kind={item.kind}>
                <ItemIcon item={item} size={96} />
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

              {data ? (
                <ItemActionButtons
                  data={data}
                  item={item}
                  onAction={onAction}
                  targetCharacterId={targetCharacterId}
                />
              ) : null}

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
                <StatBars itemKind={item.kind} stats={item.stats} />
              </section>

              <section className="d2-sheet-section">
                <h3>Perks and traits</h3>
                <PlugList perks={item.perks} />
              </section>

              <section className="d2-sheet-section d2-inspector-meta">
                <h3>Item state</h3>
                <span>{item.masterwork ? item.masterwork.name : "No masterwork plug"}</span>
                <span>{item.ornament ? item.ornament.name : "No ornament plug"}</span>
                <span>{item.state.crafted ? "Crafted" : "Not crafted"}</span>
                <span>{item.state.enhanced ? "Enhanced" : "Not enhanced"}</span>
                <span>{item.state.adept ? "Adept" : "Standard"}</span>
              </section>
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function ActionNotice({ status }: { status: ActionStatus }) {
  if (!status) {
    return null;
  }

  return (
    <div className="d2-action-notice" data-tone={status.tone}>
      {status.message}
    </div>
  );
}

function useItemActions({
  reload,
}: {
  reload: () => void;
}) {
  const [status, setStatus] = useState<ActionStatus>(null);
  const runActions = useCallback(
    async (actions: ItemActionRequest[], label: string) => {
      if (actions.length === 0) {
        setStatus({ message: "No item move needed.", tone: "info" });
        return;
      }

      setStatus({ message: label, tone: "info" });

      try {
        for (const action of actions) {
          const response = await fetch("/api/destiny/item-actions", {
            body: JSON.stringify(action),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });
          const payload = (await response.json()) as { error?: string };
          if (!response.ok) {
            throw new Error(payload.error ?? "Destiny item action failed.");
          }
        }

        setStatus({ message: "Item action complete.", tone: "success" });
        reload();
      } catch (error) {
        setStatus({
          message:
            error instanceof Error
              ? error.message
              : "Destiny item action failed.",
          tone: "error",
        });
      }
    },
    [reload],
  );

  return { runActions, status };
}

function GuardianStage({
  character,
  equippedItems,
  onOpen,
}: {
  character: CharacterSummary | null;
  equippedItems: readonly NormalizedDestinyItem[];
  onOpen: (item: NormalizedDestinyItem) => void;
}) {
  const weapons = equippedItems.filter((item) => item.kind === "weapon");
  const armor = equippedItems.filter((item) => item.kind === "armor");

  return (
    <section className="d2-command-stage" aria-label="Guardian command stage">
      <div className="d2-stage-ring" aria-hidden="true" />
      <div className="d2-stage-guardian" aria-hidden="true">
        <span className="d2-stage-head" />
        <span className="d2-stage-core" />
        <span className="d2-stage-cloak" />
      </div>
      <div className="d2-stage-left-rail">
        {weapons.slice(0, 4).map((item) => (
          <button key={item.id} onClick={() => onOpen(item)} type="button">
            <ItemIcon item={item} />
            <span>{item.slot.name}</span>
          </button>
        ))}
      </div>
      <div className="d2-stage-right-rail">
        {armor.slice(0, 5).map((item) => (
          <button key={item.id} onClick={() => onOpen(item)} type="button">
            <ItemIcon item={item} />
            <span>{item.slot.name}</span>
          </button>
        ))}
      </div>
      <div className="d2-stage-caption">
        <span>{character?.className ?? "Guardian"}</span>
        <strong>{character?.light ?? "----"}</strong>
      </div>
    </section>
  );
}

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

export function CommandCenter() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const { tagMap, toggleTag } = useItemTags(useTagScope(data));
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const [selectedItem, setSelectedItem] = useState<NormalizedDestinyItem | null>(null);
  const { runActions, status } = useItemActions({ reload });
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const equippedItems = getEquippedItems(
    data?.items ?? [],
    selectedCharacter?.id ?? null,
  );
  const selectedInspectItem = selectedItem ?? equippedItems[0] ?? null;

  return (
    <div className="d2-command-console">
      <ActionNotice status={status} />
      <aside className="d2-console-rail">
        <div className="d2-console-brand">
          <span className="d2-gold-glyph" />
          <strong>D2 Build Planner</strong>
          <small>Build. Optimize. Conquer.</small>
        </div>
        {["Command", "Inventory", "Optimizer", "Vault Clean"].map((label) => (
          <Link
            className="d2-console-link"
            data-active={label === "Command"}
            href={label === "Command" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
            key={label}
          >
            {label}
          </Link>
        ))}
      </aside>

      <section className="d2-console-main">
        <header className="d2-console-toolbar">
          <div className="d2-search-shell">
            <Search aria-hidden="true" />
            <span>Search builds, items, perks...</span>
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
            <ReauthBanner data={data} />
            <div className="d2-console-title">
              <h1>Command / Character Select</h1>
              <p>Select a Guardian to inspect, optimize, and manage loadouts.</p>
            </div>
            <CharacterSelector
              characters={data.characters}
              items={data.items}
              selectedCharacterId={selectedCharacter?.id ?? null}
              setSelectedCharacterId={setSelectedCharacterId}
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
                onOpen={setSelectedItem}
              />
              <aside className="d2-command-inspector">
                {selectedInspectItem ? (
                  <>
                    <div className="d2-mini-inspector-head">
                      <ItemIcon item={selectedInspectItem} size={72} />
                      <div>
                        <span>{selectedInspectItem.slot.name}</span>
                        <strong>{selectedInspectItem.name}</strong>
                        <small>{selectedInspectItem.power ?? selectedInspectItem.quantity}</small>
                      </div>
                    </div>
                    <StatBars
                      itemKind={selectedInspectItem.kind}
                      stats={selectedInspectItem.stats}
                    />
                    <PlugList perks={selectedInspectItem.perks.slice(0, 4)} />
                  </>
                ) : (
                  <p className="d2-muted-note">No equipped gear returned yet.</p>
                )}
              </aside>
            </div>
            <div className="d2-bottom-panels">
              <CommandPanel title="Stat Overview">
                <StatBars
                  itemKind="armor"
                  stats={selectedCharacter?.stats ?? []}
                />
              </CommandPanel>
              <CommandPanel title="Armor Tiers">
                <div className="d2-tier-summary">
                  {[1, 2, 3, 4, 5].map((tier) => (
                    <span key={tier}>T{tier}</span>
                  ))}
                </div>
                <strong>
                  {
                    equippedItems.filter(
                      (item) => item.kind === "armor" && (item.gearTier ?? 0) >= 4,
                    ).length
                  }{" "}
                  ready pieces
                </strong>
              </CommandPanel>
              <CommandPanel title="Custom Tags">
                <div className="d2-tag-cloud">
                  {ITEM_TAGS.map((tag) => (
                    <span key={tag}>{TAG_LABELS[tag]}</span>
                  ))}
                </div>
              </CommandPanel>
            </div>
            <ItemDetailSheet
              data={data}
              item={selectedItem}
              onAction={runActions}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedItem(null);
                }
              }}
              tags={selectedItem ? (tagMap[selectedItem.id] ?? []) : []}
              targetCharacterId={selectedCharacter?.id ?? null}
              toggleTag={toggleTag}
            />
          </>
        ) : null}
      </section>
    </div>
  );
}

function InventorySectionHeader({
  count,
  icon,
  title,
}: {
  count: number;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <header className="d2-dim-section-header">
      <span>
        {icon}
        {title}
      </span>
      <strong>{count}</strong>
    </header>
  );
}

export function InventoryWorkspace() {
  const { data, error, isLoading, reload } = useDestinyInventory();
  const { tagMap, toggleTag } = useItemTags(useTagScope(data));
  const [selectedCharacterId, setSelectedCharacterId] = useSelectedCharacter(data);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "armor" | "weapon" | "other">("all");
  const [showOtherClassArmor, setShowOtherClassArmor] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NormalizedDestinyItem | null>(null);
  const { runActions, status } = useItemActions({ reload });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const selectedCharacter = getSelectedCharacter(
    data?.characters ?? [],
    selectedCharacterId,
  );
  const recommendationsById = useMemo(
    () =>
      Object.fromEntries(
        evaluateVaultItems(data?.items ?? [], tagMap).map((recommendation) => [
          recommendation.itemId,
          recommendation,
        ]),
      ),
    [data?.items, tagMap],
  );
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (data?.items ?? []).filter((item) => {
      const tags = tagMap[item.id] ?? [];
      const classMatch =
        showOtherClassArmor || isClassCompatible(item, selectedCharacter);
      const kindMatch =
        kind === "all" ||
        item.kind === kind ||
        (kind === "other" && item.kind !== "armor" && item.kind !== "weapon");
      const queryMatch =
        normalizedQuery.length === 0 ||
        getSearchText(item, tags).includes(normalizedQuery);

      return classMatch && kindMatch && queryMatch;
    });
  }, [data?.items, kind, query, selectedCharacter, showOtherClassArmor, tagMap]);
  const equippedItems = filteredItems
    .filter(
      (item) =>
        item.location === "equipped" && item.characterId === selectedCharacter?.id,
    )
    .sort((first, second) => first.slot.order - second.slot.order);
  const carriedItems = filteredItems
    .filter(
      (item) =>
        item.location === "carried" && item.characterId === selectedCharacter?.id,
    )
    .sort((first, second) => first.slot.order - second.slot.order);
  const vaultItems = filteredItems
    .filter((item) => item.location === "vault")
    .sort((first, second) => first.slot.order - second.slot.order);
  const postmasterItems = filteredItems.filter(
    (item) =>
      item.location === "postmaster" &&
      (!selectedCharacter || item.characterId === selectedCharacter.id),
  );
  const disabledDrag = Boolean(data?.requiresMoveEquipReauth);

  const onDragEnd = (event: DragEndEvent) => {
    if (!data) {
      return;
    }

    const item = event.active.data.current?.item as NormalizedDestinyItem | undefined;
    const target = event.over?.data.current as ItemDropTarget | undefined;
    if (!item || !target) {
      return;
    }

    void runActions(
      planItemDropTransaction({
        item,
        membershipType: data.membershipType,
        target,
      }),
      "Moving item",
    );
  };

  return (
    <div className="d2-page-shell d2-inventory-shell">
      <ActionNotice status={status} />
      <header className="d2-dim-toolbar">
        <div className="d2-dim-search">
          <Search aria-hidden="true" />
          <Input
            aria-label="Search inventory"
            autoComplete="off"
            name="inventory-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search item/perk, is:dupe, tag:slop..."
            type="search"
            value={query}
          />
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
          <ReauthBanner data={data} />
          <CharacterSelector
            characters={data.characters}
            items={data.items}
            selectedCharacterId={selectedCharacterId}
            setSelectedCharacterId={setSelectedCharacterId}
          />
          <section className="d2-dim-filters">
            <Tabs
              onValueChange={(value) => setKind(value as typeof kind)}
              value={kind}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="weapon">Weapons</TabsTrigger>
                <TabsTrigger value="armor">Armor</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              onClick={() => setShowOtherClassArmor((current) => !current)}
              type="button"
              variant="outline"
            >
              <Filter data-icon="inline-start" />
              {showOtherClassArmor ? "Hide other classes" : "Show other classes"}
            </Button>
          </section>

          <DndContext onDragEnd={onDragEnd} sensors={sensors}>
            <section className="d2-dim-workspace">
              <DropZone
                characterId={selectedCharacter?.id ?? "unknown"}
                disabled={disabledDrag}
                label="Equipped"
                location="equipped"
              >
                <InventorySectionHeader
                  count={equippedItems.length}
                  icon={<Sword aria-hidden="true" />}
                  title="Equipped"
                />
                <GearTileGrid
                  disabledDrag={disabledDrag}
                  items={equippedItems}
                  onOpen={setSelectedItem}
                  tagMap={tagMap}
                />
              </DropZone>
              <DropZone
                characterId={selectedCharacter?.id ?? "unknown"}
                disabled={disabledDrag}
                label="Carried"
                location="carried"
              >
                <InventorySectionHeader
                  count={carriedItems.length}
                  icon={<Boxes aria-hidden="true" />}
                  title="Carried"
                />
                <GearTileGrid
                  disabledDrag={disabledDrag}
                  items={carriedItems}
                  onOpen={setSelectedItem}
                  tagMap={tagMap}
                />
              </DropZone>
              <DropZone
                characterId={selectedCharacter?.id ?? "unknown"}
                disabled={disabledDrag}
                label="Vault"
                location="vault"
              >
                <InventorySectionHeader
                  count={vaultItems.length}
                  icon={<Archive aria-hidden="true" />}
                  title="Vault"
                />
                <GearTileGrid
                  disabledDrag={disabledDrag}
                  items={vaultItems}
                  onOpen={setSelectedItem}
                  tagMap={tagMap}
                />
              </DropZone>
            </section>
          </DndContext>

          {postmasterItems.length > 0 ? (
            <section className="d2-postmaster-strip">
              <InventorySectionHeader
                count={postmasterItems.length}
                icon={<Gem aria-hidden="true" />}
                title="Postmaster"
              />
              <GearTileGrid
                disabledDrag={disabledDrag}
                items={postmasterItems}
                onOpen={setSelectedItem}
                tagMap={tagMap}
              />
            </section>
          ) : null}

          <ItemDetailSheet
            data={data}
            item={selectedItem}
            onAction={runActions}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedItem(null);
              }
            }}
            recommendation={selectedItem ? recommendationsById[selectedItem.id] : undefined}
            tags={selectedItem ? (tagMap[selectedItem.id] ?? []) : []}
            targetCharacterId={selectedCharacter?.id ?? null}
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
  const { runActions, status } = useItemActions({ reload });
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
      <ActionNotice status={status} />
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
          <ReauthBanner data={data} />
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
                <div className="d2-dim-grid d2-vault-clean-grid">
                  {itemsByLane[lane].map((item) => (
                    <ItemTile
                      disabledDrag
                      item={item}
                      key={item.id}
                      onOpen={setSelectedItem}
                      tags={tagMap[item.id] ?? []}
                    />
                  ))}
                </div>
              </section>
            ))}
          </section>
          <ItemDetailSheet
            data={data}
            item={selectedItem}
            onAction={runActions}
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
    "Health",
    "Grenade",
  ]);
  const result = useMemo(() => {
    const classType = selectedCharacter?.classType ?? 3;

    return rankArmorForGoal({
      goal: {
        classType,
        minimumStats: { Health: 100 },
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
            items={data.items}
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
                {ARMOR_STAT_NAMES.map((statName) => (
                  <ToggleGroupItem key={statName} value={statName}>
                    {statName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <p className="d2-filter-note">
                Slop-tagged items are excluded. Keep/peak tags remain protected
                in Vault Clean.
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
                {ARMOR_STAT_NAMES.map((statName) => (
                  <span key={statName}>
                    <small>{statName}</small>
                    <strong>{result.statTotals[statName] ?? 0}</strong>
                  </span>
                ))}
              </div>
              <section className="d2-dim-grid">
                {result.items.length > 0 ? (
                  result.items.map((item) => (
                    <ItemTile
                      disabledDrag
                      item={item}
                      key={item.id}
                      onOpen={() => undefined}
                      tags={tagMap[item.id] ?? []}
                    />
                  ))
                ) : (
                  <div className="d2-empty-panel">
                    <CircleHelp aria-hidden="true" />
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
