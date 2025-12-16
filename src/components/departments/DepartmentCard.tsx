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
import { Department } from "@/data/departments";

const mascotEmoji: Record<Department["mascot"], string> = {
    founder: "🦊",
    orbson: "👁️",
    carmel: "😼",
    mcchonk: "🍩",
    stan: "🦝",
    drizzle: "🌧️",
    lyric: "🔮",
    "fill-the-void": "🌘",
    nemmi: "🔥",
};

const mascotName: Record<Department["mascot"], string> = {
    founder: "Ada",
    orbson: "Orbson",
    carmel: "Carmel",
    mcchonk: "Professor McChonk",
    stan: "Stan",
    drizzle: "Drizzle",
    lyric: "Lyric",
    "fill-the-void": "Fill the Void",
    nemmi: "Nemmi",
};


type Props = {
    department: Department;
};

export function DepartmentCard({ department }: Props) {
    const emoji = mascotEmoji[department.mascot];
    const name = mascotName[department.mascot];

    return (
        <article
            className="
        group
        rounded-2xl
        border border-slate-800
        bg-slate-900/60
        p-4
        hover:border-cyan-500/50
        hover:shadow-lg
        hover:shadow-cyan-500/15
        transition
        flex flex-col justify-between
      "
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-2">
                <div
                    className="
            h-10 w-10 rounded-full
            bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400
            flex items-center justify-center
            text-xl
          "
                >
                    {emoji}
                </div>

                <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-semibold text-slate-50">
                        {department.name}
                    </h3>

                    <p className="text-xs text-cyan-300">
                        {department.short}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 flex-1">
                {department.description}
            </p>

            {/* Footer */}
            <div
                className="
          mt-3 pt-3
          border-t border-slate-800/80
          text-[11px]
          text-slate-400
          flex items-center justify-between gap-2
        "
            >
        <span>
          Mascot:{" "}
            <span className="text-slate-200 font-medium">{name}</span>
        </span>

                {department.easterEgg && (
                    <span
                        className="
              italic
              text-slate-500
              group-hover:text-amber-300
              transition
            "
                    >
            {department.easterEgg}
          </span>
                )}
            </div>
        </article>
    );
}
