// src/lib/labNotes.ts
import {apiBaseUrl} from "@/api/api";

export type LabNoteAttributes = {
    id: string;     // uuid
    slug: string;   // public identity for URLs
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
    locale?: string;
    created_at?: string;
    updated_at?: string;
    author?: { kind: "human" | "ai" | "hybrid"; name?: string; id?: string };
};


type LabNoteFrontmatter = Omit<LabNoteAttributes, "id" | "slug" | "department_id"> & {
    id?: string;
    slug?: string;
    department_id?: string;
};

type LabNoteModule = {
    attributes: LabNoteFrontmatter;
    html: string;
    markdown: string;
};

export type LabNote = LabNoteAttributes & {
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
    id: string;
    slug: string;

    type?: "labnote" | "paper" | "memo";
    status?: "published" | "draft" | "archived";

    title: string;
    subtitle?: string;
    summary?: string;

    contentHtml?: string;
    contentMarkdown?: string;

    published?: string; // "" or YYYY-MM-DD
    tags?: string[];
    readingTime?: number;

    dept?: string;
    department_id?: string;
    locale?: string;

    shadow_density?: number;
    safer_landing?: boolean;

    author?: { kind: "human" | "ai" | "hybrid"; name?: string; id?: string };
    created_at?: string;
    updated_at?: string;
};

function unwrap<T>(payload: unknown): T {
    // Envelope form: { ok: true, data: ... }
    if (payload && typeof payload === "object" && (payload as any).ok === true) {
        return (payload as any).data as T;
    }
    // Raw form: [...] or {...}
    return payload as T;
}

function normalizeApiNotes(apiNotes: ApiLabNote[], requestedLocale: string): LabNote[] {
    return apiNotes
        .map((n): LabNote => {
            const published = (n.published ?? "").trim();
            const derivedStatus: LabNoteAttributes["status"] = published ? "published" : "draft";

            const department_id = n.department_id ?? "SCMS";
            const locale = (n.locale ?? requestedLocale ?? "en").toLowerCase();

            const shadow_density = Math.max(0, Math.min(10, Math.round(n.shadow_density ?? 4)));

            return {
                id: n.id,
                slug: n.slug,
                title: n.title,

                subtitle: n.subtitle,
                summary: n.summary ?? "",

                type: n.type ?? "labnote",
                status: n.status ?? derivedStatus,
                dept: n.dept,

                department_id,
                published: published || undefined,
                tags: n.tags ?? [],
                readingTime: n.readingTime ?? 5,
                shadow_density,
                safer_landing: n.safer_landing ?? true,

                contentHtml: n.contentHtml ?? "",
                contentMarkdown: n.contentMarkdown ?? "",

                locale,
                created_at: n.created_at,
                updated_at: n.updated_at,
                author: n.author,
            };
        })
        .filter((n) => n.status !== "archived")
        .sort((a, b) => {
            const ap = a.published ?? "";
            const bp = b.published ?? "";

            if (ap && bp) return ap < bp ? 1 : -1;
            if (ap && !bp) return -1;
            if (!ap && bp) return 1;

            const at = a.created_at ?? a.updated_at ?? "";
            const bt = b.created_at ?? b.updated_at ?? "";
            if (at && bt) return at < bt ? 1 : -1;

            return a.title.localeCompare(b.title);
        });
}

export async function fetchLabNotes(locale: string, signal?: AbortSignal): Promise<LabNote[]> {
    const res = await fetch(`${apiBaseUrl}/lab-notes`, { signal });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    const payload = await res.json();
    const data = unwrap<ApiLabNote[]>(payload);

    return normalizeApiNotes(data, locale);
}

export async function fetchLabNoteBySlug(
    locale: string,
    slug: string,
    signal?: AbortSignal
): Promise<LabNote | null> {
    const res = await fetch(`${apiBaseUrl}/lab-notes/${encodeURIComponent(slug)}`, { signal });

    if (res.status === 404) return null;
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab note (${res.status}): ${text}`);
    }

    const payload = await res.json();
    const note = unwrap<ApiLabNote>(payload);
    return normalizeApiNotes([note], locale)[0] ?? null;
}


function normalizeNotes(raw: Record<string, LabNoteModule>): LabNote[] {
    return Object.entries(raw)
        .flatMap(([filePath, mod]): LabNote[] => {
            const attrs = mod?.attributes;

            if (!attrs) return [];
            const filenameSlug = filePath.split("/").pop()?.replace(".md", "");
            const slug = attrs.slug ?? filenameSlug;
            if (!slug) return [];

            const id = attrs.id ?? filenameSlug; // if you still want fallback
            if (!id) return [];

            const department_id = (attrs.dept || attrs.department_id || "SCMS");
            const isKo = filePath.includes("/ko/");
            const note: LabNote = {
                ...attrs,
                id,
                slug,
                department_id,
                shadow_density: attrs.shadow_density ?? 4,
                safer_landing: attrs.safer_landing ?? true,
                type: attrs.type ?? "labnote",
                status: attrs.status ?? "published",
                contentHtml: mod.html,
                contentMarkdown: mod.markdown,
                locale: isKo ? "ko" : "en",
            };

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

export function getLabNoteBySlug(locale: string, slug: string): LabNote | null {
    const list = getLabNotes(locale);
    return list.find((n) => n.slug === slug) ?? null;
}

const USE_API_NOTES = import.meta.env.VITE_NOTES_SOURCE === "api";
// set to "md" or "api" (default to md if unset)

export function shouldUseApiNotes(): boolean {
    return USE_API_NOTES;
}
