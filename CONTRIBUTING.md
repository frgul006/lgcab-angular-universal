# Contributing Guide

Thanks for contributing! This repo is an Angular Universal application with SSR and prerendering. Please follow the steps below to keep changes consistent and easy to review.

## Getting Started
- Install dependencies: `npm install` or `yarn`.
- Start the dev server: `npm run start`.
- Build SSR locally: `npm run build:ssr && npm run serve:ssr`.

## Branching & Workflow
- Create a feature branch from `main` or the default branch.
- Keep changes focused and small; split large work into multiple PRs.

## Commit Messages
- Use Conventional Commits: `type(scope?): subject`.
- Examples: `feat: add projects carousel`, `fix(ssr): handle missing graph data`.
- Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Code Style
- Use TypeScript + SCSS.
- Run `npm run lint` before opening a PR.

## Tests
- Run unit tests with `ng test` if your change impacts UI or logic.
- Add or update `*.spec.ts` tests when changing behavior.

## Pull Requests
- Include a clear summary, the motivation for the change, and testing notes.
- Add screenshots or short clips for UI changes.
- Link related issues or tickets when available.

## Security
- Please read `SECURITY.md` for reporting vulnerabilities.
