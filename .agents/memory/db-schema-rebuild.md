---
name: DB schema rebuild order
description: Required build order after DB schema changes to avoid TypeScript errors
---

When you add or change tables in `lib/db/src/schema/`, the TypeScript composite lib must be rebuilt before leaf packages can see the new types.

**Required order:**
1. Edit schema files in `lib/db/src/schema/`
2. `pnpm --filter @workspace/db run push` — applies migration to the DB
3. `pnpm run typecheck:libs` — rebuilds composite lib declarations
4. `pnpm --filter @workspace/api-server run typecheck` — now sees the new types

**Why:** `lib/db` is a composite TypeScript project. Until `tsc --build` runs, the `.d.ts` declarations don't exist and leaf packages get TS2305 "Module has no exported member" errors.

**How to apply:** Any time schema files change, always run step 3 before typechecking any artifact.
