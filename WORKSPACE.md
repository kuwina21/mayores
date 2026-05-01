# Workspace Overview - Kuwina Portfolio

This workspace contains a portfolio website built using **Next.js** with rich animations and shader effects. It is configured for static export and deployment to GitHub Pages.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animation**: [Framer Motion](https://framer.com/motion) & [GSAP](https://gsap.com)
- **Special Effects**: [@paper-design/shaders-react](https://paper-design.com) (GLSL/Shaders)
- **Icons**: [Lucide React](https://lucide.dev)

---

## 📂 Directory Structure

### `app/`
Contains the application routes and global configurations.
- `page.tsx`: The main landing page / portfolio hero.
- `globals.css`: Tailwind directives and custom variables.
- `project/`: Subfolder containing individual project details pages (e.g., `001/`, `002/`).

### `components//`
Component-driven design structure.
- `components/ui/`: Contains core visual components:
  - `portfolio-hero-with-paper-shaders.tsx`: Epic hero section.
  - `portfolio-and-image-gallery.tsx`: Main content gallery.
  - `profile-card-1.tsx`: Card showcasing bio/details.
  - `project-showcase.tsx`: Showcases links to sub-pages.

### `lib/`
Utility functions and helper modules.

### `public/`
Static assets (images, icons, models) served by the application.

---

## 🚀 Key Commands

- **Development Server**: `npm run dev`
- **Build / Export**: `npm run build` (Outputs to `out/` for static deployment)

---

## 🔧 Workspace Configuration

To optimize navigation in large editors, use the workspace configuration file provided:
`kuwina-portfolio.code-workspace`
- Separates folder roots for `App`, `Components`, and `Assets`.
- Sets auto-formatting standards for Next.js.

---

## 🎨 Design & Aesthetic Standards

To maintain a consistent, premium, and clinical feel throughout the portfolio, all project pages must adhere to the following:

### 1. Color Palette
- **Primary Colors**: Black, White, and Blue (e.g., `#000000`, `#FFFFFF`, `text-blue-500`).
- **Forbidden Colors**: Avoid Green, Red, or other non-brand colors unless absolutely necessary for specific status indicators (standardized to Blue where possible).

### 2. Layout & UI Components
- **Website/Admin Interfaces**: 
  - Use sharp, 90-degree corners (`rounded-none`).
  - No hover animations or scaling on dashboard screenshots.
  - Display images at their full aspect ratio without cropping.
- **Mobile Interfaces**:
  - Use rounded "device" frames (`rounded-[2.5rem]`) to simulate a mobile experience.
  - Apply subtle entry animations (e.g., `framer-motion` slide/fade).
- **Sub-Section Labels**: 
  - Consistent `border-l-4 border-black` style with bold, uppercase text.

### 3. Navigation & 404
- All 404 pages should use the custom animated `NotFoundPage` component.
- Ensure text visibility on the 404 page using `mix-blend-difference` against the animated background.
