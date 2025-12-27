# LGCAB

## Hosting

Served by Netlify using static site generation.
See `DEPLOYMENT.md` for Netlify configuration details.

## Content Updates

Content is served from typed TS exports under `src/app/data` (GraphCMS/Apollo has been removed).

- `src/app/data/contact.data.ts` drives the contact card, including the `invoiceEmail` field rendered as "Fakturor".
- Other content (projects, philosophies, page components) lives alongside it in the same folder.

## Getting Started

This app uses Angular 21 SSR via `@angular/ssr` with a `server.ts` entry and prerender enabled in the build config.

---

### Build Time Prerendering Vs. Server Side Rendering(ssr)

This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Prerender**

- Happens at build time
- Renders your application and outputs static HTML under `dist/browser`.

**Server-Side Rendering (SSR)**

- Happens at runtime
- Uses the Angular SSR server (`server.ts`) to render your application on the fly at the requested URL.

---

### Installation
- `npm install`

### Development (Client-side only rendering)

- run `npm run start` which will start `ng serve`

### Production (also for testing SSR/Pre-rendering locally)

**`npm run build && npm run serve:ssr`** - Builds the app and spins up the Node SSR server on `http://localhost:4000`.

**`npm run build:prerender && npm run serve:prerender`** - Builds and prerenders the app, then serves it on `http://localhost:8080`.
**Note**: For static hosting, deploy the `dist/browser` folder.

## Maintenance
- Unused code check: `npm run check:unused` (knip).
- Lint: `npm run lint`.

## Netlify Checks

Netlify deploy previews run for PRs. Use `gh pr checks <pr-number>` to see status; if it returns nothing, Netlify has not started the checks yet.

## Universal "Gotchas"

Moved to [/angular/universal/blob/master/docs/gotchas.md](https://github.com/angular/universal/blob/master/docs/gotchas.md)

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
