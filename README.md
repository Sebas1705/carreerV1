# 🌟 Personal Portfolio

Professional web portfolio built with **Astro** and **Clean Architecture**, designed to showcase work experience, academic background and projects in a modern, responsive way.

## ✨ Features

- 🏗️ **Clean Architecture**: Code organized in layers (Domain, Application, Infrastructure, Presentation)
- 🎨 **Modern Design**: Responsive and attractive UI with smooth animations

# 🌟 Personal Portfolio

Professional web portfolio built with **Astro** and **Clean Architecture**. This repository contains the frontend Astro workspace in the `app/` folder and additional documentation.

## ✨ Key Features

- Clean Architecture (Domain, Use Cases, Infrastructure, Presentation)
- Responsive modern UI with light/dark theme
- Multilingual (Spanish & English)
- Optimized for performance with Astro
- Accessibility-minded (WCAG)
- Automated tests (Vitest + Playwright)

## 🚀 Quick Start

Prerequisites:

- Node.js 18+
- pnpm (recommended) or npm

Install and run (frontend workspace):

```bash
git clone https://github.com/Sebas1705/my-portfolio.git
cd my-portfolio/app
pnpm install
pnpm run dev
```

The development server typically runs at `http://localhost:4321`.

## 📜 Relevant Scripts (from `app/package.json`)

Use the commands from the `app` folder. Examples:

```bash
pnpm run dev           # starts dev server (astro dev)
pnpm run build         # runs astro check && astro build
pnpm run preview       # preview the production build
pnpm test              # run unit tests (vitest)
pnpm run test:watch    # vitest in watch mode
pnpm run test:coverage # runs vitest with coverage
pnpm run test:e2e      # runs Playwright E2E tests
```

## 📁 Project Layout

```
my-portfolio/
├── app/         # Astro frontend workspace (source code, tests, package.json)
├── public/      # Static assets
├── docs/        # Additional docs
├── AGENTS.md    # Architecture and development guidelines
└── README.md    # This file (updated)
```

## 🛠️ Customize

- Edit personal data in `app/src/infrastructure/data/`
- Update translations in `app/src/infrastructure/i18n/`
- Modify theme tokens in `app/src/presentation/styles/global.css`

## 🧪 Testing

Run tests from the `app` folder:

```bash
pnpm test
pnpm run test:coverage
pnpm run test:watch
```

Coverage exclusions (configured in `vitest.config.ts`) avoid counting pure data or model-only files that skew results.

## 🚢 Deployment

Build:

```bash
pnpm run build
```

The output is in `app/dist/` (or `dist/` depending on Astro config). Deploy to GitHub Pages, Vercel or Netlify by connecting the repo and following each provider's instructions.

## 🧾 Technologies

- Astro
- TypeScript
- Vitest
- Playwright
- Tailwind CSS (styles)

## 🤝 Contributing

1. Fork and create a branch
2. Implement changes and tests
3. Run `pnpm test` and ensure coverage
4. Open a pull request

## 📄 License

MIT

## 👤 Author

Sebastián Ramiro Entrerrios García — https://github.com/Sebas1705

---

If you want, I can also create a git branch and commit this change. Which do you prefer?
Note: To avoid data-only files (JSON/datasources) and pure type files showing 0% and skewing the report, `vitest.config.ts` includes exclusions for `src/data/datasources/**` and `src/domain/models/**`. Adjust these exclusions in `vitest.config.ts` if you want to include them explicitly in coverage.
