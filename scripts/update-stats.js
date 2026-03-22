import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const readmePath = path.join(process.cwd(), 'README.md');

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function getStats() {
  const stats = {};
  
  // Recursively walk through directories
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        // Assume path structure src/content/blog/YYYY/MM/file.md
        const parts = fullPath.split(path.sep);
        // Find 'blog' index to get YYYY and MM
        const blogIndex = parts.indexOf('blog');
        if (blogIndex !== -1 && parts.length >= blogIndex + 3) {
          const year = parts[blogIndex + 1];
          const month = parts[blogIndex + 2];
          
          if (!stats[year]) stats[year] = {};
          if (!stats[year][month]) stats[year][month] = 0;
          stats[year][month]++;
        }
      }
    }
  }

  walk(blogDir);
  return stats;
}

function updateReadme() {
  const stats = getStats();
  const sortedYears = Object.keys(stats).sort((a, b) => b - a);
  
  let tableRows = '| Year | Month | Articles |\n| :--- | :--- | :--- |\n';
  let totalCount = 0;

  for (const year of sortedYears) {
    const months = Object.keys(stats[year]).sort((a, b) => b - a);
    for (const month of months) {
      const count = stats[year][month];
      totalCount += count;
      const monthInt = parseInt(month, 10);
      const monthName = monthNames[monthInt - 1] || 'Unknown';
      tableRows += `| ${year} | ${month} - ${monthName} | ${count} |\n`;
    }
  }
  
  tableRows += `| **Total** | | **${totalCount}** |\n`;

  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  
  // Replace the table content between headers and commands section
  // More robust regex for the Article Statistics section
  const startMarker = '## 📈 Article Statistics\n\n';
  const endMarker = '\n\n## 🧞 Commands';
  
  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = 
      readmeContent.slice(0, startIndex + startMarker.length) + 
      tableRows + 
      readmeContent.slice(endIndex);
    
    fs.writeFileSync(readmePath, newContent);
    console.log(`Updated README.md stats. Total articles: ${totalCount}`);
  } else {
    console.error('Could not find Article Statistics section in README.md');
  }
}

updateReadme();
