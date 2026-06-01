"use client";

import Image from "next/image";

import type {
  NormalizedDestinyItem,
  NormalizedPerk,
  NormalizedStat,
} from "@/lib/destiny/inventory";

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
  const iconUrl = bungieImage(item.icon);
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
