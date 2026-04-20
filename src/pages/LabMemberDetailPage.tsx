import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { LayoutShell } from "@/components/layout/LayoutShell";
import type { LabMember } from "@/types/LabMember";
import { labTeamBySlug, labTeamById } from "@/data/labTeam";
import { departments } from "@/data/departments";
import { mascotProfileSlug } from "@/data/mascotMeta";

type Params = {
    memberId?: string;
};

function getMemberFromParams(memberId?: string): LabMember | undefined {
    if (!memberId) return undefined;
    // Prefer slug lookup, but fall back to id to be flexible
    return labTeamBySlug[memberId] ?? labTeamById[memberId];
}

function StatusPill({ status }: { status: LabMember["status"] }) {
    const label =
        status === "lore-critical" ? "Lore-Critical" : status === "guest" ? "Guest" : status;

    const colors =
        status === "lore-critical"
            ? "border-violet-400/60 bg-violet-600/30 text-violet-200"
            : "border-slate-500/70 bg-slate-700/60 text-slate-200";

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${colors}`}
        >
            {label}
        </span>
    );
}

export const LabMemberDetailPage: React.FC = () => {
    const { memberId } = useParams<Params>();
    const member = getMemberFromParams(memberId);

    if (!member) {
        return (
            <LayoutShell
                eyebrow="Lab Team"
                title="Lab Member Not Found"
                description="We couldn’t find a Lab member with that ID. The mascots might have rearranged the archives again."
            >
                <div className="space-y-4">
                    <p className="text-slate-300">
                        Double-check the URL or head back to the full Lab Team directory.
                    </p>
                    <Link
                        to="/labteam"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                        <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
                        Back to Lab Team
                    </Link>
                </div>
            </LayoutShell>
        );
    }

    const { aura, unit, department, status, badges, focusAreas, links } = member;
    const description = member.longBio ?? member.bio;

    // Find the department this mascot leads (if any)
    const ownedDepartment = departments.find(
        (d) => mascotProfileSlug[d.mascot] === member.slug
    );

    return (
        <LayoutShell
            eyebrow="Lab Team"
            title={member.name}
            description={member.title}
            headerRight={
                <Link
                    to="/labteam"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                >
                    <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
                    All lab team
                </Link>
            }
        >
            {/* IDENTITY CARD — avatar + meta */}
            <section className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-6 shadow-2xl shadow-slate-950/80 sm:px-8 sm:py-8">
                {/* Aura layers */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, ${aura.primary}55, transparent 70%)`,
                        mixBlendMode: "screen",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, ${aura.secondary}55, transparent 70%)`,
                        mixBlendMode: "screen",
                    }}
                />

                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
                    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-[-8px] rounded-full opacity-60 blur-md"
                            style={{
                                background: `radial-gradient(circle, ${aura.primary}77, transparent 70%)`,
                            }}
                        />
                        <img
                            src={member.avatarSrc}
                            alt={member.name}
                            className="relative h-full w-full rounded-full object-cover ring-2 ring-slate-700/80"
                        />
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                        <p className="text-sm text-slate-400">
                            {unit}
                            {department ? ` · ${department}` : null}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusPill status={status} />
                            {badges?.map((badge) => (
                                <span
                                    key={badge}
                                    className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/80 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-slate-200/90"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OVERVIEW */}
            <section className="max-w-3xl space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Overview
                </h2>
                <p className="text-sm leading-relaxed text-slate-200/90 md:text-base">
                    {description}
                </p>
            </section>

            {/* FOCUS AREAS */}
            {focusAreas && focusAreas.length > 0 ? (
                <section className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Focus Areas
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {focusAreas.map((focus) => (
                            <span
                                key={focus}
                                className="inline-flex items-center rounded-full bg-slate-800/90 px-2.5 py-1 text-xs text-slate-100"
                            >
                                {focus}
                            </span>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* HOME DEPARTMENT */}
            {ownedDepartment ? (
                <section className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Home department
                    </h2>
                    <Link
                        to={`/departments/${ownedDepartment.id}`}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900/80"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-50 group-hover:text-cyan-200">
                                {ownedDepartment.name}
                            </p>
                            <p className="text-xs text-cyan-300">{ownedDepartment.short}</p>
                        </div>
                        <ArrowRight
                            aria-hidden
                            className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                        />
                    </Link>
                </section>
            ) : null}

            {/* LORE & DOCUMENTATION */}
            {links && links.length > 0 ? (
                <section className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Lore &amp; Documentation
                    </h2>
                    <ul className="space-y-1.5 text-sm">
                        {links.map((link) => (
                            <li key={`${link.kind ?? "link"}-${link.href}`}>
                                {link.kind === "doc" ? (
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.label}
                                        <ExternalLink aria-hidden className="h-3 w-3 opacity-80" />
                                    </a>
                                ) : link.kind === "external" ? (
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.label}
                                        <ExternalLink aria-hidden className="h-3 w-3 opacity-80" />
                                    </a>
                                ) : (
                                    <Link
                                        to={link.href}
                                        className="text-cyan-300 hover:text-cyan-200"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </LayoutShell>
    );
};

export default LabMemberDetailPage;
