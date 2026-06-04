"use client";

import Image from "next/image";
import { Lock, Sparkles, Zap } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import type {
  NormalizedDestinyItem,
  NormalizedPerk,
  NormalizedPlug,
  NormalizedSocket,
  NormalizedStat,
} from "@/lib/destiny/inventory";
import {
  getItemSocketBoardSockets,
  getItemPresentationIconPath,
  getItemTileTier,
  getItemTileWatermarkPath,
  isItemMasterworked,
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

const TILE_SIZE_PX = {
  compact: 56,
  inspect: 86,
  stage: 58,
} as const;

export function DestinyItemTile({
  item,
  powerLabel = null,
  showPower = true,
  showStateFlags = true,
  size = "compact",
  tagLabel = null,
}: {
  item: NormalizedDestinyItem;
  powerLabel?: string | null;
  showPower?: boolean;
  showStateFlags?: boolean;
  size?: keyof typeof TILE_SIZE_PX;
  tagLabel?: string | null;
}) {
  const damageIcon = bungieImage(item.damageType.icon);
  const hasMasterwork = isItemMasterworked(item);
  const tileSize = TILE_SIZE_PX[size];
  const tier = getItemTileTier(item);
  const watermark = bungieImage(getItemTileWatermarkPath(item.iconLayers));
  const style = {
    "--d2-tile-size": `${tileSize}px`,
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className="d2-destiny-tile"
      data-kind={item.kind}
      data-masterworked={hasMasterwork}
      data-rarity={item.rarity ?? "unknown"}
      data-size={size}
      style={style}
    >
      <span className="d2-destiny-tile-art">
        <ItemIcon item={item} size={tileSize} />
      </span>
      {watermark ? (
        <Image
          alt=""
          className="d2-destiny-tile-watermark"
          height={22}
          src={watermark}
          width={22}
        />
      ) : null}
      {damageIcon ? (
        <Image
          alt=""
          className="d2-destiny-tile-damage"
          height={18}
          src={damageIcon}
          width={18}
        />
      ) : null}
      {tier > 0 ? (
        <span className="d2-destiny-tier-pips" aria-label={`Tier ${tier}`}>
          {Array.from({ length: tier }).map((_, index) => (
            <i key={index} />
          ))}
        </span>
      ) : null}
      {showStateFlags ? (
        <span className="d2-destiny-tile-flags">
          {item.state.locked ? <Lock aria-label="Locked" /> : null}
          {item.state.crafted ? <Sparkles aria-label="Crafted" /> : null}
          {item.state.enhanced ? <Zap aria-label="Enhanced" /> : null}
        </span>
      ) : null}
      {tagLabel ? <span className="d2-destiny-tile-tag">{tagLabel}</span> : null}
      {showPower && powerLabel ? (
        <span className="d2-destiny-tile-power">{powerLabel}</span>
      ) : null}
      {hasMasterwork ? <span className="d2-destiny-masterwork" /> : null}
    </span>
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

function getSocketBoardTitle(itemKind: NormalizedDestinyItem["kind"]) {
  if (itemKind === "weapon") {
    return "Weapon Perks";
  }

  if (itemKind === "armor") {
    return "Armor Mods";
  }

  return "Sockets";
}

function getSocketDetailTitle(itemKind: NormalizedDestinyItem["kind"]) {
  if (itemKind === "weapon") {
    return "Selected Perks, Mods, And Traits";
  }

  if (itemKind === "armor") {
    return "Selected Mods, Tier, And Appearance";
  }

  return "Selected Socket Details";
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

function PlugSocketMatrix({ sockets }: { sockets: readonly NormalizedSocket[] }) {
  return (
    <div className="d2-socket-matrix" aria-label="Socket options">
      {sockets.map((socket) => (
        <div className="d2-socket-column" key={`${socket.index}:${socket.plugHash}`}>
          {getSocketOptions(socket).slice(0, 6).map((option) => {
            const icon = bungieImage(option.icon);
            const selected = option.plugHash === socket.plugHash;

            return (
              <span
                aria-label={`${option.name}${selected ? ", selected" : ""}`}
                data-selected={selected}
                key={option.plugHash}
                title={option.name}
              >
                {icon ? <Image alt="" height={34} src={icon} width={34} /> : null}
              </span>
            );
          })}
        </div>
      ))}
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
  const boardSockets = getItemSocketBoardSockets(item);

  if (boardSockets.length === 0) {
    return (
      <p className="d2-muted-note">
        No visible socket, mod, or trait data returned for this item.
      </p>
    );
  }

  return (
    <div className="d2-item-plug-details" data-kind={item.kind}>
      <section className="d2-plug-section d2-plug-section-board">
        <h4>{getSocketBoardTitle(item.kind)}</h4>
        <PlugSocketMatrix sockets={boardSockets} />
      </section>
      <section className="d2-plug-section d2-plug-section-selected">
        <h4>{getSocketDetailTitle(item.kind)}</h4>
        <div className="d2-socket-card-list">
          {boardSockets.map((socket) => (
            <PlugSocketCard key={`${socket.index}:${socket.plugHash}`} socket={socket} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function ItemInspectPanel({
  actions = null,
  item,
  recommendation = null,
  tags = null,
}: {
  actions?: ReactNode;
  item: NormalizedDestinyItem;
  recommendation?: ReactNode;
  tags?: ReactNode;
}) {
  const damageIcon = bungieImage(item.damageType.icon);
  const tier = getItemTileTier(item);

  return (
    <article
      className="d2-item-inspect-screen"
      data-kind={item.kind}
      data-rarity={item.rarity ?? "unknown"}
    >
      <header className="d2-item-inspect-head">
        <DestinyItemTile item={item} showPower={false} size="inspect" />
        <div>
          <span>{item.slot.name}</span>
          <h2>{item.name}</h2>
          <p>
            {item.rarity ?? "Unknown rarity"} / {item.location}
            {damageIcon ? (
              <span className="d2-damage-line">
                <Image alt="" height={18} src={damageIcon} width={18} />
                {item.damageType.name}
              </span>
            ) : null}
          </p>
          {item.description ? <em>{item.description}</em> : null}
        </div>
      </header>

      <div className="d2-item-inspect-power">
        <span>{item.kind === "armor" ? "Armor Power" : "Power"}</span>
        <strong>{item.power ?? item.quantity}</strong>
        {tier > 0 ? <small>Tier {tier}</small> : null}
      </div>

      {actions}

      <div className="d2-item-inspect-layout">
        <section className="d2-item-inspect-sockets">
          <ItemPlugDetails item={item} />
        </section>
        <aside className="d2-item-inspect-stats">
          <h3>Stats</h3>
          <StatBars itemKind={item.kind} stats={item.stats} />
        </aside>
      </div>

      {tags ? (
        <section className="d2-item-inspect-extra">
          <h3>Tags</h3>
          {tags}
        </section>
      ) : null}

      {recommendation ? (
        <section className="d2-item-inspect-extra">
          {recommendation}
        </section>
      ) : null}
    </article>
  );
}
