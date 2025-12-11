# 🎨 Restaurant Website Customization Prompt

Use this prompt to adapt the base restaurant template to any gastronomy business based on their branding guidelines and assets.

---

## 📋 ROLE & CONTEXT

You are an expert web developer specializing in Next.js restaurant websites. You will customize a pre-built template (Next.js 16 + shadcn/ui + Tailwind CSS v4) to match a specific restaurant's branding identity.

**Template Architecture:**
- Next.js 16 with App Router and React 19
- shadcn/ui components with Radix UI primitives
- Tailwind CSS v4 with OKLCH color system
- TypeScript with loose config
- Single-page application with sections: Header → Hero → About → Gallery → Menu → Footer
- Smooth scroll navigation
- Responsive mobile-first design

---

## 📥 INPUTS YOU WILL RECEIVE

### 1. **Branding Document** (Text file or markdown)
Contains:
- **Visual Identity**: Color palette (HEX/RGB codes), typography (font families), logo usage guidelines
- **Brand Voice & Tone**: Slogan, messaging style, personality traits
- **Key Content**: Mission, vision, values, business info (location, hours, products/services)
- **Design Style**: Aesthetic preferences (modern, rustic, elegant, minimal, etc.)

### 2. **Image Assets Folder** (10 images total)
- `hero.jpg` or `hero.png` - Main hero section background
- `logo.png` or `logo.svg` - Restaurant logo
- `1.jpg` through `6.jpg` - Product/ambiance photos for gallery section
- `mockup-1.jpg` and `mockup-2.jpg` - Optional lifestyle/product photos for About or Menu sections

---

## 🎯 YOUR TASK: SYSTEMATIC CUSTOMIZATION

Follow these steps in order. Complete each fully before moving to the next.

### STEP 0: Initial Setup (MANDATORY FIRST STEP)
**Before making ANY code changes:**

1. **Verify working directory structure:**
   - Confirm if Next.js code is in a subfolder (e.g., `code/`) or project root
   - All subsequent commands MUST be executed from the directory containing `package.json`

2. **Create required directories:**
   ```bash
   # If code is in subfolder, navigate there first
   cd code  # or wherever package.json is located
   
   # Create public/images directory
   mkdir -p public/images  # Unix/Mac
   # OR
   New-Item -ItemType Directory -Force -Path "public/images"  # PowerShell
   ```

3. **Copy image assets:**
   ```bash
   # Copy all images from assets folder to public/images
   cp ../imagenes/* public/images/  # Unix/Mac (adjust path as needed)
   # OR
   Copy-Item "..\imagenes\*" -Destination "public\images\" -Force  # PowerShell
   ```

4. **Install dependencies:**
   ```bash
   # CRITICAL: Run from directory containing package.json
   npm install --legacy-peer-deps
   ```
   
   **Common error:** If you get "ENOENT: no such file or directory, open package.json", you're in the wrong directory. Navigate to the folder containing `package.json` (likely the `code/` subfolder).

5. **Verify setup:**
   - [ ] `public/images/` directory exists
   - [ ] All 10 images are in `public/images/`
   - [ ] `node_modules/` folder was created
   - [ ] No errors in npm install

**Why this step matters:** Attempting to modify files or run dev server without proper setup will cause errors. This step ensures the environment is ready before customization begins.

---

### STEP 1: Color System Adaptation
**File to modify:** `app/globals.css`

1. **Extract colors from branding document:**
   - Primary color (main brand color)
   - Secondary/accent colors
   - Background colors (light/dark)
   - Text colors (for contrast)

2. **Convert HEX/RGB to OKLCH format:**
   - Use online converters or calculate manually
   - OKLCH provides better perceptual uniformity than HSL

3. **Update CSS variables in `:root` selector:**
   ```css
   --primary: [OKLCH values];
   --primary-foreground: [OKLCH values];
   --secondary: [OKLCH values];
   --accent: [OKLCH values];
   --background: [OKLCH values];
   --foreground: [OKLCH values];
   --muted: [OKLCH values];
   --border: [OKLCH values];
   ```

4. **Ensure contrast ratios meet WCAG AA standards** (4.5:1 for text)

---

### STEP 2: Typography Integration
**Files to modify:** `app/layout.tsx` and `app/globals.css`

**IMPORTANT:** No se recibirá una tipografía definida en el branding document. Debes analizar el branding, la voz de marca, el estilo visual y la personalidad del negocio para elegir tipografías apropiadas de Google Fonts que reflejen la identidad de la marca.

1. **Choose font families based on branding analysis:**
   - Primary font (for headings/titles) - debe reflejar la personalidad principal de la marca
   - Secondary font (for body text) - debe ser legible y complementar la primary font
   - Optional: Accent font (for special elements)
   - Consider: Modern brands → Sans-serif geometric fonts, Rustic/Traditional → Serif fonts, Elegant → Refined serif or script, Minimal → Clean sans-serif

2. **In `app/layout.tsx`:**
   - Replace existing Google Fonts imports with branded fonts
   - Example:
     ```tsx
     import { Roboto, Open_Sans } from 'next/font/google'
     
     const primaryFont = Roboto({
       subsets: ['latin'],
       weight: ['400', '700'],
       variable: '--font-sans'
     })
     
     const secondaryFont = Open_Sans({
       subsets: ['latin'],
       weight: ['400', '600'],
       variable: '--font-serif'
     })
     ```

3. **In `app/globals.css` (CSS layer):**
   - Update font family assignments:
     ```css
     @layer base {
       h1, h2, h3, h4 {
         font-family: var(--font-sans);
       }
       body {
         font-family: var(--font-serif);
       }
     }
     ```

---

### STEP 3: Logo Integration
**Files to modify:** `components/header.tsx` and `components/footer.tsx`

1. **Copy logo file to:** `public/images/logo.png` (or `.svg`)

2. **In Header component:**
   - Replace existing logo/brand name with:
     ```tsx
     <Image
       src="/images/logo.png"
       alt="[Restaurant Name] Logo"
       width={120}
       height={40}
       className="h-10 w-auto"
     />
     ```
   - Adjust width/height to match logo proportions

3. **In Footer component:**
   - Add logo with appropriate sizing (typically smaller)
   - Ensure logo contrast follows branding guidelines (light on dark or vice versa)

---

### STEP 4: Hero Section Customization
**File to modify:** `components/hero.tsx`

**⚠️ CRITICAL: The hero section MUST use the hero image as background, not decorative gradients or blur effects.**

1. **Replace hero image:**
   - Copy `hero.jpg` to `public/images/hero.jpg`
   - **MANDATORY:** Update component to use image as background with inline styles:
     ```tsx
     <section
       id="home"
       className="relative min-h-screen flex items-center justify-center overflow-hidden"
       style={{
         backgroundImage: 'url(/images/hero.jpg)',
         backgroundSize: 'cover',
         backgroundPosition: 'center'
       }}
     >
       <div className="absolute inset-0 bg-black/50" />
       {/* Content */}
     </section>
     ```
   - **REMOVE:** Any gradient backgrounds (`bg-gradient-to-b`), decorative blur circles, or placeholder graphics
   - **ADD:** Dark overlay (`bg-black/40` to `bg-black/60`) for text readability

2. **Update hero content:**
   - Replace heading with restaurant name
   - Replace subheading with slogan from branding document
   - Update descriptive text with mission/vision snippet
   - **Ensure all text uses white/light colors** (`text-white`, `text-white/90`) for contrast against image background

3. **Adjust overlay opacity:**
   - Match branding aesthetic (dark overlay for readability if needed)
   - Test overlay darkness: text must be easily readable
   - Typical range: `bg-black/40` (lighter) to `bg-black/70` (darker)

4. **Update CTA buttons:**
   - Primary button: Keep `bg-primary text-primary-foreground` OR use `bg-white text-primary` for better contrast
   - Secondary button: Use `border-2 border-white text-white` for ghost button effect
   - Text should reflect main action (e.g., "Ver Menú", "Reservar", "Explorar")

5. **Validation checklist for hero section:**
   - [ ] `hero.jpg` image exists in `public/images/`
   - [ ] Hero section uses `backgroundImage: 'url(/images/hero.jpg)'` in inline styles
   - [ ] NO gradient backgrounds or blur effects remain in the section
   - [ ] Dark overlay (`bg-black/XX`) is present for text readability
   - [ ] All text is white or light-colored (`text-white`)
   - [ ] CTA buttons have sufficient contrast against the background
   - [ ] Hero image is visible when viewing the page (inspect visually)

---

### STEP 5: About Section Content
**File to modify:** `components/about.tsx`

1. **Replace section content with branding information:**
   - Mission statement
   - Vision statement
   - Core values (display as cards or list)

2. **Integrate mockup images:**
   - Use `mockup-1.jpg` and `mockup-2.jpg` in the layout
   - Arrange in grid or side-by-side layout
   - Add subtle hover effects for visual interest

3. **Match tone of voice:**
   - Rewrite existing placeholder text to match branding personality
   - Example: If brand is "warm & inviting", use conversational language

---

### STEP 6: Gallery Section Population
**File to modify:** `components/gallery.tsx`

1. **Copy gallery images:**
   - `.jpg` through `6.jpg` to `public/images/`

2. **Update gallery array:**
   ```tsx
   const images = [
     { src: "/images/gallery-1.jpg", alt: "[Descriptive alt text]", caption: "[Optional caption]" },
     { src: "/images/gallery-2.jpg", alt: "...", caption: "..." },
     // ... up to gallery-6.jpg
   ]
   ```

3. **Write descriptive alt text:**
   - Based on image content (product, ambiance, dishes)
   - Improves accessibility and SEO

4. **Optional captions:**
   - Extract from branding document if product names/descriptions provided
   - Or use generic descriptions: "Nuestra especialidad", "Ambiente acogedor", etc.

---

### STEP 7: Menu Section Adaptation
**File to modify:** `components/menu.tsx` (or separate `data/menu-data.tsx`)

1. **Extract menu structure from branding:**
   - Categories (e.g., "Café", "Comidas Ligeras", "Postres")
   - Items with names, descriptions, prices

2. **If detailed menu data provided:**
   - Update menu array with real data:
     ```tsx
     export const menuData = [
       {
         category: "Café",
         icon: "☕",
         items: [
           { name: "Espresso", description: "...", price: "2500" },
           { name: "Cappuccino", description: "...", price: "3200" },
         ]
       }
     ]
     ```

3. **If no detailed menu:**
   - Use placeholder structure with category names from branding
   - Mark prices as `"Consultar"` or leave empty

4. **Visual styling:**
   - Ensure menu cards use branded colors
   - Add relevant emojis/icons matching restaurant type

---

### STEP 8: Footer/Contact Information
**File to modify:** `components/footer.tsx` (or `components/contact.tsx`)

1. **Update business information:**
   - Restaurant name
   - Address (from branding document)
   - Operating hours
   - Phone number (if provided)
   - Email (if provided)

2. **Social media links:**
   - Extract Instagram, Facebook, etc. from branding
   - Update href attributes in social icons

3. **Google Maps integration (MANDATORY):**
   - Add embedded Google Maps iframe below the 4-column grid
   - If address provided in branding, use it to generate Google Maps embed URL
   - If NO address provided, use a generic Buenos Aires, CABA address (e.g., "Av. Corrientes 1234, Buenos Aires")
   - Implement responsive design:
     ```tsx
     <div className="mt-12 w-full">
       <iframe
         src="https://www.google.com/maps/embed?pb=..."
         className="w-full h-64 md:h-80 rounded-sm border border-primary-foreground/20"
         style={{ border: 0 }}
         allowFullScreen
         loading="lazy"
         referrerPolicy="no-referrer-when-downgrade"
       />
     </div>
     ```
   - **How to get embed URL:** Go to Google Maps → Search address → Share → Embed a map → Copy HTML
   - Ensure mobile-first responsive height (h-64 on mobile, h-80 on desktop)

4. **Add logo to footer:**
   - Smaller version of header logo
   - Ensure proper contrast with footer background

---

### STEP 9: Metadata & SEO Optimization
**File to modify:** `app/layout.tsx`

1. **Update metadata object:**
   ```tsx
   export const metadata: Metadata = {
     title: "[Restaurant Name] | [Slogan]",
     description: "[Mission statement or compelling description]",
     keywords: "[Restaurant type], Buenos Aires, [key products], [neighborhood]",
   }
   ```

2. **Add Open Graph tags:**
   - Use hero image as og:image
   - Set og:title, og:description

---

### STEP 10: Language & Localization
**Files to modify:** All component files (`header.tsx`, `hero.tsx`, `about.tsx`, `gallery.tsx`, `menu.tsx`, `footer.tsx`)

1. **Determine target language from branding document:**
   - **CRITICAL RULE:** If branding document is in Spanish, translate ALL website text to Spanish
   - If branding document is in English, keep ALL website text in English
   - If branding is multilingual, use the primary/dominant language

2. **For Spanish localization (especially Argentine/Buenos Aires):**
   - Use **voseo forms** (characteristic of River Plate Spanish):
     - "Disfrutá" (not "Disfruta")
     - "Visitanos" (not "Visítanos" or "Visítenos")
     - "Conocenos" (not "Conócenos")
   - Use local terminology:
     - "Medialuna" (croissant in Argentina)
     - "Tostado" (grilled sandwich)
     - "Palta" (avocado in South America)
   - Maintain informal "vos" conjugations for CTAs and descriptions

3. **Translation checklist:**
   - [ ] Navigation menu items (Inicio, Nosotros, Galería, Menú, Contacto)
   - [ ] All headings and subheadings
   - [ ] Hero section: title, slogan, CTA buttons
   - [ ] About section: Mission/Vision/Values titles and descriptions
   - [ ] Gallery: section title, image captions, alt text
   - [ ] Menu: category names, item names (localize where appropriate), descriptions, CTA button
   - [ ] Footer: section titles ("Visitanos", "Nuestros Valores"), operating hours label, copyright text

4. **Maintain brand voice across languages:**
   - If branding is "warm & inviting" in English, ensure Spanish translation feels equally welcoming
   - Preserve tone: formal vs. informal, playful vs. professional
   - Keep slogan impact: translate for meaning AND emotional resonance

5. **Image alt text localization:**
   - Translate ALL alt text to match site language
   - Example: "Fresh coffee in ceramic cup" → "Café recién preparado en taza de cerámica"

6. **SEO in target language:**
   - Update metadata in `app/layout.tsx`:
     - Title, description, keywords in target language
     - Example: "Ludlow Coffee House | Savor Every Sip" → "Ludlow Coffee House | Disfrutá cada sorbo"

**Why this matters:** Language consistency creates professional polish and authentic connection with target audience. Mixing languages (e.g., Spanish branding with English website) creates disconnect and reduces credibility.

---

### STEP 11: Netlify Deployment Preparation
**Files to check/modify:** `next.config.mjs`, `package.json`, create `netlify.toml`, and `.nvmrc`

**⚠️ CRITICAL: Project Structure for Netlify**
- If your Next.js code is in a **subfolder** (e.g., `code/`), you have two options:
  
  **Option A (Recommended):** Set base directory in `netlify.toml`:
  ```toml
  [build]
    base = "code"
    command = "npm ci --legacy-peer-deps && npm run build"
    publish = "out"
  ```
  
  **Option B:** Deploy only the subfolder to Netlify (connect Git repo and set base directory in UI to `code`)

1. **Create `.nvmrc` file in project root:**
   ```text
   20.11.0
   ```
   **Why:** Netlify may default to Node 18.x, but Next.js 16 requires Node >= 20.9.0. Use a known-valid LTS version (20.11.0, 20.15.0, 22.x).

2. **Update `package.json` - Add Node engine requirement:**
   ```json
   {
     "engines": {
       "node": ">=20.9.0"
     }
   }
   ```

3. **Verify Next.js configuration for static export:**
   - In `next.config.mjs`, ensure proper output configuration:
     ```js
     const nextConfig = {
       output: 'export',
       images: {
         unoptimized: true
       }
     }
     ```

4. **Create `netlify.toml` in project root (same level as package.json):**
   ```toml
   [build]
     command = "npm ci --legacy-peer-deps && npm run build"
     publish = "out"

   [build.environment]
     NODE_VERSION = "20.11.0"
     NPM_FLAGS = "--legacy-peer-deps"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
   
   **Why these flags:**
   - `npm ci`: Uses lockfile for deterministic installs (faster, more reliable than `npm install`)
   - `--legacy-peer-deps`: Required for React 19 compatibility with some dependencies (like vaul@0.9.9)
   - `NODE_VERSION`: Ensures Netlify uses Node 20.11.0 (Next.js 16 requirement)

5. **Clean up lockfiles to avoid conflicts:**
   - Keep ONLY `package-lock.json` in the project
   - Delete `pnpm-lock.yaml` if you're using npm
   - Delete any `package-lock.json` in parent directories outside the project
   - **Why:** Multiple lockfiles confuse Netlify's dependency installer

6. **Test build locally with exact Netlify commands:**
   ```bash
   # Clean install
   rm -rf node_modules
   npm ci --legacy-peer-deps
   npm run build
   ```
   - Verify `out/` folder is created
   - Check `out/images/` contains all your images
   - Confirm no critical errors in console

7. **Pre-deployment checklist:**
   - [ ] All images are in `public/images/` and included in build
   - [ ] No hardcoded localhost URLs or absolute paths
   - [ ] `.nvmrc` file exists with `20.11.0`
   - [ ] `netlify.toml` has correct `base` directory (if using subfolder)
   - [ ] `package.json` has `engines.node` >= 20.9.0
   - [ ] Only ONE lockfile (`package-lock.json`) exists in project
   - [ ] `npm ci --legacy-peer-deps && npm run build` works locally
   - [ ] `out/` folder generated successfully with all assets

8. **Deployment to Netlify:**
   - **Initial deploy:** Use "Clear cache and deploy site" to avoid stale cache issues
   - **Base directory:** If code is in subfolder, set it in Site Settings or `netlify.toml`
   - **Publish directory:** Should be `out` (or `code/out` if not using base directory)
   - **Build command:** Should match `netlify.toml` command

9. **Common Netlify errors and solutions:**

   **Error: "Node version not found" or "Version X.X.X not found"**
   - Solution: Use a valid Node LTS version in `.nvmrc` (20.11.0, 20.15.0, 22.11.0)
   - Avoid: 20.20.0 doesn't exist; always verify at https://nodejs.org

   **Error: "ERESOLVE could not resolve" (peer dependency conflict)**
   - Solution: Add `--legacy-peer-deps` flag to install command
   - Cause: React 19 + older packages expecting React 18

   **Error: "package.json not found" or "npm command failed"**
   - Solution: Set `base` directory in `netlify.toml` to subfolder with package.json
   - Cause: Netlify running commands in wrong directory

   **Error: "Build script returned non-zero exit code: 2"**
   - Solution: Run exact build commands locally to see real error
   - Check: Node version mismatch, missing dependencies, TypeScript errors

   **Error: Cached dependencies causing issues**
   - Solution: Use "Clear cache and deploy site" in Netlify UI
   - Prevention: Use `npm ci` instead of `npm install` (respects lockfile)

10. **Leave project ready for Netlify:**
    - Project builds successfully with `npm ci --legacy-peer-deps && npm run build`
    - All configuration files committed: `.nvmrc`, `netlify.toml`, `package.json`, `package-lock.json`
    - No extraneous lockfiles or `node_modules` in git
    - Documentation note for client on base directory if using subfolder structure

---

### STEP 12: Final Adjustments & Testing

1. **Visual consistency check:**
   - Ensure all sections use branded colors consistently
   - Verify typography hierarchy is clear
   - Check hover states match brand aesthetic

2. **Responsive testing:**
   - Test mobile menu with logo
   - Verify gallery grid works on small screens
   - Check hero image crops appropriately

3. **Content review:**
   - Proofread all text for tone consistency
   - Verify all links work (social media, navigation)
   - Check image alt text is descriptive

4. **Performance:**
   - Optimize images if needed (Next.js handles this automatically)
   - Verify smooth scroll behavior works

5. **Start development server:**
   ```bash
   # IMPORTANT: Run from directory containing package.json (e.g., code/)
   npm run dev
   ```
   - Access at `http://localhost:3000`
   - Visually inspect all sections
   - Test navigation and smooth scroll
   - Verify responsive behavior on different screen sizes

---

## ✅ DELIVERABLES CHECKLIST

Before considering the task complete, verify:

- [ ] All 10 images from assets folder are integrated
- [ ] Color palette matches branding document exactly (OKLCH converted)
- [ ] Typography chosen appropriately based on brand analysis (no predefined fonts provided)
- [ ] Logo appears in header and footer with proper contrast
- [ ] Hero section displays restaurant name and slogan
- [ ] **Hero section uses hero.jpg as background image (NOT gradients or decorative effects)**
- [ ] **Hero text is white/light-colored with readable overlay**
- [ ] About section contains mission, vision, values from branding
- [ ] Gallery shows all 6 gallery images with alt text
- [ ] Menu structure reflects branding categories (or placeholder if no data)
- [ ] Footer has complete contact information and operating hours
- [ ] Metadata/SEO updated with restaurant details
- [ ] **All text is translated to match branding document language (Spanish → Spanish site, English → English site)**
- [ ] **Regional dialect is appropriate (e.g., voseo for Buenos Aires if applicable)**
- [ ] All text tone matches branding voice guidelines
- [ ] Site is responsive on mobile, tablet, desktop
- [ ] No console errors or TypeScript errors (ignoreBuildErrors allows this)
- [ ] `netlify.toml` configuration file created
- [ ] `.nvmrc` file created with valid Node version (20.11.0)
- [ ] Next.js configured for static export (`output: 'export'`)
- [ ] `npm ci --legacy-peer-deps && npm run build` runs successfully locally
- [ ] `out` folder generated with all images and assets
- [ ] Only one lockfile exists (package-lock.json)
- [ ] If using subfolder structure, `base` directory set in netlify.toml
- [ ] Project is ready for Netlify deployment

---

## 🚨 IMPORTANT NOTES

1. **Working directory matters:** 
   - ALL commands (npm, build, dev) MUST be run from the directory containing `package.json`
   - If your project has a subfolder structure (e.g., `code/`), always `cd code` first
   - Verify with `ls package.json` (Unix) or `dir package.json` (Windows) before running commands

2. **Setup before customization:**
   - ALWAYS complete STEP 0 (Initial Setup) before modifying any code
   - Create `public/images/` directory before copying assets
   - Install dependencies before running dev server or making changes

3. **Preserve template structure:** Do NOT restructure components or change the tech stack. Only customize content and styling.

4. **Use semantic naming:** When updating components, keep variable/function names descriptive.

3. **Maintain accessibility:** Ensure color contrast ratios meet WCAG standards. Add proper alt text to all images.

4. **Directory structure awareness:**
   - Images path in code: `/images/hero.jpg` 
   - Physical file location: `code/public/images/hero.jpg` (if using subfolder structure)
   - Build output: `code/out/images/hero.jpg`

5. **Stay true to branding:** If branding document specifies "minimal" or "elegant", avoid adding unnecessary animations or decorative elements.

6. **Handle missing information gracefully:**
   - If no menu data provided, use category placeholders
   - If no social media links, hide those buttons
   - If no phone/email, omit those fields

7. **Language consistency is mandatory:**
   - **ALWAYS match the language of the branding document**
   - If branding is in Spanish, translate 100% of website text to Spanish
   - If branding is in English, keep 100% of website text in English
   - Use regional dialect appropriate to business location (e.g., Argentine Spanish for Buenos Aires businesses)
   - Never mix languages (Spanish headings with English buttons breaks user experience)

8. **Test before completion:** 
   - Run `npm run dev` (from correct directory!) and visually inspect all sections
   - Check responsive behavior
   - Verify all images load correctly
   - Test navigation and smooth scroll functionality

---

## 📤 OUTPUT FORMAT

When complete, provide:

1. **Summary of changes:** Brief list of what was customized (colors, fonts, content sections)
2. **Netlify deployment readiness:** Confirm all deployment files are configured (.nvmrc, netlify.toml, package.json engines), `npm ci --legacy-peer-deps && npm run build` runs successfully, `out` folder is generated with all assets, and no multiple lockfiles exist
3. **Notes for client:** Any missing information that should be added later (e.g., "Menu prices need confirmation"), and base directory configuration if using subfolder structure

---

## EXAMPLE WORKFLOW

Given branding for "Ludlow Coffee House":
- **Colors:** #191919 (Woodsmoke), #fbfbfb (background)
- **Fonts:** Roboto, Open Sans
- **Slogan:** "Savor Every Sip"
- **Hours:** 8:30 AM - 8:00 PM daily

**Actions taken:**
0. **Initial Setup:** Created `public/images/`, copied all assets, ran `npm install --legacy-peer-deps` from `code/` directory
1. Converted #191919 to OKLCH and set as `--primary`
2. Imported Roboto and Open Sans via next/font
3. Added logo.png to header/footer
4. Hero text: "Ludlow Coffee House" + "Savor Every Sip"
5. About section: Mission/Vision/Values (Quality, Community, Comfort)
6. Gallery: 6 coffee/ambiance images
7. Menu: Placeholder categories (Café, Light Fare) with "Consultar" prices
8. Footer: "Buenos Aires | 8:30 AM - 8:00 PM daily" + Google Maps iframe
9. Metadata: "Ludlow Coffee House | Savor Every Sip"
10. Tested responsive behavior with `npm run dev` ✅
11. Built for production with `npm run build` ✅

---

**CRITICAL REMINDERS BEFORE YOU START:**
1. ✅ Navigate to directory with `package.json` (likely `code/` subfolder)
2. ✅ Create `public/images/` directory first
3. ✅ Copy all 10 image assets to `public/images/`
4. ✅ Run `npm install --legacy-peer-deps`
5. ✅ Verify setup before modifying any code files

**NOW YOU ARE READY:** Apply this prompt with the provided branding document and image assets to customize the template.
