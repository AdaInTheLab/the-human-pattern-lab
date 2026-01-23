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

// src/components/labnotes/LabNoteCard.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { LabNote } from "@/lib/labNotes";
import {
    cx,
    DEPT_STYLES,
    getDeptKey,
    GUEST_STYLES,
    getGuestKey,
} from "@/components/labnotes/labNoteCard.styles";

type Props = {
    note: LabNote;
    index: number;
};

function normalizeBlurb(s?: string | null) {
    return String(s ?? "")
        .replace(/\s+/g, " ")
        .replace(/[—–-]\s*$/, "")
        .trim();
}

function looksDuplicate(a?: string | null, b?: string | null) {
    const A = normalizeBlurb(a).toLowerCase();
    const B = normalizeBlurb(b).toLowerCase();
    if (!A || !B) return false;

    if (A === B) return true;
    if (A.includes(B) && B.length > 40) return true;
    if (B.includes(A) && A.length > 40) return true;

    return false;
}

function getPrimaryBlurb(note: any) {
    return (
        normalizeBlurb(note.subtitle) ||
        normalizeBlurb(note.summary) ||
        normalizeBlurb(note.excerpt) ||
        null
    );
}

// Hover whisper: only show if it adds value (no duplication)
function getHoverBlurb(note: { subtitle?: string | null; summary?: string | null; excerpt?: string | null }) {
    const subtitle = normalizeBlurb(note.subtitle);
    const summary = normalizeBlurb(note.summary);
    const excerpt = normalizeBlurb(note.excerpt);

    const candidate = subtitle || summary || excerpt;
    if (!candidate) return null;

    // If it's basically the same as the primary visible blurb, skip it
    const primary = subtitle || summary || excerpt;
    if (looksDuplicate(candidate, primary)) return null;

    // Extra guard: avoid “subtitle mirrors summary” cases
    if (!subtitle && looksDuplicate(candidate, summary)) return null;

    return candidate;
}

export function LabNoteCard({ note, index }: Props) {
    const { t, i18n } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";

    const hoverBlurb = getHoverBlurb(note as any);
    const primaryBlurb = getPrimaryBlurb(note as any);

    const guestKey = getGuestKey(note as any);
    const guest = guestKey ? (GUEST_STYLES[guestKey] ?? GUEST_STYLES.copilot) : null;

    const deptKey = getDeptKey(note.dept ?? note.department_id);
    const styles = DEPT_STYLES[deptKey] ?? DEPT_STYLES.scms;

    const tag = note.tags?.[0] || (note.type ? String(note.type).toUpperCase() : "NOTE");
    const shadow = Math.max(0, Math.min(10, Math.round(note.shadow_density ?? 0)));

    return (
        <article
            style={{ animationDelay: `${index * 90}ms`, opacity: 0 }}
            className={cx(
                "animate-reveal group relative flex flex-col justify-between",
                "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40",
                "p-6 transition-all duration-300",
                "hover:-translate-y-1",
                styles.border,
                styles.shadow
            )}
        >
            {/* Glow layer */}
            <div
                className={cx(
                    "pointer-events-none absolute inset-0 opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-500",
                    "bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-from),transparent_70%)]",
                    styles.glow
                )}
            />

            {/* Guest “visiting signal” rail (does not replace dept identity) */}
            {guest ? (
                <div
                    className={cx(
                        "pointer-events-none absolute left-0 top-6 bottom-6 w-[2px]",
                        guest.rail,
                        guest.railMask
                    )}
                />
            ) : null}

            <div className="relative space-y-4">
                {/* Pills */}
                <div className="flex items-center gap-2">
          <span
              className={cx(
                  "px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50",
                  "font-mono text-[10px] uppercase tracking-widest",
                  styles.text
              )}
          >
            {tag}
          </span>

                    {guestKey && guest ? (
                        <span
                            className={cx(
                                "px-2 py-0.5 rounded border",
                                "font-mono text-[10px] uppercase tracking-widest",
                                guest.badge
                            )}
                            title={`Guest voice: ${guestKey}`}
                        >
              Guest · {guestKey}
            </span>
                    ) : null}
                </div>

                {/* Title ↔ hover whisper */}
                <div className="relative min-h-[3.25rem]">
                    <h2
                        className={cx(
                            "text-xl font-semibold text-slate-50 transition-all duration-300 ease-out",
                            styles.text,
                            "group-hover:opacity-0 group-hover:-translate-y-1"
                        )}
                    >
                        {note.title}
                    </h2>

                    {hoverBlurb ? (
                        <p
                            className={cx(
                                "absolute top-0 left-0 right-0",
                                "text-sm text-slate-300 leading-relaxed line-clamp-2",
                                "opacity-0 translate-y-2",
                                "transition-all duration-300 ease-out delay-75",
                                "group-hover:opacity-100 group-hover:translate-y-0"
                            )}
                        >
                            {hoverBlurb}
                        </p>
                    ) : null}
                </div>

                {/* Body: always show best available blurb; hover shows concept panel */}
                {primaryBlurb ? (
                    <div className="relative mt-2 min-h-[4.5rem]">
                        <p
                            className={cx(
                                "text-sm text-slate-400 leading-relaxed line-clamp-3",
                                "transition-all duration-500 ease-out",
                                "group-hover:opacity-0 group-hover:-translate-y-1"
                            )}
                        >
                            {primaryBlurb}
                        </p>

                        <div
                            className={cx(
                                "absolute inset-0",
                                "opacity-0 translate-y-1",
                                "transition-all duration-500 ease-out delay-75",
                                "group-hover:opacity-100 group-hover:translate-y-0"
                            )}
                        >
                            {/* Hover: concept signals */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
                    Concept Load
                  </span>

                                    {note.safer_landing ? (
                                        <span className={cx("text-[10px] font-mono uppercase tracking-widest opacity-80", styles.text)}>
                      Safer ✓
                    </span>
                                    ) : null}
                                </div>

                                {guestKey && guest ? (
                                    <p className={cx("text-[11px] italic", guest.text ?? "text-slate-500")}>
                                        In conversation with: {guestKey}
                                    </p>
                                ) : null}

                                {/* Shadow density bars */}
                                <div className="flex gap-1.5 items-end">
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const active = i < shadow;
                                        return (
                                            <span
                                                key={i}
                                                className={cx(
                                                    "w-1 rounded-sm transition-all duration-500",
                                                    active ? styles.accentBarActive : styles.accentBarInactive,
                                                    active ? styles.accentBarShadow : undefined
                                                )}
                                                style={{ height: `${6 + i}px` }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {(note.tags ?? []).slice(0, 3).map((tagItem) => (
                                        <span
                                            key={tagItem}
                                            className={cx(
                                                "px-2 py-0.5 rounded border border-slate-800 bg-slate-900/40",
                                                "text-[10px] font-mono uppercase tracking-wider text-slate-400"
                                            )}
                                        >
                      {tagItem}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative mt-2 min-h-[2.75rem]">
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">—</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="relative mt-8 flex items-center justify-between border-t border-slate-900 pt-4">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
          {note.readingTime ?? 3} MIN READ
        </span>

                <Link
                    to={`/${locale}/lab-notes/${note.slug}`}
                    className={cx(
                        "text-xs font-bold uppercase tracking-widest transition-all hover:tracking-[0.2em]",
                        styles.text
                    )}
                >
                    {t("readMore", { defaultValue: "Open Note" })} →
                </Link>
            </div>
        </article>
    );
}
