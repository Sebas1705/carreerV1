import type { IAcademicExperienceRepository, AcademicExperience, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

type LocalizedString = Record<string, string>;

interface ApiEducation {
    id: string;
    school: string;
    degree: LocalizedString;
    period: LocalizedString;
    detail: LocalizedString;
}

function fill(en: string): Translations {
    return { en, es: en, fr: en, de: en, it: en, pt: en, nl: en, pl: en, ru: en, ja: en } as Translations;
}

function fillLs(ls: LocalizedString): Translations {
    const base = ls['en'] || ls['es'] || '';
    return {
        en: ls['en'] || base, es: ls['es'] || base,
        fr: base, de: base, it: base, pt: base, nl: base, pl: base, ru: base, ja: base,
    } as Translations;
}

// Parse "September 2020 - July 2025" → {start, end}
const MONTHS: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function parsePeriod(period: string): { startDate: Date; endDate?: Date } {
    const parts = period.split('-').map(s => s.trim());
    const parseDate = (s: string): Date | undefined => {
        if (!s || s.toLowerCase() === 'present') return undefined;
        const words = s.toLowerCase().split(/\s+/);
        const year = parseInt(words.find(w => /^\d{4}$/.test(w)) ?? '', 10);
        const monthName = words.find(w => MONTHS[w] !== undefined);
        if (!year) return undefined;
        return new Date(year, monthName ? MONTHS[monthName] : 0, 1);
    };
    return {
        startDate: parseDate(parts[0]) ?? new Date('2020-01-01'),
        endDate: parts[1] ? parseDate(parts[1]) : undefined,
    };
}

export class ApiAcademicExperienceRepository implements IAcademicExperienceRepository {
    async getAll(): Promise<AcademicExperience[]> {
        const items = await apiGet<ApiEducation[]>('/education');
        return items.map((e): AcademicExperience => {
            const { startDate, endDate } = parsePeriod(e.period['en'] ?? '');
            return {
                id: e.id,
                institution: fill(e.school),
                degree: fillLs(e.degree),
                field: fillLs(e.degree),
                description: fillLs(e.detail),
                startDate,
                endDate,
                location: fill('Madrid, Spain'),
                achievements: [],
            };
        });
    }

    async getById(id: string): Promise<AcademicExperience | null> {
        const all = await this.getAll();
        return all.find(e => e.id === id) ?? null;
    }
}
