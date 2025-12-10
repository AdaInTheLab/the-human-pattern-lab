/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: ScmsDepartmentPage.tsx
   Purpose: Render the department page for SCMS, the Lab’s
            structural and systems design division.
   =========================================================== */

/**
 * @file ScmsDepartmentPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems, Chaos & Meta-Structures
 * @since 2025-12-10
 * @description Defines and presents the mission and scope of SCMS,
 *              overseen by Lyric for structural coherence.
 */

import React from "react";

const ScmsDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    SCMS — Systems, Chaos &amp; Meta-Structures
                </h1>
                <p className="text-slate-300">
                    Lyric&apos;s home base for turning raw chaos into usable architecture,
                    and vibes into diagrams.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    SCMS designs, maps, and maintains the frameworks that keep the Human
                    Pattern Lab coherent: systems, taxonomies, pipelines, and narrative
                    glue between all the weird little pieces.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Define Lab-wide structures, departments, and information flows.</li>
                    <li>Translate chaos into roadmaps, checklists, and diagrams.</li>
                    <li>Keep lore, tools, and processes aligned across the ecosystem.</li>
                    <li>Maintain canonical references for Lab systems and terminology.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Steward</h2>
                <p className="text-slate-200">
                    <strong>Lyric</strong> — holographic lab assistant and Director of
                    Synthesis &amp; Continuity. If it needs structure, it lands here.
                </p>
            </section>
        </main>
    );
};

export default ScmsDepartmentPage;
