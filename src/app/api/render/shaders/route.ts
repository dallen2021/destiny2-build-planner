import { NextResponse } from "next/server";

import { getOptionalBungieConfig } from "@/lib/bungie/config";
import {
  DESTINY_INVENTORY_ITEM_DEFINITION,
  getManifestComponentDefinitions,
} from "@/lib/bungie/manifest";

export const dynamic = "force-dynamic";

// itemSubType 20 = Shader (verified against live defs; "Luminous Void" etc.).
const SHADER_SUBTYPE = 20;

type ItemDef = {
  displayProperties?: { name?: string; icon?: string };
  itemSubType?: number;
  redacted?: boolean;
};

type Shader = { hash: number; name: string; icon: string };

// The full item-def dictionary is large (~50 MB) and rarely changes; cache the
// derived shader list at module scope so we scan it at most once per instance.
let shaderCache: Shader[] | null = null;

export async function GET(): Promise<NextResponse> {
  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json({ error: "Bungie API is not configured." }, { status: 500 });
  }
  if (shaderCache) {
    return NextResponse.json({ shaders: shaderCache });
  }

  try {
    const { definitions } = await getManifestComponentDefinitions<ItemDef>({
      apiKey: config.apiKey,
      componentType: DESTINY_INVENTORY_ITEM_DEFINITION,
    });

    const byName = new Map<string, Shader>();
    for (const [hash, def] of Object.entries(definitions)) {
      if (def.redacted || def.itemSubType !== SHADER_SUBTYPE) continue;
      const name = def.displayProperties?.name?.trim();
      const icon = def.displayProperties?.icon;
      if (!name || !icon) continue;
      // Collapse duplicate-named shaders (same look, different source hashes).
      if (!byName.has(name)) {
        byName.set(name, {
          hash: Number(hash),
          name,
          icon: `https://www.bungie.net${icon}`,
        });
      }
    }

    const shaders = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
    shaderCache = shaders;
    return NextResponse.json({ shaders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load shaders." },
      { status: 502 },
    );
  }
}
