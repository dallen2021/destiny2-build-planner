# Vercel Setup Notes

This repo is moving toward a Vercel-hosted rebuild while keeping the existing
GitHub repository.

## Branches

- `main` is production.
- `dev` is the integration/preview branch.
- Vercel should use `main` as the production branch.
- Pushes to `dev` should create preview deployments.
- Pull requests should also create preview deployments.

Vercel's Git integration supports this by default when `main` is configured as
the production branch. Non-`main` branches become preview deployments.

## Project Creation

Create or import the project in Vercel from the existing GitHub repository:

```text
dallen2021/destiny2-build-planner
```

For the current legacy Express app, Vercel is not the right runtime without
adapter work. The intended path is a fresh Next.js App Router app that can run
natively on Vercel.

## Environment Variables

Add environment variables in Vercel after the new app shape is decided.

Expected Bungie values:

```text
BUNGIE_API_KEY
BUNGIE_CLIENT_ID
BUNGIE_CLIENT_SECRET
OAUTH_REDIRECT_URI
```

Expected app/session values:

```text
APP_URL
SESSION_SECRET
```

If the rebuild uses Vercel KV/Redis for sessions:

```text
KV_REST_API_URL
KV_REST_API_TOKEN
```

If the rebuild uses Postgres/Supabase for users and saved loadouts:

```text
DATABASE_URL
```

## Bungie OAuth Redirects

Register redirect URLs in the Bungie application portal for each Vercel
environment that needs sign-in.

Examples:

```text
https://your-production-domain.example/auth/callback
https://your-dev-preview-domain.example/auth/callback
http://localhost:3000/auth/callback
```

If Vercel creates many per-commit preview URLs, OAuth can be awkward because
Bungie requires registered redirect URLs. Prefer a stable branch preview domain
for `dev` if authenticated preview testing is needed.

## Deployment Expectations

Once the fresh Next.js app exists:

- Pushing to `main` should deploy production.
- Pushing to `dev` should deploy a preview.
- Production secrets should only be available to production.
- Preview secrets should use separate Bungie OAuth redirect settings if
  possible.
- Run the local verification suite before merging `dev` into `main`.
