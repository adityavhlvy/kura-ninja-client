# README Template

```markdown
# [Project Name]

[Short, impactful description of what the project does.]

## 🚀 Key Features

- **Feature 1**: [Briefly explain]
- **Feature 2**: [Briefly explain]

## 🛠️ Tech Stack

- **Frontend**: [React, Next.js, etc.]
- **Backend**: [Node.js, Express, FastAPI, etc.]
- **Database**: [PostgreSQL, MongoDB, etc.]

## ⚙️ Getting Started

### Prerequisites

- [Node.js vX.X.X]
- [Python vX.X.X]

### Installation

```bash
git clone [repository-url]
cd [project-name]
npm install
```

### Running the App

```bash
npm run dev
```

## 🧪 Testing

```bash
npm test
```

## 📄 License

This project is licensed under the [MIT License].
```

---

# CHANGELOG Template

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [[Unreleased]]

### Added
- New features and experimental updates.

### Changed
- Changes in existing functionality.

### Fixed
- Any bug fixes.

### Removed
- Features that were removed in this version.

## [1.0.0] - 2026-03-31

### Added
- Initial release with core features.
```

---

# API Template

```markdown
# API Documentation

Base URL: `http://localhost:3000/api/v1`

## 📡 Endpoints

### 👤 User Authentication

#### `POST /auth/login`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGci..."
  }
  ```

#### `GET /auth/profile`
- **Description**: Get the current user's profile info.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "name": "Jane Doe"
  }
  ```
```
