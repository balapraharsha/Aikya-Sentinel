---
name: Aikya Sentinel auth wiring
description: How JWT auth is stored and injected into all API calls in the frontend
---

JWT access token is stored in `localStorage` under key `aikya_access_token`.

`initAuthTokenGetter()` in `artifacts/aikya-sentinel/src/lib/auth.ts` calls `setAuthTokenGetter()` from `@workspace/api-client-react` (the custom-fetch module) once at app startup (top of App.tsx, outside components). This makes every Orval-generated fetch automatically include `Authorization: Bearer <token>`.

**Why:** Web SPA without SSR — localStorage is simpler than cookies. `setAuthTokenGetter` is the built-in hook in custom-fetch for exactly this purpose.

**How to apply:** Call `initAuthTokenGetter()` once at module level in App.tsx before any query runs. On logout, call `clearAuth()` and `queryClient.clear()` to flush stale authed data.
