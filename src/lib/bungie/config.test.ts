import { describe, expect, it } from "vitest";

import { getOAuthRedirectUri } from "./config";

describe("getOAuthRedirectUri", () => {
  it("derives the callback URL from the current request origin", () => {
    expect(
      getOAuthRedirectUri("https://dev.d2buildplanner.com/api/auth/login"),
    ).toBe("https://dev.d2buildplanner.com/api/auth/callback");
  });

  it("uses a configured callback when it matches the current origin", () => {
    expect(
      getOAuthRedirectUri(
        "http://localhost:3000/api/auth/login",
        "http://localhost:3000/api/auth/callback",
      ),
    ).toBe("http://localhost:3000/api/auth/callback");
  });

  it("ignores stale configured callbacks from a different origin", () => {
    expect(
      getOAuthRedirectUri(
        "https://dev.d2buildplanner.com/api/auth/login",
        "http://127.0.0.1:52400/api/auth/callback",
      ),
    ).toBe("https://dev.d2buildplanner.com/api/auth/callback");
  });
});
