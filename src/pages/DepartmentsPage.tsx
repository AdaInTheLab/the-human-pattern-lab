/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DepartmentsPage.tsx
   Purpose: Renders the Departments index page: Lab universe intro,
            department browsing, and navigation toward Docs.
   =========================================================== */

/**
 * @file DepartmentsPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @status Active
 * @since 2025-12-16
 * @description Departments landing page for The Human Pattern Lab.
 *              Presents an overview of Lab departments, supports
 *              browsing/filtering by mascot ownership, and provides
 *              a docs bridge for deeper lore/standards.
 */


// src/pages/DepartmentsPage.tsx
import React from "react";
import { departments, type Department } from "@/data/departments";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { LayoutShell } from "@/components/layout/LayoutShell";

type DeptFilter = "all" | Department["mascot"];

const filterLabels: Record<DeptFilter, string> = {
    all: "All",
    founder: "Founder",
    orbson: "Orbson",
    carmel: "Carmel",
    mcchonk: "McChonk",
    stan: "Stan",
    drizzle: "Drizzle",
    lyric:  "Lyric",
    nemmi: "Nemmi",
"fill-the-void": "Fill the Void",
};

export function DepartmentsPage() {
    const [filter, setFilter] = React.useState<DeptFilter>("all");

    const filtered = React.useMemo(() => {
        if (filter === "all") return departments;
        return departments.filter((d) => d.mascot === filter);
    }, [filter]);

    const FilterButton = ({
                              value,
                              label,
                          }: {
        value: DeptFilter;
        label: string;
    }) => {
        const active = filter === value;
        return (
            <button
                type="button"
                onClick={() => setFilter(value)}
                className={[
                    "relative rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
                    active
                        ? "bg-slate-50 text-slate-900 shadow-[0_0_18px_rgba(45,212,191,0.65)]"
                        : "text-slate-200 hover:text-white hover:bg-slate-800/70",
                ].join(" ")}
            >
                {label}
            </button>
        );
    };

    return (
        <LayoutShell>
            {/* HEADER / INTRO */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    Lab Universe
                </p>

                <h1 className="text-3xl md:text-4xl font-semibold">
                    Departments of The Human Pattern Lab
                </h1>

                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    The Lab is divided into departments so chaos has a mailing address.
                    Each unit tracks a different signal — patterns, emotions, systems, lore,
                    and the occasional raccoon-led “research initiative.”
                </p>

                {/* Docs bridge */}
                <div className="pt-1">
                    <a
                        href="/docs/"
                        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                        Explore the full documentation →
                        <span className="text-slate-500">(standards, lore, systems)</span>
                    </a>
                </div>
            </section>

            {/* GRID */}
            <section className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold">Active departments</h2>

                    {/* Filter bar (powered by your `mascot` field) */}
                    <div className="flex flex-wrap gap-1 rounded-full bg-slate-900/85 px-1.5 py-1 shadow-[0_0_26px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70">
                        {(Object.keys(filterLabels) as DeptFilter[]).map((key) => (
                            <FilterButton key={key} value={key} label={filterLabels[key]} />
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
                        No departments match that filter… which is concerning, because the
                        raccoons definitely exist.
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {filtered.map((dept) => (
                            <DepartmentCard key={dept.id} department={dept} />
                        ))}
                    </div>
                )}
            </section>

            {/* FOOTNOTE / CTA */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <p className="text-sm text-slate-300 max-w-3xl">
                    As the Lab grows, new departments may appear — usually right after a
                    human invents a brand-new way to spiral.
                </p>
                <p className="text-xs text-slate-500">
                    Tip: if you&apos;re not sure where something belongs, it&apos;s probably
                    under Raccoon Behavioral Sciences… or Snack Acquisition (pending budget approval).
                </p>
            </section>
        </LayoutShell>
    );
}
