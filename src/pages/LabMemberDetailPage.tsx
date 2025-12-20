/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabMemberDetailPage.tsx
   Purpose: Detailed profile view for a single Lab member,
            including aura, lore status, and focus areas.
   =========================================================== */

/**
 * @file LabMemberDetailPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit Mascot Systems
 * @status evolving
 * @since 2025-12-08
 * @description Route-level page that renders a full profile for a
 *              LabMember, based on the slug provided in the URL.
 */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { LayoutShell } from "@/components/layout/LayoutShell";
import type { LabMember } from "@/types/LabMember";
import { labTeamBySlug, labTeamById } from "@/data/labTeam";

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

    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide";

    const colors =
        status === "lore-critical"
            ? "bg-violet-600/30 text-violet-200 border border-violet-400/60"
            : "bg-slate-700/60 text-slate-200 border border-slate-500/70";

    return <span className={`${base} ${colors}`}>{label}</span>;
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
                        className="inline-flex items-center text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                        ← Back to Lab Team
                    </Link>
                </div>
            </LayoutShell>
        );
    }

    const { emoji, aura, unit, department, status, badges, focusAreas, links } = member;
    const description =
        member.longBio ??
        member.bio ??
        "This Lab member is important enough to have a profile page, which already says a lot.";

    return (
        <LayoutShell
            eyebrow="Lab Team"
            title={member.name}
            description={member.title}
            headerActions={
                <Link
                    to="/labteam"
                    className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                >
                    ← Back to Lab Team
                </Link>
            }
        >
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-5 shadow-2xl shadow-slate-950/80 sm:px-8 sm:py-7">
                {/* Aura layers */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, ${aura.primary}40, transparent 70%)`,
                        mixBlendMode: "screen",
                    }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, ${aura.secondary}40, transparent 70%)`,
                        mixBlendMode: "screen",
                    }}
                />

                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                    {/* Left: avatar/identity */}
                    <div className="flex min-w-[220px] max-w-xs flex-col gap-4">
                        <div className="flex items-center gap-3">
                            {emoji && (
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-slate-600/80">
                  <span className="text-2xl" aria-hidden="true">
                    {emoji}
                  </span>
                                </div>
                            )}

                            <div>
                                <h1 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                                    {member.name}
                                </h1>
                                <p className="text-sm font-medium text-cyan-300">{member.title}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                    {unit}
                                    {department ? ` · ${department}` : null}
                                </p>
                            </div>
                        </div>

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

                    {/* Right: content */}
                    <div className="flex-1 space-y-5">
                        {/* Bio */}
                        <section>
                            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
                                Overview
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-200/90">{description}</p>
                        </section>

                        {/* Focus Areas */}
                        {focusAreas && focusAreas.length > 0 && (
                            <section>
                                <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
                                    Focus Areas
                                </h2>
                                <div className="flex flex-wrap gap-1.5">
                                    {focusAreas.map((focus) => (
                                        <span
                                            key={focus}
                                            className="inline-flex items-center rounded-full bg-slate-800/90 px-2 py-0.5 text-[0.7rem] text-slate-100"
                                        >
                      {focus}
                    </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Links */}
                        {links && links.length > 0 && (
                            <section>
                                <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
                                    Lore & Documentation
                                </h2>
                                <ul className="space-y-1.5 text-sm">
                                    {links.map((link) => (
                                        <li key={`${link.kind ?? "link"}-${link.href}`}>
                                            {link.kind === "doc" ? (
                                                <a
                                                    href={link.href}
                                                    className="text-cyan-300 hover:text-cyan-200"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {link.label}
                                                </a>
                                            ) : link.kind === "external" ? (
                                                <a
                                                    href={link.href}
                                                    className="text-cyan-300 hover:text-cyan-200"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {link.label} ↗
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
                        )}
                    </div>
                </div>
            </div>
        </LayoutShell>
    );
};

export default LabMemberDetailPage;