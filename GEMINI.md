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

### Content Strategy
- **Structure:** Blog articles are organized in subdirectories (e.g., `src/content/blog/YYYY/MM/`). Store the markdown file and its associated images together in the same directory.
- **Frontmatter:** All blog articles must include the `imageAlt` field for their featured image to ensure proper Schema.org JSON-LD generation and accessibility.
- **Slug Management:** Favor the explicit `slug` field in blog frontmatter over directory-based IDs.
- **Internal Linking:** The `remarkFilterUnpublishedLinks` plugin in `astro.config.mjs` prevents leaking links to draft or future-dated content.
- **Language:** Always use **American English** (e.g., "color", "realize", "center").
- **Quality Standard:** Pillar posts target **1600+ words** to avoid "thin content" flags. Standard posts should be 1000+ words.

### Styling & CSS
- **Tailwind 4:** Use Tailwind CSS 4 features and modern CSS variables.
- **Sass Deprecation:** Avoid Sass; use standard CSS with Tailwind utilities.

## 2. SEO & Schema Mandates

### Structured Data
- All blog posts must implement appropriate Schema.org JSON-LD (FAQ, Review, etc.).
- Use optimized asset paths for logos and featured images in JSON-LD.

### External Links & Sponsorship
- **Official Links:** Always provide direct links to the official websites or app stores for tools mentioned.
- **Sponsored Content:** Add sponsored partner domains to `SPONSORED_DOMAINS` in `astro.config.mjs` to automatically apply `rel="sponsored"`.
- **Default SEO:** All other external links default to `rel="noopener nofollow"`.

### Discovery
- **RSS Feed:** Maintain the rich RSS feed (`rss.xml.js`) with full HTML and featured images.
- **Search:** Keep `pagefind` integrated into the build process.
- **IndexNow:** Use `pnpm run indexnow` to alert search engines of new content.

## 3. Performance & Optimization

- **Font Loading:** Self-host all fonts in `public/fonts/` and use `font-display: swap`.
- **Preloading:** Use `BaseLayout.astro` to manage critical asset preloading (Logo, Hero backgrounds).

## 4. Development Workflow

- **Content Linting:** Run `pnpm run lint:content:fix` before major updates to ensure frontmatter and price consistency.
- **Build Validation:** Always run a full `pnpm run build` to verify Pagefind indexing and Sitemap generation.
- **Stats & Export:** Run `pnpm run stats` after adding content to update the `README.md` and repository visibility. You can also run `pnpm run export:articles` to dump all article metadata into a CSV for analysis.
