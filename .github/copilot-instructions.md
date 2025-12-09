<!-- Copilot / AI agent instructions for contributors working on this Pokédex Vite + React project -->
# Repository Overview

This is a small Vite + React (functional components) Pokédex used for progressive lab exercises (Labs 9–11). Key directories:

- `src/components/` — React UI components (e.g. `PokemonCard.jsx`, `Header.jsx`).
- `src/pages/` — top-level page components (project sometimes places `App.jsx` here in later labs).
- `src/data/` — static/mock data used in early labs (`pokemons.js`).
- `src/services/` — (expected) place for Axios services like `pokemonService.js` in Labs 10–11.

Key files to inspect when working on features:

- `package.json` — scripts: `dev` (vite), `build`, `preview`, `lint`.
- `src/main.jsx` — app entry, uses `createRoot` + `StrictMode`.
- `src/App.jsx` — current app shell and playground for components.

# How this project is wired

- Uses Vite for dev server and build. Run `npm run dev` to start HMR-enabled development.
- Components are simple default-exported functional components. Example: `src/components/PokemonCard.jsx` imports Material UI (`@mui/material`) and returns a `<Card>` with `<CardMedia>`.
- Early labs use `src/data/pokemons.js` as the data source. Later labs expect `src/services/pokemonService.js` to fetch data from a Django backend.
- Environment variables are accessed via Vite's `import.meta.env`, e.g. `import.meta.env.VITE_API_BASE_URL`.

# Project-specific patterns and conventions

- Component style: small, focused default exports (e.g. `export default function PokemonCard({ pokemon }) { ... }`).
- UI library: Material UI v7 (see `@mui/material`, `@mui/icons-material`, `@emotion/*` in `package.json`). Prefer using MUI components for layout and controls.
- Data flow: mock data lives in `src/data/pokemons.js`; services (when present) should live in `src/services` and return JSON arrays/objects compatible with the mock shape: `{ id, name, image, type }`.
- When adding API calls, use Axios and place interceptors/services under `src/services/`. README documents using Axios and localStorage token management for Lab 11; search for a `services` folder before adding new files.

# Developer workflows & commands

- Install deps: `npm install` (the README also lists installing MUI and Axios individually if missing).
- Dev server: `npm run dev` (Vite).
- Build for prod: `npm run build`.
- Lint: `npm run lint` (project uses `eslint`).
- Preview production build: `npm run preview`.

Notes for the agent:

- Check `package.json` before assuming libraries like `axios` or `react-router-dom` are present — README mentions them for later labs but `package.json` shows only MUI and React in this repository snapshot.
- Use `import.meta.env.VITE_API_BASE_URL` to read API base URL; the README provides example vars: `VITE_API_BASE_URL` and `VITE_API_MEDIA_URL`.
- Keep changes minimal and in-place: prefer adding new services under `src/services/` and components under `src/components/`.

# Examples from the codebase

- `src/components/PokemonCard.jsx` — MUI usage example:

  - Imports: `import { Card, CardMedia } from "@mui/material"`
  - Renders an image from `pokemon.image` with `CardMedia`.

- `src/data/pokemons.js` — mock data shape to follow when returning API responses:

  - Each item: `{ id: number, name: string, image: string, type: string }`.

# Troubleshooting & common tasks

- Dev server errors: ensure dependencies are installed (`npm install`). On Windows PowerShell use semicolons when chaining commands.
- If adding Router or Axios, update `package.json` and run `npm install react-router-dom axios`.
- Keep ESLint happy by running `npm run lint` before commits.

# Commit / PR conventions

- README suggests commit messages like: `Laboratorio [9/10/11]: descripción de cambios` — follow this pattern for exercise submissions.

# When in doubt

- Inspect `package.json`, `README.md`, and `src/` first. Favor small, local changes that match existing file locations and naming.

If any of these conventions are incomplete or you want me to include additional examples (e.g., preferred service signatures, auth storage keys, or component naming rules), tell me what to add and I'll iterate.
