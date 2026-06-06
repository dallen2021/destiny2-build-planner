"use client";

import { useEffect, useState } from "react";

import { GearCanvas } from "./guardian-canvas";

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  armor: { hash: string; shader: string | null }[];
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

  return (
    <>
      {power != null ? (
        <div className="d2-stage-power" aria-label="Power level">
          <small>POWER</small>
          <strong>{power}</strong>
        </div>
      ) : null}
      {armor.length > 0 ? (
        <div className="d2-stage-guardian-3d" aria-hidden="true">
          <GearCanvas
            key={`${active?.characterId ?? "guardian"}-${refreshKey}`}
            items={armor}
            showStatus={false}
            interactive={false}
            fill={1.55}
          />
        </div>
      ) : null}
    </>
  );
}
