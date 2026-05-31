import { NextRequest, NextResponse } from "next/server";

import { readSessionCookie } from "@/lib/session/cookies";
import { toPublicSession, unsealSession } from "@/lib/session/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionToken = readSessionCookie(request);
  const session = sessionToken ? await unsealSession(sessionToken) : null;

  return NextResponse.json(toPublicSession(session));
}
