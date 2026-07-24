// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import rehypeExternalLinks from 'rehype-external-links';
import { readAllPosts, isPublished, endOfTodayUTC } from './scripts/lib/read-posts.mjs';

import { visit } from 'unist-util-visit';

import mdx from '@astrojs/mdx';

// Build slug → lastmod map from blog frontmatter for sitemap
// Only includes published articles (not drafts, not future-dated)
function getBlogDates() {
  const dateMap = new Map();
  const now = endOfTodayUTC();
  for (const post of readAllPosts()) {
    if (!isPublished(post, now)) continue;
    const date = post.updatedDate || post.publishDate;
    dateMap.set(`https://boredom-at-work.com/${post.slug}/`, new Date(date).toISOString());
  }
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

// Rehype plugin to add data-labels for responsive tables
function rehypeResponsiveTables() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'table') {
        const thead = node.children.find(c => c.type === 'element' && c.tagName === 'thead');
        if (!thead) return;
        
        const tr = thead.children.find(c => c.type === 'element' && c.tagName === 'tr');
        if (!tr) return;

        const headers = [];
        tr.children.forEach(th => {
          if (th.type === 'element' && th.tagName === 'th') {
            let text = '';
            visit(th, 'text', (t) => { text += t.value; });
            headers.push(text.trim());
          }
        });

        if (headers.length > 0) {
          node.properties['data-has-labels'] = 'true';
          
          const tbody = node.children.find(c => c.type === 'element' && c.tagName === 'tbody');
          if (!tbody) return;

          tbody.children.forEach(row => {
            if (row.type === 'element' && row.tagName === 'tr') {
              let tdIndex = 0;
              row.children.forEach(cell => {
                if (cell.type === 'element' && cell.tagName === 'td') {
                  if (headers[tdIndex]) {
                    cell.properties['data-label'] = headers[tdIndex];
                  }
                  tdIndex++;
                }
              });
            }
          });
        }
      }
    });
  };
}


// Sponsored partner domains. Links to these get rel="sponsored" instead of nofollow
// per Google guidelines for paid placements. Add new sponsors here.
const SPONSORED_DOMAINS = [
  'justway.com',
];

// Reciprocal link-exchange partners. Links to these are do-follow (no nofollow,
// no sponsored) - editorial links where the destination genuinely fits the content.
const DOFOLLOW_DOMAINS = [
  'g8trip.com',
];

// Find most recent publishDate for homepage/blog lastmod
const mostRecentDate = [...blogDates.values()].sort().pop() || new Date().toISOString();
blogDates.set('https://boredom-at-work.com/', mostRecentDate);
blogDates.set('https://boredom-at-work.com/blog/', mostRecentDate);

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://boredom-at-work.com',

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkFilterUnpublishedLinks],
    rehypePlugins: [
      rehypeResponsiveTables,
      [rehypeExternalLinks, {
        target: '_blank',
        rel: (element) => {
          const href = element.properties?.href;
          if (typeof href === 'string') {
            for (const domain of DOFOLLOW_DOMAINS) {
              if (href.includes(domain)) return ['noopener'];
            }
            for (const domain of SPONSORED_DOMAINS) {
              if (href.includes(domain)) return ['sponsored', 'noopener'];
            }
          }
          return ['noopener', 'nofollow'];
        }
      }]
    ],
  },

  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
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
    }),
    mdx(),
  ],
  redirects: {
    '/learning-paths': '/ai-learning-hub/',
    '/learning-paths/ai-mastery': '/ai-learning-hub/',
    '/learning-paths/3d-printing-startup': '/3d-printing-guide/',

    // Slug-Fix 1.6.2026: Filename-Prefix-Bug (acc27af) — Bing/Google haben prefixed URLs
    // gecrawlt zwischen 31.5. und 1.6.2026. 301 zurück auf canonical Slugs.
    '/01-ai-trip-planning-japan/': '/ai-trip-planning-japan/',
    '/04-ai-packing-list-travel-checklist/': '/ai-packing-list-travel-checklist/',
    '/04-chatgpt-plus-vs-free/': '/chatgpt-plus-vs-free/',
    '/05-ai-trip-planning-vietnam/': '/ai-trip-planning-vietnam/',
    '/07-google-gemini-review/': '/google-gemini-review/',
    '/10-chatgpt-for-excel/': '/chatgpt-for-excel/',
    '/11-gemini-travel-planning/': '/gemini-travel-planning/',
    '/12-ai-trip-planning-cambodia/': '/ai-trip-planning-cambodia/',
    '/13-chatgpt-custom-instructions/': '/chatgpt-custom-instructions/',
    '/13-chatgpt-malaysia-trip-planning/': '/chatgpt-malaysia-trip-planning/',
    '/13-perplexity-travel-research/': '/perplexity-travel-research/',
    '/15-best-ai-browser-extensions/': '/best-ai-browser-extensions/',
    '/15-best-ai-trip-planners/': '/best-ai-trip-planners/',
    '/16-ai-presentation-makers/': '/ai-presentation-makers/',
    '/16-convince-wife-3d-printer/': '/convince-wife-3d-printer/',
    '/17-essential-mac-apps-2026/': '/essential-mac-apps-2026/',
    '/17-japan-vietnam-cambodia-comparison/': '/japan-vietnam-cambodia-comparison/',
    '/18-chatgpt-travel-planning-prompts/': '/chatgpt-travel-planning-prompts/',
    '/18-trmnl-e-ink-dashboard-review/': '/trmnl-e-ink-dashboard-review/',
    '/19-vs-code-vs-antigravity/': '/vs-code-vs-antigravity/',
    '/20-ai-travel-planning-mistakes/': '/ai-travel-planning-mistakes/',
    '/20-build-ai-flight-search-agent/': '/build-ai-flight-search-agent/',
    '/20-sensor-size-guide-mft-apsc-fullframe/': '/sensor-size-guide-mft-apsc-fullframe/',
    '/22-claude-vs-chatgpt-travel-planning/': '/claude-vs-chatgpt-travel-planning/',
    '/23-3d-printing-for-coffee-nerds/': '/3d-printing-for-coffee-nerds/',
    '/23-new-gemini-features-2026/': '/new-gemini-features-2026/',
    '/25-ai-planning-southeast-asia-trip-2026/': '/ai-planning-southeast-asia-trip-2026/',
    '/27-free-ai-travel-tools/': '/free-ai-travel-tools/',
    '/30-antigravity-2-gemini-35/': '/antigravity-2-gemini-35/',
    '/31-ai-powered-smart-appliances-guide/': '/ai-powered-smart-appliances-guide/',
  }
});