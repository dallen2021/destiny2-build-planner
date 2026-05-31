import {
  BungieApiError,
  bungieFetch,
  getInventoryItemDefinition,
} from "./client";
import { toSignedHash, toUnsignedHash } from "./hash";

const BUNGIE_CONTENT_BASE_URL = "https://www.bungie.net";

export const DESTINY_INVENTORY_ITEM_DEFINITION =
  "DestinyInventoryItemDefinition";
export const DESTINY_INVENTORY_BUCKET_DEFINITION =
  "DestinyInventoryBucketDefinition";
export const DESTINY_STAT_DEFINITION = "DestinyStatDefinition";
export const DESTINY_DAMAGE_TYPE_DEFINITION = "DestinyDamageTypeDefinition";
export const DESTINY_SOCKET_TYPE_DEFINITION = "DestinySocketTypeDefinition";
export const DESTINY_PLUG_SET_DEFINITION = "DestinyPlugSetDefinition";
export const DESTINY_SANDBOX_PERK_DEFINITION = "DestinySandboxPerkDefinition";
export const DESTINY_OBJECTIVE_DEFINITION = "DestinyObjectiveDefinition";
export const DESTINY_COLLECTIBLE_DEFINITION = "DestinyCollectibleDefinition";
export const DESTINY_INVENTORY_ITEM_CONSTANTS_DEFINITION =
  "DestinyInventoryItemConstantsDefinition";

export type DestinyManifest = {
  version?: string;
  jsonWorldComponentContentPaths?: Record<string, Record<string, string>>;
};

export type ManifestFetchOptions = {
  apiKey: string;
};

export type ManifestComponentPath = {
  language: string;
  path: string;
};

export type ManifestComponentOptions = ManifestFetchOptions & {
  componentType: string;
  language?: string;
};

export type ManifestComponentDefinitions<T> = {
  definitions: Record<string, T>;
  language: string;
  path: string;
  version: string;
};

export type InventoryManifestDefinitionOptions = ManifestFetchOptions & {
  fetchMissingDefinitions?: boolean;
  itemHashes: number[];
  language?: string;
};

export type InventoryManifestDefinitionResult<T> = {
  definitionSource: "manifest" | "manifest+entity-fallback";
  definitions: Record<string, T>;
  language: string;
  missingHashes: number[];
  version: string;
};

const componentCache = new Map<string, unknown>();

export function clearManifestCaches(): void {
  componentCache.clear();
}

export function resolveBungieContentUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path.startsWith("/") ? path : `/${path}`, BUNGIE_CONTENT_BASE_URL)
    .toString();
}

export function pickManifestLanguage<T>(
  localized: Record<string, T> | undefined,
  preferredLanguage = "en",
): { language: string; value: T } | null {
  const entries = Object.entries(localized ?? {});
  if (entries.length === 0) {
    return null;
  }

  const preferences = [
    preferredLanguage,
    preferredLanguage.toLowerCase(),
    "en",
  ].filter((language, index, languages) => languages.indexOf(language) === index);

  for (const language of preferences) {
    if (localized?.[language] != null) {
      return { language, value: localized[language] };
    }
  }

  const [language, value] = entries[0];
  return { language, value };
}

export function pickManifestComponentPath(
  manifest: DestinyManifest,
  componentType: string,
  preferredLanguage = "en",
): ManifestComponentPath | null {
  const pathsByLanguage = manifest.jsonWorldComponentContentPaths;
  const availablePaths = Object.fromEntries(
    Object.entries(pathsByLanguage ?? {})
      .map(([language, paths]) => [language, paths[componentType]] as const)
      .filter(([, path]) => Boolean(path)),
  );
  const picked = pickManifestLanguage(availablePaths, preferredLanguage);

  return picked
    ? {
        language: picked.language,
        path: picked.value,
      }
    : null;
}

export async function getDestinyManifest({
  apiKey,
}: ManifestFetchOptions): Promise<DestinyManifest> {
  return bungieFetch<DestinyManifest>({
    apiKey,
    path: "/Destiny2/Manifest/",
  });
}

async function fetchManifestComponent<T>({
  apiKey,
  url,
}: {
  apiKey: string;
  url: string;
}): Promise<Record<string, T>> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new BungieApiError(
      `Bungie manifest content HTTP ${response.status}: ${response.statusText}`,
      response.status,
    );
  }

  const body = (await response.json()) as unknown;
  if (body == null || Array.isArray(body) || typeof body !== "object") {
    throw new BungieApiError(
      "Bungie manifest content was not a definition dictionary.",
      response.status,
    );
  }

  return body as Record<string, T>;
}

export async function getManifestComponentDefinitions<T>({
  apiKey,
  componentType,
  language = "en",
}: ManifestComponentOptions): Promise<ManifestComponentDefinitions<T>> {
  const manifest = await getDestinyManifest({ apiKey });
  const componentPath = pickManifestComponentPath(
    manifest,
    componentType,
    language,
  );

  if (!componentPath) {
    throw new BungieApiError(
      `Bungie manifest does not include ${componentType} JSON component paths.`,
      502,
    );
  }

  const version = manifest.version ?? "unknown";
  const cacheKey = `${version}:${componentPath.language}:${componentType}`;
  const cached = componentCache.get(cacheKey) as Record<string, T> | undefined;

  if (cached) {
    return {
      definitions: cached,
      language: componentPath.language,
      path: componentPath.path,
      version,
    };
  }

  const definitions = await fetchManifestComponent<T>({
    apiKey,
    url: resolveBungieContentUrl(componentPath.path),
  });
  componentCache.set(cacheKey, definitions);

  return {
    definitions,
    language: componentPath.language,
    path: componentPath.path,
    version,
  };
}

function getDefinitionByHash<T>(
  definitions: Record<string, T>,
  itemHash: number,
): T | undefined {
  return (
    definitions[String(itemHash)] ??
    definitions[String(toSignedHash(itemHash))] ??
    definitions[String(toUnsignedHash(itemHash))]
  );
}

export async function getInventoryItemDefinitionsFromManifest<T>({
  apiKey,
  fetchMissingDefinitions = true,
  itemHashes,
  language = "en",
}: InventoryManifestDefinitionOptions): Promise<
  InventoryManifestDefinitionResult<T>
> {
  const uniqueHashes = [...new Set(itemHashes)];
  const component = await getManifestComponentDefinitions<T>({
    apiKey,
    componentType: DESTINY_INVENTORY_ITEM_DEFINITION,
    language,
  });
  const definitions: Record<string, T> = {};
  const missingHashes: number[] = [];

  for (const itemHash of uniqueHashes) {
    const definition = getDefinitionByHash(component.definitions, itemHash);
    if (definition) {
      definitions[String(itemHash)] = definition;
    } else {
      missingHashes.push(itemHash);
    }
  }

  if (!fetchMissingDefinitions || missingHashes.length === 0) {
    return {
      definitionSource: "manifest",
      definitions,
      language: component.language,
      missingHashes,
      version: component.version,
    };
  }

  const fallbackDefinitions = await Promise.all(
    missingHashes.map(async (itemHash) => {
      const definition = await getInventoryItemDefinition<T>({ apiKey, itemHash });
      return [String(itemHash), definition] as const;
    }),
  );

  for (const [itemHash, definition] of fallbackDefinitions) {
    definitions[itemHash] = definition;
  }

  return {
    definitionSource: "manifest+entity-fallback",
    definitions,
    language: component.language,
    missingHashes: [],
    version: component.version,
  };
}
