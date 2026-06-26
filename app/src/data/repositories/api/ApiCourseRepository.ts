import type { ICourseRepository, Course, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

interface ApiCertification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string | null;
}

function fill(en: string): Translations {
    return { en, es: en, fr: en, de: en, it: en, pt: en, nl: en, pl: en, ru: en, ja: en } as Translations;
}

const MONTHS_SHORT: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(str: string): Date {
    const lower = str.toLowerCase().trim();
    if (lower === 'in progress') return new Date();
    const words = lower.split(/[\s-]+/);
    const year = parseInt(words.find(w => /^\d{4}$/.test(w)) ?? '', 10);
    const monthAbbr = words.find(w => MONTHS_SHORT[w.slice(0, 3)] !== undefined);
    const month = monthAbbr ? MONTHS_SHORT[monthAbbr.slice(0, 3)] : 0;
    return isNaN(year) ? new Date() : new Date(year, month, 1);
}

export class ApiCourseRepository implements ICourseRepository {
    async getAll(): Promise<Course[]> {
        const certs = await apiGet<ApiCertification[]>('/certifications');
        return certs.map((c): Course => ({
            id: c.id,
            title: fill(c.name),
            description: fill(c.name),
            institution: fill(c.issuer),
            completionDate: parseDate(c.date),
            certificateUrl: c.url ?? undefined,
            url: c.url ?? undefined,
        }));
    }

    async getById(id: string): Promise<Course | null> {
        const all = await this.getAll();
        return all.find(c => c.id === id) ?? null;
    }
}
