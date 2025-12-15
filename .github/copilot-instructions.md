# GitHub Copilot Instructions - Fillipo Restaurant Template + Firebase

## Project Overview
This is a **restaurant website template with dynamic menu system** powered by Firebase and Next.js 16.

### Architecture
- **Stack:** Next.js 16 (App Router) + React 19 + shadcn/ui + Tailwind CSS v4 + TypeScript + Firebase v11
- **Pattern:** Single-page application with section-based navigation (Header → Hero → About → Gallery → Menu → Footer)
- **Customization:** Follows 12-step process defined in `fillipo/CUSTOMIZATION-PROMPT.md`
- **Working dir:** `fillipo/code/` (all commands must run here, NOT workspace root)
- **Firebase:** Integrated Firestore database + admin panel for dynamic menu management

### Dynamic Menu System
- **Backend:** Firestore database with 12 menu categories + 71 products
- **Admin Panel:** Vanilla JS panel at `/public/admin/` with CRUD operations
- **Integration:** Firebase SDK v11 in Next.js via `lib/firebase-config.ts`
- **Data flow:** Firestore → MenuWrapper (Server Component) → Menu (Client Component)

## Critical Working Directory Rules

### Project Structure
- **Next.js app:** `fillipo/code/` (package.json location - run ALL commands here)
- **Branding source:** `fillipo/branding.txt` (colors, fonts, content in Spanish)
- **Assets:** `fillipo/imagenes/` (10 images: hero, logo, gallery 1-6, mockups)
- **Customization guide:** `fillipo/CUSTOMIZATION-PROMPT.md` (12-step process)

### Firebase Integration
- **Firebase config:** `fillipo/firebase.json`, `fillipo/firestore.rules`, `fillipo/firestore.indexes.json`
- **Admin panel:** `fillipo/code/public/admin/` (HTML/CSS/JS CRUD interface)
- **Init script:** `fillipo/firestore-init-data-fillipo.js` (12 categories, 71 products)
- **Frontend integration:** `fillipo/code/lib/firebase-config.ts`, `fillipo/code/components/MenuWrapper.tsx`
- **Service account:** `fillipo/serviceAccountKey-fillipo.json` (NEVER commit this!)

### Key Commands
```bash
# Frontend development
cd fillipo/code && npm run dev

# Initialize/update Firestore data
cd fillipo && npm run init-data

# Build for production
cd fillipo/code && npm ci --legacy-peer-deps && npm run build

# Access admin panel
http://localhost:3000/admin (after running dev server)
```

## Development Workflows

### Fillippo Next.js Development
```powershell
# CRITICAL: Always navigate to code/ folder first
cd fillipo/code

# Development server
pnpm dev  # or npm run dev

# Production build (static export)
npm ci --legacy-peer-deps && npm run build
```
**Why `--legacy-peer-deps`:** React 19 has peer dependency conflicts with vaul@0.9.9 (drawer component)

### Firebase Operations
```powershell
cd fillipo

# Install Firebase dependencies
npm install

# Initialize Firestore with menu data (requires serviceAccountKey-fillipo.json)
npm run init-data

# Deploy Firestore rules/indexes (requires Firebase CLI)
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Deployment Targets
- **Frontend:** Netlify (base dir: `fillipo/code`, publish: `out`, Node 20.11.0+)
- **Admin Panel:** Included in static export at `/admin` route
- **Backend:** Managed by Firebase (Firestore + Authentication)

## Fillippo Template Customization Pattern

This template follows a **systematic 12-step customization methodology** (see `fillipo/CUSTOMIZATION-PROMPT.md`). It's NOT a typical app—it's a reusable template designed to be adapted for different restaurants.

### Customization Workflow (High-Level)
1. **Setup:** Verify working directory (`fillipo/code/`), create `public/images/` folder, place 10 assets
2. **Colors:** Convert branding HEX colors to OKLCH, update CSS variables in `app/globals.css`
3. **Typography:** Import Google Fonts in `app/layout.tsx`, assign to headings/body in `globals.css`
4. **Logo:** Replace placeholder in `components/header.tsx` + `footer.tsx` with actual logo
5. **Hero:** Set background image via `style={{ backgroundImage: 'url(/images/hero.jpg)' }}` (NEVER gradients)
6. **Content:** Translate all text to match branding language (Spanish uses **voseo**: "Disfrutá", "Visitanos")
7. **Gallery:** Update `components/gallery.tsx` with 6 product/ambiance images
8. **Menu:** Adapt `components/menu.tsx` with actual products/categories from branding doc
9. **Footer:** Update contact info, hours, location
10. **Testing:** Run `pnpm dev`, verify all sections render correctly
11. **Build:** Test production build with `npm run build`
12. **Deploy:** Push to Netlify with correct base directory config

### Non-Negotiable Rules
- **Hero backgrounds:** MUST use actual hero image, NEVER decorative gradients/blur effects
- **Language consistency:** If branding is Spanish → full Spanish site (including Argentine voseo for Buenos Aires clients)
- **Color format:** CSS uses OKLCH (not HSL/RGB) - convert HEX via online tools
- **Image paths:** Assets go in `fillipo/code/public/images/`, referenced as `/images/hero.jpg` in components
- **Working directory:** ALL commands run in `fillipo/code/`, NOT workspace root

## Code Conventions & Architecture

### Fillippo Template Patterns
**Component Structure:**
- Single-page app: `app/page.tsx` imports all sections sequentially
- Most components use `"use client"` (smooth scroll requires browser APIs)
- Navigation: Smooth scroll via `element.scrollIntoView({ behavior: "smooth" })`
- Example: `components/header.tsx` has click handlers for section links

**Styling:**
- Tailwind CSS v4 with **OKLCH color system** (NOT HSL/RGB)
- shadcn/ui components (`components/ui/`) built on Radix UI primitives
- Font strategy: Primary font (headings), secondary font (body text)
- Responsive: Mobile-first, breakpoints at `md:` (768px) and `lg:` (1024px)

**Static Export Mode:**
- `next.config.mjs` sets `output: 'export'` for Netlify deployment
- `images.unoptimized: true` (no Next.js Image Optimization API)
- Build output: `out/` directory with static HTML/CSS/JS

**TypeScript Config:**
- Loose mode: `ignoreBuildErrors: true` to allow quick prototyping
- Path alias: `@/*` → `fillipo/code/` (NOT workspace root)
- Import examples: `@/components/hero`, `@/lib/utils`

### Firebase Data Model
**Firestore Structure:**
- Metadata collection: `_categoriesMeta/{categoryId}` (name, order, isActive)
- Category collections: `CafeCaliente`, `Especiales`, `Frappes`, etc. (PascalCase)
- Each item document: `{ name, description, price, order, isAvailable, categoryId }`
- Example: `CafeCaliente/pocillo` → `{ name: "Pocillo", price: 2800, ... }`

**Integration Pattern:**
```typescript
// Server Component fetches at build/request time
// fillipo/code/components/MenuWrapper.tsx
async function getMenuData() {
  const categoriesMeta = await getDocs(collection(db, '_categoriesMeta'));
  // For each category, fetch its items from respective collection
  const items = await getDocs(collection(db, 'CafeCaliente'));
  return categories;
}

// Pass data to Client Component
<Menu categories={menuData} />
```

**Security Rules:**
- Public read access (anyone can view menu)
- Authenticated write access (only logged-in admin can edit)
- See `fillipo/firestore.rules`

## Common Pitfalls & Anti-Patterns

### Fillippo Template Issues
1. **Wrong working directory:** Commands MUST run in `fillipo/code/`, not workspace root or `fillipo/`
   - ❌ `cd fillipo && npm run dev` (fails - no package.json here)
   - ✅ `cd fillipo/code && npm run dev`

2. **Hero section mistakes:** 
   - ❌ Using gradient backgrounds, blur effects, or decorative overlays
   - ✅ Always use actual hero image: `style={{ backgroundImage: 'url(/images/hero.jpg)' }}`

3. **Language inconsistency:**
   - ❌ Mixing English/Spanish, or using formal Spanish ("Disfruta") for Argentine clients
   - ✅ Match branding language exactly - use voseo ("Disfrutá") for Buenos Aires

4. **Image path confusion:**
   - File location: `fillipo/code/public/images/hero.jpg`
   - Component reference: `/images/hero.jpg` (Next.js serves `/public/` at root)

5. **Deployment config errors:**
   - ❌ Setting Netlify base directory to workspace root
   - ✅ `base = "fillipo/code"` in `netlify.toml`
   - ✅ Node version 20.11.0+ required (check `.nvmrc`)

6. **TypeScript path alias mistakes:**
   - ❌ `import { Button } from '../components/ui/button'`
   - ✅ `import { Button } from '@/components/ui/button'`

### Firebase Integration Issues
1. **Missing service account key:** `firestore-init-data-fillipo.js` requires `serviceAccountKey-fillipo.json` (NEVER commit this file - add to `.gitignore`)

2. **Firestore rules not deployed:** After editing `firestore.rules`, must run `firebase deploy --only firestore:rules`

3. **Admin panel not accessible:** Make sure dev server is running (`npm run dev` in `fillipo/code`), then navigate to `http://localhost:3000/admin`

4. **Menu not loading:** Check that MenuWrapper is imported in `page.tsx` (NOT the old Menu component directly)

## Project-Specific Context

### Fillippo Heladería Branding (Template Example)
This template was customized for an ice cream shop in Ramos Mejía, Argentina:
- **Colors:** Black `#000000`, primary green `#73B550` → converted to OKLCH
- **Fonts:** Poiret One (headings), Space Mono (body)
- **Tone:** Welcoming, creative, enthusiastic
- **Language:** Spanish with Argentine voseo ("Disfrutá", "Visitanos")
- **Products:** Traditional and innovative ice cream flavors

### Fillipo with Firebase Integration
Current implementation with dynamic menu:
- **Colors:** Black `#000000`, primary green `#73B550` (converted to OKLCH in CSS)
- **Products:** 71 items across 12 categories (Café Caliente, Especiales, Frappes, Smoothies, etc.)
- **Admin:** Use Firebase Authentication (create user via Firebase Console)
- **Data structure:** Each category = separate Firestore collection (PascalCase names)
- **Price format:** Argentine pesos as numbers (2800 → displays as `$2.800`)

## Key Integration Points

### Firebase + Next.js Integration
How the dynamic menu system works:
1. **Data Layer:** Firestore stores categories and items in structured collections
2. **Server Component:** `MenuWrapper.tsx` fetches data at build/request time
3. **Client Component:** `Menu.tsx` receives data as props and renders with interactivity
4. **Admin Panel:** Standalone HTML/JS app at `/admin` for CRUD operations
5. **Result:** Template UI + dynamic CMS without frontend rebuilds

### Cross-Component Communication
- **Frontend → Firestore:** Firebase Web SDK v11 initialized in `lib/firebase-config.ts`
- **Admin Panel → Firestore:** Direct writes via Firebase JS SDK (v9+ modular)
- **Server Components → Client Components:** Props drilling for menu data
- **Smooth scroll:** Client components use `scrollIntoView({ behavior: "smooth" })`

## Essential Files to Understand

### Template Core Files
- [`fillipo/CUSTOMIZATION-PROMPT.md`](../CUSTOMIZATION-PROMPT.md) - Complete 12-step customization methodology
- [`fillipo/branding.txt`](../branding.txt) - Source of truth for colors, fonts, content
- [`fillipo/code/app/page.tsx`](../code/app/page.tsx) - Main page that imports all sections
- [`fillipo/code/app/globals.css`](../code/app/globals.css) - CSS variables (OKLCH colors)
- [`fillipo/code/components/menu.tsx`](../code/components/menu.tsx) - Menu component (accepts dynamic props)

### Firebase Integration Files
- [`fillipo/firestore-init-data-fillipo.js`](../firestore-init-data-fillipo.js) - Data initialization script (12 categories, 71 products)
- [`fillipo/code/public/admin/script.js`](../code/public/admin/script.js) - Admin panel CRUD logic
- [`fillipo/code/lib/firebase-config.ts`](../code/lib/firebase-config.ts) - Firebase initialization for frontend
- [`fillipo/code/components/MenuWrapper.tsx`](../code/components/MenuWrapper.tsx) - Server Component that fetches from Firestore
- [`fillipo/firebase.json`](../firebase.json) - Firebase project configuration
- [`fillipo/firestore.rules`](../firestore.rules) - Firestore security rules

**Key values:** Quality (Calidad), Creativity (Creatividad), Customer Service (Servicio al cliente)

**Slogan:** "Dulzura que inspira sonrisas"

**Ice cream flavors organized in 3 categories:**
- Clásicos: Dulce de Leche, Chocolate, Frutilla, Vainilla, Limón, Menta Granizada
- Creativos: Tramontana, Mousse de Limón, Cheesecake de Frutos Rojos, Tiramisú, Brownie con Nueces, Maraña Suiza
- Especiales: Sambayon con Almendras, Crema Rusa, Mousse de Chocolate Amargo, Frutos del Bosque, Banana Split, Crema Americana

## When Making Changes

- **Read first:** Check `CUSTOMIZATION-PROMPT.md` relevant step before editing
- **Test locally:** Run `pnpm dev` in `code/` folder to verify changes
- **Build test:** Run `npm ci --legacy-peer-deps && npm run build` to ensure static export works
- **Language check:** Verify all Spanish text uses voseo ("Disfrutá", "Visitanos", "Conocenos")
- **Hero validation:** Inspect hero section to confirm background image is visible (not hidden by gradients)

## Useful References

- **Customization workflow:** `CUSTOMIZATION-PROMPT.md` (defines entire template system)
- **Branding source:** `branding.txt` (colors, fonts, content, mission/vision/values)
- **shadcn/ui config:** `components.json` (New York style, cssVariables: true, lucide icons)
- **Deployment config:** `netlify.toml` (base directory, build command, Node version)