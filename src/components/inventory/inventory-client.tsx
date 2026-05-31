"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  RefreshCcw,
  Search,
} from "lucide-react";

import type {
  CharacterSummary,
  NormalizedArmorItem,
  NormalizedArmorInventory,
} from "@/lib/destiny/inventory";

type InventoryPayload = NormalizedArmorInventory & {
  definitionSource: "manifest" | "manifest+entity-fallback";
  fetchedAt: string;
  manifestDefinitionCount: number;
  manifestLanguage: string;
  manifestMissingDefinitionCount: number;
  manifestVersion: string;
};

type InventoryErrorPayload = {
  error?: string;
};

const SLOT_FILTERS = [
  "All",
  "Helmet",
  "Gauntlets",
  "Chest",
  "Legs",
  "Class Item",
] as const;

function bungieImage(path: string | null): string | null {
  if (!path) {
    return null;
  }

  return path.startsWith("http") ? path : `https://www.bungie.net${path}`;
}

function formatStatLine(stats: Record<string, number>): string {
  const entries = Object.entries(stats);
  if (entries.length === 0) {
    return "No stat roll";
  }

  return entries.map(([name, value]) => `${name} ${value}`).join(" / ");
}

function formatDefinitionSource(source: InventoryPayload["definitionSource"]) {
  return source === "manifest+entity-fallback"
    ? "manifest + fallback"
    : "manifest";
}

function CharacterStrip({ characters }: { characters: CharacterSummary[] }) {
  if (characters.length === 0) {
    return null;
  }

  return (
    <section className="character-strip" aria-label="Characters">
      {characters.map((character) => {
        const emblemUrl = bungieImage(character.emblemBackgroundPath);

        return (
          <div className="character-row" key={character.id}>
            {emblemUrl ? (
              <Image
                alt=""
                className="character-emblem"
                height={40}
                src={emblemUrl}
                width={160}
              />
            ) : (
              <span className="character-emblem-fallback" aria-hidden="true" />
            )}
            <span>{character.className}</span>
            <strong>{character.light ?? "-"}</strong>
          </div>
        );
      })}
    </section>
  );
}

function ArmorTable({ armor }: { armor: NormalizedArmorItem[] }) {
  if (armor.length === 0) {
    return (
      <div className="empty-state">
        <Database size={18} />
        <span>No armor matched the current filters.</span>
      </div>
    );
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Slot</th>
            <th>Power</th>
            <th>Class</th>
            <th>Location</th>
            <th>Stats</th>
          </tr>
        </thead>
        <tbody>
          {armor.map((item) => {
            const iconUrl = bungieImage(item.icon);

            return (
              <tr key={item.id}>
                <td>
                  <div className="item-cell">
                    {iconUrl ? (
                      <Image
                        alt=""
                        className="item-icon"
                        height={44}
                        src={iconUrl}
                        width={44}
                      />
                    ) : (
                      <span className="item-icon-fallback" aria-hidden="true" />
                    )}
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.tier ?? "Unknown tier"}</small>
                    </span>
                  </div>
                </td>
                <td>{item.slot}</td>
                <td>{item.power ?? "-"}</td>
                <td>{item.className}</td>
                <td>
                  {item.isEquipped
                    ? "Equipped"
                    : item.location === "vault"
                      ? "Vault"
                      : "Character"}
                </td>
                <td>{formatStatLine(item.stats)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function InventoryClient() {
  const [data, setData] = useState<InventoryPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [slot, setSlot] = useState<(typeof SLOT_FILTERS)[number]>("All");

  const loadInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/destiny/inventory", {
        cache: "no-store",
      });
      const payload = (await response.json()) as
        | InventoryPayload
        | InventoryErrorPayload;

      if (!response.ok) {
        const errorPayload = payload as InventoryErrorPayload;
        throw new Error(errorPayload.error ?? "Inventory request failed.");
      }

      setData(payload as InventoryPayload);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Inventory request failed.",
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadInventory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadInventory]);

  const filteredArmor = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (data?.armor ?? []).filter((item) => {
      const matchesSlot = slot === "All" || item.slot === slot;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.className.toLowerCase().includes(normalizedQuery) ||
        item.slot.toLowerCase().includes(normalizedQuery);

      return matchesSlot && matchesQuery;
    });
  }, [data?.armor, query, slot]);

  return (
    <section className="inventory-workspace">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Armor Workspace</h1>
        </div>
        <button
          className="secondary-action"
          disabled={isLoading}
          onClick={loadInventory}
          type="button"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {data ? (
        <div className="status-row">
          <span>
            <CheckCircle2 size={16} />
            {data.armor.length} armor items
          </span>
          <span>
            <Database size={16} />
            Manifest {data.manifestVersion} / {data.manifestLanguage}
          </span>
          <span>
            {data.manifestDefinitionCount} definitions via{" "}
            {formatDefinitionSource(data.definitionSource)}
          </span>
          {data.manifestMissingDefinitionCount > 0 ? (
            <span>{data.manifestMissingDefinitionCount} missing definitions</span>
          ) : null}
          <span>{new Date(data.fetchedAt).toLocaleString()}</span>
        </div>
      ) : null}

      <CharacterStrip characters={data?.characters ?? []} />

      <div className="inventory-toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search armor"
            type="search"
            value={query}
          />
        </label>

        <div className="segmented-control" aria-label="Armor slot">
          {SLOT_FILTERS.map((filter) => (
            <button
              aria-pressed={slot === filter}
              key={filter}
              onClick={() => setSlot(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-panel">
          <RefreshCcw size={18} />
          <span>Loading inventory</span>
        </div>
      ) : error ? (
        <div className="error-panel">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      ) : (
        <ArmorTable armor={filteredArmor} />
      )}
    </section>
  );
}
