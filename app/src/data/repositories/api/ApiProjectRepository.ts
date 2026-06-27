import type { IProjectRepository, Project, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

type LocalizedString = Record<string, string>;

interface ApiProject {
    id: string;
    name: string;
    context: 'work' | 'academic' | 'personal';
    desc: LocalizedString;
    long_desc?: LocalizedString;
    tags: string[];
    github: string | null;
    demo: string | null;
    imageUrl?: string | null;
}

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const LOCAL_IMAGES = new Set(['agedi', 'sisley', 'youknow', 'iberext', 'epdm', 'vpsorchestrator', 'portfolio', 'codewars']);

function projectImageUrl(id: string, apiImage?: string | null): string | undefined {
    if (apiImage) return apiImage;
    if (LOCAL_IMAGES.has(id)) return `${BASE}projects/${id}.webp`;
    return undefined;
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

export class ApiProjectRepository implements IProjectRepository {
    async getAll(): Promise<Project[]> {
        const projects = await apiGet<ApiProject[]>('/projects');
        return projects.map((p): Project => ({
            id: p.id,
            title: fill(p.name),
            description: fillLs(p.desc),
            technologies: p.tags,
            type: p.context,
            repoUrl: p.github ?? undefined,
            demoUrl: p.demo ?? undefined,
            imageUrl: projectImageUrl(p.id, p.imageUrl),
            startDate: new Date('2024-01-01'),
        }));
    }

    async getById(id: string): Promise<Project | null> {
        const all = await this.getAll();
        return all.find(p => p.id === id) ?? null;
    }

    async getByType(type: 'work' | 'academic' | 'personal'): Promise<Project[]> {
        const all = await this.getAll();
        return all.filter(p => p.type === type);
    }

    async getByRelatedTo(_relatedId: string): Promise<Project[]> {
        return [];
    }
}
