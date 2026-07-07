import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.resolve('src/content/blog');
const allSlugs = new Set();

function getMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
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
  const slugMatch = content.match(/^slug:\s*['"]?([^'"\n]+)['"]?/m);
  const slug = slugMatch ? slugMatch[1] : path.basename(file, '.md').replace(/^\d+-/, '');
  allSlugs.add(slug);
}

const deadLinksRaw = JSON.parse(fs.readFileSync('dead_links.json', 'utf8'));
const deadLinks = Object.keys(deadLinksRaw);
for (const link of deadLinks) {
  if (link === 'Total dead links: 81') continue;
  const cleanLink = link.replace(/^\//, '').replace(/\/$/, '');
  
  if (allSlugs.has(cleanLink)) {
    console.log(`VALID SLUG (future dated): ${cleanLink}`);
  } else {
    console.log(`INVALID SLUG: ${cleanLink}`);
  }
}
