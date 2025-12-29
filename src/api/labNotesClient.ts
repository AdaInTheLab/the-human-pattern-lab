import {apiBaseUrl} from "@/api/api";

export type LabNoteStatus = "draft" | "published" | "archived";
export type LabNoteType = "labnote" | "paper" | "memo";
export type AuthorKind = "human" | "ai" | "hybrid";

export interface LabNoteAuthor {
    kind: AuthorKind;
    name?: string;
    id?: string;
}

export interface LabNote {
    id: string;
    slug: string;                 // NEW (if API provides it)
    title: string;
    subtitle?: string;            // already present
    summary?: string;             // NEW (if API provides it)

    // content
    contentHtml: string;

    // publishing + metadata
    published: string;            // "" or "YYYY-MM-DD"
    status?: LabNoteStatus;       // NEW (can be derived server-side)
    type?: LabNoteType;           // NEW
    dept?: string;                // NEW (human readable)
    department_id: string;
    locale?: "en" | "ko";         // NEW

    // flags
    shadow_density: number;
    safer_landing: boolean;

    // taxonomy
    tags: string[];
    readingTime: number;

    // authorship
    author?: LabNoteAuthor;       // NEW
}

function unwrap<T>(payload: unknown): T {
    // Envelope form: { ok: true, data: ... }
    if (payload && typeof payload === "object" && (payload as any).ok === true) {
        return (payload as any).data as T;
    }
    // Raw form: [...] or {...}
    return payload as T;
}

export async function fetchLabNotes(signal?: AbortSignal): Promise<LabNote[]> {
    const res = await fetch(`${apiBaseUrl}/lab-notes`, { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    const payload = await res.json();
    const data = unwrap<LabNote[]>(payload);

    // Optional safety: reject non-arrays early
    if (!Array.isArray(data)) {
        throw new Error("Unexpected lab-notes response shape (expected array).");
    }

    return data;
}
