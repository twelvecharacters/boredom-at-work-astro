#!/usr/bin/env node
/**
 * GSC Traffic Report — boredom-at-work.com
 *
 * Usage:
 *   node scripts/gsc-traffic.js                  # last 28 days vs previous 28
 *   node scripts/gsc-traffic.js --days 7         # last 7 days vs previous 7
 *   node scripts/gsc-traffic.js --top 20         # show top 20 (default 15)
 *   node scripts/gsc-traffic.js --queries        # show queries instead of pages
 *   node scripts/gsc-traffic.js --cluster        # group by content cluster
 *
 * Requires: ~/.claude/gsc-credentials.json (Service Account Key)
 * Setup: GSC API enabled + Service Account added as user in GSC
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// --- Config ---
const SITE_URL = 'https://boredom-at-work.com';
const CREDENTIALS_PATH = path.join(process.env.HOME, '.claude', 'gsc-credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

// --- Cluster mapping ---
const CLUSTERS = {
  'AI/Productivity': ['/ai-tools', '/chatgpt', '/claude', '/copilot', '/gemini', '/perplexity', '/ai-meeting', '/ai-email', '/ai-pdf', '/ai-writing', '/ai-presentation', '/ai-chrome', '/prompt-engineering', '/learn-ai', '/ai-skills', '/ai-certifications', '/ai-courses', '/notion-ai', '/best-ai', '/how-to-use-ai', '/ai-planned', '/microsoft-copilot'],
  'AI/Travel': ['/ai-travel', '/chatgpt-trip', '/chatgpt-travel', '/chatgpt-malaysia', '/claude-planned', '/ai-trip', '/gemini-travel', '/perplexity-travel', '/ai-packing', '/free-ai-travel', '/claude-vs-chatgpt-travel', '/ai-planning-southeast', '/japan-vietnam-cambodia'],
  '3D Printing': ['/3d-print', '/bambu', '/anycubic', '/cura-', '/pla-vs', '/fdm-vs', '/cad-software', '/openscad', '/selling-3d', '/what-to-3d', '/is-3d', '/clawdbot', '/sesame-robot', '/orcaslicer', '/10-practical-desk-upgrades-3d'],
  'Photography': ['/camera', '/photo', '/dslr', '/canon-r100', '/nikon', '/olympus', '/rapid-raw', '/cheap-manual-lenses'],
  'Home Office': ['/desk-', '/standing-desk', '/office-chair', '/monitor-arm', '/monitor-light', '/cable-management', '/ergonomic-mice', '/webcam', '/headphone', '/laptop-stand', '/footrest', '/dual-monitor', '/usb-c-dock', '/home-office', '/secretlab', '/ultrawide', '/best-monitors-working'],
  'Finance': ['/invest', '/stock', '/paper-trading', '/crypto', '/dividend', '/finance-sub', '/prediction-market', '/polymarket', '/kalshi', '/chatgpt-stock', '/ai-portfolio', '/ai-earnings', '/ai-vs-traditional-stock'],
  'Kindle/E-Reader': ['/kindle', '/kobo', '/e-reader', '/best-e-readers', '/free-books-kindle'],
  'Tech & Gadgets': ['/airpods', '/ray-ban', '/pixel-10a', '/samsung-s26', '/best-tech-gifts', '/best-mechanical-keyboard', '/best-free-macos', '/macos-tahoe', '/pearcleaner', '/rfid-record', '/trmnl', '/gemini-cli', '/how-gemini'],
  'Japan Shopping': ['/buyee', '/sendico', '/best-japanese-products', '/how-to-buy-from-japan'],
};

function getCluster(url) {
  const slug = url.replace(SITE_URL, '');
  for (const [cluster, patterns] of Object.entries(CLUSTERS)) {
    if (patterns.some(p => slug.includes(p))) return cluster;
  }
  return 'Other';
}

// --- JWT Auth ---
function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJWT(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: credentials.client_email,
    scope: SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const segments = [
    base64url(Buffer.from(JSON.stringify(header))),
    base64url(Buffer.from(JSON.stringify(payload))),
  ];

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(segments.join('.'));
  const signature = sign.sign(credentials.private_key);

  return segments.join('.') + '.' + base64url(signature);
}

function getAccessToken(credentials) {
  return new Promise((resolve, reject) => {
    const jwt = createJWT(credentials);
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.access_token) resolve(parsed.access_token);
        else reject(new Error('Auth failed: ' + data));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// --- GSC API ---
function queryGSC(token, startDate, endDate, dimension) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      startDate,
      endDate,
      dimensions: [dimension],
      rowLimit: 5000,
      dataState: 'all',
    });

    const siteEncoded = encodeURIComponent(SITE_URL);
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/webmasters/v3/sites/${siteEncoded}/searchAnalytics/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.error) reject(new Error(parsed.error.message));
        else resolve(parsed.rows || []);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// --- Helpers ---
function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function pct(a, b) {
  if (b === 0) return a > 0 ? '+∞' : '0%';
  const v = ((a - b) / b * 100);
  return (v >= 0 ? '+' : '') + v.toFixed(0) + '%';
}

function padR(s, n) { return String(s).slice(0, n).padEnd(n); }
function padL(s, n) { return String(s).slice(0, n).padStart(n); }

const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function colorPct(s) {
  if (s.startsWith('+') && s !== '+0%') return GREEN + s + RESET;
  if (s.startsWith('-')) return RED + s + RESET;
  return DIM + s + RESET;
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2);
  const days = parseInt(args.find((_, i, a) => a[i - 1] === '--days') || '28');
  const top = parseInt(args.find((_, i, a) => a[i - 1] === '--top') || '15');
  const showQueries = args.includes('--queries');
  const showCluster = args.includes('--cluster');

  // Check credentials
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`\n${RED}Error: Credentials not found at ${CREDENTIALS_PATH}${RESET}`);
    console.error(`\nSetup steps:`);
    console.error(`  1. Create a Google Cloud project`);
    console.error(`  2. Enable "Google Search Console API"`);
    console.error(`  3. Create a Service Account + download JSON key`);
    console.error(`  4. Save it as ${CREDENTIALS_PATH}`);
    console.error(`  5. Add the service account email as a user in GSC\n`);
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

  // Date ranges
  const now = new Date();
  const currentEnd = new Date(now); currentEnd.setDate(currentEnd.getDate() - 1); // yesterday
  const currentStart = new Date(currentEnd); currentStart.setDate(currentStart.getDate() - days + 1);
  const prevEnd = new Date(currentStart); prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd); prevEnd.setDate(prevEnd.getDate()); prevStart.setDate(prevEnd.getDate() - days + 1);

  const curStartStr = formatDate(currentStart);
  const curEndStr = formatDate(currentEnd);
  const prevStartStr = formatDate(prevStart);
  const prevEndStr = formatDate(prevEnd);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${BOLD}GSC TRAFFIC REPORT — boredom-at-work.com${RESET}`);
  console.log(`  Current: ${curStartStr} → ${curEndStr}  (${days} days)`);
  console.log(`  Previous: ${prevStartStr} → ${prevEndStr}`);
  console.log(`${'═'.repeat(70)}\n`);

  // Auth
  process.stdout.write(`  Authenticating... `);
  const token = await getAccessToken(credentials);
  console.log(`${GREEN}OK${RESET}\n`);

  // Fetch data
  const dimension = showQueries ? 'query' : 'page';
  process.stdout.write(`  Fetching ${dimension} data... `);
  const [curRows, prevRows] = await Promise.all([
    queryGSC(token, curStartStr, curEndStr, dimension),
    queryGSC(token, prevStartStr, prevEndStr, dimension),
  ]);
  console.log(`${GREEN}OK${RESET} (${curRows.length} current, ${prevRows.length} previous)\n`);

  // Build maps
  const curMap = new Map();
  const prevMap = new Map();
  for (const r of curRows) curMap.set(r.keys[0], r);
  for (const r of prevRows) prevMap.set(r.keys[0], r);

  // Totals
  const curTotal = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const prevTotal = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  for (const r of curRows) { curTotal.clicks += r.clicks; curTotal.impressions += r.impressions; }
  for (const r of prevRows) { prevTotal.clicks += r.clicks; prevTotal.impressions += r.impressions; }
  curTotal.ctr = curTotal.impressions > 0 ? curTotal.clicks / curTotal.impressions : 0;
  prevTotal.ctr = prevTotal.impressions > 0 ? prevTotal.clicks / prevTotal.impressions : 0;

  // Summary
  console.log(`${BOLD}📊 TOTALS${RESET}`);
  console.log(`   Clicks:      ${padL(curTotal.clicks, 6)}  ${colorPct(pct(curTotal.clicks, prevTotal.clicks))}`);
  console.log(`   Impressions: ${padL(curTotal.impressions, 6)}  ${colorPct(pct(curTotal.impressions, prevTotal.impressions))}`);
  console.log(`   CTR:         ${padL((curTotal.ctr * 100).toFixed(1) + '%', 6)}  ${colorPct(pct(curTotal.ctr, prevTotal.ctr))}`);
  console.log('');

  // Cluster view
  if (showCluster) {
    const clusterData = {};
    for (const r of curRows) {
      const c = getCluster(r.keys[0]);
      if (!clusterData[c]) clusterData[c] = { clicks: 0, impressions: 0, prevClicks: 0, prevImpressions: 0 };
      clusterData[c].clicks += r.clicks;
      clusterData[c].impressions += r.impressions;
    }
    for (const r of prevRows) {
      const c = getCluster(r.keys[0]);
      if (!clusterData[c]) clusterData[c] = { clicks: 0, impressions: 0, prevClicks: 0, prevImpressions: 0 };
      clusterData[c].prevClicks += r.clicks;
      clusterData[c].prevImpressions += r.impressions;
    }

    const clusterSorted = Object.entries(clusterData).sort((a, b) => b[1].clicks - a[1].clicks);
    console.log(`${BOLD}📁 BY CLUSTER${RESET}`);
    console.log(`   ${padR('Cluster', 20)} ${padL('Clicks', 8)} ${padL('Δ', 8)} ${padL('Impr', 8)} ${padL('Δ', 8)}`);
    console.log(`   ${'─'.repeat(56)}`);
    for (const [name, d] of clusterSorted) {
      console.log(`   ${padR(name, 20)} ${padL(d.clicks, 8)} ${padL(colorPct(pct(d.clicks, d.prevClicks)), 18)} ${padL(d.impressions, 8)} ${padL(colorPct(pct(d.impressions, d.prevImpressions)), 18)}`);
    }
    console.log('');
  }

  // Top pages/queries
  const label = showQueries ? 'QUERIES' : 'PAGES';
  const sorted = [...curMap.entries()]
    .sort((a, b) => b[1].clicks - a[1].clicks)
    .slice(0, top);

  console.log(`${BOLD}🔝 TOP ${top} ${label} (by clicks)${RESET}`);
  console.log(`   ${padR(showQueries ? 'Query' : 'Page', 45)} ${padL('Clicks', 7)} ${padL('Δ', 7)} ${padL('Impr', 7)} ${padL('CTR', 6)} ${padL('Pos', 5)}`);
  console.log(`   ${'─'.repeat(80)}`);

  for (const [key, cur] of sorted) {
    const prev = prevMap.get(key);
    const prevClicks = prev ? prev.clicks : 0;
    const display = showQueries ? key : key.replace(SITE_URL, '').replace(/\/$/, '') || '/';
    const ctr = cur.impressions > 0 ? (cur.clicks / cur.impressions * 100).toFixed(1) + '%' : '0%';
    const pos = cur.position.toFixed(1);

    console.log(`   ${padR(display, 45)} ${padL(cur.clicks, 7)} ${padL(colorPct(pct(cur.clicks, prevClicks)), 17)} ${padL(cur.impressions, 7)} ${padL(ctr, 6)} ${padL(pos, 5)}`);
  }
  console.log('');

  // Biggest movers (clicks gained/lost)
  const allKeys = new Set([...curMap.keys(), ...prevMap.keys()]);
  const movers = [];
  for (const key of allKeys) {
    const cur = curMap.get(key);
    const prev = prevMap.get(key);
    const curClicks = cur ? cur.clicks : 0;
    const prevClicks = prev ? prev.clicks : 0;
    const delta = curClicks - prevClicks;
    if (delta !== 0) movers.push({ key, curClicks, prevClicks, delta });
  }
  movers.sort((a, b) => b.delta - a.delta);

  const gainers = movers.filter(m => m.delta > 0).slice(0, 5);
  const losers = movers.filter(m => m.delta < 0).slice(-5).reverse();

  if (gainers.length > 0) {
    console.log(`${BOLD}📈 BIGGEST GAINERS${RESET}`);
    for (const m of gainers) {
      const display = showQueries ? m.key : m.key.replace(SITE_URL, '').replace(/\/$/, '') || '/';
      console.log(`   ${GREEN}+${m.delta}${RESET}  ${padR(display, 50)} (${m.prevClicks} → ${m.curClicks})`);
    }
    console.log('');
  }

  if (losers.length > 0) {
    console.log(`${BOLD}📉 BIGGEST LOSERS${RESET}`);
    for (const m of losers) {
      const display = showQueries ? m.key : m.key.replace(SITE_URL, '').replace(/\/$/, '') || '/';
      console.log(`   ${RED}${m.delta}${RESET}  ${padR(display, 50)} (${m.prevClicks} → ${m.curClicks})`);
    }
    console.log('');
  }

  // Low-hanging fruit: high impressions, low CTR, improvable position
  if (!showQueries && !showCluster) {
    const opportunities = [...curMap.entries()]
      .filter(([_, r]) => r.impressions >= 20 && r.clicks / r.impressions < 0.03 && r.position <= 20)
      .sort((a, b) => b[1].impressions - a[1].impressions)
      .slice(0, 10);

    if (opportunities.length > 0) {
      console.log(`${BOLD}💡 LOW-HANGING FRUIT${RESET} ${DIM}(high impressions, low CTR, position ≤20)${RESET}`);
      console.log(`   ${padR('Page', 45)} ${padL('Impr', 7)} ${padL('Clicks', 7)} ${padL('CTR', 6)} ${padL('Pos', 5)}`);
      console.log(`   ${'─'.repeat(73)}`);
      for (const [key, r] of opportunities) {
        const display = key.replace(SITE_URL, '').replace(/\/$/, '') || '/';
        const ctr = (r.clicks / r.impressions * 100).toFixed(1) + '%';
        console.log(`   ${YELLOW}${padR(display, 45)}${RESET} ${padL(r.impressions, 7)} ${padL(r.clicks, 7)} ${padL(ctr, 6)} ${padL(r.position.toFixed(1), 5)}`);
      }
      console.log(`   ${DIM}→ Optimize title/description for these pages to improve CTR${RESET}`);
      console.log('');
    }
  }
}

main().catch(err => {
  console.error(`\n${RED}Error: ${err.message}${RESET}\n`);
  process.exit(1);
});
