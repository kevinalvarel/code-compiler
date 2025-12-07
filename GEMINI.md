# Project Overview

**Project Name:** belajar-shadcn-mcp
**Type:** Next.js Web Application

This project is a Next.js application designed to explore and demonstrate modern web development techniques, specifically focusing on animations and UI component libraries. It integrates **Shadcn UI** for accessible, styled components and **React Bits** (custom components) for high-quality visual effects.

## Key Technologies

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:**
  - [Framer Motion](https://www.framer.com/motion/) (Primary animation library)
  - [GSAP](https://gsap.com/) (Used for specific complex animations)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

- `app/`: Contains the application routes and pages (App Router).
  - `(root)/`: Route group for the main landing page structure.
  - `globals.css`: Global styles and Tailwind directives.
- `components/`: Reusable UI components.
  - `ui/`: Shadcn UI components (e.g., `button.tsx`, `CardNav.tsx`).
  - `react-bits/`: Custom animated components (e.g., `SplitText`, `Squares`, `MagnetButton`, `SpotlightCard`, `FadeContent`).
- `lib/`: Utility functions (e.g., `utils.ts` for `cn` helper).
- `public/`: Static assets.

## Building and Running

To get started with development:

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:3000`.

3.  **Build for production:**

    ```bash
    npm run build
    ```

4.  **Start production server:**
    ```bash
    npm start
    ```

## Development Conventions

- **Styling:** Use Tailwind CSS classes for styling. Use the `cn()` utility for conditional class merging.
- **Components:**
  - Place generic UI components in `components/ui`.
  - Place specialized animated components in `components/react-bits`.
  - Use TypeScript interfaces for prop definitions.
- **Animations:**
  - Prefer **Framer Motion** for declarative element transitions (enter/exit, gestures).
  - Ensure animation props (like `delay` or `duration`) match the library's expected units (e.g., seconds for Framer Motion).
