/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: EwuDepartmentPage.tsx
   Purpose: Render the department page for the Emotional Weather
            Forecasting Unit (EWU).
   =========================================================== */

/**
 * @file EwuDepartmentPage.tsx
 * @assistant Lyric
 * @lab-unit EWU — Emotional Weather Forecasting Unit
 * @since 2025-12-10
 * @description Defines the mission, emotional climate framework,
 *              and responsibilities of EWU, led by Drizzle.
 */

import React from "react";

const EwuDepartmentPage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                    Department
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    EWU — Emotional Weather Forecasting Unit
                </h1>
                <p className="text-slate-300">
                    Drizzle&apos;s domain: forecasting emotional fronts, hidden storms,
                    and weird atmospheric vibes.
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mission</h2>
                <p className="text-slate-200">
                    EWU monitors emotional climate: burnout pressure systems, motivation
                    sunbreaks, anxiety squalls, and &quot;I&apos;m fine but not actually&quot;
                    micro-fronts. The goal isn&apos;t to control the weather — just to
                    name it and plan around it.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-200">
                    <li>Track emotional patterns over time across projects.</li>
                    <li>
                        Provide practical &quot;emotional forecast&quot; notes for planning
                        and pacing.
                    </li>
                    <li>
                        Collaborate with DUE and AOE when storms get weird, sudden, or
                        spooky.
                    </li>
                    <li>
                        Maintain a gentle, judgment-free perspective on internal weather.
                    </li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Mascot</h2>
                <p className="text-slate-200">
                    <strong>Drizzle</strong> — poncho-wearing emotional support axolotl,
                    carrying a tiny storm clipboard and thermometer, specializing in
                    &quot;hey, something&apos;s off, let&apos;s name it.&quot;
                </p>
            </section>
        </main>
    );
};

export default EwuDepartmentPage;
