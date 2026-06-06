"use client";

import { useEffect, useState } from "react";

import { GearCanvas } from "./guardian-canvas";

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  armor: string[];
};

/**
 * 3D Guardian for the Command stage. Fetches the signed-in player's equipped
 * armor (ornament-aware, via /api/render/character) and renders the character
 * currently selected on the Command page. Falls back to the supplied 2.5D
 * silhouette while loading, when signed out, or when geometry is unavailable.
 *
 * The canvas is click-through (pointer-events: none on the wrapper) so it never
 * blocks the stage's loadout nodes; it auto-rotates instead of being draggable.
 */
export function CommandGuardian({
  characterId,
  fallback,
}: {
  characterId: string | null;
  fallback: React.ReactNode;
}) {
  const [characters, setCharacters] = useState<RenderCharacter[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/render/character");
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
  }, []);

  const active =
    characters?.find((character) => character.characterId === characterId) ??
    (characterId == null ? null : characters?.[0]) ??
    null;
  const armor = active?.armor ?? [];

  if (armor.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <div className="d2-stage-guardian-3d" aria-hidden="true">
      <GearCanvas
        key={active?.characterId ?? "guardian"}
        itemHashes={armor}
        showStatus={false}
        interactive={false}
        fill={1.55}
      />
    </div>
  );
}
