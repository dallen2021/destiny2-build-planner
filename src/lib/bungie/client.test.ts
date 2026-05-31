import { afterEach, describe, expect, it, vi } from "vitest";

import { bungieFetch } from "./client";

describe("bungieFetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends Bungie API key, bearer token, and query params", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          ErrorCode: 1,
          Response: { ok: true },
        }),
        { status: 200 },
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await bungieFetch<{ ok: boolean }>({
      accessToken: "access-token",
      apiKey: "api-key",
      path: "/Destiny2/test/",
      searchParams: {
        components: ["Profiles", "Characters"],
      },
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "https://www.bungie.net/Platform/Destiny2/test/?components=Profiles%2CCharacters",
    );
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer access-token",
      "X-API-Key": "api-key",
    });
  });

  it("throws a useful error when Bungie returns a platform error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        return new Response(
          JSON.stringify({
            ErrorCode: 1618,
            Message: "The user is not authorized to access this endpoint.",
            Response: null,
          }),
          { status: 200 },
        );
      }),
    );

    await expect(
      bungieFetch({
        apiKey: "api-key",
        path: "/Destiny2/private/",
      }),
    ).rejects.toThrow(
      "Bungie API error 1618: The user is not authorized to access this endpoint.",
    );
  });
});
