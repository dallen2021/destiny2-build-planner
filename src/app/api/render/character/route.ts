import { NextRequest, NextResponse } from "next/server";

import { bungieFetch } from "@/lib/bungie/client";
import { getOptionalBungieConfig } from "@/lib/bungie/config";
import { findShader } from "@/lib/render/gear-asset-db";
import {
  ARMOR_SLOT_BY_BUCKET_HASH,
  type DestinyProfileResponse,
} from "@/lib/destiny/inventory";
import { readSessionCookie } from "@/lib/session/cookies";
import { unsealSession } from "@/lib/session/session";

export const dynamic = "force-dynamic";

const CLASS_NAME: Record<number, string> = {
  0: "Titan",
  1: "Hunter",
  2: "Warlock",
  3: "Guardian",
};

// Body render order: helmet, arms, chest, legs, class item (mark/bond/cloak).
const ARMOR_BUCKET_ORDER = [3448274439, 3551918588, 14239492, 20886954, 1585787867];

type RenderCharacter = {
  characterId: string;
  classType: number;
  className: string;
  light: number | null;
  emblemPath: string | null;
  /** Equipped armor pieces (ornament-aware render hash + equipped shader). */
  armor: { hash: string; shader: string | null }[];
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = readSessionCookie(request);
  const session = token ? await unsealSession(token) : null;
  if (!session) {
    return NextResponse.json(
      { authenticated: false, error: "Authentication required." },
      { status: 401 },
    );
  }
  if (!session.destinyMembership) {
    return NextResponse.json(
      { authenticated: true, error: "No Destiny membership on this session." },
      { status: 409 },
    );
  }
  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json({ error: "Bungie API is not configured." }, { status: 500 });
  }

  try {
    const profile = await bungieFetch<DestinyProfileResponse>({
      accessToken: session.accessToken,
      apiKey: config.apiKey,
      path: `/Destiny2/${session.destinyMembership.membershipType}/Profile/${session.destinyMembership.membershipId}/`,
      // Just what we need to place a body on the stage — keep it light.
      searchParams: { components: ["Characters", "CharacterEquipment", "ItemSockets"] },
    });

    const characterData = profile.characters?.data ?? {};
    const equipment = profile.characterEquipment?.data ?? {};
    const socketsData = profile.itemComponents?.sockets?.data ?? {};

    // The equipped shader is a plug in the armor's sockets; resolve it so we can
    // render the player's actual shader colors, not the item's default dyes.
    const resolveShader = async (instanceId: string | undefined): Promise<string | null> => {
      if (!instanceId) return null;
      const plugHashes = (socketsData[instanceId]?.sockets ?? [])
        .map((socket) => socket.plugHash)
        .filter((hash): hash is number => hash != null);
      const shader = await findShader(plugHashes);
      return shader != null ? String(shader) : null;
    };

    const characters: RenderCharacter[] = [];
    for (const character of Object.values(characterData)) {
      const id = character.characterId ?? "";
      const items = equipment[id]?.items ?? [];
      const byBucket = new Map<number, { hash: string; instanceId?: string }>();
      for (const item of items) {
        if (item.bucketHash != null && item.bucketHash in ARMOR_SLOT_BY_BUCKET_HASH) {
          // overrideStyleItemHash is the applied (universal) ornament.
          byBucket.set(item.bucketHash, {
            hash: String(item.overrideStyleItemHash || item.itemHash),
            instanceId: item.itemInstanceId,
          });
        }
      }
      const armor: { hash: string; shader: string | null }[] = [];
      for (const bucket of ARMOR_BUCKET_ORDER) {
        const entry = byBucket.get(bucket);
        if (!entry) continue;
        armor.push({ hash: entry.hash, shader: await resolveShader(entry.instanceId) });
      }
      if (armor.length === 0) continue;
      const classType = character.classType ?? 3;
      characters.push({
        characterId: id,
        classType,
        className: CLASS_NAME[classType] ?? "Guardian",
        light: character.light ?? null,
        emblemPath: character.emblemBackgroundPath
          ? `https://www.bungie.net${character.emblemBackgroundPath}`
          : null,
        armor,
      });
    }

    return NextResponse.json({ authenticated: true, characters });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load characters." },
      { status: 502 },
    );
  }
}
