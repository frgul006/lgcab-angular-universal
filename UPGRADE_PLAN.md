# Angular 17 SSR/SSG Migration Plan

## Goals
- Rebuild on Angular 17 with first-class SSR/SSG, keeping the existing UI/UX (sticky nav, splash hero, smooth scroll, dialogs, markdown-driven sections).
- Remove GraphCMS/Apollo remnants and other obsolete tooling.
- Modernize tooling (ESLint, Angular Material 17, RxJS 7, TypeScript 5, Node 20) while keeping static JSON content under `src/assets/data`.
- Keep Netlify-friendly prerendered output (`dist/browser`), drop `--openssl-legacy-provider` workarounds.

## Recently Merged (master)
- Removed GraphCMS/Apollo dependencies, GraphQL query files, legacy fetch scripts, and `response.ts`.
- Dropped the HammerJS import.
- Added knip (`yarn check:unused`), `knip.json`, and `src/tsconfig.spec.json` for tooling.
- Updated contact data (new addresses/email/homepage/invoice email) and rendered the invoice email link in the contact card.
- Added maintenance notes to `README.md` and `AGENTS.md`, including Netlify/CLI guidance.

## Current State (snapshot)
- Angular 8 + Angular Universal 8 with custom `server.ts`/`prerender.ts` and `static.paths.ts`.
- Dependencies are pre-Ivy (TS 3.5, RxJS 6.5, Material 8, Bootstrap 4). TSLint/Codelyzer.
- Content is local: `src/assets/data/*.json` fetched by `QueryService`; GraphCMS/Apollo packages and query files have been removed.
- PWA/service worker wired manually via `ngsw-config` + copy script.
- UI/UX to preserve:
  - Sticky nav bar that switches to fixed + dark background after scrolling past splash (`NavComponent` scroll listener + class toggle).
  - Splash hero with background image, height tied to viewport; smooth scrolling; Markdown links open in new tab (renderer override + icon cue).
  - Start page sections: welcome + contact column, PBL/EB sections with cert images, philosophy grid, project cards with Material dialog for details.
  - Global styles: Roboto/Material Icons, smooth scroll, `lgcab-grey` blocks, elevation helpers in `material.scss`.

## Cleanup Targets (pre-migration)
- Done: Removed GraphCMS/Apollo deps and unused query files under `src/app/queries/*/*.query.ts`.
- Done: Deleted legacy fetch scripts (`scripts/fetch-hygraph-data.js`, `scripts/fetch-graphassets.js`) and `response.ts`.
- Done: Dropped HammerJS import (`src/main.ts`).
- Remaining: Replace TSLint/Codelyzer with ESLint; remove legacy resolutions/openssl flags.
- Remaining: Remove legacy module map loader (`ModuleMapLoaderModule`) once the new Angular 17 SSR setup is in place.

## Migration Approach (fresh Angular 17 SSR/SSG)
1) **Scaffold**: `ng new lgcab --style=scss --routing --ssr --no-standalone` (keeps NgModules for easier port; standalone later if desired). Target Node 20 in `.nvmrc`/Netlify.
2) **Tooling**: Add ESLint via `ng add @angular-eslint/schematics`. Keep strict templates, enable source maps only for dev, set TS target to ES2022+.
3) **Dependencies**:
   - Angular 17 core/router/forms/platform-server/service-worker/material.
   - RxJS 7.x, TypeScript 5.3+, zone.js 0.14.
   - `ngx-markdown` compatible with Angular 17 (SSR safe), Bootstrap 5 (or keep only needed utilities), remove HammerJS.
4) **Assets & Data**: Copy `src/assets` (images, `data/*.json`, icons). Keep relative paths (`/assets/...`) intact. Maintain Markdown renderer override to add `target=_blank` + icon cue.
5) **App Structure**:
   - Routes: `/` -> Start, `/uppdrag` -> Projects. Preserve `TransferHttpCacheModule`/`provideClientHydration` equivalents to avoid double fetch.
   - Recreate modules/components: `Nav`, `Splash`, `Welcome`, `PageSection`, `Contact`, `Philosophy`, `Projects` + `ProjectsDialog`, `Footer`, etc. Keep `ChangeDetectionStrategy.OnPush`.
   - Nav scroll behavior: use `fromEvent` + throttle/distinctUntilChanged; set host class for sticky nav styling.
   - Markdown rendering: keep `markedOptionsFactory` to force external links new tab.
   - Dialogs: preserve project modal content (Markdown), card layout, cert images.
6) **SSR/SSG**:
   - Use Angular 17 `@angular/ssr` builders. Configure `prerender` with routes `['/', '/uppdrag']`; output to `dist/browser`.
   - No custom Express server needed for Netlify; use prerender for static deploy. If SSR needed, keep generated `server.ts` with modern APIs.
7) **PWA/Service Worker**: Re-add via `ng add @angular/pwa`; configure `ngsw-config.json` in new workspace; rely on CLI build instead of manual copy.
8) **Styling/Theming**:
   - Port `styles.scss` and `material.scss` (elevation helpers). Update Material theming to v17 API; include Material Icons.
   - Update Bootstrap classes if moving to v5 (e.g., `col-*`/grid differences, dropped utility classes).
9) **Build/Test Scripts**:
   - `start`: `ng serve`, `start:ssr`: `ng serve -c ssr` (or `ng run lgcab:serve-ssr`).
   - `build`: `ng build`, `build:ssr`: `ng run lgcab:build:ssr`, `prerender`: `ng run lgcab:prerender`.
   - `lint`: `ng lint`, `test`: `ng test`.
10) **Deployment**: Update `netlify.toml` to Node 20, remove `--openssl-legacy-provider`, set build command to `ng run lgcab:prerender`, publish `dist/browser`.

## Risks / Watchouts
- Ensure `ngx-markdown` SSR compatibility (may need `dompurify`/`marked` peer alignment).
- Re-implement service worker caching rules to match current behavior (assets + data JSON).
- Bootstrap 5 upgrade may subtly change spacing/utility classes; adjust SCSS as needed.
- Dialog animations require `provideAnimations`/`BrowserAnimationsModule` in both browser/SSR contexts.

## Immediate Next Steps
1) Scaffold new Angular 17 SSR project (per above flags) in a fresh `apps` folder or new repo root.
2) Copy assets/styles/data, port components/modules, and wire routes + SSR/prerender.
3) Re-enable PWA/service worker, then run `ng run lgcab:prerender` and validate UI parity locally before updating Netlify config.
4) Re-run `yarn check:unused` after the Angular 17/TypeScript upgrade and clean up remaining unused deps.
