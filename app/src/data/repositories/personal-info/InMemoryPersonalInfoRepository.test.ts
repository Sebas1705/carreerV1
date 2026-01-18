import { describe, it, expect } from 'vitest';
import { InMemoryPersonalInfoRepository } from './InMemoryPersonalInfoRepository';

describe('InMemoryPersonalInfoRepository', () => {
    describe('get', () => {
        it('should return personal info', async () => {
            const repository = new InMemoryPersonalInfoRepository();

            const result = await repository.get();

            expect(result).toBeDefined();
            expect(typeof result).toBe('object');
        });

        it('should return a copy of the personal info', async () => {
            const repository = new InMemoryPersonalInfoRepository();

            const result1 = await repository.get();
            const result2 = await repository.get();

            expect(result1).toEqual(result2);
            expect(result1).not.toBe(result2);
        });

        it('should return a new instance on each call', async () => {
            const repository = new InMemoryPersonalInfoRepository();

            const firstCall = await repository.get();
            const secondCall = await repository.get();

            expect(firstCall).not.toBe(secondCall);
        });

        it('should return an object with required PersonalInfo properties', async () => {
            const repository = new InMemoryPersonalInfoRepository();

            const result = await repository.get();

            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('email');
        });

        it('should return immutable data on modification attempts', async () => {
            const repository = new InMemoryPersonalInfoRepository();

            const result1 = await repository.get();
            const originalEmail = result1.email;

            ((result1 as unknown) as { email: string }).email = 'modified@test.com';

            const result2 = await repository.get();

            expect(result2.email).toBe(originalEmail);
        });
    });
});