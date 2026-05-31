import { NextRequest, NextResponse } from "next/server";

import {
  BungieApiError,
  getDestinyProfile,
} from "@/lib/bungie/client";
import { getOptionalBungieConfig } from "@/lib/bungie/config";
import { getInventoryItemDefinitionsFromManifest } from "@/lib/bungie/manifest";
import {
  collectInventoryDefinitionHashes,
  normalizeDestinyInventory,
  type DestinyItemDefinition,
  type DestinyProfileResponse,
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
    const manifestDefinitions =
      await getInventoryItemDefinitionsFromManifest<DestinyItemDefinition>({
        apiKey: config.apiKey,
        itemHashes: definitionHashes,
      });

    return NextResponse.json({
      ...normalizeDestinyInventory(profile, manifestDefinitions.definitions),
      definitionSource: manifestDefinitions.definitionSource,
      fetchedAt: new Date().toISOString(),
      manifestDefinitionCount: Object.keys(manifestDefinitions.definitions).length,
      manifestLanguage: manifestDefinitions.language,
      manifestMissingDefinitionCount: manifestDefinitions.missingHashes.length,
      manifestVersion: manifestDefinitions.version,
      membershipDisplayName: session.destinyMembership.displayName,
      membershipId: session.destinyMembership.membershipId,
      membershipType: session.destinyMembership.membershipType,
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
