// src/pages/DepartmentDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { departments } from "../data/departments";
import { mascotAvatar, mascotName, mascotProfileSlug } from "@/data/mascotMeta";
import { labTeamBySlug } from "@/data/labTeam";
import { LayoutShell } from "@/components/layout/LayoutShell";

export function DepartmentDetailPage() {
    const { id } = useParams<{ id: string }>();

    const department = departments.find((d) => d.id === id);

    if (!department) {
        return (
            <LayoutShell>
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
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
                            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                            Back to Departments
                        </Link>
                        <Link
                            to="/"
                            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                        Error Code: DEPT-404 — Unit Not Registered
                    </p>
                </div>
            </LayoutShell>
        );
    }

    const mascot = mascotName[department.mascot];
    const avatar = mascotAvatar[department.mascot];
    const mascotSlug = mascotProfileSlug[department.mascot];
    const mascotProfile = labTeamBySlug[mascotSlug];
    const aura = mascotProfile?.aura;

    return (
        <LayoutShell
            eyebrow="Lab Department"
            title={department.name}
            description={department.short}
            headerRight={
                <Link
                    to="/departments"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                >
                    <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
                    All departments
                </Link>
            }
        >
            {/* MASCOT CALLOUT */}
            <Link
                to={`/labteam/${mascotSlug}`}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900/80"
            >
                {aura ? (
                    <>
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40"
                            style={{
                                background: `radial-gradient(circle, ${aura.primary}55, transparent 70%)`,
                            }}
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full blur-3xl opacity-30"
                            style={{
                                background: `radial-gradient(circle, ${aura.secondary}55, transparent 70%)`,
                            }}
                        />
                    </>
                ) : null}

                <img
                    src={avatar}
                    alt={mascot}
                    className="relative h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-slate-700/80"
                />
                <div className="relative min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                        Department mascot
                    </p>
                    <p className="text-base font-semibold text-slate-50 group-hover:text-cyan-200">
                        {mascotProfile?.name ?? mascot}
                    </p>
                    {mascotProfile ? (
                        <p className="text-xs text-slate-400">{mascotProfile.title}</p>
                    ) : null}
                </div>
                <ArrowRight
                    aria-hidden
                    className="relative h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                />
            </Link>

            {/* MAIN DESCRIPTION */}
            <section className="space-y-4 max-w-3xl text-sm md:text-base text-slate-200">
                <p>{department.description}</p>

                {department.easterEgg && (
                    <p className="border-l border-amber-400/40 pl-3 text-xs italic text-amber-300/90">
                        Lab note: {department.easterEgg}
                    </p>
                )}
            </section>

            {/* WHERE TO FIND RELATED WORK */}
            <section className="space-y-3 border-t border-slate-800 pt-6">
                <h2 className="text-lg font-semibold text-slate-100">Find related work</h2>
                <p className="text-sm text-slate-400 max-w-3xl">
                    Research tagged to this department shows up in the{" "}
                    <a
                        href="https://notebook.thehumanpatternlab.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                    >
                        Notebook
                        <ExternalLink aria-hidden className="h-3 w-3 opacity-80" />
                    </a>{" "}
                    and the{" "}
                    <Link
                        to="/videos"
                        className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                    >
                        Video Archive
                    </Link>
                    .
                </p>
            </section>
        </LayoutShell>
    );
}
