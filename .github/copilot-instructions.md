# Copilot Instructions — Fillipo (Next.js + Firebase)

## Big picture
- This repo has **two execution contexts**:
  - Root (`fillipo/`): Firebase admin scripts and Firestore config.
  - App (`fillipo/code/`): Next.js 16 frontend (App Router, static export).
- Main page composition is in `code/app/page.tsx` and renders sections in order: `Header`, `Hero`, `MenuWrapper`, `Gallery`, `About`, `PhoneOrder`, `GoogleReviews`, `Footer`, `WhatsAppFloat`.
- Menu data flow: Firestore → `code/components/MenuWrapper.tsx` (fetch + mapping) → `code/components/menu.tsx` (render).

## Critical workflows
- Frontend dev (run in `code/`): `npm run dev`
- Frontend build (run in `code/`): `npm run build`
- Lint (run in `code/`): `npm run lint`
- Seed Firestore (run in repo root): `npm run init-data`
- Full clean scripts are standalone root scripts (not npm scripts):
  - `node firestore-clean-all.js`
  - `node firestore-delete-old-data.js`

## Deployment and runtime constraints
- `code/next.config.mjs` uses `output: 'export'` and `images.unoptimized: true`.
- Do **not** introduce Next API routes/ISR/server-only runtime assumptions; this is exported static output.
- Netlify builds from `code/` (`netlify.toml`: base `code`, publish `out`, Node `20.11.0`).
- Firebase Hosting config serves `code/out` (see `firebase.json`).

## Firebase model and conventions
- Category metadata collection: `_categoriesMeta` with `{ displayName, order, isActive, icon? }`.
- Each menu category is its own collection (kebab-case id, e.g. `cafe-caliente`).
- Item fields are Spanish and must be preserved in DB/admin scripts: `nombre`, `descripcion`, `precio`, `orden`, `isAvailable`, `categoryId`.
- Frontend mapping to English props happens in `MenuWrapper.tsx`; keep this translation boundary intact.
- Firestore rules allow public reads and authenticated writes (`firestore.rules`).

## UI/component patterns
- Use `@/*` imports (configured in `code/tsconfig.json`), not deep relative imports.
- Navigation is anchor-id + smooth scroll (`code/components/header.tsx`, `code/components/hero.tsx`), so new sections should expose stable `id` attributes.
- Styling uses Tailwind v4 + CSS tokens in `code/app/globals.css` (OKLCH variables and custom animations).
- Fonts are configured in `code/app/layout.tsx` via `next/font` and CSS variables (`--font-serif`, `--font-sans`).

## Admin panel boundary
- Admin UI is plain HTML/CSS/JS in `code/public/admin/` using Firebase compat SDK v9 scripts (`index.html`, `firebase-config.js`, `script.js`).
- Keep admin changes framework-free unless explicitly migrating; current CRUD logic depends on Firestore compat API (`db.collection(...).doc(...).update(...)`).

## Safety and repo-specific guardrails
- Never commit `serviceAccountKey-fillipo.json` or new secrets.
- Keep Spanish copy/labels consistent unless task explicitly requests language changes.
- When changing menu behavior, update both user-facing React flow and admin/seed scripts if schema assumptions change.