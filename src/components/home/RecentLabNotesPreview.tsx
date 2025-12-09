/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: RecentLabNotesPreview.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file RecentLabNotesPreview.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/home/RecentLabNotesPreview.tsx
import { Link } from "react-router-dom";
import { labNotes } from "../../data/labNotes";

const categoryColors: Record<string, string> = {
    "AI & Alignment": "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
    "Human Psychology": "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    "Cosmic Philosophy": "bg-violet-500/10 text-violet-300 border-violet-500/40",
    Humor: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    "Behind the Lab": "bg-slate-500/10 text-slate-200 border-slate-500/40",
    "Lore Drop": "bg-pink-500/10 text-pink-300 border-pink-500/40",
};

export function RecentLabNotesPreview() {
    const recent = [...labNotes]
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
        .slice(0, 3);

    return (
        <section aria-labelledby="recent-lab-notes-heading">
            <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                    <h2
                        id="recent-lab-notes-heading"
                        className="text-xl md:text-2xl font-semibold"
                    >
                        Recent Lab Notes
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Field reports, cosmic shower thoughts, and judgment logs from the Lab.
                    </p>
                </div>

                <Link
                    to="/lab-notes"
                    className="hidden md:inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all notes →
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {recent.map((note) => {
                    const badgeClass =
                        categoryColors[note.category] ??
                        "bg-slate-800/60 text-slate-200 border-slate-600";

                    const date = new Date(note.publishedAt);
                    const formatted = date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    });

                    return (
                        <article
                            key={note.id}
                            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/15 transition"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                  <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${badgeClass}`}
                  >
                    {note.category}
                  </span>
                                    <span className="text-[11px] text-slate-500">
                    {formatted}
                  </span>
                                </div>

                                <h3 className="text-sm md:text-base font-semibold text-slate-50 group-hover:text-cyan-200">
                                    {note.title}
                                </h3>

                                <p className="text-sm text-slate-300 line-clamp-3">
                                    {note.excerpt}
                                </p>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                <span>{note.readTimeMinutes} min read</span>
                                <Link
                                    to={`/lab-notes/${note.slug}`}
                                    className="inline-flex items-center gap-1 text-cyan-300 group-hover:text-cyan-200"
                                >
                                    Read note
                                    <span aria-hidden="true">↗</span>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Mobile 'view all' link */}
            <div className="mt-3 md:hidden">
                <Link
                    to="/lab-notes"
                    className="inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all notes →
                </Link>
            </div>
        </section>
    );
}
