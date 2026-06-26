// API Repositories (live data from career-api.sebas1705.workers.dev)
export { ApiWorkExperienceRepository } from './api/ApiWorkExperienceRepository';
export { ApiProjectRepository } from './api/ApiProjectRepository';
export { ApiSkillRepository } from './api/ApiSkillRepository';
export { ApiAcademicExperienceRepository } from './api/ApiAcademicExperienceRepository';
export { ApiCourseRepository } from './api/ApiCourseRepository';
export { ApiPersonalInfoRepository } from './api/ApiPersonalInfoRepository';
export { ApiSoftSkillRepository } from './api/ApiSoftSkillRepository';

// Entity Repositories (Implementations)
export { InMemoryProjectRepository } from './project/InMemoryProjectRepository';
export { InMemoryWorkExperienceRepository } from './work-experience/InMemoryWorkExperienceRepository';
export { InMemoryAcademicExperienceRepository } from './academic-experience/InMemoryAcademicExperienceRepository';
export { InMemoryPersonalInfoRepository } from './personal-info/InMemoryPersonalInfoRepository';
export { InMemorySkillRepository } from './skill/InMemorySkillRepository';
export { InMemorySoftSkillRepository } from './softskill/InMemorySoftSkillRepository';
export { InMemoryCourseRepository } from './course/InMemoryCourseRepository';

// Label Repositories (Implementations)
export { InMemoryNavigationLabelsRepository } from './labels/InMemoryNavigationLabelsRepository';
export { InMemoryCommonLabelsRepository } from './labels/InMemoryCommonLabelsRepository';
export { InMemoryWorkLabelsRepository } from './labels/InMemoryWorkLabelsRepository';
export { InMemoryEducationLabelsRepository } from './labels/InMemoryEducationLabelsRepository';
export { InMemoryAboutLabelsRepository } from './labels/InMemoryAboutLabelsRepository';
export { InMemoryFooterLabelsRepository } from './labels/InMemoryFooterLabelsRepository';
export { InMemorySkillsLabelsRepository } from './labels/InMemorySkillsLabelsRepository';
export { InMemorySoftSkillsLabelsRepository } from './labels/InMemorySoftSkillsLabelsRepository';
export { InMemoryProjectLabelsRepository } from './labels/InMemoryProjectLabelsRepository';
export { InMemoryCourseLabelsRepository } from './labels/InMemoryCourseLabelsRepository';
export { InMemoryContactLabelsRepository } from './labels/InMemoryContactLabelsRepository';