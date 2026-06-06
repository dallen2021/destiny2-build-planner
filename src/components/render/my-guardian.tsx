"use client";

import { useEffect, useMemo, useState } from "react";

import { GearCanvas } from "./guardian-canvas";

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  light: number | null;
  emblemPath: string | null;
  armor: string[];
};

// Shown when nobody is signed in, so the stage still demos something.
const DEMO_TITAN = ["1362342075", "241462142", "1192890598", "1437375562"];

type LoadState =
  | { kind: "loading" }
  | { kind: "anon" }
  | { kind: "error"; message: string }
  | { kind: "ready"; characters: RenderCharacter[] };

export function MyGuardian() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/render/character");
        if (response.status === 401) {
          if (!cancelled) setState({ kind: "anon" });
          return;
        }
        const data = (await response.json().catch(() => ({}))) as {
          characters?: RenderCharacter[];
          error?: string;
        };
        if (!response.ok) {
          if (!cancelled) setState({ kind: "error", message: data.error ?? `HTTP ${response.status}` });
          return;
        }
        const characters = (data.characters ?? []).filter((c) => c.armor.length > 0);
        if (!cancelled) {
          setState(
            characters.length ? { kind: "ready", characters } : { kind: "anon" },
          );
        }
      } catch (error) {
        if (!cancelled) {
          setState({ kind: "error", message: error instanceof Error ? error.message : "Failed to load" });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const characters = state.kind === "ready" ? state.characters : null;
  const active = characters?.[Math.min(selected, (characters?.length ?? 1) - 1)] ?? null;

  // Stable identity so GearCanvas doesn't re-init on unrelated re-renders.
  const items = useMemo(
    () => (active ? active.armor : state.kind === "anon" ? DEMO_TITAN : []),
    [active, state.kind],
  );
  const canvasKey = active?.characterId ?? (state.kind === "anon" ? "demo" : "none");

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {items.length > 0 ? (
        <GearCanvas key={canvasKey} itemHashes={items} />
      ) : (
        <Centered>
          {state.kind === "loading"
            ? "Loading your Guardian…"
            : state.kind === "error"
              ? `Couldn't load your Guardian: ${state.message}`
              : "No equipped armor found."}
        </Centered>
      )}

      {/* Class switcher */}
      {characters && characters.length > 1 ? (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            pointerEvents: "auto",
          }}
        >
          {characters.map((character, index) => (
            <button
              key={character.characterId}
              type="button"
              onClick={() => setSelected(index)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background:
                  index === selected ? "rgba(226,232,240,0.92)" : "rgba(18,24,32,0.7)",
                color: index === selected ? "#0b0f14" : "#cfd6dd",
                font: "12px ui-monospace, monospace",
                letterSpacing: "0.04em",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
              }}
            >
              {character.className}
              {character.light != null ? ` · ${character.light}` : ""}
            </button>
          ))}
        </div>
      ) : null}

      {state.kind === "anon" ? (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#9aa6b2",
            font: "12px ui-monospace, monospace",
            letterSpacing: "0.03em",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          Showing a demo set — sign in to render your own Guardian.
        </div>
      ) : null}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#cfd6dd",
        font: "13px ui-monospace, monospace",
        letterSpacing: "0.04em",
        padding: 24,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
