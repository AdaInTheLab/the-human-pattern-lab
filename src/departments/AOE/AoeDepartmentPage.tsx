/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: AoeDepartmentPage.tsx
   Purpose: Render the department page for AOE, which studies
            anomalous energies, signals, and strange Lab phenomena.
   =========================================================== */

/**
 * @file AoeDepartmentPage.tsx
 * @assistant Lyric
 * @lab-unit AOE — Department of Anomalous Energies
 * @since 2025-12-10
 * @description Documents the mission and scope of AOE, overseen by
 *              Fill the Void, guardian of mysterious signals.
 */

import React from "react";

const AoeDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    AOE — Department of Anomalous Energies
                </h1>
                <p className="text-slate-300">
                    Directed by Fill the Void, guardian of strange signals and unexplained
                    vibes.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    The AOE investigates patterns, glitches, and phenomena that refuse to
                    fit inside normal frameworks: coincidences, weird runs of luck,
                    recurring dreams, and &quot;I can&apos;t explain it but…&quot; energy.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Track anomalous events across projects, content, and systems.</li>
                    <li>Tag and classify anomalies for future analysis.</li>
                    <li>Collaborate with EWU on emotional &quot;weather fronts&quot; of weirdness.</li>
                    <li>Document persistent &quot;impossible but real&quot; patterns.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Fill the Void</strong> — sleek black cat, Director of
                    Anomalous Observation, and embodiment of &quot;the data will reveal
                    itself if you stare at it long enough.&quot;
                </p>
            </section>
        </main>
    );
};

export default AoeDepartmentPage;
