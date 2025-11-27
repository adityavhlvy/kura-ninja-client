# Dashboard Geomap Service

## Project Overview

This project provides a backend service for the Dashboard Geomap application, specifically focused on visualizing **Fertilizer Needs (Kebutuhan Pupuk)** and **Dosage (Dosis)** data across various regions in Indonesia. It serves as a central hub for geographical and agricultural data, enabling users to analyze fertilizer distribution and requirements based on:

*   **Region Levels:** National, Provincial, Regency (Kabupaten), and District (Kecamatan).
*   **Commodities:** Rice (Padi), Corn (Jagung), Sugarcane (Tebu Rakyat), etc.
*   **Fertilizer Types:** Urea, NPK, Organic.

Key components include:
*   **Data Ingestion:** Python scripts for processing CSV and shapefiles into a PostgreSQL database.
*   **API:** A robust Go-based REST API for querying aggregated and detailed data.
*   **Configuration:** Flexible environment-based configuration.

## Tech Stack

*   **Go (Golang):** Core API service.
*   **Fiber v3:** High-performance web framework for Go.
*   **PostgreSQL:** Relational database with PostGIS support for geospatial data.
*   **Python:** Data processing and ingestion scripts.
*   **Docker:** Containerization for easy deployment.

## Project Structure

```
dashboard-geomap-service/
├── .env.example                  # Example environment configuration
├── app_info/                     # Application metadata (name, version)
├── cmd/                          # Command-line entry points
├── data/                         # Data files and injection scripts
├── docker-compose.yml            # Docker configuration
├── documentation/                # Project documentation
├── go.mod                        # Go module dependencies
├── internal/                     # Internal application code
│   ├── config/                   # Configuration & DB setup
│   ├── delivery/                 # API handlers & routes
│   ├── entity/                   # Domain entities
│   ├── model/                    # Database models
│   ├── repository/               # Data access layer
│   ├── usecase/                  # Business logic
│   └── utils/                    # Utilities
├── logs/                         # Application logs
└── README.md                     # This file
```

## Setup & Installation

1.  **Clone the repository:**
    ```shell
    git clone <repository_url>
    cd dashboard-geomap-service
    ```

2.  **Install Go dependencies:**
    ```shell
    go mod download
    ```

3.  **Set up the database:**
    *   Ensure PostgreSQL is running.
    *   Create a database named `geomap`.
    *   Run migrations (using `goose` or the provided migration script):
        ```shell
        go run internal/config/database/migration/migration.go create
        go run internal/config/database/migration/migration.go up
        ```

4.  **Configure the application:**
    *   Copy `.env.example` to `.env`:
        ```shell
        cp .env.example .env
        ```
    *   Update `.env` with your credentials.

5.  **Run the application:**
    ```shell
    go run cmd/web/main.go
    ```
    Or using Docker:
    ```shell
    docker-compose up --build
    ```

## Configuration

The application uses the following environment variables (defined in `.env`):

| Variable | Description | Example |
| :--- | :--- | :--- |
| `APP_ENV` | Application environment | `development` |
| `APP_PORT` | Port to run the API on | `8080` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USER` | Database username | `postgres` |
| `DB_PASS` | Database password | `password` |
| `DB_NAME` | Database name | `geomap` |
| `LOG_LEVEL` | Logging level | `info` |
| `LOG_PATH` | Path to log file | `./logs/app.log` |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `*` |

## API Endpoints

Base URL: `/api`

### Fertilizer Needs (Kebutuhan Pupuk)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/pupuk/kebutuhan` | Get all fertilizer needs data. |
| `GET` | `/pupuk/kebutuhan/level/:level` | Get data by level (e.g., `provinsi`, `kabupaten`). |
| `GET` | `/pupuk/kebutuhan/wilayah/:kode_wilayah` | Get data by specific region code. |
| `GET` | `/pupuk/kebutuhan/komoditas/:kode_komoditas` | Get data by commodity code. |
| `GET` | `/pupuk/kebutuhan/jenis/:jenis_pupuk` | Get data by fertilizer type (`urea`, `npk`, `organik`). |
| `GET` | `/pupuk/kebutuhan/advance` | Advanced filter query (params: `level`, `parent_code`, `komoditas`, `jenis_pupuk`, `tahun`, `page`, `limit`). |
| `GET` | `/pupuk/kebutuhan/summary` | Get summary data for the dashboard. Supports filtering (`tahun`, `level`, `komoditas`, `jenis_pupuk`), searching (`search`), and sorting (`sort_by`, `sort_order`). |
| `GET` | `/pupuk/kebutuhan/summary/onclick` | Get detailed summary when clicking a region. Params: `tahun`, `region_code`, `komoditas`, `jenis_pupuk`. |

### Region (Wilayah)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/wilayah/search` | Search for regions by name. Query param: `q`. |

## Versioning

Versioning follows Semantic Versioning 2.0.0. See `app_info/app_info.go` for the current version.

## License & Author

Private Repository.
**Author:** adityavhlvy A.K.A. Kura Ninja