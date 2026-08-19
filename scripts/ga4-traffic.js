#!/usr/bin/env node

/**
 * GA4 Traffic & User Event Intelligence Report
 *
 * Reads traffic, user behavior, pageviews, sources, devices, and custom events
 * (affiliate clicks, outbound links, pillar clicks, code copy, reading completion)
 * directly from the Google Analytics 4 Data API.
 *
 * Usage:
 *   node scripts/ga4-traffic.js                      # Full comprehensive intelligence report
 *   node scripts/ga4-traffic.js --pages              # Top visited pages & average engagement time
 *   node scripts/ga4-traffic.js --sources            # Traffic sources & mediums
 *   node scripts/ga4-traffic.js --outbound           # Outbound & partner link clicks
 *   node scripts/ga4-traffic.js --devices            # Device categories & countries
 *   node scripts/ga4-traffic.js --days 14            # Specific date range (default 28)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// --- Config ---
const GLOBAL_CREDENTIALS_PATH = path.join(process.env.HOME || '', '.claude', 'gsc-credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

// ANSI Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const BLUE = '\x1b[34m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function padR(s, n) { return String(s || '').slice(0, n).padEnd(n); }
function padL(s, n) { return String(s || '').slice(0, n).padStart(n); }

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDuration(seconds) {
  const s = Math.round(Number(seconds) || 0);
  const m = Math.floor(s / 60);
  const remSec = s % 60;
  return `${m}m ${remSec < 10 ? '0' : ''}${remSec}s`;
}

// --- JWT Auth for Service Account ---
function getAccessToken(credentials) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: credentials.client_email,
      scope: SCOPES.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
    const b64Claim = Buffer.from(JSON.stringify(claimSet)).toString('base64url');
    const signInput = `${b64Header}.${b64Claim}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signInput);
    const signature = signer.sign(credentials.private_key, 'base64url');
    const jwt = `${signInput}.${signature}`;

    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error(parsed.error_description || parsed.error || 'Token fetch failed'));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// --- GA4 Data API Query ---
function runGA4Report(token, propertyId, bodyPayload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(bodyPayload);
    const req = https.request({
      hostname: 'analyticsdata.googleapis.com',
      path: `/v1beta/properties/${propertyId}:runReport`,
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
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// --- Helper to load config & credentials ---
function loadConfig() {
  let credentials = null;
  let propertyId = process.env.GA4_PROPERTY_ID || null;

  // 1. Direct env
  if (process.env.GSC_CREDENTIALS_BASE64) {
    try {
      credentials = JSON.parse(Buffer.from(process.env.GSC_CREDENTIALS_BASE64, 'base64').toString('utf8'));
    } catch (e) {}
  } else if (process.env.GSC_CREDENTIALS_JSON) {
    try {
      credentials = JSON.parse(process.env.GSC_CREDENTIALS_JSON);
    } catch (e) {}
  }

  // 2. .env file
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');

    if (!credentials) {
      const b64Match = envContent.match(/GSC_CREDENTIALS_BASE64=(['"]?)([A-Za-z0-9+/=]+)\1/);
      if (b64Match && b64Match[2]) {
        try {
          credentials = JSON.parse(Buffer.from(b64Match[2].trim(), 'base64').toString('utf8'));
        } catch (e) {}
      }
    }

    if (!propertyId) {
      const propMatch = envContent.match(/GA4_PROPERTY_ID=(['"]?)([0-9]+)\1/);
      if (propMatch && propMatch[2]) {
        propertyId = propMatch[2].trim();
      }
    }
  }

  // 3. Global fallback
  if (!credentials && fs.existsSync(GLOBAL_CREDENTIALS_PATH)) {
    try {
      credentials = JSON.parse(fs.readFileSync(GLOBAL_CREDENTIALS_PATH, 'utf8'));
    } catch (e) {}
  }

  return { credentials, propertyId };
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2);
  const days = parseInt(args.find((_, i, a) => a[i - 1] === '--days') || '28');
  const showOnlyPages = args.includes('--pages');
  const showOnlySources = args.includes('--sources');
  const showOnlyOutbound = args.includes('--outbound');
  const showOnlyDevices = args.includes('--devices');
  const isFiltered = showOnlyPages || showOnlySources || showOnlyOutbound || showOnlyDevices;

  const { credentials, propertyId } = loadConfig();

  if (!credentials) {
    console.error(`\n${RED}Error: Service Account credentials not found in .env or at ${GLOBAL_CREDENTIALS_PATH}${RESET}\n`);
    process.exit(1);
  }

  if (!propertyId) {
    console.log(`\n${YELLOW}ℹ️ GA4_PROPERTY_ID is missing in your .env file!${RESET}`);
    console.log(`\nSetup steps:`);
    console.log(`  1. Open Google Analytics (analytics.google.com)`);
    console.log(`  2. Go to Admin ➔ Property Settings ➔ Property Details`);
    console.log(`  3. Copy your numeric "PROPERTY ID" (e.g. 123456789)`);
    console.log(`  4. Add it to .env:  ${BOLD}GA4_PROPERTY_ID=123456789${RESET}`);
    console.log(`  5. Grant viewer access to: ${CYAN}${credentials.client_email}${RESET}\n`);
    process.exit(0);
  }

  const now = new Date();
  const endDate = new Date(now); endDate.setDate(endDate.getDate() - 1);
  const startDate = new Date(endDate); startDate.setDate(startDate.getDate() - days + 1);

  const startStr = formatDate(startDate);
  const endStr = formatDate(endDate);

  console.log(`\n${'═'.repeat(80)}`);
  console.log(`  ${BOLD}GA4 USER INTELLIGENCE & EVENT REPORT — boredom-at-work.com${RESET}`);
  console.log(`  Property: ${propertyId} | Range: ${startStr} → ${endStr} (${days} days)`);
  console.log(`${'═'.repeat(80)}\n`);

  process.stdout.write(`  Authenticating with GA4 Data API... `);
  const token = await getAccessToken(credentials);
  console.log(`${GREEN}OK${RESET}\n`);

  // 1. Overall Traffic Summary
  if (!isFiltered) {
    try {
      const summaryReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ]
      });

      const row = summaryReport.rows?.[0]?.metricValues || [];
      if (row.length >= 6) {
        const totalUsers = parseInt(row[0].value, 10);
        const newUsers = parseInt(row[1].value, 10);
        const sessions = parseInt(row[2].value, 10);
        const pageviews = parseInt(row[3].value, 10);
        const avgDuration = parseFloat(row[4].value);
        const bounceRate = (parseFloat(row[5].value) * 100).toFixed(1);

        console.log(`${BOLD}📈 CORE PERFORMANCE METRICS${RESET}`);
        console.log(`   ${padR('Total Users:', 22)} ${BOLD}${GREEN}${totalUsers.toLocaleString()}${RESET} (${newUsers.toLocaleString()} new)`);
        console.log(`   ${padR('Sessions:', 22)} ${sessions.toLocaleString()} (${(sessions / (totalUsers || 1)).toFixed(2)} sessions/user)`);
        console.log(`   ${padR('Pageviews:', 22)} ${pageviews.toLocaleString()} (${(pageviews / (sessions || 1)).toFixed(2)} views/session)`);
        console.log(`   ${padR('Avg Session Time:', 22)} ${formatDuration(avgDuration)}`);
        console.log(`   ${padR('Bounce Rate:', 22)} ${parseFloat(bounceRate) > 70 ? RED : GREEN}${bounceRate}%${RESET}`);
        console.log('');
      }
    } catch (e) {
      console.log(`${DIM}Failed to fetch traffic summary: ${e.message}${RESET}\n`);
    }
  }

  // 2. Events Breakdown
  if (!isFiltered) {
    try {
      const eventReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }]
      });

      const eventRows = eventReport.rows || [];
      console.log(`${BOLD}📊 ALL SITE EVENTS${RESET}`);
      console.log(`   ${padR('Event Name', 35)} ${padL('Count', 10)} ${padL('Users', 10)}`);
      console.log(`   ${'─'.repeat(58)}`);
      for (const r of eventRows) {
        const name = r.dimensionValues[0].value;
        const count = parseInt(r.metricValues[0].value, 10);
        const users = parseInt(r.metricValues[1].value, 10);
        const isCustom = ['affiliate_click', 'site_search', 'pillar_callout_click', 'copy_code_snippet', 'article_read_complete'].includes(name);
        const color = isCustom ? GREEN : RESET;
        console.log(`   ${color}${padR(name, 35)}${RESET} ${padL(count, 10)} ${padL(users, 10)}`);
      }
      console.log('');
    } catch (e) {}
  }

  // 3. Top Visited Pages & Engagement
  if (!isFiltered || showOnlyPages) {
    try {
      const pageReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 15
      });

      const pageRows = pageReport.rows || [];
      if (pageRows.length > 0) {
        console.log(`${BOLD}📄 TOP VISITED PAGES & ENGAGEMENT${RESET}`);
        console.log(`   ${padR('Page Path', 42)} ${padL('Views', 8)} ${padL('Users', 8)} ${padL('Avg Time', 10)} ${padL('Bounce', 8)}`);
        console.log(`   ${'─'.repeat(79)}`);
        for (const r of pageRows) {
          const pathName = r.dimensionValues[0].value;
          const views = parseInt(r.metricValues[0].value, 10);
          const users = parseInt(r.metricValues[1].value, 10);
          const durationTotal = parseFloat(r.metricValues[2].value);
          const avgTimeSec = users > 0 ? durationTotal / users : 0;
          const bounce = (parseFloat(r.metricValues[3].value) * 100).toFixed(0) + '%';
          console.log(`   ${CYAN}${padR(pathName, 42)}${RESET} ${padL(views, 8)} ${padL(users, 8)} ${padL(formatDuration(avgTimeSec), 10)} ${padL(bounce, 8)}`);
        }
        console.log('');
      }
    } catch (e) {
      console.log(`${DIM}Failed to fetch top pages: ${e.message}${RESET}\n`);
    }
  }

  // 4. Traffic Sources & Mediums
  if (!isFiltered || showOnlySources) {
    try {
      const sourceReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'sessionSourceMedium' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'bounceRate' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10
      });

      const srcRows = sourceReport.rows || [];
      if (srcRows.length > 0) {
        console.log(`${BOLD}🌐 TOP TRAFFIC CHANNELS / SOURCES${RESET}`);
        console.log(`   ${padR('Source / Medium', 40)} ${padL('Sessions', 10)} ${padL('Users', 10)} ${padL('Bounce', 8)}`);
        console.log(`   ${'─'.repeat(71)}`);
        for (const r of srcRows) {
          const src = r.dimensionValues[0].value;
          const sess = r.metricValues[0].value;
          const usrs = r.metricValues[1].value;
          const bnc = (parseFloat(r.metricValues[2].value) * 100).toFixed(0) + '%';
          console.log(`   ${YELLOW}${padR(src, 40)}${RESET} ${padL(sess, 10)} ${padL(usrs, 10)} ${padL(bnc, 8)}`);
        }
        console.log('');
      }
    } catch (e) {}
  }

  // 5. Device Categories & Countries
  if (!isFiltered || showOnlyDevices) {
    try {
      const devReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'totalUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }]
      });

      const countryReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 8
      });

      console.log(`${BOLD}📱 DEVICES & 🌍 TOP COUNTRIES${RESET}`);
      const devRows = devReport.rows || [];
      const devSummary = devRows.map(r => `${r.dimensionValues[0].value}: ${r.metricValues[0].value}`).join(' | ');
      console.log(`   ${BLUE}Devices:${RESET}  ${devSummary}`);

      const cntRows = countryReport.rows || [];
      const cntSummary = cntRows.map(r => `${r.dimensionValues[0].value} (${r.metricValues[0].value})`).join(', ');
      console.log(`   ${BLUE}Countries:${RESET} ${cntSummary}`);
      console.log('');
    } catch (e) {}
  }

  // 6. Outbound & Affiliate Clicks
  if (!isFiltered || showOnlyOutbound) {
    try {
      const affReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'linkUrl' }, { name: 'pagePath' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'outbound_click' } }
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 15
      });

      const affRows = affReport.rows || [];
      if (affRows.length > 0) {
        console.log(`${BOLD}🔗 TOP OUTBOUND & AFFILIATE DESTINATIONS${RESET}`);
        console.log(`   ${padR('Destination Link', 45)} ${padR('Source Article', 28)} ${padL('Clicks', 6)}`);
        console.log(`   ${'─'.repeat(82)}`);
        for (const r of affRows) {
          const dest = r.dimensionValues[0].value;
          const page = r.dimensionValues[1].value;
          const clicks = r.metricValues[0].value;
          console.log(`   ${GREEN}${padR(dest, 45)}${RESET} ${padR(page, 28)} ${padL(clicks, 6)}`);
        }
        console.log('');
      }
    } catch (e) {}
  }
}

main().catch(err => {
  console.error(`\n${RED}Error: ${err.message}${RESET}\n`);
  process.exit(1);
});
