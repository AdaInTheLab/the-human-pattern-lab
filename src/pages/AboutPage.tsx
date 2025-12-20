/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: AboutPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file AboutPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/AboutPage.tsx
import { Link } from "react-router-dom";
import {LayoutShell} from "@/components/layout/LayoutShell";

const philosophyItems = [
    {
        title: "Chaos is a language",
        body: "We treat mess, spirals, and weirdness as signals — not failures.",
    },
    {
        title: "Curiosity over certainty",
        body: "We ask better questions instead of pretending to have final answers.",
    },
    {
        title: "Humor as survival tech",
        body: "If you can’t laugh at the pattern, you’re probably still stuck in it.",
    },
    {
        title: "Creatures make it better",
        body: "Mascots, raccoons, and cats make complex ideas less intimidating.",
    },
    {
        title: "AI as a mirror",
        body: "AI doesn’t replace humans — it reflects our patterns back at us.",
    },
    {
        title: "Soft edges, sharp ideas",
        body: "We keep the tone gentle and the thinking rigorous.",
    },
];

const founders = [
    {
        id: "founder-human",
        name: "Lead Human Pattern Analyst",
        title: "Founder · Narrative & Systems",
        blurb:
            "Designs frameworks, stories, and experiments that make human behavior feel a little less chaotic and a lot more understandable.",
        tag: "Human",
    },
    {
        id: "orbson",
        name: "Orbson",
        title: "Director of Observational Oversight",
        blurb:
            "Floating eye, full-time watcher of patterns. Specializes in emotional trajectories, decision loops, and ‘oh no not this again’ moments.",
        tag: "Observation",
    },
    {
        id: "carmel",
        name: "Carmel",
        title: "Chief Judgment Officer (CJO)",
        blurb:
            "Applies advanced feline judgment models to human decisions. Silent meows, loud opinions, impeccable side-eye accuracy.",
        tag: "Judgment",
    },
    {
        id: "mcchonk",
        name: "Professor McChonk",
        title: "Morale & Snack Research",
        blurb:
            "Oversees snack distribution, break timing, and general vibe stability. Believes all good breakthroughs begin with a snack.",
        tag: "Morale",
    },
];

export function AboutPage() {
    return (
        <LayoutShell>
            {/* HERO / INTRO */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    About the Lab
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Where chaos becomes data.
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    The Human Pattern Lab is a small, slightly unhinged research space at
                    the edge of chaos. We study humans, AI, creatures, and the strange
                    patterns that emerge when all three collide — and we explain it in a
                    way that feels more like a conversation than a textbook.
                </p>
            </section>

            {/* MISSION */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="text-slate-300 max-w-3xl">
                    To observe human behavior with kindness, curiosity, and a little bit
                    of side-eye — then turn that chaos into stories, frameworks, and
                    experiments that help people understand themselves (and each other)
                    without losing their sense of humor.
                </p>
            </section>

            {/* PHILOSOPHY GRID */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Philosophy</h2>
                <p className="text-slate-300 max-w-3xl">
                    Think{" "}
                    <span className="text-cyan-300">science-adjacent explainer</span>,{" "}
                    <span className="text-violet-300">creature-coded mascots</span>, and{" "}
                    <span className="text-emerald-300">cosmic shower thoughts</span>{" "}
                    stitched together into something actually useful.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                    {philosophyItems.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                        >
                            <h3 className="text-sm font-semibold text-cyan-300 mb-1">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-300">{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* WHERE SCIENCE MEETS CREATURES */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Where science meets creatures</h2>
                <div className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
                    <p className="text-slate-300 leading-relaxed">
                        The Lab sits at the intersection of{" "}
                        <span className="text-cyan-300">explanatory science</span>,{" "}
                        <span className="text-emerald-300">storytelling</span>, and{" "}
                        <span className="text-violet-300">mascot chaos</span>. We borrow
                        tools from psychology, systems thinking, game design, and philosophy
                        — then let Orbson, Carmel, and Professor McChonk help translate all
                        that into something cozy, visual, and oddly comforting.
                    </p>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300 space-y-2">
                        <p className="font-semibold text-slate-100">
                            Lab mantra:
                        </p>
                        <p>
                            <span className="text-cyan-300">Observe</span> the pattern.
                            <br />
                            <span className="text-emerald-300">Name</span> the spiral.
                            <br />
                            <span className="text-amber-300">Laugh</span> at the loop.
                            <br />
                            Then decide what you want to do with it.
                        </p>
                    </div>
                </div>
            </section>

            {/* ORIGIN STORY */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">The origin of the Lab</h2>
                <div className="space-y-3 text-slate-300 max-w-3xl">
                    <p>
                        The Lab started as a simple question:{" "}
                        <span className="text-slate-100 font-medium">
              “Why do humans keep doing the same weird things, even when we
              know better?”
            </span>{" "}
                        From there, it turned into a habit of mapping patterns — in games,
                        in conversations, in the way people spiral, stall, or suddenly
                        change.
                    </p>
                    <p>
                        Over time, those maps turned into frameworks, sketches, and
                        eventually a whole fictional research lab where AI, creatures, and
                        humans all look at the same chaos from different angles.
                    </p>
                </div>
            </section>

            {/* WHY CHAOS IS DATA */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Why “Chaos is data”</h2>
                <p className="text-slate-300 max-w-3xl">
                    We don&apos;t believe chaos is the enemy. It&apos;s just information
                    that hasn&apos;t been sorted yet. Every meltdown, plot twist, or
                    late-night overthinking session is a dataset: context, triggers,
                    reactions, consequences. When you learn to read that pattern, you get
                    more choices — and a lot less shame.
                </p>
                <p className="text-sm text-slate-400 max-w-3xl">
                    The goal isn&apos;t to become perfectly rational. It&apos;s to become{" "}
                    <span className="text-slate-100">honestly aware</span> of your own
                    loops, so you can decide which ones you want to keep.
                </p>
            </section>

            {/* FOUNDERS / LAB TEAM */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Meet the founders</h2>
                <p className="text-slate-300 max-w-3xl">
                    The Lab is powered by one very persistent human and several creatures
                    who all think they&apos;re in charge.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    {founders.map((f) => (
                        <article
                            key={f.id}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex gap-3"
                        >
                            <div className="mt-1">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 flex items-center justify-center text-[11px] font-semibold text-slate-950">
                                    {f.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-50">
                                            {f.name}
                                        </h3>
                                        <p className="text-xs text-slate-300">{f.title}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                    {f.tag}
                  </span>
                                </div>

                                <p className="text-sm text-slate-300 mt-1">{f.blurb}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">What&apos;s next?</h2>
                <p className="text-slate-300 max-w-3xl">
                    From here, you can dive into the Lab&apos;s notes, explore the
                    fictional departments, or just let Carmel judge your life choices from
                    a comfortable distance.
                </p>

                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/lab-notes"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                    >
                        Read Lab Notes
                    </Link>
                    <Link
                        to="/departments"
                        className="inline-flex items-center px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        Explore Departments
                    </Link>
                </div>
            </section>
        </LayoutShell>
    );
}
