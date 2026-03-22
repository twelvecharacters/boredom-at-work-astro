const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'src/content/blog');
const assetsImagesDir = path.join(process.cwd(), 'src/assets/images');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
        } else if (entry.name.endsWith('.md')) {
            processMarkdown(fullPath);
        }
    }
}

function processMarkdown(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const imageMatch = content.match(/^image:\s*["']?(.+?)["']?\s*$/m);
    
    if (imageMatch) {
        const imagePath = imageMatch[1];
        if (imagePath.includes('assets/images/')) {
            const imageName = path.basename(imagePath);
            const sourceImagePath = path.join(assetsImagesDir, imageName);
            const targetImagePath = path.join(path.dirname(filePath), imageName);

            // Move image if it exists in assets
            if (fs.existsSync(sourceImagePath)) {
                console.log(`Moving ${imageName} to ${path.dirname(filePath)}`);
                fs.copyFileSync(sourceImagePath, targetImagePath);
                // We don't delete yet to avoid issues if multiple posts use the same image
            } else {
                console.warn(`Image not found: ${sourceImagePath}`);
            }

            // Update markdown content - use relative path for co-location
            const newImagePath = `./${imageName}`;
            content = content.replace(imagePath, newImagePath);
            
            // Also update any inline markdown images that might be using the old path
            const inlineRegex = new RegExp(imagePath.replace(/\./g, '\\.'), 'g');
            content = content.replace(inlineRegex, newImagePath);
            
            fs.writeFileSync(filePath, content);
        }
    }
}

console.log('Starting co-location migration...');
walk(blogDir);
console.log('Migration complete.');
