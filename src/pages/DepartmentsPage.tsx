/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DepartmentsPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file DepartmentsPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/DepartmentsPage.tsx
import { departments } from "../data/departments";
import { DepartmentCard } from "../components/departments/DepartmentCard";
import {LayoutShell} from "@/components/layout/LayoutShell";

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
                    Every department in the Lab focuses on a different flavor of chaos:
                    human patterns, emotional weather, AI questions, raccoon logic, and
                    snack-based morale research. Together, they make sense of the mess.
                </p>
            </section>

            {/* GRID */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Active departments</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {departments.map((dept) => (
                        <DepartmentCard key={dept.id} department={dept} />
                    ))}
                </div>
            </section>

            {/* FOOTNOTE / CTA */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <p className="text-sm text-slate-300 max-w-3xl">
                    As the Lab grows, new departments may appear — especially if humans
                    invent fresh ways to spiral. For now, these are the core units keeping
                    an eye on the noise.
                </p>
                <p className="text-xs text-slate-500">
                    Tip: if you&apos;re not sure where something belongs, it&apos;s
                    probably under Raccoon Behavioral Sciences or Snack Acquisition.
                </p>
            </section>
        </LayoutShell>
    );
}
