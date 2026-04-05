#!/usr/bin/env node
/**
 * Bing Webmaster Tools Traffic Report — boredom-at-work.com
 *
 * Usage:
 *   node scripts/bing-traffic.js                  # page stats
 *   node scripts/bing-traffic.js --queries        # query stats
 *
 * Requires: ~/.claude/bing-api-key.txt
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

// --- Config ---
const SITE_URL = 'https://boredom-at-work.com/';
const KEY_PATH = path.join(process.env.HOME, '.claude', 'bing-api-key.txt');

const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function padR(s, n) { return String(s).slice(0, n).padEnd(n); }
function padL(s, n) { return String(s).slice(0, n).padStart(n); }

function pct(a, b) {
  if (b === 0) return a > 0 ? '+∞' : '0%';
  const v = ((a - b) / b * 100);
  return (v >= 0 ? '+' : '') + v.toFixed(0) + '%';
}

function colorPct(s) {
  if (s.startsWith('+') && s !== '+0%') return GREEN + s + RESET;
  if (s.startsWith('-')) return RED + s + RESET;
  return DIM + s + RESET;
}

// --- Bing API ---
function bingGet(apiPath, apiKey) {
  return new Promise((resolve, reject) => {
    const url = `https://ssl.bing.com/webmaster/api.svc/json/${apiPath}?apikey=${apiKey}&siteUrl=${encodeURIComponent(SITE_URL)}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.ErrorCode) reject(new Error(parsed.Message || `Error ${parsed.ErrorCode}`));
          else resolve(parsed.d || parsed);
        } catch (e) {
          reject(new Error(`Parse error: ${data.slice(0, 200)}`));
        }
      });
    }).on('error', reject);
  });
}

function bingGetStats(endpoint, apiKey) {
  return bingGet(endpoint, apiKey);
}

// --- Cluster mapping (same as GSC) ---
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
  for (const [cluster, patterns] of Object.entries(CLUSTERS)) {
    if (patterns.some(p => url.includes(p))) return cluster;
  }
  return 'Other';
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2);
  const showQueries = args.includes('--queries');
  const showCluster = args.includes('--cluster');
  const top = parseInt(args.find((_, i, a) => a[i - 1] === '--top') || '20');

  if (!fs.existsSync(KEY_PATH)) {
    console.error(`\n${RED}Error: API key not found at ${KEY_PATH}${RESET}`);
    console.error(`\nSetup: Bing Webmaster Tools → Settings → API Access → copy key`);
    console.error(`Then: echo "YOUR_KEY" > ${KEY_PATH}\n`);
    process.exit(1);
  }

  const apiKey = fs.readFileSync(KEY_PATH, 'utf8').trim();

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${BOLD}BING TRAFFIC REPORT — boredom-at-work.com${RESET}`);
  console.log(`${'═'.repeat(70)}\n`);

  // Fetch stats
  const endpoint = showQueries ? 'GetQueryStats' : 'GetPageStats';
  process.stdout.write(`  Fetching ${showQueries ? 'query' : 'page'} stats... `);

  let rows;
  try {
    rows = await bingGetStats(endpoint, apiKey);
  } catch (err) {
    console.error(`${RED}FAILED${RESET}`);
    console.error(`\n${RED}Error: ${err.message}${RESET}\n`);
    process.exit(1);
  }

  if (!Array.isArray(rows)) {
    console.error(`${RED}Unexpected response format${RESET}`);
    console.log(JSON.stringify(rows, null, 2));
    process.exit(1);
  }

  console.log(`${GREEN}OK${RESET} (${rows.length} entries)\n`);

  if (rows.length === 0) {
    console.log(`  ${DIM}No data available yet.${RESET}\n`);
    process.exit(0);
  }

  // Parse dates and split into periods (last 28 days vs previous 28)
  const now = new Date();
  const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 28);
  const prevCutoff = new Date(cutoff); prevCutoff.setDate(prevCutoff.getDate() - 28);

  // Aggregate by page/query
  const currentMap = new Map();
  const prevMap = new Map();

  for (const row of rows) {
    const dateMatch = row.Date ? row.Date.match(/\/Date\((-?\d+)/) : null;
    const date = dateMatch ? new Date(parseInt(dateMatch[1])) : null;
    const key = row.Query || row.Url || row.Page || 'unknown';
    const clicks = row.Clicks || 0;
    const impressions = row.Impressions || 0;
    const position = row.AvgClickPosition || row.Position || 0;

    const target = (date && date >= cutoff) ? currentMap : (date && date >= prevCutoff) ? prevMap : null;
    if (!target) continue;

    if (!target.has(key)) target.set(key, { clicks: 0, impressions: 0, posSum: 0, count: 0 });
    const entry = target.get(key);
    entry.clicks += clicks;
    entry.impressions += impressions;
    entry.posSum += position;
    entry.count += 1;
  }

  // Totals
  let curClicks = 0, curImpr = 0, prevClicks = 0, prevImpr = 0;
  for (const v of currentMap.values()) { curClicks += v.clicks; curImpr += v.impressions; }
  for (const v of prevMap.values()) { prevClicks += v.clicks; prevImpr += v.impressions; }
  const curCTR = curImpr > 0 ? curClicks / curImpr : 0;
  const prevCTR = prevImpr > 0 ? prevClicks / prevImpr : 0;

  console.log(`${BOLD}📊 TOTALS (last 28 days)${RESET}`);
  console.log(`   Clicks:      ${padL(curClicks, 6)}  ${colorPct(pct(curClicks, prevClicks))}`);
  console.log(`   Impressions: ${padL(curImpr, 6)}  ${colorPct(pct(curImpr, prevImpr))}`);
  console.log(`   CTR:         ${padL((curCTR * 100).toFixed(1) + '%', 6)}  ${colorPct(pct(curCTR, prevCTR))}`);
  console.log('');

  // Cluster view
  if (showCluster && !showQueries) {
    const clusterData = {};
    for (const [key, v] of currentMap) {
      const c = getCluster(key);
      if (!clusterData[c]) clusterData[c] = { clicks: 0, impressions: 0, prevClicks: 0, prevImpressions: 0 };
      clusterData[c].clicks += v.clicks;
      clusterData[c].impressions += v.impressions;
    }
    for (const [key, v] of prevMap) {
      const c = getCluster(key);
      if (!clusterData[c]) clusterData[c] = { clicks: 0, impressions: 0, prevClicks: 0, prevImpressions: 0 };
      clusterData[c].prevClicks += v.clicks;
      clusterData[c].prevImpressions += v.impressions;
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
  const sorted = [...currentMap.entries()]
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .slice(0, top);

  console.log(`${BOLD}🔝 TOP ${top} ${label} (by impressions)${RESET}`);
  console.log(`   ${padR(showQueries ? 'Query' : 'Page', 50)} ${padL('Impr', 7)} ${padL('Clicks', 7)} ${padL('CTR', 6)} ${padL('Pos', 5)}`);
  console.log(`   ${'─'.repeat(78)}`);

  for (const [key, v] of sorted) {
    const display = showQueries ? key : key.replace('https://boredom-at-work.com', '').replace(/\/$/, '') || '/';
    const ctr = v.impressions > 0 ? (v.clicks / v.impressions * 100).toFixed(1) + '%' : '0%';
    const avgPos = v.count > 0 ? (v.posSum / v.count).toFixed(1) : '-';
    console.log(`   ${padR(display, 50)} ${padL(v.impressions, 7)} ${padL(v.clicks, 7)} ${padL(ctr, 6)} ${padL(avgPos, 5)}`);
  }
  console.log('');

  // Gainers / Losers
  const allKeys = new Set([...currentMap.keys(), ...prevMap.keys()]);
  const movers = [];
  for (const key of allKeys) {
    const cur = currentMap.get(key);
    const prev = prevMap.get(key);
    const curC = cur ? cur.clicks : 0;
    const prevC = prev ? prev.clicks : 0;
    if (curC - prevC !== 0) movers.push({ key, curC, prevC, delta: curC - prevC });
  }
  movers.sort((a, b) => b.delta - a.delta);

  const gainers = movers.filter(m => m.delta > 0).slice(0, 5);
  const losers = movers.filter(m => m.delta < 0).slice(-5).reverse();

  if (gainers.length > 0) {
    console.log(`${BOLD}📈 BIGGEST GAINERS${RESET}`);
    for (const m of gainers) {
      const display = showQueries ? m.key : m.key.replace('https://boredom-at-work.com', '').replace(/\/$/, '') || '/';
      console.log(`   ${GREEN}+${m.delta}${RESET}  ${padR(display, 50)} (${m.prevC} → ${m.curC})`);
    }
    console.log('');
  }

  if (losers.length > 0) {
    console.log(`${BOLD}📉 BIGGEST LOSERS${RESET}`);
    for (const m of losers) {
      const display = showQueries ? m.key : m.key.replace('https://boredom-at-work.com', '').replace(/\/$/, '') || '/';
      console.log(`   ${RED}${m.delta}${RESET}  ${padR(display, 50)} (${m.prevC} → ${m.curC})`);
    }
    console.log('');
  }
}

main().catch(err => {
  console.error(`\n${RED}Error: ${err.message}${RESET}\n`);
  process.exit(1);
});
