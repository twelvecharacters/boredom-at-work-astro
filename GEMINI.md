# Project Mandates & Recommendations (GEMINI.md)

This document outlines the foundational standards and architectural goals for the `boredom-at-work-astro` project. Adhere to these guidelines for all future development and refactoring.

## 1. Core Engineering Standards

### Asset Management (Priority 1)
- **Migration Goal:** [COMPLETED] Moved all images from `public/images/` to `src/assets/images/`.
- **Optimization:** [COMPLETED] Integrated Astro's native `astro:assets` (`<Image />` and `<Picture />`) across all core components (Header, Hero, Banners, Blog Posts).
- **Reasoning:** Leverages Astro's build-time image processing for automatic resizing, density descriptors (2x, 3x), and improved Core Web Vitals (LCP).

### Content Strategy
- **Slug Management:** Favor the explicit `slug` field in blog frontmatter over directory-based IDs.
- **Internal Linking:** Maintain the `remarkFilterUnpublishedLinks` plugin in `astro.config.mjs` to prevent leaking links to draft or future-dated content.
- **Type Safety:** [COMPLETED] Systematic replacement of `any` with `CollectionEntry<'blog'>` in `src/utils/blog.ts`, components (`Pagination.astro`, `OptimizedImage.astro`), and all paginated/slug pages.

### Styling & CSS
- **Tailwind 4:** [COMPLETED] Fully migrated to Tailwind CSS 4 features.
- **Sass Deprecation:** [COMPLETED] Migrated `global.scss` to `global.css` and removed `sass` dependency.

## 2. SEO & Schema Mandates

### Structured Data
- All blog posts implement appropriate Schema.org JSON-LD (FAQ, Review, etc.).
- [COMPLETED] Updated JSON-LD to use optimized asset paths for logos and featured images.

### Discovery
- Maintain the custom `sitemap-images.xml` and `sitemap-videos.xml` generators.
- **RSS Feed:** [COMPLETED] Created rich RSS feed (`rss.xml.js`) with full article HTML and featured image enclosures.
- **Search:** [COMPLETED] Integrated Pagefind with a custom premium UI (Glassmorphism, Thumbnails).
- Use `IndexNow` (via `scripts/indexnow.js`) for rapid indexing of new content.

## 3. Performance & Optimization

- **Font Loading:** Self-host all fonts in `public/fonts/` and use `font-display: swap`.
- **Search:** Keep `pagefind` integrated into the build process for high-performance static search.
- **Preloading:** Use `BaseLayout.astro` to manage critical asset preloading (Logo, Hero backgrounds) based on page requirements.

## 4. Development Workflow

- **Content Linting:** Run `npm run lint:content` before major updates to ensure frontmatter consistency.
- **Build Validation:** Always run a full `npm run build` to verify Pagefind indexing and Sitemap generation before deployment.
