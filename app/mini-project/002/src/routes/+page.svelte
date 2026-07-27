<!-- 
  Homepage (+page.svelte)
  Splash landing section followed by a grid of available albums on continuous scroll.
-->

<script>
  import Lightbox from '$lib/components/Lightbox.svelte';
  import { fade } from 'svelte/transition';

  // State loaded from +page.server.js
  let { data } = $props();

  let lightboxOpen = $state(false);
  let currentPhotoIndex = $state(0);
  let fullScreenImage = $state(null);

  // 📷 Digicam Scroll animation node pacing thresholds
  let scrollProgress = $state(0);
  let sectionRef = $state();

  function handleScroll() {
    if (!sectionRef) return;
    const rect = sectionRef.getBoundingClientRect();
    const trigger = window.innerHeight; 
    // Spans from entering bottom to leaving top Node pacing
    const progress = Math.min(Math.max((trigger - rect.top) / (window.innerHeight + rect.height), 0), 1);
    scrollProgress = progress;
  }

  // Splash fade logic
  let scrollY = $state(0);
  let innerHeight = $state(1000);
  // Text & Sunset transition logic
  // Phase 1 (0-100vh): Splash image + "KUWINA" text + Background turning Black
  // Phase 2 (100-200vh): Black screen reveals the Sunset image
  // Phase 3 (200-300vh): Sunset image is revealed, Gallery starts sliding up
  
  let splashProgress = $derived(innerHeight ? Math.min(Math.max(scrollY / innerHeight, 0), 1) : 0);
  let sunsetRevealProgress = $derived(innerHeight ? Math.min(Math.max((scrollY - innerHeight) / innerHeight, 0), 1) : 0);


  // Track natural aspects for uncropped layout
  let imageAspects = $state({});

  // Guard against undefined data.images
  const safeImages = data?.images || [];

  // Alternating index counter
  let captionCounter = 0;
  const enhancedImages = safeImages.map(image => {
    if (image.caption) {
      captionCounter++;
      return { ...image, captionIndex: captionCounter };
    }
    return image;
  });

  function openLightbox(index) {
    currentPhotoIndex = index;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
  }
</script>

<svelte:window onscroll={handleScroll} bind:scrollY bind:innerHeight />

<svelte:head>
  <title>kuwina — Editorial Archive</title>
</svelte:head>



<!-- Splash Spacer to allow scroll before next page (300vh for multi-phase) -->
<div class="splash-spacer" style="height: 300vh; position: relative;">
  <section class="splash-section">
    <div class="top-nav">
      <a href="#" class="nav-btn">Home</a>
    </div>

    <!-- Phase 1: Initial Splash Photograph -->
    <div class="bg-wrap" style="opacity: {1 - sunsetRevealProgress};">
      <img src="/Gallery/kuwina1.png" alt="Vibrant landscape narrative" class="bg-img" />
    </div>

    <!-- Phase 2: Sunset Background (revealed by sword) -->
    <div class="sunset-wrap" style="opacity: {sunsetRevealProgress};">
      <img src="/Gallery/sunset.png" alt="Golden sunset narrative" class="bg-img" />
    </div>

    <!-- Darkness Background Fill (reveals the black) -->
    <div class="black-fill-overlay" 
         style="
           opacity: {splashProgress > 0 ? (1 - sunsetRevealProgress) : 0};
           background: #000;
         "></div>

    <!-- KUWINA Splash Text -->
    <h1 class="splash-text" 
        style="
          opacity: {1 - sunsetRevealProgress};
          transform: translate(-50%, calc(-50% - {sunsetRevealProgress * 180}px)) scale({1 + splashProgress * 0.1});
        ">
      KUWINA
    </h1>
  </section>
</div>





<!-- 2. Anchor for Scroll navigation -->
<div id="gallery-feed"></div>

<!-- 3. Scrollable Gallery Section -->
<div class="homepage" in:fade={{ duration: 600 }}>
  
  <!-- Minimalist Title -->

  <!-- 1.5 Vertical Carousel Split Row Section -->
  <section class="vertical-carousel-banner" style="margin-top: 0; background: #000;">
    <div class="track-left">
      <div class="content-box">
        <span class="sub-label">Curated Aesthetics</span>
        <h2 class="v-title">ambient<br>visuals</h2>
        <p class="v-desc">Continuous cycles of captures framing spaces and narrative textures.</p>
      </div>
    </div>
    <div class="track-right">
      <div class="v-gallery">
        <div class="v-collage">
          {#each ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg'] as filename}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <div class="v-collage-item" onclick={() => fullScreenImage = '/Gallery/' + filename} style="cursor: pointer;">
              <img src="/Gallery/{filename}" alt="Scenic collage item" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Auto-Scrolling Carousel Section (For Bundle Items) -->
  {#if safeImages.some(img => img.caption && img.caption.carousel)}
    <section class="auto-scroller">
      <div class="marquee-track">
        <!-- Duplicate list for seamless loop -->
        {#each safeImages.filter(img => img.caption && img.caption.carousel).flatMap(img => img.caption.carousel) as src}
          <div class="marquee-item" onclick={() => openLightbox(safeImages.findIndex(i => i.caption && i.caption.carousel && i.caption.carousel.includes(src)))}>
            <img src={src} alt="Scenic frame narrative detail" loading="eager" />
          </div>
        {/each}
        {#each safeImages.filter(img => img.caption && img.caption.carousel).flatMap(img => img.caption.carousel) as src}
          <div class="marquee-item" onclick={() => openLightbox(safeImages.findIndex(i => i.caption && i.caption.carousel && i.caption.carousel.includes(src)))}>
            <img src={src} alt="Scenic frame narrative detail" loading="lazy" />
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- 1.8 Full-Bleed Landscape Banner -->
  <section class="full-bleed-banner">
    <img src="/Gallery/kuwina2.JPG" alt="Scenic landscape panorama" />
  </section>

  <!-- Archive section moved to bottom -->

  <!-- Sunset Banner (Uncropped) -->
  <section class="sunset-banner">
    <img src="/Gallery/sunset.png" alt="Fiery cinematic sunset backdrop" />
  </section>

  <!-- 1.4 Sunset Filmstrip row -->
  <section class="sunset-filmstrip-section">
    <div class="sunset-header">
      <h2 class="sunset-title emphasized">Fading Light</h2>
    </div>
    
    <div class="sunset-row">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="sunset-track">
        {#each ['s1.jpg', 's2.jpeg', 's3.jpeg', 's4.jpg', 's6.jpg'] as img}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <div class="row-item" onclick={() => fullScreenImage = '/Gallery/' + img} style="cursor: pointer;">
            <img src="/Gallery/{img}" alt="Golden hour sunset mood" loading="lazy" />
          </div>
        {/each}
        {#each ['s1.jpg', 's2.jpeg', 's3.jpeg', 's4.jpg', 's6.jpg'] as img}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <div class="row-item" onclick={() => fullScreenImage = '/Gallery/' + img} style="cursor: pointer;">
            <img src="/Gallery/{img}" alt="Golden hour sunset mood" loading="lazy" />
          </div>
        {/each}
      </div>
    </div>
  </section>





  <!-- 1.7 Featured Narratives Section -->
  <section class="narrative-feed">
    {#each enhancedImages.filter(img => img.caption && !['kuwina.jpg', 'kuwina1.png', 'sunset.png'].some(ex => img.url.toLowerCase().includes(ex.toLowerCase()))) as image, index}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="narrative-item" onclick={() => openLightbox(safeImages.findIndex(img => img.url === image.url))}>
          <div class="narrative-img-box">
             <img src={image.url} alt={image.caption.title} loading="lazy" />
          </div>
          <div class="narrative-content">
             <span class="narrative-tag">Journal Entry</span>
             <h3 class="narrative-title">{image.caption.title}</h3>
             <p class="narrative-text">{image.caption.description}</p>
             <button class="view-btn">View Details</button>
          </div>
        </div>
      {/each}
    </section>

  <!-- 📷 Digicam Cross Section with Sequential Reveal Node pacing -->
  <section class="digicam-section" bind:this={sectionRef}>
    <div class="sticky-frame">
      <!-- 📷 Layer 1: side-by-side Digicam images Node pacing -->
      <div class="background-reveal" style="opacity: {scrollProgress > 0.50 ? Math.min((scrollProgress - 0.50) / 0.20, 1) : 0}; transform: scale({0.85 + (scrollProgress > 0.50 ? Math.min((scrollProgress - 0.50)*0.15, 0.15) : 0)})">
        <img src="/Gallery/digicam.png" alt="Digicam 1" />
        <img src="/Gallery/digicam1.png" alt="Digicam 2" />
      </div>

      <!-- 🚪 Sticky Grid Overlay pacing Node -->
      <div class="digicam-grid-container" style="opacity: {scrollProgress > 0.68 ? Math.max(0, 1 - (scrollProgress - 0.68) / 0.04) : 1}">
      <!-- 🚪 Grid Rotate based on 700vh offset pacing Node -->
      <div class="digicam-grid" style="transform: rotateZ({scrollProgress < 0.25 ? 0 : (scrollProgress < 0.40 ? (scrollProgress - 0.25) / 0.15 * -360 : -360)}deg); opacity: 1">
        <!-- Vertical letters intersecting at row 4 -->
        <div class="cell" style="grid-column: 4; grid-row: 1; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">D</div>
        <div class="cell" style="grid-column: 4; grid-row: 2; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">I</div>
        <div class="cell" style="grid-column: 4; grid-row: 3; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 5 : 0)}">G</div>
        
        <!-- Horizontal letters row 4 -->
        <div class="cell" style="grid-column: 1; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">D</div>
        <div class="cell" style="grid-column: 2; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">I</div>
        <div class="cell" style="grid-column: 3; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * -1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">G</div>
        
        <!-- Center letter fades node pacing -->
        <div class="cell" style="grid-column: 4; grid-row: 4; opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 7 : 0)}">I</div>
        
        <!-- C-A-M translate right node pacing -->
        <div class="cell" style="grid-column: 5; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">C</div>
        <div class="cell" style="grid-column: 6; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">A</div>
        <div class="cell" style="grid-column: 7; grid-row: 4; transform: translateX({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">M</div>
        
        <!-- Bottom vertical letters row 5-7 -->
        <div class="cell" style="grid-column: 4; grid-row: 5; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">C</div>
        <div class="cell" style="grid-column: 4; grid-row: 6; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">A</div>
        <div class="cell" style="grid-column: 4; grid-row: 7; transform: translateY({scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1800 : 0}px); opacity: {1 - (scrollProgress > 0.4 ? (scrollProgress - 0.4) * 6 : 0)}">M</div>
      </div>
    </div>
    </div>
  </section>

  <!-- 1.6 Shandy Immersive Banner -->
  <section class="shandy-banner">
    <img src="/Gallery/shandy.png" alt="Creative immersive banner display" />
  </section>

</div>

{#if fullScreenImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="full-screen-modal" onclick={() => fullScreenImage = null} transition:fade={{ duration: 300 }}>
    <img src={fullScreenImage} alt="Fullscreen displayed detail" />
  </div>
{/if}

<Lightbox 
  photos={safeImages} 
  bind:currentIndex={currentPhotoIndex} 
  bind:isOpen={lightboxOpen} 
  onClose={closeLightbox} 
/>

<style>
  html {
    scroll-behavior: smooth; /* Safe anchor scrolls */
  }

  /* 1. Splash Section */
  .splash-section {
    position: sticky;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    color: #fff;
    overflow: hidden;
  }

  .homepage {
    position: relative;
    z-index: 10;
    background: #000;
  }

  .black-fill-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    pointer-events: none;
  }

  .splash-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 15vw, 12rem);
    font-weight: 300;
    letter-spacing: 0.1em;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    pointer-events: none;
  }

  .top-nav {
    position: fixed;
    top: 2rem;
    right: 2.5rem;
    z-index: 10;
    display: flex;
    gap: 1rem;
  }

  .nav-btn {
    color: #fff;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.6rem 1.2rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  .bg-wrap, .sunset-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .sunset-wrap {
    z-index: 2; /* Sits above standard splash but below sword */
  }

  /* 1.5 Vertical Carousel Section */
  .vertical-carousel-banner {
    display: flex;
    width: 100%;
    height: 80vh;
    background-color: var(--accent);
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .track-left {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 6rem;
    background: var(--accent);
    position: relative;
    z-index: 2;
  }

  .sub-label {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .v-title {
    font-family: var(--font-serif);
    font-size: clamp(3rem, 7vw, 5rem);
    line-height: 0.9;
    font-weight: 300;
    margin-bottom: 2rem;
    color: #fff;
    font-style: italic;
  }

  .v-desc {
    max-width: 320px;
    font-family: var(--font-sans);
    font-size: 0.95rem;
    color: #666;
    line-height: 1.6;
  }

  .track-right {
    flex: 1;
    position: relative;
    overflow: hidden;
    background-color: var(--accent);
  }

  .v-gallery {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .v-marquee-track {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: scroll-v 25s linear infinite;
    height: max-content;
    padding: 1.5rem 0;
  }

  .v-marquee-item {
    width: 350px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .v-marquee-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  @keyframes scroll-v {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  /* Hover to pause stream */
  .v-marquee-track:hover {
    animation-play-state: paused;
  }

  .bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
  }

  .content-deck {
    position: absolute;
    bottom: 12%;
    left: 6%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .sub-headline {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 0.5rem;
  }

  .main-title {
    font-size: clamp(4rem, 15vw, 10rem);
    font-family: var(--font-serif);
    font-weight: 300;
    text-transform: lowercase;
    margin: 0;
    line-height: 0.85;
    color: #ffffff;
  }

  .tagline {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    max-width: 420px;
    margin: 1.5rem 0 2.5rem 0;
    line-height: 1.6;
  }

  .enter-btn {
    display: inline-block;
    padding: 1rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: #ffffff;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .enter-btn:hover {
    background-color: #ffffff;
    color: #000000;
    transform: translateY(-2px);
  }

  /* 2. Scrollable Gallery content below */
  .homepage {
    padding-top: 4rem;
    background-color: #0a0a0a;
  }

  /* Hero Section */
  .hero {
    min-height: 15vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4rem;
    margin-bottom: 2rem;
    background: #a9170a;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .toggle-btn, .save-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-family: var(--font-sans);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
  }

  .toggle-btn:hover, .save-btn:hover {
    background: white;
    color: black;
  }

  .headline {
    font-size: clamp(2rem, 6vw, 4rem);
    text-transform: lowercase;
    font-family: var(--font-serif);
    font-weight: 300;
    letter-spacing: 0px;
  }

  /* Split Archive Layout */
  .archive-split {
    display: flex;
    position: relative;
    width: 100%;
    background-color: transparent;
  }

  .archive-left {
    flex: 0 0 320px;
    padding: 6rem 4rem;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-right: 1px solid rgba(255, 255, 255, 0.03);
    z-index: 10;
  }

  .archive-right {
    flex: 1;
    padding: 6rem 4rem;
    overflow: visible;
  }

  .archive-right .bento-grid {
    padding: 0; /* Remove double padding */
    gap: 1.5rem;
  }

  .archive-desc {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    color: #888;
    line-height: 1.6;
    margin-top: 0.8rem;
    max-width: 220px;
    letter-spacing: 0.02em;
  }

  @media (max-width: 1024px) {
    .archive-split {
      flex-direction: column;
    }
    .archive-left {
      position: relative;
      height: auto;
      flex: none;
      width: 100%;
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding: 3rem 2rem;
    }
    .archive-right {
      padding: 2rem;
    }
  }

  /* Full Stack layout */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 0 4rem 4rem 4rem;
    align-items: start;
  }

  /* Canvas Mode Overrides */
  .canvas-mode .bento-grid {
    display: block; /* Disable Flex */
    position: relative;
    min-height: 200vh;
    width: 100%;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .canvas-mode .grid-item {
    cursor: grab;
    transition: none !important;
    user-select: none;
  }

  .grid-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    aspect-ratio: 16/9; /* Enforce landscape bounding box */
  }

  /* Narrative Feed Layout */
  .narrative-feed {
    padding: 6rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 6rem;
    background: #0d0d0d;
    width: 100%;
  }

  .narrative-item {
    display: flex;
    gap: 4rem;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }

  .narrative-item.reverse {
    flex-direction: row-reverse;
  }

  .narrative-img-box {
    flex: 1.2;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: 4px;
    background: #111;
  }

  .narrative-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .narrative-item:hover .narrative-img-box img {
    transform: scale(1.03);
  }

  .narrative-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .narrative-item.reverse .narrative-content {
    align-items: flex-end;
    text-align: right;
  }

  .narrative-tag {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--accent, #e53935);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .narrative-title {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    font-style: italic;
    color: #fff;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .narrative-text {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 480px;
  }

  @media (max-width: 800px) {
    .narrative-item, .narrative-item.reverse {
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
      text-align: left;
    }
    .narrative-content {
      align-items: flex-start !important;
      text-align: left !important;
    }
  }

  .grid-item.has-caption.reverse {
    flex-direction: row-reverse;
  }

  /* Image Containers */
  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .has-caption .img-container {
    flex: 1.2;
    aspect-ratio: 16/10;
    height: auto;
    overflow: hidden;
  }

  /* Auto Scroller Marquee */
  .auto-scroller {
    overflow: hidden;
    padding: 2rem 0;
    width: 100%;
    margin-bottom: 3rem;
    background-color: #050505;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: scroll 40s linear infinite;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .marquee-item {
    flex: 0 0 350px;
    height: 220px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    background-color: #111;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
  }

  .marquee-item:hover {
    transform: scale(1.03) translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 10;
  }

  .marquee-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .grid-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Caption Column */
  .caption-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 1rem;
    text-align: left;
    align-items: flex-start;
  }

  .reverse .caption-block {
    text-align: left;
    align-items: flex-start;
  }

  .caption-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-family: var(--font-serif);
    font-weight: 300;
    margin-bottom: 1rem;
    color: #f0f0f0;
  }

  .caption-desc {
    font-size: 1rem;
    color: #909090;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 450px;
  }

  .view-btn {
    align-self: flex-start;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 0.75rem;
    font-family: var(--font-sans);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Hover and overlay for grid items */
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
  }

  .view-label {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
    letter-spacing: 0.15em;
    transform: translateY(10px);
    transition: transform 0.3s ease;
  }

  .grid-item:hover img {
    transform: scale(1.05);
  }

  .shandy-banner {
    width: 100%;
    height: 100vh; /* large cinematic height viewports */
    position: relative;
    overflow: hidden;
    margin: 4rem 0;
    background-color: transparent;
  }

  .shandy-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* stretches full bleed immersion */
    display: block;
  }

  /* Sunset Filmstrip Layout */
  .sunset-filmstrip-section {
    width: 100%;
    background-color: transparent;
    margin-top: 5rem;
    margin-bottom: 3rem;
  }

  .sunset-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 0 2rem;
  }

  .sunset-title.emphasized {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 500;
  }

  .sunset-row {
    width: 100%;
    overflow: hidden;
    padding: 0 2rem 4rem 2rem;
  }

  .sunset-track {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.8rem;
    width: max-content;
    animation: sunset-scroll 45s linear infinite;
  }

  @keyframes sunset-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Hover to pause continuous scrolling */
  .sunset-track:hover {
    animation-play-state: paused;
  }

  .row-item {
    flex: 0 0 320px; /* absolute rigid size for scrolling tracks */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    background-color: #111;
    aspect-ratio: 16/11; /* uniform track height frames nodes */
  }

  .row-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* FORCE CROP: Fills container fully with no background letterbox node */
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }



  @media (max-width: 900px) {
    .sunset-row {
      flex-wrap: wrap; /* wrap into grid-like state for smaller screens nodes for visibility */
      gap: 1rem;
    }
    .row-item {
      flex: 0 0 calc(50% - 0.5rem); /* two files per row on smaller tablets */
    }
  }

  @media (max-width: 600px) {
    .sunset-row {
      padding: 0 1.5rem 2rem 1.5rem;
    }
    .row-item {
      flex: 0 0 100%; /* full width stacked item mobile node */
    }
  }

  .full-bleed-banner {
    width: 100%;
    height: auto;
    background-color: transparent;
    overflow: hidden;
  }

  .full-bleed-banner img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Uncropped Sunset Banner */
  .sunset-banner {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 4rem;
    background-color: transparent;
  }

  .sunset-banner img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero {
      padding: 0 1.5rem;
    }
    .bento-grid {
      padding: 0 1.5rem 2rem 1.5rem;
      gap: 0.5rem;
    }
    .grid-item {
      height: 200px;
    }
    .grid-item.has-caption {
      flex-direction: column !important;
      gap: 1.5rem;
      padding: 1.5rem 0;
    }
    .caption-block {
      padding: 0 !important;
    }
  }
  /* 1.5 Ambient Visuals Collage */
  .vertical-carousel-banner {
    display: flex;
    position: relative;
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }

  .track-left {
    flex: 0 0 350px;
    padding: 6rem 4rem;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.03);
    z-index: 10;
  }

  .track-right {
    flex: 1;
    padding: 6rem 4rem;
    overflow: visible;
  }

  .v-title {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 300;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  .v-gallery {
    width: 100%;
    margin: 0 auto;
  }

  .v-collage {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: repeat(2, 280px);
    gap: 0.8rem;
    width: 100%;
  }

  .v-collage-item {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-color: #111;
  }

  .v-collage-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }



  .v-collage-item:nth-child(1) { grid-column: 1; grid-row: 1 / span 2; }
  .v-collage-item:nth-child(2) { grid-column: 2; grid-row: 1; }
  .v-collage-item:nth-child(3) { grid-column: 2; grid-row: 2; }
  .v-collage-item:nth-child(4) { grid-column: 3; grid-row: 1; }
  .v-collage-item:nth-child(5) { grid-column: 3; grid-row: 2; }

  @media (max-width: 1024px) {
    .vertical-carousel-banner {
      flex-direction: column;
    }
    .track-left {
      position: relative;
      height: auto;
      flex: none;
      width: 100%;
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.03);
      padding: 3rem 2rem;
    }
    .track-right {
      padding: 2rem;
    }
    .v-collage {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    }
    .v-collage-item:nth-child(1) { grid-column: span 2; grid-row: auto; }
    .v-collage-item:nth-child(n+2) { grid-column: auto; grid-row: auto; }
  }
  /* Full Screen Overlay Modal nodes pacing */
  .full-screen-modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(6, 6, 6, 0.96);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: zoom-out;
  }

  .full-screen-modal img {
    max-width: 92%;
    max-height: 92%;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.85);
    background-color: #080808;
  }
  /* 📷 Digicam Cross Section Styles node pacing */
  .digicam-section {
    height: 700vh; /* 🚀 7 full viewport pages Node pacing thresholds securely */
    background-color: #941710; /* Brick studio red Node pacing */
    position: relative;
    overflow: visible; /* allow sticky inside to work */
  }

  /* 📷 Black Transition Overlay node pacing */


  /* 📷 Sticky frame absolute centering wrapper */
  .sticky-frame {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
  }

  /* Underground Revealed Layer Node pacing */
  .background-reveal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    transition: transform 0.1s linear, opacity 0.1s linear;
  }

  .background-reveal img {
    flex: 1;
    max-width: 48%; /* Huge side-by-side Node pacing */
    max-height: 95vh;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.9);
    background-color: #080808;
  }

  .digicam-grid-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* Sits above reveal layers node pacing */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .digicam-grid {
    display: grid;
    grid-template-columns: repeat(7, clamp(2.5rem, 6.5vw, 4.5rem));
    grid-template-rows: repeat(7, clamp(2.5rem, 6.5vw, 4.5rem)); 
    justify-content: center;
    align-content: center;
    color: #ffffff;
    font-family: 'Times New Roman', Times, serif; 
    font-size: clamp(2rem, 5vw, 4rem); /* Cinematic large text nodes pacing */
    letter-spacing: 0.12em;
    user-select: none;
    transition: transform 0.05s linear;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    transition: transform 0.08s ease-out, opacity 0.08s ease-out;
  }
</style>
