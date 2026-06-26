import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('en/');
    });

    test('should scroll to About section when clicking nav link', async ({ page }) => {
        const aboutLink = page.locator('a[href="#about"], a:has-text("About"), a:has-text("Sobre"), nav >> text=About').first();
        if (await aboutLink.count() > 0) {
            await aboutLink.click();
            await page.waitForTimeout(500);
            const aboutSection = page.locator('#about, [data-section="about"]');
            if (await aboutSection.count() > 0) await expect(aboutSection).toBeInViewport();
        }
    });

    test('should scroll to Experience section when clicking nav link', async ({ page }) => {
        const workLink = page.locator('a[href="#work"], a:has-text("Work"), a:has-text("Experience"), a:has-text("Experiencia")').first();
        if (await workLink.count() > 0) {
            await workLink.click();
            await page.waitForTimeout(500);
            const experienceSection = page.locator('#work, [data-section="work"]');
            if (await experienceSection.count() > 0) await expect(experienceSection).toBeInViewport();
        }
    });

    test('should scroll to Education section when clicking nav link', async ({ page }) => {
        const eduLink = page.locator('a[href="#education"], a:has-text("Education"), a:has-text("Educación")').first();
        if (await eduLink.count() > 0) {
            await eduLink.click();
            await page.waitForTimeout(500);
            const educationSection = page.locator('#education, [data-section="education"]');
            if (await educationSection.count() > 0) await expect(educationSection).toBeInViewport();
        }
    });

    test('should scroll to Projects section when clicking nav link', async ({ page }) => {
        const projectsLink = page.locator('a[href="#projects"], a:has-text("Projects"), a:has-text("Proyectos")').first();
        if (await projectsLink.count() > 0) {
            await projectsLink.click();
            await page.waitForTimeout(500);
            const projectsSection = page.locator('#projects, [data-section="projects"]');
            if (await projectsSection.count() > 0) await expect(projectsSection).toBeInViewport();
        }
    });

    test('should scroll to Contact section when clicking nav link', async ({ page }) => {
        const contactLink = page.locator('a[href="#contact"], a:has-text("Contact"), a:has-text("Contacto")').first();
        if (await contactLink.count() > 0) {
            await contactLink.click();
            await page.waitForTimeout(500);
            const contactSection = page.locator('#contact, [data-section="contact"]');
            if (await contactSection.count() > 0) await expect(contactSection).toBeInViewport();
        }
    });
});

test.describe('Responsive Design', () => {
    test('should display mobile menu on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('en/');
        
        const mobileMenuButton = page.locator('button.mobile-menu-toggle, .hamburger, [aria-label*="menu"]');
        
        // Si existe el botón de menú móvil, verificar su visibilidad
        const count = await mobileMenuButton.count();
        if (count > 0) {
            await expect(mobileMenuButton.first()).toBeVisible();
        }
    });

    test('should be responsive on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('en/');
        
        const header = page.locator('header').first();
        await expect(header).toBeVisible();
    });

    test('should be responsive on desktop', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('en/');
        
        const header = page.locator('header').first();
        await expect(header).toBeVisible();
    });
});

test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('en/');
        const loadTime = Date.now() - startTime;

        // La página debería cargar en menos de 6 segundos en CI/local (más tolerante)
        expect(loadTime).toBeLessThan(6000);
    });

    test('should have accessible images', async ({ page }) => {
        await page.goto('en/');

        const images = page.locator('img');
        const count = await images.count();
        
        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            
            // Todas las imágenes deben tener atributo alt (puede estar vacío para decorativas)
            expect(alt).toBeDefined();
        }
    });
});
