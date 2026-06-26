import { test, expect } from '@playwright/test';

test.describe('Meta and html attributes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('en/');
    });

    test('html has lang attribute matching route', async ({ page }) => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
        expect(lang?.startsWith('en')).toBe(true);
    });

    test('page has title and meta description', async ({ page }) => {
        const title = await page.title();
        expect(title.length).toBeGreaterThan(2);

        const desc = await page.locator('meta[name="description"]').first().getAttribute('content');
        if (desc) {
            expect(desc.length).toBeGreaterThan(10);
        }
    });

    test('has viewport meta and charset when present', async ({ page }) => {
        const viewportCount = await page.locator('meta[name="viewport"]').count();
        const charsetCount = await page.locator('meta[charset]').count();
        expect(viewportCount + charsetCount).toBeGreaterThan(0);
    });
});
