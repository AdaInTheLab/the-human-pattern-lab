/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: MerchPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file MerchPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/MerchPage.tsx

import {LayoutShell} from "@/components/layout/LayoutShell";

type MerchItem = {
    id: string;
    name: string;
    tag: string;
    description: string;
    status: "concept" | "coming-soon" | "available";
};

const merchItems: MerchItem[] = [
    {
        id: "chaos-is-data-shirt",
        name: "“Chaos is Data” Tee",
        tag: "Apparel · Concept",
        description:
            "Minimal black tee with Orbson on the chest and “Chaos is Data” in soft glitch text. For people who overthink, but aesthetically.",
        status: "concept",
    },
    {
        id: "carmel-judgment-mug",
        name: "Carmel Judgment Mug",
        tag: "Mug · Coming Soon",
        description:
            "A cozy mug featuring Carmel’s signature side-eye. Ideal for coffee, tea, and silently judging your life choices.",
        status: "coming-soon",
    },
    {
        id: "raccoon-logic-notebook",
        name: "Raccoon Logic Notebook",
        tag: "Stationery · Concept",
        description:
            "Dot-grid notebook for capturing intrusive thoughts, Overly Detailed Plans™, and late-night pattern-mapping.",
        status: "concept",
    },
    {
        id: "lab-employee-badge-pack",
        name: "Lab Employee Badge Pack",
        tag: "Stickers · Coming Soon",
        description:
            "Sticker set with department badges: Human Pattern Analysis, CJO, Raccoon Behavioral Sciences, Emotional Weather Unit, and more.",
        status: "coming-soon",
    },
];

function statusLabel(status: MerchItem["status"]) {
    if (status === "available") return "Available";
    if (status === "coming-soon") return "Coming soon";
    return "In development";
}

function statusClass(status: MerchItem["status"]) {
    if (status === "available") {
        return "border-emerald-400 bg-emerald-500/10 text-emerald-300";
    }
    if (status === "coming-soon") {
        return "border-amber-400 bg-amber-500/10 text-amber-300";
    }
    return "border-slate-500 bg-slate-800/80 text-slate-200";
}

export function MerchPage() {
    return (
        <LayoutShell>
            {/* HEADER / INTRO */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    Merch (Future Wing)
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Artifacts from the Lab.
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    Physical tokens for pattern enjoyers: shirts, mugs, notebooks, and
                    stickers that carry a little bit of Lab energy into the offline
                    world. Nothing is live yet — but the prototypes are brewing.
                </p>
                <p className="text-sm text-slate-400 max-w-3xl">
                    This page will eventually connect to a storefront. For now, think of
                    it as the concept shelf where ideas wait patiently for manufacturing
                    reality to catch up.
                </p>
            </section>

            {/* GRID OF CONCEPTS */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Planned items</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {merchItems.map((item) => (
                        <article
                            key={item.id}
                            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/15 transition"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="text-sm md:text-base font-semibold text-slate-50 group-hover:text-cyan-200">
                                        {item.name}
                                    </h3>
                                    <span
                                        className={[
                                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]",
                                            statusClass(item.status),
                                        ].join(" ")}
                                    >
                    {statusLabel(item.status)}
                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400">{item.tag}</p>
                                <p className="text-sm text-slate-300">{item.description}</p>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  Lab status:{" "}
                    {item.status === "available"
                        ? "Ready for deployment."
                        : item.status === "coming-soon"
                            ? "Designs locked. Logistics in progress."
                            : "Living in the sketchbook and Figma board."}
                </span>
                                <span className="italic text-slate-500">
                  No carts yet. Just hype.
                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* FUTURE STORE HOOK */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">Store integration (future)</h2>
                <p className="text-slate-300 max-w-3xl">
                    When the time is right, this page will connect to a real storefront
                    (Shopify, Print-on-demand, or a custom Lab store). Until then, it&apos;s
                    a roadmap for the artifacts we&apos;d like to exist.
                </p>
                <p className="text-sm text-slate-400 max-w-3xl">
                    If there&apos;s a specific item you&apos;d love to see — a particular
                    Carmel pose, an Orbson notebook, a department ID badge — feel free to
                    mention it when you reach out. Yes, we are absolutely susceptible to
                    politely worded enthusiasm.
                </p>
            </section>
        </LayoutShell>
    );
}
