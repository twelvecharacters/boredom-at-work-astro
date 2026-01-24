#!/usr/bin/env node

/**
 * Migration script to organize blog articles into year/month directories
 * while preserving their URLs through slug-based routing.
 * 
 * This script:
 * 1. Reads all .md files from /src/content/blog/ (excluding subdirectories)
 * 2. Parses frontmatter to extract publishDate
 * 3. Adds a slug field to preserve the current URL
 * 4. Moves files to /src/content/blog/YYYY/MM/ based on publishDate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const frontmatterText = match[1];
  const frontmatter = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterText.split(/\r?\n/);
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  }
  
  return { frontmatter, fullMatch: match[0] };
}

// Update frontmatter with slug field
function addSlugToFrontmatter(content, slug) {
  const { frontmatter, fullMatch } = parseFrontmatter(content);
  
  if (!fullMatch) {
    console.error('No frontmatter found');
    return content;
  }
  
  // Check if slug already exists
  if (frontmatter.slug) {
    console.log(`  Slug already exists: ${frontmatter.slug}`);
    return content;
  }
  
  // Insert slug field after the title
  const lines = fullMatch.split(/\r?\n/);
  const newLines = [];
  let slugAdded = false;
  
  for (const line of lines) {
    newLines.push(line);
    if (!slugAdded && line.startsWith('title:')) {
      newLines.push(`slug: "${slug}"`);
      slugAdded = true;
    }
  }
  
  const newFrontmatter = newLines.join('\n');
  return content.replace(fullMatch, newFrontmatter);
}

// Get year and month from date string
function getYearMonth(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return { year, month };
}

// Main migration function
function migrateArticles() {
  console.log('Starting article migration...\n');
  
  // Get all .md files in the root blog directory
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => {
      const fullPath = path.join(BLOG_DIR, file);
      return file.endsWith('.md') && fs.statSync(fullPath).isFile();
    });
  
  if (files.length === 0) {
    console.log('No articles to migrate!');
    return;
  }
  
  console.log(`Found ${files.length} articles to migrate:\n`);
  
  const results = {
    success: [],
    skipped: [],
    errors: []
  };
  
  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const slug = filename.replace('.md', '');
    
    console.log(`Processing: ${filename}`);
    
    try {
      // Read file content
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Parse frontmatter to get publishDate
      const { frontmatter } = parseFrontmatter(content);
      
      if (!frontmatter.publishDate) {
        console.log(`  ⚠️  No publishDate found, skipping`);
        results.skipped.push({ filename, reason: 'No publishDate' });
        continue;
      }
      
      // Get year/month from publishDate
      const { year, month } = getYearMonth(frontmatter.publishDate);
      
      // Create target directory
      const targetDir = path.join(BLOG_DIR, String(year), month);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`  📁 Created directory: ${year}/${month}/`);
      }
      
      // Add slug to frontmatter
      const updatedContent = addSlugToFrontmatter(content, slug);
      
      // Write to new location
      const targetPath = path.join(targetDir, filename);
      fs.writeFileSync(targetPath, updatedContent, 'utf-8');
      console.log(`  ✅ Moved to: ${year}/${month}/${filename}`);
      
      // Delete original file
      fs.unlinkSync(filePath);
      
      results.success.push({
        filename,
        from: filename,
        to: `${year}/${month}/${filename}`,
        slug
      });
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      results.errors.push({ filename, error: error.message });
    }
    
    console.log('');
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully migrated: ${results.success.length}`);
  console.log(`⚠️  Skipped: ${results.skipped.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  
  if (results.success.length > 0) {
    console.log('\nMigrated articles:');
    results.success.forEach(({ filename, to, slug }) => {
      console.log(`  • ${filename} → ${to}`);
      console.log(`    URL: /${slug}/`);
    });
  }
  
  if (results.skipped.length > 0) {
    console.log('\nSkipped articles:');
    results.skipped.forEach(({ filename, reason }) => {
      console.log(`  • ${filename} (${reason})`);
    });
  }
  
  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(({ filename, error }) => {
      console.log(`  • ${filename}: ${error}`);
    });
  }
  
  console.log('\n✨ Migration complete!\n');
}

// Run migration
migrateArticles();
