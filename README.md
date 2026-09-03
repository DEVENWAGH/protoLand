# 🏛️ VISION: National Land Governance & Evidence Intelligence Platform
### Smart India Hackathon 2026 | Problem Statement ID: 26019
**Theme:** Blockchain & Cybersecurity • **Category:** Software • **Team:** Vision

---

## 📌 Executive Summary
**VISION** is a multi-tier, blockchain-secured AI platform designed for evidence-based land governance and research-policy innovation. It bridges the gap between academic research, land cadastre data, and government policy formulation through:
1. **Blockchain Evidence Ledger**: Anchors cryptographic hashes (SHA-256) of research papers, land titles, and policy gazettes onto an immutable, tamper-evident distributed ledger.
2. **Unified Research & Policy Repository**: Connects research papers, gazette policies, cadastral datasets (NAKSHA/DILRMP), and geospatial GeoJSON layers.
3. **AI Research Intelligence**: Uses semantic vector search and RAG to discover, summarize, and cross-reference relevant empirical evidence.
4. **Evidence Qualification Layer**: Automatically evaluates evidence freshness, geographic applicability, and source authority before policy insights are generated.
5. **GIS & Policy Intelligence**: Interactive PostGIS/Leaflet spatial interface for parcel ownership provenance, land-use classifications, and boundary dispute mitigation.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies | Role |
| :--- | :--- | :--- |
| **Frontend Portal** | React 18, TypeScript, Tailwind CSS, Vite, Leaflet, Lucide | High-trust GovTech dashboard, interactive GIS maps, live ledger explorer |
| **Backend REST Core** | Java 17, Spring Boot 3, Spring Security, Hibernate Spatial | Business logic, JWT/RBAC security, PostGIS integration, blockchain adapter |
| **AI & Vector RAG** | Python 3.11, FastAPI, Sentence-Transformers, pgvector | Multi-factor evidence qualification scoring, semantic search, policy gap analysis |
| **Database & GIS** | PostgreSQL 16, PostGIS 3.4 | Geospatial polygon queries (`ST_Intersects`), spatial indexing, relational entities |
| **Blockchain** | Solidity, DPoS Permissioned Node, SHA-256 Merkle Verification | Immutable audit trails, tamper-proof document timestamping |
| **DevOps** | Docker, Docker Compose, Yarn Workspaces | One-command orchestration, isolated microservices |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ & **Yarn** (`corepack enable` or `npm install -g yarn`)
- **Python**: v3.10+
- **Java**: JDK 17+
- **Docker & Docker Compose** (Optional, for database & microservices)

---

### 1. Running the Frontend (Vite + React + Tailwind)
All package management strictly uses **Yarn**:

```powershell
# From project root
yarn install

# Start development server
yarn dev
```
The portal will be live at: **`http://localhost:3000`**

To produce a production bundle:
```powershell
yarn build
```

---

### 2. Running AI RAG & Qualification Service (FastAPI)
```powershell
cd ai-service
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Interactive Swagger API documentation: **`http://localhost:8000/docs`**

---

### 3. Running Backend Core (Java Spring Boot)
```powershell
cd backend
mvn spring-boot:run
```
REST API Base URL: **`http://localhost:8080/api/v1`**

---

### 4. Running via Docker Compose
To launch PostgreSQL with PostGIS, Spring Boot backend, FastAPI, and Frontend together:
```powershell
docker-compose up --build
```

---

## 📂 Repository Structure

```
protoLand/
├── .agent/ / .cursor/        # UI/UX Pro Max AI design intelligence skill
├── DESIGN.md                 # Design system specification for SIH 2026
├── design-system/            # Master & page-specific UI/UX design tokens
├── docker-compose.yml        # Multi-container orchestration (PostGIS, Spring, AI, React)
├── .env.example              # Centralized environment variable template
├── package.json              # Yarn workspace root configuration
├── frontend/                 # React 18 + TypeScript + Tailwind CSS portal
│   ├── src/
│   │   ├── components/       # Header, StatCards, LedgerExplorer, GisMapViewer, AiResearchRag
│   │   ├── data/mockData.ts  # Authentic GoI DILRMP/NAKSHA testbed data
│   │   ├── types/            # TypeScript domain interfaces
│   │   ├── App.tsx           # Tabbed GovTech app shell
│   │   └── main.tsx
│   ├── index.html            # Google Fonts (Inter, Fira Code) + Leaflet
│   ├── tailwind.config.js    # GovTech & Cyber color palette tokens
│   └── package.json
├── backend/                  # Java 17 + Spring Boot 3 enterprise service
│   ├── pom.xml               # Spring Data JPA, PostGIS spatial, Web3j, Spring Security
│   └── src/main/java/gov/vision/
│       ├── controller/       # EvidenceLedgerController, CadastralGISController
│       ├── model/            # LandParcelEntity, ResearchEvidenceEntity
│       ├── repository/       # PostGIS spatial queries
│       └── service/          # SHA-256 blockchain provenance service
├── ai-service/               # Python FastAPI RAG & Qualification Engine
│   ├── qualification/        # Multi-factor scoring (Freshness, Geo, Source Authority)
│   ├── rag/                  # Semantic vector similarity search engine
│   ├── main.py               # FastAPI endpoints (/api/v1/qualification, /api/v1/rag)
│   └── requirements.txt
└── blockchain/               # Smart contract audit layer
    └── EvidenceLedger.sol    # Permissioned immutable evidence registration
```

---

## 🎯 Hackathon Compliance Mapping (PS ID: 26019)

| Hackathon Requirement | VISION Implementation |
| :--- | :--- |
| **Blockchain Evidence Ledger** | SHA-256 cryptographic hashes committed per block, Merkle verification, live feed |
| **Unified Research & Policy Repository** | Peer-reviewed papers cross-referenced with DILRMP / MoRD land acts |
| **AI Research Intelligence & RAG** | Vector similarity retrieval, abstract synthesis, evidence qualification breakdown |
| **Evidence Qualification Layer** | Algorithm calculating Freshness, Geo-applicability (State/District), and Source Authority |
| **GIS & Policy Intelligence** | Interactive Leaflet/PostGIS cadastral boundaries (NAKSHA), dispute & LULC filtering |
| **Bidirectional Gap Analysis** | Policy $\leftrightarrow$ Research gap detection highlighting unbacked policy clauses |
