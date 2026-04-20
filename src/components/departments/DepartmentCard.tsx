/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DepartmentCard.tsx
   Purpose: Renders an individual department card displaying
            identity, mascot affiliation, and descriptive lore.
   =========================================================== */

/**
 * @file DepartmentCard.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit CJO — Chief Judgment Office
 * @status Active
 * @since 2025-12-16
 * @description Presentational component for Lab departments.
 *              Displays department name, short tagline, mascot
 *              association, and descriptive text in a consistent
 *              card layout used by the Departments index page.
 */


// src/components/departments/DepartmentCard.tsx
import { Link } from "react-router-dom";
import { Department } from "@/data/departments";
import { mascotAvatar, mascotName, mascotProfileSlug } from "@/data/mascotMeta";

type Props = {
    department: Department;
};

export function DepartmentCard({ department }: Props) {
    const name = mascotName[department.mascot];
    const avatar = mascotAvatar[department.mascot];
    const mascotSlug = mascotProfileSlug[department.mascot];

    return (
        <article
            className="
        group
        flex flex-col justify-between
        rounded-2xl
        border border-slate-800
        bg-slate-900/60
        p-4
        transition
        hover:border-cyan-500/50
        hover:shadow-lg
        hover:shadow-cyan-500/15
      "
        >
            {/* Whole header + body is a single link into the detail page */}
            <Link
                to={`/departments/${department.id}`}
                className="flex flex-1 flex-col"
            >
                {/* Header */}
                <div className="mb-2 flex items-start gap-3">
                    <img
                        src={avatar}
                        alt={name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-700/80"
                    />

                    <div className="space-y-1">
                        <h3 className="text-sm md:text-base font-semibold text-slate-50 group-hover:text-cyan-200">
                            {department.name}
                        </h3>

                        <p className="text-xs text-cyan-300">{department.short}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="flex-1 text-sm text-slate-300">
                    {department.description}
                </p>
            </Link>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                <span>
                    Mascot:{" "}
                    <Link
                        to={`/labteam/${mascotSlug}`}
                        className="font-medium text-slate-200 hover:text-cyan-300"
                    >
                        {name}
                    </Link>
                </span>

                {department.easterEgg && (
                    <span className="italic text-slate-500 transition group-hover:text-amber-300">
                        {department.easterEgg}
                    </span>
                )}
            </div>
        </article>
    );
}
