// src/lib/notesIndex.ts
import type { LabNote } from "@/lib/labNotes";
import { fetchLabNotes } from "@/lib/labNotes";

function parseDateish(value?: string): number {
    if (!value) return 0;
    const t = Date.parse(value);
    return Number.isFinite(t) ? t : 0;
}

function sortLatest(notes: LabNote[]): LabNote[] {
    return [...notes].sort((a: any, b: any) => {
        // Prefer published_at when available; fall back to created/updated timestamps
        const ad = parseDateish(a.published_at ?? (a as any).published ?? a.created_at ?? a.updated_at);
        const bd = parseDateish(b.published_at ?? (b as any).published ?? b.created_at ?? b.updated_at);
        return bd - ad;
    });
}

/**
 * Canonical notes index:
 * - API is the only source (DB + ledger pointers)
 * - No MD fallback / merge in the frontend
 */
export async function getNotesIndex(locale: string, signal?: AbortSignal): Promise<LabNote[]> {
    const api = await fetchLabNotes(locale, signal);
    return sortLatest(api);
}
