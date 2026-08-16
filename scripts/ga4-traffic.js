#!/usr/bin/env node

/**
 * GA4 Traffic & User Event Intelligence Report
 *
 * Reads custom events (affiliate clicks, site search, pillar clicks, code copy, reading completion)
 * directly from the Google Analytics 4 Data API.
 *
 * Usage:
 *   node scripts/ga4-traffic.js                      # Full events overview
 *   node scripts/ga4-traffic.js --affiliate          # Detailed affiliate clicks breakdown
 *   node scripts/ga4-traffic.js --search             # Top Pagefind internal searches
 *   node scripts/ga4-traffic.js --engagement         # Reading completion & copy stats
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
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function padR(s, n) { return String(s || '').slice(0, n).padEnd(n); }
function padL(s, n) { return String(s || '').slice(0, n).padStart(n); }

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
  const showAffiliate = args.includes('--affiliate');
  const showSearch = args.includes('--search');
  const showEngagement = args.includes('--engagement');

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

  console.log(`\n${'═'.repeat(75)}`);
  console.log(`  ${BOLD}GA4 USER INTELLIGENCE & EVENT REPORT — boredom-at-work.com${RESET}`);
  console.log(`  Property: ${propertyId} | Range: ${startStr} → ${endStr} (${days} days)`);
  console.log(`${'═'.repeat(75)}\n`);

  process.stdout.write(`  Authenticating with GA4 Data API... `);
  const token = await getAccessToken(credentials);
  console.log(`${GREEN}OK${RESET}\n`);

  // 1. Overall Events Summary
  process.stdout.write(`  Fetching custom event counts... `);
  const eventReport = await runGA4Report(token, propertyId, {
    dateRanges: [{ startDate: startStr, endDate: endStr }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }]
  });
  console.log(`${GREEN}OK${RESET}\n`);

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

  // 2. Affiliate Click Breakdown
  if (showAffiliate || (!showSearch && !showEngagement)) {
    try {
      const affReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'customEvent:partner' }, { name: 'pagePath' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'affiliate_click' } }
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }]
      });

      const affRows = affReport.rows || [];
      if (affRows.length > 0) {
        console.log(`${BOLD}🛒 AFFILIATE CLICKS BY PARTNER & ARTICLE${RESET}`);
        console.log(`   ${padR('Partner', 22)} ${padR('Source Article', 40)} ${padL('Clicks', 8)}`);
        console.log(`   ${'─'.repeat(73)}`);
        for (const r of affRows.slice(0, 15)) {
          const partner = r.dimensionValues[0].value;
          const page = r.dimensionValues[1].value;
          const clicks = r.metricValues[0].value;
          console.log(`   ${YELLOW}${padR(partner, 22)}${RESET} ${CYAN}${padR(page, 40)}${RESET} ${padL(clicks, 8)}`);
        }
        console.log('');
      }
    } catch (e) {}
  }

  // 3. Site Search Queries
  if (showSearch || (!showAffiliate && !showEngagement)) {
    try {
      const searchReport = await runGA4Report(token, propertyId, {
        dateRanges: [{ startDate: startStr, endDate: endStr }],
        dimensions: [{ name: 'customEvent:search_term' }],
        metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'site_search' } }
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }]
      });

      const searchRows = searchReport.rows || [];
      if (searchRows.length > 0) {
        console.log(`${BOLD}🔍 TOP PAGEFIND INTERNAL SEARCHES (Content Opportunities)${RESET}`);
        console.log(`   ${padR('Search Term', 45)} ${padL('Searches', 10)} ${padL('Users', 10)}`);
        console.log(`   ${'─'.repeat(68)}`);
        for (const r of searchRows.slice(0, 15)) {
          const term = r.dimensionValues[0].value;
          const count = r.metricValues[0].value;
          const users = r.metricValues[1].value;
          console.log(`   ${MAGENTA}${padR(term, 45)}${RESET} ${padL(count, 10)} ${padL(users, 10)}`);
        }
        console.log(`   ${DIM}💡 Tip: If visitors search for topics with 0 articles, write them!${RESET}\n`);
      }
    } catch (e) {}
  }
}

main().catch(err => {
  console.error(`\n${RED}Error: ${err.message}${RESET}\n`);
  process.exit(1);
});
