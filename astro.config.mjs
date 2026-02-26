// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
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
    const slugMatch = url.match(/boredom-at-work\.com\/([^\/]+)\/?$/);
    if (slugMatch) {
      publishedSlugs.add(slugMatch[1]);
    }
  }
  
  // Specific internal pages that should always be linked
  const internalPages = ['blog', 'tags', 'about', 'contact', 'search'];
  internalPages.forEach(p => publishedSlugs.add(p));

  /** @param {any} tree */
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      const n = /** @type {any} */ (node);
      const p = /** @type {any} */ (parent);
      const url = n.url;
      // Multi-layer check for internal links
      if (
        (url.startsWith('/') && !url.startsWith('/images/')) || 
        url.startsWith('https://boredom-at-work.com/')
      ) {
        let slug = '';
        if (url.startsWith('/')) {
          const match = url.match(/^\/([^\/]+)\/?$/);
          if (match) slug = match[1];
        } else {
          const match = url.match(/boredom-at-work\.com\/([^\/]+)\/?$/);
          if (match) slug = match[1];
        }

        if (slug && !publishedSlugs.has(slug)) {
          // Replace link node with its children in the parent's children array
          if (p && typeof index === 'number') {
            p.children.splice(index, 1, ...n.children);
          }
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
  },

  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude tag pages
        !page.includes('/tags/') &&
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