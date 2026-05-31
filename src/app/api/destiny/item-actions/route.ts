import { NextRequest, NextResponse } from "next/server";

import {
  BungieApiError,
  executeDestinyItemAction,
} from "@/lib/bungie/client";
import { getOptionalBungieConfig } from "@/lib/bungie/config";
import { hasMoveEquipScope } from "@/lib/bungie/oauth";
import {
  buildDestinyItemActionCommand,
  type ItemActionRequest,
} from "@/lib/destiny/item-actions";
import { readSessionCookie } from "@/lib/session/cookies";
import { unsealSession } from "@/lib/session/session";

export const dynamic = "force-dynamic";

type ClientItemActionPayload = Omit<ItemActionRequest, "membershipType">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringField(
  payload: Record<string, unknown>,
  field: string,
): string | null {
  const value = payload[field];
  return typeof value === "string" && value.trim() ? value : null;
}

function numberField(
  payload: Record<string, unknown>,
  field: string,
): number | null {
  const value = payload[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parsePayload(
  payload: unknown,
  membershipType: number,
): ItemActionRequest | null {
  if (!isRecord(payload) || typeof payload.action !== "string") {
    return null;
  }

  const characterId = stringField(payload, "characterId");
  if (!characterId) {
    return null;
  }

  switch (payload.action) {
    case "transfer-to-vault":
    case "transfer-to-character":
    case "pull-postmaster": {
      const itemId = stringField(payload, "itemId");
      const itemReferenceHash = numberField(payload, "itemReferenceHash");
      if (!itemId || itemReferenceHash == null) {
        return null;
      }

      return {
        action: payload.action,
        characterId,
        itemId,
        itemReferenceHash,
        membershipType,
        stackSize: numberField(payload, "stackSize") ?? 1,
      };
    }

    case "equip": {
      const itemId = stringField(payload, "itemId");
      return itemId
        ? {
            action: payload.action,
            characterId,
            itemId,
            membershipType,
          }
        : null;
    }

    case "equip-set": {
      const itemIds = payload.itemIds;
      return Array.isArray(itemIds) &&
        itemIds.every((itemId) => typeof itemId === "string")
        ? {
            action: payload.action,
            characterId,
            itemIds,
            membershipType,
          }
        : null;
    }

    case "set-lock": {
      const itemId = stringField(payload, "itemId");
      return itemId && typeof payload.locked === "boolean"
        ? {
            action: payload.action,
            characterId,
            itemId,
            locked: payload.locked,
            membershipType,
          }
        : null;
    }

    default:
      return null;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

  if (!hasMoveEquipScope(session.scopes)) {
    return NextResponse.json(
      {
        error: "Bungie item actions require reauthorization.",
        requiresMoveEquipReauth: true,
      },
      { status: 403 },
    );
  }

  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Bungie API is not configured." },
      { status: 500 },
    );
  }

  let payload: ClientItemActionPayload | null = null;
  try {
    payload = (await request.json()) as ClientItemActionPayload;
  } catch {
    payload = null;
  }

  const actionRequest = parsePayload(
    payload,
    session.destinyMembership.membershipType,
  );
  if (!actionRequest) {
    return NextResponse.json(
      { error: "Invalid Destiny item action request." },
      { status: 400 },
    );
  }

  try {
    const command = buildDestinyItemActionCommand(actionRequest);
    const response = await executeDestinyItemAction({
      accessToken: session.accessToken,
      apiKey: config.apiKey,
      command,
    });

    return NextResponse.json({ ok: true, response });
  } catch (error) {
    const status = error instanceof BungieApiError ? 502 : 500;

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to perform Destiny item action.",
      },
      { status },
    );
  }
}
