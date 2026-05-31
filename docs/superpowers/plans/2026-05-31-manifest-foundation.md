# Manifest Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace chatty per-item definition lookups with a cached Bungie manifest component service and surface manifest metadata in the inventory API/UI.

**Architecture:** Keep Bungie access behind server-only route handlers and library modules. Fetch `/Destiny2/Manifest/`, select the English `jsonWorldComponentContentPaths` entry for `DestinyInventoryItemDefinition`, cache the component JSON by manifest version, and select only the item hashes needed by inventory normalization. Keep a one-off entity endpoint fallback for missing hashes.

**Tech Stack:** Next.js 16 App Router, TypeScript, Vitest, Bungie Platform API, in-memory Vercel function cache.

---

### Task 1: Manifest Resolver Tests

**Files:**
- Create: `src/lib/bungie/manifest.test.ts`
- Create: `src/lib/bungie/manifest.ts`

- [x] **Step 1: Write failing tests**

Add tests covering `resolveBungieContentUrl`, language fallback, component path selection, cache reuse, manifest version invalidation, and item-hash selection.

- [x] **Step 2: Run red test**

Run: `npm test -- src/lib/bungie/manifest.test.ts`

Expected: fail because `src/lib/bungie/manifest.ts` does not exist.

- [x] **Step 3: Implement manifest module**

Create a module that exports:

```ts
export const DESTINY_INVENTORY_ITEM_DEFINITION =
  "DestinyInventoryItemDefinition";

export function resolveBungieContentUrl(path: string): string;
export function pickManifestLanguage<T>(
  localized: Record<string, T> | undefined,
  preferredLanguage?: string,
): { language: string; value: T } | null;
export function pickManifestComponentPath(
  manifest: DestinyManifest,
  componentType: string,
  preferredLanguage?: string,
): ManifestComponentPath | null;
export async function getDestinyManifest(options: ManifestFetchOptions): Promise<DestinyManifest>;
export async function getManifestComponentDefinitions<T>(
  options: ManifestComponentOptions,
): Promise<ManifestComponentDefinitions<T>>;
export async function getInventoryItemDefinitionsFromManifest<T>(
  options: InventoryManifestDefinitionOptions,
): Promise<InventoryManifestDefinitionResult<T>>;
export function clearManifestCaches(): void;
```

- [x] **Step 4: Run green test**

Run: `npm test -- src/lib/bungie/manifest.test.ts`

Expected: pass.

### Task 2: Inventory API Integration

**Files:**
- Modify: `src/app/api/destiny/inventory/route.ts`
- Modify: `src/components/inventory/inventory-client.tsx`

- [x] **Step 1: Update inventory route**

Replace `getInventoryItemDefinitions` usage with `getInventoryItemDefinitionsFromManifest` and return `manifestVersion`, `manifestLanguage`, and `definitionSource`.

- [x] **Step 2: Update UI metadata**

Show manifest version/language/source in the inventory status row.

- [x] **Step 3: Run focused tests**

Run: `npm test -- src/lib/bungie/manifest.test.ts src/lib/destiny/inventory.test.ts src/lib/bungie/client.test.ts`

Expected: pass.

### Task 3: Verification And Publish

**Files:**
- Existing project scripts only.

- [x] **Step 1: Full verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [x] **Step 2: Merge to `dev` after verification**

Push `codex/manifest-foundation`, fast-forward or merge into `dev`, and push `dev` for Vercel preview.
