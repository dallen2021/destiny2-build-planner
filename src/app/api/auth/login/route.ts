import { NextRequest, NextResponse } from "next/server";

import {
  getOAuthRedirectUri,
  getOptionalBungieConfig,
} from "@/lib/bungie/config";
import { buildBungieAuthorizationUrl, createOAuthState } from "@/lib/bungie/oauth";
import { setOAuthStateCookie } from "@/lib/session/cookies";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const config = getOptionalBungieConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Bungie OAuth is not configured. Add BUNGIE_API_KEY, BUNGIE_CLIENT_ID, and BUNGIE_CLIENT_SECRET.",
      },
      { status: 500 },
    );
  }

  const state = createOAuthState();
  const redirectUri = getOAuthRedirectUri(request.url, config.redirectUri);
  const authorizationUrl = buildBungieAuthorizationUrl({
    clientId: config.clientId,
    redirectUri,
    state,
  });

  const response = NextResponse.redirect(authorizationUrl);
  setOAuthStateCookie(response, state);
  return response;
}
