# 🚀 Mini DevOps Project: Production-Simulated Containerized Microservice & CI/CD Pipeline

A vendor-agnostic, production-grade DevOps implementation featuring multi-container orchestration, automated CI/CD pipeline, reverse proxying, and secure zero-trust cloud tunneling.
---

## 🏗️ Architecture Overview
[ Public Client / Interviewer ]
               │
               ▼ HTTPS (Free SSL)
┌──────────────────────────────────────────┐
│  Cloudflare Tunnel (Zero Trust Gateway)  │
└────────────────────┬─────────────────────┘
                     │
                     ▼ HTTP :80
┌──────────────────────────────────────────┐
│    Nginx Reverse Proxy (Host Level)      │
└────────────────────┬─────────────────────┘
                     │ Forward to [http://127.0.0.1:3000](http://127.0.0.1:3000)
                     ▼
┌──────────────────────────────────────────┐
│  devops-api-service Container (:3000)    │ (Node.js Express REST API)
└────────────────────┬─────────────────────┘
                     │ Isolated Docker Bridge Network
                     ▼
┌──────────────────────────────────────────┐
│  devops-postgres-db Container (:5432)     │ (PostgreSQL 16 - Private DB)
└──────────────────────────────────────────┘

✨ Key Features & Technical Highlights
    Containerization: Multi-stage Dockerfile with non-root security execution (USER node) to minimize container attack surface.
    Container Registry & Tagging: Uses GitHub Container Registry (GHCR) with semantic tagging (v1.0.0) and short Git commit SHA tags.
    CI/CD Automation: GitHub Actions workflow that automatically runs unit tests (npm test), builds the production Docker image, and pushes artifacts to GHCR on every git push origin main.
    Production Networking: Host-level Nginx acting as a Reverse Proxy forwarding inbound HTTP port :80 traffic to port :3000.
    Zero-Trust Security & Public Exposure: Cloudflare Tunnel (cloudflared) exposing local port :80 securely to a public HTTPS URL without opening database ports (:5432) to the public internet.
    Infrastructure as Code (IaC): Production stack managed declaratively using docker-compose.prod.yml.

🛠️ Tech Stack
    Application: Node.js, Express.js
    Database: PostgreSQL 16 (Alpine)
    Containerization: Docker, Docker Compose
    Registry: GitHub Container Registry (ghcr.io)
    CI/CD: GitHub Actions
    Proxy & Networking: Nginx, Cloudflare Tunnel (cloudflared)

    Project Structure
    cloud-devops-project/
├── app/
│   ├── src/
│   │   ├── routes/
│   │   │   └── api.js
│   │   └── index.js
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD Pipeline Configuration
│
├── docker-compose.yml          # Local Development Stack
├── docker-compose.prod.yml     # Production Deployment Stack (GHCR)
├── .gitignore
└── README.md

🚀 Getting Started & Deployment Guide
1. Running in Development Mode
To run the full stack locally with dynamic code building:
Bash
docker compose up --build -d
2. Running in Production Mode (Using GHCR Images)
To simulate the production environment by pulling pre-built images from GitHub Container Registry:
Bash
# Pull the latest image built by GitHub Actions
docker compose -f docker-compose.prod.yml pull
# Run production containers in detached mode
docker compose -f docker-compose.prod.yml up -d
3. Exposing via Nginx & Cloudflare Tunnel
1. Ensure Nginx is running as reverse proxy forwarding port 80 to 3000.
2. Start Cloudflare Tunnel:
cloudflared tunnel --url http://localhost:80
