import { afterEach, describe, expect, it, vi } from "vitest";

import {
  DESTINY_INVENTORY_ITEM_DEFINITION,
  clearManifestCaches,
  getInventoryItemDefinitionsFromManifest,
  getManifestComponentDefinitions,
  pickManifestComponentPath,
  pickManifestLanguage,
  resolveBungieContentUrl,
  type DestinyManifest,
} from "./manifest";

function manifestEnvelope(manifest: DestinyManifest): Response {
  return new Response(
    JSON.stringify({
      ErrorCode: 1,
      Response: manifest,
    }),
    { status: 200 },
  );
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 });
}

describe("manifest helpers", () => {
  afterEach(() => {
    clearManifestCaches();
    vi.unstubAllGlobals();
  });

  it("resolves Bungie relative content paths to absolute URLs", () => {
    expect(resolveBungieContentUrl("/common/destiny2/items.json")).toBe(
      "https://www.bungie.net/common/destiny2/items.json",
    );
    expect(resolveBungieContentUrl("common/destiny2/items.json")).toBe(
      "https://www.bungie.net/common/destiny2/items.json",
    );
    expect(resolveBungieContentUrl("https://cdn.example.test/items.json")).toBe(
      "https://cdn.example.test/items.json",
    );
  });

  it("picks preferred language, then English, then the first available value", () => {
    expect(
      pickManifestLanguage({ de: "Deutsch", en: "English" }, "de"),
    ).toEqual({
      language: "de",
      value: "Deutsch",
    });
    expect(
      pickManifestLanguage({ fr: "Francais", en: "English" }, "de"),
    ).toEqual({
      language: "en",
      value: "English",
    });
    expect(pickManifestLanguage({ fr: "Francais" }, "de")).toEqual({
      language: "fr",
      value: "Francais",
    });
    expect(pickManifestLanguage(undefined, "en")).toBeNull();
  });

  it("picks a component path from the best language that contains the component", () => {
    const manifest: DestinyManifest = {
      version: "123",
      jsonWorldComponentContentPaths: {
        fr: {
          DestinyClassDefinition: "/fr/classes.json",
        },
        en: {
          DestinyClassDefinition: "/en/classes.json",
          DestinyInventoryItemDefinition: "/en/items.json",
        },
      },
    };

    expect(
      pickManifestComponentPath(
        manifest,
        DESTINY_INVENTORY_ITEM_DEFINITION,
        "fr",
      ),
    ).toEqual({
      language: "en",
      path: "/en/items.json",
    });
    expect(
      pickManifestComponentPath(manifest, "DestinyMissingDefinition", "en"),
    ).toBeNull();
  });
});

describe("manifest component loading", () => {
  afterEach(() => {
    clearManifestCaches();
    vi.unstubAllGlobals();
  });

  it("caches component JSON by manifest version and refetches when the version changes", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        manifestEnvelope({
          version: "v1",
          jsonWorldComponentContentPaths: {
            en: {
              DestinyInventoryItemDefinition: "/items-v1.json",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          100: { displayProperties: { name: "Helmet v1" } },
        }),
      )
      .mockResolvedValueOnce(
        manifestEnvelope({
          version: "v1",
          jsonWorldComponentContentPaths: {
            en: {
              DestinyInventoryItemDefinition: "/items-v1.json",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        manifestEnvelope({
          version: "v2",
          jsonWorldComponentContentPaths: {
            en: {
              DestinyInventoryItemDefinition: "/items-v2.json",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          100: { displayProperties: { name: "Helmet v2" } },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const first = await getManifestComponentDefinitions<{
      displayProperties?: { name?: string };
    }>({
      apiKey: "api-key",
      componentType: DESTINY_INVENTORY_ITEM_DEFINITION,
    });
    const second = await getManifestComponentDefinitions<{
      displayProperties?: { name?: string };
    }>({
      apiKey: "api-key",
      componentType: DESTINY_INVENTORY_ITEM_DEFINITION,
    });
    const third = await getManifestComponentDefinitions<{
      displayProperties?: { name?: string };
    }>({
      apiKey: "api-key",
      componentType: DESTINY_INVENTORY_ITEM_DEFINITION,
    });

    expect(first.version).toBe("v1");
    expect(first.definitions["100"].displayProperties?.name).toBe("Helmet v1");
    expect(second.definitions["100"].displayProperties?.name).toBe("Helmet v1");
    expect(third.version).toBe("v2");
    expect(third.definitions["100"].displayProperties?.name).toBe("Helmet v2");
    expect(fetchMock).toHaveBeenCalledTimes(5);
    expect(String(fetchMock.mock.calls[1][0])).toBe(
      "https://www.bungie.net/items-v1.json",
    );
    expect(String(fetchMock.mock.calls[4][0])).toBe(
      "https://www.bungie.net/items-v2.json",
    );
  });

  it("selects requested inventory item definitions and reports missing hashes", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          manifestEnvelope({
            version: "manifest-version",
            jsonWorldComponentContentPaths: {
              en: {
                DestinyInventoryItemDefinition: "/items.json",
              },
            },
          }),
        )
        .mockResolvedValueOnce(
          jsonResponse({
            100: { displayProperties: { name: "Known Helmet" } },
            200: { displayProperties: { name: "Known Chest" } },
          }),
        ),
    );

    const result = await getInventoryItemDefinitionsFromManifest<{
      displayProperties?: { name?: string };
    }>({
      apiKey: "api-key",
      fetchMissingDefinitions: false,
      itemHashes: [100, 100, 300],
    });

    expect(result).toEqual({
      definitionSource: "manifest",
      definitions: {
        100: { displayProperties: { name: "Known Helmet" } },
      },
      language: "en",
      missingHashes: [300],
      version: "manifest-version",
    });
  });

  it("matches manifest JSON definitions keyed by signed hashes", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          manifestEnvelope({
            version: "signed-hash-manifest",
            jsonWorldComponentContentPaths: {
              en: {
                DestinyInventoryItemDefinition: "/items.json",
              },
            },
          }),
        )
        .mockResolvedValueOnce(
          jsonResponse({
            "-1298820321": {
              displayProperties: { name: "Mobility Stat Test Item" },
            },
          }),
        ),
    );

    const result = await getInventoryItemDefinitionsFromManifest<{
      displayProperties?: { name?: string };
    }>({
      apiKey: "api-key",
      fetchMissingDefinitions: false,
      itemHashes: [2996146975],
    });

    expect(result.definitions["2996146975"]).toEqual({
      displayProperties: { name: "Mobility Stat Test Item" },
    });
    expect(result.missingHashes).toEqual([]);
  });
});
