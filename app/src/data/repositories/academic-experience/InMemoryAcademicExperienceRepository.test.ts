import { describe, it, expect } from 'vitest';
import { InMemoryAcademicExperienceRepository } from '@/data';

describe('InMemoryAcademicExperienceRepository', () => {
    it('should return all academic experiences sorted by most recent first', async () => {
        const repository = new InMemoryAcademicExperienceRepository();
        const experiences = await repository.getAll();
        
        expect(experiences).toHaveLength(3);
        expect(experiences[0].startDate > experiences[1].startDate).toBe(true);
    });

    it('should return an academic experience by id', async () => {
        const repository = new InMemoryAcademicExperienceRepository();
        const experience = await repository.getById('baccalaureate');
        
        expect(experience).toBeDefined();
        expect(experience?.id).toBe('baccalaureate');
    });

    it('should return null for non-existent id', async () => {
        const repository = new InMemoryAcademicExperienceRepository();
        const experience = await repository.getById('non-existent');
        
        expect(experience).toBeNull();
    });
});
