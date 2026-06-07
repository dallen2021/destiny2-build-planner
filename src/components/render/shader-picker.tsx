"use client";

import { useEffect, useMemo, useState } from "react";

type Shader = { hash: number; name: string; icon: string };

/**
 * In-app shader switcher for the Command stage. Lets you preview any shader on
 * the 3D Guardian (applied to all armor) without changing it in-game. Sources
 * the full shader list from the manifest via /api/render/shaders.
 */
export function ShaderPicker({
  activeName,
  onPick,
  onReset,
}: {
  /** Name of the currently previewed override, or null when showing equipped. */
  activeName: string | null;
  onPick: (hash: string, name: string) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [shaders, setShaders] = useState<Shader[] | null>(null);
  const [query, setQuery] = useState("");

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

  return (
    <div style={wrap}>
      <div style={row}>
        <button type="button" onClick={() => setOpen((o) => !o)} style={pill(open)}>
          🎨 Shaders
        </button>
        {activeName ? (
          <>
            <span style={badge} title={`Previewing ${activeName}`}>
              {activeName}
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
              results.map((s) => (
                <button
                  key={s.hash}
                  type="button"
                  title={s.name}
                  onClick={() => {
                    onPick(String(s.hash), s.name);
                    setOpen(false);
                  }}
                  style={swatch}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt={s.name} width={40} height={40} loading="lazy" style={icon} />
                </button>
              ))
            )}
          </div>
          {shaders != null && results.length === 150 ? (
            <span style={hint}>Showing first 150 — refine your search to narrow it.</span>
          ) : null}
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
  maxWidth: 160,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "5px 10px",
  borderRadius: 999,
  background: "rgba(94,234,212,0.14)",
  border: "1px solid rgba(94,234,212,0.4)",
  color: "#a7f3e0",
};
const panel: React.CSSProperties = {
  marginTop: 8,
  width: 320,
  maxWidth: "min(320px, 70vw)",
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(10,14,20,0.92)",
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
  maxHeight: 280,
  overflowY: "auto",
  justifyContent: "space-between",
};
const swatch: React.CSSProperties = {
  width: 44,
  height: 44,
  padding: 0,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(0,0,0,0.3)",
  cursor: "pointer",
  overflow: "hidden",
};
const icon: React.CSSProperties = { width: 40, height: 40, display: "block", borderRadius: 6 };
const hint: React.CSSProperties = { color: "#8b97a4", gridColumn: "1 / -1", padding: "8px 2px" };
