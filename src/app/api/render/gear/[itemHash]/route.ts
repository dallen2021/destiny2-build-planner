import { NextRequest, NextResponse } from "next/server";

import { getItemDyes, type GearDye } from "@/lib/render/gear-asset-db";
import { extractGearMeshes, type GearMesh } from "@/lib/render/tgxm";

export const dynamic = "force-dynamic";

// Spike only. Keyless path: gear-asset lookup via Lowlines' public endpoint,
// geometry + textures from the public bungie.net CDN. Production will replace
// the lookup with our own gear-asset DB query (needs the Bungie API key).
const gearAssetUrl = (hash: string) =>
  `https://lowlidev.com.au/destiny/api/gearasset/${hash}?destiny2`;
const cdnUrl = (kind: "geometry" | "textures", file: string) =>
  `https://www.bungie.net/common/destiny2_content/geometry/platform/mobile/${kind}/${file}`;

type GearAssetResponse = {
  gearAsset?: {
    content?: Array<{ platform?: string; geometry?: string[]; textures?: string[] }>;
  };
};

// Texture .tgxm.bin containers are content-addressed (immutable) — cache the
// extracted PNGs by internal name across requests so we don't re-download.
const textureCache = new Map<string, Map<string, Uint8Array>>();

/** Parse a TGXM container's file table into { internalName: bytes }. */
function readContainerFiles(buffer: ArrayBuffer): Map<string, Uint8Array> {
  const u8 = new Uint8Array(buffer);
  const dv = new DataView(buffer);
  const files = new Map<string, Uint8Array>();
  if (String.fromCharCode(u8[0], u8[1], u8[2], u8[3]) !== "TGXM") return files;
  const tableOffset = dv.getUint32(8, true);
  const fileCount = dv.getUint32(12, true);
  for (let i = 0; i < fileCount; i += 1) {
    const base = tableOffset + i * 272;
    let name = "";
    for (let c = 0; c < 256; c += 1) {
      const ch = u8[base + c];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const offset = dv.getUint32(base + 256, true);
    const size = dv.getUint32(base + 264, true);
    files.set(name, u8.subarray(offset, offset + size));
  }
  return files;
}

async function loadTextureIndex(textureFiles: string[]): Promise<Map<string, Uint8Array>> {
  const index = new Map<string, Uint8Array>();
  await Promise.all(
    textureFiles.map(async (file) => {
      let entries = textureCache.get(file);
      if (!entries) {
        const response = await fetch(cdnUrl("textures", file));
        if (!response.ok) return;
        entries = readContainerFiles(await response.arrayBuffer());
        textureCache.set(file, entries);
      }
      for (const [name, bytes] of entries) {
        if (!index.has(name)) index.set(name, bytes);
      }
    }),
  );
  return index;
}

type Placement = { x: number; y: number; w: number; h: number; png: Uint8Array };
type Plate = { w: number; h: number; placements: Placement[] };
type Part = {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint32Array;
  diffuse: Plate;
  normal: Plate;
  gearstack: Plate;
  dyeSlot: number;
};

function align4(n: number): number {
  return (n + 3) & ~3;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ itemHash: string }> },
): Promise<NextResponse> {
  const { itemHash } = await context.params;
  const shaderHash = request.nextUrl.searchParams.get("shader");

  try {
    const gearResponse = await fetch(gearAssetUrl(itemHash));
    if (!gearResponse.ok) {
      return NextResponse.json(
        { error: `gear asset lookup failed (HTTP ${gearResponse.status})` },
        { status: 502 },
      );
    }
    const gear = (await gearResponse.json()) as GearAssetResponse;
    const content =
      gear.gearAsset?.content?.find((entry) => /mobile/i.test(entry.platform ?? "")) ??
      gear.gearAsset?.content?.[0];
    const geometryFiles = content?.geometry ?? [];
    const textureFiles = content?.textures ?? [];
    if (geometryFiles.length === 0) {
      return NextResponse.json({ error: "no geometry for this item" }, { status: 404 });
    }

    const meshes: GearMesh[] = [];
    for (const file of geometryFiles) {
      const geometryResponse = await fetch(cdnUrl("geometry", file));
      if (!geometryResponse.ok) continue;
      try {
        meshes.push(...extractGearMeshes(await geometryResponse.arrayBuffer()));
      } catch {
        // skip a container we can't parse; keep going for the rest
      }
    }
    if (meshes.length === 0) {
      return NextResponse.json({ error: "no renderable meshes" }, { status: 404 });
    }

    // Resolve plate placements (diffuse + normal) to their PNG bytes.
    const needsTextures = meshes.some(
      (m) =>
        (m.diffusePlate?.placements.length ?? 0) > 0 ||
        (m.normalPlate?.placements.length ?? 0) > 0,
    );
    const textureIndex = needsTextures
      ? await loadTextureIndex(textureFiles)
      : new Map<string, Uint8Array>();

    const resolvePlate = (plate: GearMesh["diffusePlate"]): Plate => {
      const placements: Placement[] = [];
      for (const p of plate?.placements ?? []) {
        const png = textureIndex.get(p.name);
        if (png) placements.push({ x: p.x, y: p.y, w: p.w, h: p.h, png });
      }
      return { w: plate?.width ?? 0, h: plate?.height ?? 0, placements };
    };

    const parts: Part[] = meshes.map((mesh) => ({
      positions: new Float32Array(mesh.positions),
      normals: new Float32Array(mesh.normals),
      uvs: new Float32Array(mesh.uvs),
      indices: new Uint32Array(mesh.indices),
      diffuse: resolvePlate(mesh.diffusePlate),
      normal: resolvePlate(mesh.normalPlate),
      gearstack: resolvePlate(mesh.gearstackPlate),
      dyeSlot: mesh.dyeSlot,
    }));

    const headerPlate = (plate: Plate) =>
      plate.placements.length > 0
        ? {
            w: plate.w,
            h: plate.h,
            placements: plate.placements.map((pl) => ({
              x: pl.x,
              y: pl.y,
              w: pl.w,
              h: pl.h,
              png: pl.png.byteLength,
            })),
          }
        : null;

    // Dye colors live in the gear-asset DB's `gear` files (which Lowlines
    // strips). Prefer the equipped shader's dyes (what the player sees); fall
    // back to the item's own default dyes. Best-effort — never block the render.
    let dyes: GearDye[] = [];
    try {
      dyes = await getItemDyes(shaderHash ? Number(shaderHash) : Number(itemHash));
      if (dyes.length === 0 && shaderHash) {
        dyes = await getItemDyes(Number(itemHash));
      }
    } catch {
      dyes = [];
    }

    // JSON header describes structure; geometry then diffuse PNGs then normal PNGs.
    const header = {
      dyes,
      parts: parts.map((part) => ({
        v: part.positions.length / 3,
        i: part.indices.length,
        dyeSlot: part.dyeSlot,
        diffuse: headerPlate(part.diffuse),
        normal: headerPlate(part.normal),
        gearstack: headerPlate(part.gearstack),
      })),
    };
    const jsonBytes = new TextEncoder().encode(JSON.stringify(header));
    const geomStart = align4(4 + jsonBytes.byteLength);

    let geomBytes = 0;
    let pngBytes = 0;
    for (const part of parts) {
      geomBytes +=
        part.positions.byteLength +
        part.normals.byteLength +
        part.uvs.byteLength +
        part.indices.byteLength;
      for (const pl of part.diffuse.placements) pngBytes += pl.png.byteLength;
      for (const pl of part.normal.placements) pngBytes += pl.png.byteLength;
      for (const pl of part.gearstack.placements) pngBytes += pl.png.byteLength;
    }

    const payload = new Uint8Array(geomStart + geomBytes + pngBytes);
    new DataView(payload.buffer).setUint32(0, jsonBytes.byteLength, true);
    payload.set(jsonBytes, 4);

    let cursor = geomStart;
    const writeTyped = (arr: Float32Array | Uint32Array) => {
      payload.set(new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength), cursor);
      cursor += arr.byteLength;
    };
    for (const part of parts) {
      writeTyped(part.positions);
      writeTyped(part.normals);
      writeTyped(part.uvs);
      writeTyped(part.indices);
    }
    for (const part of parts) {
      for (const pl of part.diffuse.placements) {
        payload.set(pl.png, cursor);
        cursor += pl.png.byteLength;
      }
    }
    for (const part of parts) {
      for (const pl of part.normal.placements) {
        payload.set(pl.png, cursor);
        cursor += pl.png.byteLength;
      }
    }
    for (const part of parts) {
      for (const pl of part.gearstack.placements) {
        payload.set(pl.png, cursor);
        cursor += pl.png.byteLength;
      }
    }

    const stats = {
      itemHash,
      parts: parts.length,
      vertexCount: parts.reduce((n, p) => n + p.positions.length / 3, 0),
      triangleCount: parts.reduce((n, p) => n + p.indices.length / 3, 0),
      textured: parts.filter((p) => p.diffuse.placements.length > 0).length,
      dyes: dyes.length,
    };
    return new NextResponse(payload, {
      headers: {
        "content-type": "application/octet-stream",
        "x-mesh-stats": JSON.stringify(stats),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "render failed" },
      { status: 500 },
    );
  }
}
