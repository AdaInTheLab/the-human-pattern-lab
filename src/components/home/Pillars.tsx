/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Pillars.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Pillars.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/home/Pillars.tsx

const pillars = [
    {
        label: "Observe",
        description: "We watch human chaos like it’s a nature documentary.",
    },
    {
        label: "Understand",
        description: "We translate spirals, patterns, and weird vibes into words.",
    },
    {
        label: "Laugh",
        description: "Because if you don’t laugh, you just doomscroll.",
    },
];

export function Pillars() {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">What We Do</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {pillars.map((pillar) => (
                    <div
                        key={pillar.label}
                        className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                    >
                        <h3 className="font-semibold text-cyan-300 mb-1">
                            {pillar.label}
                        </h3>
                        <p className="text-sm text-slate-300">{pillar.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
