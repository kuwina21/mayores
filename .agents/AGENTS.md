# Project Guidelines & Goals

## Design & Aesthetic Goal
- **Y2K Aesthetic**: Maintain a distinct Y2K aesthetic across the portfolio application.
- **Black & White Color Palette**: Utilize a crisp, high-contrast monochrome (black and white) color scheme.
- **Visual Consistency**: Ensure consistent typography, UI patterns, button styles, and micro-interactions across the landing page and all project subpages.
- **Performance & Optimization**: Ensure clean, optimized code, responsive layout structures, and smooth, performance-conscious animations without compromising the design vision.

## Mobile-First Optimization
- **Mobile-First Approach**: All styles and layouts MUST be authored for mobile screens first, then progressively enhanced for larger viewports using `min-width` media queries (e.g., `@media (min-width: 768px)`). Never use `max-width` queries as the primary responsive strategy.
- **Touch-Friendly Interactions**: All interactive elements (buttons, links, navigation) must have a minimum tap target of 44×44px and adequate spacing to prevent mis-taps.
- **Responsive Typography**: Use fluid/clamp-based font sizing (e.g., `clamp()`) so text scales smoothly across all screen sizes without abrupt breakpoint jumps.
- **Viewport & Meta Tags**: Always include `<meta name="viewport" content="width=device-width, initial-scale=1">` and ensure no horizontal overflow on any screen width.
- **Performance on Mobile**: Prioritize lightweight assets, lazy-loaded images, minimal JavaScript bundles, and avoid layout shifts (CLS) to keep the experience fast on low-powered devices.
- **Navigation**: Use mobile-optimized navigation patterns (e.g., hamburger/slide-out menu) as the base, expanding to full nav bars on larger screens.
- **Testing Mindset**: Always preview and test the mobile layout first before desktop. Mobile is the default — desktop is the enhancement.
