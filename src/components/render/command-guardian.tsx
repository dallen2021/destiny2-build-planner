"use client";

import { useEffect, useState } from "react";

import { GearCanvas } from "./guardian-canvas";
import { shaderPreview, useShaderOverrides } from "./shader-modal";

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  armor: { hash: string; shader: string | null; dyes?: number[]; slot?: string; bucket?: number }[];
};

/**
 * 3D Guardian for the Command stage. Fetches the signed-in player's equipped
 * armor (ornament-aware, via /api/render/character) and renders the character
 * currently selected on the Command page. Shows the power level above the
 * Guardian's head. Re-fetches when `refreshKey` changes (the toolbar reload).
 *
 * Shader previews come from the shared store (set by clicking a piece's shader
 * in the item inspector); they're keyed by armor bucket hash. The canvas is
 * click-through so it never blocks the stage's loadout nodes.
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
  const overrides = useShaderOverrides();

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
  // Apply each piece's previewed shader (keyed by bucket) else show equipped.
  const items = armor.map((piece) => {
    const ov = piece.bucket != null ? overrides[piece.bucket] : undefined;
    return ov ? { hash: piece.hash, shader: ov.hash, dyes: [] as number[] } : piece;
  });
  const previewCount = armor.filter((p) => p.bucket != null && overrides[p.bucket]).length;
  // Remount the canvas whenever the previewed shader set changes.
  const overrideKey = armor.map((p) => (p.bucket != null ? overrides[p.bucket]?.hash ?? "_" : "_")).join(",");

  return (
    <>
      {power != null ? (
        <div className="d2-stage-power" aria-label="Power level">
          <small>POWER</small>
          <strong>{power}</strong>
        </div>
      ) : null}
      {previewCount > 0 ? (
        <button
          type="button"
          onClick={() => shaderPreview.resetAll()}
          className="d2-stage-preview-reset"
        >
          👁 Previewing {previewCount} {previewCount === 1 ? "piece" : "pieces"} · Reset
        </button>
      ) : null}
      {armor.length > 0 ? (
        <div className="d2-stage-guardian-3d" aria-hidden="true">
          <GearCanvas
            key={`${active?.characterId ?? "guardian"}-${refreshKey}-${overrideKey}`}
            items={items}
            showStatus={false}
            interactive={false}
            fill={1.55}
          />
        </div>
      ) : null}
    </>
  );
}
