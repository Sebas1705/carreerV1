# carreerV1 - Personal Portfolio

Personal portfolio built with **Astro 4**, **TypeScript**, and **Clean Architecture**. Fully static site (SSG) deployed on GitHub Pages, with live data fetched from the career API at build time.

**Live site:** https://sebas1705.github.io/carreerV1/

---

## Features

- **Clean Architecture** - Domain, Data, and Presentation layers with clear dependency rules
- **Fully static** - No client-side JS for routing or data fetching; all pages pre-rendered at build time
- **Live API data** - Jobs, projects, skills, education, soft skills and personal info from career-api at build time
- **10 languages** - ES, EN, FR, DE, IT, PT, NL, PL, RU, JA - static language picker, zero JS navigation
- **Dark / Light theme** - CSS variables + localStorage persistence
- **E2E tested** - Playwright tests in CI against the real preview build
- **CI/CD** - GitHub Actions: unit tests, build, E2E, GitHub Pages deploy

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 4 (SSG) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Unit tests | Vitest |
| E2E tests | Playwright |
| Data source | career-api (Cloudflare Workers + D1) |
| Hosting | GitHub Pages |

---

## Project Structure

```
carreerV1/
  app/
    src/
      core/                  # Cross-cutting helpers (url.ts, date, linkify)
      data/
        datasources/api/     # CareerApiClient - fetch wrapper for career-api
        repositories/
          api/               # ApiPersonalInfoRepository, ApiSoftSkillRepository ...
          in-memory/         # InMemory repos for labels and navigation (i18n strings)
      domain/
        models/              # Language, PersonalInfo, Job, Project, Skill ...
        i-repositories/      # Repository interfaces
        use-cases/           # GetPersonalInfoUseCase, GetJobsUseCase ...
      presentation/
        backgrounds/         # Decorative SVG/CSS backgrounds
        components/          # Astro components (Header, Footer, sections, cards)
        layouts/             # Layout.astro
        styles/              # global.css, CSS variables
    pages/
      index.astro            # Static language picker (no JS)
      404.astro
      [lang]/                # Generates /en/, /es/, /fr/ ...
        index.astro
        skills.astro
        courses.astro
        projects/
        work/
    tests/e2e/               # Playwright specs
  astro.config.mjs           # base: /carreerV1, output: static
  .github/workflows/ci.yml   # test, build, e2e, deploy pipeline
```

---

## Quick Start

Prerequisites: Node.js 18+, pnpm

```bash
git clone https://github.com/Sebas1705/carreerV1.git
cd carreerV1/app
pnpm install
pnpm run dev
```

Dev server runs at `http://localhost:4321/carreerV1/`

### Available Scripts

```bash
pnpm run dev            # Dev server with hot reload
pnpm run build          # Production build
pnpm run preview        # Preview production build locally
pnpm test               # Unit tests (Vitest)
pnpm run test:coverage  # Coverage report
pnpm run test:e2e       # E2E tests (Playwright)
```

---

## Architecture Notes

### URL helper

All internal hrefs go through `siteUrl(path)` in `src/core/url.ts` to correctly prepend the GitHub Pages base path:

```ts
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const siteUrl = (path: string) => BASE + path.replace(/^\//, '');
```

### Language routing

Root `/` renders a static language grid with no JS redirect. Each language has its own pre-rendered route (`/carreerV1/en/`, `/carreerV1/es/`, etc.). The `LanguageSelector` component generates `<a>` links at build time using `Astro.url.pathname` regex replacement - no client-side navigation logic.

### Data flow

All data is fetched from career-api over HTTP at build time, not at runtime in the browser:

```
career-api (Cloudflare D1)
  CareerApiClient  (HTTP at build time)
    Api Repository (ApiPersonalInfoRepository, ApiJobRepository ...)
      UseCase      (GetPersonalInfoUseCase ...)
        Astro page / component  (SSG output)
```

---

## CI/CD Pipeline

Runs on every push to `main`:

1. **test** - Vitest unit tests
2. **build** - Astro SSG build
3. **e2e** - `astro preview` + Playwright against the real build
4. **deploy** - GitHub Pages

---

## Related Repositories

| Repo | Description |
|---|---|
| [career-api](https://github.com/Sebas1705/career-api) | Hono + Cloudflare Workers API powering the data |
| [carreerV2](https://github.com/Sebas1705/carreerV2) | Portfolio v2 - React 19, Vite, Tailwind, PDF CV generator |
| [career-editor-kmp](https://github.com/Sebas1705/career-editor-kmp) | KMP desktop/Android editor for career-api data |
