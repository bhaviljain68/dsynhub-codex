# tasklist.md (step-by-step for Codex)

> Add this file to repo root so you and Codex can track progress.

---

## Phase 0 — Read inputs

* [ ] Read `/Plan.md` (this file).
* [ ] Read `/sitemap.json`.
* [ ] Inspect `/legacy/**` to understand structure, CSS, JS, images.

## Phase 1 — Project scaffold

* [ ] Initialize Astro: `npm create astro@latest` → select **Empty** (or minimal), **No TS** (unless preferred), **PNPM/NPM** = **npm**.
* [ ] Install Tailwind: `npx astro add tailwind` → confirm integration.
* [ ] Ensure `astro.config.mjs` exists with default image service (Sharp).
* [ ] Add **Prettier** (optional): `npm i -D prettier` with basic config.

## Phase 2 — Design system

* [ ] Create `src/styles/main.css` with Tailwind layers (`@tailwind base; @tailwind components; @tailwind utilities;` + base CSS vars).
* [ ] Extract **brand colors** and font choices from `/legacy` → map into `tailwind.config.cjs` (`theme.extend.colors`).
* [ ] Self-host fonts in `public/fonts/**` (or `src/assets/fonts/**` if you want hashed URLs) and declare `@font-face` (Tailwind base layer).
* [ ] Build global layout:

  * [ ] `src/layouts/Base.astro` (html/head, preload fonts, header, footer).
  * [ ] `src/components/Header.astro` (logo, nav, fullscreen menu opener).
  * [ ] `src/components/Footer.astro`.

## Phase 3 — Icons

* [x] Identify used icons in `/legacy` (Ionicons, etc.).
* [x] Extract to inline SVGs under `src/icons/**`.
* [x] Build `src/components/Icon.astro` that renders an SVG by `{name}` with `{size}`, `{class}`, `{title}`.
* [x] Replace icon font references with `<Icon name="..." />`.

## Phase 4 — Optimized images (astro:assets)

* [ ] Create `src/assets/img/**`. (Developer will upload images here.)
* [ ] Replace all `<img>` and CSS backgrounds with:

  * [ ] `<Image>` / `<Picture>` + `widths` and `sizes` tuned to layout.
  * [ ] `getImage()` for CSS backgrounds (generate one optimized asset; apply in `style`).
* [ ] Do **not** place content images in `public/` unless a static path is absolutely required.

## Phase 5 — Interactivity (no jQuery)

* [ ] Implement **fullscreen/overlay menu**:

  * [ ] Toggle classes on `<body>` (`.menu-open`, fade-in/out) via small island script.
  * [ ] Ensure accessibility (ARIA, focus trap if modal-like).
* [ ] Implement **parallax** on Home (`/`):

  * [ ] Prefer CSS + IntersectionObserver; only if visual parity requires, add a small scroll handler.
* [ ] Implement **accordions/tabs** (if present on About/Case Study):

  * [ ] Progressive enhancement; ARIA roles; no jQuery.
* [ ] Implement **lightbox** (if needed) with tiny dependency or vanilla.
* [ ] Implement **masonry/grid** where legacy used Isotope/Packery:

  * [ ] Try modern CSS masonry; if mismatch, add a minimal script to reorder/tile.

## Phase 6 — Pages (follow `sitemap.json`)

> For each page: **READ the legacy file in `/legacy`**, map to Tailwind classes, wire images via `astro:assets`, replicate interactions, commit.

* [ ] `/` (Home → `legacy/parallax-showcase.html`)
* [ ] `/case-study` (→ `legacy/portfolio-item/personal-card.html`)
* [ ] `/about-us` (→ `legacy/about-us.html`)

**Services (Level 1)**

* [ ] `/services/branding` (→ `legacy/portfolio-item/branding-project-4.html`) **base template**
* [ ] Duplicate the template for:

  * [ ] `/services/advertising`
  * [ ] `/services/celebrity-canvas` (no L2 page)
  * [ ] `/services/influencer-marketing`
  * [ ] `/services/digital-marketing`
  * [ ] `/services/film`
  * [ ] `/services/photography-videography`
  * [ ] `/services/code-creativity`
  * [ ] `/services/print-production`
  * [ ] `/services/events-exhibition`

**Portfolio (Level 2)**

* [ ] `/portfolio/branding-portfolio` (→ `legacy/two-columns-portfolio.html`)
* [ ] `/portfolio/advertising-portfolio` (→ `legacy/three-columns-portfolio.html`)
* [ ] `/portfolio/digital-marketing-portfolio` (→ `legacy/two-columns-portfolio.html`)
* [ ] `/portfolio/film-portfolio` (→ `legacy/two-columns-portfolio.html`)
* [ ] `/portfolio/photography-videography-portfolio` (→ `legacy/four-columns-portfolio.html`)
* [ ] `/portfolio/code-creativity-portfolio` (→ `legacy/two-columns-portfolio.html`)
* [ ] `/portfolio/print-production-portfolio` (→ `legacy/three-columns-portfolio.html`)
* [ ] `/portfolio/events-exhibition-portfolio` (→ `legacy/three-columns-portfolio.html`)

> Where pages share the same legacy template, **build once, then duplicate** and change only data (titles, images, copy).

## Phase 7 — Data extraction

* [ ] Extract card lists / galleries into small data modules under `src/data/**` or co-locate at page top.
* [ ] Loop with `{items.map(...)}` in `.astro`. Keep it small & readable.

## Phase 8 — Cleanup & performance

* [ ] Remove any legacy CSS/JS imports. No jQuery.
* [ ] Ensure all images converted to `<Image>/<Picture>` or `getImage`.
* [ ] Test Lighthouse locally (≥90) and fix regressions (sizes/srcset, preload fonts, lazy vs eager images).
* [ ] Wire GA4 (defer; environment-guarded).

## Phase 9 — Build & deploy

* [ ] `npm run build` → verify output
* [ ] Prepare for **Netlify** or **Cloudflare Pages** (add adapter only if needed; otherwise static output is fine).
* [ ] Provide a short **README** with run/build/deploy steps.

---

## Notes for Codex

* Before each page, **reopen its `/legacy` source** to match structure and behavior.
* Ask for **more images** or **icons** if missing; give exact paths and names to add under `src/assets/**` or `src/icons/**`.
* Commit incrementally and clearly.

---

### Example: Requesting images from developer (template)

> *“Please add the following images based on `/legacy/parallax-showcase.html` hero:*
>
> * *`src/assets/img/home-hero.jpg` (original hero)*
> * *`src/assets/img/home-hero-alt.jpg` (secondary)*
>   *I will import them with `astro:assets` and generate responsive variants. After pushing, I’ll proceed on the home page.”*

---
