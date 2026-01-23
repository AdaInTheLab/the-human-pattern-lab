// src/lib/labNotes.ts
import { apiBaseUrl } from "@/api/api";

export type LabNoteAttributes = {
    id: string;
    slug: string;
    type?: "labnote" | "paper" | "memo" | "lore" | "weather";
    title: string;
    subtitle?: string;

    // Prefer published_at in the DB world. Keep `published` for backwards compatibility if you want.
    published?: string; // legacy-ish (YYYY-MM-DD)
    published_at?: string; // canonical ISO or YYYY-MM-DD (whatever your API returns)

    tags?: string[];
    summary?: string;
    readingTime?: number;

    status?: "published" | "draft" | "archived";

    dept?: string;
    card_style?: string;
    department_id: string;

    shadow_density?: number;
    safer_landing?: boolean;

    locale?: string;
    created_at?: string;
    updated_at?: string;

    author?: { kind: "human" | "ai" | "hybrid"; name?: string; id?: string };
};

// What the UI consumes.
export type LabNote = LabNoteAttributes & {
    contentMarkdown?: string;
    revision_id?: string;
    revision_created_at?: string;
};

const ALLOWED_NOTE_TYPES: ReadonlySet<string> = new Set([
    "labnote",
    "paper",
    "memo",
    "lore",
    "weather",
]);

type ApiLabNoteIndexItem = {
    id: string;
    slug: string;
    locale?: string;

    type?: string;
    status?: "published" | "draft" | "archived";

    title: string;
    subtitle?: string;
    excerpt?: string;     // if your API uses excerpt
    summary?: string;     // if your API uses summary
    category?: string;

    department_id?: string;
    shadow_density?: number;
    safer_landing?: boolean;
    read_time_minutes?: number; // DB-ish name
    readingTime?: number;       // UI-ish name

    published_at?: string;
    published?: string;

    tags?: string[];

    created_at?: string;
    updated_at?: string;
    card_style?: string;
};

type ApiLabNoteDetail = ApiLabNoteIndexItem & {
    // ✅ canonical truth
    content_markdown?: string;

    // optional derived convenience
    content_html?: string;

    revision_id?: string;
    revision_created_at?: string;
};

function baseLocale(loc?: string) {
    return (loc ?? "en").toLowerCase().split("-")[0];
}

function unwrap<T>(payload: unknown): T {
    if (!payload || typeof payload !== "object") return payload as T;
    const p = payload as any;

    if (p.ok === true) {
        if (!("data" in p)) throw new Error("API envelope ok=true but missing data");
        return p.data as T;
    }

    if (p.ok === false) {
        const msg =
            typeof p.error === "string" ? p.error : p.error ? JSON.stringify(p.error) : "Unknown API error";
        throw new Error(`API error envelope: ${msg}`);
    }

    return payload as T;
}

function normalizeIndex(apiNotes: ApiLabNoteIndexItem[], requestedLocale: string): LabNote[] {
    const wanted = baseLocale(requestedLocale);
    const hasWanted = apiNotes.some((n) => baseLocale(n.locale) === wanted);

    return apiNotes
        .map((n): LabNote => {
            const locale = (n.locale ?? requestedLocale ?? "en").toLowerCase();
            const type = (n.type ?? "labnote").toLowerCase();
            const publishedish = (n.published_at ?? n.published ?? "").trim();
            const status = n.status ?? (publishedish ? "published" : "draft");


            const published_at = (n.published_at ?? "").trim() || undefined;
            const published = (n.published ?? "").trim() || undefined;

            const readingTime =
                n.readingTime ??
                (typeof n.read_time_minutes === "number" ? n.read_time_minutes : undefined) ??
                5;

            const shadow_density =
                typeof n.shadow_density === "number"
                    ? Math.max(0, Math.min(10, Math.round(n.shadow_density)))
                    : 4;

            return {
                id: n.id,
                slug: n.slug,
                locale,

                type: type as any,
                status,

                title: n.title,
                subtitle: n.subtitle,
                summary: (n.summary ?? n.excerpt ?? "").toString(),

                department_id: n.department_id ?? "SCMS",

                tags: n.tags ?? [],
                readingTime,
                shadow_density,
                safer_landing: typeof n.safer_landing === "boolean" ? n.safer_landing : true,

                published_at,
                published, // optional legacy mirror

                created_at: n.created_at,
                updated_at: n.updated_at,
                card_style: n.card_style,
            };
        })
        .filter((n) => n.status !== "archived")
        .filter((n) => ALLOWED_NOTE_TYPES.has((n.type ?? "labnote").toLowerCase()))
        .filter((n) => {
            const l = baseLocale(n.locale);
            return hasWanted ? l === wanted : l === "en";
        })
        .sort((a, b) => {
            const ap = a.published_at ?? a.published ?? "";
            const bp = b.published_at ?? b.published ?? "";

            if (ap && bp) return ap < bp ? 1 : -1;
            if (ap && !bp) return -1;
            if (!ap && bp) return 1;

            const at = a.updated_at ?? a.created_at ?? "";
            const bt = b.updated_at ?? b.created_at ?? "";
            if (at && bt) return at < bt ? 1 : -1;

            return a.title.localeCompare(b.title);
        });
}

function normalizeDetail(apiNote: ApiLabNoteDetail, requestedLocale: string): LabNote | null {
    const note = normalizeIndex([apiNote], requestedLocale)[0];
    if (!note) return null;

    return {
        ...note,
        contentMarkdown: (apiNote.content_markdown ?? "").trim() || undefined,
        revision_id: apiNote.revision_id,
        revision_created_at: apiNote.revision_created_at,
    };
}

export async function fetchLabNotes(locale: string, signal?: AbortSignal): Promise<LabNote[]> {
    // ✅ Make locale explicit. Your API should filter server-side.
    const url = `${apiBaseUrl}/lab-notes?locale=${encodeURIComponent(locale)}`;

    const res = await fetch(url, {
        signal,
        credentials: "include", // harmless for public; required if auth ever gates anything
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    const payload = await res.json();
    const data = unwrap<ApiLabNoteIndexItem[] | { notes: ApiLabNoteIndexItem[] }>(payload);

    const list = Array.isArray(data) ? data : (data as any).notes;
    return normalizeIndex(list ?? [], locale);
}

export async function fetchLabNoteBySlug(
    locale: string,
    slug: string,
    signal?: AbortSignal
): Promise<LabNote | null> {
    const url = `${apiBaseUrl}/lab-notes/${encodeURIComponent(slug)}?locale=${encodeURIComponent(
        locale
    )}`;

    const res = await fetch(url, {
        signal,
        credentials: "include",
    });

    if (res.status === 404) return null;

    if (!res.ok) {
        let detail = "";
        try {
            const ct = res.headers.get("content-type") ?? "";
            if (ct.includes("application/json")) {
                const j = await res.json();
                detail = typeof j === "string" ? j : JSON.stringify(j);
            } else {
                detail = await res.text();
            }
        } catch {
            // ignore
        }
        if (detail.length > 500) detail = detail.slice(0, 500) + "…";
        throw new Error(`Failed to fetch lab note (${res.status}) ${detail ? `- ${detail}` : ""}`);
    }

    const payload = await res.json();
    const apiNote = unwrap<ApiLabNoteDetail>(payload);
    if (!apiNote) return null;

    return normalizeDetail(apiNote, locale);
}

// ✅ "Correct" mode: no MD sources
export function getLabNotes(_locale: string): LabNote[] {
    throw new Error("getLabNotes() is disabled in canonical API mode. Use fetchLabNotes().");
}

export function getLabNoteBySlug(_locale: string, _slug: string): LabNote | null {
    throw new Error("getLabNoteBySlug() is disabled in canonical API mode. Use fetchLabNoteBySlug().");
}
