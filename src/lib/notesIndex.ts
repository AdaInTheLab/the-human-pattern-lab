// src/lib/notesIndex.ts
import type { LabNote } from "@/lib/labNotes"; // adjust path if needed
import { getLabNotes } from "@/lib/labNotes";
import { fetchLabNotes } from "@/lib/labNotes"; // where your fetch function lives



function parseDateish(value?: string): number {
    if (!value) return 0;
    const t = Date.parse(value);
    return Number.isFinite(t) ? t : 0;
}

function sortLatest(notes: LabNote[]): LabNote[] {
    return [...notes].sort((a: any, b: any) => {
        const ad = parseDateish(a.published ?? a.published_at ?? a.created_at);
        const bd = parseDateish(b.published ?? b.published_at ?? b.created_at);
        return bd - ad;
    });
}

/**
 * Merge MD + API by slug.
 * Policy: API wins for "runtime" fields (status, contentHtml, etc) if present.
 * MD provides fallback content/metadata when API is sparse.
 */
function mergeBySlug(md: LabNote[], api: LabNote[]): LabNote[] {
    const map = new Map<string, LabNote>();

    // Seed with MD
    for (const n of md) {
        if (!n.slug) continue;
        map.set(n.slug, n);
    }

    // Overlay API (wins), but keep MD as fallback for missing fields
    for (const n of api) {
        if (!n.slug) continue;
        const prev = map.get(n.slug);

        if (!prev) {
            map.set(n.slug, n);
            continue;
        }

        map.set(n.slug, {
            ...prev,
            ...n,

            // explicit "prefer non-empty" merges for a few fields
            title: n.title || prev.title,
            summary: (n.summary ?? "").trim() ? n.summary : prev.summary,
            contentHtml:
                (n.contentHtml ?? (n as any).content_html ?? "").trim()
                    ? (n.contentHtml ?? (n as any).content_html)
                    : (prev.contentHtml ?? (prev as any).content_html),
            published: n.published || prev.published,
            tags: (n.tags && n.tags.length ? n.tags : prev.tags) ?? [],
            department_id: n.department_id || prev.department_id,
        });
    }

    return Array.from(map.values());
}

export async function getNotesIndex(locale: string, signal?: AbortSignal): Promise<LabNote[]> {
    const source = (import.meta.env.VITE_NOTES_SOURCE ?? "both").toLowerCase();

    if (source === "md") return sortLatest(getLabNotes(locale));
    if (source === "api") return sortLatest(await fetchLabNotes(locale, signal));

    // default: both
    const md = getLabNotes(locale);
    const api = await fetchLabNotes(locale, signal);
    return sortLatest(mergeBySlug(md, api));
}
