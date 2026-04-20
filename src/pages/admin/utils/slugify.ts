/**
 * Convert a free-form string (e.g. a title) into a URL-safe slug.
 * - lowercases
 * - strips diacritics
 * - replaces non-alphanumeric runs with a single dash
 * - trims leading/trailing dashes
 */
export function slugify(input: string): string {
    return input
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
