# Project Mandates & Recommendations (GEMINI.md)

This document outlines the foundational standards and architectural goals for the `boredom-at-work-astro` project. Adhere to these guidelines for all future development and refactoring.

## 1. Core Engineering Standards

### Asset Management (Priority 1)
- **Migration Goal:** Move all images from `public/images/` to `src/assets/images/`.
- **Optimization:** Use Astro's native `astro:assets` (`<Image />` and `<Picture />`) instead of custom `OptimizedImage.astro`.
- **Reasoning:** Leverages Astro's build-time image processing for automatic resizing, density descriptors (2x, 3x), and improved Core Web Vitals (LCP).

### Content Strategy
- **Slug Management:** Favor the explicit `slug` field in blog frontmatter over directory-based IDs.
- **Internal Linking:** Maintain the `remarkFilterUnpublishedLinks` plugin in `astro.config.mjs` to prevent leaking links to draft or future-dated content.
- **Type Safety:** Ensure all blog-related utilities in `src/utils/blog.ts` use `CollectionEntry<'blog'>` instead of `any`.

### Styling & CSS
- **Tailwind 4:** Use Tailwind CSS 4 features (CSS variables, native nesting) where possible.
- **Sass Deprecation:** Avoid introducing new `.scss` files; prefer standard CSS or Tailwind. Aim to remove `sass` dependency once legacy styles are migrated.

## 2. SEO & Schema Mandates

### Structured Data
- All blog posts must implement appropriate Schema.org JSON-LD (FAQ, Review, HowTo, SoftwareApplication, Course) as defined in `src/content.config.ts`.
- Validation: Ensure the JSON-LD generation in `BlogPost.astro` stays synchronized with Zod schema updates.

### Discovery
- Maintain the custom `sitemap-images.xml` and `sitemap-videos.xml` generators.
- Ensure `rss.xml` is present and updated (Implementation Pending).
- Use `IndexNow` (via `scripts/indexnow.js`) for rapid indexing of new content.

## 3. Performance & Optimization

- **Font Loading:** Self-host all fonts in `public/fonts/` and use `font-display: swap`.
- **Search:** Keep `pagefind` integrated into the build process for high-performance static search.
- **Preloading:** Use `BaseLayout.astro` to manage critical asset preloading (Logo, Hero backgrounds) based on page requirements.

## 4. Development Workflow

- **Content Linting:** Run `npm run lint:content` before major updates to ensure frontmatter consistency.
- **Build Validation:** Always run a full `npm run build` to verify Pagefind indexing and Sitemap generation before deployment.
