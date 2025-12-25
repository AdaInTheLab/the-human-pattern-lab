// src/lib/labNotes.ts

export type LabNoteAttributes = {
    id: string;
    type?: "labnote" | "paper" | "memo";
    title: string;
    subtitle?: string;
    published?: string;
    tags?: string[];
    summary?: string;
    readingTime?: number;
    status?: "published" | "draft" | "archived";
    dept?: string;
    department_id: string;
    shadow_density?: number;
    safer_landing?: boolean;
};

type LabNoteModule = {
    attributes: LabNoteAttributes;
    html: string;
    markdown: string;
};

export type LabNote = LabNoteAttributes & {
    slug: string;
    contentHtml: string;
    contentMarkdown: string;
};

const notesEnRaw = import.meta.glob("../labnotes/en/*.md", {
    eager: true
}) as Record<string, LabNoteModule>;

const notesKoRaw = import.meta.glob("../labnotes/ko/*.md", {
    eager: true
}) as Record<string, LabNoteModule>;

// --- 🌐 API MODE SUPPORT --------------------------------

type ApiLabNote = {
    id: string;               // slug-style id (e.g. "the-invitation")
    title: string;
    subtitle?: string;
    summary?: string;
    contentHtml?: string;      // currently excerpt-derived
    published?: string;       // "YYYY-MM-DD"
    tags?: string[];
    readingTime?: number;
    department_id?: string;   // likely "SCMS" (maybe uppercase)
    shadow_density?: number;
    safer_landing?: boolean;
};

function normalizeApiNotes(apiNotes: ApiLabNote[]): LabNote[] {
    return apiNotes
        .map((n): LabNote => ({
            id: n.id,
            slug: n.id,
            title: n.title,

            type: "labnote",
            status: "published",

            department_id: (n.department_id ?? "scms").toLowerCase(),

            shadow_density: n.shadow_density ?? 4,
            safer_landing: n.safer_landing ?? true,

            tags: n.tags ?? [],
            readingTime: n.readingTime ?? 5,

            contentHtml: n.contentHtml ?? "",
            contentMarkdown: "",
            summary: n.summary ?? "",

            ...(n.subtitle ? { subtitle: n.subtitle } : {}),
            ...(n.published ? { published: n.published } : {})
        }))
        .sort((a, b) => {
            if (!a.published || !b.published) return 0;
            return a.published < b.published ? 1 : -1;
        });
}

export async function fetchLabNotes(locale: string, signal?: AbortSignal): Promise<LabNote[]> {
    // If you later add locale support on the API, this is ready.
    // For now, locale is unused but kept for API parity with existing getters.
    const res = await fetch("/api/lab-notes", { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    const data = (await res.json()) as ApiLabNote[];
    return normalizeApiNotes(data);
}

export async function fetchLabNoteById(locale: string, id: string, signal?: AbortSignal): Promise<LabNote | null> {
    // If your API supports /api/lab-notes/:slug mapped to LabNoteView, this works.
    const res = await fetch(`/api/lab-notes/${encodeURIComponent(id)}`, { signal });

    if (res.status === 404) return null;
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab note (${res.status}): ${text}`);
    }

    const data = (await res.json()) as ApiLabNote;
    const normalized = normalizeApiNotes([data]);
    return normalized[0] ?? null;
}


function normalizeNotes(raw: Record<string, LabNoteModule>): LabNote[] {
    return Object.entries(raw)
        .flatMap(([filePath, mod]): LabNote[] => {
            const attrs = mod?.attributes;
            if (!attrs) return [];

            const id = attrs.id || filePath.split("/").pop()?.replace(".md", "");
            if (!id) return [];

            // Compute normalized department_id once, guaranteed string
            const department_id = (attrs.dept || attrs.department_id || "SCMS").toLowerCase();

            // Build the full LabNote (no nulls, no missing required fields)
            const note: LabNote = {
                ...attrs,
                id,
                slug: id,

                department_id,

                shadow_density: attrs.shadow_density ?? 4,
                safer_landing: attrs.safer_landing ?? true,
                type: attrs.type ?? "labnote",
                status: attrs.status ?? "published",

                contentHtml: mod.html,
                contentMarkdown: mod.markdown
            };

            // Filter drafts here (no type predicate required)
            if (note.status === "draft") return [];

            return [note];
        })
        .sort((a, b) => {
            if (!a.published || !b.published) return 0;
            return a.published < b.published ? 1 : -1;
        });
}

// 💠 CRITICAL FIX: Use the normalized constants, not the Raw glob results
const notesEn = normalizeNotes(notesEnRaw);
const notesKo = normalizeNotes(notesKoRaw);

export function getLabNotes(locale: string): LabNote[] {
    // We return the processed arrays here
    return locale.startsWith("ko") ? notesKo : notesEn;
}

export function getLabNoteById(locale: string, id: string): LabNote | null {
    const list = getLabNotes(locale);
    // list is now an array of LabNote, so .find() will work perfectly
    return list.find((n) => n.id === id) ?? null;
}

const USE_API_NOTES = import.meta.env.VITE_NOTES_SOURCE === "api";
// set to "md" or "api" (default to md if unset)

export function shouldUseApiNotes(): boolean {
    return USE_API_NOTES;
}
