import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const BLOG_DIR = path.resolve('src/content/blog');

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
let deadLinksCount = 0;
const deadLinksMap = {};

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Match standard markdown links: [text](/link) or [text](/link/)
  const regex = /\[.*?\]\((\/[^)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let link = match[1];
    // Remove hash
    link = link.split('#')[0];
    if (link === '/') continue; // home page
    
    const cleanLink = link.replace(/^\//, '').replace(/\/$/, '');
    
    const p1 = path.join(DIST_DIR, cleanLink, 'index.html');
    const p2 = path.join(DIST_DIR, cleanLink + '.html');
    const p3 = path.join(DIST_DIR, cleanLink);
    
    let exists = false;
    if (fs.existsSync(p1)) exists = true;
    else if (fs.existsSync(p2)) exists = true;
    else if (fs.existsSync(p3)) exists = true;
    
    if (!exists) {
      const pubPath = path.join(path.resolve('public'), link);
      if (fs.existsSync(pubPath)) {
        exists = true;
      }
    }
    
    if (!exists) {
      if (!deadLinksMap[link]) {
        deadLinksMap[link] = [];
      }
      deadLinksMap[link].push(path.relative(process.cwd(), file));
      deadLinksCount++;
    }
  }
}

console.log(JSON.stringify(deadLinksMap, null, 2));
console.log(`Total dead links: ${deadLinksCount}`);
