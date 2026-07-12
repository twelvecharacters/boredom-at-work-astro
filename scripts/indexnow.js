#!/usr/bin/env node

/**
 * IndexNow Submission Script
 * Submits new/updated URLs to Bing, Yandex, and other search engines via IndexNow API.
 *
 * Usage:
 *   node scripts/indexnow.js              # Submit all URLs from sitemap
 *   node scripts/indexnow.js --changed    # Submit only recently changed files (git diff)
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const SITE_URL = 'https://boredom-at-work.com';
const INDEX_NOW_KEY = '20787ddab7914ca793ba6fbf81defbfb';
const INDEX_NOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrlsFromSitemap() {
  const sitemapPath = './dist/sitemap-0.xml';
  try {
    const sitemap = readFileSync(sitemapPath, 'utf-8');
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    return urls;
  } catch {
    console.error('Sitemap not found at', sitemapPath);
    return [];
  }
}

function getChangedUrls() {
  try {
    // Get blog files changed in the last commit
    const diff = execSync('git diff --name-only HEAD~1 HEAD -- src/content/blog/', { encoding: 'utf-8' });
    const files = diff.trim().split('\n').filter(f => f && /\.mdx?$/.test(f));

    return files.map(file => {
      // The URL is the `slug` frontmatter field, NOT the filename. Files carry a
      // day-number prefix (e.g. 23-kindle-vs-kobo.md) but the URL is /kindle-vs-kobo/.
      let slug;
      try {
        const content = readFileSync(file, 'utf-8');
        slug = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1];
      } catch {
        // File was deleted in this commit; fall through to the filename fallback.
      }
      if (!slug) {
        // Fallback: filename without extension and without the day-number prefix.
        const base = file.match(/([^/]+)\.mdx?$/)?.[1];
        slug = base ? base.replace(/^\d+-/, '') : null;
      }
      return slug ? `${SITE_URL}/${slug}/` : null;
    }).filter(Boolean);
  } catch {
    console.log('Could not determine changed files, submitting all URLs.');
    return null;
  }
}

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  // IndexNow batch API (max 10,000 URLs per request)
  const payload = {
    host: 'boredom-at-work.com',
    key: INDEX_NOW_KEY,
    keyLocation: `${SITE_URL}/${INDEX_NOW_KEY}.txt`,
    urlList: urls.slice(0, 10000)
  };

  console.log(`Submitting ${payload.urlList.length} URLs to IndexNow...`);

  try {
    const response = await fetch(INDEX_NOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`IndexNow: ${response.status} — URLs submitted successfully.`);
    } else {
      const text = await response.text();
      console.error(`IndexNow: ${response.status} — ${text}`);
    }
  } catch (err) {
    console.error('IndexNow submission failed:', err.message);
  }
}

// Main
const useChanged = process.argv.includes('--changed');

let urls;
if (useChanged) {
  urls = getChangedUrls();
  if (urls === null) {
    // Fallback to sitemap
    urls = await getUrlsFromSitemap();
  }
} else {
  urls = await getUrlsFromSitemap();
}

console.log(`Found ${urls.length} URLs.`);
if (urls.length > 0) {
  console.log('Sample:', urls.slice(0, 5).join('\n  '));
}

await submitToIndexNow(urls);
