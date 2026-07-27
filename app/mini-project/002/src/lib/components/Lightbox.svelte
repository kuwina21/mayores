<!-- 
  Lightbox.svelte
  Full-screen photo viewer with navigation controls and backdrop blur.
-->

<script>
  import { fade, fly } from 'svelte/transition';

  // Svelte 5 props
  let { photos = [], currentIndex = 0, isOpen = false, onClose } = $props();

  function next() {
    currentIndex = (currentIndex + 1) % photos.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  }

  // Keyboard navigation
  function handleKeydown(event) {
    if (!isOpen) return;
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
    if (event.key === 'Escape') onClose();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="lightbox-overlay" transition:fade={{ duration: 300 }} onclick={onClose}>
    
    <!-- Stop propagation so clicking the image doesn't close it -->
    <div class="lightbox-content" onclick={(e) => e.stopPropagation()}>
      
      {#each photos as photo, i}
        {#if i === currentIndex}
          <div class="photo-container" transition:fade={{ duration: 400 }}>
            <img src={photo.url} alt={photo.caption || 'Photo'} />
            
            {#if photo.caption}
              <div class="caption-bar">
                <p>{photo.caption}</p>
              </div>
            {/if}
          </div>
        {/if}
      {/each}

      <!-- Navigation Arrows -->
      {#if photos.length > 1}
        <button class="nav-btn prev" onclick={prev} aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="nav-btn next" onclick={next} aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      {/if}

      <!-- Close Button -->
      <button class="close-btn" onclick={onClose} aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>

    </div>
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(5, 5, 5, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lightbox-content {
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .photo-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .photo-container img {
    max-width: 100%;
    max-height: 85%;
    object-fit: contain;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  }

  .caption-bar {
    margin-top: 1.5rem;
    color: var(--text-color);
    font-family: var(--font-sans);
    font-size: 0.9rem;
    text-align: center;
    opacity: 0.8;
    max-width: 600px;
  }

  /* Navigation Buttons */
  .nav-btn, .close-btn {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }

  .nav-btn:hover, .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .prev { left: 10px; }
  .next { right: 10px; }
  .close-btn { top: 10px; right: 10px; }

  @media (max-width: 768px) {
    .nav-btn {
      background: rgba(0,0,0,0.5); /* Higher contrast on mobile */
    }
    .prev { left: 5px; }
    .next { right: 5px; }
  }
</style>
