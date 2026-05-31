import { describe, expect, it } from "vitest";

import {
  createSessionId,
  createTransientSessionStore,
  sealSession,
  toPublicSession,
  unsealSession,
  type StoredSession,
} from "./session";

describe("toPublicSession", () => {
  it("never exposes Bungie access or refresh tokens", () => {
    const stored: StoredSession = {
      id: "session-1",
      createdAt: "2026-05-31T00:00:00.000Z",
      updatedAt: "2026-05-31T00:00:00.000Z",
      expiresAt: "2099-06-01T00:00:00.000Z",
      accessToken: "access-token",
      refreshToken: "refresh-token",
      membershipId: "4611686018460000000",
      destinyMembership: {
        membershipId: "4611686018460000000",
        membershipType: 3,
        displayName: "Guardian#1234",
      },
      bungieUser: {
        displayName: "Guardian#1234",
      },
    };

    const publicSession = toPublicSession(stored);

    expect(publicSession).toEqual({
      authenticated: true,
      destinyMembership: stored.destinyMembership,
      bungieUser: stored.bungieUser,
    });
    expect(JSON.stringify(publicSession)).not.toContain("access-token");
    expect(JSON.stringify(publicSession)).not.toContain("refresh-token");
  });

  it("returns an unauthenticated public session for null records", () => {
    expect(toPublicSession(null)).toEqual({ authenticated: false });
  });
});

describe("createTransientSessionStore", () => {
  it("stores, reads, and deletes sessions by opaque id", async () => {
    const store = createTransientSessionStore();
    const session: StoredSession = {
      id: createSessionId(),
      createdAt: "2026-05-31T00:00:00.000Z",
      updatedAt: "2026-05-31T00:00:00.000Z",
      expiresAt: "2099-06-01T00:00:00.000Z",
      accessToken: "access-token",
      refreshToken: "refresh-token",
      membershipId: "membership-id",
    };

    await store.set(session);
    expect(await store.get(session.id)).toEqual(session);

    await store.delete(session.id);
    expect(await store.get(session.id)).toBeNull();
  });
});

describe("encrypted session cookies", () => {
  it("round-trips stored sessions without exposing Bungie tokens in the cookie value", async () => {
    process.env.SESSION_SECRET =
      "test-session-secret-that-is-long-enough-for-encryption";
    const session: StoredSession = {
      id: "session-1",
      createdAt: "2026-05-31T00:00:00.000Z",
      updatedAt: "2026-05-31T00:00:00.000Z",
      expiresAt: "2099-06-01T00:00:00.000Z",
      accessToken: "access-token",
      refreshToken: "refresh-token",
      membershipId: "membership-id",
    };

    const cookieValue = await sealSession(session);

    expect(cookieValue).not.toContain("access-token");
    expect(cookieValue).not.toContain("refresh-token");
    await expect(unsealSession(cookieValue)).resolves.toEqual(session);
  });
});
