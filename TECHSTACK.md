# Twin@P.CN Frontend Tech Stack

## Decision

Use:

```text
Vite + React + TypeScript + React Router + TanStack Query + Zustand + Tailwind CSS + shadcn/ui + React Three Fiber + Recharts
```

## Core Stack

| Layer | Choice | Purpose |
| --- | --- | --- |
| Runtime/build | Vite | Fast local dev, simple React scaffold |
| Language | TypeScript | Typed API contracts and component props |
| UI framework | React | Dashboard + viewer composition |
| Routing | React Router | Auth routes, app routes, deep links |
| Server state | TanStack Query | API cache, loading/error/retry, invalidation |
| Client state | Zustand | Viewer state, selected asset, layer toggles |
| Styling | Tailwind CSS | Fast consistent layout/styling |
| UI primitives | shadcn/ui + Radix | Dialogs, tabs, panels, menus, forms |
| 3D | Three.js + React Three Fiber + Drei | Digital twin scene shell and asset picking |
| Charts | Recharts | Telemetry latest/trend charts |
| Forms | React Hook Form + Zod | Login and future forms validation |
| HTTP | fetch wrapper or Axios | Token injection, refresh handling, error mapping |
| Testing | Vitest + React Testing Library + Playwright later | Unit/component first, E2E later |
| Quality | ESLint + Prettier | Consistent codebase |

## Why This Stack

Frontend has two dominant concerns:

1. Data-heavy operator dashboard.
2. Interactive 3D scene viewer.

React + TanStack Query solves data loading and cache. React Three Fiber lets scene controls live inside React state and UI. Zustand keeps viewer-specific state simple and decoupled from server cache.

## Avoid Initially

- Next.js: no SSR requirement yet; Vite simpler for dashboard app.
- Redux Toolkit: too heavy for first sprint; Zustand enough.
- Complex 3D asset pipeline: backend scene manifest not implemented yet; start with placeholder geometry/fixtures.
- WebSocket/SSE: backend realtime not ready; use polling/mock events until Phase 3/5 realtime lands.
- Micro-frontends: unnecessary.

## First Sprint Libraries

Install baseline:

```bash
npm create vite@latest frontend-app -- --template react-ts
cd frontend-app
npm install @tanstack/react-query react-router-dom zustand zod react-hook-form @hookform/resolvers
npm install three @react-three/fiber @react-three/drei recharts
npm install clsx tailwind-merge lucide-react
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom eslint prettier
```

Add shadcn/ui after Tailwind setup:

```bash
npx shadcn@latest init
```

## Rendering Strategy

First sprint 3D viewer should not wait for real mesh assets.

Use staged approach:

1. Scene shell: grid/floor/camera/lights/orbit controls.
2. Facility/rack placeholders: boxes generated from fixture/API data.
3. Asset picking: click box -> selected asset state.
4. Later: load backend scene manifest meshes/textures/LOD.

## API Strategy

Use adapter boundary:

```text
UI -> hooks -> API services -> transport
              -> mock services while backend pending
```

Every pending backend endpoint gets a typed mock implementation with same response shape as `API_CONTRACT.md`. When backend endpoint exists, only service implementation changes; UI remains stable.

## State Strategy

- Auth/session: React context + storage wrapper.
- Server data: TanStack Query only.
- Viewer UI state: Zustand.
- Form state: React Hook Form.
- URL state: route/search params for deep-linkable selected scene/asset later.

## Quality Gates

Before handoff/commit:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If a command is not present yet, add it before claiming completion.
