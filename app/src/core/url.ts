// Prepends Astro's configured base URL to any absolute path.
// import.meta.env.BASE_URL is '/carreerV1/' in production, '/' locally.
const BASE = import.meta.env.BASE_URL; // always ends with '/'

export const siteUrl = (path: string): string =>
    BASE + path.replace(/^\//, '');
