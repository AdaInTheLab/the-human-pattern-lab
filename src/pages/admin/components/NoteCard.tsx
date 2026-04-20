import { useState, type ReactNode } from "react";
import { Pencil, Trash2 } from "lucide-react";

export type NoteCardData = {
    id: string;
    title?: string | null;
    slug: string;
    type?: string | null;
    status?: string | null;
    dept?: string | null;
    department_id?: string | null;
    locale?: string | null;
    published_at?: string | null;
    updated_at?: string | null;
    summary?: string | null;
    excerpt?: string | null;
    author_name?: string | null;
    author_kind?: string | null;
    tags?: string[];
};

type Props = {
    note: NoteCardData;
    onEdit: () => void;
    onDelete: () => void;
    /** Optional override for the excerpt line. */
    excerpt?: string | null;
    /** Extra chips/badges to render after the status pill. */
    extraBadges?: ReactNode;
};

function StatusPill({ status }: { status?: string | null }) {
    const s = (status ?? "").toLowerCase();
    const style =
        s === "published"
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : s === "archived"
            ? "border-zinc-600/60 bg-zinc-800/60 text-zinc-300"
            : "border-amber-500/40 bg-amber-500/10 text-amber-200"; // draft / unknown

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${style}`}
        >
            {status ?? "draft"}
        </span>
    );
}

function formatDate(iso?: string | null): string | null {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function NoteCard({ note, onEdit, onDelete, excerpt, extraBadges }: Props) {
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const excerptText =
        (excerpt ?? note.summary ?? note.excerpt ?? "").trim() || null;
    const lastEdited = formatDate(note.updated_at ?? note.published_at);
    const dept = note.department_id ?? note.dept;

    return (
        <article
            className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-cyan-500/40 hover:bg-zinc-900/80"
        >
            {/* Top: badges + actions */}
            <header className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    <StatusPill status={note.status} />
                    {note.type ? (
                        <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-cyan-200">
                            {note.type}
                        </span>
                    ) : null}
                    {dept ? (
                        <span className="rounded-full border border-zinc-700 bg-zinc-950/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-300">
                            {dept}
                        </span>
                    ) : null}
                    {note.locale ? (
                        <span className="rounded-full border border-zinc-700 bg-zinc-950/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                            {note.locale}
                        </span>
                    ) : null}
                    {extraBadges}
                </div>

                <div className="flex items-center gap-1 opacity-70 transition group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={onEdit}
                        title="Edit"
                        aria-label="Edit"
                        className="rounded border border-cyan-500/20 bg-cyan-500/10 p-1.5 text-cyan-300 hover:bg-cyan-500/20"
                    >
                        <Pencil aria-hidden className="h-3.5 w-3.5" />
                    </button>
                    {confirmingDelete ? (
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => {
                                    setConfirmingDelete(false);
                                    onDelete();
                                }}
                                className="rounded border border-red-500/40 bg-red-500/20 px-2 py-0.5 text-[11px] font-medium text-red-200"
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmingDelete(false)}
                                className="rounded border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-400 hover:text-zinc-200"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setConfirmingDelete(true)}
                            title="Delete"
                            aria-label="Delete"
                            className="rounded border border-red-500/20 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
                        >
                            <Trash2 aria-hidden className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </header>

            {/* Title + slug */}
            <button
                type="button"
                onClick={onEdit}
                className="text-left"
            >
                <h3 className="text-base font-semibold text-zinc-50 group-hover:text-cyan-200">
                    {note.title?.trim() || <span className="text-zinc-500">(untitled)</span>}
                </h3>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-500 truncate">
                    {note.slug}
                </p>
            </button>

            {/* Excerpt */}
            {excerptText ? (
                <p className="text-sm text-zinc-300 line-clamp-3">{excerptText}</p>
            ) : null}

            {/* Footer: author + last edited + tags */}
            <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-zinc-500">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {note.author_name ? (
                        <span>
                            by <span className="text-zinc-300">{note.author_name}</span>
                            {note.author_kind ? (
                                <span className="text-zinc-600"> · {note.author_kind}</span>
                            ) : null}
                        </span>
                    ) : null}
                    {note.tags && note.tags.length > 0 ? (
                        <span className="truncate">
                            {note.tags.slice(0, 4).map((t) => `#${t}`).join(" ")}
                            {note.tags.length > 4 ? "…" : ""}
                        </span>
                    ) : null}
                </div>
                {lastEdited ? <span>{lastEdited}</span> : null}
            </footer>
        </article>
    );
}
