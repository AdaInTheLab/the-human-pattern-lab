/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNoteDetailPage.tsx
   Lab Unit: Lab Notes Division
   Purpose: Renders a single Lab Note detail view with full Lab
            aesthetic, metadata, category pill, and MDX content.
   =========================================================== */

/**
 * @file LabNoteDetailPage.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Lab Notes Division
 * @since 2025-12-09
 * @description Displays an individual Lab Note fetched from the
 *              localized note registry, including title, subtitle,
 *              metadata, pill badges, and full MDX content.
 */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getLabNotes } from "@/lib/labNotes";
import { useTranslation } from "react-i18next";

// CATEGORY COLORS — use lowercase keys
const categoryColors: Record<string, string> = {
    "ai & alignment":
        "bg-cyan-500/15 text-cyan-200 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]",
    "human psychology":
        "bg-emerald-500/15 text-emerald-200 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]",
    "cosmic philosophy":
        "bg-violet-500/15 text-violet-200 border-violet-500/40 shadow-[0_0_12px_rgba(167,139,250,0.25)]",
    humor:
        "bg-amber-500/15 text-amber-200 border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]",
    "behind the lab":
        "bg-sky-500/15 text-sky-200 border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]",
    "lore drop":
        "bg-pink-500/15 text-pink-200 border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.25)]",
    behavior:
        "bg-blue-500/15 text-blue-200 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    emotion:
        "bg-rose-500/15 text-rose-200 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]",
};

type RouteParams = {
    id?: string;
};

export const LabNoteDetailPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const { i18n } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";

    const notes = getLabNotes(locale);
    const note = notes.find((n) => n.id === id);

    // 🔥 Not found screen stays the same (looks great)
    if (!note) {
        return (
            <LayoutShell>
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 flex items-center justify-center">
                        <span className="text-3xl">📓</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Lab Note not found.
                    </h1>
                    <p className="max-w-md text-slate-300">
                        Orbson checked the archives and didn&apos;t find this note in the Lab&apos;s
                        active timeline. It may have been moved, renamed, or never written.
                    </p>
                    <Link
                        to="/lab-notes"
                        className="
                            inline-flex items-center gap-1 text-xs text-slate-400
                            hover:text-cyan-300 transition relative
                          "
                                            >
                          <span className="relative">
                            ←
                            <span
                                className="
                                absolute inset-0 blur-md text-cyan-400 opacity-0
                                group-hover:opacity-60 transition
                              "
                            >
                              ←
                            </span>
                          </span>

                        Back to all notes
                    </Link>
                </div>
            </LayoutShell>
        );
    }

    // Normalized category
    const tag = note.tags?.[0]?.toLowerCase();
    console.log(note);
    const badgeClass =
        categoryColors[tag ?? ""] ??
        "bg-slate-800/60 text-slate-200 border-slate-600";

    const formattedDate = note.published
        ? new Date(note.published).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
        })
        : undefined;

    return (
        <LayoutShell>
            <main className="mx-auto max-w-3xl px-4 space-y-10 pb-20">

                {/* --- HEADER --- */}
                <header className="space-y-4 border-b border-slate-800 pb-6">

                    {/* Category pill + date + read time */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        {/* Pill */}
                        {note.tags?.[0] && (
                            <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${badgeClass}`}
                            >
                {note.tags[0]}
              </span>
                        )}

                        {formattedDate && <span>{formattedDate}</span>}
                        <span>·</span>
                        <span>{note.readingTime ?? 3} min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 leading-tight">
                        {note.title}
                    </h1>

                    {/* Subtitle */}
                    {note.subtitle && (
                        <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                            {note.subtitle}
                        </p>
                    )}

                    {/* Back link */}
                                <Link
                                    to="/lab-notes"
                                    className="
                inline-flex items-center gap-1 text-xs text-slate-400
                hover:text-cyan-300 transition relative
              "
                                >
              <span className="relative">
                ←
                <span
                    className="
                    absolute inset-0 blur-md text-cyan-400 opacity-0
                    group-hover:opacity-60 transition
                  "
                >
                  ←
                </span>
              </span>

                        Back to all notes
                    </Link>
                </header>

                {/* --- BODY CONTENT --- */}
                <section className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-200 leading-relaxed">
                    {/* 🔥 This is where your MDX content goes */}
                    <section
                        className="prose prose-invert prose-p:leading-relaxed prose-p:my-4 prose-strong:text-slate-50
                            prose-em:text-slate-300 prose-blockquote:border-cyan-400/40 prose-blockquote:text-slate-300
                            prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:border-l-2 max-w-none"
                            dangerouslySetInnerHTML={{ __html: note.contentHtml }}
                    />
                </section>
                {/* --- CARMEL CAMEO --- */}
                <div className="mt-16 flex items-center gap-4 border-t border-slate-800 pt-6">
                    <div className="text-4xl select-none">😼</div>

                    <div className="space-y-1">
                        <p className="text-sm text-slate-300">
                            Carmel has reviewed this Lab Note.
                        </p>
                        <p className="text-xs text-slate-500 italic">
                            “Hmm. Adequate. But I’m watching you.”
                        </p>
                    </div>
                </div>
            </main>
        </LayoutShell>
    );
};

export default LabNoteDetailPage;
