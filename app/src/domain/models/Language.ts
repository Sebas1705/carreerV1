export type Language =
    | 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'ja'
    | 'zh' | 'ar' | 'sv' | 'no' | 'fi' | 'ko' | 'tr' | 'cs' | 'hu' | 'el';

export const supportedLanguages: Language[] = [
    'es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja',
    'zh', 'ar', 'sv', 'no', 'fi', 'ko', 'tr', 'cs', 'hu', 'el',
];

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
    zh: '中文',
    ar: 'العربية',
    sv: 'Svenska',
    no: 'Norsk',
    fi: 'Suomi',
    ko: '한국어',
    tr: 'Türkçe',
    cs: 'Čeština',
    hu: 'Magyar',
    el: 'Ελληνικά',
};

// Translation object with language codes as keys and translated strings as values
export type Translations = {
    [key in Language]: string;
};

export function translate(translations: Translations, lang: Language): string {
    if (translations[lang]) return translations[lang];
    if (translations['en']) return translations['en'];
    const first = Object.values(translations).find(Boolean);
    return first ?? 'String not found';
};