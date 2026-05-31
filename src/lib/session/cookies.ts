import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "d2bp_session";
export const OAUTH_STATE_COOKIE_NAME = "d2bp_oauth_state";

const secure = process.env.NODE_ENV === "production";

export function readSessionCookie(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export function readOAuthStateCookie(request: NextRequest): string | null {
  return request.cookies.get(OAUTH_STATE_COOKIE_NAME)?.value ?? null;
}

export function setSessionCookie(
  response: NextResponse,
  sessionId: string,
  expiresAt: string,
): void {
  response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
    expires: new Date(expiresAt),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.delete(SESSION_COOKIE_NAME);
}

export function setOAuthStateCookie(
  response: NextResponse,
  state: string,
): void {
  response.cookies.set(OAUTH_STATE_COOKIE_NAME, state, {
    httpOnly: true,
    maxAge: 10 * 60,
    path: "/",
    sameSite: "lax",
    secure,
  });
}

export function clearOAuthStateCookie(response: NextResponse): void {
  response.cookies.delete(OAUTH_STATE_COOKIE_NAME);
}
