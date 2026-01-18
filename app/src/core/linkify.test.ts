import { expect, test } from 'vitest';
import linkify, { linkify as linkifyFn } from './linkify';
import { COMPANY_LINKS } from './constants';

test('linkify replaces company names with anchors', () => {
    const text = 'I worked at Solusoft and AGEDI.';
    const result = linkifyFn(text);
    // Each company should be turned into an anchor with the correct href
    for (const [company, url] of Object.entries(COMPANY_LINKS)) {
        if (text.includes(company)) {
            expect(result).toContain(`<a href="${url}"`);
            expect(result).toContain(company);
        }
    }
});

test('linkify escapes html to prevent injection', () => {
    const malicious = '<script>alert("x")</script> Solusoft';
    const out = linkifyFn(malicious);
    // Script tags should be escaped
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
    // Company still linkified
    expect(out).toContain('Solusoft');
});

test('linkify returns empty for falsy input', () => {
    expect(linkify('')).toBe('');
    // @ts-expect-error allow null input for runtime test
    expect(linkify(null)).toBe('');
});
