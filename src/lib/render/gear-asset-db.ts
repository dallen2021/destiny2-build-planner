import path from "node:path";
import zlib from "node:zlib";

import { unzipSync } from "fflate";
import initSqlJs, { type Database } from "sql.js";

import { getOptionalBungieConfig } from "@/lib/bungie/config";

/**
 * Reads Bungie's gear-asset SQLite DB (the `mobileGearAssetDataBases`).
 * Unlike the keyless Lowlines endpoint, this exposes the `gear` array on each
 * item entry — the gear-content `.js` files that hold the dye colors.
 * Requires the Bungie API key (manifest lookup). Server-only.
 */

export type GearAssetEntry = {
  geometry: string[];
  textures: string[];
  gear: string[];
};

export type GearDye = {
  slot: number;
  cloth: boolean;
  /** investment_hash — matches CharacterRenderData's applied dyeHash. */
  investment: number;
  /** linear RGB 0–1 */
  primary: [number, number, number];
  secondary: [number, number, number];
  /** primary emissive tint (the glow color for galaxy/“wisp” shaders). */
  emissive: [number, number, number];
  /** material_params[3] — metalness (gold ≈ 1, cloth ≈ 0). */
  metalness: number;
  /** material_params[2] — roughness (gold ≈ 0.35 = shiny). */
  roughness: number;
};

const signedId = (hash: number) => (hash > 0x7fffffff ? hash - 0x100000000 : hash);
const GEAR_CDN = (file: string) =>
  `https://www.bungie.net/common/destiny2_content/geometry/gear/${file}`;

let dbPromise: Promise<Database | null> | null = null;

async function loadDb(): Promise<Database | null> {
  const config = getOptionalBungieConfig();
  if (!config) return null;
  const manifest = await fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", {
    headers: { "X-API-Key": config.apiKey },
    cache: "no-store",
  });
  if (!manifest.ok) return null;
  const manifestJson = (await manifest.json()) as {
    Response?: { mobileGearAssetDataBases?: { version: number; path: string }[] };
  };
  const dbs = manifestJson.Response?.mobileGearAssetDataBases ?? [];
  const dbPath = dbs[dbs.length - 1]?.path;
  if (!dbPath) return null;

  const archive = await fetch(`https://www.bungie.net${dbPath}`, { cache: "no-store" });
  if (!archive.ok) return null;
  const files = unzipSync(new Uint8Array(await archive.arrayBuffer()));
  const sqliteBytes = files[Object.keys(files)[0]];
  if (!sqliteBytes) return null;

  // locateFile + outputFileTracingIncludes (next.config) ships the wasm with the
  // serverless function. Static `require.resolve` of the .wasm trips Turbopack.
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(process.cwd(), "node_modules/sql.js/dist", file),
  });
  return new SQL.Database(sqliteBytes);
}

function getDb(): Promise<Database | null> {
  if (!dbPromise) {
    dbPromise = loadDb().catch(() => null);
  }
  return dbPromise;
}

function decodeBlob(value: unknown): string {
  const bytes = value instanceof Uint8Array ? Buffer.from(value) : Buffer.from(String(value));
  try {
    return zlib.gunzipSync(bytes).toString();
  } catch {
    return bytes.toString().replace(/\0+$/, "");
  }
}

export async function getGearAsset(itemHash: number): Promise<GearAssetEntry | null> {
  const db = await getDb();
  if (!db) return null;
  const stmt = db.prepare("SELECT json FROM DestinyGearAssetsDefinition WHERE id = ?");
  try {
    stmt.bind([signedId(itemHash)]);
    if (!stmt.step()) return null;
    const row = stmt.getAsObject() as { json?: unknown };
    const parsed = JSON.parse(decodeBlob(row.json)) as {
      gear?: string[];
      content?: { platform?: string; geometry?: string[]; textures?: string[] }[];
    };
    const content =
      parsed.content?.find((c) => /mobile/i.test(c.platform ?? "")) ?? parsed.content?.[0] ?? {};
    return {
      geometry: content.geometry ?? [],
      textures: content.textures ?? [],
      gear: parsed.gear ?? [],
    };
  } finally {
    stmt.free();
  }
}

const rgb3 = (value: unknown): [number, number, number] => {
  const a = Array.isArray(value) ? value : [1, 1, 1];
  return [Number(a[0]) || 0, Number(a[1]) || 0, Number(a[2]) || 0];
};

/** Dyes for an item by its hash (armor default dyes, or a shader's dyes). */
export async function getItemDyes(itemHash: number): Promise<GearDye[]> {
  const asset = await getGearAsset(itemHash);
  if (!asset?.gear.length) return [];
  return getGearDyes(asset.gear);
}

/**
 * A shader's detail-diffuse ("wisp"/nebula) texture: the grayscale pattern that
 * gates where a galaxy shader glows. Returns the shader's texture container
 * files + the PNG name to pull from them (the gear route does the extraction).
 */
export async function getShaderDetail(
  shaderHash: number,
): Promise<{ textures: string[]; name: string } | null> {
  const asset = await getGearAsset(shaderHash);
  if (!asset?.gear.length || asset.textures.length === 0) return null;
  const response = await fetch(GEAR_CDN(asset.gear[0]), { cache: "no-store" });
  if (!response.ok) return null;
  const json = (await response.json()) as {
    default_dyes?: { textures?: { diffuse?: { name?: string } } }[];
  };
  const name = (json.default_dyes ?? [])
    .map((dye) => dye.textures?.diffuse?.name)
    .find((n): n is string => Boolean(n));
  return name ? { textures: asset.textures, name } : null;
}

/**
 * Among an item's socket plug hashes, find the equipped shader — the plug whose
 * gear-asset entry carries dye gear files but no geometry (armor/ornaments have
 * geometry; shaders are dye-only).
 */
export async function findShader(plugHashes: number[]): Promise<number | null> {
  for (const hash of plugHashes) {
    if (!hash) continue;
    const asset = await getGearAsset(hash);
    if (asset && asset.gear.length > 0 && asset.geometry.length === 0) {
      return hash;
    }
  }
  return null;
}

/** Fetch the gear-content `.js` files and pull each dye slot's albedo tints. */
export async function getGearDyes(gearFiles: string[]): Promise<GearDye[]> {
  const dyes: GearDye[] = [];
  for (const file of gearFiles) {
    const response = await fetch(GEAR_CDN(file), { cache: "no-store" });
    if (!response.ok) continue;
    const json = (await response.json()) as {
      default_dyes?: {
        slot_type_index?: number;
        cloth?: boolean;
        investment_hash?: number;
        material_properties?: {
          primary_albedo_tint?: unknown;
          secondary_albedo_tint?: unknown;
          primary_emissive_tint_color?: unknown;
          primary_material_params?: unknown;
        };
      }[];
    };
    for (const dye of json.default_dyes ?? []) {
      const mp = dye.material_properties ?? {};
      const params = Array.isArray(mp.primary_material_params) ? mp.primary_material_params : [];
      dyes.push({
        slot: dye.slot_type_index ?? 0,
        cloth: Boolean(dye.cloth),
        investment: dye.investment_hash ?? 0,
        primary: rgb3(mp.primary_albedo_tint),
        secondary: rgb3(mp.secondary_albedo_tint),
        emissive: rgb3(mp.primary_emissive_tint_color),
        metalness: params.length >= 4 ? Number(params[3]) || 0 : 0.3,
        roughness: params.length >= 3 ? Number(params[2]) || 0.6 : 0.6,
      });
    }
  }
  return dyes;
}
