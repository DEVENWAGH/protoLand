# 🏛️ DESIGN SYSTEM SPECIFICATION (DESIGN.md)
## Smart India Hackathon 2026 — PS ID: 26019
### National Digital Platform for Research, Policy Innovation & Evidence-Based Land Governance
**Team:** Vision • **Theme:** Blockchain & Cybersecurity • **Stack:** React, TypeScript, Tailwind CSS

---

## 1. Executive Design Vision & Archetype

This platform bridges **Government Land Policy**, **Academic Research**, **Geospatial Intelligence (GIS)**, and **Tamper-Proof Blockchain Provenance**.

* **Design Archetype:** **High-Trust Institutional GovTech + Cyber-Security Ledger + Dense Spatial Intelligence**
* **Aesthetic Tone:** Authoritative, cryptographic, crystalline data clarity, high-contrast, modern GovTech (inspired by NITI Aayog, NIC Property Chain, and Chainlink Explorers).
* **Primary Visual Mode:** Dark Mode by default for GIS/Blockchain explorer screens with a High-Contrast Light Mode for institutional policy readers.

---

## 2. Color Palette & Semantics

Tailored for **Institutional Trust (GovTech Blue)** + **Cryptographic Assurance (Emerald/Cyan)** + **Cadastral Spatial Warnings (Amber/Crimson)**:

| Token | Hex Code | Tailwind Class | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#0F172A` | `bg-slate-900` / `text-slate-900` | Sovereign Government Base, Header, Structural Frames |
| **National Cobalt** | `#1E40AF` | `bg-blue-800` / `text-blue-700` | Primary Actions, Brand Accents, Department Headers |
| **Cyber Cyan** | `#06B6D4` | `text-cyan-500` / `border-cyan-500` | Blockchain Nodes, SHA-256 Hashes, Smart Contract State |
| **Blockchain Green**| `#10B981` | `text-emerald-500` / `bg-emerald-500/10` | Verified Ledger Status, Authenticated Hashes, Tamper-Free |
| **Policy Amber** | `#F59E0B` | `text-amber-500` / `bg-amber-500/10` | Policy Gap Alerts, Pending Evidence Qualification |
| **Cadastral Red** | `#EF4444` | `text-rose-500` / `bg-rose-500/10` | Land Conflict Overlay, Disputed Cadastre, Ledger Breach |
| **Surface Dark** | `#0B0F19` | `bg-[#0b0f19]` | Deep Cyber Canvas for GIS Map & Ledger blocks |
| **Surface Card** | `#1E293B` | `bg-slate-800/80` (Glassmorphic) | Elevated Cards, Modals, Query Panels |
| **Text Primary** | `#F8FAFC` | `text-slate-50` | Primary Headings & Critical Metric Values |
| **Text Muted** | `#94A3B8` | `text-slate-400` | Metadata, Timestamps, Transaction Subtitles |

---

## 3. Typography Hierarchy

| Role | Font Family | Weights | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Headings & Hero** | `Inter` / `Plus Jakarta Sans` | 600, 700, 800 | `font-sans tracking-tight` | Platform Title, Module Names, Metric Headlines |
| **Body & Policy** | `Inter` | 400, 500 | `font-sans leading-relaxed` | Policy Texts, Research Abstracts, Evidence Summaries |
| **Code & Ledger** | `Fira Code` / `JetBrains Mono` | 400, 500 | `font-mono tracking-wide` | Transaction Hashes, Block IDs, GIS Coordinates, GeoJSON |

```html
<!-- Google Fonts CDN Link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
```

---

## 4. Key Interface Modules & UX Blueprint

### 4.1. Module 1: Blockchain Evidence Ledger & Provenance Explorer
* **Layout:** Real-time Block Stream + Merkle Tree Provenance Visualizer + Hash Verifier.
* **Key Components:**
  * **Hash Badge:** Monospace truncated chips (`0x7f8a...3e4b`) with 1-click clipboard copy and green checkmark feedback.
  * **Block Status Ribbon:** Live pulses (`🟢 Synced on DPoS Permissioned Node`).
  * **Audit Timeline:** Vertical stepper tracing `Research Paper Upload -> Metadata Hash -> Multi-Sign Validator -> Block Commitment`.

### 4.2. Module 2: AI Research Intelligence & RAG Synthesis Hub
* **Layout:** Split-pane interface (Left: Semantic Search & Filter Matrix; Right: AI Synthesis & Policy-Evidence Gap Matrix).
* **Key Components:**
  * **Freshness & Qualification Pill:** `Freshness: 98%` • `Geo-Relevance: Maharashtra/Cadastre` • `Source: DILRMP/Peer-Reviewed`.
  * **Bidirectional Gap Finder:** Visual bipartite graph connecting Policy Objectives $\leftrightarrow$ Research Papers.
  * **Evidence Synthesizer:** Markdown-rendered stream with cited blockchain block references (`[Ref: Block #1042]`).

### 4.3. Module 3: GIS & Cadastral Spatial Intelligence Engine
* **Layout:** Full-viewport interactive Map Canvas (Leaflet/MapLibre) with floating glassmorphic control dock.
* **Key Components:**
  * **Layer Switcher:** WMS/WMTS toggles for `Cadastral Boundaries (NAKSHA)`, `Land Use/Land Cover (LULC)`, `Dispute Zones`, `Soil/Agro-Territorial Units`.
  * **Spatial Inspector Modal:** Side sheet triggered on parcel click showing ownership provenance history, linked gazette policies, and environmental compliance index.

---

## 5. Micro-Interactions & Motion Guide

* **Transitions:** `transition-all duration-200 ease-in-out` on all interactive buttons, cards, and toggles.
* **Hover State Elevation:** `hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20`.
* **Pulse Indicators:** `animate-pulse` on active blockchain nodes and real-time ingestion listeners.
* **Glassmorphic Panels:** `backdrop-blur-md bg-slate-900/75 border border-slate-700/50 shadow-2xl`.

---

## 6. Anti-Patterns to Avoid
❌ **Do Not** use playful cartoon illustrations or non-authoritative bright neon colors.
❌ **Do Not** hide cryptographic hashes behind obscure menus; trust requires immediate visible auditability.
❌ **Do Not** use generic emojis as icons; use Lucide/Heroicons SVGs (`ShieldCheck`, `Layers`, `Cpu`, `FileCheck2`, `Network`).
❌ **Do Not** clutter GIS maps with opaque legends that block cadastral polygon boundaries.
