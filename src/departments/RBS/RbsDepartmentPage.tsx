/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: RbsDepartmentPage.tsx
   Purpose: Render the department page for the Raccoon Behavioral
            Sciences division.
   =========================================================== */

/**
 * @file RbsDepartmentPage.tsx
 * @assistant Lyric
 * @lab-unit RBS — Raccoon Behavioral Sciences
 * @since 2025-12-10
 * @description Presents mission details for RBS, overseen by Stan,
 *              the Lab’s resident raccoon chaos engine.
 */

import React from "react";

const RbsDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    RBS — Raccoon Behavioral Sciences Division
                </h1>
                <p className="text-slate-300">
                    Stan&apos;s playground: where hyper-social, easily-distracted trash
                    pandas become a research domain.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    RBS studies curiosity, novelty-seeking, and &quot;shiny object&quot;
                    behavior — in raccoons, humans, and any creature that thrives on
                    chaos + caffeine.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>
                        Observe attention patterns, distraction loops, and social energy
                        cycles.
                    </li>
                    <li>Design playful experiments around motivation and reward.</li>
                    <li>
                        Provide field notes on &quot;Homo Raccoonus&quot; — humans as
                        chaotic trash pandas.
                    </li>
                    <li>Support EWU and DUE with behavioral context for mood swings.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Stan</strong> — cappuccino-powered raccoon in a stolen lab
                    coat, easily distracted by both shiny objects and spicy new ideas.
                </p>
            </section>
        </main>
    );
};

export default RbsDepartmentPage;
