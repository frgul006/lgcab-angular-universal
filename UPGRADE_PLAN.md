# Angular 17 SSR/SSG Migration Plan

## Goals
- Rebuild on Angular 17 with first-class SSR/SSG, keeping the existing UI/UX (sticky nav, splash hero, smooth scroll, dialogs, markdown-driven sections).
- Remove GraphCMS/Apollo remnants and obsolete tooling.
- Modernize tooling (Angular Material 17, RxJS 7, TypeScript 5, Node 20) while keeping static content local (now exported as TS constants under `src/app/data`).
- Keep Netlify-friendly prerendered output (`dist/browser`), drop `--openssl-legacy-provider` workarounds.

## Current State (root app)
- Angular 17 NgModule app lives at repo root with SSR/prerender via `@angular/ssr` (`server.ts`).
- `ng build` outputs `dist/browser` + `dist/server`; prerender is enabled for `/` and `/uppdrag`.
- `QueryService` serves data from typed exports in `src/app/data`.
- PWA/service worker re-enabled via `ngsw-config.json` + `manifest.webmanifest`.
- Bootstrap is trimmed to a minimal SCSS build; initial bundle budget warning raised to 750 kB.
- Knip configured at root; `npm run check:unused` passes with explicit entry globs and `bootstrap` ignored.
- UI parity review complete; mobile nav dropdown touch target alignment fixed.
- Nav now switches to sticky dark style on `/uppdrag` as well as after splash scroll on `/`.
- Global box-sizing reset restores Bootstrap grid alignment in contact section; link colors and heading spacing align with prod.
- Reference URLs for parity checks: prod `https://www.lgcab.se`, local `http://localhost:4200`.

## Completed Work
- Removed GraphCMS/Apollo dependencies, query files, legacy fetch scripts, and `response.ts`.
- Dropped the HammerJS import.
- Ported components, routes, and styles to Angular 17 with NgModules.
- Replaced JSON content with TS data exports and updated `QueryService`.
- Updated Netlify config to Node 20 and removed `--openssl-legacy-provider`.
- Moved the Angular 17 app to repo root and removed the legacy Angular 8 app scaffolding.
- Node 20 set in `.nvmrc` and `package.json` engines; legacy `yarn.lock` removed.
- ESLint migration complete with Angular ESLint and `ng lint` wired up.

## Remaining Cleanup / Follow-ups
- Add `DEPLOYMENT.md` to git and track the updated `package-lock.json`.

## Risks / Watchouts
- Ensure `ngx-markdown` SSR compatibility (may need `dompurify`/`marked` peer alignment).
- Re-implement service worker caching rules to match current behavior (assets + media).
- Bootstrap 5 upgrade may subtly change spacing/utility classes; adjust SCSS as needed.
- Dialog animations require `BrowserAnimationsModule` in both browser/SSR contexts.

## Immediate Next Steps
1) Run `npm run build`, then verify `npm run serve:ssr` and `npm run serve:prerender` outputs.
2) Confirm Netlify build command/publish settings for `dist/browser`.
3) Clean up any remaining legacy files once validated.
