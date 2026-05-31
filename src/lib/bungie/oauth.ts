import crypto from "node:crypto";

export const BUNGIE_AUTHORIZATION_URL =
  "https://www.bungie.net/en/OAuth/Authorize";
export const BUNGIE_TOKEN_URL =
  "https://www.bungie.net/Platform/App/OAuth/token/";

export const DEFAULT_BUNGIE_SCOPES = [
  "ReadBasicUserProfile",
  "ReadDestinyInventoryAndVault",
] as const;

export type BungieOAuthScope = (typeof DEFAULT_BUNGIE_SCOPES)[number] | string;

export type BuildBungieAuthorizationUrlOptions = {
  clientId: string;
  redirectUri: string;
  scopes?: readonly BungieOAuthScope[];
  state: string;
};

export type BungieTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  membership_id?: string;
};

export function createOAuthState(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function buildBungieAuthorizationUrl({
  clientId,
  redirectUri,
  state,
  scopes = DEFAULT_BUNGIE_SCOPES,
}: BuildBungieAuthorizationUrlOptions): URL {
  const url = new URL(BUNGIE_AUTHORIZATION_URL);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);

  if (scopes.length > 0) {
    url.searchParams.set("scope", scopes.join(" "));
  }

  return url;
}

export async function exchangeAuthorizationCode({
  apiKey,
  clientId,
  clientSecret,
  code,
  redirectUri,
}: {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<BungieTokenResponse> {
  const response = await fetch(BUNGIE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-API-Key": apiKey,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`Bungie token exchange failed with HTTP ${response.status}`);
  }

  return (await response.json()) as BungieTokenResponse;
}
