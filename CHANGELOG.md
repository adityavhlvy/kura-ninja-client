# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-09-26

### Added
- **Contour identity system**: elevation isolines as the site motif, generated
  deterministically, used for the background field, the hero plate, and the
  career elevation profile.
- **Elevation journey rail**: horizontal snap rail on Home driven by
  `journey.yml`, with an SVG profile line and scroll progress via `useScroll`.
- **Reveal motion primitives** (`Reveal`, `RevealGroup`, `RevealItem`): single
  place where `prefers-reduced-motion` is honoured.
- **Typed data layer** (`src/data/portfolio.ts`): one accessor module for all
  four YAML sources, replacing ad-hoc JSON imports.
- **Asset mirroring**: `sync-data.ts` now copies the whole `portfolio-data/assets`
  tree, excluding `profile-photos/casual-photo-multi-direction`.
- **Accessible lightbox**: real dialog semantics, focus restore, Escape and
  arrow keys, body scroll lock.
- Pre-paint theme script, skip link, and a working empty state on the work index.

### Changed
- **Full visual redesign**: replaced the IDE/editor-shell language with a
  contour-and-hairline system. Two radius values, flat panels, shadow reserved
  for the header and lightbox.
- **Typography**: Bricolage Grotesque display with same-family italic emphasis,
  Geist body, Geist Mono for data. Instrument Serif dropped.
- **Palette**: Senja and Fajar retuned to one accent each, contrast verified
  against WCAG AA.
- **Contact**: the fake form is gone. Mailto plus copy-to-clipboard with honest
  failure feedback, since there is no backend.
- **Credentials**: 28 items moved behind a per-category accordion.
- Nav labels: Projects is now Work, Certifications is now Credentials.

### Removed
- Fake terminal hero, div-based product mockups, decorative background grid,
  gradient and glow treatments, decorative status dots.
- Dead components: `Background`, `JourneyMap`, `PageTransition`,
  `InteractiveTerminal`, `HeroPortrait`, `FlagshipShowcase`, plus unused
  `badge`/`tooltip` primitives and `playChime`.

## [0.1.0] - 2026-04-06

### Added
- **Premium IDE Hero Section**: Initialized the portfolio with a terminal-inspired bio featuring syntax highlighting and reactive CTAs.
- **Project Grid Showcase**: Dynamic 3D-effect cards for primary "quests" (GAIA, SAM3, etc.).
- **Bento-box Dashboard**: High-density grid components for Spotify live integration and quick highlights.
- **GAIA (Geospatial Analytics Integrated Platform)**: Integrated full-scale geospatial dashboard for agricultural data monitoring.
- **SAM3 Infrastructure**: Full-stack pipeline for Segment Anything Model 3, including a polygon editor and training tools.
- **Advanced Motion System**: Smooth page transitions and interactive hover effects powered by Framer Motion.
- **Enhanced Design Tokens**: Implemented "Anti-AI" design principles with unique typography and intentional spacing.

### Changed
- **Styling Core**: Migrated all styling to **Tailwind CSS v4** for maximum performance and future-proofing.
- **Framework Upgrade**: Updated to **Next.js 16** and **React 19** to leverage the latest React Compiler and Server Components.
- **Sidebar Architecture**: Optimized the sidebar to a flush-left, protruding design with persistent collapse state.

### Fixed
- **Summary Popup Alignment**: Resolved overlapping card issues in bento-box layouts on high-resolution viewports.
- **Map Interaction Precision**: Fixed tooltip drift and region picking issues for large-scale geospatial layers.
- **Asset Loading**: Corrected profile and project image loading paths.

---

[0.1.0]: https://github.com/adityavhlvy/kura-ninja-client/releases/tag/v0.1.0
