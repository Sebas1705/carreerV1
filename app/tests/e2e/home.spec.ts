import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('en/');
    });

    test('should load the page', async ({ page }) => {
        await expect(page).toHaveTitle(/Sebastián|Sebastian/i);
    });

    test('should display header with navigation', async ({ page }) => {
        const header = page.locator('header, [role="banner"]').first();
        await expect(header).toBeVisible();

        // Verificar que haya al menos varios enlaces de navegación (resiliente a cambios de markup)
        const navLinks = header.locator('nav a, a[role="link"], a');
        const count = await navLinks.count();
        expect(count).toBeGreaterThan(4);
    });

    test('should have theme toggle button', async ({ page }) => {
        const themeToggle = page.locator('label.theme-toggle-label, button[aria-label*="theme"], button[data-testid="theme-toggle"]').first();
        await expect(themeToggle).toBeVisible();
    });

    test('should have language selector', async ({ page }) => {
        const langSelector = page.locator('.language-button, .language-selector, button[aria-label*="language"]').first();
        await expect(langSelector).toBeVisible();
    });

    test('should display hero section', async ({ page }) => {
        const headings = page.locator('h1, h2, h3');
        const count = await headings.count();
        let found = false;
        for (let i = 0; i < count; i++) {
            const el = headings.nth(i);
            if (await el.isVisible()) {
                const txt = await el.innerText();
                if (/(Sebastián|Sebastian)/i.test(txt)) {
                    found = true;
                    break;
                }
            }
        }
        expect(found).toBe(true);
    });

    test('should display main sections (about, work, education, projects, contact) if present', async ({ page }) => {
        const selectors = ['#about', '[data-section="about"]', 'section[aria-labelledby*="about"]', '#work', '#education', '#projects', '#contact'];

        for (const sel of selectors) {
            const el = page.locator(sel).first();
            // No hacemos un fallo estricto: solo comprobamos visibilidad cuando existe en el DOM
            if (await el.count() > 0) {
                await expect(el).toBeVisible();
            }
        }
    });

    test('should display footer', async ({ page }) => {
        const footer = page.locator('footer, [role="contentinfo"]');
        await expect(footer).toBeVisible();
    });
});
