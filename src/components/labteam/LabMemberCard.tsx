/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabMemberCard.tsx
   Purpose: Presentational card for Lab members using aura, avatars,
            badges, and focus metadata.
   =========================================================== */

/**
 * @file LabMemberCard.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Mascot Systems
 * @status evolving
 * @since 2025-12-09
 * @description Clean, aura-infused Lab Member card with avatar,
 *              fun facts, badges, focus areas, and profile links.
 */

import type { LabMember } from "@/types/LabMember";
import { Link } from "react-router-dom";
import React from "react";

type LabMemberCardProps = {
    member: LabMember;
};

const buildAuraStyle = (member: LabMember): React.CSSProperties => {
    const { primary, secondary } = member.aura;

    return {
        position: "relative",
        isolation: "isolate",
        boxShadow: `0 18px 45px rgba(15,23,42,0.9)`,
        background: "radial-gradient(circle at 0% 0%, transparent 0, transparent 40%)",
    } as React.CSSProperties;
};

export const LabMemberCard: React.FC<LabMemberCardProps> = ({ member }) => {
    const detailHref = `/labteam/${member.slug}`;

    return (
        <article
            className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 sm:p-5 shadow-xl shadow-slate-950/70 transition-transform duration-150 hover:-translate-y-1 hover:border-cyan-400/70"
            style={buildAuraStyle(member)}
        >
            {/* Soft aura glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${member.aura.primary}33, transparent 70%)`,
                    mixBlendMode: "screen",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${member.aura.secondary}33, transparent 70%)`,
                    mixBlendMode: "screen",
                }}
            />

            <div className="relative z-10 flex flex-col gap-4">
                {/* Header Block */}
                <header className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative h-14 w-14 shrink-0">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 blur-sm opacity-40" />
                        <img
                            src={member.avatarSrc}
                            alt={member.name}
                            className="relative h-14 w-14 rounded-full object-cover shadow-md shadow-slate-900/80"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                            {member.name}
                        </h3>
                        <p className="text-xs font-medium text-cyan-300 sm:text-sm">
                            {member.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                            {member.unit}
                            {member.department ? ` · ${member.department}` : ""}
                        </p>
                    </div>
                </header>

                {/* Bio */}
                <p className="text-sm leading-relaxed text-slate-200/90">
                    {member.bio}
                </p>

                {/* Fun Fact */}
                {member.funFact && (
                    <div>
                        <p className="text-xs font-semibold text-slate-300">Fun fact:</p>
                        <p className="text-xs text-slate-400">{member.funFact}</p>
                    </div>
                )}

                {/* Badges */}
                {member.badges && member.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {member.badges.map((badge) => (
                            <span
                                key={badge}
                                className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/80 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-slate-200/90"
                            >
                {badge}
              </span>
                        ))}
                    </div>
                )}

                {/* Focus Areas */}
                {member.focusAreas && member.focusAreas.length > 0 && (
                    <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Focus Areas
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {member.focusAreas.map((focus) => (
                                <span
                                    key={focus}
                                    className="inline-flex items-center rounded-full bg-slate-800/90 px-2 py-0.5 text-[0.7rem] text-slate-100"
                                >
                  {focus}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-2 flex items-center justify-between gap-2">
                    <Link
                        to={detailHref}
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                        View profile →
                    </Link>

                    {member.docAnchor && (
                        <a
                            href={`/docs/mascot-lore#${member.docAnchor}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[0.7rem] font-medium text-slate-400 hover:text-slate-200"
                        >
                            Lore entry
                        </a>
                    )}
                </footer>
            </div>
        </article>
    );
};

export default LabMemberCard;
