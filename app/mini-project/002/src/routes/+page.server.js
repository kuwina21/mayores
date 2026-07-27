import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export function load() {
  const galleryDir = path.resolve('static/Gallery');
  
  try {
    const files = fs.readdirSync(galleryDir);
    
    // Load captions if exists
    let captions = {};
    const captionsPath = path.join(galleryDir, 'captions.json');
    if (fs.existsSync(captionsPath)) {
      try {
        const captionsRaw = fs.readFileSync(captionsPath, 'utf-8');
        captions = JSON.parse(captionsRaw);
      } catch (err) {
        console.warn('Failed to parse captions.json:', err);
      }
    }

    // Load positions if exists
    let positions = {};
    const positionsPath = path.join(galleryDir, 'positions.json');
    if (fs.existsSync(positionsPath)) {
      try {
        const positionsRaw = fs.readFileSync(positionsPath, 'utf-8');
        positions = JSON.parse(positionsRaw);
      } catch (err) {}
    }

    // Filter for common image extensions (including uppercase .JPG)
    const carouselImages = new Set();
    Object.values(captions).forEach(item => {
      if (item.carousel) {
        item.carousel.forEach(img => carouselImages.add(img.split('/').pop()));
      }
    });

    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp|gif|JPG)$/i.test(file))
      .filter(file => {
        if (captions[file] && captions[file].carousel) return true;
        return !carouselImages.has(file);
      })
      .map((file, index) => ({
        url: `/Gallery/${file}`,
        name: file,
        caption: captions[file] || null,
        position: positions[file] || { x: (index % 4) * 250 + 80, y: Math.floor(index / 4) * 220 + 80 }
      }));
      
    return {
      images
    };
  } catch (err) {
    console.error('Failed to read Gallery directory:', err);
    return {
      images: []
    };
  }
}
