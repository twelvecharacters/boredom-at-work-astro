// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

// Build slug → lastmod map from blog frontmatter for sitemap
function getBlogDates(dir = 'src/content/blog') {
  const dateMap = new Map();
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!entry.name.endsWith('.md')) continue;
      const content = readFileSync(full, 'utf-8');
      const slug = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1] || basename(entry.name, '.md');
      const date = content.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1]
        || content.match(/^publishDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      if (date) dateMap.set(`https://boredom-at-work.com/${slug}/`, new Date(date).toISOString());
    }
  }
  walk(dir);
  return dateMap;
}

const blogDates = getBlogDates();

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
    '/learning-paths': '/ai-tools-guide/',
    '/learning-paths/ai-mastery': '/ai-tools-guide/',
    '/learning-paths/3d-printing-startup': '/3d-printing-guide/'
  }
});