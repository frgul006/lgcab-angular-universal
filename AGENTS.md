# Repository Guidelines

## Project Structure & Module Organization
- `src/app` holds Angular modules, components, pages, services, and models; data is loaded via `QueryService` from typed TS exports in `src/app/data`.
- `src/assets` stores static images and icons; `src/styles.scss` and `src/material.scss` define global styles.
- `src/app/data` stores content (contact, projects, philosophies, page components). `contact.data.ts` includes `invoiceEmail` for the "Fakturor" link.
- Server-side rendering uses the `@angular/ssr` entry in `server.ts`; prerender is handled by the Angular build configuration.
- Build outputs go to `dist/browser` (client) and `dist/server` (SSR).

## Build, Test, and Development Commands
- `npm run start` runs the dev server (`ng serve`) for client-side rendering.
- `npm run build` builds the browser + server bundles (and prerenders) into `dist/`.
- `npm run build:ssr` is an alias for `ng build` and produces `dist/server`.
- `npm run serve:ssr` serves the SSR build via Node (`dist/server/server.mjs`).
- `npm run build:prerender` is an alias for `ng build` and outputs static HTML into `dist/browser`.
- `npm run serve:prerender` serves the prerendered site from `dist/browser`.
- `npm run lint` runs ESLint via the Angular ESLint builder.
- `npm run check:unused` runs knip for unused code/dependency checks.

## Coding Style & Naming Conventions
- TypeScript + SCSS; component styles are `.scss` and live alongside components.
- Component selectors use the `lgcab` prefix and `kebab-case` (see `.eslintrc.json`).
- Follow Angular conventions: `*.component.ts`, `*.service.ts`, `*.module.ts`, `*.spec.ts`.
- Prettier is available in dev dependencies but not wired to scripts.

## Testing Guidelines
- Unit tests are `src/**/*.spec.ts` and run via `ng test` (Karma config path is referenced in `angular.json`).
- `tsconfig.spec.json` exists for tests/tooling that expect the spec tsconfig.
- If you add E2E tests, note that `angular.json` expects `protractor.conf.js` and an `e2e/` project, which are not present in this repo.

## Python Environment
- When running Python, always use `./.venv/bin/python` and `./.venv/bin/pip`.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat: add homepage hero`, `fix: handle null SEO data`).
- Keep commit messages concise and scoped to a single change when possible.
- PRs should include a brief summary, testing notes (commands run), and screenshots for UI changes.
- Use the GitHub CLI to create PRs in this repo (for example, `gh pr create`).
- Reply to review comments via the GitHub CLI; use `gh api` to post a threaded reply to the specific review comment, and use `gh pr comment` only for top-level PR comments.
- Example threaded reply (replace placeholders): `gh api -X POST repos/frgul006/lgcab-angular-universal/pulls/42/comments -f body="Thanks! Addressed in <commit>." -f in_reply_to=123456789`
- See `CONTRIBUTING.md` for the full contributor workflow.

## Netlify & CI Checks
- Use `gh pr checks <pr-number>` to see Netlify check status. If it returns no checks, Netlify has not started the checks yet.
- Netlify CLI can be linked via `netlify link --name stupefied-williams-1686c4` to query deploys with `netlify api listSiteDeploys`.
- Deployment details live in `DEPLOYMENT.md`.

## Security & Configuration Tips
- Review `SECURITY.md` before reporting vulnerabilities or handling secrets.
- Service worker settings live in `ngsw-config.json`; `ng build` writes the service worker output into `dist/browser`.
