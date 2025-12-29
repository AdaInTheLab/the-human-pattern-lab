import {apiUrl} from "@/api/api";

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

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: { code: string; message: string; details?: unknown } };
export type ApiResponse<T> = ApiOk<T> | ApiErr;

export async function fetchLabNotes(signal?: AbortSignal): Promise<LabNote[]> {
    const res = await fetch(apiUrl("/lab-notes"), { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    const json = (await res.json()) as ApiResponse<LabNote[]>;

    if (!json.ok) {
        throw new Error(`Failed to fetch lab notes: ${json.error.code}: ${json.error.message}`);
    }

    return json.data;
}