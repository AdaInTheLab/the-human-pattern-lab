/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DepartmentDetailPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file DepartmentDetailPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/DepartmentDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { departments, type Department } from "../data/departments";

const mascotEmoji: Record<Department["mascot"], string> = {
    orbson: "👁️",
    carmel: "😼",
    mcchonk: "🍩",
    stan: "🦝",
    drizzle: "🌧️",
};

const mascotName: Record<Department["mascot"], string> = {
    orbson: "Orbson",
    carmel: "Carmel",
    mcchonk: "Professor McChonk",
    stan: "Raccoon Analyst",
    drizzle: "Emotional Weather Orb",
};

export function DepartmentDetailPage() {
    const { id } = useParams<{ id: string }>();

    const department = departments.find((d) => d.id === id);

    if (!department) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 flex items-center justify-center">
                    <span className="text-3xl">🗂️</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Department not found.
                </h1>
                <p className="max-w-md text-slate-300">
                    Orbson checked the Lab directory and couldn&apos;t locate this
                    department. It may have been renamed, reorganized, or never formally
                    approved by Professor McChonk.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/departments"
                        className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                    >
                        Back to Departments
                    </Link>
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        Return to Homepage
                    </Link>
                </div>
                <p className="text-xs text-slate-500 italic">
                    Error Code: DEPT-404 — Unit Not Registered
                </p>
            </div>
        );
    }

    const emoji = mascotEmoji[department.mascot];
    const mascot = mascotName[department.mascot];

    return (
        <article className="pb-10 space-y-8">
            {/* HEADER */}
            <header className="space-y-4 border-b border-slate-800 pb-6">
                <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 flex items-center justify-center text-2xl">
                        <span aria-hidden="true">{emoji}</span>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                            Lab Department
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
                            {department.name}
                        </h1>
                        <p className="text-sm text-cyan-300">{department.short}</p>

                        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span>
                Mascot:{" "}
                  <span className="text-slate-100 font-medium">{mascot}</span>
              </span>
                            <span className="hidden md:inline">·</span>
                            <Link
                                to="/departments"
                                className="inline-flex items-center gap-1 hover:text-cyan-300"
                            >
                                ← Back to all departments
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN DESCRIPTION */}
            <section className="space-y-4 text-sm md:text-base text-slate-200 max-w-3xl">
                <p>{department.description}</p>

                {department.easterEgg && (
                    <p className="text-xs text-amber-300/90 italic border-l border-amber-400/40 pl-3">
                        Lab note: {department.easterEgg}
                    </p>
                )}

                <p className="text-slate-300">
                    This department works closely with the rest of the Lab to translate
                    raw chaos into usable insight. Its findings may show up in Lab Notes,
                    videos, internal memos, or Carmel&apos;s informal judgment logs.
                </p>
            </section>

            {/* PLACEHOLDER FOR FUTURE CONTENT */}
            <section className="space-y-3 border-t border-slate-800 pt-6">
                <h2 className="text-lg font-semibold text-slate-100">
                    Related work from this department
                </h2>
                <p className="text-sm text-slate-300 max-w-3xl">
                    In the future, this section can list Lab Notes, videos, or experiments
                    associated with this department (for example: Emotional Weather
                    entries, AI &amp; Consciousness reports, or Raccoon Behavioral case
                    studies).
                </p>
                <p className="text-xs text-slate-500">
                    For now, you can explore active research via{" "}
                    <Link
                        to="/lab-notes"
                        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                    >
                        Lab Notes
                    </Link>{" "}
                    and{" "}
                    <Link
                        to="/videos"
                        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                    >
                        Video Archive
                    </Link>
                    .
                </p>
            </section>
        </article>
    );
}
