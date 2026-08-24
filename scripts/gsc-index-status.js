#!/usr/bin/env node
/**
 * GSC Index Status — boredom-at-work.com
 *
 * Reads the real index status of every published article via the Search
 * Console URL Inspection API, and prints the URLs worth submitting manually
 * next. Read-only: Google has no API to request indexing for regular pages
 * (the Indexing API is JobPosting/BroadcastEvent only), so submission stays
 * a manual step in the Search Console UI.
 *
 * Usage:
 *   node scripts/gsc-index-status.js                # full scan + submit list
 *   node scripts/gsc-index-status.js --top 10       # size of the submit list
 *   node scripts/gsc-index-status.js --orphans      # list the unlinked pages
 *   node scripts/gsc-index-status.js <slug> [...]   # check specific slugs
 *
 * Requires: ~/.claude/gsc-credentials.json (service account, Owner on the
 * property, otherwise the inspection endpoint returns 403).
 */

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { readAllPosts, isPublished } from './lib/read-posts.mjs';

// The property string must match Search Console exactly, trailing slash included.
const SITE_URL = 'https://boredom-at-work.com/';
const CRED_PATH = path.join(process.env.HOME || '', '.claude', 'gsc-credentials.json');
const CONCURRENCY = 8;

// Clusters we care about most, highest first. Drives the submit ranking.
const CLUSTER_PRIORITY = [
  [/^(kindle|best-kindle|install-koreader|sideload-books|free-books-kindle|is-kindle|best-e-readers)/, 3, 'Kindle'],
  [/^(chatgpt|claude|gemini|perplexity|ai-|best-ai|learn-ai|free-vs-paid-ai)/, 2, 'AI'],
  [/3d-print|bambu|anycubic|filament|cura|orcaslicer/, 2, '3D'],
  [/^(best-|.*-vs-.*)/, 1, 'Buyer intent'],
];

function clusterOf(slug) {
  for (const [re, weight, label] of CLUSTER_PRIORITY) if (re.test(slug)) return { weight, label };
  return { weight: 0, label: 'Other' };
}

const b64url = (input) => Buffer.from(typeof input === 'string' ? input : JSON.stringify(input))
  .toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

function createJWT(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: 'RS256', typ: 'JWT' });
  const claim = b64url({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(credentials.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${header}.${claim}.${signature}`;
}

function request(method, hostname, urlPath, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const req = https.request({
      hostname,
      path: urlPath,
      method,
      headers: { ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}), ...headers },
    }, (res) => {
      let out = '';
      res.on('data', (chunk) => (out += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, json: JSON.parse(out) }); }
        catch { resolve({ status: res.statusCode, json: { raw: out } }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function getAccessToken() {
  if (!fs.existsSync(CRED_PATH)) {
    console.error(`Keine Credentials unter ${CRED_PATH}`);
    process.exit(1);
  }
  const credentials = JSON.parse(fs.readFileSync(CRED_PATH, 'utf8'));
  const res = await request('POST', 'oauth2.googleapis.com', '/token',
    `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${createJWT(credentials)}`,
    { 'Content-Type': 'application/x-www-form-urlencoded' });
  if (!res.json.access_token) {
    console.error('Auth fehlgeschlagen:', JSON.stringify(res.json).slice(0, 300));
    process.exit(1);
  }
  return res.json.access_token;
}

async function inspect(token, url) {
  const res = await request('POST', 'searchconsole.googleapis.com', '/v1/urlInspection/index:inspect',
    { inspectionUrl: url, siteUrl: SITE_URL },
    { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });
  if (res.status !== 200) {
    return { url, error: `HTTP ${res.status} ${res.json?.error?.message || ''}`.trim() };
  }
  const r = res.json.inspectionResult?.indexStatusResult || {};
  return {
    url,
    verdict: r.verdict || 'UNKNOWN',
    coverage: r.coverageState || 'unknown',
    lastCrawl: r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : null,
  };
}

/** Inbound editorial links per slug, counted only from published posts. */
function inboundCounts(published) {
  const slugs = new Set(published.map((p) => p.slug));
  const counts = new Map([...slugs].map((s) => [s, 0]));
  for (const post of published) {
    const body = fs.readFileSync(post.file, 'utf8');
    const seen = new Set();
    for (const m of body.matchAll(/\]\((\/[a-z0-9-]+\/)\)/gi)) {
      const target = m[1].replace(/\//g, '');
      if (target === post.slug || seen.has(target) || !counts.has(target)) continue;
      seen.add(target);
      counts.set(target, counts.get(target) + 1);
    }
  }
  return counts;
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }));
  return results;
}

// --- main ---
const args = process.argv.slice(2);
const topIdx = args.indexOf('--top');
const TOP = topIdx !== -1 ? parseInt(args[topIdx + 1], 10) || 10 : 10;
const SHOW_ORPHANS = args.includes('--orphans');
const explicit = args.filter((a) => !a.startsWith('--') && a !== String(TOP));

const token = await getAccessToken();
const published = readAllPosts().filter((p) => isPublished(p));
const inbound = inboundCounts(published);

const slugs = explicit.length ? explicit.map((s) => s.replace(/^\/|\/$/g, '')) : published.map((p) => p.slug);
process.stderr.write(`Pruefe ${slugs.length} URLs...\n`);

const results = await mapLimit(slugs, CONCURRENCY, (slug) => inspect(token, `${SITE_URL}${slug}/`));

const byState = new Map();
for (const r of results) {
  const key = r.error ? `ERROR: ${r.error}` : r.coverage;
  byState.set(key, (byState.get(key) || 0) + 1);
}

console.log('\nINDEXSTATUS');
console.log('-'.repeat(72));
for (const [state, count] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(4)}  ${state}`);
}

const notIndexed = results.filter((r) => !r.error && r.verdict !== 'PASS');

if (explicit.length) {
  console.log('\nDETAIL');
  console.log('-'.repeat(72));
  for (const r of results) {
    const slug = r.url.replace(SITE_URL, '').replace(/\/$/, '');
    console.log(`  ${slug.padEnd(44)} ${r.error || `${r.verdict.padEnd(8)} ${r.coverage}`}`);
  }
} else {
  // "Crawled - currently not indexed" means Google fetched the page and chose
  // not to index it. That verdict does not move by resubmitting, so those
  // pages are reported separately instead of competing for the daily quota.
  const rejected = notIndexed.filter((r) => /^Crawled/.test(r.coverage));
  const submittable = notIndexed.filter((r) => !/^Crawled/.test(r.coverage));

  const ranked = submittable
    .map((r) => {
      const slug = r.url.replace(SITE_URL, '').replace(/\/$/, '');
      const { weight, label } = clusterOf(slug);
      const links = inbound.get(slug) ?? 0;
      // Prefer pages that already have internal support: a crawl finds a
      // reason to keep them. Orphans get submitted after they are linked.
      return { slug, label, links, coverage: r.coverage, score: weight * 100 + Math.min(links, 25) };
    })
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));

  console.log(`\nNAECHSTE ${TOP} ZUM MANUELLEN EINREICHEN`);
  console.log('-'.repeat(72));
  ranked.slice(0, TOP).forEach((r, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. https://boredom-at-work.com/${r.slug}/`);
    console.log(`      ${r.label}, ${r.links} interne Links`);
  });

  if (rejected.length) {
    console.log(`\n  NICHT einreichen: ${rejected.length} Seiten sind gecrawlt und trotzdem`);
    console.log('  nicht indexiert. Das ist ein Qualitaets- oder Dubletten-Urteil und');
    console.log('  braucht inhaltliche Arbeit, kein weiteres Einreichen:');
    rejected
      .map((r) => r.url.replace(SITE_URL, '').replace(/\/$/, ''))
      .sort()
      .slice(0, 10)
      .forEach((slug) => console.log(`    /${slug}/`));
  }

  const orphaned = ranked.filter((r) => r.links === 0);
  if (orphaned.length) {
    console.log(`\n  ${orphaned.length} nicht indexierte Seiten haben 0 interne Links.`);
    console.log('  Die zuerst verlinken, sonst verpufft das Einreichen.');
    if (SHOW_ORPHANS) {
      // Grouped by cluster: linking works best from articles that already sit
      // in the same topic, so the cluster is the unit of work, not the URL.
      const byCluster = new Map();
      for (const r of orphaned) {
        if (!byCluster.has(r.label)) byCluster.set(r.label, []);
        byCluster.get(r.label).push(r.slug);
      }
      for (const [label, slugs] of [...byCluster.entries()].sort((a, b) => b[1].length - a[1].length)) {
        console.log(`\n    ${label} (${slugs.length})`);
        slugs.sort().forEach((slug) => console.log(`      /${slug}/`));
      }
    } else {
      console.log('  Namentlich auflisten mit: --orphans');
    }
  }
  console.log('\n  Einreichen: Search Console, URL oben einfuegen, "Indexierung beantragen".');
  console.log('  Kontingent rund 10 bis 12 URLs pro Tag, rollierend ueber 24 Stunden.');
}
