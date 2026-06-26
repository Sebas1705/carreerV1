import type { ISoftSkillRepository, SoftSkill, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

type LocalizedString = Record<string, string>;

interface ApiSoftSkill {
    id: string;
    name: LocalizedString;
    description?: LocalizedString;
    icon?: string;
    level?: number;
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

function clampLevel(n: number | undefined): 1 | 2 | 3 | 4 | 5 {
    const clamped = Math.min(5, Math.max(1, Math.round(n ?? 3)));
    return clamped as 1 | 2 | 3 | 4 | 5;
}

export class ApiSoftSkillRepository implements ISoftSkillRepository {
    async getAll(): Promise<SoftSkill[]> {
        const data = await apiGet<ApiSoftSkill[]>('/soft-skills');
        return data.map((s) => ({
            id: s.id,
            name: fill(s.name),
            description: fill(s.description ?? {}, s.name['en'] || s.id),
            icon: s.icon ?? '⭐',
            level: clampLevel(s.level),
        }));
    }
}
