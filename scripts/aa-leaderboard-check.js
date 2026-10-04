#!/usr/bin/env node
/**
 * AA Leaderboard Check
 *
 * Compares src/data/ai-leaderboard.ts against the live Artificial Analysis
 * leaderboard (https://artificialanalysis.ai/leaderboards/models), the only
 * source the page claims. Added 2026-10-04 after the first version of the
 * leaderboard shipped with a fully invented latency column and several
 * made-up scores (Celeris-1 23 instead of 6, Mistral Large 3 25 instead of 9).
 *
 * Usage:
 *   node scripts/aa-leaderboard-check.js            # report deviations, exit 1 if any
 *   node scripts/aa-leaderboard-check.js --write    # apply AA values to the data file
 *   node scripts/aa-leaderboard-check.js --json     # machine-readable report
 *
 * Run daily by scripts/gsc-daily-report.sh. Submission of the fix stays manual:
 * run --write, read the diff, commit.
 *
 * Why HTML and not the API: the official API (api/v2/data/llms/models) needs a
 * free key and does not return the "Cost per Task" or context columns the page
 * shows. The server-rendered table has exactly our five columns. If the markup
 * changes, parseTable() throws and the daily job reports it instead of silently
 * passing.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AA_URL = 'https://artificialanalysis.ai/leaderboards/models';
const DATA_PATH = resolve('src/data/ai-leaderboard.ts');
const PAGE_PATH = resolve('src/pages/ai-leaderboard.astro');

// Relative tolerance for the two noisy columns. AA recomputes medians
// continuously, so speed and cost wobble by a few percent between loads.
const SPEED_TOLERANCE = 0.12;
const COST_TOLERANCE = 0.12;

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const JSON_OUT = args.includes('--json');

// ── Artificial Analysis ─────────────────────────────────────────────────────

async function fetchHtml(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 30_000);
  try {
    const res = await fetch(url, {
      signal: ctl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) boredom-at-work leaderboard check',
        Accept: 'text/html',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * The AA page renders one <table>. Its second header row names the columns:
 * Model | Context Window | Creator | Artificial Analysis Intelligence Index |
 * Cost per Task USD | Median Tokens/s | Latency First Chunk (s) | Total Response (s)
 * We locate columns by header text, not position, so a reordered table still parses.
 */
function parseTable(html) {
  const table = html.match(/<table[\s\S]*?<\/table>/);
  if (!table) throw new Error('AA page: no <table> found, markup changed?');
  const rows = table[0].match(/<tr[\s\S]*?<\/tr>/g) || [];
  const cells = (row) => (row.match(/<t[hd][\s\S]*?<\/t[hd]>/g) || []).map(stripTags);

  let header = null;
  const models = [];
  for (const row of rows) {
    const c = cells(row);
    if (!header) {
      if (c[0] === 'Model') header = c.map((h) => h.toLowerCase());
      continue;
    }
    if (c.length < 6) continue;
    const col = (needle) => header.findIndex((h) => h.includes(needle));
    const iName = col('model');
    const iCtx = col('context');
    const iCreator = col('creator');
    const iIdx = col('intelligence index');
    const iCost = col('cost per task');
    const iSpeed = col('tokens/s');
    if ([iName, iCtx, iIdx, iCost, iSpeed].some((i) => i < 0)) {
      throw new Error(`AA page: header columns not recognized: ${header.join(' | ')}`);
    }
    const fullName = c[iName];
    const baseName = fullName
      .replace(/\s*\([^)]*\)\s*$/, '') // "(max with fallback)", "(June 2026)", "(0902)" stays only when part of our name
      .replace(/\s+Preview$/i, '')
      .trim();
    const idx = Number.parseInt(c[iIdx], 10);
    if (!fullName || Number.isNaN(idx)) continue;
    models.push({
      fullName,
      baseName,
      creator: iCreator >= 0 ? c[iCreator] : '',
      intelligence: idx,
      context: c[iCtx] || 'n/a',
      cost: /^\$/.test(c[iCost]) ? c[iCost] : 'n/a',
      speed: /\d/.test(c[iSpeed]) ? c[iSpeed].replace(/\s+/g, '') : 'n/a',
    });
  }
  if (!header) throw new Error('AA page: header row "Model | Context Window | ..." not found');
  if (models.length < 50) throw new Error(`AA page: only ${models.length} rows parsed, expected 100+`);
  return models;
}

/** One entry per base model: the variant with the highest Intelligence Index. */
function bestVariants(models) {
  const best = new Map();
  const put = (key, m) => {
    const prev = best.get(key);
    if (!prev || m.intelligence > prev.intelligence) best.set(key, m);
  };
  for (const m of models) {
    put(m.baseName.toLowerCase(), m);
    put(m.fullName.toLowerCase(), m); // lets "Qwen3.8 Max (0902)" match verbatim
  }
  return best;
}

// ── Our data file ───────────────────────────────────────────────────────────

function locateModelsArray(src) {
  const start = src.indexOf('export const LEADERBOARD_MODELS');
  if (start < 0) throw new Error('LEADERBOARD_MODELS not found in data file');
  const open = src.indexOf('= [', start) + 2;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']' && --depth === 0) return { open, close: i };
  }
  throw new Error('LEADERBOARD_MODELS array not closed');
}

function splitBlocks(body) {
  const blocks = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}' && --depth === 0) {
      blocks.push(body.slice(start, i + 1));
    }
  }
  return blocks;
}

function field(block, name) {
  const m = block.match(new RegExp(`"${name}":\\s*(?:"([^"]*)"|(\\d+))`));
  return m ? (m[1] ?? m[2]) : undefined;
}

function readOurModels(src) {
  const { open, close } = locateModelsArray(src);
  const body = src.slice(open + 1, close);
  return splitBlocks(body).map((block) => ({
    block,
    name: field(block, 'name'),
    intelligence: Number(field(block, 'intelligence')),
    context: field(block, 'contextWindow'),
    cost: field(block, 'costPerTask'),
    speed: field(block, 'outputSpeed'),
  }));
}

// ── Comparison ──────────────────────────────────────────────────────────────

const num = (s) => Number.parseFloat(String(s).replace(/[^0-9.]/g, ''));
const relDiff = (a, b) => (a === 0 && b === 0 ? 0 : Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b)));
const normCtx = (s) => String(s).toLowerCase().replace(/\s+/g, '').replace(/^1\.0+m$/, '1m');

function compare(ours, aaBest) {
  const findings = [];
  for (const o of ours) {
    const aa = aaBest.get(o.name.toLowerCase());
    if (!aa) {
      findings.push({ model: o.name, field: 'exists', ours: 'listed', aa: 'NOT ON AA', severity: 'error' });
      continue;
    }
    if (aa.intelligence !== o.intelligence) {
      findings.push({ model: o.name, field: 'intelligence', ours: o.intelligence, aa: aa.intelligence, severity: 'error' });
    }
    if (normCtx(aa.context) !== normCtx(o.context)) {
      findings.push({ model: o.name, field: 'context', ours: o.context, aa: aa.context, severity: 'warn' });
    }
    const costNa = o.cost === 'n/a' || aa.cost === 'n/a';
    if (costNa ? o.cost !== aa.cost : relDiff(num(o.cost), num(aa.cost)) > COST_TOLERANCE) {
      findings.push({ model: o.name, field: 'cost', ours: o.cost, aa: aa.cost, severity: 'warn' });
    }
    const speedNa = o.speed === 'n/a' || aa.speed === 'n/a';
    if (speedNa ? o.speed !== aa.speed : relDiff(num(o.speed), num(aa.speed)) > SPEED_TOLERANCE) {
      findings.push({ model: o.name, field: 'speed', ours: o.speed, aa: `${aa.speed} t/s`, severity: 'warn' });
    }
  }
  return findings;
}

/** Hard-coded numbers in the hero cards of the page; reported, never rewritten. */
function checkPage(ours) {
  const findings = [];
  let page;
  try { page = readFileSync(PAGE_PATH, 'utf8'); } catch { return findings; }
  const byName = new Map(ours.map((o) => [o.name, o]));
  for (const m of page.matchAll(/<h3[^>]*>([^<]+)<\/h3>[\s\S]{0,900}?Score: (\d+)(?: · (\d+) t\/s| · (\$[\d.]+)\/task)?/g)) {
    const o = byName.get(m[1].trim());
    if (!o) continue;
    if (Number(m[2]) !== o.intelligence) findings.push({ model: o.name, field: 'page hero score', ours: m[2], aa: o.intelligence, severity: 'warn' });
    if (m[3] && relDiff(Number(m[3]), num(o.speed)) > SPEED_TOLERANCE) findings.push({ model: o.name, field: 'page hero speed', ours: `${m[3]} t/s`, aa: o.speed, severity: 'warn' });
    if (m[4] && m[4] !== o.cost) findings.push({ model: o.name, field: 'page hero cost', ours: m[4], aa: o.cost, severity: 'warn' });
  }
  return findings;
}

// ── Write mode ──────────────────────────────────────────────────────────────

function applyValues(src, ours, aaBest) {
  const { open, close } = locateModelsArray(src);
  const kept = [];
  const dropped = [];
  for (const o of ours) {
    const aa = aaBest.get(o.name.toLowerCase());
    if (!aa) { dropped.push(o.name); continue; }
    const speed = aa.speed === 'n/a' ? 'n/a' : `${aa.speed} t/s`;
    let b = o.block
      .replace(/"intelligence":\s*\d+/, `"intelligence": ${aa.intelligence}`)
      .replace(/"contextWindow":\s*"[^"]*"/, `"contextWindow": "${aa.context}"`)
      .replace(/"costPerTask":\s*"[^"]*"/, `"costPerTask": "${aa.cost}"`)
      .replace(/"outputSpeed":\s*"[^"]*"/, `"outputSpeed": "${speed}"`);
    // Numbers quoted inside the prose fields follow the table.
    const fixProse = (text) => {
      let t = text;
      if (aa.speed !== 'n/a') t = t.replace(/\b[\d,]+ (tokens\/second|tokens per second|t\/s)\b/g, `${aa.speed} $1`);
      if (aa.cost !== 'n/a') t = t.replace(/\$\d+\.\d\d( per task| pricing)/g, `${aa.cost}$1`);
      t = t.replace(/\b(scoring |with |index of |score of |\()(\d\d)( on the Intelligence Index| intelligence|\))/g, (_, a, _n, c) => `${a}${aa.intelligence}${c}`);
      return t;
    };
    b = b.replace(/"summary":\s*"([^"]*)"/, (_, t) => `"summary": "${fixProse(t)}"`);
    kept.push({ ...o, block: b, intelligence: aa.intelligence });
  }
  kept.sort((a, b) => b.intelligence - a.intelligence);
  const blocks = kept.map((k, i) => k.block.replace(/"rank":\s*\d+/, `"rank": ${i + 1}`));
  let out = src.slice(0, open + 1) + '\n  ' + blocks.join(',\n  ') + '\n' + src.slice(close);

  // Stats tiles follow the data.
  const parsed = readOurModels(out);
  const top = parsed.reduce((a, b) => (b.intelligence > a.intelligence ? b : a));
  const fastest = parsed.filter((p) => p.speed !== 'n/a').reduce((a, b) => (num(b.speed) > num(a.speed) ? b : a));
  const cheapest = parsed.filter((p) => p.cost !== 'n/a').reduce((a, b) => (num(b.cost) < num(a.cost) ? b : a));
  const ctxVal = (p) => { const n = num(p.context); return /m$/i.test(p.context) ? n * 1000 : n; };
  const biggest = parsed.reduce((a, b) => (ctxVal(b) > ctxVal(a) ? b : a));
  const setStat = (label, value, subtext) => {
    out = out.replace(new RegExp(`(value: ")[^"]*(",\\s*label: "${label}",\\s*subtext: ")[^"]*(")`), `$1${value}$2${subtext}$3`);
  };
  setStat('Top Intelligence', `${top.intelligence} Index`, top.name);
  setStat('Peak Output Speed', fastest.speed, fastest.name);
  setStat('Lowest Task Cost', cheapest.cost, cheapest.name);
  setStat('Record Context Window', `${biggest.context} Tokens`, biggest.name);
  return { out, dropped, count: blocks.length };
}

function stampPageDate() {
  let page;
  try { page = readFileSync(PAGE_PATH, 'utf8'); } catch { return false; }
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const next = page.replace(/(checked (?:against Artificial Analysis )?on )[A-Z][a-z]+ \d{1,2}, \d{4}/g, `$1${date}`);
  if (next !== page) writeFileSync(PAGE_PATH, next);
  return next !== page;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const src = readFileSync(DATA_PATH, 'utf8');
  const ours = readOurModels(src);
  const html = await fetchHtml(AA_URL);
  const aaBest = bestVariants(parseTable(html));

  const findings = [...compare(ours, aaBest), ...checkPage(ours)];
  const errors = findings.filter((f) => f.severity === 'error').length;

  if (JSON_OUT) {
    console.log(JSON.stringify({ checkedAt: new Date().toISOString(), ourModels: ours.length, aaModels: new Set([...aaBest.values()].map((m) => m.baseName)).size, findings }, null, 2));
  } else {
    console.log(`\nAA Leaderboard Check, ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`);
    console.log(`  ${ours.length} Modelle bei uns, ${new Set([...aaBest.values()].map((m) => m.baseName)).size} Basis-Modelle auf Artificial Analysis\n`);
    if (findings.length === 0) {
      console.log('  Keine Abweichungen. Daten entsprechen dem AA-Leaderboard.\n');
    } else {
      const w = Math.max(...findings.map((f) => f.model.length));
      for (const f of findings) {
        const tag = f.severity === 'error' ? 'ERROR' : 'WARN ';
        console.log(`  ${tag}  ${f.model.padEnd(w)}  ${f.field.padEnd(16)} bei uns ${String(f.ours).padEnd(10)} AA ${f.aa}`);
      }
      console.log(`\n  ${findings.length} Abweichung(en), davon ${errors} Error (Index oder Modell fehlt auf AA).`);
      console.log('  Beheben: node scripts/aa-leaderboard-check.js --write, Diff lesen, committen.\n');
    }
  }

  if (WRITE) {
    const { out, dropped, count } = applyValues(src, ours, aaBest);
    writeFileSync(DATA_PATH, out);
    const stamped = stampPageDate();
    console.log(`  --write: ${count} Modelle auf AA-Werte gesetzt und neu gerankt.`);
    if (dropped.length) console.log(`  --write: ${dropped.length} nicht auf AA gefunden und ENTFERNT: ${dropped.join(', ')}`);
    if (stamped) console.log('  --write: Pruefdatum auf der Seite aktualisiert.');
    console.log('  Hero-Karten in src/pages/ai-leaderboard.astro bleiben Handarbeit (siehe WARN "page hero").\n');
    process.exit(0);
  }
  process.exit(findings.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(`\nAA Leaderboard Check FEHLGESCHLAGEN: ${err.message}\n`);
  process.exit(2);
});
