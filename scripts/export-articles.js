import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const outputFile = path.join(__dirname, '.', 'articles.csv');

function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getMarkdownFiles(blogDir);

const csvRows = [['Title', 'Publish Date', 'Categories/Tags']];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  const titleMatch = content.match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.*))$/m);
  const dateMatch = content.match(/^publishDate:\s*(.*)$/m);
  const categoryMatch = content.match(/^category:\s*(?:"([^"]+)"|'([^']+)'|(.*))$/m);
  const tagsMatch = content.match(/^tags:\s*\[(.*?)\]$/m);

  let title = '';
  if (titleMatch) title = titleMatch[1] || titleMatch[2] || titleMatch[3] || '';
  
  let date = '';
  if (dateMatch) date = dateMatch[1].trim();

  let categories = '';
  if (categoryMatch) {
    categories = categoryMatch[1] || categoryMatch[2] || categoryMatch[3] || '';
  } else if (tagsMatch) {
    // If no category is found, fallback to tags
    categories = tagsMatch[1].replace(/["']/g, '').split(',').map(t => t.trim()).join(', ');
  }

  // Escape quotes in title
  title = title.trim().replace(/"/g, '""');
  categories = categories.trim().replace(/"/g, '""');

  csvRows.push([`"${title}"`, `"${date}"`, `"${categories}"`]);
}

const csvData = csvRows.map(row => row.join(',')).join('\n');
fs.writeFileSync(outputFile, csvData, 'utf8');

console.log(`Exported ${files.length} articles to ${outputFile}`);
