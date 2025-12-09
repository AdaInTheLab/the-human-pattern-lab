/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabTeamPreview.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file LabTeamPreview.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/home/LabTeamPreview.tsx
import { Link } from "react-router-dom";
import { labTeam } from "@/data/labTeam";

const roleBadgeStyles: Record<string, string> = {
    observation: "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
    judgment: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    morale: "bg-violet-500/10 text-violet-300 border-violet-500/40",
};

export function LabTeamPreview() {
    return (
        <section aria-labelledby="lab-team-heading">
            <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                    <h2
                        id="lab-team-heading"
                        className="text-xl md:text-2xl font-semibold"
                    >
                        Meet the Lab Team
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        The core crew translating chaos into data, and data back into jokes.
                    </p>
                </div>

                <Link
                    to="/departments"
                    className="hidden md:inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all departments →
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {labTeam.map((member) => {
                    const badgeClass =
                        roleBadgeStyles[member.role] ??
                        "bg-slate-800/60 text-slate-200 border-slate-600";

                    return (
                        <article
                            key={member.id}
                            className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/60 hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition"
                        >
                            {/* Avatar / orb placeholder */}
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/70 via-violet-500/70 to-emerald-400/70 flex items-center justify-center text-xs font-semibold text-slate-950">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold text-slate-50">
                                            {member.name}
                                        </h3>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${badgeClass}`}
                                        >
                      {member.role === "observation" && "Observation"}
                                            {member.role === "judgment" && "Judgment"}
                                            {member.role === "morale" && "Morale"}
                    </span>
                                    </div>

                                    <p className="text-xs text-slate-300">{member.title}</p>
                                    <p className="text-sm text-slate-300 mt-1">{member.blurb}</p>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-800/80">
                                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">
                    Fun fact:
                  </span>{" "}
                                    {member.funFact}
                                </p>
                            </div>

                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="italic">
                  Official Lab member · #{member.id}
                </span>
                                <Link
                                    to={`/labteam/${member.id}`}
                                    className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200"
                                >
                                    View profile
                                    <span aria-hidden="true">↗</span>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Mobile link */}
            <div className="mt-3 md:hidden">
                <Link
                    to="/departments"
                    className="inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all departments →
                </Link>
            </div>
        </section>
    );
}
