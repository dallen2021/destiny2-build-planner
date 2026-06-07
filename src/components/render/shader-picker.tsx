"use client";

import { useEffect, useMemo, useState } from "react";

type Shader = { hash: number; name: string; icon: string };
type Piece = { label: string };
export type ShaderOverride = { hash: string; name: string };

/**
 * In-app shader switcher for the 3D Guardian. Pick a shader, then choose which
 * armor piece to apply it to (or all of them) — lets you preview shaders per
 * slot without changing anything in-game. Shader list comes from
 * /api/render/shaders.
 */
export function ShaderPicker({
  pieces,
  overrides,
  onApply,
  onReset,
}: {
  /** Armor pieces in render order; index is the apply target. */
  pieces: Piece[];
  /** Active per-piece overrides, keyed by piece index. */
  overrides: Record<number, ShaderOverride>;
  onApply: (hash: string, name: string, target: number | "all") => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [shaders, setShaders] = useState<Shader[] | null>(null);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<ShaderOverride | null>(null);

  useEffect(() => {
    if (!open || shaders) return;
    let cancelled = false;
    void fetch("/api/render/shaders")
      .then((r) => r.json())
      .then((d: { shaders?: Shader[] }) => {
        if (!cancelled) setShaders(d.shaders ?? []);
      })
      .catch(() => {
        if (!cancelled) setShaders([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, shaders]);

  const results = useMemo(() => {
    const list = shaders ?? [];
    const q = query.trim().toLowerCase();
    const filtered = q ? list.filter((s) => s.name.toLowerCase().includes(q)) : list;
    return filtered.slice(0, 150);
  }, [shaders, query]);

  const overrideCount = Object.keys(overrides).length;

  return (
    <div style={wrap}>
      <div style={row}>
        <button type="button" onClick={() => setOpen((o) => !o)} style={pill(open)}>
          🎨 Shaders
        </button>
        {overrideCount > 0 ? (
          <>
            <span style={badge}>
              {overrideCount} {overrideCount === 1 ? "piece" : "pieces"}
            </span>
            <button type="button" onClick={onReset} style={pill(false)}>
              ↺ Equipped
            </button>
          </>
        ) : null}
      </div>

      {open ? (
        <div style={panel}>
          <input
            autoFocus
            placeholder="Search shaders…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={search}
          />
          <div style={grid}>
            {shaders == null ? (
              <span style={hint}>Loading shaders…</span>
            ) : results.length === 0 ? (
              <span style={hint}>No matches.</span>
            ) : (
              results.map((s) => {
                const selected = pending?.hash === String(s.hash);
                return (
                  <button
                    key={s.hash}
                    type="button"
                    title={s.name}
                    onClick={() => setPending({ hash: String(s.hash), name: s.name })}
                    style={swatch(selected)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt={s.name} width={40} height={40} loading="lazy" style={icon} />
                  </button>
                );
              })
            )}
          </div>

          {/* Apply bar: pick a shader above, then choose a piece or All. */}
          <div style={applyBar}>
            {pending ? (
              <>
                <div style={pendingLabel} title={pending.name}>
                  Apply <strong>{pending.name}</strong> to:
                </div>
                <div style={row}>
                  {pieces.map((piece, i) => {
                    const isThis = overrides[i]?.hash === pending.hash;
                    const hasOther = overrides[i] && !isThis;
                    return (
                      <button
                        key={i}
                        type="button"
                        title={overrides[i] ? `Currently: ${overrides[i].name}` : piece.label}
                        onClick={() => onApply(pending.hash, pending.name, i)}
                        style={chip(isThis, Boolean(hasOther))}
                      >
                        {piece.label}
                        {isThis ? " ✓" : hasOther ? " ●" : ""}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => onApply(pending.hash, pending.name, "all")}
                    style={allChip}
                  >
                    Apply to All
                  </button>
                </div>
              </>
            ) : (
              <span style={hint}>Pick a shader, then choose a piece or “Apply to All”.</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const wrap: React.CSSProperties = {
  position: "absolute",
  top: 14,
  left: 14,
  zIndex: 5,
  pointerEvents: "auto",
  font: "12px ui-monospace, SFMono-Regular, Menlo, monospace",
};
const row: React.CSSProperties = { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" };
const pill = (active: boolean): React.CSSProperties => ({
  padding: "6px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.16)",
  background: active ? "rgba(226,232,240,0.92)" : "rgba(16,22,30,0.82)",
  color: active ? "#0b0f14" : "#cfd6dd",
  letterSpacing: "0.03em",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
});
const badge: React.CSSProperties = {
  padding: "5px 10px",
  borderRadius: 999,
  background: "rgba(94,234,212,0.14)",
  border: "1px solid rgba(94,234,212,0.4)",
  color: "#a7f3e0",
};
const panel: React.CSSProperties = {
  marginTop: 8,
  width: 340,
  maxWidth: "min(340px, 74vw)",
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(10,14,20,0.93)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 18px 48px rgba(0,0,0,0.5)",
};
const search: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.35)",
  color: "#e6edf3",
  outline: "none",
  marginBottom: 8,
};
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 44px)",
  gap: 6,
  maxHeight: 230,
  overflowY: "auto",
  justifyContent: "space-between",
};
const swatch = (selected: boolean): React.CSSProperties => ({
  width: 44,
  height: 44,
  padding: 0,
  borderRadius: 8,
  border: selected ? "2px solid #5eead4" : "1px solid rgba(255,255,255,0.1)",
  background: "rgba(0,0,0,0.3)",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: selected ? "0 0 0 2px rgba(94,234,212,0.35)" : "none",
});
const icon: React.CSSProperties = { width: 40, height: 40, display: "block", borderRadius: 6 };
const hint: React.CSSProperties = { color: "#8b97a4", gridColumn: "1 / -1", padding: "8px 2px" };
const applyBar: React.CSSProperties = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: "1px solid rgba(255,255,255,0.1)",
};
const pendingLabel: React.CSSProperties = {
  color: "#cfd6dd",
  marginBottom: 8,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
const chip = (active: boolean, hasOther: boolean): React.CSSProperties => ({
  padding: "5px 9px",
  borderRadius: 8,
  border: `1px solid ${active ? "rgba(94,234,212,0.6)" : "rgba(255,255,255,0.16)"}`,
  background: active ? "rgba(94,234,212,0.18)" : "rgba(16,22,30,0.82)",
  color: active ? "#a7f3e0" : hasOther ? "#e8c98a" : "#cfd6dd",
  cursor: "pointer",
});
const allChip: React.CSSProperties = {
  padding: "5px 11px",
  borderRadius: 8,
  border: "1px solid rgba(226,232,240,0.5)",
  background: "rgba(226,232,240,0.92)",
  color: "#0b0f14",
  fontWeight: 600,
  cursor: "pointer",
};
