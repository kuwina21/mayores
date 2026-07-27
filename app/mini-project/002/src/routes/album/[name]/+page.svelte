<!-- 
  Album Details (+page.svelte)
  Displays individual album grid and lightboxes pictures on select.
-->

<script>
  import Lightbox from '$lib/components/Lightbox.svelte';
  import { fade } from 'svelte/transition';

  // Svelte 5 props from +page.js Load function
  let { data } = $props();
  const { album } = data;

  // Svelte 5 state for lightbox mechanics
  let lightboxOpen = $state(false);
  let currentPhotoIndex = $state(0);

  function openLightbox(index) {
    currentPhotoIndex = index;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
  }
</script>

<div class="album-page" in:fade={{ duration: 400 }}>
  
  <!-- Back navigation bar -->
  <div class="top-bar">
    <a href="/" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      BACK TO ALBUMS
    </a>
  </div>

  <!-- Album Header -->
  <header class="album-header">
    <h1 class="album-title">{album.name}</h1>
    <p class="description">{album.description}</p>
  </header>

  <!-- Photo Grid -->
  <section class="photo-grid">
    {#each album.photos as photo, index}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="photo-item" onclick={() => openLightbox(index)}>
        <img src={photo.url} alt={photo.caption || 'Gallery item'} loading="lazy" />
        <div class="hover-overlay">
          <span class="caption">{photo.caption || 'View'}</span>
        </div>
      </div>
    {/each}
  </section>

</div>

<!-- Lightbox overlay component -->
<Lightbox 
  photos={album.photos} 
  bind:currentIndex={currentPhotoIndex} 
  bind:isOpen={lightboxOpen} 
  onClose={closeLightbox} 
/>

<style>
  .album-page {
    padding: 6rem 4rem 4rem 4rem;
  }

  .top-bar {
    margin-bottom: 2rem;
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .back-link:hover {
    opacity: 1;
  }

  .album-header {
    margin-bottom: 4rem;
    max-width: 600px;
  }

  .album-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    text-transform: uppercase;
    margin-bottom: 1rem;
    line-height: .9;
  }

  .description {
    color: var(--text-muted);
    font-weight: 300;
    line-height: 1.6;
  }

  /* Grid layout for pictures */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 400px; /* Uniform height for clean masonry/grid overlap look */
    gap: 1.5rem;
  }

  .photo-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background-color: #1a1a1a;
  }

  .photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Hover and overlay effect for editorial look */
  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 2rem;
  }

  .caption {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 400;
    color: white;
    text-align: center;
    transform: translateY(10px);
    transition: transform 0.3s ease;
  }

  .photo-item:hover img {
    transform: scale(1.05);
  }

  .photo-item:hover .hover-overlay {
    opacity: 1;
  }

  .photo-item:hover .caption {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .album-page {
      padding: 5rem 1.5rem 2rem 1.5rem;
    }
    .photo-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: 350px;
    }
  }
</style>
