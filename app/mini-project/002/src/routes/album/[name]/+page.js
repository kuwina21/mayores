// src/routes/album/[name]/+page.js
import { albumsData } from '$lib/data.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const album = albumsData[params.name];

  if (!album) {
    throw error(404, 'Album not found');
  }

  return {
    album
  };
}
