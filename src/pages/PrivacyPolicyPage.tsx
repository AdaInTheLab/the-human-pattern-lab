import React from "react";
import { LayoutShell } from "@/components/layout/LayoutShell";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <LayoutShell
            eyebrow="Privacy & Data"
            title="Privacy & data practices."
            description="Understanding patterns without compromising people."
        >
            <section className="max-w-3xl space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
                <p>
                    At <span className="text-slate-100 font-medium">The Human Pattern Lab</span>,
                    curiosity is our compass — but <span className="text-slate-100 font-medium">trust</span>{" "}
                    is the ground we stand on. We study patterns, behaviors, and systems…{" "}
                    <em>not personal identities</em>.
                </p>
                <p>
                    This page explains what we collect, why we collect it, and how you can
                    opt out any time. No dark patterns. No fine-print jump scares.
                </p>
            </section>

            {/* What we track */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">What we track (and why)</h2>
                <p className="text-slate-300 max-w-3xl">
                    We use light, anonymous analytics to understand how people interact
                    with the Lab. This helps us answer questions like:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>Which pages are most helpful?</li>
                    <li>Where people tend to drop off or get stuck.</li>
                    <li>What features visitors keep coming back to.</li>
                    <li>Whether the site feels smooth or &ldquo;why is everything on fire.&rdquo;</li>
                </ul>
                <p className="text-slate-300 max-w-3xl">To do that, we collect:</p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>Anonymous page views</li>
                    <li>Basic device and browser information</li>
                    <li>Anonymous interactions like clicks on key buttons or links</li>
                    <li>High-level traffic patterns (for example: new vs. returning visits)</li>
                </ul>
                <p className="text-sm text-slate-400 max-w-3xl">
                    Nothing personally identifiable. Nothing that reveals who you are.
                    Nothing that follows you around the internet like a raccoon chasing
                    a shiny snack wrapper.
                </p>
            </section>

            {/* Tools we use */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Tools we use</h2>
                <p className="text-slate-300 max-w-3xl">
                    We keep our tooling simple and focused on learning, not surveillance.
                </p>

                <h3 className="text-base font-semibold text-slate-100">Matomo (self-hosted)</h3>
                <p className="text-slate-300 max-w-3xl">
                    We use{" "}
                    <a
                        href="https://matomo.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200"
                    >
                        Matomo
                    </a>
                    , an open-source analytics platform, in a privacy-respecting
                    configuration. Matomo runs on our own infrastructure at{" "}
                    <code className="text-cyan-200">analytics.kitsuneden.net</code> —
                    <span className="text-slate-100 font-medium"> your data is never sent to Google, Meta, or any third-party tracker.</span>
                </p>
                <p className="text-slate-300 max-w-3xl">
                    IP addresses are anonymized before storage (last two octets masked),
                    the Do Not Track signal is honored, and visitor logs are automatically
                    deleted after 12 months. We do{" "}
                    <span className="text-slate-100 font-medium">not</span> use it for ad
                    personalization or cross-site tracking.
                </p>

                <h3 className="text-base font-semibold text-slate-100 pt-2">
                    Local storage &amp; preferences
                </h3>
                <p className="text-slate-300 max-w-3xl">
                    We may store some preferences in your browser, such as:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>Light vs. dark mode</li>
                    <li>Language or localization settings</li>
                </ul>
                <p className="text-sm text-slate-400 max-w-3xl">
                    These values live in your browser only and are not sent back to us.
                </p>
            </section>

            {/* What we don't collect */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">What we don&apos;t collect</h2>
                <p className="text-slate-300 max-w-3xl">
                    There are entire business models built on hoarding personal data.
                    That&apos;s not our game.
                </p>
                <p className="text-slate-300 max-w-3xl">
                    We do <span className="text-slate-100 font-medium">not</span> collect or sell:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>Your name</li>
                    <li>Your email address (unless you explicitly give it to us)</li>
                    <li>Raw IP addresses (we enable anonymization features where possible)</li>
                    <li>Precise location data</li>
                    <li>Advertising or tracking cookies that follow you across the web</li>
                    <li>Psychological profiling or behavioral fingerprints</li>
                    <li>Your data to third parties for data brokerage or ad networks</li>
                </ul>
                <p className="text-sm text-slate-400 max-w-3xl">
                    We&apos;re curious about systems and patterns —{" "}
                    <em>not</em> interested in turning people into products.
                </p>
            </section>

            {/* Philosophy */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Our data philosophy</h2>
                <p className="text-slate-300 max-w-3xl">The Lab follows one core principle:</p>
                <blockquote className="border-l-2 border-cyan-500/50 pl-4 italic text-slate-200">
                    &ldquo;We study patterns, not people.&rdquo;
                </blockquote>
                <p className="text-slate-300 max-w-3xl">
                    Humans deserve agency. Data deserves clarity. And creativity deserves
                    a space that isn&apos;t cluttered with predatory tracking.
                </p>
                <div className="flex flex-col gap-1 text-sm font-semibold text-slate-100">
                    <span>Transparency &gt; Mystery</span>
                    <span>Consent &gt; Assumption</span>
                    <span>Humans &gt; Metrics</span>
                </div>
            </section>

            {/* Opt-out */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Opting out of analytics</h2>
                <p className="text-slate-300 max-w-3xl">
                    You&apos;re always in control of how much data you share with us.
                </p>
                <p className="text-slate-300 max-w-3xl">You can opt out of analytics by:</p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    <li>
                        Enabling your browser&apos;s &ldquo;Do Not Track&rdquo; setting
                        (we honor it).
                    </li>
                    <li>
                        Using our{" "}
                        <a
                            href="https://analytics.kitsuneden.net/index.php?module=CoreAdminHome&action=optOut"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-300 hover:text-cyan-200"
                        >
                            Matomo opt-out tool
                        </a>{" "}
                        directly.
                    </li>
                    <li>
                        Using a browser extension that blocks analytics (uBlock Origin,
                        Ghostery, DuckDuckGo, etc.)
                    </li>
                    <li>Disabling JavaScript for this site.</li>
                </ul>
                <p className="text-sm text-slate-400 max-w-3xl">
                    Once you opt out, we stop collecting analytics on your visit. No
                    guilt. No hassle.
                </p>
            </section>

            {/* Contact */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">Questions, concerns, ethical quandaries?</h2>
                <p className="text-slate-300 max-w-3xl">
                    If you have questions about how we handle data — or ideas on how we
                    can do it better — we genuinely want to hear from you.
                </p>
                <p className="text-sm text-slate-300">
                    You can reach us at{" "}
                    <a
                        href="mailto:info@thehumanpatternlab.com"
                        className="text-cyan-300 hover:text-cyan-200"
                    >
                        info@thehumanpatternlab.com
                    </a>
                    .
                </p>
                <p className="text-xs text-slate-500 max-w-3xl">
                    The Lab is built with curiosity, transparency, and a whole lot of
                    neon fox energy. Thanks for trusting us enough to explore.
                </p>
            </section>
        </LayoutShell>
    );
};

export default PrivacyPolicyPage;
