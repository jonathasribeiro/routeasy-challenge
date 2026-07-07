# Routeasy Challenge

> Full-stack logistics challenge — customer delivery registration with maps, geocoding, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-16-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Logistics](https://img.shields.io/badge/Domain-Logistics-FF6600?style=flat-square)](https://github.com/jonathasribeiro/routeasy-challenge)

---

## Overview

Technical challenge for **Routeasy** (logistics startup) — full-stack customer registration for product deliveries. Combines REST API, interactive maps (React Leaflet), and Google Geocoding for address validation.

Directly relevant to senior logistics experience: **GoFlux** freight auction, **Autopass** public transit (2M+ daily users).

---

## Features

- Customer registration form with validation (Yup)
- **Interactive map** — React Leaflet for delivery location
- **Geocoding** — Google Maps API for address → coordinates
- MongoDB persistence for customer records
- Toast notifications for feedback
- Docker Compose for MongoDB + backend

---

## Architecture

```
┌─────────────┐     REST      ┌─────────────┐     ┌──────────┐
│   React     │ ────────────► │   Express   │ ──► │ MongoDB  │
│   Frontend  │               │   Backend   │     │          │
└─────────────┘               └─────────────┘     └──────────┘
       │                              │
       │ React Leaflet                │ Google Geocode API
       ▼                              ▼
   Map UI                        Address validation
```

---

## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/jonathasribeiro/routeasy-challenge.git
cd routeasy-challenge
docker compose up --build
```

Backend: http://localhost:3333

### Local

**1. MongoDB**
```bash
docker run --name mongodb -p 27017:27017 -d mongo
```

**2. Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**3. Frontend**
```bash
cd frontend
npm install
npm start
```

---

## Environment

**Backend** (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB connection string |

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── app/controllers/
│   │   ├── app/models/
│   │   └── routes.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   └── src/
│       ├── pages/Main/
│       └── components/
└── docker-compose.yml
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express, Mongoose |
| Frontend | React, React Router, Styled Components |
| Maps | React Leaflet |
| Validation | Yup |
| Database | MongoDB |

---

## Author

**Jonathas Ribeiro** — Senior Fullstack Engineer (GoFlux · Autopass)  
[LinkedIn](https://www.linkedin.com/in/jonathasribeiroreal)

---

## License

MIT
