import type { IPersonalInfoRepository, PersonalInfo, Translations } from '@/domain';
import { apiGet } from '@/data/datasources/api/CareerApiClient';

type LocalizedString = Record<string, string>;

interface ApiPersonal {
    name?: string;
    name_long?: string;
    name_medium?: string;
    name_short?: string;
    description?: LocalizedString;
    tagline?: LocalizedString;
    title?: LocalizedString;
    role?: LocalizedString;
    bio?: LocalizedString;
    greeting?: LocalizedString;
    email?: string;
    location?: LocalizedString;
    profileImage?: string;
    github?: string;
    linkedin?: string;
    codewars?: string;
    socialLinks?: {
        github?: string;
        codewars?: string;
        linkedin?: string;
    };
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

export class ApiPersonalInfoRepository implements IPersonalInfoRepository {
    async get(): Promise<PersonalInfo> {
        const data = await apiGet<ApiPersonal>('/personal');
        const socialLinks = data.socialLinks ?? {
            github: data.github,
            linkedin: data.linkedin,
            codewars: data.codewars,
        };
        return {
            name: data.name ?? '',
            name_long: data.name_long ?? data.name ?? '',
            name_medium: data.name_medium ?? data.name ?? '',
            name_short: data.name_short ?? data.name ?? '',
            description: fill(data.description ?? data.tagline ?? {}, ''),
            title: fill(data.title ?? data.role ?? {}, ''),
            bio: fill(data.bio ?? {}, ''),
            email: data.email ?? '',
            location: fill(data.location ?? {}, ''),
            profileImage: data.profileImage ?? (import.meta.env.BASE_URL.replace(/\/?$/, '/') + 'profile.webp'),
            socialLinks,
        };
    }
}
