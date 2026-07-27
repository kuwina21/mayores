// src/lib/data.js
// Centralized mock data for photos and albums to keep static pages fully dynamic

export const albumsData = {
  'mayon-and-beyond': {
    name: 'Mayon & Beyond',
    description: 'A study of the absolute symmetry of Mount Mayon and the lives framing its silhouette.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&auto=format&fit=crop&q=80', caption: 'Sunrise casting a calm glow over the peak silhouette.' },
      { url: 'https://images.unsplash.com/photo-1495567720989-cebad8989c31?w=1200&auto=format&fit=crop&q=80', caption: 'Local farmers working in fields resting at the foot.' },
      { url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1200&auto=format&fit=crop&q=80', caption: 'The curve of the horizon intersecting at base framing.' },
      { url: 'https://images.unsplash.com/photo-1544208390-e47ceefe39e5?w=1200&auto=format&fit=crop&q=80', caption: 'Overcast skies wrapping around the crater edge.' }
    ]
  },
  'legazpi-downtown': {
    name: 'Legazpi Downtown',
    description: 'Street scenes capturing the pulse and motion of urban life in the Bicol center.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80', caption: 'Night lights casting neon trails down Rizal avenue.' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80', caption: 'Early morning market stalls being stacked for display.' },
      { url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&auto=format&fit=crop&q=80', caption: 'A lone pedestrian crossing empty intersections at dusk.' }
    ]
  },
  'pacific-shores': {
    name: 'Pacific Shores',
    description: 'Black sands and turquoise waters meeting the edges of the Albay Gulf coastlines.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80', caption: 'Foam crashing smooth over the black volcanic sand.' },
      { url: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&auto=format&fit=crop&q=80', caption: 'Boats docked along the horizon during low tide.' },
      { url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&auto=format&fit=crop&q=80', caption: 'The setting sun reflecting off calm bay ripples.' }
    ]
  }
};
