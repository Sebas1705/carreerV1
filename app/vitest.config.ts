import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                '.astro/',
                '**/*.config.*',
                '**/*.d.ts',
                '**/types.ts',
                '**/index.ts',
                'coverage/',
                'docs/',
                'tests/e2e/**',
                '**/*.astro',
                '**/pages/**',
                // Excluir datasources JSON y carpetas de sólo tipos que no aportan código ejecutable
                'src/data/datasources/**',
                'src/data/datasources/**/*.json',
                'src/domain/i-repositories/**',
                'src/domain/models/**',
                // HTTP adapter layer — covered by E2E, not unit tests
                'src/data/datasources/api/**',
                'src/data/repositories/api/**'
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@domain': path.resolve(__dirname, './src/domain'),
            '@data': path.resolve(__dirname, './src/data'),
            '@core': path.resolve(__dirname, './src/core'),
            '@presentation': path.resolve(__dirname, './src/presentation')
        }
    }
});
