/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNoteCard.tsx
   Lab Unit: SCMS — Systems & Code Management Suite
   Purpose: Renders a single Lab Note preview card for the Lab
            Notes index grid, with department styling, glow,
            staggered reveal, and hover-driven excerpt reveal.
   =========================================================== */

/**
 * @file LabNoteCard.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-25
 * @description Presentational UI component for the Lab Notes index.
 *              Displays one Lab Note in a stylized card frame with:
 *              - Department-aware border/text/glow/shadow styling
 *              - Staggered reveal animation via per-card delay
 *              - Title ↔ excerpt "whisper" swap on hover
 *              - Tag pill, reading-time metadata, and link portal
 *              Data loading is handled by LabNotesPage; this component
 *              is intentionally stateless and render-only.
 */


// src/components/labnotes/LabNoteCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { LabNote } from "@/lib/labNotes";

interface DeptStyle {
    border: string;
    text: string;
    glow: string;
    shadow: string;
}

const allStyles: Record<string, DeptStyle> = {
    coda: {
        border: "hover:!border-coda",
        text: "!text-coda",
        glow: "from-coda/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(255,184,0,0.4)]",
    },
    vesper: {
        border: "hover:!border-vesper",
        text: "!text-vesper",
        glow: "from-vesper/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(110,0,255,0.3)]",
    },
    lyric: {
        border: "hover:!border-lyric",
        text: "!text-lyric",
        glow: "from-lyric/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(0,255,133,0.3)]",
    },
    scms: {
        border: "hover:!border-slate-500",
        text: "!text-slate-400",
        glow: "from-slate-500/10",
        shadow: "hover:!shadow-none",
    },
};

// 🧬 Explicitly map potential YAML names to our style keys
function getDeptKey(id: string): string {
    const normalized = (id || "scms").toLowerCase();
    if (normalized === "alignment" || normalized === "coda") return "coda";
    if (normalized === "shadow" || normalized === "vesper") return "vesper";
    if (normalized === "structure" || normalized === "lyric") return "lyric";
    if (normalized === "systems" || normalized === "scms") return "scms";
    return "scms";
}

type Props = {
    note: LabNote;
    index: number;
};

export function LabNoteCard({ note, index }: Props) {
    const { t } = useTranslation("labNotesPage");

    const rawId = note.dept?.toLowerCase() || note.department_id || "scms";
    const deptKey = getDeptKey(rawId);
    const styles = allStyles[deptKey] || allStyles.scms;

    const teaser = note.subtitle ?? note.summary ?? "";
    const tag = note.tags?.[0] || "LOG";

    return (
        <article
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            className={`
        animate-reveal group relative flex flex-col justify-between
        overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40
        p-6 transition-all duration-300
        hover:-translate-y-1 ${styles.border} ${styles.shadow}
      `}
        >
            {/* Glow layer */}
            <div
                className={`
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100 transition-opacity duration-500
          bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-from),transparent_70%)]
          ${styles.glow}
        `}
            />

            <div className="relative space-y-4">
                <div className="flex items-center justify-between">
          <span
              className={`px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50 font-mono text-[10px] uppercase ${styles.text}`}
          >
            {tag}
          </span>
                </div>

                {/* Title ↔ Excerpt swap */}
                <div className="relative min-h-[3.25rem]">
                    <h2
                        className={`text-xl font-semibold text-slate-50 transition-all duration-300 ease-out ${styles.text}
                        group-hover:opacity-0 group-hover:-translate-y-1`}
                    >
                        {note.title}
                    </h2>

                    {teaser && (
                        <p
                            className="
                absolute top-0 left-0 right-0
                text-sm text-slate-300 leading-relaxed
                opacity-0 translate-y-2
                transition-all duration-300 ease-out delay-75
                group-hover:opacity-100 group-hover:translate-y-0
              "
                        >
                            {teaser}
                        </p>
                    )}
                </div>

                {note.summary && (
                    <div>
                        {/* Preview ↔ Hover Insight Swap */}
                        <div className="relative mt-2 min-h-[4.5rem]">
                            {/* Default: excerpt */}
                            <p
                                className="
      text-sm text-slate-400 leading-relaxed line-clamp-3
      transition-all duration-500 ease-out
      group-hover:opacity-0 group-hover:-translate-y-1
    "
                            >
                                {note.summary}
                            </p>

                            {/* Hover: concept signals */}
                            <div
                                className="
      absolute inset-0
      opacity-0 translate-y-1
      transition-all duration-500 ease-out delay-75
      group-hover:opacity-100 group-hover:translate-y-0
    "
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
          Concept Load
        </span>

                                        {note.safer_landing && (
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-lyric/80">
            Safer ✓
          </span>
                                        )}
                                    </div>

                                    {/* Shadow density bars */}
                                    <div className="flex gap-1.5 items-end">
                                        {Array.from({ length: 10 }).map((_, i) => {
                                            const active = i < (note.shadow_density ?? 0);

                                            return (
                                                <span
                                                    key={i}
                                                    className={`
                w-1 rounded-sm transition-all duration-500
                ${active ? "bg-vesper shadow-[0_0_8px_rgba(110,0,255,0.55)]" : "bg-slate-800"}
              `}
                                                    style={{ height: `${6 + i}px` }}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Tag pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {(note.tags ?? []).slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/40
                       text-[10px] font-mono uppercase tracking-wider text-slate-400"
                                            >
            {tag}
          </span>
                                        ))}

                                        {/* fallback if tags empty */}
                                        {(!note.tags || note.tags.length === 0) && (
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600">
            No tags registered
          </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="relative mt-8 flex items-center justify-between border-t border-slate-900 pt-4">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
          {note.readingTime ?? 3} MIN READ
        </span>

                <Link
                    to={`/lab-notes/${note.slug}`}
                    className={`text-xs font-bold uppercase tracking-widest transition-all ${styles.text} hover:tracking-[0.2em]`}
                >
                    {t("readMore", { defaultValue: "Open Note" })} →
                </Link>
            </div>
        </article>
    );
}
