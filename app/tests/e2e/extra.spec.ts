import { test, expect } from '@playwright/test';

test.describe('Extra coverage', () => {
    test('mobile menu opens and closes on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('en/');

        const toggle = page.locator('#mobile-menu-toggle').first();
        const nav = page.locator('#nav-links').first();

        if (await toggle.count() === 0 || await nav.count() === 0) return;

        // Inicialmente el nav está oculto en mobile
        const initialClass = (await nav.getAttribute('class')) || '';
        expect(initialClass).toContain('hidden');

        // Abrir menú
        await toggle.click();
        await page.waitForTimeout(100);
        expect((await nav.getAttribute('class')) || '').not.toContain('hidden');

        // Si hay un enlace dentro, hacer click y comprobar que se cierra
        const link = nav.locator('a').first();
        if (await link.count() > 0) {
            await link.click();
            await page.waitForTimeout(100);
            expect((await nav.getAttribute('class')) || '').toContain('hidden');
        }
    });

    test('contact section exposes mailto and social links', async ({ page }) => {
        await page.goto('en/');
        const contact = page.locator('#contact').first();
        await expect(contact).toBeVisible();

        const emailLink = contact.locator('a[href^="mailto:"]');
        await expect(emailLink.first()).toBeVisible();
        const href = await emailLink.first().getAttribute('href');
        expect(href).toContain('mailto:');
        expect(href).toContain('sebssgarcia502580@gmail.com');

        const socialLinks = contact.locator('a[href^="http"]');
        // Debe existir al menos un enlace social externo
        expect(await socialLinks.count()).toBeGreaterThan(0);
    });

    test('pages include meta description and title', async ({ page }) => {
        await page.goto('en/');
        const title = await page.title();
        expect(title.length).toBeGreaterThan(3);

        const desc = await page.locator('head meta[name="description"]').first().getAttribute('content');
        if (desc) expect(desc.length).toBeGreaterThan(10);

        // Proyecto detalle (si existe alguno)
        await page.goto('en/projects');
        const projectLink = page.locator('a[href*="/projects/"]').first();
        if (await projectLink.count() > 0) {
            await projectLink.click();
            await page.waitForLoadState('networkidle');
            const ptitle = await page.title();
            expect(ptitle.length).toBeGreaterThan(3);
        }
    });

    test('some images use lazy loading', async ({ page }) => {
        await page.goto('en/projects');
        // Comprobar que al menos algunas imágenes tienen loading="lazy"
        const lazyImgs = page.locator('img[loading="lazy"]');
        const count = await lazyImgs.count();
        expect(count).toBeGreaterThan(0);
    });
});
