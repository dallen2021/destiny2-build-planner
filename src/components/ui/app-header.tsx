import Link from "next/link";
import { cookies } from "next/headers";
import { Database, LogIn, LogOut, ShieldCheck } from "lucide-react";

import { SESSION_COOKIE_NAME } from "@/lib/session/cookies";
import { toPublicSession, unsealSession } from "@/lib/session/session";

async function getPublicSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionToken ? await unsealSession(sessionToken) : null;

  return toPublicSession(session);
}

export async function AppHeader() {
  const session = await getPublicSession();
  const displayName =
    session.authenticated &&
    (session.destinyMembership?.displayName ?? session.bungieUser?.displayName);

  return (
    <header className="app-header">
      <Link className="brand-lockup" href="/">
        <span className="brand-mark" aria-hidden="true">
          <ShieldCheck size={18} />
        </span>
        <span>
          <strong>D2 Build Planner</strong>
          <span>Vercel rebuild</span>
        </span>
      </Link>

      <nav className="top-nav" aria-label="Primary">
        <Link href="/inventory">
          <Database size={16} />
          Inventory
        </Link>
      </nav>

      <div className="auth-controls">
        {session.authenticated ? (
          <>
            <span className="identity-pill">{displayName || "Authenticated"}</span>
            <form action="/api/auth/logout" method="post">
              <button className="icon-button" type="submit" title="Sign out">
                <LogOut size={16} />
              </button>
            </form>
          </>
        ) : (
          <Link className="primary-action" href="/api/auth/login">
            <LogIn size={16} />
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
