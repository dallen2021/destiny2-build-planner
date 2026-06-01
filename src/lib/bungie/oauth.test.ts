import { describe, expect, it } from "vitest";

import {
  buildBungieAuthorizationUrl,
  createOAuthState,
  hasMoveEquipScope,
  normalizeOAuthScopes,
} from "./oauth";

describe("buildBungieAuthorizationUrl", () => {
  it("creates a Bungie OAuth URL with encoded client, redirect, and state", () => {
    const url = buildBungieAuthorizationUrl({
      clientId: "12345",
      redirectUri: "https://example.com/api/auth/callback",
      state: "state-token",
    });

    expect(url.origin).toBe("https://www.bungie.net");
    expect(url.pathname).toBe("/en/OAuth/Authorize");
    expect(url.searchParams.get("client_id")).toBe("12345");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("redirect_uri")).toBe(
      "https://example.com/api/auth/callback",
    );
    expect(url.searchParams.get("state")).toBe("state-token");
    expect(url.searchParams.has("scope")).toBe(false);
  });
});

describe("normalizeOAuthScopes", () => {
  it("detects sessions that can move and equip Destiny items", () => {
    expect(
      normalizeOAuthScopes(
        "ReadBasicUserProfile ReadDestinyInventoryAndVault MoveEquipDestinyItems",
      ),
    ).toEqual([
      "ReadBasicUserProfile",
      "ReadDestinyInventoryAndVault",
      "MoveEquipDestinyItems",
    ]);
    expect(hasMoveEquipScope(["MoveEquipDestinyItems"])).toBe(true);
    expect(hasMoveEquipScope(["ReadDestinyInventoryAndVault"])).toBe(false);
  });
});

describe("createOAuthState", () => {
  it("creates high-entropy url-safe state values", () => {
    const state = createOAuthState();

    expect(state).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(state.length).toBeGreaterThanOrEqual(32);
    expect(createOAuthState()).not.toBe(state);
  });
});
