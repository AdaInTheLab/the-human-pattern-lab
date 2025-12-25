/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNoteDetailPage.tsx
   Lab Unit: Lab Notes Division
   Purpose: Renders a single Lab Note detail view with full Lab
            aesthetic, metadata, and rendered content substrate.
   =========================================================== */

/**
 * @file LabNoteDetailPage.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Lab Notes Division
 * @since 2025-12-25
 * @description Detail view for an individual Lab Note. Loads from the
 *              configured substrate (MD registry or API) and renders:
 *              - Breadcrumb back to registry
 *              - Dept + teaser (subtitle/summary)
 *              - Rendered HTML content
 *              - Shadow Density + Safer Landing indicators
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LayoutShell } from "@/components/layout/LayoutShell";
import { fetchLabNoteById, getLabNotes, shouldUseApiNotes } from "@/lib/labNotes";
import type { LabNote } from "@/lib/labNotes";

type RouteParams = {
    id?: string; // slug-style id
};

export function LabNoteDetailPage() {
    const { id } = useParams<RouteParams>();
    const { i18n, t } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";

    const [note, setNote] = useState<LabNote | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        let alive = true;

        (async () => {
            setLoading(true);
            try {
                const data = shouldUseApiNotes()
                    ? await fetchLabNoteById(locale, id, controller.signal)
                    : getLabNotes(locale).find((n) => n.id === id) ?? null;

                if (!alive) return;
                setNote(data);
            } catch (e) {
                if (!alive) return;
                // Abort is not an error state
                if (e instanceof Error && e.name === "AbortError") return;
                if (e instanceof DOMException && e.name === "AbortError") return;

                console.error(e);
                // Local fallback (useful when API is down)
                const local = getLabNotes(locale).find((n) => n.id === id) ?? null;
                setNote(local);
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
            controller.abort();
        };
    }, [id, locale]);

    if (loading) {
        return (
            <LayoutShell>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
                        Synchronizing pattern…
                    </p>
                </div>
            </LayoutShell>
        );
    }

    if (!note) {
        return (
            <LayoutShell>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <h1 className="text-4xl font-mono text-ada animate-pulse">
                        404: Pattern Lost
                    </h1>
                    <p className="mt-4 text-slate-400 italic">
                        This entry has been retracted or never existed in this timeline.
                    </p>
                    <Link
                        to="/lab-notes"
                        className="mt-8 text-lyric hover:text-ada transition-colors"
                    >
                        ← Return to Registry
                    </Link>
                </div>
            </LayoutShell>
        );
    }

    const isHighDensity = (note.shadow_density ?? 0) > 7;
    const teaser = note.subtitle ?? note.summary ?? "";

    return (
        <LayoutShell>
            <div className="max-w-4xl mx-auto py-12 px-4">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center justify-between">
                    <Link
                        to="/lab-notes"
                        className="group inline-flex items-center gap-2 rounded-full
               border border-slate-800 bg-slate-950/40 px-4 py-2
               text-xs font-mono uppercase tracking-[0.2em] text-slate-400
               hover:text-ada hover:border-ada/60 transition-all"
                    >
                        <span className="transform transition-transform group-hover:-translate-x-1">←</span>
                        <span>Back to Lab Notes</span>
                    </Link>

                    {/* Optional: keep your current registry tag breadcrumb */}
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ada/60">
    // Registry / {note.tags?.[0]?.toUpperCase() ?? "LABNOTE"}
  </span>
                </nav>

                <article
                    className={`
    animate-reveal-artifact
    relative p-8 md:p-12 rounded-sm border-l-4
    transition-all duration-700
    ${isHighDensity
                        ? "bg-vesper-void border-vesper shadow-vesper-pulse"
                        : "bg-slate-900/50 border-ada shadow-ada-line"}
  `}
                >
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex justify-between items-start gap-6 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-lyric">
                Dept: {note.department_id || "SCMS"}
              </span>

                            {/* Teaser line (single source of truth) */}
                            {teaser && (
                                <p className="text-lg text-coda italic opacity-80 text-right max-w-[60%]">
                                    {teaser}
                                </p>
                            )}
                        </div>

                        {/* Single title (no duplicates) */}
                        <h1
                            className={`text-3xl md:text-5xl font-bold tracking-tight ${
                                isHighDensity ? "text-ada" : "text-lab-heading"
                            }`}
                        >
                            {note.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none prose-cyan prose-p:leading-relaxed prose-pre:bg-slate-800/50">
                        <div
                            className="text-slate-300 space-y-6"
                            dangerouslySetInnerHTML={{
                                __html: note.contentHtml || "<p>Pattern data pending synchronization...</p>",
                            }}
                        />
                    </div>

                    {/* Footer metrics */}
                    <footer className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-slate-500">
                Shadow Density
              </span>
                            <div className="flex gap-1.5">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-4 w-1 rounded-full transition-all duration-1000 ${
                                            i < (note.shadow_density ?? 0)
                                                ? "bg-vesper shadow-[0_0_8px_#6E00FF]"
                                                : "bg-slate-800"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {note.safer_landing && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-lyric/30 bg-lyric/5">
                                <span className="w-2 h-2 rounded-full bg-lyric animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest text-lyric">
                  Safer Landing Verified
                </span>
                            </div>
                        )}
                    </footer>
                </article>
            </div>
        </LayoutShell>
    );
}

export default LabNoteDetailPage;
