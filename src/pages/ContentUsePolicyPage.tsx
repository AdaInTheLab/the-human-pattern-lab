/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: ContentUsePolicyPage.tsx
   Purpose: Render the public-facing Content Use Policy for
            The Human Pattern Lab, outlining permissions,
            restrictions, AI training allowances, and ethical
            usage expectations for all Lab-generated content.
   =========================================================== */

/**
 * @file ContentUsePolicyPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @since 2025-12-10
 * @description This component renders the Content Use Policy page,
 *              providing users and organizations with clear guidance
 *              on how Lab content may be used, shared, reproduced,
 *              or incorporated into projects, including the Lab’s
 *              whitelist rules for AI training and derivative works.
 */

// src/pages/ContentUsePolicyPage.tsx

import {LayoutShell} from "@/components/layout/LayoutShell";

export function ContentUsePolicyPage() {
    return (
        <LayoutShell>
            {/* HEADER */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    Content Use Policy
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    How Lab content can be used.
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    This page explains how you can use, share, and reference content from
                    The Human Pattern Lab, including videos, articles, artwork, and
                    mascots. The short version: we&apos;re happy to be part of your work —
                    as long as it&apos;s transparent, ethical, and not gross.
                </p>
            </section>

            {/* PHILOSOPHY */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Our philosophy</h2>
                <p className="text-slate-300 max-w-3xl">
                    We create content to help humans understand patterns — in themselves,
                    in systems, and in technology. We&apos;re okay with our work being
                    re-used when it preserves that spirit: educational, respectful, and
                    not exploitative. We are not okay with uses that distort the message,
                    hide attribution, or feed into harmful systems.
                </p>
                <p className="text-sm text-slate-400 max-w-3xl">
                    This policy is designed to be clear for humans first and lawyers
                    second. If you&apos;re unsure whether your use is okay, ask. We&apos;d
                    rather have a conversation than a conflict.
                </p>
            </section>

            {/* SCOPE */}
            <section className="space-y-3">
                <h2 className="text-xl font-semibold">What this covers</h2>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>Long-form videos and shorts from The Human Pattern Lab.</li>
                    <li>Lab Notes, essays, and written articles.</li>
                    <li>Visual branding elements: logos, Lab mascots, overlays.</li>
                    <li>Titles, descriptions, and unique frameworks or terminology.</li>
                </ul>
            </section>

            {/* WHITELIST */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Whitelist: generally allowed</h2>
                <p className="text-slate-300 max-w-3xl">
                    These uses are generally allowed as long as you include clear
                    attribution and don&apos;t misrepresent the Lab&apos;s views:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>
                        Quoting or referencing Lab Notes or videos in educational content,
                        talks, or essays.
                    </li>
                    <li>
                        Sharing clips or screenshots from videos with credit to the channel.
                    </li>
                    <li>
                        Using our frameworks or language in your own analysis, with
                        attribution.
                    </li>
                    <li>
                        Non-commercial educational use in classrooms, study groups, or
                        workshops.
                    </li>
                </ul>
                <p className="text-xs text-slate-400 max-w-3xl">
                    If your use is non-commercial, educational, and properly credited,
                    you&apos;re probably in the clear.
                </p>
            </section>

            {/* CONDITIONAL USE */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Conditional use</h2>
                <p className="text-slate-300 max-w-3xl">
                    These uses may be allowed, but only with explicit permission and clear
                    terms. Please contact us before proceeding:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>
                        Training proprietary AI models directly on Lab content (videos,
                        transcripts, articles, or artwork).
                    </li>
                    <li>
                        Commercial products that prominently feature Lab branding or
                        mascots.
                    </li>
                    <li>
                        Publishing derivative works that heavily adapt Lab lore, characters,
                        or frameworks.
                    </li>
                    <li>
                        Including large portions of Lab content in books, courses, or paid
                        memberships.
                    </li>
                </ul>
                <p className="text-sm text-slate-400 max-w-3xl">
                    We reserve the right to say no, limit usage, or set specific
                    conditions — especially for AI training, commercial use, or anything
                    that could confuse people about what is &quot;official&quot; Lab
                    content.
                </p>
            </section>

            {/* DENY LIST */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Deny list: not allowed</h2>
                <p className="text-slate-300 max-w-3xl">
                    The following uses of Lab content are not permitted:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>
                        Using Lab content to promote hate, harassment, discrimination, or
                        extremist ideology.
                    </li>
                    <li>
                        Republishing Lab content as if it were your own work (no credit,
                        rebranding, or impersonation).
                    </li>
                    <li>
                        Training or fine-tuning AI models on Lab content without explicit,
                        written permission.
                    </li>
                    <li>
                        Selling access to Lab content without clear added value or
                        transformation.
                    </li>
                    <li>
                        Using mascots or branding in a way that implies official endorsement
                        when there is none.
                    </li>
                </ul>
            </section>

            {/* ATTRIBUTION */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Attribution</h2>
                <p className="text-slate-300 max-w-3xl">
                    If you reference, quote, or remix Lab content, please include:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>
                        The name:{" "}
                        <span className="text-slate-100 font-medium">
              The Human Pattern Lab
            </span>
                    </li>
                    <li>
                        A link to the original source (video, article, or page) when
                        possible.
                    </li>
                    <li>
                        A clear indication of what&apos;s your commentary vs. original Lab
                        material.
                    </li>
                </ul>
                <p className="text-xs text-slate-400 max-w-3xl">
                    Example: “Inspired by The Human Pattern Lab’s ‘Chaos is Data’
                    framework” with a link to the relevant page or video.
                </p>
            </section>

            {/* CONTACT */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">Questions or requests</h2>
                <p className="text-slate-300 max-w-3xl">
                    If you&apos;re planning something that doesn&apos;t fit neatly into
                    these categories — especially AI training, large-scale commercial use,
                    or anything that feels ethically complicated — please reach out.
                </p>
                <p className="text-sm text-slate-300">
                    Contact:{"Ada Vale"} Ada Vale
                    <a
                        href="mailto:info@thehumanpatternlab.com"
                        className="text-cyan-300 hover:text-cyan-200"
                    >
                        info@thehumanpatternlab.com
                    </a>
                </p>
                <p className="text-xs text-slate-500">
                    Carmel reviews the emails with snacks. Orbson reviews them with charts.
                </p>
            </section>
        </LayoutShell>
    );
}
