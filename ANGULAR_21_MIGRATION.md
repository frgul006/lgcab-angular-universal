# Angular 21 Migration Plan

## Goals
- Move from Angular 17.3 to Angular 21 with SSR/prerender preserved.
- Keep existing UI/UX and the local data pipeline intact.
- Keep Netlify-friendly `dist/browser` output and service worker behavior.

## Current Baseline
- Angular 17.3 NgModule app at repo root.
- SSR via `@angular/ssr` `CommonEngine` (`server.ts`).
- Prerender enabled in `angular.json`; outputs `dist/browser` + `dist/server`.
- Service worker enabled in production via `ngsw-config.json`.
- Node 20 pinned in `.nvmrc` and `netlify.toml`.

## Target Versions (confirm during prep)
- Node: ^20.19.0 || ^22.12.0 || >=24.0.0
- TypeScript: TBD
- RxJS: TBD
- zone.js: TBD
- Angular core/cli/material/cdk/ssr: 21.x

## Upgrade Path (do not skip majors)
1) Prep: clean working tree, update Node to target, reinstall deps.
2) 17 -> 18: `npx ng update @angular/cli@18 @angular/core@18 @angular/material@18 @angular/cdk@18`
3) 18 -> 19: `npx ng update @angular/cli@19 @angular/core@19 @angular/material@19 @angular/cdk@19`
4) 19 -> 20: `npx ng update @angular/cli@20 @angular/core@20 @angular/material@20 @angular/cdk@20`
5) 20 -> 21: `npx ng update @angular/cli@21 @angular/core@21 @angular/material@21 @angular/cdk@21`

## Validation (each major)
- Build SSR/prerender: `npm run build`
- Serve SSR: `npm run serve:ssr`
- Serve prerender: `npm run serve:prerender`
- Lint/tests: `npm run lint`, `npm test` (if needed)
- UI checks: sticky nav, splash hero, markdown sections, dialogs, service worker.

## Watchouts
- SSR API changes in `server.ts` (engine API or entry changes).
- Hydration/HTTP providers in `src/app/app.module.ts`.
- Material theming tokens in `src/material.scss` and `src/styles.scss`.
- `ngx-markdown`/`marked` SSR compatibility.
- TypeScript target/module updates in `tsconfig.json`.

## Status
- Branch: `chore/angular-21-migration`
