# Kura Ninja Client

[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Rsbuild](https://img.shields.io/badge/Rsbuild-1.x-ffd04b?logo=rspack)](https://rsbuild.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-runtime-f9f9f9?logo=bun)](https://bun.sh/)

Personal portfolio of **Aditya Vahlevy Nugraha** — Software & AI Engineer working across Geospatial Analytics, AI orchestration, and Fullstack engineering.

A single-page app (Rsbuild + React Router, no server components) framed as a code editor: an explorer sidebar for navigation, a command palette (`Ctrl/⌘K`), and two themes — **Senja** (dark) and **Fajar** (light).

## Data

Content is not hardcoded in the UI. `scripts/sync-data.ts` copies YAML from `../portfolio-data` into `src/data/*.json` on every `dev`/`build`:

```
../portfolio-data/{projects,journey,certifications,profile}.yml  →  src/data/*.json
```

Edit the YAML, not the generated JSON. `src/data/projects.ts` is the typed accessor for `projects.json`.

## Getting Started

```bash
bun install
bun run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Sync data + start Rsbuild dev server |
| `bun run build` | Sync data + production build to `dist/` |
| `bun run preview` | Preview the production build |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run knip` | Report unused files, deps & exports |

## Stack

- **Build**: Rsbuild + React 19 + TypeScript
- **Routing**: React Router (client-side)
- **Styling**: Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- **Motion**: Framer Motion
- **UI**: Radix UI primitives + `cmdk` command palette (wrapped in `src/components/ui/`)
- **Icons**: react-icons

## Layout

```
src/
  app/         app shell (ClientLayout) + global styles
  layout/      Header, Footer
  components/  explorer sidebar, command palette, cards, motion primitives
  view/        one folder per route (home, about, projects, certifications, contact)
  data/        generated JSON + typed accessors
scripts/       sync-data.ts
```