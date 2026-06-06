import { NextRequest, NextResponse } from "next/server";

import { extractGearMeshes, type GearMesh } from "@/lib/render/tgxm";

export const dynamic = "force-dynamic";

// Spike only. Keyless path: gear-asset lookup via Lowlines' public endpoint,
// geometry from the public bungie.net CDN. Production will replace the lookup
// with our own gear-asset DB query (needs the Bungie API key).
const gearAssetUrl = (hash: string) =>
  `https://lowlidev.com.au/destiny/api/gearasset/${hash}?destiny2`;
const geometryUrl = (file: string) =>
  `https://www.bungie.net/common/destiny2_content/geometry/platform/mobile/geometry/${file}`;

type GearAssetResponse = {
  gearAsset?: {
    content?: Array<{ platform?: string; geometry?: string[]; textures?: string[] }>;
  };
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ itemHash: string }> },
): Promise<NextResponse> {
  const { itemHash } = await context.params;

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
    if (geometryFiles.length === 0) {
      return NextResponse.json({ error: "no geometry for this item" }, { status: 404 });
    }

    const meshes: GearMesh[] = [];
    for (const file of geometryFiles) {
      const geometryResponse = await fetch(geometryUrl(file));
      if (!geometryResponse.ok) continue;
      const buffer = await geometryResponse.arrayBuffer();
      try {
        meshes.push(...extractGearMeshes(buffer));
      } catch {
        // skip a container we can't parse; keep going for the rest
      }
    }

    // Merge into one indexed mesh and ship it as a compact binary payload —
    // returning hundreds of thousands of numbers as JSON crashes the dev worker.
    let vertexTotal = 0;
    let indexTotal = 0;
    for (const mesh of meshes) {
      vertexTotal += mesh.positions.length / 3;
      indexTotal += mesh.indices.length;
    }
    const positions = new Float32Array(vertexTotal * 3);
    const normals = new Float32Array(vertexTotal * 3);
    const indices = new Uint32Array(indexTotal);
    let positionCursor = 0;
    let indexCursor = 0;
    let vertexBase = 0;
    for (const mesh of meshes) {
      positions.set(mesh.positions, positionCursor * 3);
      normals.set(mesh.normals, positionCursor * 3);
      for (let i = 0; i < mesh.indices.length; i += 1) {
        indices[indexCursor + i] = mesh.indices[i] + vertexBase;
      }
      const meshVertices = mesh.positions.length / 3;
      positionCursor += meshVertices;
      vertexBase += meshVertices;
      indexCursor += mesh.indices.length;
    }

    // Layout: [u32 vCount][u32 iCount][f32 positions][f32 normals][u32 indices]
    const payload = new Uint8Array(
      8 + positions.byteLength + normals.byteLength + indices.byteLength,
    );
    const header = new DataView(payload.buffer);
    header.setUint32(0, vertexTotal, true);
    header.setUint32(4, indexTotal, true);
    payload.set(new Uint8Array(positions.buffer), 8);
    payload.set(new Uint8Array(normals.buffer), 8 + positions.byteLength);
    payload.set(new Uint8Array(indices.buffer), 8 + positions.byteLength + normals.byteLength);

    const stats = {
      itemHash,
      geometryFiles: geometryFiles.length,
      meshCount: meshes.length,
      vertexCount: vertexTotal,
      triangleCount: indexTotal / 3,
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
