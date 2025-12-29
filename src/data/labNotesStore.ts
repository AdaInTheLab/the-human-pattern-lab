// src/api/data/labNotesStore.ts
export type ApiLabNote = {
    id: string;
    slug: string;

    title: string;
    subtitle?: string;
    summary?: string;

    contentHtml: string;

    published: string; // "" or YYYY-MM-DD
    status: "draft" | "published" | "archived";
    type: "labnote" | "paper" | "memo";
    locale: string;

    department_id: string;
    dept?: string;

    shadow_density: number;
    safer_landing: boolean;

    tags: string[];
    readingTime: number;

    author?: {
        kind: "human" | "ai" | "hybrid";
        name?: string;
        id?: string;
    };

    created_at: string;
    updated_at: string;
};


// ✅ Replace this with your real loader (SQLite, MD parse, etc.)
export async function getAllLabNotes(): Promise<ApiLabNote[]> {
    // Example: if you already have an array in memory, return it here.
    // return LAB_NOTES;

    throw new Error("getAllLabNotes() not implemented");
}

export async function getLabNoteBySlug(id: string): Promise<ApiLabNote | null> {
    const notes = await getAllLabNotes();
    return notes.find((n) => n.id === id) ?? null;
}
