/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNoteDetailPage.tsx
   Purpose: Renders a single Lab Note detail view with title,
            metadata, and full Lab Notes chrome.
   =========================================================== */

/**
 * @file LabNoteDetailPage.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Lab Notes
 * @status evolving
 * @since 2025-12-09
 * @description Detail page for an individual Lab Note, resolving
 *              the note by id from the route and displaying the
 *              full content with Lab-flavored layout.
 */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getLabNotes } from "@/lib/labNotes";
import { useTranslation } from "react-i18next";

const categoryColors: Record<string, string> = {
    "AI & Alignment": "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
    "Human Psychology": "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    "Cosmic Philosophy": "bg-violet-500/10 text-violet-300 border-violet-500/40",
    Humor: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    "Behind the Lab": "bg-slate-500/10 text-slate-200 border-slate-500/40",
    "Lore Drop": "bg-pink-500/10 text-pink-300 border-pink-500/40",
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
                        Orbson checked the archives and couldn&apos;t find this note in the Lab&apos;s
                        current timeline. It may have been moved, renamed, or never written.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            to="/lab-notes"
                            className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                        >
                            Back to Lab Notes
                        </Link>
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                        Error Code: NOTE-404 — Entry Not Indexed
                    </p>
                </div>
            </LayoutShell>
        );
    }

    const categoryLabel = (note as any).category as string | undefined;
    const badgeClass =
        (categoryLabel && categoryColors[categoryLabel]) ??
        "bg-slate-800/60 text-slate-200 border-slate-600";

    const published = (note as any).published as string | undefined;
    const readingTime = (note as any).readingTime ?? 3;

    const formattedDate = published
        ? new Date(published).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
        })
        : undefined;

    return (
        <LayoutShell>
            <main className="mx-auto max-w-3xl space-y-8">
                {/* HEADER / META */}
                <header className="space-y-4 border-b border-slate-800 pb-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        {categoryLabel && (
                            <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${badgeClass}`}
                            >
                {categoryLabel}
              </span>
                        )}

                        {formattedDate && <span>{formattedDate}</span>}

                        <span>·</span>

                        <span>{readingTime} min read</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
                        {note.title}
                    </h1>

                    {note.subtitle && (
                        <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                            {note.subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                        <Link
                            to="/lab-notes"
                            className="inline-flex items-center gap-1 hover:text-cyan-300"
                        >
                            ← Back to all notes
                        </Link>
                    </div>
                </header>

                {/* BODY CONTENT */}
                <section className="space-y-4 text-sm md:text-base text-slate-200 max-w-3xl">
                    {/* TODO: Replace stub with real content when lab notes carry full bodies. */}

                    <p>
                        This is where the full Lab Note content will live — deeper dives into
                        the idea, examples, diagrams, and whatever else the Lab needs to make
                        this pattern feel less mysterious and more understandable.
                    </p>

                    <p className="text-slate-300">
                        For now, you&apos;re seeing a stub layout: title, metadata, and
                        context. When this note is fully written, it will walk through the
                        pattern step by step, with plenty of room for Orbson&apos;s charts and
                        Carmel&apos;s commentary.
                    </p>

                    <p className="text-slate-400 text-sm">
                        If you&apos;re reading this and thinking, “hey, I have thoughts about
                        this pattern,” feel free to send them via the{" "}
                        <Link
                            to="/contact"
                            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                        >
                            contact page
                        </Link>
                        . Some of the best Lab Notes start as conversations.
                    </p>
                </section>
            </main>
        </LayoutShell>
    );
};

export default LabNoteDetailPage;
