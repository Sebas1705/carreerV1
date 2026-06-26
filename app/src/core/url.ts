// Prepends Astro's configured base URL to any absolute path.
// import.meta.env.BASE_URL is '/carreerV1/' in production, '/' locally.
// Ensure BASE always ends with '/' regardless of Astro version behavior
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const siteUrl = (path: string): string =>
    BASE + path.replace(/^\//, '');
