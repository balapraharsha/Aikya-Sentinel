# Aikya Sentinel

A unified AI-powered financial crime intelligence and insider threat early warning system for compliance officers, investigators, and risk analysts at financial institutions.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, path `/api`)
- `pnpm --filter @workspace/aikya-sentinel run dev` — run the frontend (port 19831, path `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — used as JWT secret fallback

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, shadcn/ui, Recharts, wouter, TanStack Query
- API: Express 5, JWT auth (jsonwebtoken + bcryptjs)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle schema files (users, employees, accounts, transactions, alerts, cases, reports, audit_logs)
- `artifacts/api-server/src/routes/` — Express route handlers (auth, users, employees, accounts, transactions, alerts, cases, ai, dashboard)
- `artifacts/api-server/src/lib/ai-engine.ts` — All 20 AI module implementations (M1–M20)
- `artifacts/api-server/src/middlewares/auth.ts` — JWT auth middleware + RBAC
- `artifacts/aikya-sentinel/src/pages/` — React page components
- `artifacts/aikya-sentinel/src/components/layout.tsx` — App sidebar layout
- `artifacts/aikya-sentinel/src/lib/auth.ts` — Client-side JWT storage + customFetch integration

## Architecture decisions

- JWT stored in localStorage (not cookies) — simpler for SPA without SSR
- `setAuthTokenGetter` from `@workspace/api-client-react` wires auth tokens into all Orval-generated fetches globally
- All AI modules (M1–M20) implemented as deterministic score generators with realistic randomization for demo data — no external AI API required
- Alert `/prioritise` route is registered BEFORE `/:id` to avoid Express route order collision
- `pnpm --filter @workspace/db run push` uses `drizzle-kit push` (not `migrate`) for development simplicity

## Product

- **Dashboard** (M20): Live risk heatmap, alert counts, open cases, trend charts, top risky entities
- **Alerts**: Full CRUD with severity/status filtering, AI prioritisation
- **Cases**: Investigation case management with assignment and status tracking
- **Transactions**: Real-time transaction monitoring with flag detection
- **Accounts/Employees**: Risk profiles with KYC status and trust scores
- **AI Engines (M1–M11)**: Behaviour DNA, Insider Threat, Fund Flow, Tax Risk, Shell/Mule, Collusion, Fraud Intent, Digital Twin, Pattern Genome, Risk Radar, Explainable AI
- **Tools**: Timeline Tracker (M12), Trust Score (M13), Investigator Copilot (M16), Simulation Mode (M17), Narrative Reports (M15)

## Demo credentials

- `admin@aikya.io` / `password123` — Admin
- `sarah.chen@aikya.io` / `password123` — Compliance Officer
- `marcus.webb@aikya.io` / `password123` — Investigator
- `priya.sharma@aikya.io` / `password123` — Risk Analyst

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After changing DB schema, run `pnpm --filter @workspace/db run push` then `pnpm run typecheck:libs` to rebuild declarations before typechecking the api-server
- `@apply dark` is not a valid Tailwind v4 utility — use `.dark { ... }` CSS class blocks instead
- Always run `pnpm run typecheck:libs` before `pnpm --filter @workspace/api-server run typecheck` when DB schema changes

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
