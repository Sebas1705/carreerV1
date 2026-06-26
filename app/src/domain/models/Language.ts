export type Language = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'ja';
export const supportedLanguages: Language[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'];
export const languageNames: { [key in Language]: string } = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    nl: 'Nederlands',
    pl: 'Polski',
    ru: 'Русский',
    ja: '日本語',
};

// Translation object with language codes as keys and translated strings as values
export type Translations = {
    [key in Language]: string;
};

export function translate(translations: Translations, lang: Language): string {
    return translations[lang] || translations['en'] || translations['es'] || '';
};