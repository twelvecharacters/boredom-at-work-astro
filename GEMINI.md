# Project Mandates & Recommendations (GEMINI.md)

This document outlines the foundational standards and architectural goals for the `boredom-at-work-astro` project. Adhere to these guidelines for all future development and refactoring.

## 1. Core Engineering Standards

### Package Management
- **pnpm Only:** The project has migrated from npm to `pnpm`. Do not use `npm` or `yarn`.
- **Build Scripts:** Maintain `pnpm-workspace.yaml` to explicitly allow necessary build scripts (e.g., `esbuild`, `sharp`).
- **Dependencies:** Use `pnpm install --frozen-lockfile` in CI/CD to ensure consistent environments.

### Asset Management
- **Optimization:** Use Astro's native `astro:assets` (`<Image />` and `<Picture />`) for images in `.astro` components.
- **Markdown Images:** For blog posts, use the `image` and `imageAlt` frontmatter fields to handle the hero image automatically. Store content-related images relative to the article in the same folder (`YYYY/MM/`). This allows for co-location of assets and easier content portability.

### Content Strategy & Topic Clustering
- **Structure:** Blog articles are organized in subdirectories (e.g., `src/content/blog/YYYY/MM/`). Store the markdown file and its associated images together in the same directory.
- **Frontmatter:** All blog articles must include the `imageAlt` field for their featured image to ensure proper Schema.org JSON-LD generation and accessibility. Titles should be <= 60 characters (primary keyword at the front) and meta descriptions 150-160 characters to avoid SERP truncation. Articles must have **maximum 4 tags** (strictly relevant and focused, avoiding tag bloat).
- **Slug Management:** Favor the explicit `slug` field in blog frontmatter over directory-based IDs.
- **Topic Clusters & Pillar Boost:** All topical articles must actively link back to their respective Master Hub/Pillar Page (`/learn-ai-guide/`, `/chatgpt-guide/`, `/3d-printing-guide/`, `/desk-upgrade-guide/`, `/investing-tools-guide/`, `/photography-guide/`, `/ai-travel-planning/`) via contextual callout boxes or in-content recommendations.
- **Homepage Pillar Integration:** The homepage (`src/pages/index.astro`) must maintain direct, 1-click links to all cornerstone Pillar Guides (`MasterGuidesGrid.astro`) to maximize Link Equity (PageRank) transfer.
- **Internal Linking Rules:** Actively generate internal links, but ONLY point to preceding/previously published articles (never to future-dated ones) to avoid dead ends. Ensure no dead links. The `remarkFilterUnpublishedLinks` plugin in `astro.config.mjs` prevents leaking links to draft or future-dated content. Structure clusters with clear intent to avoid keyword cannibalization.
- **Language & Formatting:** Always use **American English** (e.g., "color", "realize", "center"). Strictly avoid em-dashes (—); use commas or parentheses instead per the repo's em-dash-free rule.
- **No ASCII Diagrams:** Strictly avoid ASCII art boxes, ASCII diagrams, or text-based drawings in articles. Use standard Markdown tables, styled blockquotes, or bulleted lists instead for clean mobile and desktop rendering.
- **Quality Standard:** NO "thin content" is allowed. ALL posts MUST be at least **1600+ words**.

### Styling & CSS
- **Tailwind 4:** Use Tailwind CSS 4 features and modern CSS variables.
- **Sass Deprecation:** Avoid Sass; use standard CSS with Tailwind utilities.

## 2. SEO & Schema Mandates

### Structured Data
- All blog posts must implement appropriate Schema.org JSON-LD (FAQ, Review, HowTo, SoftwareApp, Video, Course, etc.).
- Use optimized asset paths for logos and featured images in JSON-LD.

### External Links & Sponsorship
- **Official Links:** Actively generate external links whenever possible. Always provide direct links to the official websites or app stores for tools, products, or platforms mentioned in the article.
- **Sponsored Content:** Add sponsored partner domains to `SPONSORED_DOMAINS` in `astro.config.mjs` to automatically apply `rel="sponsored"`.
- **Default SEO:** All other external links default to `rel="noopener nofollow"`.

### Discovery & Sitemaps
- **Sitemap Architecture:** Sitemap is automatically generated via `@astrojs/sitemap` during build (`dist/sitemap-index.xml` -> `sitemap-0.xml`). Tag pages, `/archive/`, and paginated subpages (`/blog/2/`...) are strictly filtered out to prevent crawl-budget waste and duplicate content. `lastmod` dates are populated dynamically from publication dates.
- **RSS Feed:** Maintain the rich RSS feed (`rss.xml.js`) with full HTML and featured images.
- **Search:** Keep `pagefind` integrated into the build process.
- **IndexNow:** Use `pnpm run indexnow` to automatically submit new/updated URLs to Bing, Yandex, and other search engines on every deployment.

## 3. Performance & Optimization

- **Font Loading:** Self-host all fonts in `public/fonts/` and use `font-display: swap`.
- **Preloading:** Use `BaseLayout.astro` to manage critical asset preloading (Logo, Hero backgrounds).

## 4. Development Workflow

- **Content Linting:** Run `pnpm run lint:content:fix` before major updates to ensure frontmatter, em-dash removal, and price consistency (0 errors before committing).
- **Build Validation:** Always run a full `pnpm run build` to verify Pagefind indexing and Sitemap generation.
- **Stats & Export:** Run `pnpm run stats` after adding content to update the `README.md` and repository visibility. You can also run `pnpm run export:articles` to dump all article metadata into a CSV for analysis.
