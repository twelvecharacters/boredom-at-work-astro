import fs from 'fs';

const deadLinksRaw = JSON.parse(fs.readFileSync('dead_links.json', 'utf8'));
const deadLinks = Object.keys(deadLinksRaw);
const articlesCsv = fs.readFileSync('scripts/articles.csv', 'utf8').split('\n').filter(Boolean);

// articles.csv format: "Title","Date","Tags"
// But how do we know the slug? The slug is usually the title slugified, or the filename without date.
// Wait, the slug is derived from the filename or the frontmatter. Let's just grep all markdown files for their slug!

const path = require('path');
const BLOG_DIR = path.resolve('src/content/blog');
const allSlugs = {};

function getMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const mdFiles = getMarkdownFiles(BLOG_DIR);
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let slugMatch = content.match(/^slug:\s*['"]?([^'"\n]+)['"]?/m);
  let slug = slugMatch ? slugMatch[1] : path.basename(file, '.md').replace(/^\d+-/, '');
  allSlugs[slug] = file;
}

for (const link of deadLinks) {
  if (link === 'Total dead links: 81') continue;
  const cleanLink = link.replace(/^\//, '').replace(/\/$/, '');
  const basename = path.basename(cleanLink);
  
  // Is there a slug that matches closely?
  const possibleMatch = Object.keys(allSlugs).find(s => s === cleanLink || s === basename || s.includes(cleanLink.split('-')[0]));
  console.log(`Dead link: ${link} -> Potential fix: /${possibleMatch || 'UNKNOWN'}/`);
}
