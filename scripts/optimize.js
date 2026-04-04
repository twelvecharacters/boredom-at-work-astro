#!/usr/bin/env node

/**
 * Unified Content Optimization Tool for boredom-at-work.com
 *
 * Combines: Daily Dashboard + Article Scoring + Content Lint + Auto-Fix
 *
 * Usage:
 *   node scripts/optimize.js                     # Full report (daily + scores + lint)
 *   node scripts/optimize.js --daily             # Daily dashboard only
 *   node scripts/optimize.js --lint              # Content lint only
 *   node scripts/optimize.js --lint --fix        # Content lint + auto-fix
 *   node scripts/optimize.js --score             # Score all articles
 *   node scripts/optimize.js --below 90          # Score articles below threshold
 *   node scripts/optimize.js --fix               # Auto-fix SEO + lint issues
 *   node scripts/optimize.js path/to/article.md  # Score + fix one article
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// ─── Configuration ──────────────────────────────────────────────────────────

const BLOG_DIR = resolve('src/content/blog');

const OUTDATED_PATTERNS = [
  { pattern: /chat\.openai\.com/g, fix: 'chatgpt.com', message: '`chat.openai.com` → `chatgpt.com`', severity: 'error' },
  { pattern: /Claude 3\.5(?! Sonnet\b| Haiku\b| Opus\b)/g, message: '`Claude 3.5` without model suffix', severity: 'warning' },
  { pattern: /Claude 3\.5 Sonnet/g, fix: 'Claude Sonnet 4.5', message: '`Claude 3.5 Sonnet` → `Claude Sonnet 4.5`', severity: 'error' },
  { pattern: /Claude 3\.5 Haiku/g, fix: 'Claude Haiku 4.5', message: '`Claude 3.5 Haiku` → `Claude Haiku 4.5`', severity: 'error' },
  { pattern: /Claude 3 Opus/g, fix: 'Claude Opus 4.6', message: '`Claude 3 Opus` → `Claude Opus 4.6`', severity: 'error' },
  { pattern: /Gemini 1\.5 Pro/g, fix: 'Gemini 2.5 Pro', message: '`Gemini 1.5 Pro` → `Gemini 2.5 Pro`', severity: 'error' },
  { pattern: /Gemini 1\.5 Flash/g, fix: 'Gemini 2.5 Flash', message: '`Gemini 1.5 Flash` → `Gemini 2.5 Flash`', severity: 'error' },
  { pattern: /Gemini 1\.5(?! Pro\b| Flash\b)/g, message: '`Gemini 1.5` without model suffix', severity: 'warning' },
  { pattern: /\bNikon Z50\b(?!\s*II)/g, message: '`Nikon Z50` without "II" — discontinued', severity: 'warning' },
  { pattern: /\bSony a6100\b/g, message: '`Sony a6100` is discontinued', severity: 'warning' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function collectMarkdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files.sort();
}

function splitFrontmatterAndBody(content) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') return { frontmatter: '', body: content, frontmatterEndLine: 0 };
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { closingIndex = i; break; }
  }
  if (closingIndex === -1) return { frontmatter: '', body: content, frontmatterEndLine: 0 };
  return {
    frontmatter: lines.slice(1, closingIndex).join('\n'),
    body: lines.slice(closingIndex + 1).join('\n'),
    frontmatterEndLine: closingIndex + 1,
  };
}

function getFrontmatterValue(fm, key) {
  const regex = new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))$`, 'm');
  const match = fm.match(regex);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3]).trim();
}

function parseTags(fm) {
  const match = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (!match) return [];
  return match[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}

function deriveSlug(fm, filePath) {
  const explicit = getFrontmatterValue(fm, 'slug');
  if (explicit) return explicit;
  return filePath.split('/').pop().replace(/\.md$/, '');
}

function isPublished(fm) {
  if (getFrontmatterValue(fm, 'draft') === 'true') return false;
  const pubDate = getFrontmatterValue(fm, 'publishDate');
  if (!pubDate) return false;
  return new Date(pubDate) <= new Date();
}

function formatDate(d) { return d.toISOString().split('T')[0]; }

function lineNumberAt(content, charIndex) {
  let line = 1;
  for (let i = 0; i < charIndex && i < content.length; i++) {
    if (content[i] === '\n') line++;
  }
  return line;
}

// ─── Data Collection ────────────────────────────────────────────────────────

function collectArticleData(allFiles) {
  const articles = [];
  for (const filePath of allFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = splitFrontmatterAndBody(content);
    const title = getFrontmatterValue(frontmatter, 'title') || 'Untitled';
    const slug = deriveSlug(frontmatter, filePath);
    const pubDate = getFrontmatterValue(frontmatter, 'publishDate');
    const draft = getFrontmatterValue(frontmatter, 'draft') === 'true';
    const description = getFrontmatterValue(frontmatter, 'description') || '';
    const tags = parseTags(frontmatter);
    const image = getFrontmatterValue(frontmatter, 'image');

    const internalLinkRegex = /\]\(\/([\w-]+)\/?(?:#[\w-]*)?\)/g;
    const outLinks = new Set();
    let match;
    while ((match = internalLinkRegex.exec(body)) !== null) {
      if (match[1] !== slug) outLinks.add(match[1]);
    }
    const extLinks = (body.match(/\]\(https?:\/\//g) || []).length;
    const words = body.replace(/[#|*_`\-\[\]()>]/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
    const faqCount = (frontmatter.match(/- question:/g) || []).length;

    articles.push({ filePath, title, slug, pubDate, draft, description, tags, image, outLinks, extLinks, words, faqCount, frontmatter, body, content });
  }

  const slugSet = new Set(articles.map(a => a.slug));
  const incoming = new Map();
  for (const slug of slugSet) incoming.set(slug, new Set());
  for (const article of articles) {
    for (const target of article.outLinks) {
      if (incoming.has(target)) incoming.get(target).add(article.slug);
    }
  }

  return { articles, incoming };
}

// ─── DAILY DASHBOARD ────────────────────────────────────────────────────────

function runDaily(articles, incoming) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayStr = formatDate(today);
  const weekEnd = new Date(today); weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()));
  const weekEndStr = formatDate(weekEnd);
  const twoWeeks = new Date(today); twoWeeks.setDate(twoWeeks.getDate() + 14);
  const twoWeeksStr = formatDate(twoWeeks);

  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);
  const scheduled = articles.filter(a => a.pubDate > todayStr && !a.draft);
  const todayArticles = articles.filter(a => a.pubDate === todayStr && !a.draft);
  const weekArticles = articles.filter(a => a.pubDate > todayStr && a.pubDate <= weekEndStr && !a.draft).sort((a, b) => a.pubDate.localeCompare(b.pubDate));
  const upcoming = articles.filter(a => a.pubDate > todayStr && a.pubDate <= twoWeeksStr && !a.draft).sort((a, b) => a.pubDate.localeCompare(b.pubDate));
  const orphans = published.filter(a => { const inc = incoming.get(a.slug); return !inc || inc.size === 0; });

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  \x1b[1mDAILY CONTENT OPS — boredom-at-work.com\x1b[0m`);
  console.log(`  ${todayStr}`);
  console.log(`${'═'.repeat(60)}\n`);

  // Today
  console.log('\x1b[1m📅 TODAY\x1b[0m');
  if (todayArticles.length === 0) console.log('   No articles publishing today.\n');
  else { for (const a of todayArticles) console.log(`   \x1b[32m●\x1b[0m ${a.title}  /${a.slug}/`); console.log(''); }

  // This week
  console.log('\x1b[1m📆 REST OF WEEK\x1b[0m');
  if (weekArticles.length === 0) console.log('   Nothing scheduled.\n');
  else { for (const a of weekArticles) console.log(`   ${a.pubDate}  ${a.title}`); console.log(''); }

  // Stats
  console.log('\x1b[1m📊 STATS\x1b[0m');
  console.log(`   Published: ${published.length}  |  Scheduled: ${scheduled.length}  |  Total: ${articles.length}\n`);

  // Orphans
  console.log('\x1b[1m🔗 ORPHANS\x1b[0m');
  if (orphans.length === 0) console.log('   \x1b[32m✓ None!\x1b[0m\n');
  else { for (const a of orphans) console.log(`   \x1b[31m●\x1b[0m /${a.slug}/`); console.log(''); }

  // Upcoming with warnings
  console.log('\x1b[1m🔜 NEXT 14 DAYS\x1b[0m');
  for (const a of upcoming) {
    const flags = [];
    if (a.faqCount === 0) flags.push('no FAQ');
    if (a.outLinks.size < 3) flags.push('few links');
    if (a.extLinks === 0) flags.push('no ext links');
    const flagStr = flags.length > 0 ? `  \x1b[33m⚠️ ${flags.join(' · ')}\x1b[0m` : '';
    console.log(`   ${a.pubDate}  ${a.title}${flagStr}`);
  }
  console.log('');

  // Reminders
  console.log('\x1b[1m📋 REMINDERS\x1b[0m');
  console.log('   • Quora: 1 link post per session');
  console.log('   • GSC: up to 10 URLs/day');
  console.log('   • JUSTWAY / HackerNoon: check status');
  console.log('');
}

// ─── CONTENT LINT ───────────────────────────────────────────────────────────

function lintFile(content, filePath) {
  const issues = [];
  const { frontmatter, body, frontmatterEndLine } = splitFrontmatterAndBody(content);

  // Outdated patterns
  for (const { pattern, message, severity } of OUTDATED_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      issues.push({ filePath, lineNum: lineNumberAt(content, match.index), severity, message });
    }
  }

  // Meta description length
  const desc = getFrontmatterValue(frontmatter, 'description');
  if (desc && desc.length > 160) {
    const lines = content.split('\n');
    let descLine = 1;
    for (let i = 0; i < lines.length; i++) { if (lines[i].startsWith('description:')) { descLine = i + 1; break; } }
    issues.push({ filePath, lineNum: descLine, severity: 'warning', message: `Meta description is ${desc.length} chars (max 160)` });
  }

  // Listicle consistency
  const title = getFrontmatterValue(frontmatter, 'title') || '';
  const titleNumMatch = title.match(/\b(\d+)\s+(?:best|top|essential|proven|free|must-have|favorite|worst|common|things|prompts|tips|tricks|ways|tools|reasons|mistakes|sites|apps|ideas)/i);
  if (titleNumMatch) {
    const expected = parseInt(titleNumMatch[1], 10);
    const bodyLines = body.split('\n');
    const numbered = [];
    for (let i = 0; i < bodyLines.length; i++) {
      const m = bodyLines[i].match(/^(#{2,4})\s+(\d+)\.\s/);
      if (m) numbered.push(parseInt(m[2], 10));
    }
    if (numbered.length > 0 && numbered.length !== expected) {
      issues.push({ filePath, lineNum: 1, severity: 'error', message: `Title claims ${expected} items but found ${numbered.length}` });
    }
  }

  // Price consistency (simplified)
  const contentLines = content.split('\n');
  const priceMentions = new Map();
  for (let i = 0; i < contentLines.length; i++) {
    const contextPriceRegex = /(\b[A-Z][\w\s]*?)\s*(?:[:(\-—])\s*(~?\$[\d,]+(?:\.\d{1,2})?(?:\s*\/\s*(?:mo(?:nth)?|year|yr))?)/gi;
    let m;
    while ((m = contextPriceRegex.exec(contentLines[i])) !== null) {
      const label = m[1].trim().toLowerCase().replace(/\s+/g, ' ');
      const value = m[2].replace(/^~/, '').replace(/,/g, '').replace(/\s+/g, '').toLowerCase().replace(/[^0-9.]/g, '');
      if (!priceMentions.has(label)) priceMentions.set(label, []);
      priceMentions.get(label).push({ value, lineNum: i + 1, raw: m[2] });
    }
  }
  for (const [label, mentions] of priceMentions) {
    if (mentions.length < 2) continue;
    const unique = [...new Set(mentions.map(m => m.value))];
    if (unique.length > 1) {
      const first = mentions[0], conf = mentions.find(m => m.value !== first.value);
      issues.push({ filePath, lineNum: conf.lineNum, severity: 'warning', message: `Price mismatch "${label}": ${first.raw} (line ${first.lineNum}) vs ${conf.raw} (line ${conf.lineNum})` });
    }
  }

  return issues;
}

function applyLintFixes(content) {
  let fixed = content;
  let fixCount = 0;
  for (const { pattern, fix } of OUTDATED_PATTERNS) {
    if (!fix) continue;
    pattern.lastIndex = 0;
    if (pattern.test(fixed)) {
      pattern.lastIndex = 0;
      const matches = fixed.match(pattern);
      fixCount += matches ? matches.length : 0;
      fixed = fixed.replace(pattern, fix);
    }
  }
  return { content: fixed, fixCount };
}

function runLint(allFiles, fixMode) {
  console.log(`\n\x1b[1m🔍 CONTENT LINT\x1b[0m — ${fixMode ? 'fixing' : 'scanning'} ${allFiles.length} files\n`);

  if (fixMode) {
    let totalFixes = 0, filesFixed = 0;
    for (const f of allFiles) {
      const result = applyLintFixes(readFileSync(f, 'utf-8'));
      if (result.fixCount > 0) {
        writeFileSync(f, result.content, 'utf-8');
        filesFixed++; totalFixes += result.fixCount;
        console.log(`   \x1b[32mFIXED\x1b[0m  ${relative(process.cwd(), f)} (${result.fixCount})`);
      }
    }
    if (totalFixes === 0) console.log('   \x1b[32m✓ Nothing to fix.\x1b[0m');
    else console.log(`\n   Fixed ${totalFixes} issue(s) in ${filesFixed} file(s).`);
    console.log('');
  }

  let totalErrors = 0, totalWarnings = 0, filesWithIssues = 0;
  for (const f of allFiles) {
    const issues = lintFile(readFileSync(f, 'utf-8'), f);
    if (issues.length === 0) continue;
    filesWithIssues++;
    const relPath = relative(process.cwd(), f);
    console.log(`   \x1b[1m${relPath}\x1b[0m`);
    for (const issue of issues.sort((a, b) => a.lineNum - b.lineNum)) {
      const icon = issue.severity === 'error' ? '\x1b[31mERR\x1b[0m' : '\x1b[33mWRN\x1b[0m';
      console.log(`     ${icon}  line ${issue.lineNum}: ${issue.message}`);
      if (issue.severity === 'error') totalErrors++; else totalWarnings++;
    }
  }
  console.log(`\n   ${filesWithIssues} file(s): \x1b[31m${totalErrors} error(s)\x1b[0m, \x1b[33m${totalWarnings} warning(s)\x1b[0m\n`);
  return totalErrors;
}

// ─── SEO SCORING ────────────────────────────────────────────────────────────

function scoreArticle(article, incoming) {
  const { frontmatter, body, slug, title, description, tags, image, outLinks, extLinks, words, faqCount, content } = article;

  const criteria = [];
  // Title
  const tLen = title.length;
  if (tLen >= 50 && tLen <= 60) criteria.push({ name: 'Title', score: 10, max: 10, detail: `${tLen}ch` });
  else if (tLen >= 40 && tLen <= 70) criteria.push({ name: 'Title', score: 6, max: 10, detail: `${tLen}ch` });
  else criteria.push({ name: 'Title', score: 2, max: 10, detail: `${tLen}ch` });

  // Description
  const dLen = description.length;
  if (dLen >= 140 && dLen <= 160) criteria.push({ name: 'Desc', score: 10, max: 10, detail: `${dLen}ch` });
  else if (dLen >= 120 && dLen <= 170) criteria.push({ name: 'Desc', score: 6, max: 10, detail: `${dLen}ch` });
  else if (dLen === 0) criteria.push({ name: 'Desc', score: 0, max: 10, detail: 'missing' });
  else criteria.push({ name: 'Desc', score: 3, max: 10, detail: `${dLen}ch` });

  // FAQ
  if (faqCount >= 2) criteria.push({ name: 'FAQ', score: 10, max: 10, detail: `${faqCount}` });
  else if (faqCount === 1) criteria.push({ name: 'FAQ', score: 5, max: 10, detail: '1' });
  else criteria.push({ name: 'FAQ', score: 0, max: 10, detail: '0' });

  // Internal links
  const iLinks = outLinks.size;
  if (iLinks >= 3) criteria.push({ name: 'IntLinks', score: 10, max: 10, detail: `${iLinks}` });
  else criteria.push({ name: 'IntLinks', score: Math.round(iLinks / 3 * 10), max: 10, detail: `${iLinks}` });

  // External links
  criteria.push({ name: 'ExtLinks', score: extLinks >= 1 ? 5 : 0, max: 5, detail: `${extLinks}` });

  // Words
  if (words >= 800) criteria.push({ name: 'Words', score: 10, max: 10, detail: `${words}` });
  else if (words >= 400) criteria.push({ name: 'Words', score: 5, max: 10, detail: `${words}` });
  else criteria.push({ name: 'Words', score: 2, max: 10, detail: `${words}` });

  // H2
  const h2s = (body.match(/^## /gm) || []).length;
  criteria.push({ name: 'H2', score: h2s >= 2 ? 5 : h2s === 1 ? 3 : 0, max: 5, detail: `${h2s}` });

  // Image
  criteria.push({ name: 'Img', score: image ? 5 : 0, max: 5, detail: image ? '✓' : '✗' });

  // Tags
  const tc = tags.length;
  if (tc >= 3 && tc <= 5) criteria.push({ name: 'Tags', score: 5, max: 5, detail: `${tc}` });
  else if (tc >= 1) criteria.push({ name: 'Tags', score: 3, max: 5, detail: `${tc}` });
  else criteria.push({ name: 'Tags', score: 0, max: 5, detail: '0' });

  // Orphan
  const inc = incoming.get(slug);
  const incCount = inc ? inc.size : 0;
  criteria.push({ name: 'Incoming', score: incCount >= 1 ? 10 : 0, max: 10, detail: incCount > 0 ? `${incCount}` : 'ORPHAN' });

  // Lint clean
  let lintIssues = 0;
  for (const { pattern } of OUTDATED_PATTERNS) { pattern.lastIndex = 0; if (pattern.test(content)) lintIssues++; }
  criteria.push({ name: 'Lint', score: lintIssues === 0 ? 10 : 0, max: 10, detail: lintIssues === 0 ? '✓' : `${lintIssues}` });

  // Table (listicle bonus)
  const isListicle = /\d+\s+(?:best|top|essential|must-have)/i.test(title) || /\bvs\.?\b|comparison|compared/i.test(title);
  if (isListicle) {
    const tableRows = body.split('\n').filter(l => /^\|.+\|/.test(l.trim())).length;
    criteria.push({ name: 'Table', score: tableRows >= 3 ? 10 : 0, max: 10, detail: tableRows >= 3 ? '✓' : '✗' });
  }

  const earned = criteria.reduce((s, c) => s + c.score, 0);
  const max = criteria.reduce((s, c) => s + c.max, 0);
  const normalized = Math.round((earned / max) * 100);

  return { normalized, criteria };
}

function runScore(articles, incoming, belowThreshold, showAll) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayStr = formatDate(today);
  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);

  const results = published.map(a => ({ ...a, ...scoreArticle(a, incoming) }));
  results.sort((a, b) => a.normalized - b.normalized);

  const filtered = belowThreshold ? results.filter(r => r.normalized < belowThreshold) : results;
  const toShow = showAll ? filtered : filtered.slice(0, 20);

  console.log(`\x1b[1m📈 SEO SCORES\x1b[0m — ${published.length} published articles\n`);

  for (const r of toShow) {
    const color = r.normalized >= 90 ? '\x1b[32m' : r.normalized >= 70 ? '\x1b[33m' : '\x1b[31m';
    const relPath = relative(process.cwd(), r.filePath);
    const details = r.criteria.map(c => {
      const icon = c.score === c.max ? '\x1b[32m✓\x1b[0m' : c.score > 0 ? '\x1b[33m~\x1b[0m' : '\x1b[31m✗\x1b[0m';
      return `${icon}${c.name}`;
    }).join(' ');
    console.log(`   ${color}${String(r.normalized).padStart(3)}\x1b[0m  ${relPath}`);
    console.log(`       ${details}`);
  }

  if (!showAll && filtered.length > 20) console.log(`\n   ... and ${filtered.length - 20} more`);

  const avg = Math.round(results.reduce((s, r) => s + r.normalized, 0) / results.length);
  const above90 = results.filter(r => r.normalized >= 90).length;
  const below50 = results.filter(r => r.normalized < 50).length;
  console.log(`\n   Avg: ${avg}/100  |  \x1b[32m90+: ${above90}\x1b[0m  |  \x1b[33m50-89: ${results.length - above90 - below50}\x1b[0m  |  \x1b[31m<50: ${below50}\x1b[0m\n`);
}

// ─── SEO AUTO-FIX ───────────────────────────────────────────────────────────

function runFix(articles, incoming, slugMap) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayStr = formatDate(today);
  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);

  console.log(`\x1b[1m🔧 AUTO-FIX\x1b[0m — ${published.length} articles\n`);

  let totalFixes = 0;
  for (const article of published) {
    let content = readFileSync(article.filePath, 'utf-8');
    const fixes = [];

    // Fix lint patterns
    for (const { pattern, fix } of OUTDATED_PATTERNS) {
      if (!fix) continue;
      pattern.lastIndex = 0;
      if (pattern.test(content)) {
        pattern.lastIndex = 0;
        content = content.replace(pattern, fix);
        fixes.push(`Lint: ${pattern.source} → ${fix}`);
      }
    }

    // Fix description > 160
    const { frontmatter } = splitFrontmatterAndBody(content);
    const desc = getFrontmatterValue(frontmatter, 'description');
    if (desc && desc.length > 160) {
      let truncated = desc.slice(0, 157);
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > 100) truncated = truncated.slice(0, lastSpace);
      truncated += '...';
      const newContent = content.replace(`description: "${desc}"`, `description: "${truncated}"`);
      if (newContent !== content) { content = newContent; fixes.push(`Description: ${desc.length}→${truncated.length} chars`); }
    }

    if (fixes.length > 0) {
      writeFileSync(article.filePath, content, 'utf-8');
      totalFixes += fixes.length;
      const relPath = relative(process.cwd(), article.filePath);
      console.log(`   \x1b[32m✓\x1b[0m ${relPath}`);
      for (const f of fixes) console.log(`     ${f}`);
    }
  }

  if (totalFixes === 0) console.log('   \x1b[32m✓ Nothing to fix.\x1b[0m');
  else console.log(`\n   ${totalFixes} fix(es) applied.`);
  console.log('');
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const hasFlag = (f) => args.includes(f);
  const flagValue = (f) => { const i = args.indexOf(f); return i !== -1 && args[i + 1] ? args[i + 1] : null; };
  const fileArgs = args.filter(a => !a.startsWith('--') && a.endsWith('.md'));

  const dailyMode = hasFlag('--daily');
  const lintMode = hasFlag('--lint');
  const scoreMode = hasFlag('--score');
  const fixMode = hasFlag('--fix');
  const belowVal = flagValue('--below');
  const belowThreshold = belowVal ? parseInt(belowVal, 10) : null;
  const fullReport = !dailyMode && !lintMode && !scoreMode && !fixMode && !belowThreshold && fileArgs.length === 0;

  const allFiles = fileArgs.length > 0 ? fileArgs.map(f => resolve(f)) : collectMarkdownFiles(BLOG_DIR);
  const allFilesForGraph = collectMarkdownFiles(BLOG_DIR);
  const { articles, incoming } = collectArticleData(allFilesForGraph);

  // Single file mode
  if (fileArgs.length > 0) {
    const targeted = articles.filter(a => fileArgs.some(f => resolve(f) === a.filePath));
    for (const a of targeted) {
      const result = scoreArticle(a, incoming);
      const relPath = relative(process.cwd(), a.filePath);
      const color = result.normalized >= 90 ? '\x1b[32m' : result.normalized >= 70 ? '\x1b[33m' : '\x1b[31m';
      console.log(`\n   ${color}${result.normalized}/100\x1b[0m  ${relPath}\n`);
      for (const c of result.criteria) {
        const icon = c.score === c.max ? '\x1b[32m✓\x1b[0m' : c.score > 0 ? '\x1b[33m~\x1b[0m' : '\x1b[31m✗\x1b[0m';
        console.log(`   ${icon} ${c.name}: ${c.detail} (${c.score}/${c.max})`);
      }
      console.log('');
    }
    return;
  }

  // Full report
  if (fullReport) {
    runDaily(articles, incoming);
    runLint(allFilesForGraph, false);
    runScore(articles, incoming, null, false);
    return;
  }

  if (dailyMode) runDaily(articles, incoming);
  if (lintMode) runLint(allFilesForGraph, fixMode);
  if (scoreMode || belowThreshold) runScore(articles, incoming, belowThreshold, true);
  if (fixMode && !lintMode) {
    runLint(allFilesForGraph, true);
    runFix(articles, incoming);
  }
}

main();
