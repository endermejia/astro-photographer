# AGENTS.md

## Project

Astro 5 static photography portfolio (nhoanoir.com). Multilingual: Spanish (default, hidden in URL) + English.

## Commands

- `npm start` - Dev server (localhost:4321)
- `npm run build` - Production build
- `npm run start:prod` - Preview production build
- `npm run lint` - Run all linters (ESLint + Stylelint + Prettier check)
- `npm run lint:fix` - Auto-fix all lint issues
- `npm run build:img` - Process images with Sharp (run before build when images change)
- `npm run test` - Accessibility tests via hint (starts prod server, runs hint against it)

## Code Style

- **Indentation**: Tabs (enforced by Prettier)
- **Quotes**: Single quotes in JS/TS
- **Trailing commas**: None
- **Semicolons**: Always
- **Line length**: 120 chars (Prettier)
- **CSS**: kebab-case classes, logical properties enforced (stylelint-use-logical-spec), SMACSS property order
- **Commits**: Conventional commits required (commitlint)

## Image Pipeline

Source images: `assets/img/albums/<category>/`
Output: `public/assets/img/` (3 sizes × 3 formats: 100/400/1920px × jpg/webp/avif)

Run `npm run build:img` after adding/changing photos. The output directory is gitignored.

## i18n

- Translations: `src/i18n/ui.ts`
- Default language: `es` (Spanish), hidden in URL (`/` not `/es/`)
- Album routes are manually defined in both `src/i18n/ui.ts` and `src/pages/[...album].astro`
- Adding a new album requires updating both files

## Architecture

- Pages: `src/pages/[...lang].astro` (home), `src/pages/[...album].astro` (albums)
- Layout: `src/layouts/Layout.astro` (single layout, wraps all pages)
- Components: `src/components/` (About, Album, Contact, Footer, Header, LanguageSelector, Navigation, Photos)
- Client scripts: `src/scripts/` (album.js, theme-toggle.js)
- Photo metadata: `src/utils/photos.mjs` reads filesystem to build album data

## Gotchas

- `dist/` and `.astro/` are gitignored (build outputs)
- `package-lock.json` is gitignored; project uses pnpm-lock.yaml
- `.lintstagedrc.json` runs Prettier + linter on staged files via Husky
- Browserslist targets alt-EU browsers + modern evergreen
- hint tests require a running prod server (started automatically by `npm run test`)
