import { useCallback, useEffect, useState } from "react";
import { History, ChevronDown, ChevronRight } from "lucide-react";
import { apiBaseUrl } from "@/api/api";

type RevisionSummary = {
    id: string;
    revision_num: number;
    supersedes_revision_id: string | null;
    content_hash: string;
    content_length: number;
    source: string;
    intent: string;
    auth_type: string;
    created_at: string;
};

type RevisionsResponse = {
    note_id: string;
    current_revision_id: string | null;
    published_revision_id: string | null;
    revisions: RevisionSummary[];
};

type RevisionDetail = RevisionSummary & {
    note_id: string;
    frontmatter_json: string;
    content_markdown: string;
    schema_version: string;
    intent_version: string;
};

type Props = {
    slug: string;
    locale: string;
    /** Bumps when the note is saved, so we refresh. */
    refreshKey?: number;
};

function formatTimestamp(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
}

function formatBytes(n: number): string {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function sourceStyle(source: string): string {
    switch (source) {
        case "web":
            return "border-cyan-500/40 bg-cyan-500/10 text-cyan-200";
        case "cli":
            return "border-violet-500/40 bg-violet-500/10 text-violet-200";
        case "api":
            return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
        case "import":
            return "border-amber-500/40 bg-amber-500/10 text-amber-200";
        default:
            return "border-zinc-700 bg-zinc-900 text-zinc-300";
    }
}

export function RevisionHistory({ slug, locale, refreshKey = 0 }: Props) {
    const API = apiBaseUrl;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<RevisionsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedRev, setExpandedRev] = useState<string | null>(null);
    const [detailCache, setDetailCache] = useState<Record<string, RevisionDetail>>({});

    const load = useCallback(async () => {
        if (!slug || !locale) return;
        setLoading(true);
        setError(null);
        try {
            const url = `${API}/admin/notes/${encodeURIComponent(slug)}/revisions?locale=${encodeURIComponent(
                locale
            )}`;
            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) {
                throw new Error(`Failed to load revisions (${res.status})`);
            }
            const json = (await res.json()) as RevisionsResponse;
            setData(json);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load revisions");
        } finally {
            setLoading(false);
        }
    }, [API, slug, locale]);

    // Load on first open + whenever the note is saved (refreshKey bump)
    useEffect(() => {
        if (!open) return;
        load();
    }, [open, load, refreshKey]);

    // If the drawer's target note changes while the panel is open, clear stale detail cache
    useEffect(() => {
        setExpandedRev(null);
        setDetailCache({});
    }, [slug, locale]);

    const handleToggleRevision = async (rev: RevisionSummary) => {
        if (expandedRev === rev.id) {
            setExpandedRev(null);
            return;
        }
        setExpandedRev(rev.id);

        if (detailCache[rev.id]) return;

        try {
            const url = `${API}/admin/notes/${encodeURIComponent(slug)}/revisions/${encodeURIComponent(
                rev.id
            )}?locale=${encodeURIComponent(locale)}`;
            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) throw new Error(`Failed to load revision (${res.status})`);
            const detail = (await res.json()) as RevisionDetail;
            setDetailCache((prev) => ({ ...prev, [rev.id]: detail }));
        } catch (e: any) {
            setDetailCache((prev) => ({
                ...prev,
                [rev.id]: {
                    ...(rev as any),
                    frontmatter_json: "",
                    content_markdown: `⚠ ${e?.message ?? "Failed to load revision content"}`,
                } as RevisionDetail,
            }));
        }
    };

    const count = data?.revisions.length ?? 0;

    return (
        <section className="rounded-lg border border-zinc-800 bg-zinc-950/40">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-200"
            >
                <span className="inline-flex items-center gap-2">
                    {open ? (
                        <ChevronDown aria-hidden className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                    )}
                    <History aria-hidden className="h-3.5 w-3.5" />
                    Revision history
                </span>
                {data ? (
                    <span className="normal-case tracking-normal text-zinc-600">
                        {count} {count === 1 ? "revision" : "revisions"}
                    </span>
                ) : null}
            </button>

            {open && (
                <div className="border-t border-zinc-800">
                    {loading ? (
                        <div className="px-3 py-3 text-sm text-zinc-500">Loading history…</div>
                    ) : error ? (
                        <div className="px-3 py-3 text-sm text-red-300">{error}</div>
                    ) : !data || data.revisions.length === 0 ? (
                        <div className="px-3 py-3 text-sm text-zinc-500">
                            No revisions recorded yet.
                        </div>
                    ) : (
                        <ul className="divide-y divide-zinc-900">
                            {data.revisions.map((rev) => {
                                const isPublished = rev.id === data.published_revision_id;
                                const isCurrent = rev.id === data.current_revision_id;
                                const isExpanded = expandedRev === rev.id;
                                const detail = detailCache[rev.id];

                                return (
                                    <li key={rev.id}>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleRevision(rev)}
                                            className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-zinc-900/60"
                                        >
                                            <div className="flex min-w-0 items-center gap-2">
                                                <span className="font-mono text-xs text-zinc-400">
                                                    #{rev.revision_num}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${sourceStyle(rev.source)}`}
                                                >
                                                    {rev.source}
                                                </span>
                                                {isPublished ? (
                                                    <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                                                        published
                                                    </span>
                                                ) : null}
                                                {isCurrent && !isPublished ? (
                                                    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-300">
                                                        current
                                                    </span>
                                                ) : null}
                                                <span className="truncate text-xs text-zinc-400">
                                                    {formatTimestamp(rev.created_at)}
                                                </span>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2 text-[11px] text-zinc-500">
                                                <span>{formatBytes(rev.content_length)}</span>
                                                {isExpanded ? (
                                                    <ChevronDown aria-hidden className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                                                )}
                                            </div>
                                        </button>

                                        {isExpanded ? (
                                            <div className="border-t border-zinc-900 bg-zinc-950/60 px-3 py-3">
                                                <div className="flex flex-wrap gap-3 pb-2 text-[11px] text-zinc-500">
                                                    <span>
                                                        intent:{" "}
                                                        <span className="font-mono text-zinc-300">
                                                            {rev.intent}
                                                        </span>
                                                    </span>
                                                    <span>
                                                        auth:{" "}
                                                        <span className="font-mono text-zinc-300">
                                                            {rev.auth_type}
                                                        </span>
                                                    </span>
                                                    <span>
                                                        hash:{" "}
                                                        <span className="font-mono text-zinc-400">
                                                            {rev.content_hash.slice(0, 12)}…
                                                        </span>
                                                    </span>
                                                </div>
                                                {!detail ? (
                                                    <div className="text-xs text-zinc-500">Loading revision…</div>
                                                ) : (
                                                    <pre className="max-h-80 overflow-auto rounded border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-200 whitespace-pre-wrap">
{detail.content_markdown || "(empty)"}
                                                    </pre>
                                                )}
                                            </div>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
}
