"use client";

import Image from "next/image";

import type {
  NormalizedDestinyItem,
  NormalizedPerk,
  NormalizedPlug,
  NormalizedSocket,
  NormalizedStat,
} from "@/lib/destiny/inventory";
import {
  getItemPlugSections,
  getItemPresentationIconPath,
  type ItemPlugSections,
} from "@/lib/destiny/presentation";

export const ARMOR_STAT_NAMES = [
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
  const iconUrl = bungieImage(getItemPresentationIconPath(item));
  const iconStyle = { height: size, width: size };

  if (!iconUrl) {
    return (
      <span
        className="d2-item-icon-fallback"
        style={iconStyle}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      alt=""
      className="d2-item-icon"
      height={size}
      src={iconUrl}
      style={iconStyle}
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

const PLUG_SECTION_TITLES: Record<
  keyof ItemPlugSections,
  {
    armor: string;
    default: string;
    weapon: string;
  }
> = {
  appearance: {
    armor: "Appearance",
    default: "Appearance",
    weapon: "Appearance",
  },
  intrinsic: {
    armor: "Intrinsic",
    default: "Intrinsic",
    weapon: "Intrinsic Trait",
  },
  mods: {
    armor: "Armor Mods",
    default: "Mods",
    weapon: "Weapon Mods",
  },
  other: {
    armor: "Other Sockets",
    default: "Other Sockets",
    weapon: "Other Sockets",
  },
  perks: {
    armor: "Armor Perks",
    default: "Perks",
    weapon: "Weapon Perks",
  },
  setBonuses: {
    armor: "Set Bonuses",
    default: "Set Bonuses",
    weapon: "Set Bonuses",
  },
  upgrades: {
    armor: "Armor Tier & Upgrades",
    default: "Upgrades",
    weapon: "Masterwork & Upgrades",
  },
};

const PLUG_SECTION_ORDER: Record<
  NormalizedDestinyItem["kind"] | "default",
  (keyof ItemPlugSections)[]
> = {
  armor: ["mods", "setBonuses", "upgrades", "appearance", "other"],
  consumable: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  currency: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  default: ["intrinsic", "perks", "mods", "setBonuses", "upgrades", "appearance", "other"],
  engram: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  ghost: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  mod: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  quest: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  ship: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  unknown: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  vehicle: ["intrinsic", "mods", "upgrades", "appearance", "other"],
  weapon: ["intrinsic", "perks", "mods", "upgrades", "appearance", "other"],
};

function getSectionTitle(
  itemKind: NormalizedDestinyItem["kind"],
  section: keyof ItemPlugSections,
) {
  const copy = PLUG_SECTION_TITLES[section];

  if (itemKind === "armor") {
    return copy.armor;
  }

  if (itemKind === "weapon") {
    return copy.weapon;
  }

  return copy.default;
}

function getSocketOptions(socket: NormalizedSocket): NormalizedPlug[] {
  const options = [socket, ...socket.reusablePlugs];
  const seen = new Set<number>();

  return options.filter((plug) => {
    if (seen.has(plug.plugHash)) {
      return false;
    }

    seen.add(plug.plugHash);
    return true;
  });
}

function PlugOptionStrip({ socket }: { socket: NormalizedSocket }) {
  const options = getSocketOptions(socket);

  if (options.length <= 1) {
    return null;
  }

  return (
    <div
      aria-label={`${socket.name} socket options`}
      className="d2-socket-options"
    >
      {options.slice(0, 8).map((option) => {
        const icon = bungieImage(option.icon);
        const selected = option.plugHash === socket.plugHash;

        return (
          <span
            aria-label={`${option.name}${selected ? ", selected" : ""}`}
            data-selected={selected}
            key={option.plugHash}
            title={option.name}
          >
            {icon ? <Image alt="" height={22} src={icon} width={22} /> : null}
          </span>
        );
      })}
    </div>
  );
}

function PlugSocketCard({ socket }: { socket: NormalizedSocket }) {
  const icon = bungieImage(socket.icon);

  return (
    <article className="d2-socket-card">
      {icon ? (
        <Image alt="" height={36} src={icon} width={36} />
      ) : (
        <span aria-hidden="true" />
      )}
      <div>
        <strong>{socket.name}</strong>
        {socket.description ? <small>{socket.description}</small> : null}
        <PlugOptionStrip socket={socket} />
      </div>
    </article>
  );
}

export function ItemPlugDetails({ item }: { item: NormalizedDestinyItem }) {
  const sections = getItemPlugSections(item);
  const sectionOrder = PLUG_SECTION_ORDER[item.kind] ?? PLUG_SECTION_ORDER.default;
  const visibleSections = sectionOrder
    .map((section) => ({
      items: sections[section],
      section,
      title: getSectionTitle(item.kind, section),
    }))
    .filter(({ items }) => items.length > 0);

  if (visibleSections.length === 0) {
    return (
      <p className="d2-muted-note">
        No visible socket, mod, or trait data returned for this item.
      </p>
    );
  }

  return (
    <div className="d2-item-plug-details">
      {visibleSections.map(({ items, section, title }) => (
        <section className="d2-plug-section" data-section={section} key={section}>
          <h4>{title}</h4>
          <div className="d2-socket-card-list">
            {items.map((socket) => (
              <PlugSocketCard key={`${socket.index}:${socket.plugHash}`} socket={socket} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
