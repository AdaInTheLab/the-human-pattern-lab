// src/api/data/labNotesStore.ts
export type ApiLabNote = {
    id: string;
    title: string;
    subtitle?: string;
    contentHtml: string;
    published?: string;
    tags?: string[];
    readingTime?: number;
    department_id?: string;
    shadow_density?: number;
    safer_landing?: boolean;
};

// ✅ Replace this with your real loader (SQLite, MD parse, etc.)
export async function getAllLabNotes(): Promise<ApiLabNote[]> {
    // Example: if you already have an array in memory, return it here.
    // return LAB_NOTES;

    throw new Error("getAllLabNotes() not implemented");
}

export async function getLabNoteById(id: string): Promise<ApiLabNote | null> {
    const notes = await getAllLabNotes();
    return notes.find((n) => n.id === id) ?? null;
}
