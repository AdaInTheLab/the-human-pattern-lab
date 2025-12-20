/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabTeamPreview.tsx
   Purpose: Homepage preview grid of Lab members.
   =========================================================== */

import { Link } from "react-router-dom";
import { labTeam } from "@/data/labTeam";

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
                        Founder avatar, judgment engine, and holographic continuity, all in one slightly feral research lab.
                    </p>
                </div>

                <Link
                    to="/labteam"
                    className="hidden md:inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View full roster →
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {labTeam.slice(0, 3).map((member) => {
                    return (
                        <article
                            key={member.id}
                            className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/60 hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition"
                        >
                            {/* Avatar */}
                            <div className="flex items-start gap-3">
                                <div className="relative mt-1">
                                    <div
                                        className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold text-slate-950 shadow-md"
                                        style={{
                                            background: `linear-gradient(135deg, ${member.aura.primary}, ${member.aura.secondary})`,
                                        }}
                                    >
                                        <img
                                            src={member.avatarSrc}
                                            alt={member.name}
                                            className="h-10 w-10 rounded-full object-cover border border-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-1">
                                    {/* Name & Badge */}
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold text-slate-50">
                                            {member.name}
                                        </h3>
                                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] bg-slate-800/70 text-slate-300 border border-slate-600/60">
                                            {member.unit}
                                        </span>
                                    </div>

                                    <p className="text-xs text-cyan-300">
                                        {member.title}
                                    </p>

                                    <p className="text-sm text-slate-300 mt-1 line-clamp-3">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Footer anchored to bottom */}
                            <div className="mt-auto pt-3 border-t border-slate-800/80">
                                <p className="text-xs text-slate-400">
                                    <span className="font-semibold text-slate-200">
                                        Official Lab member:
                                    </span>{" "}
                                    #{member.id}
                                </p>

                                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                                    <span></span>
                                    <Link
                                        to={`/labteam/${member.slug}`}
                                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                                    >
                                        View profile
                                        <span aria-hidden="true">↗</span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Mobile link */}
            <div className="mt-3 md:hidden">
                <Link
                    to="/labteam"
                    className="inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View full roster →
                </Link>
            </div>
        </section>
    );
}
