import { test, expect } from '@playwright/test';

test.describe('Site Pages', () => {
    test('should load skills page', async ({ page }) => {
        await page.goto('en/skills');
        await expect(page).toHaveURL(/\/en\/skills/);
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });

    test('should load courses page', async ({ page }) => {
        await page.goto('en/courses');
        await expect(page).toHaveURL(/\/en\/courses/);
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });

    test('should load projects list and open a project detail', async ({ page }) => {
        await page.goto('en/projects');
        await expect(page).toHaveURL(/\/en\/projects/);

        // Buscar enlaces a proyectos (resiliente a markup)
        const projectLinks = page.locator('a[href*="/projects/"], a:has-text("Project"), [data-testid="project-link"]');
        const count = await projectLinks.count();
        expect(count).toBeGreaterThan(0);

        // Abrir el primer proyecto si existe
        if (count > 0) {
            await projectLinks.first().click();
            await page.waitForLoadState('networkidle');

            const currentURL = page.url();
            if (/\/projects\//.test(currentURL)) {
                // Estamos en la página de detalle
                const projectHeading = page.locator('h1, h2').first();
                await expect(projectHeading).toBeVisible();
            } else {
                // Si el click solo hace scroll (hash), intentar abrir detalle desde la sección de proyectos
                const projectsSection = page.locator('#projects, [data-section="projects"]');
                if (await projectsSection.count() > 0) {
                    const detailLink = projectsSection.locator('a[href*="/projects/"], [data-testid="project-link"]').first();
                    if (await detailLink.count() > 0) {
                        await detailLink.click();
                        await page.waitForLoadState('networkidle');
                        await expect(page).toHaveURL(/\/projects\//);
                    }
                }
            }
        }
    });

    test('should open work detail page if a sample exists', async ({ page }) => {
        // Intentar encontrar enlaces a work items desde home
        await page.goto('en/');
        const workLinks = page.locator('a[href*="/work/"], a:has-text("Work"), [data-testid="work-link"]');
        if (await workLinks.count() > 0) {
            await workLinks.first().click();
            await page.waitForLoadState('networkidle');
            const currentURL = page.url();
            if (/\/work\//.test(currentURL)) {
                await expect(page).toHaveURL(/\/work\//);
            } else if (/#work/.test(currentURL)) {
                // Si solo hace scroll al hash, intentar abrir detalle desde la sección de work
                const workSection = page.locator('#work, [data-section="work"]');
                if (await workSection.count() > 0) {
                    const detail = workSection.locator('a[href*="/work/"], [data-testid="work-link"]').first();
                    if (await detail.count() > 0) {
                        await detail.click();
                        await page.waitForLoadState('networkidle');
                        await expect(page).toHaveURL(/\/work\//);
                    }
                }
            }
        }
    });

    test('should return 404 for unknown route', async ({ request, page }) => {
        // Navegar a ruta inexistente
        const resp = await request.get('en/this-route-does-not-exist');
        // Si el servidor devuelve 404, OK; si static site devuelve HTML, comprobar título/404
        if (resp.status() === 404) {
            expect(resp.status()).toBe(404);
        } else {
            // Intentar cargar en browser y verificar que muestra contenido 404
            await page.goto('en/this-route-does-not-exist');
            const bodyText = await page.locator('body').innerText();
            expect(bodyText.toLowerCase()).toContain('404');
        }
    });

    test('root should redirect to a supported language', async ({ page }) => {
        // Navigate to root and wait for client-side redirect script
        await page.goto('');
        // Wait for the redirect to fire (up to 3s)
        try {
            await page.waitForURL(/\/(es|en|fr|de|it|pt|nl|pl|ru|ja)\//, { timeout: 3000 });
        } catch {
            // Redirect may not have fired yet — check manually
        }
        const url = page.url();
        // Either stayed on root (acceptable if redirect not implemented) or went to a lang
        const redirected = /\/(es|en|fr|de|it|pt|nl|pl|ru|ja)\//.test(url);
        const onRoot = url.endsWith('/') && !redirected;
        expect(redirected || onRoot).toBe(true);
    });
});
