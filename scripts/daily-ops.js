#!/usr/bin/env node

/**
 * Daily Content Operations Dashboard for boredom-at-work.com
 *
 * Scans all articles and produces a daily status report:
 * - What's publishing today and this week
 * - Articles needing SEO attention
 * - Orphan articles (no incoming links)
 * - Content lint summary
 * - Satellite & marketing status reminders
 *
 * Usage:
 *   node scripts/daily-ops.js          # Full daily report
 *   npm run daily                      # Same via npm
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// ─── Configuration ──────────────────────────────────────────────────────────

const BLOG_DIR = resolve('src/content/blog');

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
  if (lines[0].trim() !== '---') return { frontmatter: '', body: content };
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { closingIndex = i; break; }
  }
  if (closingIndex === -1) return { frontmatter: '', body: content };
  return {
    frontmatter: lines.slice(1, closingIndex).join('\n'),
    body: lines.slice(closingIndex + 1).join('\n'),
  };
}

function getFrontmatterValue(fm, key) {
  const regex = new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))$`, 'm');
  const match = fm.match(regex);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3]).trim();
}

function deriveSlug(fm, filePath) {
  const explicit = getFrontmatterValue(fm, 'slug');
  if (explicit) return explicit;
  return filePath.split('/').pop().replace(/\.md$/, '');
}

function parseTags(fm) {
  const match = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (!match) return [];
  return match[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
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

    // Count internal links
    const internalLinkRegex = /\]\(\/([\w-]+)\/?(?:#[\w-]*)?\)/g;
    const outLinks = new Set();
    let match;
    while ((match = internalLinkRegex.exec(body)) !== null) {
      if (match[1] !== slug) outLinks.add(match[1]);
    }

    // Count external links
    const extLinks = (body.match(/\]\(https?:\/\//g) || []).length;

    // Word count
    const words = body.replace(/[#|*_`\-\[\]()>]/g, ' ').split(/\s+/).filter(w => w.length > 0).length;

    // FAQ count
    const faqCount = (frontmatter.match(/- question:/g) || []).length;

    articles.push({
      filePath, title, slug, pubDate, draft, description, tags, image,
      outLinks, extLinks, words, faqCount,
    });
  }

  // Build incoming link map
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

// ─── Report Sections ────────────────────────────────────────────────────────

function reportToday(articles, today) {
  const todayStr = formatDate(today);
  const todayArticles = articles.filter(a => a.pubDate === todayStr && !a.draft);

  console.log('\x1b[1m📅 TODAY (' + todayStr + ')\x1b[0m');
  if (todayArticles.length === 0) {
    console.log('   No articles publishing today.\n');
  } else {
    for (const a of todayArticles) {
      console.log(`   \x1b[32m●\x1b[0m ${a.title}`);
      console.log(`     /${a.slug}/`);
    }
    console.log('');
  }
}

function reportThisWeek(articles, today) {
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()));
  const todayStr = formatDate(today);
  const weekEndStr = formatDate(weekEnd);

  const weekArticles = articles
    .filter(a => a.pubDate > todayStr && a.pubDate <= weekEndStr && !a.draft)
    .sort((a, b) => a.pubDate.localeCompare(b.pubDate));

  console.log('\x1b[1m📆 REST OF THE WEEK\x1b[0m');
  if (weekArticles.length === 0) {
    console.log('   No more articles this week.\n');
  } else {
    for (const a of weekArticles) {
      console.log(`   ${a.pubDate}  ${a.title}`);
    }
    console.log('');
  }
}

function reportStats(articles, today) {
  const todayStr = formatDate(today);
  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);
  const scheduled = articles.filter(a => a.pubDate > todayStr && !a.draft);
  const drafts = articles.filter(a => a.draft);

  console.log('\x1b[1m📊 CONTENT STATS\x1b[0m');
  console.log(`   Published:  ${published.length}`);
  console.log(`   Scheduled:  ${scheduled.length}`);
  console.log(`   Drafts:     ${drafts.length}`);
  console.log(`   Total:      ${articles.length}`);
  console.log('');
}

function reportOrphans(articles, incoming, today) {
  const todayStr = formatDate(today);
  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);
  const orphans = published.filter(a => {
    const inc = incoming.get(a.slug);
    return !inc || inc.size === 0;
  });

  console.log('\x1b[1m🔗 ORPHAN ARTICLES (no incoming links)\x1b[0m');
  if (orphans.length === 0) {
    console.log('   \x1b[32m✓ No orphans!\x1b[0m\n');
  } else {
    for (const a of orphans) {
      console.log(`   \x1b[31m●\x1b[0m ${a.title}`);
      console.log(`     /${a.slug}/`);
    }
    console.log(`\n   ${orphans.length} orphan(s) need incoming links.\n`);
  }
}

function reportSEOIssues(articles, incoming, today) {
  const todayStr = formatDate(today);
  const published = articles.filter(a => a.pubDate <= todayStr && !a.draft);
  const issues = [];

  for (const a of published) {
    const problems = [];
    if (a.title.length < 40 || a.title.length > 70) problems.push(`Title: ${a.title.length} chars`);
    if (a.description.length < 120 || a.description.length > 170) problems.push(`Desc: ${a.description.length} chars`);
    if (a.faqCount === 0) problems.push('No FAQs');
    if (a.outLinks.size < 3) problems.push(`${a.outLinks.size} internal links`);
    if (a.extLinks === 0) problems.push('No external links');
    if (a.words < 800) problems.push(`${a.words} words`);
    if (!a.image) problems.push('No image');

    if (problems.length >= 2) {
      issues.push({ ...a, problems });
    }
  }

  issues.sort((a, b) => b.problems.length - a.problems.length);

  console.log('\x1b[1m⚠️  SEO ATTENTION NEEDED (2+ issues)\x1b[0m');
  if (issues.length === 0) {
    console.log('   \x1b[32m✓ All articles look good!\x1b[0m\n');
  } else {
    for (const a of issues.slice(0, 10)) {
      console.log(`   \x1b[33m●\x1b[0m ${a.title}`);
      console.log(`     ${a.problems.join(' · ')}`);
    }
    if (issues.length > 10) console.log(`   ... and ${issues.length - 10} more`);
    console.log('');
  }
}

function reportUpcoming(articles, today) {
  const todayStr = formatDate(today);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 14);
  const nextWeekStr = formatDate(nextWeek);

  const upcoming = articles
    .filter(a => a.pubDate > todayStr && a.pubDate <= nextWeekStr && !a.draft)
    .sort((a, b) => a.pubDate.localeCompare(b.pubDate));

  console.log('\x1b[1m🔜 NEXT 14 DAYS\x1b[0m');
  if (upcoming.length === 0) {
    console.log('   No articles scheduled.\n');
  } else {
    for (const a of upcoming) {
      const flags = [];
      if (a.faqCount === 0) flags.push('⚠️ no FAQ');
      if (a.outLinks.size < 3) flags.push('⚠️ few links');
      if (a.extLinks === 0) flags.push('⚠️ no ext links');
      const flagStr = flags.length > 0 ? `  ${flags.join(' ')}` : '';
      console.log(`   ${a.pubDate}  ${a.title}${flagStr}`);
    }
    console.log('');
  }
}

function reportReminders() {
  console.log('\x1b[1m📋 REMINDERS\x1b[0m');
  console.log('   • Quora: aim for 1 link post per session');
  console.log('   • GSC: submit up to 10 URLs/day if pending');
  console.log('   • Content Lint: run npm run lint:content');
  console.log('   • Optimizer: run npm run optimize -- --below 90');
  console.log('   • JUSTWAY: check payment status');
  console.log('   • HackerNoon: check unblock status');
  console.log('   • Google Core Update: monitor until ~Apr 10');
  console.log('');
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allFiles = collectMarkdownFiles(BLOG_DIR);
  const { articles, incoming } = collectArticleData(allFiles);

  console.log('\n' + '═'.repeat(60));
  console.log('  \x1b[1mDAILY CONTENT OPS — boredom-at-work.com\x1b[0m');
  console.log('  ' + formatDate(today));
  console.log('═'.repeat(60) + '\n');

  reportToday(articles, today);
  reportThisWeek(articles, today);
  reportStats(articles, today);
  reportOrphans(articles, incoming, today);
  reportSEOIssues(articles, incoming, today);
  reportUpcoming(articles, today);
  reportReminders();

  console.log('═'.repeat(60));
  console.log('  Run: npm run lint:content | npm run optimize -- --below 90');
  console.log('═'.repeat(60) + '\n');
}

main();
