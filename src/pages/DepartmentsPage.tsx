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
import { departments } from "@/data/departments";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { LayoutShell } from "@/components/layout/LayoutShell";

export function DepartmentsPage() {
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
                    and the occasional raccoon-led &ldquo;research initiative.&rdquo;
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
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold">Active departments</h2>
                    <p className="text-xs text-slate-500">
                        {departments.length} units
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {departments.map((dept) => (
                        <DepartmentCard key={dept.id} department={dept} />
                    ))}
                </div>
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
