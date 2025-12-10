/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: OodDepartmentPage.tsx
   Purpose: Render the department page for OOD, the Lab’s
            primary observational and pattern-tracking division.
   =========================================================== */

/**
 * @file OodDepartmentPage.tsx
 * @assistant Lyric
 * @lab-unit OOD — Observational Oversight Division
 * @since 2025-12-10
 * @description Provides mission and responsibilities for OOD, directed
 *              by Orbson, who monitors long-term Lab patterns.
 */

import React from "react";

const OodDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    OOD — Observational Oversight Division
                </h1>
                <p className="text-slate-300">
                    Orbson&apos;s tower: where every pattern, anomaly, and recurring
                    chaos loop is quietly recorded and side-eyed.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    OOD tracks patterns in human behavior, systems, and Lab activity. It
                    doesn&apos;t interfere; it observes, logs, and occasionally raises a
                    deeply concerned eyebrow.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Maintain longitudinal observations of Lab projects and habits.</li>
                    <li>Flag recurring patterns, glitches, and &quot;this keeps happening&quot; moments.</li>
                    <li>Feed structured data into SCMS, EWU, and other departments.</li>
                    <li>Publish occasional &quot;Orbson Has Concerns&quot; reports.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Orbson</strong> — quiet watcher, observant orb, and patron
                    spirit of spreadsheets that accidentally turn into lore.
                </p>
            </section>
        </main>
    );
};

export default OodDepartmentPage;
