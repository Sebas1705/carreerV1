# AGENTS — Project Guidelines and Architecture

This document defines the coding, testing, design and documentation rules for this repository. All project contributors must follow these guidelines. The canonical language for code, tests and documentation is English.

## 1. Purpose

Provide a single, actionable source of truth for:
- project structure and import aliases
- code architecture and responsibilities
- testing strategy (unit, integration, E2E) and coverage rules
- accepted tooling and commands (Astro, pnpm/npm, Vitest, Playwright, Tailwind)
- documentation and comment policy

## 2. Directory Structure (frontend workspace under `app/`)

Keep the `app/` folder as the self-contained Astro frontend workspace. Important folders:

- `app/src/core/` — cross-cutting utilities and helpers (date, linkify, constants)
- `app/src/domain/` — domain models, interfaces and use-cases
- `app/src/data/` — data sources and repository implementations (InMemory adapters)
- `app/src/presentation/` — UI components, layouts, pages (.astro)
- `app/tests/e2e/` — Playwright E2E tests
- `app/package.json` — frontend scripts and dependencies

Import aliases configured in `app/tsconfig.json` and `app/astro.config.mjs`: `@`, `@domain`, `@data`, `@core`, `@presentation`.

## 3. Architecture

Follow Clean Architecture principles:

- Inner layers (domain) must not depend on outer layers (infrastructure or presentation).
- Interfaces (repository contracts) live in the domain layer (`app/src/domain/i-repositories`).
- Use cases coordinate application logic and depend only on domain interfaces.
- Repositories and data adapters live in `app/src/data/` and implement domain interfaces.

Code responsibilities:

- Domain: pure TypeScript types, models, interfaces, and use-cases.
- Application: location for orchestrating use-cases (in this project, use-cases live under domain/use-cases).
- Infrastructure: concrete implementations, third-party integrations, JSON datasources.
- Presentation: Astro components and pages that call use-cases to render UI.

## 4. Language, Formatting and Naming

- Language: English for code, identifiers, tests and documentation.
- TypeScript: `strict` mode (see `app/tsconfig.json`).
- File naming: `PascalCase.astro` for components, `camelCase` for utilities, `UPPER_SNAKE_CASE` for constants.
- Exports: prefer named exports for types and functions; use default export only for the primary component of a file.
- Import order: external deps → types → use-cases → repositories → components.

Formatting and linting:

- Use a shared formatter (Prettier / EditorConfig) in the team. Configure a consistent setup in future PRs.

## 5. Tailwind Usage

- Tailwind is used for styling; configuration lives in `app/tailwind.config.cjs`.
- Keep utility classes expressive but avoid overly long class strings; extract repeated patterns to components or `@apply` utilities.
- Add dynamic class names to the `safelist` if they are generated at runtime (see `tailwind.config.cjs`).
- Prefer semantic component composition over creating many one-off utility wrappers.

## 6. Testing Strategy

Test types and purpose:

- Unit tests: fast, isolated tests for pure functions, use cases and small modules. Use Vitest and `happy-dom` environment.
- Integration tests: tests that exercise multiple modules together (e.g., use-cases + in-memory repositories). Also run with Vitest but may target more realistic setups.
- E2E tests: Playwright tests that exercise the running application via browser automation. Located in `app/tests/e2e/`.

How to run tests (from project root):

```bash
cd app
pnpm install
pnpm test                # unit + integration (vitest)
pnpm run test:coverage   # run coverage
pnpm run test:watch      # watch mode
pnpm run test:e2e        # Playwright E2E tests
```

Playwright notes:

- Playwright config uses a `webServer` to start a dev server; ensure `webServer.command` matches your package manager (`pnpm run dev` vs `npm run dev`).
- Base URL: `http://localhost:4321` by default.

Coverage policy:

- For existing code the project currently configures thresholds at 80% in `app/vitest.config.ts`.
- Policy for new code: any new feature, module or public API introduced must include tests that keep the *module-level* coverage >= 90% (lines, functions and statements). This means when adding new files, include tests to reach the 90% threshold for those files and the associated units.
- For PRs that add or change logic, CI must run `pnpm run test:coverage` and enforce the repository or package thresholds. Maintainers may tighten global thresholds in CI.

Test coverage exclusions (kept in config): data-only JSON files, auto-generated types and page components that don't contain logic are excluded from coverage to avoid skewing results.

## 7. CI and Verification Commands

Recommended local verification before opening a PR:

```bash
cd app
pnpm install
pnpm run build          # verify build and type checks (astro check included)
pnpm test               # run unit/integration tests
pnpm run test:coverage  # ensure coverage targets
pnpm run test:e2e       # run E2E (start a local server if Playwright webServer is not used)
```

Suggested CI steps:

1. Install dependencies (`pnpm install`).
2. Run type checking (`pnpm run build` or `pnpm run astro -- check`).
3. Run `pnpm run test:coverage` and fail the job if coverage drops below configured thresholds.
4. Run Playwright E2E tests against a deployed preview or spin up the dev server via Playwright `webServer`.

## 8. Playwright / Vitest Best Practices

- Avoid flaky tests: use `waitFor` assertions and avoid hard sleeps.
- Keep E2E tests focused on user flows, not unit logic.
- For Playwright, prefer `trace: 'on-first-retry'` to capture failures.
- Vitest tests should avoid external network calls; mock HTTP and external services.

## 9. Documentation Policy

Goal: Prefer self-documenting code. When additional documentation is required:

- Write clear, concise JSDoc/TSDoc for exported functions, classes and interfaces that have non-obvious behavior or a public contract.
- Document complex algorithms, edge cases, or business rules in `docs/` and link to their location from `AGENTS.md`.
- Keep README files minimal and actionable. The root `README.md` should contain quick-start, common scripts and deploy hints; more detailed guidelines belong to `AGENTS.md` or `docs/`.
- All documentation and inline documentation must be written in English.

Minimum documentation expectations:

- Public APIs: include TSDoc showing parameters, return values, thrown errors, and examples where appropriate.
- Complex modules: add a `README.md` inside the module folder or a markdown file in `docs/` describing usage and rationale.

Comment guidelines:

- Prefer code clarity over comments. If a comment explains what the code does, refactor the code instead.
- Use comments sparingly to explain the *why* (rationale), not the *what* (implementation).

## 10. Design and UX

- Follow accessible patterns: semantic HTML, `alt` on images, `aria-*` where necessary and visible focus styles.
- Keep animations subtle and optional for reduced-motion users.
- Prefer server-rendered or static-rendered content where possible (Astro) and minimize client-side JS.

## 11. Versioning and Releases

- Use semantic versioning for published packages or metadata. For the portfolio site, use tags for checkpoints and release notes in PR descriptions.

## 12. Enforcement and Reviews

- Pull requests must include: description of changes, tests added/updated, and any docs updated.
- Review checklist for maintainers:
  - Does the code follow the architecture boundaries?
  - Are new public APIs documented with types and examples?
  - Are tests added and passing, and does coverage meet the new-code threshold (>= 90%)?
  - Are styles consistent and Tailwind used properly?

## 13. Notable Repo Observations

- `app/vitest.config.ts` currently sets coverage thresholds to 80%; the team policy for new code requires 90% module-level coverage. Consider increasing global thresholds in CI or enforcing module-level checks in PRs.
- Playwright `webServer.command` uses `npm run dev` while `app/package.json` scripts assume `pnpm`. Align the command with the preferred package manager (recommend `pnpm run dev`).

---

## 14. .gitignore — excluded folders and rationale

This project intentionally excludes several generated folders and files from version control. Below is a list of commonly ignored entries and the reason each is excluded. When updating `.gitignore`, keep this documentation in sync.

- `dist/` and `app/dist/` — Production build outputs. These are generated artifacts and should not be committed.
- `.astro/` — Astro-generated intermediate files during development/build.
- `node_modules/` — Installed dependencies. Reproducible via `pnpm install`.
- `playwright-report/` and `app/playwright-report/` — Playwright E2E reports/traces. These are artifacts from test runs and can be large; store them in CI artifacts when needed.
- `test-results/` and `app/test-results/` — Generic test runners or CI test result outputs. Kept out of the repo to avoid noise.
- `coverage/` — Test coverage reports. Generated locally or in CI; publish via coverage artifacts if required.
- `.cache/` and `app/.cache/` — Build or tooling caches (Vite, Astro, other). Do not commit caches.
- `.vite/` — Vite cache directory.
- `.pnpm-store/` (if present) — pnpm store files: not tracked.
- `.env`, `.env*.local` — Environment variables with secrets or local overrides.
- `*.tsbuildinfo` — TypeScript incremental build files.
- `.vscode/`, `.idea/` — IDE-specific settings. Developers should keep personal editor configs local or add recommended settings to workspace settings instead of committing user-specific files.
- `.DS_Store`, `Thumbs.db` — OS file metadata.

If you need any of these files to be preserved for a specific CI step or release (for example, a reproducible artifact), store them in the CI artifacts (GitHub Actions, GitLab CI) or publish them to a release rather than committing them to the repository.

If you want, I can now:
1) create a branch and commit this `AGENTS.md`,
2) update `app/vitest.config.ts` thresholds to raise global coverage, or
3) update Playwright `webServer.command` to `pnpm run dev`.

Which action should I take next?
