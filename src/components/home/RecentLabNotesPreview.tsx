/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: RecentLabNotesPreview.tsx
   Purpose: Homepage preview module for the latest Lab Notes.
   =========================================================== */

/**
 * @file RecentLabNotesPreview.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @status Active
 * @since 2025-12-10
 * @description Renders a 3-note preview of the most recent Lab Notes on
 *              the homepage, using canonical markdown-backed Lab Notes
 *              from `lib/labNotes`.
 */

// src/components/home/RecentLabNotesPreview.tsx

import React from "react";
import { Link } from "react-router-dom";
import { getLabNotes, type LabNote } from "@/lib/labNotes";

const categoryColors: Record<string, string> = {
    "ai & alignment":
        "bg-cyan-500/15 text-cyan-200 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.28)]",
    "human psychology":
        "bg-emerald-500/15 text-emerald-200 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.28)]",
    "cosmic philosophy":
        "bg-violet-500/15 text-violet-200 border-violet-500/40 shadow-[0_0_12px_rgba(167,139,250,0.28)]",
    "humor":
        "bg-amber-500/15 text-amber-200 border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.28)]",
    "behind the lab":
        "bg-sky-500/15 text-sky-200 border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.28)]",
    "lore drop":
        "bg-pink-500/15 text-pink-200 border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.28)]",
    "behavior":
        "bg-blue-500/15 text-blue-200 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.28)]",
    "emotion":
        "bg-rose-500/15 text-rose-200 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.28)]",
};


function getCategory(note: LabNote): string | undefined {
    return note.tags?.[0];
}

function getExcerpt(note: LabNote): string {
    return note.summary || note.subtitle || "";
}

export function RecentLabNotesPreview() {
    // TODO: later: pull locale from i18n instead of hardcoding "en"
    const notes = getLabNotes("en");
    const recent = notes.slice(0, 3); // already sorted newest-first in lib

    return (
        <section
            aria-labelledby="recent-lab-notes-heading"
            className="mt-10 space-y-4"
        >
            <div className="mb-2 flex items-baseline justify-between gap-4">
                <div>
                    <h2
                        id="recent-lab-notes-heading"
                        className="text-lg font-semibold tracking-tight text-slate-50 md:text-2xl"
                    >
                        Recent Lab Notes
                    </h2>
                    <p className="mt-1 text-xs text-slate-400 md:text-sm">
                        Field reports, cosmic shower thoughts, and judgment logs from the
                        Lab.
                    </p>
                </div>

                <Link
                    to="/lab-notes"
                    className="hidden items-center text-xs font-semibold text-cyan-300 transition hover:translate-x-0.5 hover:text-cyan-200 md:inline-flex"
                >
                    View all notes
                    <span aria-hidden="true" className="ml-0.5">
            ↗
          </span>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {recent.map((note) => {
                    const category = getCategory(note);
                    const badgeClass =
                        (category && categoryColors[category]) ??
                        "border-slate-600 bg-slate-800/80 text-slate-200";

                    const date = note.published ? new Date(note.published) : null;
                    const formatted = date
                        ? date.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        })
                        : "";

                    const excerpt = getExcerpt(note);

                    return (
                        <article
                            key={note.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-[0_18px_45px_rgba(3,7,18,0.9)] backdrop-blur-sm transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-[0_22px_60px_rgba(8,145,178,0.45)]"
                        >
                            {/* subtle corner glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_55%)] opacity-0 mix-blend-screen transition-opacity duration-200 group-hover:opacity-100" />

                            <div className="relative space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    {category ? (
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${badgeClass}`}
                                        >
                      {category}
                    </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                      Lab Note
                    </span>
                                    )}

                                    {formatted && (
                                        <span className="text-[11px] text-slate-500">
                      {formatted}
                    </span>
                                    )}
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
                <span className="opacity-80">
                  {note.readingTime != null ? note.readingTime : "—"} min read
                </span>
                                <Link
                                    to={`/lab-notes/${note.slug}`}
                                    className="inline-flex items-center gap-1 text-cyan-300 transition hover:translate-x-0.5 hover:text-cyan-100"
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
                    className="inline-flex items-center text-xs font-semibold text-cyan-300 transition hover:translate-x-0.5 hover:text-cyan-200"
                >
                    View all notes
                    <span aria-hidden="true" className="ml-0.5">
            ↗
          </span>
                </Link>
            </div>
        </section>
    );
}
