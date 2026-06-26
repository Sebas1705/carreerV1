import type { ISkillRepository, Skill } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

interface ApiSkill {
    id: string;
    name: string;
    level: number;
    category: string;
    icon_url: string | null;
}

type DomainCategory = Skill['category'];

const CATEGORY_MAP: Record<string, DomainCategory> = {
    Android: 'frameworks',
    iOS: 'frameworks',
    Multiplatform: 'frameworks',
    Backend: 'frameworks',
    Architecture: 'architecture',
    Cloud: 'cloud',
    DevOps: 'tools',
    Tools: 'tools',
    AI: 'ai',
    Databases: 'databases',
    Languages: 'languages',
    IDEs: 'ides',
    OS: 'os',
    Methodologies: 'methodologies',
};

export class ApiSkillRepository implements ISkillRepository {
    async getAll(): Promise<Skill[]> {
        const skills = await apiGet<ApiSkill[]>('/skills');
        return skills.map((s): Skill => ({
            id: s.id,
            name: s.name,
            level: (Math.min(Math.max(s.level, 1), 5)) as Skill['level'],
            category: CATEGORY_MAP[s.category] ?? 'tools',
            iconUrl: s.icon_url ?? undefined,
        }));
    }

    async getById(id: string): Promise<Skill | null> {
        const all = await this.getAll();
        return all.find(s => s.id === id) ?? null;
    }

    async getByCategory(category: string): Promise<Skill[]> {
        const all = await this.getAll();
        return all.filter(s => s.category === category);
    }

    async getByLevel(level: number): Promise<Skill[]> {
        const all = await this.getAll();
        return all.filter(s => s.level === level);
    }
}
