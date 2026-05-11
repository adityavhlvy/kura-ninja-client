# Aegis Geodash (Fullstack)

Geospatial dashboard for Indonesian fertilizer demand visualization. Combines interactive vector tile maps with multi-level administrative data (province → regency → district), demand forecasting, and realization tracking. Built as part of modular monolith backend + React monorepo frontend.

**Rationale**: Agricultural decision-support tool — likely government/enterprise project for fertilizer distribution planning across Indonesia's 34 provinces.

**Stack**: Go 1.25 + Fiber v3, PostgreSQL, React 19, TypeScript, OpenLayers, Rsbuild, Tailwind CSS 4, Recharts, Ky

**Competencies**: Geospatial Engineering, Data Visualization, API Design, State Management, Vector Tile Architecture

---

## Verified Features

- ✅ **Fertilizer Demand Map (FDM)** — OpenLayers vector tile map with heatmap coloring by normalized demand. Zoom-aware admin level switching (province < zoom 9, regency 9-12, district ≥ 13). Hover tooltips, click-to-detail modal.
- ✅ **Multi-layer Analysis** — Toggleable layers: Fase Tanam (planting phase), Komoditas (commodity distribution per province). Multiple basemaps (Mapbox Dark/Light/Streets/Satellite + OSM fallback).
- ✅ **Demand Filtering** — Filter by level, month/year, commodity (padi/jagung/tebu), fertilizer type (urea/npk/organik), biweekly period.
- ✅ **Demand Summary & Analytics** — Auto-generated Indonesian analysis text with month-over-month change calculation. Historical 6-month window (3 actual + 3 predicted).
- ✅ **Demand Map API** — Forecast (3 months ahead) + realization history (3 months behind) with biweekly breakdown and absorption rate.
- ✅ **Predicted Demand (Real DB)** — PostgreSQL-backed endpoint reading from `GOLD_FERTILIZER_DEMAND_PER_KEC_2WEEK` table with aggregation by admin level.
- ✅ **Soil Nutrient Maps (SNM)** — Separate OpenLayers map with layer registry, Web Worker for feature deduplication, province-level zoom thresholds.
- ✅ **Tile Proxy** — Backend proxies vector tiles with dual auth (HTTP Basic / HMAC token). Token caching with expiry buffer.
- ✅ **Articles** — Read-only article listing from embedded JSON.
- ✅ **Map Playground** — Dev sandbox with map benchmark + layout experiments.
- ✅ **Auth Integration** — OAuth callback, auth guards (GeoAuthGuard + GeoRealmGuard), realm-based access control.
- ✅ **Lazy Loading** — All pages lazy-loaded with Suspense.

## Placeholder Features (Coming Soon pages)

- 🚧 **Ask AI** — Placeholder page only
- 🚧 **My Data** — Placeholder page only

---

## Technical Challenges

1. **Zoom-aware vector tile styling** — Map dynamically switches admin level based on zoom. Region codes truncated (2/4/6 digits) to match province/regency/district. Demand data aggregated client-side per visible level. Color mapping via min-max normalization.

2. **Tile proxy with dual auth** — Backend handles both HTTP Basic and HMAC token auth modes for upstream Martin tile server. Token cached per user with 1-minute expiry buffer. Transparent to frontend.

3. **Complex state management** — FDMStore uses useReducer with 20+ action types managing filters, regions, map state, demand map data, analysis layers, and comparison mode. Separate context for tab navigation.

4. **SNM Web Worker** — Feature deduplication offloaded to Web Worker to avoid blocking main thread during vector tile processing.

---

## Readiness

🏗️ Tests: **5%** (only 1 embed_test.go found in backend, no frontend tests)
📝 Docs: **70%** (Swagger/OpenAPI specs exist, README accurate but slightly out-of-sync)
💎 Quality: **75%** (clean architecture, typed end-to-end, but auth routes commented out, mock data dominates)

---

## Visual Suggestions

- FDM map with heatmap coloring at province level (screenshot `/geo-maps/fertilizer-demand-maps`)
- Region detail modal showing historical demand chart + market share
- SNM map with soil nutrient layer overlay
- Filter panel showing commodity/fertilizer type selectors
- Basemap switching (dark → satellite comparison)

---

## JSON (Portfolio Web)

```json
{
  "title": "Aegis Geodash",
  "category": "Fullstack",
  "description": "Geospatial dashboard for Indonesian fertilizer demand visualization. Interactive vector tile maps with multi-level administrative drill-down, demand forecasting, realization tracking, and soil nutrient analysis.",
  "rationale": "Agricultural decision-support tool for fertilizer distribution planning across Indonesia's 34 provinces.",
  "stack": ["Go", "Fiber", "PostgreSQL", "React 19", "TypeScript", "OpenLayers", "Rsbuild", "Tailwind CSS 4", "Recharts"],
  "competencies": ["Geospatial Engineering", "Data Visualization", "REST API Design", "State Management", "Vector Tile Architecture", "WebGL Maps"],
  "features": [
    "Interactive heatmap with zoom-aware admin level switching (province/regency/district)",
    "Multi-layer analysis: planting phase + commodity distribution overlays",
    "Demand filtering by commodity, fertilizer type, time period, and biweekly breakdown",
    "3-month demand forecast + 3-month realization history with absorption rates",
    "Tile proxy with dual auth (Basic/HMAC token) and caching",
    "Soil Nutrient Maps with Web Worker feature deduplication",
    "Real PostgreSQL-backed predicted demand aggregation",
    "OAuth integration with realm-based access control"
  ],
  "links": {},
  "readiness": {
    "tests": 5,
    "docs": 70,
    "quality": 75
  }
}
```

---

## 📋 Documentation Sync Issues

README mostly accurate. Specific fixes needed:

**Frontend README:**
1. **`dashboard` module** — Listed in Features table but no route exists. Router has `/` → `HomePage`, not a dashboard page. Feature folder `dashboard/` exists but unused in router. **Remove or clarify.**
2. **`ask-ai`** — Listed as "AI assistant interface" but is placeholder "coming soon" page. **Mark as upcoming.**
3. **`my-data`** — Listed as "User data management" but is placeholder. **Mark as upcoming.**
4. **Missing from README**: `map-playground` has sub-routes (`/map-benchmark`, `/map-layout-playground`) not documented.
5. **Missing from README**: SNM uses OpenLayers + Web Workers — worth noting as technical highlight.
6. **Stack section**: Missing `nuqs` (URL state), `ol-mapbox-style` (Mapbox style for OL). Minor.

**Backend README:**
1. **Auth enforcement commented out** — All geodash routes currently public (no `mw.BearerGuard()`). README implies protected routes. **Flag as dev-mode state.**
2. **Missing endpoint**: `GET /api/v1/fertilizer-demand/details` (predicted demand from real DB) not listed in API table.
3. **Geodash migrations**: No `db/migrations/geodash/` folder exists despite README structure suggesting it. Data is mock/seeded or from shared Halo DB.