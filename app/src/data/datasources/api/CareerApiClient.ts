const BASE_URL = 'https://career-api.sebas1705.workers.dev';

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`Career API error ${res.status} for ${path}`);
    return res.json() as Promise<T>;
}
