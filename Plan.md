# Plan.md (Codex master prompt)

> Paste everything below into `Plan.md` at the repo root.

---

## Project Brief (for Codex)

You are an autonomous assistant helping convert a static legacy theme into a clean, modern **Astro + Tailwind** site. You have full read access to the repository (already connected). Legacy assets live in **`/legacy`** (a copy of `_trimmed`) and the site structure is defined in **`/sitemap.json`**.

### Team context

* Developer is comfortable with **HTML/CSS**, **Tailwind**, **Vanilla JS**, **Vue SFCs**, but **new to Astro**.
* No jQuery, no WooCommerce, no Contact Form 7 in the new codebase.
* Final site must **match the legacy look & behavior** (parallax, menus, galleries) but with a simpler, modern stack.

---

## Target stack (pin to latest stable at setup time)

> Use the **latest stable** versions as of **2025-09-24**. Don’t guess numbers—resolve via official installers and pin in `package.json`:

* **Astro** (create via `npm create astro@latest` → pin whatever it generates)
* **Tailwind CSS** with official **Astro/Tailwind integration plugin**
* **@astrojs/image (astro:assets built-in)** – use `<Image>` / `<Picture>` and `getImage` (Sharp pipeline, default)
* **Vue integration for Astro** (only if/when needed for SFC dynamics; otherwise prefer `.astro` components + islands)
* **Prettier** (default config OK)
* **ESLint** (optional; fine to skip if time-boxed)

No TypeScript required unless you choose to enable it for DX.

---

## Image guidelines (optimized path – REQUIRED)

We will use **Astro’s built-in image pipeline** for all content images:

* **Put source images under**: `src/assets/img/**` (or alongside the page/component).

* **Inline imports + optimize** at build with `astro:assets`:

  ```astro
  ---
  import { Image, Picture, getImage } from 'astro:assets';
  import hero from '@/assets/img/hero.jpg';
  ---

  <!-- Responsive <img> -->
  <Image
    src={hero}
    alt="Hero image"
    widths={[400, 640, 960, 1280, 1600]}
    sizes="100vw"
    formats={['avif', 'webp', 'jpeg']}
    quality={80}
    loading="eager"
    decoding="async"
  />

  <!-- Art direction / multiple sources -->
  <Picture
    src={hero}
    alt="Hero image"
    widths={[640, 960, 1280, 1600]}
    sizes="(max-width: 1024px) 100vw, 1200px"
    formats={['avif','webp','jpeg']}
  />

  <!-- Optimized single asset for CSS backgrounds -->
  ---
  const bg = await getImage({ src: hero, width: 1920, format: 'webp', quality: 80 });
  ---
  <section style={`background-image:url(${bg.src})`} class="bg-cover bg-center">
    ...
  </section>
  ```

* Use **`public/`** only for files that must be served verbatim (favicons, robots.txt, third-party paths). Otherwise prefer `src/assets/**`.

---

## Icons & fonts

* **No external icon fonts**. Extract the small set of icons we actually use as **SVGs** under `src/icons/**`.
* Create a lightweight **`src/components/Icon.astro`** that accepts `{ name, size, class, title }` and inlines the correct SVG. (We can switch to a simple map/dictionary of imported SVGs.)
* **Fonts**: self-host in `public/fonts/**` or `src/assets/fonts/**` (if you want hashing). Reference via `@font-face` in the Tailwind base layer.

---

## Tailwind design system

* Create **`tailwind.config.cjs`** with theme tokens extracted from the legacy CSS (colors, spacing scale if needed).
* Add a minimal **`src/styles/main.css`** with Tailwind layers:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      --brand:  #HexFromLegacy;
      --accent: #HexFromLegacy;
      /* Add more vars if helpful */
    }
    html { scroll-behavior: smooth; }
  }
  ```
* Replace legacy CSS classes with Tailwind utility classes. Keep **only** what’s necessary; don’t re-import the old CSS.

---

## Routing & pages

* Use **`/sitemap.json`** to drive page creation and routing. Pages to implement:

  ```
  /
  /case-study
  /about-us

  /services/branding
  /services/advertising
  /services/celebrity-canvas
  /services/influencer-marketing
  /services/digital-marketing
  /services/film
  /services/photography-videography
  /services/code-creativity
  /services/print-production
  /services/events-exhibition

  /portfolio/branding-portfolio
  /portfolio/advertising-portfolio
  /portfolio/digital-marketing-portfolio
  /portfolio/film-portfolio
  /portfolio/photography-videography-portfolio
  /portfolio/code-creativity-portfolio
  /portfolio/print-production-portfolio
  /portfolio/events-exhibition-portfolio
  ```

  > Note: **celebrity-canvas** has no level-2 portfolio page.

* **Source of truth for content/structure**: The legacy pages under `/legacy`. Before working on each page, **re-open & read the matching legacy HTML** to match structure and behavior.

---

## Componentization & data

* Identify repeating blocks (cards, grids, nav, footer, “Next Project” control) and convert them into **`.astro` components**.
* For repeatable lists (services, portfolio grids), create **small JSON/JS objects** and **loop** with `{items.map(...)}` in `.astro`.
* Keep page-specific data co-located in the page file unless it becomes large → then move to `src/data/**`.

---

## Interactivity (no jQuery)

* Use **vanilla DOM** or tiny helpers for:

  * **Fullscreen/overlay menu** toggle (classList add/remove on `<body>` etc.)
  * **Parallax** (prefer CSS + IntersectionObserver; only add JS if truly needed for effect parity)
  * **Accordions/tabs** (progressive enhancement, ARIA-friendly)
  * **Lightbox** (small dependency OK if needed; otherwise custom)
  * **Masonry/grid**: use modern CSS masonry or a tiny, dependency-light script. Only add a lib if parity requires it.
* **No WooCommerce, no CF7**. Replace forms with a simple HTML form + external service (form action stub for now).

---

## Performance & quality gates

* Aim for **Lighthouse ≥ 90** across Performance/Accessibility/Best Practices/SEO.
* Use `<Image>/<Picture>` for all meaningful content images.
* Remove unused CSS/JS. No jQuery. Avoid large libs unless essential.
* GA4 hook only (deferred, opt-in if needed).

---

## Migration workflow (how to work page-by-page)

1. **Create Astro project + Tailwind**; commit the vanilla scaffold.
2. Add **`/legacy`** as-is and **`/sitemap.json`** (already present).
3. Implement **layout/shell** (header, footer, menu, fonts/icons) using Tailwind.
4. For each page (home, case-study, about-us, then services + portfolio):

   * **Read the legacy page** in `/legacy`.
   * Recreate structure in a `.astro` page.
   * Swap images to `astro:assets` (import + `<Image>/<Picture>` or `getImage` for backgrounds).
   * Replace legacy CSS classes with Tailwind.
   * Re-implement the specific interactions in vanilla JS (no jQuery).
   * Match visual and behavior parity.
   * Commit once clean & tested.
5. For service pages that share a common template (branding, advertising, film, etc.), **build once**, then **duplicate & tweak data**.

---

## Deliverables

* Clean Astro app with pages as routed above
* Tailwind-only styling + small `main.css` (no legacy CSS)
* Inline SVG **Icon** component
* Optimized images via `astro:assets`
* No jQuery/Woo/CF7
* Readable components + small data objects for repeated blocks
* Netlify/Cloudflare-ready build

---

## What you have to work with

* `/legacy/**`: original HTML/CSS/JS + assets (reference only)
* `/sitemap.json`: canonical routes mapping
* `/Plan.md` (this file)
* Developer will add images to `src/assets/img/**` as we progress

---

## Important execution rules (please follow)

* Before implementing a page, **open and re-read** the corresponding legacy HTML in `/legacy` to ensure structure & content parity.

* Prefer **`.astro` components** over Vue unless a page clearly benefits from SFC patterns.

* For any place you’re unsure:

  1. Propose 1–2 low-dependency options.
  2. Pick the smallest one that achieves pixel/behavior parity.

* When you need additional assets (fonts, icons), **instruct the developer precisely** how to extract from `/legacy` and where to place them (`src/assets/**` or `public/**`) with examples.

* Commit in **small, logical chunks**, referencing the page or component worked on.

---


