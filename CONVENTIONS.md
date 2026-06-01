# Twin@P.CN Frontend Conventions

## TypeScript

- Strict TypeScript.
- No `any` unless isolated at external boundary with explanation.
- API DTO types live near feature API files.
- UI props should be explicit and small.
- Shared generic helpers live in `src/lib`.

## Naming

- Components: PascalCase.
- Hooks: `useThing`.
- API functions: verb + resource, e.g. `login`, `getFacilityTree`, `getAssetDetail`.
- Files: PascalCase for components, kebab-case or camelCase for utilities; be consistent once scaffolded.
- API JSON keys stay camelCase.

## API Layer

- UI components must not call `fetch` directly.
- All HTTP calls go through `src/lib/api-client.ts`.
- Feature API files expose typed functions.
- Hooks wrap API functions with TanStack Query.

Pattern:

```text
Component -> feature hook -> feature api -> api client -> backend/mock
```

## Error Handling

- Parse backend `{ error: { code, message, details } }`.
- Display user-safe `message`.
- Use `code` for behavior.
- Never display raw stack traces.
- Show retry option for network/server failures.

## Loading/Empty/Error UI

Every data panel needs:

- loading skeleton/spinner
- empty state
- error state
- retry action if query can retry
- stale/mock badge when using fixture data

## Auth

- Protected routes require user session.
- Token storage only through `auth-storage.ts`.
- Clear tokens on logout or refresh failure.
- Do not log secrets.
- Do not put tokens in URL/search params.

## Styling

- Use Tailwind utility classes.
- Use shadcn/ui primitives for consistent controls.
- Centralize class merging with `cn()` helper.
- Prefer dark operator dashboard style.
- Use severity colors consistently:
  - critical: red
  - warning: amber
  - normal/active: green
  - inactive/unknown: slate

## 3D Viewer

- Keep 3D scene components isolated from dashboard panels.
- Do not store heavy Three.js objects in global state.
- Store IDs and view options only.
- Mesh click updates selected asset ID.
- Asset visual status derived from API/mock data.

## Time

- API timestamps are UTC ISO-8601.
- Display local time with clear formatting.
- Timeseries queries must include `from` and `to`.
- Default chart range: last 1 hour.

## Tests

Minimum tests for first sprint:

- auth API error parsing
- login form validation
- protected route redirect
- viewer store selection
- asset panel render states
- alarm severity badge

## Git/Docs

When implementing frontend:

- Update `frontend/TASKS.md` as work progresses.
- Keep mock contracts aligned with `frontend/API_CONTRACT.md`.
- If backend contract changes, update `frontend/API_CONTRACT.md` and affected types together.
- Do not commit `.env.local`, build output, coverage output, or node_modules.
