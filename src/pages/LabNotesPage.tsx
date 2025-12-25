/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNotesPage.tsx
   Lab Unit: SCMS — Systems & Code Management Suite
   Purpose: Renders the Lab Notes index page: localized heading,
            loads notes from MD or API, and displays a card grid.
   =========================================================== */

/**
 * @file LabNotesPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-25
 * @description Index view for Lab Notes. Handles loading notes from the
 *              selected substrate (MD or API) and renders a grid of
 *              LabNoteCard previews. Presentation logic lives in LabNoteCard.
 */

// src/pages/LabNotesPage.tsx
import { LayoutShell } from "@/components/layout/LayoutShell";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLabNotes, fetchLabNotes, shouldUseApiNotes } from "@/lib/labNotes";
import type { LabNote } from "@/lib/labNotes";
import { LabNoteCard } from "@/components/labnotes/LabNoteCard";

export function LabNotesPage() {
    const { t, i18n } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";

    const [notes, setNotes] = useState<LabNote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        let alive = true;

        async function load() {
            setLoading(true);
            try {
                const data = shouldUseApiNotes()
                    ? await fetchLabNotes(locale, controller.signal)
                    : getLabNotes(locale);

                if (alive) setNotes(data as any);
            } catch (e) {
                // Abort is not an error state
                if (e instanceof Error && e.name === "AbortError") return;
                if (alive) setNotes(getLabNotes(locale));
            } finally {
                if (alive) setLoading(false);
            }
        }

        load();
        return () => {
            alive = false;
            controller.abort();
        };
    }, [locale]);

    return (
        <LayoutShell>
            {/* Header: Archive atmosphere */}
            <header className="mb-12 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-slate-50">
                    {t("title")}
                </h1>
                <p className="text-sm text-slate-400 font-mono uppercase tracking-widest opacity-80">
                    {t("subtitle")}
                </p>
            </header>

            {/* States */}
            {loading && (
                <p className="mb-6 text-xs font-mono text-slate-500">
                    Loading Lab Notes…
                </p>
            )}

            {!loading && notes.length === 0 && (
                <p className="mb-6 text-xs font-mono text-slate-500">
                    No notes found in this substrate.
                </p>
            )}

            {/* Notes grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => (
                    <LabNoteCard key={note.id} note={note} index={index} />
                ))}
            </div>

            {/* 🧬 Tailwind anchor: Forces compiler to recognize Lab frequencies */}
            <div className="hidden border-coda border-vesper border-lyric text-coda text-vesper text-lyric from-coda/20 from-vesper/20 from-lyric/20" />
        </LayoutShell>
    );
}
