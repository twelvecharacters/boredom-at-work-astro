#!/usr/bin/env node

/**
 * Content Linting Script for boredom-at-work.com
 *
 * Checks blog markdown files for:
 * 1. Outdated patterns (URLs, model names, product names)
 * 2. Listicle heading count consistency
 * 3. Price consistency within articles
 * 4. Meta description length
 *
 * Usage:
 *   node scripts/content-lint.js                          # Lint all blog posts
 *   node scripts/content-lint.js src/content/blog/2026/02/my-post.md  # Lint one file
 *
 * Exit codes:
 *   0 — All clean
 *   1 — Errors found
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// ─── Configuration ──────────────────────────────────────────────────────────

const BLOG_DIR = resolve('src/content/blog');

const OUTDATED_PATTERNS = [
  {
    pattern: /chat\.openai\.com/g,
    message: '`chat.openai.com` is outdated — use `chatgpt.com`',
    severity: 'error',
  },
  {
    pattern: /Claude 3\.5(?! Sonnet\b| Haiku\b| Opus\b)/g,
    message: '`Claude 3.5` without model suffix — verify this is still current',
    severity: 'warning',
  },
  {
    pattern: /Claude 3\.5 Sonnet/g,
    message: '`Claude 3.5 Sonnet` is outdated — current models are Claude 4 Sonnet / Opus',
    severity: 'error',
  },
  {
    pattern: /Claude 3\.5 Haiku/g,
    message: '`Claude 3.5 Haiku` is outdated — current model is Claude 4 Haiku',
    severity: 'error',
  },
  {
    pattern: /Claude 3 Opus/g,
    message: '`Claude 3 Opus` is outdated — current model is Claude Opus 4',
    severity: 'error',
  },
  {
    pattern: /Gemini 1\.5/g,
    message: '`Gemini 1.5` is outdated — current models are Gemini 2.x',
    severity: 'error',
  },
  {
    pattern: /\bNikon Z50\b(?!\s*II)/g,
    message: '`Nikon Z50` without "II" — the original Z50 is discontinued, use `Nikon Z50 II`',
    severity: 'warning',
  },
  {
    pattern: /\bSony a6100\b/g,
    message: '`Sony a6100` is discontinued — consider updating to current model',
    severity: 'warning',
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Collect all .md files recursively from a directory.
 */
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

/**
 * Split a markdown file into frontmatter (YAML string) and body (markdown string).
 * Returns { frontmatter, body, frontmatterEndLine } where frontmatterEndLine is
 * the 1-based line number of the closing `---`.
 */
function splitFrontmatterAndBody(content) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') {
    return { frontmatter: '', body: content, frontmatterEndLine: 0 };
  }
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      closingIndex = i;
      break;
    }
  }
  if (closingIndex === -1) {
    return { frontmatter: '', body: content, frontmatterEndLine: 0 };
  }
  return {
    frontmatter: lines.slice(1, closingIndex).join('\n'),
    body: lines.slice(closingIndex + 1).join('\n'),
    frontmatterEndLine: closingIndex + 1, // 1-based
  };
}

/**
 * Extract a simple frontmatter value by key (single-line string values only).
 */
function getFrontmatterValue(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))$`, 'm');
  const match = frontmatter.match(regex);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3]).trim();
}

/**
 * Extract all FAQ entries from frontmatter YAML (simple parser, no deps).
 * Returns array of { question, answer, lineNum }.
 */
function extractFaqEntries(frontmatter, startLine) {
  const faqs = [];
  const lines = frontmatter.split('\n');
  let inFaq = false;
  let currentFaq = null;
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = startLine + i; // 1-based line in original file

    if (/^faq:/.test(line)) {
      inFaq = true;
      continue;
    }

    if (inFaq) {
      // New top-level key ends the faq block
      if (/^\S/.test(line) && !/^\s*-/.test(line) && !/^\s/.test(line)) {
        if (currentFaq) faqs.push(currentFaq);
        break;
      }

      const questionMatch = line.match(/^\s+-\s+question:\s*(?:"([^"]*)"|'([^']*)'|(.+))$/);
      if (questionMatch) {
        if (currentFaq) faqs.push(currentFaq);
        currentFaq = { question: (questionMatch[1] ?? questionMatch[2] ?? questionMatch[3]).trim(), answer: '', lineNum };
        currentKey = 'question';
        continue;
      }

      const answerMatch = line.match(/^\s+answer:\s*(?:"([^"]*)"|'([^']*)'|(.+))$/);
      if (answerMatch) {
        if (currentFaq) {
          currentFaq.answer = (answerMatch[1] ?? answerMatch[2] ?? answerMatch[3]).trim();
          currentFaq.answerLineNum = lineNum;
        }
        currentKey = 'answer';
        continue;
      }
    }
  }
  if (currentFaq) faqs.push(currentFaq);
  return faqs;
}

/**
 * Extract all dollar prices from a string.
 * Returns array of { raw, normalized, index }.
 * Normalizes prices: strips ~, removes commas, lowercases /mo /month etc.
 */
function extractPrices(text) {
  const priceRegex = /~?\$[\d,]+(?:\.\d{1,2})?(?:\s*(?:\/\s*(?:mo(?:nth)?|year|yr))?)?/gi;
  const prices = [];
  let match;
  while ((match = priceRegex.exec(text)) !== null) {
    const raw = match[0];
    // Normalize: strip ~, remove commas, lowercase
    const normalized = raw
      .replace(/^~/, '')
      .replace(/,/g, '')
      .replace(/\s+/g, '')
      .toLowerCase()
      .replace(/\/month/, '/mo')
      .replace(/\/year/, '/yr');
    prices.push({ raw, normalized, index: match.index });
  }
  return prices;
}

/**
 * Find the 1-based line number for a character index in content.
 */
function lineNumberAt(content, charIndex) {
  let line = 1;
  for (let i = 0; i < charIndex && i < content.length; i++) {
    if (content[i] === '\n') line++;
  }
  return line;
}

// ─── Lint Checks ────────────────────────────────────────────────────────────

function checkOutdatedPatterns(content, filePath) {
  const issues = [];
  const lines = content.split('\n');

  for (const { pattern, message, severity } of OUTDATED_PATTERNS) {
    // Reset regex lastIndex
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const lineNum = lineNumberAt(content, match.index);
      issues.push({ filePath, lineNum, severity, message: message });
    }
  }

  return issues;
}

function checkListicleConsistency(content, filePath) {
  const issues = [];
  const { frontmatter, body, frontmatterEndLine } = splitFrontmatterAndBody(content);

  const title = getFrontmatterValue(frontmatter, 'title');
  if (!title) return issues;

  // Extract number from title (e.g., "15 Best AI Tools" or "19 Prompts")
  const titleNumberMatch = title.match(/\b(\d+)\s+(?:best|top|essential|proven|free|must-have|favorite|worst|common|things|prompts|tips|tricks|ways|tools|reasons|mistakes|sites|apps|ideas)/i);
  if (!titleNumberMatch) return issues;

  const expectedCount = parseInt(titleNumberMatch[1], 10);

  // Find ALL numbered headings in body: ### 1. or ## 1. patterns
  const bodyLines = body.split('\n');
  const allNumbered = [];

  for (let i = 0; i < bodyLines.length; i++) {
    const headingMatch = bodyLines[i].match(/^(#{2,4})\s+(\d+)\.\s/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const num = parseInt(headingMatch[2], 10);
      allNumbered.push({
        num,
        level,
        lineNum: frontmatterEndLine + 1 + i, // offset by frontmatter
        lineIndex: i,
      });
    }
  }

  if (allNumbered.length === 0) return issues;

  // Identify the "primary list" — the first contiguous ascending run that starts at 1.
  // Articles may have secondary numbered sections (e.g., "What to check: ### 1. ...").
  // Strategy: find the longest run starting at 1 at a consistent heading level.
  let primaryList = [];
  let bestRun = [];

  for (let start = 0; start < allNumbered.length; start++) {
    if (allNumbered[start].num !== 1) continue;
    const level = allNumbered[start].level;
    const run = [allNumbered[start]];
    let expected = 2;
    for (let j = start + 1; j < allNumbered.length; j++) {
      if (allNumbered[j].level === level && allNumbered[j].num === expected) {
        run.push(allNumbered[j]);
        expected++;
      } else if (allNumbered[j].level === level && allNumbered[j].num === 1) {
        // A new numbered sequence started at the same level — stop this run
        break;
      }
      // Skip headings at different levels (sub-items)
    }
    if (run.length > bestRun.length) {
      bestRun = run;
    }
  }

  primaryList = bestRun.length > 0 ? bestRun : allNumbered;

  // If we identified a clean primary list, use it; otherwise fall back to all
  const foundNumbers = primaryList;
  const actualCount = foundNumbers.length;

  // Check count mismatch
  if (actualCount !== expectedCount) {
    issues.push({
      filePath,
      lineNum: 1, // title line
      severity: 'error',
      message: `Title claims ${expectedCount} items but found ${actualCount} numbered headings in primary list`,
    });
  }

  // Check for numbering gaps within the primary list
  for (let i = 0; i < foundNumbers.length - 1; i++) {
    const current = foundNumbers[i].num;
    const next = foundNumbers[i + 1].num;
    if (next !== current + 1) {
      const missingNums = [];
      for (let n = current + 1; n < next; n++) {
        missingNums.push(n);
      }
      issues.push({
        filePath,
        lineNum: foundNumbers[i + 1].lineNum,
        severity: 'error',
        message: `Numbering gap: #${current} → #${next} (missing: ${missingNums.join(', ')})`,
      });
    }
  }

  // Check if numbering starts at 1
  if (foundNumbers[0].num !== 1) {
    issues.push({
      filePath,
      lineNum: foundNumbers[0].lineNum,
      severity: 'warning',
      message: `Numbered headings start at ${foundNumbers[0].num} instead of 1`,
    });
  }

  return issues;
}

function checkPriceConsistency(content, filePath) {
  const issues = [];
  const { frontmatter, body, frontmatterEndLine } = splitFrontmatterAndBody(content);

  // Extract prices from FAQ answers in frontmatter
  const faqEntries = extractFaqEntries(frontmatter, 2); // frontmatter starts at line 2
  const faqPrices = [];
  for (const faq of faqEntries) {
    const prices = extractPrices(faq.answer);
    for (const p of prices) {
      faqPrices.push({ ...p, source: 'faq', lineNum: faq.answerLineNum || faq.lineNum });
    }
  }

  // Extract prices from body
  const bodyLines = body.split('\n');
  const bodyPrices = [];
  for (let i = 0; i < bodyLines.length; i++) {
    const prices = extractPrices(bodyLines[i]);
    for (const p of prices) {
      bodyPrices.push({ ...p, source: 'body', lineNum: frontmatterEndLine + 1 + i });
    }
  }

  // Check for FAQ prices that appear differently in body
  for (const faqPrice of faqPrices) {
    for (const bodyPrice of bodyPrices) {
      // Same raw text means same price — skip
      if (faqPrice.normalized === bodyPrice.normalized) continue;

      // Check if they refer to the same product/context by comparing nearby text
      // Simple heuristic: if both contain the same dollar amount base but differ,
      // that's a potential mismatch. We compare prices that share the same base number
      // pattern but differ in value.
      const faqBase = faqPrice.normalized.replace(/[^0-9.]/g, '');
      const bodyBase = bodyPrice.normalized.replace(/[^0-9.]/g, '');

      // Only flag if the raw prices look like they could be the same thing
      // (same suffix like /mo) but different amounts
      const faqSuffix = faqPrice.normalized.replace(/\$[\d.]+/, '');
      const bodySuffix = bodyPrice.normalized.replace(/\$[\d.]+/, '');
      if (faqSuffix === bodySuffix && faqBase !== bodyBase) {
        // This is a potential mismatch — but we need more context to avoid false positives
        // Skip if both are clearly different products (different amounts in different contexts)
      }
    }
  }

  // Check for contradictory prices within the body itself
  // Group prices by their "product context" — same line or nearby lines with same product name
  // Simpler approach: find duplicate product+price patterns that conflict
  const allPricesInArticle = [...faqPrices, ...bodyPrices];

  // Build a map of "price label" → values seen
  // Look for patterns like "ProductName ... $X" or "$X/mo" appearing with different values
  const contentLines = content.split('\n');
  const priceMentions = new Map(); // normalized-suffix → [{ value, lineNum, raw }]

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    const lineNum = i + 1;

    // Find patterns like "Product: $X" or "Product ($X/mo)" or "**$X/month**"
    const contextPriceRegex = /(\b[A-Z][\w\s]*?)\s*(?:[:(\-—])\s*(~?\$[\d,]+(?:\.\d{1,2})?(?:\s*\/\s*(?:mo(?:nth)?|year|yr))?)/gi;
    let m;
    while ((m = contextPriceRegex.exec(line)) !== null) {
      const label = m[1].trim().toLowerCase().replace(/\s+/g, ' ');
      const priceRaw = m[2];
      const priceNorm = priceRaw
        .replace(/^~/, '')
        .replace(/,/g, '')
        .replace(/\s+/g, '')
        .toLowerCase()
        .replace(/\/month/, '/mo')
        .replace(/\/year/, '/yr');
      const value = priceNorm.replace(/[^0-9.]/g, '');

      if (!priceMentions.has(label)) {
        priceMentions.set(label, []);
      }
      priceMentions.get(label).push({ value, lineNum, raw: priceRaw, normalized: priceNorm });
    }
  }

  // Check for conflicting prices under the same label
  for (const [label, mentions] of priceMentions) {
    if (mentions.length < 2) continue;
    const uniqueValues = [...new Set(mentions.map(m => m.value))];
    if (uniqueValues.length > 1) {
      const first = mentions[0];
      const conflicting = mentions.find(m => m.value !== first.value);
      issues.push({
        filePath,
        lineNum: conflicting.lineNum,
        severity: 'warning',
        message: `Price mismatch for "${label}": ${first.raw} (line ${first.lineNum}) vs ${conflicting.raw} (line ${conflicting.lineNum})`,
      });
    }
  }

  return issues;
}

function checkMetaDescriptionLength(content, filePath) {
  const issues = [];
  const { frontmatter } = splitFrontmatterAndBody(content);
  const description = getFrontmatterValue(frontmatter, 'description');

  if (!description) {
    issues.push({
      filePath,
      lineNum: 1,
      severity: 'warning',
      message: 'Missing meta description',
    });
    return issues;
  }

  if (description.length > 160) {
    // Find the actual line number of the description
    const lines = content.split('\n');
    let descLine = 1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('description:')) {
        descLine = i + 1;
        break;
      }
    }
    issues.push({
      filePath,
      lineNum: descLine,
      severity: 'warning',
      message: `Meta description is ${description.length} characters (max 160): "${description.slice(0, 60)}..."`,
    });
  }

  return issues;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function lintFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const issues = [
    ...checkOutdatedPatterns(content, filePath),
    ...checkListicleConsistency(content, filePath),
    ...checkPriceConsistency(content, filePath),
    ...checkMetaDescriptionLength(content, filePath),
  ];
  return issues;
}

function main() {
  const args = process.argv.slice(2);
  let files;

  if (args.length > 0) {
    // Lint specific file(s)
    files = args.map(f => resolve(f));
    // Verify they exist
    for (const f of files) {
      try {
        statSync(f);
      } catch {
        console.error(`Error: File not found: ${f}`);
        process.exit(1);
      }
    }
  } else {
    // Lint all blog posts
    files = collectMarkdownFiles(BLOG_DIR);
  }

  console.log(`\nContent Lint — scanning ${files.length} file(s)...\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithIssues = 0;

  for (const filePath of files) {
    const issues = lintFile(filePath);
    if (issues.length === 0) continue;

    filesWithIssues++;
    const relPath = relative(process.cwd(), filePath);
    console.log(`\x1b[1m${relPath}\x1b[0m`);

    // Sort issues by line number
    issues.sort((a, b) => a.lineNum - b.lineNum);

    for (const issue of issues) {
      const icon = issue.severity === 'error' ? '\x1b[31mERROR\x1b[0m' : '\x1b[33mWARN\x1b[0m';
      console.log(`  line ${String(issue.lineNum).padStart(4)}  ${icon}  ${issue.message}`);
      if (issue.severity === 'error') totalErrors++;
      else totalWarnings++;
    }
    console.log('');
  }

  // Summary
  console.log('─'.repeat(60));
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log(`\x1b[32m✓ All ${files.length} files clean.\x1b[0m\n`);
    process.exit(0);
  } else {
    console.log(
      `${filesWithIssues} file(s) with issues: ` +
      `\x1b[31m${totalErrors} error(s)\x1b[0m, ` +
      `\x1b[33m${totalWarnings} warning(s)\x1b[0m\n`
    );
    process.exit(totalErrors > 0 ? 1 : 0);
  }
}

main();
