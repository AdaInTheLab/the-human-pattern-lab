// src/lib/labNotes.ts
type LabNoteAttributes = {
    id: string;
    type?: "paper" | "memo";
    title: string;
    subtitle?: string;
    published?: string;
    tags?: string[];
    summary?: string;
    readingTime?: number;
    status?: "published" | "draft";
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

function normalizeNotes(raw: Record<string, LabNoteModule>): LabNote[] {
    return Object.entries(raw)
        .map(([path, mod]) => {
            if (!mod || !mod.attributes) return null;

            const attrs = mod.attributes;
            const id = attrs.id || path.split("/").pop()?.replace(".md", "");

            if (!id) return null;

            return {
                ...attrs,
                id,
                slug: id,
                type: (attrs.type as any) ?? "paper",
                status: (attrs.status as any) ?? "published",
                contentHtml: mod.html,
                contentMarkdown: mod.markdown
            };
        })
        .filter((n): n is LabNote => !!n && n.status !== "draft")
        .sort((a, b) => {
            if (!a.published || !b.published) return 0;
            return a.published < b.published ? 1 : -1; // newest first
        });
}

const notesEn = normalizeNotes(notesEnRaw);
const notesKo = normalizeNotes(notesKoRaw);

export function getLabNotes(locale: string): LabNote[] {
    return locale.startsWith("ko") ? notesKo : notesEn;
}

export function getLabNoteById(locale: string, id: string): LabNote | null {
    const list = getLabNotes(locale);
    return list.find((n) => n.id === id) ?? null;
}
