import { describe, it, expect } from 'vitest';
import { GetRelatedProjectsUseCase } from '@/domain';
import { InMemoryProjectRepository } from '@/data';

describe('GetRelatedProjectsUseCase', () => {
    it('should return projects related to a specific experience', async () => {
        const repository = new InMemoryProjectRepository();
        const useCase = new GetRelatedProjectsUseCase(repository);

        const projects = await useCase.execute('solusoft-junior-0');

        expect(projects).toBeDefined();
        expect(Array.isArray(projects)).toBe(true);
        projects.forEach(project => {
            expect(project.relatedTo?.includes('solusoft-junior-0')).toBe(true);
        });
    });

    it('should return empty array for non-existent experience', async () => {
        const repository = new InMemoryProjectRepository();
        const useCase = new GetRelatedProjectsUseCase(repository);

        const projects = await useCase.execute('non-existent-id');

        expect(projects).toBeDefined();
        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toBe(0);
    });

    it('should return projects sorted by start date', async () => {
        const repository = new InMemoryProjectRepository();
        const useCase = new GetRelatedProjectsUseCase(repository);

        const projects = await useCase.execute('solusoft-junior-0');

        if (projects.length > 1) {
            for (let i = 0; i < projects.length - 1; i++) {
                expect(projects[i].startDate.getTime()).toBeGreaterThanOrEqual(
                    projects[i + 1].startDate.getTime()
                );
            }
        }
    });
});
