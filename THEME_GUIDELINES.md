# KUWINA / SHANDY MAYORES PORTFOLIO DESIGN SYSTEM & THEME GUIDELINES

Use this guide as a master prompt context when generating, building, or styling individual project pages (e.g., `/project/001`, `/project/002`, `/project/003`, `/project/004`) to maintain 100% visual consistency with the main landing page.

---

## 1. Aesthetic Vision & Concept
- **Theme**: Monochromatic Y2K / Industrial Brutalism / Futuristic Dark Mode
- **Color Palette**: Strict Monochrome (Pure Black `#000000`, Off-Black `#0a0a0a`, Charcoal `#171717`, Mid-Gray `#cccccc`, Pure White `#ffffff`)
- **Strict Constraint**: **NO BLUE, NO ACCENT COLORS**. All interactive states, badges, progress bars, and borders MUST be white, gray, or translucent white.

---

## 2. Typography Rules

### Primary Heading Font (Flux)
- **Class**: `font-flux` (Font Family: `var(--font-flux)`)
- **Weight**: `font-[900]` / Heavy Black
- **Text Transform**: `uppercase select-none`
- **Kerning / Letter Spacing**: Ultra-tight `tracking-[-0.08em]`
- **Line Height**: `leading-none`
- **Coloring**: `text-[#cccccc] opacity-90` or `text-white`
- **Usage**: Main page titles, section headings, project titles, modal headers.

```tsx
/* Standard Heading Utility Class Pattern */
className="font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90"
```

### Body & Subtitle Font (Poppins & Mono)
- **Body / Subtitle Class**: `font-[family-name:var(--font-poppins)]` or `font-sans`
- **Technical Badges / Metadata Class**: `font-mono`
- **Text Colors**:
  - Primary Body: `text-white` or `text-white/90`
  - Secondary / Muted: `text-zinc-400` or `text-zinc-500`
  - Meta Info / Handles: `text-white/50` or `text-zinc-400`

---

## 3. Layout & Structure Guidelines

- **Mobile-First Approach**:
  - Build all base styles for small screens first.
  - Scale up using `min-width` breakpoints (e.g., `sm:`, `md:`, `lg:`).
  - Use fluid typography with `clamp()` or screen-width units (`vw`) for large displays.
- **Borders & Dividers**:
  - Square edges (`rounded-none` or subtle `rounded-sm`).
  - Subtle dark borders: `border-zinc-800` or `border-white/10`.
  - Section dividers: `border-t border-zinc-900`.
- **Background Layering**:
  - Full-page dark backgrounds (`bg-black` or `bg-black/60 backdrop-blur-sm`).
  - Overlapping text layers with `pointer-events-none` for depth.

---

## 4. Component & Interactive Element Styling

### Buttons & Interactive Controls
- **Style**: Minimalist rectangular or pill containers with high contrast.
- **Base State**: `bg-white/10 text-white/70 border border-white/10`
- **Hover State**: `hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300`
- **Tap Targets**: Minimum `44x44px` on mobile.

### Badges / Tech Tags
```tsx
className="text-[10px] md:text-xs font-mono tabular-nums px-3 md:px-4 py-1.5 md:py-2 border border-white/20 text-white/40 uppercase tracking-widest transition-all duration-300 group-hover:text-white group-hover:border-white group-hover:bg-white/10"
```

### Links & Animated Underlines
- Hover underlines MUST be white:
```tsx
<span className="relative">
  {title}
  <span className="absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ease-out w-0 group-hover:w-full" />
</span>
```

### Global Scroll Progress Bar
```tsx
<motion.div
  className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
  style={{ scaleX }}
/>
```

---

## 5. Master Prompt Template for AI Generation

When asking AI to create a new project subpage, copy & paste the prompt block below:

```text
You are building a project detail page for the Kuwina / Shandy Mayores Portfolio.
Follow these strict design guidelines:
1. Palette: Pure black (#000000), charcoal, zinc grays, and white. STRICTLY NO BLUE or color accents.
2. Headings: Must use `font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90`.
3. Body text: Use Poppins font (`font-[family-name:var(--font-poppins)]`) or Geist Mono for code/tech metadata.
4. Mobile-first: Author all layouts mobile-first using Tailwind CSS, scaling to desktop with min-width queries (`md:`).
5. Hover states: Simple monochrome transitions (white/10 backgrounds, white borders, 0.5px white underlines).
6. Structure: Dark glassmorphism panels (`bg-black/60 backdrop-blur-sm border border-zinc-900`), clean high-contrast text.
```
