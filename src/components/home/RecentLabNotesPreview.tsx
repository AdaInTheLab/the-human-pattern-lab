// src/components/home/RecentLabNotesPreview.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { LabNote } from "@/lib/labNotes";
import { getNotesIndex } from "@/lib/notesIndex";
import { RecentLabNotesSkeleton } from "@/components/home/RecentLabNotesSkeleton";

export function RecentLabNotesPreview() {
    const [recent, setRecent] = useState<LabNote[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        let alive = true;

        (async () => {
            setLoading(true);
            setError(null);

            try {
                const all = await getNotesIndex("en", controller.signal);
                if (!alive) return;
                setRecent(all.slice(0, 3));
            } catch (e: any) {
                if (!alive) return;

                // Abort shouldn't be treated as an error, but it MUST end loading.
                if (e?.name === "AbortError") {
                    setLoading(false);
                    return;
                }

                setError(e?.message ?? "Failed to load notes.");
                setRecent([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
            controller.abort();
        };
    }, []);

    return (

        <section aria-labelledby="recent-lab-notes-heading" className="mt-10 space-y-4">
            {loading ? (
                    <RecentLabNotesSkeleton count={3} />
                ) : (
                <div className="grid gap-4 md:grid-cols-3">
                    {recent.map((note) => {
                        const category = note.tags?.[0]; // currently [] in your data
                        const date = note.published ? new Date(note.published) : null;
                        const formatted = date
                            ? date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })
                            : "";

                        const excerpt = (note.summary || note.subtitle || "").trim();

                        return (
                            <article
                                key={note.slug}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-[0_18px_45px_rgba(3,7,18,0.9)] backdrop-blur-sm transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-[0_22px_60px_rgba(8,145,178,0.45)]"
                            >
                                {/* subtle corner glow */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_55%)] opacity-0 mix-blend-screen transition-opacity duration-200 group-hover:opacity-100" />

                                <div className="relative space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        {category ? (
                                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
              {category}
            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
              Lab Note
            </span>
                                        )}

                                        {formatted && <span className="text-[11px] text-slate-500">{formatted}</span>}
                                    </div>

                                    <h3 className="text-sm font-semibold text-slate-50 transition-colors duration-150 group-hover:text-cyan-100 md:text-base">
                                        {note.title}
                                    </h3>

                                    {excerpt && (
                                        <p className="text-sm text-slate-300/90 line-clamp-3">
                                            {excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="relative mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                                    <span className="opacity-80">{note.readingTime ?? "—"} min read</span>

                                    <Link
                                        to={`/lab-notes/${note.slug}`}
                                        className="inline-flex items-center gap-1 text-cyan-300 transition hover:translate-x-0.5 hover:text-cyan-100"
                                    >
                                        Read note <span aria-hidden="true">↗</span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}


                    {error ? (
                <p className="text-xs font-mono text-rose-400 opacity-80">Preview failed: {error}</p>
            ) : null}
                </div>
            )}
        </section>
    );
}
