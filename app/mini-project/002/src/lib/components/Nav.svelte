<!-- 
  Nav.svelte
  Minimalist navigation bar with logo and profile link.
-->

<script>
  // No complex logic needed for standard static nav
</script>

<header class="navbar">
  <div class="logo">
    <a href="#gallery-feed">Gallery</a>
  </div>
  <nav class="links">
    <a href="mailto:contact@example.com" class="nav-link">CONTACT</a>
  </nav>
</header>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    position: relative;
    width: 100%;
    z-index: 100;
  }

  /* Responsive padding for mobile */
  @media (max-width: 768px) {
    .navbar {
      padding: 1.5rem 1.5rem;
    }
  }

  .logo a {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .links {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
  }

  /* Underline effect on hover */
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: var(--accent-color);
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-link:hover::after {
    width: 100%;
  }
</style>
