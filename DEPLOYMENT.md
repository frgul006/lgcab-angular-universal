# Deployment

## Netlify site
- Name: `stupefied-williams-1686c4`
- Site ID: `073b790e-14ba-4396-84d4-437656089a76`
- Admin URL: `https://app.netlify.com/projects/stupefied-williams-1686c4`
- Production URL: `https://www.lgcab.se`
- Default Netlify URL: `https://stupefied-williams-1686c4.netlify.app`
- Custom domain: `www.lgcab.se` (force SSL enabled, managed DNS on)

## Repository + branch
- Git provider: GitHub
- Repo: `https://github.com/frgul006/lgcab-angular-universal`
- Production branch: `master`
- Deploy previews: enabled for PRs
- Branch deploys: enabled (no allowlist configured)

## Build + publish
- Build command (Netlify UI): `npm run build:prerender`
- Publish directory: `dist/browser`
- `build:prerender` in `package.json` maps to `ng build`
- Static deploy only: no functions directory, no SSR runtime on Netlify
- `netlify.toml` only sets build environment variables (no build/publish overrides)

## Environment variables
- `NODE_VERSION=22.12.0` in production, deploy-preview, branch-deploy, and dev contexts
- Build image: `focal` (Ubuntu 20.04)

## Deploy contexts
- Production: `master` -> `https://www.lgcab.se` (alias of `https://master--stupefied-williams-1686c4.netlify.app`)
- Deploy previews: `https://deploy-preview-<pr>--stupefied-williams-1686c4.netlify.app`
- Branch deploys: `https://<branch>--stupefied-williams-1686c4.netlify.app` (branch name slugged)

## Hooks + integrations
- Build hook: "Changes in GraphCMS" targeting `master` (URL stored in Netlify, not committed)

## Processing settings
- Pretty URLs enabled
- HTML forms ignored

## Notes
- Framework detected by Netlify: Angular
- No plugins, edge functions, or scheduled functions configured
