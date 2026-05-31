# Destiny 2 Build Planner Revival Foundation

## Context

The current repository contains a legacy Express and vanilla JavaScript app. The
audit found broken build/test/lint scripts, missing frontend functions, stale
hard-coded Destiny data, weak security posture for OAuth tokens, and a loadout
worker that does not model current game constraints well enough to trust.

Bungie has announced `Destiny 2: Monument of Triumph` for June 9, 2026 as the
final live-service content update. The rebuild must assume gameplay data,
armor tiers, exotics, abilities, loot sources, and activity structure are
volatile until validated against the official API, manifest, and current Bungie
update notes.

## Goal

Create a Vercel-ready foundation for a fresh app while preserving the existing
GitHub repository history. The first milestone should prove the hard plumbing:
Bungie API access, OAuth/session handling, manifest/reference data, and a
read-only armor inventory view.

The first milestone intentionally excludes loadout optimization and item
mutation actions. Those should be added after data normalization is tested.

## Recommended Approach

Use a fresh Next.js App Router app on `dev`, then promote to `main` once the
first vertical slice is verified.

Why this approach:

- Vercel supports Next.js natively.
- App Router route handlers can protect Bungie API keys and OAuth secrets.
- Server components can keep the initial shell fast and reduce client
  JavaScript.
- Client components can be isolated to interactive inventory filters and later
  optimizer controls.
- TypeScript gives the Bungie data layer and optimizer room to become
  testable instead of another large global script.

## Alternatives Considered

### Patch the Existing Express App

This is fastest for very small fixes, but it keeps the broken architecture:
global frontend state, inline handlers, no real build pipeline, stale data
tables, and weak testability. It is not a good revival foundation.

### Separate API and Frontend Apps

A separate backend would make long-running manifest jobs and session storage
straightforward, but it adds hosting and deployment complexity immediately. It
can be revisited if Vercel functions are not enough for manifest processing.

### Static-First Tool With No Auth

A public sandbox would be easy to ship, but it would not prove real player
inventory, vault, sockets, stat rolls, or Bungie OAuth. The actual product value
depends on real authenticated inventory, so auth should be part of the first
vertical slice.

## Architecture

### App Shell

- Next.js App Router with TypeScript.
- Routes:
  - `/` redirects to inventory or shows signed-out state.
  - `/inventory` shows read-only character and vault armor.
  - `/api/auth/login` starts Bungie OAuth.
  - `/api/auth/callback` exchanges OAuth code and stores tokens server-side.
  - `/api/auth/status` returns minimal user/auth state.
  - `/api/destiny/inventory` returns normalized inventory data for the signed-in
    user.
  - `/api/manifest/*` returns selected manifest definitions needed by the UI.

### Bungie API Layer

- Use `docs/bungie-openapi-2.json` and `docs/bungie-api-reference.md` as local
  reference snapshots.
- Keep a small hand-written client initially, limited to the endpoints needed
  for OAuth, membership lookup, profile inventory, and manifest metadata.
- Do not expose `BUNGIE_API_KEY`, client secret, access tokens, or refresh
  tokens to the browser.
- Validate required scopes:
  - `ReadBasicUserProfile`
  - `ReadDestinyInventoryAndVault`
  - Later: `MoveEquipDestinyItems` for transfer/equip actions.

### Session and Token Storage

Use a server-side session store for OAuth tokens. The preferred Vercel path is
Vercel KV/Redis because it is simple for short-lived session data and avoids
putting refresh tokens in browser cookies.

Session cookies should contain only an opaque session id and be:

- `HttpOnly`
- `Secure` in production
- `SameSite=Lax`
- Rotated on login/logout

If saved loadouts and user preferences become first-class data, add Postgres or
Supabase later. Avoid choosing a relational schema before the first inventory
slice is stable.

### Manifest Data

The legacy app downloads and indexes Bungie's mobile world content SQLite
database. The rebuild should start smaller:

- Fetch the current manifest metadata.
- Cache selected definitions needed for inventory rendering.
- Normalize item, stat, bucket, class, socket, plug, and damage type lookups
  behind a manifest service interface.
- Keep the service replaceable so it can move from on-demand JSON lookups to a
  background-indexed SQLite/Postgres cache if needed.

### Inventory Normalization

Create a domain module that converts Bungie profile responses into UI-safe
records:

- Character summaries.
- Vault armor.
- Character inventory armor.
- Equipped armor.
- Item definition basics.
- Armor stat values.
- Socket/plug references needed later by the optimizer.
- Item location and ownership.

This module should be unit tested with fixture payloads before the optimizer is
built.

### UI

The first UI should be utilitarian rather than a landing page:

- Header with sign-in/sign-out state.
- Character selector.
- Armor table/grid grouped by slot.
- Search and filters for class, slot, rarity, equipped/vault, and stat totals.
- Clear loading, empty, and error states.

Avoid hard-coded seasonal artifact and damage calculator UI until those systems
are current and data-backed.

## Error Handling

- If Bungie OAuth fails, show a sign-in error and do not create a session.
- If tokens expire, refresh server-side once and retry the failed request.
- If refresh fails, clear the session and ask the user to sign in again.
- If the manifest is unavailable, show inventory with reduced metadata only if
  possible.
- Rate-limit user-triggered Bungie calls and surface Bungie error messages in a
  safe, user-readable form.

## Testing

First milestone tests:

- OAuth URL construction includes expected client id, redirect uri, state, and
  scopes.
- Session cookie stores no Bungie tokens.
- Token refresh updates the server-side session store.
- Inventory normalization handles vault, character inventory, equipped items,
  missing item components, and unknown definitions.
- Manifest hash conversion handles signed and unsigned Bungie hashes.
- Route handlers reject unauthenticated inventory requests.

Later optimizer tests:

- Stat totals and tiers.
- Masterwork/artifice/tier assumptions.
- Exotic constraints.
- Mod slot/cost constraints.
- Ranking and tie-breaking.

## Migration Plan

1. Commit the workflow and API documentation baseline.
2. Create/push `dev`.
3. Scaffold the new Next.js app on `dev`.
4. Keep legacy files available for reference until the replacement covers the
   read-only inventory flow.
5. Replace or archive legacy Express/public files once the new app passes local
   build, tests, and Vercel preview.
6. Merge to `main` after Vercel production settings are ready.

## Open Decisions

- Whether Vercel KV/Redis is available for session storage.
- Exact stable `dev` preview domain for Bungie OAuth redirects.
- Whether saved loadouts should be local-only at first or account-backed.
- Whether the manifest cache should be on-demand JSON, SQLite artifact, or a
  hosted database after the first slice.
