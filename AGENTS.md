## Model Preferences

Default to `gpt-5.5` for Codex work, including spawned subagents.

When spawning subagents, omit the model override unless there is a clear reason
to use a smaller/faster model, so subagents inherit `gpt-5.5`.

For fast, small, well-contained subagent tasks, prefer
`gpt-5.3-codex-spark`. Use it for bounded exploration, simple verification,
quick file inspection, or narrow implementation tasks with low ambiguity.

Use `gpt-5.5` for architecture, broad debugging, risky code changes, unclear
requirements, integration work, or anything where judgment matters more than
speed.

## Product Direction

This repository is being revived as the canonical Destiny 2 Build Planner app.
Keep the same GitHub repository history, but prefer a fresh, maintainable app
over patching legacy slop in place.

Salvage useful domain knowledge from the old implementation:

- Bungie OAuth flow and API proxy intent.
- Destiny manifest download/indexing concepts.
- Inventory, armor stat, loadout, transfer, equip, and vendor use cases.
- Any proven constants only after validating them against the current Bungie
  API, live manifest, or current game update notes.

Do not trust hard-coded seasonal artifact data, damage values, stat systems, or
loadout rules without re-verification. Destiny 2 is changing heavily around the
final live-service update, `Monument of Triumph`, so assume gameplay data is
volatile.

## API Documentation Workflow

Use the official Bungie API reference as the primary source:

- Official docs: https://bungie-net.github.io/
- Official OpenAPI spec: https://raw.githubusercontent.com/Bungie-net/api/master/openapi-2.json
- Local generated markdown snapshot: `docs/bungie-api-reference.md`
- Local raw OpenAPI snapshot: `docs/bungie-openapi-2.json`
- Local Firecrawl-rendered docs snapshot:
  `docs/bungie-api-reference.firecrawl.md`

When API details matter, verify against the official docs or regenerate the
snapshot. The snapshot must include source URL, API version, and generation
timestamp. Do not rely on stale memory for Bungie components, scopes, endpoint
paths, or action payloads.

## Branching Workflow

Maintain both `main` and `dev` branches.

- `main` is the production branch.
- `dev` is the integration branch for riskier or multi-step work.
- Both branches should be viewable on Vercel.
- Simple, low-risk fixes may go straight to `main` after verification.
- Larger changes, architecture work, auth/session changes, loadout optimizer
  changes, schema changes, or broad UI rewrites should land on `dev` first.
- Before merging `dev` to `main`, run the full verification suite and check the
  Vercel preview deployment.

Prefer non-interactive git commands. Never rewrite shared history or discard
user changes without explicit approval.

## Vercel Workflow

Target Vercel hosting.

- Production deployment follows `main`.
- Preview deployments should be available for `dev` and pull requests.
- Keep environment variables out of git.
- Document required Vercel environment variables before features depend on
  them.
- Use Vercel Git integration for normal branch previews unless there is a clear
  need for custom CI.
- If custom CI is introduced, use `vercel build` followed by
  `vercel deploy --prebuilt`, and keep `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and
  `VERCEL_PROJECT_ID` in CI secrets.

For Next.js on Vercel, prefer App Router, server-side API proxy routes for
Bungie secrets, and lazy initialization of any database, cache, or SDK clients
so builds do not require runtime secrets.

## Engineering Workflow

Be critical and evidence-driven.

- Read the existing code before changing it.
- Add or update tests for loadout math, Bungie payload normalization, auth
  state, and manifest parsing when touching those areas.
- Run relevant verification before claiming work is complete.
- Treat `npm test`, `npm run lint`, and `npm run build` as required once they
  exist and are wired correctly.
- If those commands are missing or broken, fix the project tooling early rather
  than working blind.

For large rebuild work, write a short design/spec before implementation. Keep
scope bounded: auth/session foundation, manifest/data layer, inventory view,
loadout optimizer, and deployment can be separate milestones.
