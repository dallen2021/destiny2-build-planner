import { NextRequest, NextResponse } from "next/server";

import {
  BungieApiError,
  getDestinyProfile,
} from "@/lib/bungie/client";
import { getOptionalBungieConfig } from "@/lib/bungie/config";
import {
  DESTINY_DAMAGE_TYPE_DEFINITION,
  DESTINY_INVENTORY_BUCKET_DEFINITION,
  DESTINY_STAT_DEFINITION,
  getInventoryItemDefinitionsFromManifest,
  getManifestComponentDefinitions,
} from "@/lib/bungie/manifest";
import { hasMoveEquipScope } from "@/lib/bungie/oauth";
import {
  collectInventoryDefinitionHashes,
  normalizeDestinyInventory,
  type DestinyDamageTypeDefinition,
  type DestinyDefinitionBundle,
  type DestinyInventoryBucketDefinition,
  type DestinyItemDefinition,
  type DestinyProfileResponse,
  type DestinyStatDefinition,
} from "@/lib/destiny/inventory";
import { readSessionCookie } from "@/lib/session/cookies";
import { unsealSession } from "@/lib/session/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionToken = readSessionCookie(request);
  const session = sessionToken ? await unsealSession(sessionToken) : null;

  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!session.destinyMembership) {
    return NextResponse.json(
      { error: "No Destiny membership is attached to this session." },
      { status: 409 },
    );
  }

  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Bungie API is not configured." },
      { status: 500 },
    );
  }

  try {
    const profile = await getDestinyProfile<DestinyProfileResponse>({
      accessToken: session.accessToken,
      apiKey: config.apiKey,
      membershipId: session.destinyMembership.membershipId,
      membershipType: session.destinyMembership.membershipType,
    });
    const definitionHashes = collectInventoryDefinitionHashes(profile);
    const [
      manifestDefinitions,
      statDefinitions,
      bucketDefinitions,
      damageTypeDefinitions,
    ] = await Promise.all([
      getInventoryItemDefinitionsFromManifest<DestinyItemDefinition>({
        apiKey: config.apiKey,
        itemHashes: definitionHashes,
      }),
      getManifestComponentDefinitions<DestinyStatDefinition>({
        apiKey: config.apiKey,
        componentType: DESTINY_STAT_DEFINITION,
      }),
      getManifestComponentDefinitions<DestinyInventoryBucketDefinition>({
        apiKey: config.apiKey,
        componentType: DESTINY_INVENTORY_BUCKET_DEFINITION,
      }),
      getManifestComponentDefinitions<DestinyDamageTypeDefinition>({
        apiKey: config.apiKey,
        componentType: DESTINY_DAMAGE_TYPE_DEFINITION,
      }),
    ]);
    const definitionBundle: DestinyDefinitionBundle = {
      buckets: bucketDefinitions.definitions,
      damageTypes: damageTypeDefinitions.definitions,
      inventoryItems: manifestDefinitions.definitions,
      stats: statDefinitions.definitions,
    };

    return NextResponse.json({
      ...normalizeDestinyInventory(profile, definitionBundle),
      definitionSource: manifestDefinitions.definitionSource,
      fetchedAt: new Date().toISOString(),
      manifestDefinitionCount:
        Object.keys(manifestDefinitions.definitions).length +
        Object.keys(statDefinitions.definitions).length +
        Object.keys(bucketDefinitions.definitions).length +
        Object.keys(damageTypeDefinitions.definitions).length,
      manifestLanguage: manifestDefinitions.language,
      manifestMissingDefinitionCount: manifestDefinitions.missingHashes.length,
      manifestVersion: manifestDefinitions.version,
      membershipDisplayName: session.destinyMembership.displayName,
      membershipId: session.destinyMembership.membershipId,
      membershipType: session.destinyMembership.membershipType,
      requiresMoveEquipReauth: !hasMoveEquipScope(session.scopes),
    });
  } catch (error) {
    const status = error instanceof BungieApiError ? 502 : 500;

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Destiny inventory.",
      },
      { status },
    );
  }
}
