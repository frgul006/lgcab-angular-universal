# Repository Guidelines

## Project Structure & Module Organization
- `src/app` holds Angular modules, components, pages, services, GraphQL queries, and models.
- `src/assets` stores static images and icons; `src/styles.scss` and `src/material.scss` define global styles.
- `src/environments` contains environment-specific configs.
- Server-side rendering and prerendering entry points live at `server.ts`, `prerender.ts`, and `static.paths.ts`.
- Build outputs go to `dist/browser` (client) and `dist/server` (SSR).

## Build, Test, and Development Commands
- `npm run start` runs the dev server (`ng serve`) for client-side rendering.
- `npm run build` builds the browser bundle to `dist/browser`.
- `npm run build:ssr` builds browser + server bundles and compiles the server.
- `npm run serve:ssr` serves the SSR build via Node (`dist/server`).
- `npm run build:prerender` generates static HTML into `dist/browser`.
- `npm run serve:prerender` serves the prerendered site from `dist/browser`.
- `npm run lint` runs TSLint with codelyzer rules.

## Coding Style & Naming Conventions
- TypeScript + SCSS; component styles are `.scss` and live alongside components.
- Component selectors use the `lgcab` prefix and `kebab-case` (see `tslint.json`).
- Follow Angular conventions: `*.component.ts`, `*.service.ts`, `*.module.ts`, `*.spec.ts`.
- TSLint is the enforced linter; Prettier is available in dev dependencies but not wired to scripts.

## Testing Guidelines
- Unit tests are `src/**/*.spec.ts` and run via `ng test` (Karma config path is referenced in `angular.json`).
- If you add E2E tests, note that `angular.json` expects `protractor.conf.js` and an `e2e/` project, which are not present in this repo.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat: add homepage hero`, `fix: handle null SEO data`).
- Keep commit messages concise and scoped to a single change when possible.
- PRs should include a brief summary, testing notes (commands run), and screenshots for UI changes.
- See `CONTRIBUTING.md` for the full contributor workflow.

## Security & Configuration Tips
- Review `SECURITY.md` before reporting vulnerabilities or handling secrets.
- Service worker settings live in `ngsw-config.json`; `npm run ngsw-config` updates `dist/browser`.
