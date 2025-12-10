/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNotesPage.tsx
   Lab Unit: SCMS — Systems & Code Management Suite
   Purpose: Renders the full Lab Notes index page, including
            localized titles/subtitles, and a stylized grid of
            all memos, research papers, and internal notes.
   =========================================================== */

/**
 * @file LabNotesPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-10
 * @description Displays the aggregated collection of Lab Notes,
 *              with filtering-ready markup and fully styled cards
 *              for memos, research notes, and internal logs.
 *              Uses `getLabNotes(locale)` to load localized content.
 */
// src/pages/LabNotesPage.tsx
import {LayoutShell} from "@/components/layout/LayoutShell";
import { useTranslation } from "react-i18next";
import { getLabNotes } from "@/lib/labNotes";

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


const ALL = "All";
export function LabNotesPage() {
    const { t, i18n } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";
    const notes = getLabNotes(locale);

    return (

        <LayoutShell>

            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                    {t("title")}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                    {t("subtitle")}
                </p>
            </header>

            {/* Empty state */}
            {notes.length === 0 && (
                <p className="text-sm text-slate-500">{t("empty")}</p>
            )}

            {/* Notes grid */}
            {notes.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => {
                        const date = note.published
                            ? new Date(note.published).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            })
                            : "";

                        const tag = note.tags?.[0]?.toLowerCase();
                        const pillColor =
                            (tag && categoryColors[tag]) ??
                            "bg-slate-800/60 text-slate-200 border-slate-700";

                        return (
                            <article
                                key={note.id}
                                className="
              group relative flex flex-col justify-between
              overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60
              p-5 shadow-[0_12px_32px_rgba(3,7,18,0.85)]
              backdrop-blur-sm transition-all duration-200
              hover:-translate-y-1 hover:border-cyan-400/70
              hover:shadow-[0_18px_48px_rgba(8,145,178,0.35)]
            "
                            >
                                {/* Glow layer */}
                                <div
                                    className="
                pointer-events-none absolute inset-0 rounded-2xl
                bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_55%)]
                opacity-0 mix-blend-screen transition-opacity duration-200
                group-hover:opacity-100
              "
                                />

                                <div className="relative space-y-3">
                                    {/* Category Pill + Date */}
                                    <div className="flex items-center justify-between">
                <span
                    className={`
                    ${pillColor}
                    inline-flex items-center rounded-full border
                    px-2 py-0.5 text-[10px] uppercase tracking-wider
                  `}
                >
                  {note.tags?.[0] ?? "Lab Note"}
                </span>

                                        <span className="text-[11px] text-slate-500">{date}</span>
                                    </div>

                                    {/* Type */}
                                    <p className="text-[11px] uppercase tracking-wide opacity-70 text-slate-400">
                                        {note.type === "paper" ? "Research Note" : "Lab Memo"}
                                    </p>

                                    {/* Title */}
                                    <h2 className="text-base font-semibold text-slate-50 group-hover:text-cyan-200 transition">
                                        {note.title}
                                    </h2>

                                    {/* Subtitle */}
                                    {note.subtitle && (
                                        <p className="text-xs text-slate-400">{note.subtitle}</p>
                                    )}

                                    {/* Summary */}
                                    <p className="text-sm text-slate-300/90 line-clamp-3">
                                        {note.summary}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="relative mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
              <span className="text-[11px] text-slate-500">
                {note.readingTime ?? 3} min read
              </span>

                                    <a
                                        href={`/lab-notes/${note.slug}`}
                                        className="text-[12px] font-medium text-cyan-300 transition group-hover:text-cyan-200"
                                    >
                                        {t("readMore", { defaultValue: "Read full note" })} ↗
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

        </LayoutShell>

    );
}