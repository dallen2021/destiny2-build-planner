# Destiny 2 Build Planner

Destiny 2 Build Planner is a full-stack companion for Guardians who want to theorycraft, organize, and execute builds without leaving the Bungie ecosystem. It pairs a secure OAuth-backed backend with a lightweight client so players can inspect inventory, fine tune armor stat tiers, and manage their loadouts in real time.

## What the application offers
- **Single sign-on with Bungie.net** – Users authenticate directly against Bungie's OAuth 2.0 flow, and the server stores a short-lived session that can securely call player-specific APIs on their behalf.
- **Unified inventory visibility** – Character equipment, vault contents, and profile items are merged into a single response to eliminate pagination and context switching while browsing gear.
- **Build crafting data** – Item definitions, stat rolls, socket plug data, and mod availability are hydrated from the local Destiny manifest so players can evaluate synergies before locking in a build.
- **Actionable loadout management** – Transfer items between characters, equip weapons or armor, inspect saved loadouts, and surface vendor inventory (such as armor mods) from the same interface.
- **Production-ready hardening** – Helmet, rate limiting, MongoDB-backed sessions, and a server-side API proxy keep personal accounts and Bungie credentials safe even in public deployments.

## How it works
1. **Authenticate** – After OAuth, the server keeps the Bungie access token inside an encrypted session stored in MongoDB, exposing only minimal state to the browser.
2. **Fetch player data** – Inventory endpoints combine profile, character, and vault responses, stitching item component buckets together so every stat and socket comes through in a single payload.
3. **Enrich with manifest metadata** – A background manifest service downloads and indexes the latest game definitions into SQLite, enabling instant lookups for item names, stat descriptions, and mod sockets without repeatedly hitting Bungie's servers.
4. **Act on gear** – When a player moves or equips an item, the API proxy signs the request with their stored token, applies Bungie's rate limits, and returns the authoritative response for UI feedback.

## Key backend capabilities
- **Routes**
  - `/auth` – Handles OAuth handshakes, session creation, and membership resolution.
  - `/api/inventory`, `/api/search`, `/api/character/:id` – Provide inventory browsing, filtered searches, and character-specific details.
  - `/api/transfer` & `/api/equip` – Mirror Bungie's gear management actions while enforcing authentication and retry-safe error handling.
  - `/api/loadouts` & `/api/vendors` – Surface saved loadouts and rotating vendor stock for mod and gear planning.
  - `/manifest/*` – Serve cached manifest slices (items, stats, mods) to the client with millisecond response times.
- **Security** – Session cookies are HTTP-only, CORS is locked to an allowed origin, and health/metrics endpoints give operators visibility without exposing sensitive data.
- **Scalability** – Rate limits protect Bungie quotas, manifest caching drastically reduces outbound requests, and the service can run behind Nginx or in Docker with minimal configuration.

## Destiny manifest lifecycle
- On startup, the manifest service checks Bungie's published version and downloads the latest database if necessary.
- The SQLite payload is unzipped, indexed, and stored under `data/manifest/` with a `version.json` file documenting provenance.
- Subsequent definition lookups are cached in-memory with automatic eviction to ensure high throughput for repeated queries.

## Typical user journey
1. Log in with Bungie.net and select the active Destiny membership.
2. Review combined character and vault inventories, filtering by slot or searching by name.
3. Inspect stat breakdowns and sockets for high-value armor rolls while previewing available mods.
4. Transfer or equip items to lock in the desired loadout, optionally saving presets directly through Bungie's loadout API.

## Why it matters
Unlike simple inventory viewers, Destiny 2 Build Planner emphasizes actionable insights. Guardians can immediately see how stat tiers change when swapping armor, understand which mods are currently purchasable, and push updates back into the game without juggling multiple tools. The result is a smoother pre-raid or PvP preparation workflow that keeps focus on crafting the perfect build rather than fighting API limitations.

---
Want to extend the experience? Explore the Express routes in `routes/`, the manifest helpers in `services/`, and the production-ready deployment assets in the repository to tailor the planner to your fireteam's needs.
