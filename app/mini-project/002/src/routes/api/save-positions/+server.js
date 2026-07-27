import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const data = await request.json();
    const { positions } = data; // expects { "IMG_123.jpg": { x: 10, y: 30 } }
    
    const galleryDir = path.resolve('static/Gallery');
    const positionsPath = path.join(galleryDir, 'positions.json');
    
    fs.writeFileSync(positionsPath, JSON.stringify(positions, null, 2));
    
    return json({ success: true });
  } catch (err) {
    console.error('Failed to save positions:', err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
