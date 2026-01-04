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
import { getNotesIndex } from "@/lib/notesIndex";
import type { LabNote } from "@/lib/labNotes";
import { LabNotesGrid, LabNotesGridSkeleton } from "@/components/labnotes/LabNotesGridSkeleton";

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
                const data = await getNotesIndex(locale, controller.signal);
                if (alive) setNotes(data);
            } catch (e) {
                if (e instanceof Error && e.name === "AbortError") return;
                console.error("Failed to load Lab Notes:", e);
                if (alive) setNotes([]);
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
            <header className="mb-12 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-slate-50">
                    {t("title")}
                </h1>
                <p className="text-sm text-slate-400 font-mono uppercase tracking-widest opacity-80">
                    {t("subtitle")}
                </p>
            </header>

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

            {loading ? <LabNotesGridSkeleton count={9} /> : <LabNotesGrid notes={notes} />}

            <div className="hidden border-coda border-vesper border-lyric text-coda text-vesper text-lyric from-coda/20 from-vesper/20 from-lyric/20" />
        </LayoutShell>
    );
}
