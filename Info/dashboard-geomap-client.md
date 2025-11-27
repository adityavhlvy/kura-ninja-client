# Geomap Dashboard Client

This project is a comprehensive Next.js application designed to visualize geospatial data related to fertilizer distribution and requirements. It serves as a powerful dashboard for monitoring and analyzing data across different administrative levels (Province, Regency, District) in Indonesia.

The application integrates a custom tile server for rendering high-performance vector tiles and uses Deck.gl for interactive map visualizations.

## Features

-   **Interactive Map Visualization**:
    -   **Dynamic Coloring**: Visualizes fertilizer data (Urea, NPK, Organik) with dynamic color scales based on tonnage.
    -   **Vector Tiles**: Utilizes a custom tile server for efficient rendering of complex administrative boundaries.
    -   **Multi-Level Zoom**: Automatically switches between Province, Regency, and District views based on zoom level.

-   **Advanced Search & Navigation**:
    -   **Region Search**: Search for any Province, Regency, or District.
    -   **Auto-Fly**: Automatically flies to and centers the map on the searched region.

-   **Data Analysis & Filtering**:
    -   **Fertilizer Requirements**: Filter data by Year, Commodity (e.g., Padi, Jagung), and Fertilizer Type.
    -   **Detailed Summaries**: Click on any region to view a detailed popup summary of fertilizer requirements.
    -   **Dashboard Controls**: Sidebar controls for global filtering and data aggregation.

-   **Modern UI/UX**:
    -   Built with **Tailwind CSS v4** and **DaisyUI v5** for a sleek, responsive design.
    -   **Dark/Light Mode** support (configurable).
    -   **Lucide Icons** for a consistent visual language.

## Technologies Used

-   **Framework**: [Next.js 16](https://nextjs.org) (React 19)
-   **Runtime**: [Bun](https://bun.sh)
-   **Map Rendering**: [Deck.gl](https://deck.gl)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com), [DaisyUI](https://daisyui.com)
-   **Data Fetching**: [SWR](https://swr.vercel.app)
-   **Charts**: [Chart.js](https://www.chartjs.org), [React Chartjs 2](https://react-chartjs-2.js.org)
-   **Icons**: [Lucide React](https://lucide.dev/icons)

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd dashboard-geomap-client
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    API_URL=http://localhost:8080/api  # URL of your backend API
    TILE_SERVER_URL=http://localhost:3000/tiles-server # URL of the internal tile server
    ```

4.  Run the development server:
    ```bash
    bun dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Main dashboard page
│   ├── tiles-server/       # Internal API for serving vector tiles
│   │   ├── polygon/        # Polygon data endpoints
│   │   └── tiles/          # Vector tile endpoints
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI Components
│   ├── layout/             # Layout components (Sidebar, etc.)
│   ├── map/                # Map-related components
│   │   ├── hooks/          # Custom hooks for map logic (useMapState, useFertilizerData)
│   │   ├── mapControls/    # Map controls (Search, Zoom, Layers)
│   │   ├── MapContainer.tsx# Main map container
│   │   └── MapView.tsx     # Deck.gl map view
│   ├── FilterSummary.tsx   # Filter summary component
│   └── SummaryPopup.tsx    # Map popup component
├── contexts/               # React Contexts (DashboardContext)
└── lib/                    # Utility functions
```

## API Integration

The application relies on two main data sources:

1.  **Backend API (`API_URL`)**:
    -   Used for fetching aggregated fertilizer data (`/api/pupuk/kebutuhan/summary`).
    -   Used for search functionality.
    -   Proxied via Next.js rewrites to avoid CORS issues.

2.  **Tile Server (`TILE_SERVER_URL`)**:
    -   Internal Next.js API routes that serve GeoJSON/Vector tiles.
    -   Endpoints: `/tiles-server/tiles/[z]/[x]/[y]` and `/tiles-server/polygon/[z]/[x]/[y]`.

## Learn More

To learn more about the technologies used:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Deck.gl Documentation](https://deck.gl/docs)
-   [Bun Documentation](https://bun.sh/docs)
