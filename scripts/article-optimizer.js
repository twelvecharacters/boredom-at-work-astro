#!/usr/bin/env node

/**
 * Article Optimizer for boredom-at-work.com
 *
 * Scores blog articles on SEO/quality criteria (0-100 scale),
 * auto-fixes what it can, re-scores, and reports before/after.
 *
 * Inspired by Karpathy's autoresearch loop.
 *
 * Usage:
 *   node scripts/article-optimizer.js                        # Score all published articles
 *   node scripts/article-optimizer.js path/to/article.md     # Score one article
 *   node scripts/article-optimizer.js --fix                  # Score + auto-fix all
 *   node scripts/article-optimizer.js --fix path/to/article.md
 *   node scripts/article-optimizer.js --below 70             # Show only articles scoring below 70
 *
 * Exit codes:
 *   0 — Success
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// ─── Configuration ──────────────────────────────────────────────────────────

const BLOG_DIR = resolve('src/content/blog');

const OUTDATED_PATTERNS = [
  { pattern: /chat\.openai\.com/g, fix: 'chatgpt.com' },
  { pattern: /Claude 3\.5 Sonnet/g, fix: 'Claude Sonnet 4.5' },
  { pattern: /Claude 3\.5 Haiku/g, fix: 'Claude Haiku 4.5' },
  { pattern: /Claude 3 Opus/g, fix: 'Claude Opus 4.6' },
  { pattern: /Gemini 1\.5 Pro/g, fix: 'Gemini 2.5 Pro' },
  { pattern: /Gemini 1\.5 Flash/g, fix: 'Gemini 2.5 Flash' },
];

// ─── Helpers (shared with content-lint.js) ──────────────────────────────────

function collectMarkdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
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

function getFrontmatterValue(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))$`, 'm');
  const match = frontmatter.match(regex);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3]).trim();
}

function parseTags(frontmatter) {
  const match = frontmatter.match(/^tags:\s*\[([^\]]*)\]/m);
  if (!match) return [];
  return match[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}

function deriveSlug(frontmatter, filePath) {
  const explicit = getFrontmatterValue(frontmatter, 'slug');
  if (explicit) return explicit;
  const filename = filePath.split('/').pop();
  return filename.replace(/\.md$/, '');
}

function countFaqEntries(frontmatter) {
  const matches = frontmatter.match(/- question:/g);
  return matches ? matches.length : 0;
}

function isPublished(frontmatter) {
  const draft = getFrontmatterValue(frontmatter, 'draft');
  if (draft === 'true') return false;
  const pubDate = getFrontmatterValue(frontmatter, 'publishDate');
  if (!pubDate) return false;
  return new Date(pubDate) <= new Date();
}

// ─── Build Slug Map & Link Graph ────────────────────────────────────────────

function buildSlugMap(allFiles) {
  const slugMap = new Map(); // slug → { filePath, title, tags, published }
  for (const filePath of allFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter } = splitFrontmatterAndBody(content);
    const slug = deriveSlug(frontmatter, filePath);
    const title = getFrontmatterValue(frontmatter, 'title') || '';
    const tags = parseTags(frontmatter);
    const published = isPublished(frontmatter);
    slugMap.set(slug, { filePath, title, tags, published });
  }
  return slugMap;
}

function buildLinkGraph(allFiles, slugMap) {
  const internalLinkRegex = /\]\(\/([\w-]+)\/?(?:#[\w-]*)?\)/g;
  const outgoing = new Map(); // slug → Set<slug>
  const incoming = new Map(); // slug → Set<slug>

  // Initialize
  for (const slug of slugMap.keys()) {
    outgoing.set(slug, new Set());
    incoming.set(slug, new Set());
  }

  for (const filePath of allFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = splitFrontmatterAndBody(content);
    const sourceSlug = deriveSlug(frontmatter, filePath);

    let match;
    internalLinkRegex.lastIndex = 0;
    while ((match = internalLinkRegex.exec(body)) !== null) {
      const targetSlug = match[1];
      if (targetSlug !== sourceSlug && slugMap.has(targetSlug)) {
        if (!outgoing.has(sourceSlug)) outgoing.set(sourceSlug, new Set());
        outgoing.get(sourceSlug).add(targetSlug);
        if (!incoming.has(targetSlug)) incoming.set(targetSlug, new Set());
        incoming.get(targetSlug).add(sourceSlug);
      }
    }
  }

  return { outgoing, incoming };
}

// ─── Scoring Functions ──────────────────────────────────────────────────────

function scoreTitle(frontmatter) {
  const title = getFrontmatterValue(frontmatter, 'title') || '';
  const len = title.length;
  if (len >= 50 && len <= 60) return { score: 10, max: 10, detail: `${len} chars` };
  if (len >= 40 && len <= 70) return { score: 6, max: 10, detail: `${len} chars (aim for 50-60)` };
  return { score: 2, max: 10, detail: `${len} chars (too ${len < 40 ? 'short' : 'long'})` };
}

function scoreDescription(frontmatter) {
  const desc = getFrontmatterValue(frontmatter, 'description') || '';
  const len = desc.length;
  if (len >= 140 && len <= 160) return { score: 10, max: 10, detail: `${len} chars` };
  if (len >= 120 && len <= 170) return { score: 6, max: 10, detail: `${len} chars (aim for 140-160)` };
  if (len === 0) return { score: 0, max: 10, detail: 'missing' };
  return { score: 3, max: 10, detail: `${len} chars (${len < 120 ? 'too short' : 'too long'})` };
}

function scoreFaq(frontmatter) {
  const count = countFaqEntries(frontmatter);
  if (count >= 2) return { score: 10, max: 10, detail: `${count} FAQs` };
  if (count === 1) return { score: 5, max: 10, detail: '1 FAQ (aim for 2+)' };
  return { score: 0, max: 10, detail: 'no FAQs' };
}

function scoreInternalLinks(body, slug, outgoing) {
  const links = outgoing.get(slug);
  const count = links ? links.size : 0;
  if (count >= 3) return { score: 10, max: 10, detail: `${count} internal links` };
  if (count >= 1) return { score: Math.round(count / 3 * 10), max: 10, detail: `${count} internal links (aim for 3+)` };
  return { score: 0, max: 10, detail: 'no internal links' };
}

function scoreExternalLinks(body) {
  const matches = body.match(/\]\(https?:\/\//g);
  const count = matches ? matches.length : 0;
  if (count >= 1) return { score: 5, max: 5, detail: `${count} external links` };
  return { score: 0, max: 5, detail: 'no external links' };
}

function scoreWordCount(body) {
  const words = body.replace(/[#|*_`\-\[\]()>]/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
  if (words >= 800) return { score: 10, max: 10, detail: `${words} words` };
  if (words >= 400) return { score: 5, max: 10, detail: `${words} words (aim for 800+)` };
  return { score: 2, max: 10, detail: `${words} words (too short)` };
}

function scoreH2(body) {
  const matches = body.match(/^## /gm);
  const count = matches ? matches.length : 0;
  if (count >= 2) return { score: 5, max: 5, detail: `${count} H2s` };
  if (count === 1) return { score: 3, max: 5, detail: '1 H2' };
  return { score: 0, max: 5, detail: 'no H2 headings' };
}

function scoreImage(frontmatter) {
  const img = getFrontmatterValue(frontmatter, 'image');
  if (img) return { score: 5, max: 5, detail: 'yes' };
  return { score: 0, max: 5, detail: 'missing' };
}

function scoreTags(frontmatter) {
  const tags = parseTags(frontmatter);
  const count = tags.length;
  if (count >= 3 && count <= 5) return { score: 5, max: 5, detail: `${count} tags` };
  if (count >= 1) return { score: 3, max: 5, detail: `${count} tags (aim for 3-5)` };
  return { score: 0, max: 5, detail: 'no tags' };
}

function scoreOrphan(slug, incoming) {
  const inLinks = incoming.get(slug);
  const count = inLinks ? inLinks.size : 0;
  if (count >= 1) return { score: 10, max: 10, detail: `${count} incoming links` };
  return { score: 0, max: 10, detail: 'ORPHAN — no incoming links' };
}

function scoreLintClean(content) {
  let issues = 0;
  for (const { pattern } of OUTDATED_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) issues++;
  }
  if (issues === 0) return { score: 10, max: 10, detail: 'clean' };
  return { score: 0, max: 10, detail: `${issues} outdated patterns` };
}

function scoreComparisonTable(frontmatter, body) {
  const title = getFrontmatterValue(frontmatter, 'title') || '';
  const isListicle = /\d+\s+(?:best|top|essential|must-have)/i.test(title) ||
                     /\bvs\.?\b|comparison|compared/i.test(title);
  if (!isListicle) return null; // N/A

  const lines = body.split('\n');
  let tableRows = 0;
  for (const line of lines) {
    if (/^\|.+\|/.test(line.trim())) tableRows++;
    else if (tableRows > 0 && tableRows < 3) tableRows = 0;
  }
  if (tableRows >= 3) return { score: 10, max: 10, detail: 'has comparison table' };
  return { score: 0, max: 10, detail: 'no comparison table (listicle/comparison)' };
}

// ─── Score an Article ───────────────────────────────────────────────────────

function scoreArticle(filePath, slugMap, outgoing, incoming) {
  const content = readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = splitFrontmatterAndBody(content);
  const slug = deriveSlug(frontmatter, filePath);

  const criteria = [
    { name: 'Title', ...scoreTitle(frontmatter) },
    { name: 'Description', ...scoreDescription(frontmatter) },
    { name: 'FAQ', ...scoreFaq(frontmatter) },
    { name: 'Internal Links', ...scoreInternalLinks(body, slug, outgoing) },
    { name: 'External Links', ...scoreExternalLinks(body) },
    { name: 'Word Count', ...scoreWordCount(body) },
    { name: 'H2 Headings', ...scoreH2(body) },
    { name: 'Image', ...scoreImage(frontmatter) },
    { name: 'Tags', ...scoreTags(frontmatter) },
    { name: 'Not Orphan', ...scoreOrphan(slug, incoming) },
    { name: 'Lint Clean', ...scoreLintClean(content) },
  ];

  const tableScore = scoreComparisonTable(frontmatter, body);
  if (tableScore) criteria.push({ name: 'Table', ...tableScore });

  const earned = criteria.reduce((sum, c) => sum + c.score, 0);
  const max = criteria.reduce((sum, c) => sum + c.max, 0);
  const normalized = Math.round((earned / max) * 100);

  return { filePath, slug, normalized, earned, max, criteria };
}

// ─── Auto-Fix Functions ─────────────────────────────────────────────────────

function fixDescription(content) {
  const { frontmatter } = splitFrontmatterAndBody(content);
  const desc = getFrontmatterValue(frontmatter, 'description');
  if (!desc || desc.length <= 160) return { content, fixes: [] };

  // Truncate at last word boundary before 157 chars, add ...
  let truncated = desc.slice(0, 157);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 100) truncated = truncated.slice(0, lastSpace);
  truncated += '...';

  // Replace in content
  const newContent = content.replace(
    `description: "${desc}"`,
    `description: "${truncated}"`
  );

  if (newContent === content) return { content, fixes: [] };
  return {
    content: newContent,
    fixes: [`Truncated meta description (${desc.length} → ${truncated.length} chars)`],
  };
}

function fixLintPatterns(content) {
  let fixed = content;
  const fixes = [];

  for (const { pattern, fix } of OUTDATED_PATTERNS) {
    if (!fix) continue;
    pattern.lastIndex = 0;
    if (pattern.test(fixed)) {
      pattern.lastIndex = 0;
      const matches = fixed.match(pattern);
      fixed = fixed.replace(pattern, fix);
      fixes.push(`Fixed ${matches.length}x: ${pattern.source} → ${fix}`);
    }
  }

  return { content: fixed, fixes };
}

function fixInternalLinks(content, filePath, slugMap, outgoing) {
  const { frontmatter, body } = splitFrontmatterAndBody(content);
  const slug = deriveSlug(frontmatter, filePath);
  const currentLinks = outgoing.get(slug) || new Set();
  const currentTags = parseTags(frontmatter);

  if (currentLinks.size >= 3) return { content, fixes: [] };

  // Find candidate slugs that share tags and aren't already linked
  const candidates = [];
  for (const [candSlug, meta] of slugMap.entries()) {
    if (candSlug === slug) continue;
    if (currentLinks.has(candSlug)) continue;
    if (!meta.published) continue;

    // Score by shared tags
    const sharedTags = meta.tags.filter(t => currentTags.includes(t)).length;
    if (sharedTags === 0) continue;

    // Check if any title words appear in the body (min 2 non-trivial words)
    const titleWords = meta.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/)
      .filter(w => w.length > 3);
    const bodyLower = body.toLowerCase();
    const matchingWords = titleWords.filter(w => bodyLower.includes(w));

    if (matchingWords.length >= 2) {
      candidates.push({ slug: candSlug, title: meta.title, sharedTags, matchingWords: matchingWords.length });
    }
  }

  if (candidates.length === 0) return { content, fixes: [] };

  // Sort by relevance (shared tags + matching words)
  candidates.sort((a, b) => (b.sharedTags + b.matchingWords) - (a.sharedTags + a.matchingWords));

  // Take at most enough to reach 3 total links
  const needed = Math.min(3 - currentLinks.size, candidates.length, 3);
  const toAdd = candidates.slice(0, needed);

  // Append a Related Reading section if links to add
  const relatedSection = '\n\n---\n\n## Related Reading\n\n' +
    toAdd.map(c => `- [${c.title}](/${c.slug}/)`).join('\n') + '\n';

  // Check if there's already a Related Reading section
  if (/## Related Reading/i.test(body)) {
    // Append to existing section
    const newContent = content.replace(
      /(## Related Reading\n\n(?:- .+\n)*)/,
      '$1' + toAdd.map(c => `- [${c.title}](/${c.slug}/)`).join('\n') + '\n'
    );
    return {
      content: newContent,
      fixes: toAdd.map(c => `Added link: /${c.slug}/`),
    };
  }

  return {
    content: content.trimEnd() + relatedSection,
    fixes: toAdd.map(c => `Added link: /${c.slug}/`),
  };
}

// ─── Fix Orchestrator ───────────────────────────────────────────────────────

function fixArticle(filePath, slugMap, outgoing) {
  let content = readFileSync(filePath, 'utf-8');
  const allFixes = [];

  // 1. Fix lint patterns
  const lint = fixLintPatterns(content);
  content = lint.content;
  allFixes.push(...lint.fixes);

  // 2. Fix description length
  const desc = fixDescription(content);
  content = desc.content;
  allFixes.push(...desc.fixes);

  // 3. Fix internal links
  const links = fixInternalLinks(content, filePath, slugMap, outgoing);
  content = links.content;
  allFixes.push(...links.fixes);

  return { content, fixes: allFixes };
}

// ─── Report ─────────────────────────────────────────────────────────────────

function printScoreReport(results, belowThreshold) {
  // Sort by score ascending (worst first)
  results.sort((a, b) => a.normalized - b.normalized);

  const filtered = belowThreshold
    ? results.filter(r => r.normalized < belowThreshold)
    : results;

  for (const r of filtered) {
    const relPath = relative(process.cwd(), r.filePath);
    const color = r.normalized >= 90 ? '\x1b[32m' : r.normalized >= 70 ? '\x1b[33m' : '\x1b[31m';
    console.log(`  ${color}${String(r.normalized).padStart(3)}\x1b[0m  ${relPath}`);

    for (const c of r.criteria) {
      const icon = c.score === c.max ? '\x1b[32m✓\x1b[0m' : c.score > 0 ? '\x1b[33m~\x1b[0m' : '\x1b[31m✗\x1b[0m';
      console.log(`       ${icon} ${c.name}: ${c.detail} (${c.score}/${c.max})`);
    }
    console.log('');
  }

  // Summary
  console.log('─'.repeat(60));
  const avg = Math.round(results.reduce((s, r) => s + r.normalized, 0) / results.length);
  const below50 = results.filter(r => r.normalized < 50).length;
  const above90 = results.filter(r => r.normalized >= 90).length;
  console.log(`  Articles scored: ${results.length}`);
  console.log(`  Average score:   ${avg}/100`);
  console.log(`  \x1b[32m90+ (excellent):\x1b[0m  ${above90}`);
  console.log(`  \x1b[33m50-89 (okay):\x1b[0m     ${results.length - below50 - above90}`);
  console.log(`  \x1b[31mBelow 50:\x1b[0m         ${below50}`);
  console.log('');
}

function printFixReport(results) {
  for (const r of results) {
    if (r.fixes.length === 0) continue;
    const relPath = relative(process.cwd(), r.filePath);
    console.log(`\x1b[1m${relPath}\x1b[0m`);
    console.log(`  Before: ${r.beforeScore}/100`);
    for (const fix of r.fixes) {
      console.log(`  \x1b[32m✓\x1b[0m ${fix}`);
    }
    console.log(`  After:  ${r.afterScore}/100  (\x1b[32m+${r.afterScore - r.beforeScore}\x1b[0m)`);
    console.log('');
  }

  const fixed = results.filter(r => r.fixes.length > 0);
  console.log('─'.repeat(60));
  if (fixed.length === 0) {
    console.log(`\x1b[32m✓ Nothing to fix.\x1b[0m\n`);
  } else {
    const totalFixes = fixed.reduce((s, r) => s + r.fixes.length, 0);
    const avgImprovement = Math.round(fixed.reduce((s, r) => s + (r.afterScore - r.beforeScore), 0) / fixed.length);
    console.log(`  Files fixed:         ${fixed.length}`);
    console.log(`  Total fixes:         ${totalFixes}`);
    console.log(`  Avg improvement:     +${avgImprovement} points`);
    console.log('');
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const fixMode = args.includes('--fix');
  const belowIdx = args.indexOf('--below');
  const belowThreshold = belowIdx !== -1 ? parseInt(args[belowIdx + 1], 10) : null;
  const fileArgs = args.filter(a => a !== '--fix' && a !== '--below' && (belowIdx === -1 || a !== args[belowIdx + 1]));

  // Collect all files for slug map
  const allFiles = collectMarkdownFiles(BLOG_DIR);

  // Determine targets
  let targetFiles;
  if (fileArgs.length > 0) {
    targetFiles = fileArgs.map(f => resolve(f));
    for (const f of targetFiles) {
      try { statSync(f); } catch { console.error(`Error: File not found: ${f}`); process.exit(1); }
    }
  } else {
    targetFiles = allFiles;
  }

  console.log(`\nArticle Optimizer — ${fixMode ? 'fixing' : 'scoring'} ${targetFiles.length} file(s)...\n`);

  // Build slug map and link graph
  const slugMap = buildSlugMap(allFiles);
  const { outgoing, incoming } = buildLinkGraph(allFiles, slugMap);

  // Filter to published articles only (unless targeting specific files)
  if (fileArgs.length === 0) {
    targetFiles = targetFiles.filter(f => {
      const content = readFileSync(f, 'utf-8');
      const { frontmatter } = splitFrontmatterAndBody(content);
      return isPublished(frontmatter);
    });
  }

  if (fixMode) {
    const results = [];
    for (const filePath of targetFiles) {
      const before = scoreArticle(filePath, slugMap, outgoing, incoming);
      const { content, fixes } = fixArticle(filePath, slugMap, outgoing);

      if (fixes.length > 0) {
        writeFileSync(filePath, content, 'utf-8');
        // Rebuild link graph after fix (links may have changed)
        const { outgoing: newOut, incoming: newIn } = buildLinkGraph(allFiles, slugMap);
        const after = scoreArticle(filePath, slugMap, newOut, newIn);
        results.push({ filePath, beforeScore: before.normalized, afterScore: after.normalized, fixes });
      } else {
        results.push({ filePath, beforeScore: before.normalized, afterScore: before.normalized, fixes: [] });
      }
    }
    printFixReport(results);
  } else {
    const results = [];
    for (const filePath of targetFiles) {
      results.push(scoreArticle(filePath, slugMap, outgoing, incoming));
    }
    printScoreReport(results, belowThreshold);
  }
}

main();
