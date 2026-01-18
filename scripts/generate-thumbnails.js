import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/thumbnails';
const SIZE = 400;

async function generateThumbnails() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  const images = await glob(`${INPUT_DIR}/*.{jpg,jpeg,png,webp}`);
  console.log(`Found ${images.length} images to process.`);

  for (const imagePath of images) {
    const filename = path.basename(imagePath);
    const outputFileName = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    // Skip if thumbnail already exists and is newer than source
    if (fs.existsSync(outputPath)) {
      const sourceStat = fs.statSync(imagePath);
      const outputStat = fs.statSync(outputPath);
      if (outputStat.mtime > sourceStat.mtime) {
        console.log(`Skipping ${filename} (already exists)`);
        continue;
      }
    }

    try {
      await sharp(imagePath)
        .resize(SIZE, SIZE, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Generated thumbnail for: ${filename}`);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }

  console.log('Thumbnail generation complete.');
}

generateThumbnails().catch(console.error);
