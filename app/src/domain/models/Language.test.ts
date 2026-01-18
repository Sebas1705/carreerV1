import { describe, it, expect } from 'vitest';
import { supportedLanguages, languageNames, translate } from './Language';
import type { Translations } from './Language';

describe('Language utilities', () => {
    describe('supportedLanguages', () => {
        it('should have exactly 10 supported languages', () => {
            expect(supportedLanguages).toHaveLength(10);
        });

        it('should contain all expected languages', () => {
            expect(supportedLanguages).toContain('es');
            expect(supportedLanguages).toContain('en');
            expect(supportedLanguages).toContain('fr');
            expect(supportedLanguages).toContain('de');
            expect(supportedLanguages).toContain('it');
            expect(supportedLanguages).toContain('pt');
            expect(supportedLanguages).toContain('nl');
            expect(supportedLanguages).toContain('pl');
            expect(supportedLanguages).toContain('ru');
            expect(supportedLanguages).toContain('ja');
        });

        it('should be in correct order', () => {
            expect(supportedLanguages).toEqual(['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja']);
        });

        it('should not have duplicates', () => {
            const unique = new Set(supportedLanguages);
            expect(unique.size).toBe(supportedLanguages.length);
        });
    });

    describe('languageNames', () => {
        it('should have names for all supported languages', () => {
            supportedLanguages.forEach(lang => {
                expect(languageNames[lang]).toBeDefined();
                expect(languageNames[lang]).not.toBe('');
            });
        });

        it('should have correct language names in Spanish', () => {
            expect(languageNames.es).toBe('Español');
        });

        it('should have correct language names in English', () => {
            expect(languageNames.en).toBe('English');
        });

        it('should have correct language names in French', () => {
            expect(languageNames.fr).toBe('Français');
        });

        it('should have correct language names in German', () => {
            expect(languageNames.de).toBe('Deutsch');
        });

        it('should have correct language names in Italian', () => {
            expect(languageNames.it).toBe('Italiano');
        });

        it('should have correct language names in Portuguese', () => {
            expect(languageNames.pt).toBe('Português');
        });

        it('should have correct language names in Dutch', () => {
            expect(languageNames.nl).toBe('Nederlands');
        });

        it('should have correct language names in Polish', () => {
            expect(languageNames.pl).toBe('Polski');
        });

        it('should have correct language names in Russian', () => {
            expect(languageNames.ru).toBe('Русский');
        });

        it('should have correct language names in Japanese', () => {
            expect(languageNames.ja).toBe('日本語');
        });

        it('should have exactly 10 language names', () => {
            const names = Object.keys(languageNames);
            expect(names).toHaveLength(10);
        });
    });

    describe('translate function', () => {
        it('should return translation for available language', () => {
            const translations: Translations = {
                es: 'Hola',
                en: 'Hello',
                fr: 'Bonjour',
                de: 'Hallo',
                it: 'Ciao',
                pt: 'Olá',
                nl: 'Hallo',
                pl: 'Cześć',
                ru: 'Привет',
                ja: 'こんにちは'
            };

            expect(translate(translations, 'es')).toBe('Hola');
            expect(translate(translations, 'en')).toBe('Hello');
            expect(translate(translations, 'fr')).toBe('Bonjour');
            expect(translate(translations, 'de')).toBe('Hallo');
            expect(translate(translations, 'it')).toBe('Ciao');
            expect(translate(translations, 'pt')).toBe('Olá');
            expect(translate(translations, 'nl')).toBe('Hallo');
            expect(translate(translations, 'pl')).toBe('Cześć');
            expect(translate(translations, 'ru')).toBe('Привет');
            expect(translate(translations, 'ja')).toBe('こんにちは');
        });

        it('should return "String not found" when translation is missing', () => {
            const translations: Translations = {
                es: '',
                en: '',
                fr: '',
                de: '',
                it: '',
                pt: '',
                nl: '',
                pl: '',
                ru: '',
                ja: ''
            };

            // @ts-expect-error - testing runtime behavior
            expect(translate(translations, 'es')).toBe('String not found');
        });

        it('should handle partial translations gracefully', () => {
            const translations: Translations = {
                es: 'Hola',
                en: 'Hello',
                fr: '',
                de: '',
                it: '',
                pt: '',
                nl: '',
                pl: '',
                ru: '',
                ja: ''
            };

            expect(translate(translations, 'es')).toBe('Hola');
            expect(translate(translations, 'en')).toBe('Hello');
        });

        it('should work with all supported languages', () => {
            const translations: Translations = {
                es: 'Test',
                en: 'Test',
                fr: 'Test',
                de: 'Test',
                it: 'Test',
                pt: 'Test',
                nl: 'Test',
                pl: 'Test',
                ru: 'Test',
                ja: 'Test'
            };

            supportedLanguages.forEach(lang => {
                expect(translate(translations, lang)).toBe('Test');
            });
        });

        it('should be case sensitive for language codes', () => {
            const translations: Translations = {
                es: 'Hola',
                en: 'Hello',
                fr: 'Bonjour',
                de: 'Hallo',
                it: 'Ciao',
                pt: 'Olá',
                nl: 'Hallo',
                pl: 'Cześć',
                ru: 'Привет',
                ja: 'こんにちは'
            };

            expect(translate(translations, 'es')).not.toBe(translate(translations, 'en'));
        });
    });
});
