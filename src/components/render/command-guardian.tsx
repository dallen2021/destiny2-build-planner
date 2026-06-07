"use client";

import { useEffect, useState } from "react";

import { GearCanvas } from "./guardian-canvas";
import { ShaderPicker, type ShaderOverride } from "./shader-picker";

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  armor: { hash: string; shader: string | null; dyes?: number[]; slot?: string }[];
};

/**
 * 3D Guardian for the Command stage. Fetches the signed-in player's equipped
 * armor (ornament-aware, via /api/render/character) and renders the character
 * currently selected on the Command page. Shows the power level above the
 * Guardian's head. Re-fetches when `refreshKey` changes (the toolbar reload).
 *
 * The canvas is click-through (pointer-events: none on the wrapper) so it never
 * blocks the stage's loadout nodes; it auto-rotates instead of being draggable.
 */
export function CommandGuardian({
  characterId,
  power,
  refreshKey = 0,
}: {
  characterId: string | null;
  power: number | null;
  refreshKey?: number;
}) {
  const [characters, setCharacters] = useState<RenderCharacter[] | null>(null);
  // In-app shader preview: per-piece overrides (keyed by armor index) let you
  // test shaders on one piece or all of them without changing them in-game.
  // dyes=[] lets the gear route resolve the shader's default dye set.
  const [overrides, setOverrides] = useState<Record<number, ShaderOverride>>({});

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/render/character", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) setCharacters([]);
          return;
        }
        const data = (await response.json()) as { characters?: RenderCharacter[] };
        if (!cancelled) setCharacters(data.characters ?? []);
      } catch {
        if (!cancelled) setCharacters([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const active =
    characters?.find((character) => character.characterId === characterId) ??
    (characterId == null ? null : characters?.[0]) ??
    null;
  const armor = active?.armor ?? [];
  // Apply each piece's previewed shader (else show the equipped one).
  const items = armor.map((piece, i) =>
    overrides[i] ? { hash: piece.hash, shader: overrides[i].hash, dyes: [] as number[] } : piece,
  );
  const applyShader = (hash: string, name: string, target: number | "all") => {
    setOverrides((prev) =>
      target === "all"
        ? Object.fromEntries(armor.map((_, i) => [i, { hash, name }]))
        : { ...prev, [target]: { hash, name } },
    );
  };
  // Remount the canvas whenever the per-piece shader set changes.
  const overrideKey = armor.map((_, i) => overrides[i]?.hash ?? "_").join(",");

  return (
    <>
      {power != null ? (
        <div className="d2-stage-power" aria-label="Power level">
          <small>POWER</small>
          <strong>{power}</strong>
        </div>
      ) : null}
      {armor.length > 0 ? (
        <>
          <ShaderPicker
            pieces={armor.map((piece) => ({ label: piece.slot ?? "Armor" }))}
            overrides={overrides}
            onApply={applyShader}
            onReset={() => setOverrides({})}
          />
          <div className="d2-stage-guardian-3d" aria-hidden="true">
            <GearCanvas
              key={`${active?.characterId ?? "guardian"}-${refreshKey}-${overrideKey}`}
              items={items}
              showStatus={false}
              interactive={false}
              fill={1.55}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
