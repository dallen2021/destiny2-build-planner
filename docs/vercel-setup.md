# Vercel Setup Notes

This repo is now a Next.js App Router app intended to run directly on Vercel.

## Branches

- `main` is production.
- `dev` is the integration/preview branch.
- Vercel should use `main` as the production branch.
- Pushes to `dev` should create preview deployments.
- Pull requests should also create preview deployments.

## Project Settings

Import the existing GitHub repository:

```text
dallen2021/destiny2-build-planner
```

Use the **Next.js** framework preset, not Express.
The repo also includes `vercel.json` with `framework: "nextjs"` so Git
deployments do not fall back to the previous Express entrypoint behavior.

Recommended settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
Node.js Version: 22.x
Production Branch: main
```

Vercel can usually infer these once the preset is Next.js.

## Environment Variables

Set these in Vercel for production and any preview environment that needs auth:

```text
BUNGIE_API_KEY
BUNGIE_CLIENT_ID
BUNGIE_CLIENT_SECRET
SESSION_SECRET
APP_URL
```

`SESSION_SECRET` must be a long random value, at least 32 characters. It is used
to encrypt the HTTP-only session cookie that stores Bungie tokens server-side.

`OAUTH_REDIRECT_URI` is optional. The app normally derives the Bungie callback
from the current request origin, for example
`https://dev.d2buildplanner.com/api/auth/callback`. Only set
`OAUTH_REDIRECT_URI` when it matches the exact origin users are logging in from.
If it points at a different host or port, the OAuth state cookie will be created
on one origin and the callback will return to another, causing an invalid state
error.

## Bungie OAuth Redirects

Register callback URLs in the Bungie application portal:

```text
https://your-production-domain.example/api/auth/callback
https://your-dev-preview-domain.example/api/auth/callback
http://localhost:3000/api/auth/callback
```

If Vercel creates many per-commit preview URLs, OAuth will be awkward because
Bungie requires registered redirect URLs. Prefer a stable branch preview domain
for `dev` when authenticated preview testing matters.

Do not test Bungie OAuth through random local ports like `127.0.0.1:52400`
unless that exact callback is registered in Bungie. Use the stable dev domain
or `http://localhost:3000` for local work.

## Deployment Expectations

- Pushing to `main` deploys production.
- Pushing to `dev` deploys preview.
- Production secrets should only be available to production.
- Preview secrets should use a separate Bungie redirect if possible.
- Run `npm run test`, `npm run lint`, and `npm run build` before merging `dev`
  into `main`.
