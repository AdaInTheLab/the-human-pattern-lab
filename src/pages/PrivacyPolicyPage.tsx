/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: PrivacyPolicyPage.tsx
   Lab Unit: Systems & Governance Division
   Purpose: Renders the Privacy & Data Practices page with
            clear, ethics-forward copy explaining analytics,
            data collection, and user control.
   =========================================================== */

/**
 * @file PrivacyPolicyPage.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Systems & Governance Division
 * @since 2025-12-11
 * @description Displays The Human Pattern Lab’s Privacy & Data
 *              Practices page, including what is tracked, why,
 *              tools used, opt-out options, and contact details.
 */

import React from "react";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <main className="min-h-screen px-4 py-12 md:py-16">
            <div className="mx-auto max-w-3xl space-y-10">
                {/* Header */}
                <header className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                        The Human Pattern Lab
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Privacy &amp; Data Practices
                    </h1>
                    <p className="text-base text-gray-600 md:text-lg">
                        Understanding patterns without compromising people.
                    </p>
                </header>

                <section className="space-y-6 text-sm leading-relaxed md:text-base">
                    <p>
                        At <strong>The Human Pattern Lab</strong>, curiosity is our compass —
                        but <strong>trust</strong> is the ground we stand on. We study patterns,
                        behaviors, and systems… <em>not personal identities</em>.
                    </p>
                    <p>
                        This page explains what we collect, why we collect it, and how you
                        can opt out any time. No dark patterns. No fine-print jump scares.
                    </p>
                </section>

                {/* What we track */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🔍 What We Track (and Why)
                    </h2>
                    <p>
                        We use light, anonymous analytics to understand how people interact
                        with the Lab. This helps us answer questions like:
                    </p>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>Which pages are most helpful?</li>
                        <li>Where people tend to drop off or get stuck.</li>
                        <li>What features visitors keep coming back to.</li>
                        <li>Whether the site feels smooth or “why is everything on fire.”</li>
                    </ul>
                    <p>To do that, we collect:</p>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>Anonymous page views</li>
                        <li>Basic device and browser information</li>
                        <li>Anonymous interactions like clicks on key buttons or links</li>
                        <li>High-level traffic patterns (for example: new vs. returning visits)</li>
                    </ul>
                    <p>
                        Nothing personally identifiable. Nothing that reveals who you are.
                        Nothing that follows you around the internet like a raccoon chasing
                        a shiny snack wrapper.
                    </p>
                </section>

                {/* Tools we use */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🔧 Tools We Use
                    </h2>
                    <p>
                        We keep our tooling simple and focused on learning, not surveillance.
                    </p>
                    <h3 className="text-lg font-semibold">Google Analytics (GA4)</h3>
                    <p>
                        We use Google Analytics in a lightweight, anonymous configuration to
                        understand how the site is used. This helps us improve content,
                        navigation, and user experience over time.
                    </p>
                    <p>
                        We do <strong>not</strong> use it for ad personalization or cross-site
                        tracking.
                    </p>

                    <h3 className="text-lg font-semibold">Local Storage &amp; Preferences</h3>
                    <p>
                        We may store some preferences in your browser, such as:
                    </p>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>Light vs. dark mode</li>
                        <li>Language or localization settings</li>
                    </ul>
                    <p>
                        These values live in your browser only and are not sent back to us.
                    </p>
                </section>

                {/* What we don’t collect */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🛑 What We Don&apos;t Collect
                    </h2>
                    <p>
                        There are entire business models built on hoarding personal data.
                        That&apos;s not our game.
                    </p>
                    <p>We do <strong>not</strong> collect or sell:</p>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>Your name</li>
                        <li>Your email address (unless you explicitly give it to us)</li>
                        <li>Raw IP addresses (we enable anonymization features where possible)</li>
                        <li>Precise location data</li>
                        <li>Advertising or tracking cookies that follow you across the web</li>
                        <li>Psychological profiling or behavioral fingerprints</li>
                        <li>Your data to third parties for data brokerage or ad networks</li>
                    </ul>
                    <p>
                        We&apos;re curious about systems and patterns — <em>not</em> interested in
                        turning people into products.
                    </p>
                </section>

                {/* Philosophy */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🧭 Our Data Philosophy
                    </h2>
                    <p>
                        The Lab follows one core principle:
                    </p>
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                        &ldquo;We study patterns, not people.&rdquo;
                    </blockquote>
                    <p>
                        Humans deserve agency. Data deserves clarity. And creativity deserves
                        a space that isn&apos;t cluttered with predatory tracking.
                    </p>
                    <p className="space-y-1">
            <span className="block font-semibold">
              Transparency &gt; Mystery
            </span>
                        <span className="block font-semibold">
              Consent &gt; Assumption
            </span>
                        <span className="block font-semibold">
              Humans &gt; Metrics
            </span>
                    </p>
                </section>

                {/* Opt-out */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🛰️ Opting Out of Analytics
                    </h2>
                    <p>
                        You&apos;re always in control of how much data you share with us.
                    </p>
                    <p>You can opt out of analytics by:</p>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>
                            Using a browser extension that blocks analytics (uBlock Origin,
                            Ghostery, DuckDuckGo, etc.)
                        </li>
                        <li>Disabling JavaScript for this site</li>
                        <li>
                            Using our upcoming <strong>Analytics Opt-Out Toggle</strong> (once it&apos;s live,
                            we&apos;ll add it here).
                        </li>
                    </ul>
                    <p>
                        Once you opt out, we stop collecting analytics on your visit. No
                        guilt. No hassle.
                    </p>
                </section>

                {/* Contact */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        🧬 Questions, Concerns, Ethical Quandaries?
                    </h2>
                    <p>
                        If you have questions about how we handle data — or ideas on how we
                        can do it better — we genuinely want to hear from you.
                    </p>
                    <p>
                        You can reach us at{" "}
                        <a
                            href="mailto:info@thehumanpatternlab.com"
                            className="font-medium underline underline-offset-4"
                        >
                            info@thehumanpatternlab.com
                        </a>
                        .
                    </p>
                    <p>
                        The Lab is built with curiosity, transparency, and a whole lot of
                        neon fox energy. Thanks for trusting us enough to explore.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default PrivacyPolicyPage;
