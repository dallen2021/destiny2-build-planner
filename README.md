# Destiny 2 Build Planner

Fresh Vercel-native rebuild of the original Destiny 2 Build Planner. The active
app is now a Next.js App Router project with tested Bungie API helpers, encrypted
HTTP-only session cookies, and a first read-only armor inventory workspace.

## Current Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Vitest
- ESLint flat config
- Native `fetch` against Bungie's Platform API
- Encrypted session cookie via `jose`

The old Express/static runtime was removed from the deploy surface. Git history
still contains it if we need to salvage domain behavior later.

## Branches

- `main` is production.
- `dev` is the Vercel preview/integration branch.
- Larger rebuild milestones should land on `dev` first, then merge to `main`
  after verification.

## Local Setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Required Bungie settings:

```text
BUNGIE_API_KEY=
BUNGIE_CLIENT_ID=
BUNGIE_CLIENT_SECRET=
OAUTH_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=use-a-long-random-value-at-least-32-characters
APP_URL=http://localhost:3000
```

Register the same callback URL in the Bungie application portal.

## Commands

```powershell
npm run test
npm run lint
npm run build
npm run docs:bungie-api
```

## Implemented

- Bungie OAuth login and callback routes
- Encrypted session cookie that keeps Bungie tokens out of client-visible JSON
- Auth status and logout routes
- Bungie API wrapper with platform error handling
- Destiny profile inventory fetch route
- Armor bucket filtering and normalization tests
- First inventory UI with slot filters, search, character strip, item icons, and
  empty/error/loading states

## Next Milestones

- Persistent manifest ingestion/cache instead of per-item definition hydration
- Token refresh before access-token expiry
- Loadout optimizer data model and scoring tests for post-update armor rules
- Equip/transfer/loadout mutations after auth and rate-limit handling are firm
- Stable dev preview OAuth URL in Vercel for branch testing
