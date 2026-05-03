// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

import { visit } from 'unist-util-visit';

// Build slug → lastmod map from blog frontmatter for sitemap
// Only includes published articles (not drafts, not future-dated)
function getBlogDates(dir = 'src/content/blog') {
  const dateMap = new Map();
  const now = new Date();
  // Set now to end of today UTC for consistent comparison with build script
  now.setUTCHours(23, 59, 59, 999);

  /** @param {string} d */
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!entry.name.endsWith('.md')) continue;
      const content = readFileSync(full, 'utf-8');
      if (/^draft:\s*true/m.test(content)) continue;
      const publishDate = content.match(/^publishDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      if (!publishDate || new Date(publishDate) > now) continue;
      const slug = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1] || basename(entry.name, '.md');
      const date = content.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] || publishDate;
      dateMap.set(`https://boredom-at-work.com/${slug}/`, new Date(date).toISOString());
    }
  }
  walk(dir);
  return dateMap;
}

const blogDates = getBlogDates();

// Remark plugin to strip internal links to unpublished articles
function remarkFilterUnpublishedLinks() {
  const publishedSlugs = new Set();
  for (const url of blogDates.keys()) {
    try {
      const u = new URL(url);
      const slug = u.pathname.replace(/^\/|\/$/g, '');
      if (slug) publishedSlugs.add(slug);
    } catch (e) {
      console.warn(`[remarkFilterUnpublishedLinks] Invalid URL in blogDates: ${url}`);
    }
  }
  
  // Specific internal pages that should always be allowed
  const allowedPaths = ['', 'blog', 'tags', 'about', 'contact', 'search'];
  allowedPaths.forEach(p => publishedSlugs.add(p));

  /** @param {any} tree */
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      const n = /** @type {any} */ (node);
      const p = /** @type {any} */ (parent);
      const url = n.url;
      
      // Skip external links, mailto, etc.
      if (!url || (url.startsWith('http') && !url.startsWith('https://boredom-at-work.com'))) return;
      if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) return;

      // Extract potential slug
      let slug = '';
      try {
        if (url.startsWith('https://boredom-at-work.com')) {
          slug = new URL(url).pathname.replace(/^\/|\/$/g, '');
        } else {
          // Handle absolute (/slug) and relative (slug) paths, stripping query/fragment
          slug = url.split('#')[0].split('?')[0].replace(/^\/|\/$/g, '');
        }
      } catch (e) {
        return;
      }

      // If it's a root-level path (potential blog post) that isn't published
      // We only filter root-level slugs because blog posts are at /[slug]
      // Sub-paths like /tags/ai/ are allowed (checked via allowedPaths for top-level /tags)
      if (slug && !slug.includes('/') && !publishedSlugs.has(slug)) {
        // Strip the link: replace the link node with its children in the parent
        if (p && typeof index === 'number') {
          p.children.splice(index, 1, ...n.children);
        }
      }
    });
  };
}

// Find most recent publishDate for homepage/blog lastmod
const mostRecentDate = [...blogDates.values()].sort().pop() || new Date().toISOString();
blogDates.set('https://boredom-at-work.com/', mostRecentDate);
blogDates.set('https://boredom-at-work.com/blog/', mostRecentDate);

// https://astro.build/config
export default defineConfig({
  site: 'https://boredom-at-work.com',

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkFilterUnpublishedLinks],
    rehypePlugins: [
      [rehypeExternalLinks, { 
        target: '_blank', 
        rel: ['noopener', 'nofollow'] 
      }]
    ],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude tag pages
        !page.includes('/tags/') &&
        // Exclude archive pages (noindexed)
        !page.includes('/archive/') &&
        // Exclude paginated blog pages (keep /blog/ but not /blog/2/, /blog/3/, etc.)
        !/\/blog\/\d+\/?$/.test(page),
      serialize(item) {
        const lastmod = blogDates.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      }
    })
  ],
  redirects: {
    '/learning-paths': '/ai-learning-hub/',
    '/learning-paths/ai-mastery': '/ai-learning-hub/',
    '/learning-paths/3d-printing-startup': '/3d-printing-guide/'
  }
});