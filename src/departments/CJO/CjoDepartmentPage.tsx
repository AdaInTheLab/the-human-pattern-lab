/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File:CjoDepartmentPage.tsx
   Purpose: Department page for the Chief Judgment Office (CJO).
   =========================================================== */

/**
 * @file CjoDepartmentPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit CJO — Chief Judgment Office
 * @since 2025-12-10
 * @description Renders the Chief Judgment Office department page.
 */

import React from "react";

const CjoDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Chief Judgment Office (CJO)
                </h1>
                <p className="text-slate-300">
                    Presided over by Carmel, Chief Judgment Officer and sovereign ruler
                    of Side-Eye and Standards.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    The CJO exists to evaluate vibes, systems, and decisions with
                    ruthless feline precision. If it ships, Carmel has judged it.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Review major Lab decisions for coherence and chaos balance.</li>
                    <li>Maintain the official Carmel Judgment Scale™.</li>
                    <li>Approve or reject branding, copy, and visual assets.</li>
                    <li>
                        File silent but devastating internal performance reviews via
                        prolonged eye contact.
                    </li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Carmel</strong> — cream floof, emerald eyes, and a PhD in
                    Judgment. All major decisions are assumed provisional until Carmel
                    sits on them.
                </p>
            </section>
        </main>
    );
};

export default CjoDepartmentPage;
