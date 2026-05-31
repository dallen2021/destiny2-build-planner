import { NextRequest, NextResponse } from "next/server";

import {
  getCurrentUserMemberships,
  pickDestinyMembership,
} from "@/lib/bungie/client";
import { getOptionalBungieConfig } from "@/lib/bungie/config";
import { exchangeAuthorizationCode } from "@/lib/bungie/oauth";
import {
  clearOAuthStateCookie,
  readOAuthStateCookie,
  setSessionCookie,
} from "@/lib/session/cookies";
import {
  createSessionId,
  sealSession,
  type StoredSession,
} from "@/lib/session/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const expectedState = readOAuthStateCookie(request);

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.json(
      { error: "Invalid Bungie OAuth callback state." },
      { status: 400 },
    );
  }

  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Bungie OAuth is not configured." },
      { status: 500 },
    );
  }

  try {
    const token = await exchangeAuthorizationCode({
      apiKey: config.apiKey,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      code,
      redirectUri: config.redirectUri,
    });
    const memberships = await getCurrentUserMemberships({
      accessToken: token.access_token,
      apiKey: config.apiKey,
    });
    const destinyMembership = pickDestinyMembership(memberships);

    if (!destinyMembership) {
      return NextResponse.json(
        { error: "No Destiny membership was returned for this Bungie account." },
        { status: 409 },
      );
    }

    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + Math.max(token.expires_in - 60, 60) * 1000,
    ).toISOString();
    const session: StoredSession = {
      id: createSessionId(),
      accessToken: token.access_token,
      bungieUser: {
        displayName:
          memberships.bungieNetUser?.displayName ??
          memberships.bungieNetUser?.uniqueName,
      },
      createdAt: now.toISOString(),
      destinyMembership,
      expiresAt,
      membershipId: token.membership_id ?? destinyMembership.membershipId,
      refreshToken: token.refresh_token,
      updatedAt: now.toISOString(),
    };

    const sessionToken = await sealSession(session);
    const response = NextResponse.redirect(new URL("/inventory", request.url));
    setSessionCookie(response, sessionToken, session.expiresAt);
    clearOAuthStateCookie(response);
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Bungie OAuth callback failed.",
      },
      { status: 502 },
    );
  }
}
