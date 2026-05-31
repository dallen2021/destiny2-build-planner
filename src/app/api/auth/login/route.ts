import { NextResponse } from "next/server";

import { getOptionalBungieConfig } from "@/lib/bungie/config";
import { buildBungieAuthorizationUrl, createOAuthState } from "@/lib/bungie/oauth";
import { setOAuthStateCookie } from "@/lib/session/cookies";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Bungie OAuth is not configured. Add BUNGIE_API_KEY, BUNGIE_CLIENT_ID, BUNGIE_CLIENT_SECRET, and OAUTH_REDIRECT_URI.",
      },
      { status: 500 },
    );
  }

  const state = createOAuthState();
  const authorizationUrl = buildBungieAuthorizationUrl({
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    state,
  });

  const response = NextResponse.redirect(authorizationUrl);
  setOAuthStateCookie(response, state);
  return response;
}
