import crypto from "node:crypto";
import { EncryptJWT, jwtDecrypt } from "jose";

export type DestinyMembership = {
  membershipId: string;
  membershipType: number;
  displayName?: string;
};

export type BungieUserSummary = {
  displayName?: string;
};

export type StoredSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  accessToken: string;
  refreshToken: string;
  membershipId: string;
  destinyMembership?: DestinyMembership;
  bungieUser?: BungieUserSummary;
};

export type PublicSession =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      destinyMembership?: DestinyMembership;
      bungieUser?: BungieUserSummary;
    };

export type SessionStore = {
  get(id: string): Promise<StoredSession | null>;
  set(session: StoredSession): Promise<void>;
  delete(id: string): Promise<void>;
};

const MIN_SESSION_SECRET_LENGTH = 32;

export function createSessionId(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function toPublicSession(session: StoredSession | null): PublicSession {
  if (!session) {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    destinyMembership: session.destinyMembership,
    bungieUser: session.bungieUser,
  };
}

function getSessionEncryptionKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < MIN_SESSION_SECRET_LENGTH) {
    throw new Error(
      `SESSION_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters.`,
    );
  }

  return crypto.createHash("sha256").update(secret).digest();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDestinyMembership(value: unknown): value is DestinyMembership {
  return (
    isRecord(value) &&
    typeof value.membershipId === "string" &&
    typeof value.membershipType === "number" &&
    (value.displayName == null || typeof value.displayName === "string")
  );
}

function isBungieUserSummary(value: unknown): value is BungieUserSummary {
  return (
    isRecord(value) &&
    (value.displayName == null || typeof value.displayName === "string")
  );
}

function isStoredSession(value: unknown): value is StoredSession {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    typeof value.expiresAt === "string" &&
    typeof value.accessToken === "string" &&
    typeof value.refreshToken === "string" &&
    typeof value.membershipId === "string" &&
    (value.destinyMembership == null ||
      isDestinyMembership(value.destinyMembership)) &&
    (value.bungieUser == null || isBungieUserSummary(value.bungieUser))
  );
}

export async function sealSession(session: StoredSession): Promise<string> {
  const expiresAtSeconds = Math.floor(
    new Date(session.expiresAt).getTime() / 1000,
  );

  if (!Number.isFinite(expiresAtSeconds)) {
    throw new TypeError("Session expiresAt must be a valid ISO date.");
  }

  return new EncryptJWT({ session })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(expiresAtSeconds)
    .encrypt(getSessionEncryptionKey());
}

export async function unsealSession(token: string): Promise<StoredSession | null> {
  try {
    const { payload } = await jwtDecrypt(token, getSessionEncryptionKey());
    return isStoredSession(payload.session) ? payload.session : null;
  } catch {
    return null;
  }
}

export function createTransientSessionStore(): SessionStore {
  const sessions = new Map<string, StoredSession>();

  return {
    async get(id) {
      return sessions.get(id) ?? null;
    },
    async set(session) {
      sessions.set(session.id, session);
    },
    async delete(id) {
      sessions.delete(id);
    },
  };
}

declare global {
  var __d2SessionStore: SessionStore | undefined;
}

export function getSessionStore(): SessionStore {
  globalThis.__d2SessionStore ??= createTransientSessionStore();
  return globalThis.__d2SessionStore;
}
