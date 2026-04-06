---
name: doc-updater
description: Update and maintain project-related documentation (README, CHANGELOG, API). Trigger when the user asks to "update documentation", "document this change", or "maintain the project docs".
metadata:
  version: 1.0.0
  category: productivity
  tags: [documentation, automation, maintenance]
---

# Documentation Update Skill

This skill allows the Antigravity agent to intelligently update and maintain project-level documentation, ensuring standard files like `README.md`, `CHANGELOG.md`, and `API.md` (for backends) are always up-to-date with the latest code changes.

## Triggering
Use this skill when:
- The user explicitly requests documentation updates ("update docs", "generate readme", etc.).
- A major feature is added and needs to be documented.
- The project structure or API significantly changes.

## General Guidelines
- **Always use English**.
- **Adapt to the local project style**.
- **Be concise and professional**.
- **Categorize changes** in `CHANGELOG.md` (e.g., Added, Changed, Fixed, Removed).

## Core Instructions

### 1. Identify Project Context
- Locate the nearest project root (e.g., searching for `package.json`, `pyproject.toml`, `go.mod`, or any identifying root file).
- If the current file is inside a subproject, focus on that subproject.
- Determine if the project is a **Backend** by checking for API frameworks (Express, FastAPI, Axum, etc.) or endpoint definitions.

### 2. Update/Create [README.md](file:///path/to/README.md)
- Ensure a `README.md` exists at the project root.
- It should contain:
    - **Title & Description**: High-level overview.
    - **Installation & Usage**: How to get started.
    - **Features**: List of core functionalities.
    - **Development**: How to build/test.

### 3. Update/Create [CHANGELOG.md](file:///path/to/CHANGELOG.md)
- Use the "Keep a Changelog" format (vX.X.X - YYYY-MM-DD).
- If one doesn't exist, create it.
- Summarize recent changes based on commit history or current code diffs.
- Always add a new version entry if a significant feature was added.

### 4. Maintain [API.md](file:///path/to/API.md) (Backend Only)
- If identified as a backend (e.g. has `app.get()` or `[HttpGet]`), create or update `API.md`.
- Document all endpoints, their methods (GET, POST, etc.), request/response formats, and parameters.
- If an existing `API.md` is found, update it instead of rewriting it.

## Resources
- Templates are located in `resources/templates/`.
- Use `scripts/extract_info.py` (if available) to help gather project metadata.
