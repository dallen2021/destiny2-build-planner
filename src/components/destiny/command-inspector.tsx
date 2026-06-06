"use client";

import Image from "next/image";
import { Check, Lock, Pencil } from "lucide-react";
import { forwardRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  NormalizedDestinyItem,
  NormalizedPlug,
  NormalizedSocket,
  NormalizedStat,
} from "@/lib/destiny/inventory";
import {
  getItemPlugSections,
  getWeaponPerkColumns,
  type WeaponPerkColumn,
} from "@/lib/destiny/presentation";

import { bungieImage } from "./item-presentation";

type Tab = "overview" | "triage";

/** Canonical Armor 3.0 display order; the inspector always shows all six. */
const ARMOR_STAT_ORDER = ["Weapons", "Health", "Class", "Melee", "Grenade", "Super"] as const;

const MAX_PERK_ALTERNATES = 5;

const Plug = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & {
    icon: string | null;
    selected?: boolean;
    size?: number;
  }
>(function Plug({ icon, selected = false, size = 30, style, ...rest }, ref) {
  const url = bungieImage(icon);
  return (
    // `...rest` forwards the pointer handlers + data-state Radix injects via asChild.
    <span
      {...rest}
      className="d2-ci-plug"
      data-selected={selected}
      ref={ref}
      style={{ ...style, width: size, height: size }}
      tabIndex={0}
    >
      {url ? <Image alt="" height={size} src={url} width={size} /> : null}
      {selected ? (
        <i className="d2-ci-plug-check" aria-hidden="true">
          <Check />
        </i>
      ) : null}
    </span>
  );
});

/** Tooltip showing a plug's name + description on hover/focus. */
function PlugTip({
  description,
  icon,
  name,
  selected = false,
  size = 30,
}: {
  description?: string | null;
  icon: string | null;
  name: string;
  selected?: boolean;
  size?: number;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Plug icon={icon} selected={selected} size={size} />
      </TooltipTrigger>
      <TooltipContent
        arrowClassName="bg-[#d8a93f] fill-[#d8a93f]"
        className="d2-ci-tip"
        side="left"
      >
        <span className="d2-ci-tip-name">{name}</span>
        {description ? <span className="d2-ci-tip-desc">{description}</span> : null}
      </TooltipContent>
    </Tooltip>
  );
}

function PerkColumn({ column }: { column: WeaponPerkColumn }) {
  const { socket, label, isIntrinsic } = column;
  const alternates = socket.reusablePlugs
    .filter((plug) => plug.plugHash !== socket.plugHash)
    .slice(0, MAX_PERK_ALTERNATES);

  return (
    <div className="d2-ci-perk-col" data-intrinsic={isIntrinsic}>
      <span className="d2-ci-perk-head">{label}</span>
      <div className="d2-ci-perk-stack">
        <PlugTip
          description={socket.description}
          icon={socket.icon}
          name={socket.name}
          selected
          size={isIntrinsic ? 46 : 34}
        />
        {isIntrinsic
          ? null
          : alternates.map((plug) => (
              <PlugTip
                description={plug.description}
                icon={plug.icon}
                key={plug.plugHash}
                name={plug.name}
                size={30}
              />
            ))}
      </div>
      {isIntrinsic ? (
        <div className="d2-ci-perk-intrinsic">
          <strong>{socket.name}</strong>
        </div>
      ) : null}
    </div>
  );
}

function ModSlot({
  plug,
}: {
  plug: Pick<NormalizedPlug, "description" | "icon" | "name">;
}) {
  const icon = bungieImage(plug.icon);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="d2-ci-modslot" data-filled={Boolean(icon)} tabIndex={0}>
          {icon ? <Image alt="" height={30} src={icon} width={30} /> : null}
        </span>
      </TooltipTrigger>
      <TooltipContent
        arrowClassName="bg-[#d8a93f] fill-[#d8a93f]"
        className="d2-ci-tip"
        side="top"
      >
        <span className="d2-ci-tip-name">{plug.name}</span>
        {plug.description ? <span className="d2-ci-tip-desc">{plug.description}</span> : null}
      </TooltipContent>
    </Tooltip>
  );
}

/** A labelled row of mod/cosmetic slots: real plugs first, padded to `count`. */
function SlotRow({
  count,
  items,
  label,
}: {
  count: number;
  items: readonly NormalizedSocket[];
  label: string;
}) {
  const shown = items.slice(0, count);
  const pad = Math.max(0, count - shown.length);
  return (
    <div className="d2-ci-modgroup">
      <span className="d2-ci-subhead">{label}</span>
      <div className="d2-ci-slot-row">
        {shown.map((socket) => (
          <ModSlot key={`${socket.index}:${socket.plugHash}`} plug={socket} />
        ))}
        {Array.from({ length: pad }).map((_, index) => (
          <span aria-hidden="true" className="d2-ci-modslot" key={`pad-${index}`} />
        ))}
      </div>
    </div>
  );
}

function StatRow({ stat }: { stat: NormalizedStat }) {
  if (stat.display === "number") {
    return (
      <div className="d2-ci-stat d2-ci-stat-num">
        <span>{stat.name}</span>
        <strong>{stat.value}</strong>
      </div>
    );
  }
  const pct = Math.max(0, Math.min(100, Math.round((stat.value / 100) * 100)));
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

function InspectorHeader({ item }: { item: NormalizedDestinyItem }) {
  const isArmor = item.kind === "armor";
  const tier = item.weaponTier ?? item.gearTier ?? null;
  const damageIcon = bungieImage(item.damageType.icon);
  const energy = item.inspector?.energy ?? null;
  const archetype = item.inspector?.archetype ?? null;
  const iconUrl = bungieImage(item.icon);

  return (
    <header className="d2-ci-head">
      <span className="d2-ci-thumb" data-rarity={item.rarity ?? "unknown"} aria-hidden="true">
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
            {damageIcon ? <Image alt="" height={16} src={damageIcon} width={16} /> : null}
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
              <span className="d2-ci-subline-muted">Unused {energy.capacity - energy.used}</span>
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
  const columns = getWeaponPerkColumns(item);
  const sections = getItemPlugSections(item);
  const barStats = item.stats.filter((stat) => stat.display !== "number");
  const numStats = item.stats.filter((stat) => stat.display === "number");

  return (
    <>
      {columns.length > 0 ? (
        <section className="d2-ci-section">
          <span className="d2-ci-subhead">Weapon Perks</span>
          <div className="d2-ci-perk-grid">
            {columns.map((column) => (
              <PerkColumn column={column} key={column.key} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="d2-ci-section d2-ci-modbar">
        <SlotRow count={4} items={sections.mods} label="Weapon Mods" />
        <SlotRow count={1} items={sections.upgrades} label="Enhancement" />
        <SlotRow count={3} items={sections.appearance} label="Weapon Cosmetics" />
      </section>

      {item.stats.length > 0 ? (
        <section className="d2-ci-section">
          <span className="d2-ci-subhead">Weapon Stats</span>
          <div className="d2-ci-stat-grid">
            <div>
              {barStats.map((stat) => (
                <StatRow key={`${stat.hash}:${stat.name}`} stat={stat} />
              ))}
            </div>
            <div>
              {numStats.map((stat) => (
                <StatRow key={`${stat.hash}:${stat.name}`} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function ArmorStats({ item }: { item: NormalizedDestinyItem }) {
  const byName = new Map(item.stats.map((stat) => [stat.name, stat] as const));
  const rows = ARMOR_STAT_ORDER.map((name) => byName.get(name)?.value ?? 0);
  const total = rows.reduce((sum, value) => sum + value, 0);

  return (
    <section className="d2-ci-section">
      <span className="d2-ci-subhead">Armor Stats</span>
      <div className="d2-ci-armor-stats">
        {ARMOR_STAT_ORDER.map((name, index) => (
          <div className="d2-ci-stat" key={name}>
            <span>{name}</span>
            <i>
              <b style={{ width: `${Math.min(100, (rows[index] / 200) * 100)}%` }} />
            </i>
            <strong>+{rows[index]}</strong>
          </div>
        ))}
        <div className="d2-ci-stat-total">
          <span>Total</span>
          <strong>{total}</strong>
        </div>
      </div>
    </section>
  );
}

function ArmorOverview({ item }: { item: NormalizedDestinyItem }) {
  const sections = getItemPlugSections(item);
  const energy = item.inspector?.energy ?? null;
  const archetype = item.inspector?.archetype ?? null;
  const archIcon = bungieImage(archetype?.icon ?? null);
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
                <div className="d2-ci-energy-track">
                  {unused > 0 ? <small>Unused {unused}</small> : null}
                  <div className="d2-ci-pips">
                    {Array.from({ length: energy.capacity }).map((_, index) => (
                      <span data-on={index < energy.used} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {archetype ? (
            <section className="d2-ci-section">
              <span className="d2-ci-subhead">Armor Frame / Archetype</span>
              <div className="d2-ci-archetype">
                {archIcon ? (
                  <Image
                    alt=""
                    className="d2-ci-arch-icon"
                    height={44}
                    src={archIcon}
                    width={44}
                  />
                ) : (
                  <span className="d2-ci-arch-icon" aria-hidden="true" />
                )}
                <strong>{archetype.name}</strong>
              </div>
              <dl className="d2-ci-focus">
                {archetype.primaryStat ? (
                  <div>
                    <dt>Primary Focus</dt>
                    <dd>{archetype.primaryStat}</dd>
                  </div>
                ) : null}
                {archetype.secondaryStat ? (
                  <div>
                    <dt>Secondary Focus</dt>
                    <dd>{archetype.secondaryStat}</dd>
                  </div>
                ) : null}
              </dl>
            </section>
          ) : null}

          <SlotRow count={6} items={sections.mods} label="Armor Mods" />
          <SlotRow count={4} items={sections.appearance} label="Armor Cosmetics" />
        </div>

        <div className="d2-ci-armor-right">
          {item.stats.length > 0 ? <ArmorStats item={item} /> : null}

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
          {item.inspector?.source ? (
            <div>
              <span className="d2-ci-subhead">Source</span>
              <strong>{item.inspector.source}</strong>
              {item.inspector.acquired ? <small>Acquired {item.inspector.acquired}</small> : null}
            </div>
          ) : null}
          {item.inspector?.reason ? (
            <div>
              <span className="d2-ci-subhead">Reason</span>
              <strong>{item.inspector.reason}</strong>
              {item.inspector.instanceNumber != null ? (
                <small>Instance {item.inspector.instanceNumber}</small>
              ) : null}
            </div>
          ) : null}
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
