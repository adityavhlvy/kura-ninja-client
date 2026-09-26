# Kura Ninja Client

Personal portfolio of Aditya Vahlevy Nugraha, Software and AI Engineer working
across geospatial analytics, AI agent orchestration, and fullstack engineering.

A client-rendered React app built around one motif: Indonesia drawn as
hexagonal map cells, which is also a turtle shell. The design system is in
[`../DESIGN.md`](../DESIGN.md) and the content model in
[`../PRODUCT.md`](../PRODUCT.md).

## Data

Content is never hardcoded in the UI. `scripts/sync-data.ts` runs before every
`dev` and `build`:

```
../portfolio-data/{projects,journey,certifications,profile}.yml  ->  src/data/*.json
../portfolio-data/assets/**                                      ->  public/assets/**
```

Edit the YAML, not the generated JSON. `src/data/portfolio.ts` is the typed
accessor layer and the only module views import data from. The
`profile-photos/casual-photo-multi-direction` folder is excluded on purpose.

The hero map comes from the province boundaries in `data/geospatial-data/`
(gitignored, large). Regenerate it with `bun run map` after changing the grid
size. The small output, `src/data/archipelago.json`, is committed.

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Sync data, then start the Rsbuild dev server |
| `bun run build` | Sync data, then production build to `dist/` |
| `bun run preview` | Serve the production build |
| `bun run map` | Rebuild the hex map from the province CSV |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run knip` | Report unused files, deps, and exports |

## Stack

React 19, React Router 7, Rsbuild, Tailwind CSS 4, Framer Motion, `cmdk`, and
Phosphor icons via `react-icons/pi`.

## Layout

```
src/
  styles.css      tokens and base styles
  App.tsx         routes, page transitions, command menu
  layout/         Header, Footer
  components/     ArchipelagoMap, ShellMark, Reveal, Lightbox, CommandMenu, ...
  pages/          one file per route, home/ holds the home sections
  data/           generated JSON + portfolio.ts accessors
  lib/            theme, clipboard, media query, title hooks
scripts/          sync-data.ts, build-archipelago.ts
```

## Conventions

- Square corners only. The hex is the one non-rectangular shape.
- Colour comes from tokens (`bg-paper`, `text-mute`, `border-line`, `text-sea`).
- Never attach a `scroll` listener. Use `useScroll` or `whileInView`.
- No em-dash in any visible string.
