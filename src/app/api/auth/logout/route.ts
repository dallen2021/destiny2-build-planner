import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/session/cookies";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  const response = acceptsHtml
    ? NextResponse.redirect(new URL("/", request.url))
    : NextResponse.json({ authenticated: false });
  clearSessionCookie(response);
  return response;
}
