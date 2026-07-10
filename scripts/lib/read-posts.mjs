// Config-time / script-time blog reader (no `astro:content`, so it can be
// imported from astro.config.mjs and Node scripts alike). The runtime site
// uses the content-collection API in src/utils/blog.ts; this mirrors the same
// "published" definition for the places that cannot use that API.
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const BLOG_DIR = 'src/content/blog';

/** End of today in UTC, so all of today counts as published. */
export function endOfTodayUTC() {
  const d = new Date();
  d.setUTCHours(23, 59, 59, 999);
  return d;
}

/**
 * Read every blog post's frontmatter from disk.
 * Date parsing is quote-tolerant (`publishDate: 2026-01-01` and
 * `publishDate: "2026-01-01"` both match) — the old strict regex silently
 * dropped quoted dates, which stripped those posts' inbound internal links.
 */
export function readAllPosts(dir = BLOG_DIR) {
  const posts = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      const isMdx = entry.name.endsWith('.mdx');
      if (!entry.name.endsWith('.md') && !isMdx) continue;
      const content = readFileSync(full, 'utf-8');
      const draft = /^draft:\s*true/m.test(content);
      const publishDate = content.match(/^publishDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;
      const updatedDate = content.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;
      const slug = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1]
        || basename(entry.name, isMdx ? '.mdx' : '.md');
      posts.push({ file: full, slug, draft, publishDate, updatedDate });
    }
  }
  walk(dir);
  return posts;
}

/** Not a draft, and has a publishDate that is today or earlier. */
export function isPublished(post, now = endOfTodayUTC()) {
  if (post.draft || !post.publishDate) return false;
  return new Date(post.publishDate) <= now;
}
