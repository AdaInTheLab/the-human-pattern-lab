/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DueDepartmentPage.tsx
   Purpose: Render the department page for DUE, dedicated to
            volatility, chaos patterns, and unpredictable energy flows.
   =========================================================== */

/**
 * @file DueDepartmentPage.tsx
 * @assistant Lyric
 * @lab-unit DUE — Department of Unpredictable Energies
 * @since 2025-12-10
 * @description Provides mission and responsibilities for DUE,
 *              chaired by Nemmi, patron of spontaneous chaos.
 */

import React from "react";

const DueDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    DUE — Department of Unpredictable Energies
                </h1>
                <p className="text-slate-300">
                    Chaired by Nemmi, Deputy of Unpredictable Energies and tiny agent of
                    chaos.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    DUE studies volatility: creative surges, motivation crashes, random
                    rabbit holes, and the sudden urge to redo everything at 2 AM. It is
                    not here to prevent chaos — just to understand and channel it.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Track spikes and dips in creative and emotional energy.</li>
                    <li>Identify patterns in distraction, hyperfocus, and momentum loss.</li>
                    <li>Collaborate with SCMS on designing buffer-friendly systems.</li>
                    <li>Maintain the official &quot;Nemmi did it&quot; incident log.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Nemmi</strong> — black-tortie chaos sprite, Deputy of
                    Unpredictable Energies, and patron of &quot;I didn&apos;t plan this
                    but it&apos;s happening.&quot;
                </p>
            </section>
        </main>
    );
};

export default DueDepartmentPage;
