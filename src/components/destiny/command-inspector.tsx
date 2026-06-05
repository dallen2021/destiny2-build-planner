"use client";

import Image from "next/image";
import { Check, Lock, Pencil, Plus } from "lucide-react";
import { useState } from "react";

import type {
  NormalizedDestinyItem,
  NormalizedSocket,
  NormalizedStat,
} from "@/lib/destiny/inventory";

import { bungieImage } from "./item-presentation";

type Tab = "overview" | "triage";

function PlugIcon({
  icon,
  selected = false,
  size = 30,
  empty = false,
}: {
  icon: string | null;
  selected?: boolean;
  size?: number;
  empty?: boolean;
}) {
  const url = bungieImage(icon);
  return (
    <span
      className="d2-ci-plug"
      data-selected={selected}
      data-empty={empty}
      style={{ width: size, height: size }}
    >
      {url ? <Image alt="" height={size} src={url} width={size} /> : null}
    </span>
  );
}

/** A single weapon perk / socket column: header, selected plug, alternates. */
function PerkColumn({ socket }: { socket: NormalizedSocket }) {
  const header = (socket.category ?? "Perk").toUpperCase();
  const isIntrinsic = /intrinsic/i.test(socket.category ?? "");
  const alternates = socket.reusablePlugs.filter(
    (plug) => plug.plugHash !== socket.plugHash,
  );

  return (
    <div className="d2-ci-perk-col" data-intrinsic={isIntrinsic}>
      <span className="d2-ci-perk-head">{header}</span>
      <div className="d2-ci-perk-stack">
        <PlugIcon icon={socket.icon} selected size={isIntrinsic ? 46 : 34} />
        {alternates.map((plug) => (
          <PlugIcon icon={plug.icon} key={plug.plugHash} size={30} />
        ))}
      </div>
      {isIntrinsic ? (
        <div className="d2-ci-perk-intrinsic">
          <strong>{socket.name}</strong>
          {socket.description ? <small>{socket.description}</small> : null}
        </div>
      ) : null}
    </div>
  );
}

function StatRow({ stat, max }: { stat: NormalizedStat; max: number }) {
  if (stat.display === "number") {
    return (
      <div className="d2-ci-stat d2-ci-stat-num">
        <span>{stat.name}</span>
        <strong>{stat.value}</strong>
      </div>
    );
  }
  const pct = Math.max(0, Math.min(100, Math.round((stat.value / max) * 100)));
  return (
    <div className="d2-ci-stat">
      <span>{stat.name}</span>
      <i>
        <b style={{ width: `${pct}%` }} />
      </i>
      <strong>{stat.value}</strong>
    </div>
  );
}

function SlotStrip({ count, label }: { count: number; label: string }) {
  return (
    <div className="d2-ci-modgroup">
      <span className="d2-ci-subhead">{label}</span>
      <div className="d2-ci-slot-row">
        {Array.from({ length: count }).map((_, index) => (
          <span className="d2-ci-modslot" key={index} />
        ))}
      </div>
    </div>
  );
}

function InspectorHeader({ item }: { item: NormalizedDestinyItem }) {
  const isArmor = item.kind === "armor";
  const tier = item.weaponTier ?? item.gearTier ?? null;
  const damageIcon = bungieImage(item.damageType.icon);
  const energy = item.inspector?.energy ?? null;
  const archetype = item.inspector?.archetype ?? null;
  const iconUrl = bungieImage(item.icon);

  return (
    <header className="d2-ci-head">
      <span
        className="d2-ci-thumb"
        data-rarity={item.rarity ?? "unknown"}
        aria-hidden="true"
      >
        {iconUrl ? <Image alt="" height={72} src={iconUrl} width={72} /> : null}
      </span>

      <div className="d2-ci-id">
        <small>{item.slotName}</small>
        <h2>{item.name}</h2>
        <p>
          {item.rarity ?? "Legendary"}
          {item.state.locked ? <Lock aria-label="Locked" /> : null}
        </p>
      </div>

      <div className="d2-ci-headside">
        {isArmor && energy ? (
          <span className="d2-ci-badge d2-ci-badge-energy">
            <b>{energy.capacity}</b> Energy
          </span>
        ) : item.damageType.name ? (
          <span
            className="d2-ci-badge d2-ci-badge-element"
            style={
              item.damageType.color
                ? ({ "--dmg": item.damageType.color } as React.CSSProperties)
                : undefined
            }
          >
            {damageIcon ? (
              <Image alt="" height={16} src={damageIcon} width={16} />
            ) : null}
            {item.damageType.name}
          </span>
        ) : null}
        <span className="d2-ci-power">
          <b>{item.power ?? item.quantity}</b>
          <em>Power</em>
        </span>
      </div>

      <div className="d2-ci-subline">
        {isArmor ? (
          <>
            {tier != null ? <span>Gear Tier · T{tier}</span> : null}
            {archetype ? <span>Archetype · {archetype.name}</span> : null}
            {energy && energy.capacity - energy.used > 0 ? (
              <span className="d2-ci-subline-muted">
                Unused {energy.capacity - energy.used}
              </span>
            ) : null}
          </>
        ) : (
          <>
            {item.inspector?.ammoType ? <span>{item.inspector.ammoType}</span> : null}
            {tier != null ? <span>T{tier}</span> : null}
          </>
        )}
      </div>
    </header>
  );
}

function WeaponOverview({ item }: { item: NormalizedDestinyItem }) {
  const barStats = item.stats.filter((s) => s.display !== "number");
  const numStats = item.stats.filter((s) => s.display === "number");

  return (
    <>
      {item.sockets.length > 0 ? (
        <section className="d2-ci-section">
          <span className="d2-ci-subhead">Weapon Perks</span>
          <div className="d2-ci-perk-grid">
            {item.sockets.map((socket) => (
              <PerkColumn key={`${socket.index}:${socket.plugHash}`} socket={socket} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="d2-ci-section d2-ci-modbar">
        <SlotStrip count={4} label="Weapon Mods" />
        <SlotStrip count={1} label="Enhancement" />
        <SlotStrip count={2} label="Weapon Cosmetics" />
      </section>

      {item.stats.length > 0 ? (
        <section className="d2-ci-section">
          <span className="d2-ci-subhead">Weapon Stats</span>
          <div className="d2-ci-stat-grid">
            <div>
              {barStats.map((stat) => (
                <StatRow key={`${stat.hash}:${stat.name}`} max={100} stat={stat} />
              ))}
            </div>
            <div>
              {numStats.map((stat) => (
                <StatRow key={`${stat.hash}:${stat.name}`} max={100} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function ArmorOverview({ item }: { item: NormalizedDestinyItem }) {
  const energy = item.inspector?.energy ?? null;
  const archetype = item.inspector?.archetype ?? null;
  const setBonus = item.inspector?.setBonus ?? null;
  const unused = energy ? energy.capacity - energy.used : 0;

  return (
    <>
      <div className="d2-ci-armor-grid">
        <div className="d2-ci-armor-left">
          {energy ? (
            <section className="d2-ci-section">
              <span className="d2-ci-subhead">Energy</span>
              <div className="d2-ci-energy">
                <strong>{energy.capacity}</strong>
                <div className="d2-ci-pips">
                  {Array.from({ length: energy.capacity }).map((_, i) => (
                    <span data-on={i < energy.used} key={i} />
                  ))}
                </div>
                {unused > 0 ? <small>Unused {unused}</small> : null}
              </div>
            </section>
          ) : null}

          {archetype ? (
            <section className="d2-ci-section">
              <span className="d2-ci-subhead">Armor Frame / Archetype</span>
              <div className="d2-ci-archetype">
                <span className="d2-ci-arch-icon" aria-hidden="true" />
                <div>
                  <strong>{archetype.name}</strong>
                  {archetype.description ? <small>{archetype.description}</small> : null}
                </div>
              </div>
              <dl className="d2-ci-focus">
                {archetype.primaryStat ? (
                  <div>
                    <dt>Primary Focus</dt>
                    <dd>
                      {archetype.primaryStat}
                      <Plus aria-hidden="true" />
                    </dd>
                  </div>
                ) : null}
                {archetype.secondaryStat ? (
                  <div>
                    <dt>Secondary Focus</dt>
                    <dd>
                      {archetype.secondaryStat}
                      <Plus aria-hidden="true" />
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>
          ) : null}

          <SlotStrip count={5} label="Armor Mods" />
          <SlotStrip count={3} label="Armor Cosmetics" />
        </div>

        <div className="d2-ci-armor-right">
          {item.stats.length > 0 ? (
            <section className="d2-ci-section">
              <span className="d2-ci-subhead">Armor Stats</span>
              <div className="d2-ci-armor-stats">
                {item.stats.map((stat) => (
                  <div className="d2-ci-stat" key={`${stat.hash}:${stat.name}`}>
                    <span>{stat.name}</span>
                    <i>
                      <b style={{ width: `${Math.min(100, (stat.value / 200) * 100)}%` }} />
                    </i>
                    <strong>+{stat.value}</strong>
                  </div>
                ))}
                <div className="d2-ci-stat-total">
                  <span>Total</span>
                  <strong>{item.statTotal}</strong>
                </div>
              </div>
            </section>
          ) : null}

          {setBonus ? (
            <section className="d2-ci-section">
              <span className="d2-ci-subhead">Set Bonus</span>
              <div className="d2-ci-set-head">
                <span className="d2-ci-set-mark" aria-hidden="true" />
                <strong>{setBonus.name}</strong>
                <em>
                  {setBonus.equippedCount}/{setBonus.requiredForFull} Equipped
                </em>
              </div>
              <ul className="d2-ci-set-perks">
                {setBonus.perks.map((perk) => (
                  <li data-active={perk.active} key={perk.requiredCount}>
                    <span className="d2-ci-set-tier">
                      {perk.requiredCount}-Piece Bonus
                      {perk.active ? <Check aria-label="active" /> : null}
                    </span>
                    <small>{perk.description}</small>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      {item.inspector?.source || item.inspector?.reason ? (
        <section className="d2-ci-section d2-ci-meta-row">
          <div>
            <span className="d2-ci-subhead">Source</span>
            <strong>{item.inspector?.source ?? "Unknown"}</strong>
            {item.inspector?.acquired ? <small>Acquired {item.inspector.acquired}</small> : null}
          </div>
          <div>
            <span className="d2-ci-subhead">Reason</span>
            <strong>{item.inspector?.reason ?? "—"}</strong>
            {item.inspector?.instanceNumber != null ? (
              <small>Instance {item.inspector.instanceNumber}</small>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}

export function CommandInspector({ item }: { item: NormalizedDestinyItem | null }) {
  const [tab, setTab] = useState<Tab>("overview");

  if (!item) {
    return (
      <aside className="d2-ci" data-empty="true">
        <p className="d2-muted-note">Select a weapon or armor piece to inspect.</p>
      </aside>
    );
  }

  const isArmor = item.kind === "armor";

  return (
    <aside className="d2-ci" data-kind={item.kind} data-rarity={item.rarity ?? "unknown"}>
      <InspectorHeader item={item} />

      <div className="d2-ci-tabs" role="tablist">
        <button
          aria-selected={tab === "overview"}
          onClick={() => setTab("overview")}
          role="tab"
          type="button"
        >
          Overview
        </button>
        <button
          aria-selected={tab === "triage"}
          onClick={() => setTab("triage")}
          role="tab"
          type="button"
        >
          Triage
        </button>
      </div>

      {tab === "overview" ? (
        <div className="d2-ci-body">
          <button className="d2-ci-notes" type="button">
            <Pencil aria-hidden="true" /> Add notes
          </button>
          {isArmor ? <ArmorOverview item={item} /> : <WeaponOverview item={item} />}
        </div>
      ) : (
        <div className="d2-ci-body">
          <p className="d2-muted-note">
            Triage view — keep/infuse/dismantle guidance will surface here.
          </p>
        </div>
      )}
    </aside>
  );
}
