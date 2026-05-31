# Destiny 3D Rendering Boundary

Last verified: 2026-05-31

Primary sources:

- `docs/bungie-api-reference.md`
- `docs/bungie-openapi-2.json`
- Official Bungie API docs snapshot source: https://bungie-net.github.io/

## What Bungie Provides

Bungie exposes `CharacterRenderData` and `ItemRenderData` components. These are
not finished model files or a ready avatar endpoint. They are rendering inputs:
equipped item hashes, dyes, art region choices, and related instance render
data.

The API reference describes character render data as the minimum information
needed for 3D rendering, and says it must be combined with additional 3D assets
and rendering data from Bungie's servers. It also points to Bungie's legacy
`spasm` bundle as an example of how Bungie uses that data.

## Product Decision

For the current rebuild, D2 Build Planner will ship a production-quality 2.5D
Guardian Stage using real equipped item data, class-aware styling, and manifest
icons. We should not fake a fully accurate 3D Guardian.

Real Three.js Guardian rendering is a later spike, not part of the first
inventory rebuild.

## Requirements For A Real 3D Spike

A real implementation likely needs:

- CharacterRenderData and ItemRenderData profile components.
- Manifest definitions for equipped items and renderable art data.
- A Destiny-aware renderer or an adapted renderer compatible with Bungie's
  asset format.
- Asset discovery, fetch, decode, cache, and fallback behavior.
- Reduced-motion, mobile, and non-WebGL fallbacks.
- Browser tests that confirm the canvas is nonblank, framed correctly, and does
  not block inventory workflows.

Until that spike proves viable, all production UI should describe the Guardian
Stage as a stylized workspace, not as accurate in-game 3D character rendering.
