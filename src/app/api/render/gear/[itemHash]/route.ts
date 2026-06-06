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
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Render spike is dev-only." }, { status: 404 });
  }

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

    const stats = {
      itemHash,
      geometryFiles: geometryFiles.length,
      meshCount: meshes.length,
      vertexCount: meshes.reduce((sum, mesh) => sum + mesh.positions.length / 3, 0),
      triangleCount: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
    };
    return NextResponse.json({ stats, meshes });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "render failed" },
      { status: 500 },
    );
  }
}
