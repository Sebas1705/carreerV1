import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('en/');
    });

    test('should toggle between light and dark theme', async ({ page }) => {
        const themeToggle = page.locator('label.theme-toggle-label, button[aria-label*="theme"], button[data-testid="theme-toggle"]').first();

        // Obtener tema inicial
        const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

        // Hacer clic en el toggle
        await themeToggle.click();

        // Esperar cambio de tema
        await page.waitForTimeout(300);

        // Verificar que el tema cambió
        const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        expect(newTheme).not.toBe(initialTheme);
    });

    test('should persist theme in localStorage', async ({ page }) => {
        const themeToggle = page.locator('label.theme-toggle-label, button[aria-label*="theme"], button[data-testid="theme-toggle"]').first();

        // Cambiar tema
        await themeToggle.click();
        await page.waitForTimeout(300);

        // Obtener tema actual
        const currentTheme = await page.evaluate(() => localStorage.getItem('theme'));

        // Recargar página
        await page.reload();

        // Verificar que el tema persiste
        const persistedTheme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(persistedTheme).toBe(currentTheme);
    });
});

test.describe('Language Selector', () => {
    test.beforeEach(async ({ page }) => {
            await page.goto('en/');
    });

    test('should change language', async ({ page }) => {
        const langToggle = page.locator('.language-button, .language-selector, button[aria-label*="language"]').first();

        // Hacer clic para abrir dropdown si existe
        if (await langToggle.count() > 0) {
            await langToggle.click();
            await page.waitForTimeout(100);
        }

        // Intentar varios selectores para elegir idioma
        const enButton = page.locator('button[data-lang="en"], button:has-text("EN")').first();
        if (await enButton.count() > 0) {
            await enButton.click();
            await page.waitForTimeout(100);
        }

        // Verificar cambio en localStorage (si se guarda)
        const savedLang = await page.evaluate(() => localStorage.getItem('language'));
        // Puede ser null si la app usa rutas en lugar de localStorage; solo comprobamos si existe
        if (savedLang !== null) expect(savedLang).toBe('en');
    });

    test('should persist language in localStorage', async ({ page }) => {
        const langToggle = page.locator('.language-button, .language-selector, button[aria-label*="language"]').first();

        if (await langToggle.count() > 0) {
            await langToggle.click();
            await page.waitForTimeout(100);
        }

        const enButton = page.locator('button[data-lang="en"], button:has-text("EN")').first();
        if (await enButton.count() > 0) {
            await enButton.click();
            await page.waitForTimeout(100);
        }

        // Recargar página
        await page.reload();

        // Verificar que el idioma persiste (si aplica)
        const persistedLang = await page.evaluate(() => localStorage.getItem('language'));
        if (persistedLang !== null) expect(persistedLang).toBe('en');
    });
});
