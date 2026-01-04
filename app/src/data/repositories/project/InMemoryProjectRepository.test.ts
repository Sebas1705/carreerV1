import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryProjectRepository } from '@/data';

describe('InMemoryProjectRepository', () => {
    let repository: InMemoryProjectRepository;

    beforeEach(() => {
        repository = new InMemoryProjectRepository();
    });

    describe('getAll', () => {
        it('should return all projects', async () => {
            const projects = await repository.getAll();
            expect(projects).toBeDefined();
            expect(Array.isArray(projects)).toBe(true);
            expect(projects.length).toBeGreaterThan(0);
        });

        it('should return projects sorted by start date descending', async () => {
            const projects = await repository.getAll();
            for (let i = 0; i < projects.length - 1; i++) {
                expect(projects[i].startDate.getTime()).toBeGreaterThanOrEqual(
                    projects[i + 1].startDate.getTime()
                );
            }
        });
    });

    describe('getByType', () => {
        it('should return only personal projects', async () => {
            const projects = await repository.getByType('personal');
            expect(projects.every(p => p.type === 'personal')).toBe(true);
        });

        it('should return only work projects', async () => {
            const projects = await repository.getByType('work');
            expect(projects.every(p => p.type === 'work')).toBe(true);
        });

        it('should return only academic projects', async () => {
            const projects = await repository.getByType('academic');
            expect(projects.every(p => p.type === 'academic')).toBe(true);
        });
    });

    describe('getById', () => {
        it('should return a project by id', async () => {
            const allProjects = await repository.getAll();
            const firstProject = allProjects[0];
            
            const project = await repository.getById(firstProject.id);
            
            expect(project).toBeDefined();
            expect(project?.id).toBe(firstProject.id);
        });

        it('should return null for non-existent id', async () => {
            const project = await repository.getById('non-existent-id');
            expect(project).toBeNull();
        });
    });

    describe('getByRelatedTo', () => {
        it('should return projects related to an experience', async () => {
            const projects = await repository.getByRelatedTo('solusoft-junior-0');
            expect(projects.every(p => p.relatedTo?.includes('solusoft-junior-0'))).toBe(true);
        });

        it('should return empty array for non-existent relation', async () => {
            const projects = await repository.getByRelatedTo('non-existent');
            expect(projects).toEqual([]);
        });
    });
});
