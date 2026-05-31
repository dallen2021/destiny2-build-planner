import type { DestinyMembership } from "@/lib/session/session";

const BUNGIE_PLATFORM_BASE_URL = "https://www.bungie.net/Platform";

export const DESTINY_PROFILE_COMPONENTS = [
  "Profiles",
  "Characters",
  "ProfileInventories",
  "CharacterInventories",
  "CharacterEquipment",
  "ItemInstances",
  "ItemStats",
] as const;

type SearchParamValue =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[];

export type BungieFetchOptions = {
  accessToken?: string;
  apiKey: string;
  body?: unknown;
  method?: "GET" | "POST";
  path: string;
  searchParams?: Record<string, SearchParamValue | undefined>;
};

type BungiePlatformEnvelope<T> = {
  ErrorCode?: number;
  Message?: string;
  Response?: T;
};

export type BungieCurrentUserMemberships = {
  bungieNetUser?: {
    displayName?: string;
    uniqueName?: string;
    membershipId?: string;
  };
  destinyMemberships?: DestinyMembership[];
  primaryMembershipId?: string;
};

export type GetProfileOptions = {
  accessToken: string;
  apiKey: string;
  membershipId: string;
  membershipType: number;
};

export class BungieApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errorCode?: number,
  ) {
    super(message);
    this.name = "BungieApiError";
  }
}

function createPlatformUrl(
  path: string,
  searchParams?: BungieFetchOptions["searchParams"],
): URL {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(normalizedPath, `${BUNGIE_PLATFORM_BASE_URL}/`);

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value == null) {
      continue;
    }

    url.searchParams.set(
      key,
      Array.isArray(value) ? value.join(",") : String(value),
    );
  }

  return url;
}

async function readJsonEnvelope<T>(
  response: Response,
): Promise<BungiePlatformEnvelope<T>> {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as BungiePlatformEnvelope<T>;
  } catch {
    throw new BungieApiError(
      `Bungie returned a non-JSON response with HTTP ${response.status}`,
      response.status,
    );
  }
}

export async function bungieFetch<T = unknown>({
  accessToken,
  apiKey,
  body,
  method = body == null ? "GET" : "POST",
  path,
  searchParams,
}: BungieFetchOptions): Promise<T> {
  const url = createPlatformUrl(path, searchParams);
  const headers: Record<string, string> = {
    "X-API-Key": apiKey,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (body != null) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(String(url), {
    body: body == null ? undefined : JSON.stringify(body),
    cache: "no-store",
    headers,
    method,
  });
  const envelope = await readJsonEnvelope<T>(response);

  if (!response.ok) {
    throw new BungieApiError(
      `Bungie HTTP ${response.status}: ${envelope.Message ?? response.statusText}`,
      response.status,
      envelope.ErrorCode,
    );
  }

  if (envelope.ErrorCode != null && envelope.ErrorCode !== 1) {
    throw new BungieApiError(
      `Bungie API error ${envelope.ErrorCode}: ${envelope.Message ?? "Unknown error"}`,
      response.status,
      envelope.ErrorCode,
    );
  }

  return envelope.Response as T;
}

export async function getCurrentUserMemberships({
  accessToken,
  apiKey,
}: {
  accessToken: string;
  apiKey: string;
}): Promise<BungieCurrentUserMemberships> {
  return bungieFetch<BungieCurrentUserMemberships>({
    accessToken,
    apiKey,
    path: "/User/GetMembershipsForCurrentUser/",
  });
}

export function pickDestinyMembership(
  memberships: BungieCurrentUserMemberships,
): DestinyMembership | null {
  const destinyMemberships = memberships.destinyMemberships ?? [];
  return (
    destinyMemberships.find(
      (membership) =>
        membership.membershipId === memberships.primaryMembershipId,
    ) ??
    destinyMemberships[0] ??
    null
  );
}

export async function getDestinyProfile<T = unknown>({
  accessToken,
  apiKey,
  membershipId,
  membershipType,
}: GetProfileOptions): Promise<T> {
  return bungieFetch<T>({
    accessToken,
    apiKey,
    path: `/Destiny2/${membershipType}/Profile/${membershipId}/`,
    searchParams: {
      components: DESTINY_PROFILE_COMPONENTS,
    },
  });
}

export async function getInventoryItemDefinition<T = unknown>({
  apiKey,
  itemHash,
}: {
  apiKey: string;
  itemHash: number;
}): Promise<T> {
  return bungieFetch<T>({
    apiKey,
    path: `/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
  });
}
