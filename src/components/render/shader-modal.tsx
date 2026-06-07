"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

/**
 * Shared shader-preview state. Lets the item inspector (which sets a preview)
 * and the 3D Guardian (which renders it) talk without prop-drilling through the
 * Command page. Overrides are keyed by armor bucket hash; "Apply to All" fills
 * every armor bucket. Preview-only — nothing is written back to the game.
 */
export type ShaderOverride = { hash: string; name: string };
type Target = { bucket: number; label: string } | null;

// helmet, arms, chest, legs, class — for "Apply to All".
const ALL_ARMOR_BUCKETS = [3448274439, 3551918588, 14239492, 20886954, 1585787867];

let overrides: Record<number, ShaderOverride> = {};
let target: Target = null;
const listeners = new Set<() => void>();
const emit = () => {
  for (const l of listeners) l();
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export const shaderPreview = {
  /** Open the picker targeting one armor piece (by bucket hash). */
  open(bucket: number, label: string) {
    target = { bucket, label };
    emit();
  },
  close() {
    target = null;
    emit();
  },
  apply(hash: string, name: string, scope: "piece" | "all") {
    if (scope === "all") {
      overrides = Object.fromEntries(ALL_ARMOR_BUCKETS.map((b) => [b, { hash, name }]));
    } else if (target) {
      overrides = { ...overrides, [target.bucket]: { hash, name } };
    }
    target = null;
    emit();
  },
  resetBucket(bucket: number) {
    if (!(bucket in overrides)) return;
    const next = { ...overrides };
    delete next[bucket];
    overrides = next;
    target = null;
    emit();
  },
  resetAll() {
    overrides = {};
    target = null;
    emit();
  },
  getOverrides: () => overrides,
  getTarget: () => target,
};

export function useShaderOverrides(): Record<number, ShaderOverride> {
  return useSyncExternalStore(subscribe, shaderPreview.getOverrides, shaderPreview.getOverrides);
}
function useShaderTarget(): Target {
  return useSyncExternalStore(subscribe, shaderPreview.getTarget, shaderPreview.getTarget);
}

type Shader = { hash: number; name: string; icon: string };
let shaderCache: Shader[] | null = null;

/**
 * The shader picker dialog. Render once on the Command page; it shows itself
 * whenever a piece's shader is clicked in the inspector. Pick a shader, then
 * Apply to that piece or to all armor.
 */
export function ShaderPickerModal() {
  const target = useShaderTarget();
  // Keyed by bucket so search + selection reset for free when reopened.
  return target ? <PickerDialog key={target.bucket} target={target} /> : null;
}

function PickerDialog({ target }: { target: { bucket: number; label: string } }) {
  const overrides = useShaderOverrides();
  const [shaders, setShaders] = useState<Shader[] | null>(shaderCache);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<ShaderOverride | null>(null);

  useEffect(() => {
    if (shaderCache) return;
    let cancelled = false;
    void fetch("/api/render/shaders")
      .then((r) => r.json())
      .then((d: { shaders?: Shader[] }) => {
        shaderCache = d.shaders ?? [];
        if (!cancelled) setShaders(shaderCache);
      })
      .catch(() => {
        if (!cancelled) setShaders([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const list = shaders ?? [];
    const q = query.trim().toLowerCase();
    return (q ? list.filter((s) => s.name.toLowerCase().includes(q)) : list).slice(0, 150);
  }, [shaders, query]);

  const current = overrides[target.bucket];

  return (
    <div style={backdrop} onClick={() => shaderPreview.close()}>
      <div style={dialog} onClick={(e) => e.stopPropagation()}>
        <header style={head}>
          <div>
            <small style={{ color: "#8b97a4" }}>Shader · {target.label}</small>
            <div style={{ color: "#e6edf3", fontWeight: 600 }}>
              {current ? `Previewing ${current.name}` : "Pick a shader"}
            </div>
          </div>
          <button type="button" onClick={() => shaderPreview.close()} style={xBtn} aria-label="Close">
            ✕
          </button>
        </header>

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
                  <img src={s.icon} alt={s.name} width={42} height={42} loading="lazy" style={swatchImg} />
                </button>
              );
            })
          )}
        </div>

        <footer style={foot}>
          {pending ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: "#cfd6dd" }} title={pending.name}>
                <strong>{pending.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => shaderPreview.apply(pending.hash, pending.name, "piece")}
                style={applyBtn}
              >
                Apply to {target.label}
              </button>
              <button
                type="button"
                onClick={() => shaderPreview.apply(pending.hash, pending.name, "all")}
                style={applyAllBtn}
              >
                Apply to All
              </button>
            </div>
          ) : (
            <span style={hint}>Select a shader above.</span>
          )}
          {current ? (
            <button
              type="button"
              onClick={() => shaderPreview.resetBucket(target.bucket)}
              style={resetLink}
            >
              Reset {target.label}
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}

const F = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(2,5,10,0.55)",
  backdropFilter: "blur(2px)",
  font: F,
};
const dialog: React.CSSProperties = {
  width: 380,
  maxWidth: "90vw",
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(12,16,22,0.97)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
};
const head: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 10,
};
const xBtn: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.3)",
  color: "#cfd6dd",
  borderRadius: 8,
  width: 28,
  height: 28,
  cursor: "pointer",
};
const search: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.35)",
  color: "#e6edf3",
  outline: "none",
  marginBottom: 10,
};
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 46px)",
  gap: 6,
  maxHeight: 264,
  overflowY: "auto",
  justifyContent: "space-between",
};
const swatch = (selected: boolean): React.CSSProperties => ({
  width: 46,
  height: 46,
  padding: 0,
  borderRadius: 8,
  border: selected ? "2px solid #5eead4" : "1px solid rgba(255,255,255,0.1)",
  background: "rgba(0,0,0,0.3)",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: selected ? "0 0 0 2px rgba(94,234,212,0.35)" : "none",
});
const swatchImg: React.CSSProperties = { width: 42, height: 42, display: "block", borderRadius: 6 };
const hint: React.CSSProperties = { color: "#8b97a4", gridColumn: "1 / -1", padding: "6px 2px" };
const foot: React.CSSProperties = {
  marginTop: 12,
  paddingTop: 12,
  borderTop: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const applyBtn: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid rgba(94,234,212,0.5)",
  background: "rgba(94,234,212,0.16)",
  color: "#a7f3e0",
  cursor: "pointer",
};
const applyAllBtn: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid rgba(226,232,240,0.5)",
  background: "rgba(226,232,240,0.92)",
  color: "#0b0f14",
  fontWeight: 600,
  cursor: "pointer",
};
const resetLink: React.CSSProperties = {
  alignSelf: "flex-start",
  background: "none",
  border: "none",
  color: "#8b97a4",
  textDecoration: "underline",
  cursor: "pointer",
  padding: 0,
};
