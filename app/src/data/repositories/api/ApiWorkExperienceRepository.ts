import type { IWorkExperienceRepository, WorkExperience, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

type LocalizedString = Record<string, string>;

interface ApiJob {
    id: string;
    company: string;
    companyUrl?: string;
    startDate: string;
    endDate: string | null;
    role: LocalizedString;
    desc: LocalizedString;
    achievements: Record<string, string[]>;
}

function fill(ls: LocalizedString, fallback = ''): Translations {
    const base = ls['en'] || ls['es'] || fallback;
    return {
        en: ls['en'] || base, es: ls['es'] || base,
        fr: ls['fr'] || base, de: ls['de'] || base, it: ls['it'] || base,
        pt: ls['pt'] || base, nl: ls['nl'] || base, pl: ls['pl'] || base,
        ru: ls['ru'] || base, ja: ls['ja'] || base,
    } as Translations;
}

function parseYearMonth(ym: string): Date {
    const [year, month] = ym.split('-').map(Number);
    return new Date(year, (month || 1) - 1, 1);
}

function mapAchievements(raw: Record<string, string[]>): Translations[] {
    const en = raw['en'] ?? [];
    const es = raw['es'] ?? [];
    const maxLen = Math.max(en.length, es.length);
    return Array.from({ length: maxLen }, (_, i) => {
        const enVal = en[i] ?? es[i] ?? '';
        const esVal = es[i] ?? enVal;
        return fill({ en: enVal, es: esVal });
    });
}

export class ApiWorkExperienceRepository implements IWorkExperienceRepository {
    async getById(id: string): Promise<WorkExperience | null> {
        const all = await this.getAll();
        return all.find(w => w.id === id) ?? null;
    }

    async getAll(): Promise<WorkExperience[]> {
        const jobs = await apiGet<ApiJob[]>('/jobs');
        return jobs.map((j): WorkExperience => ({
            id: j.id,
            company: j.company,
            companyUrl: j.companyUrl,
            position: fill(j.role),
            description: fill(j.desc),
            startDate: parseYearMonth(j.startDate),
            endDate: j.endDate ? parseYearMonth(j.endDate) : undefined,
            location: fill({ en: 'Madrid, Spain', es: 'Madrid, España' }),
            technologies: [],
            achievements: mapAchievements(j.achievements),
        }));
    }
}
