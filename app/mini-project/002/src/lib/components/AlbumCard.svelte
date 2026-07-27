<!-- 
  AlbumCard.svelte
  Displays an individual album cover layout with metadata.
-->

<script>
  let { album } = $props();
  // album expects: { name: 'Travel', cover: '/photos/travel/cover.jpg', count: 12, slug: 'travel' }
</script>

<div class="card">
  <div class="image-wrapper">
    <!-- loading="lazy" adds mobile performance setup -->
    <img src={album.cover} alt={album.name} loading="lazy" />
  </div>
  
  <div class="content">
    <span class="count">{album.count} PHOTOS</span>
    <h2 class="title">{album.name}</h2>
    <a href="/album/{album.slug}" class="view-link">VIEW ALBUM</a>
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 5; /* Editorial sizing */
    overflow: hidden;
    background-color: #1a1a1a;
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.4s ease;
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .count {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.15em;
    font-weight: 500;
  }

  .title {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }

  .view-link {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    transition: border-color 0.3s ease;
  }

  .view-link:hover {
    border-color: rgba(255,255,255,1);
    opacity: 1;
  }

  /* Hover Effects for desktop */
  @media (hover: hover) {
    .card:hover .image-wrapper {
      transform: scale(1.03);
    }
    .card:hover .image-wrapper img {
      opacity: 1;
    }
  }
</style>
