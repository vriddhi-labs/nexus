# Technical Requirements Document: Nexus Framework

## 1. Executive Summary
The goal is to build a "WordPress-like" ecosystem for React dashboards. The system allows developers to install npm-based modules that "fill" UI slots and declare data requirements. To ensure maximum performance, the framework uses **Build-Time Orchestration** to generate a single optimized bundle, avoiding the overhead of runtime micro-frontend management.

---

## 2. System Architecture
The architecture is divided into three logical layers: the **Shell**, the **Orchestrator**, and the **Plugins**.

### 2.1 Component Overview
| Component | Responsibility |
| :--- | :--- |
| **App Shell** | Layout, Routing, Auth, and providing the `Core-API` via Context. |
| **Orchestrator** | A Node.js CLI/Script that "wires" plugins into the Shell before the build. |
| **Plugins** | Self-contained npm packages containing UI (React) and a Manifest (JSON). |
| **Core-API** | A bridge that abstracts data fetching, logging, and notifications from plugins. |



---

## 3. Functional Requirements

### 3.1 The Data-Agnostic Manifest
Every plugin must export a `manifest.json`. This is the single source of truth for the Orchestrator.

**Schema Requirements:**
*   **Metadata:** `id`, `name`, `version`.
*   **Extension Points:** A mapping of components to UI `slots` (e.g., `sidebar`, `top-nav`, `main-content`).
*   **Data Requirements:** Declarative definitions of API endpoints, methods, and parameters.

### 3.2 Slot & Fill System
The Shell must expose a `<Slot/>` component.
*   **Input:** `slotId` (String).
*   **Logic:** The Shell iterates through all enabled plugins registered to that `slotId`.
*   **Fallback:** Must support a `fallback` prop for when no plugins are active.

### 3.3 The Orchestrator (The Build Engine)
The Orchestrator must run as a pre-build step (`npm run prebuild`).
1.  **Discovery:** Scan `package.json` for dependencies matching a specific prefix (e.g., `@nexus-plugin/*`).
2.  **Validation:** Verify that each plugin contains a valid `manifest.json`.
3.  **Code Generation:** Generate a virtual file (`src/_plugins_registry.js`) that imports the plugin components and exports them as a registry object.

---

## 4. Technical Specifications

### 4.1 Data Flow (The Proxy Pattern)
To support the progressive move to SSR/Serverless, plugins **must not** use `fetch` or `axios` directly. They must use the `dataRequirements` manifest.

1.  **Declaration:** Plugin declares `endpoint: "/api/v1/patient"`.
2.  **Resolution:** The Shell's `DataLoader` identifies the request.
3.  **Execution:** 
    *   **SPA Mode:** The Shell executes the fetch in the browser.
    *   **SSR Mode:** The Shell executes the fetch on the server and hydrates the component.

### 4.2 Tech Stack
*   **Framework:** React (Latest Stable).
*   **Language:** JavaScript (Node.js for Orchestrator).
*   **Bundler:** Vite (for fast HMR and optimized production builds).
*   **State Management:** Context API for the Shell; Plugins are encouraged to be stateless or use internal state.

---

## 5. Deployment Roadmap (The Progressive Path)

### Phase 1: Static SPA (Current)
*   **Target:** CDN (S3, GitHub Pages).
*   **Orchestration:** Simple JS file generation.
*   **Data:** Client-side fetching using the Shell’s proxy hook.

### Phase 2: Hybrid SSR (Next.js Adapter)
*   **Target:** Node.js Server / Vercel.
*   **Orchestration:** The Orchestrator generates Next.js dynamic routes (`/pages/p/[pluginId].js`).
*   **Data:** Data requirements are resolved in `getServerSideProps`.

### Phase 3: Serverless / Edge
*   **Target:** AWS Lambda / Cloudflare Workers.
*   **Orchestration:** Atomic builds where each plugin route is its own serverless function.
*   **Optimization:** Shared dependencies (React, UI Kit) are moved to a Shared Layer to reduce bundle size.

---

## 6. Security & Governance
*   **Sandbox Lite:** Plugins are injected as standard React components but should be wrapped in Error Boundaries to prevent a single plugin from crashing the dashboard.
*   **Dependency Deduplication:** The Orchestrator must check for version conflicts (e.g., ensuring two plugins don't try to load conflicting versions of a heavy library).
*   **Auth Injection:** The Shell automatically attaches Bearer tokens to all requests defined in the `dataRequirements` manifest, preventing plugins from handling raw credentials.

---

## 7. Developer Experience (DX)
*   **Nexus CLI:** A tool to scaffold new plugins (`npx nexus-cli create-plugin`).
*   **Local Dev:** The ability to run the Shell in "Link Mode," where it watches a local directory for plugin changes.

---

**Approval & Next Steps:**
*   [ ] Finalize JSON Schema for `manifest.json`.
*   [ ] Build Proof-of-Concept (PoC) for the Orchestrator script.
*   [ ] Define the "Core-API" hook signatures.

How does this TRD align with the specific infrastructure you have in mind for your developer environments?
