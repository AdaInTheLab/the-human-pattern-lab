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
import {
    ArrowRight,
    Bot,
    Compass,
    ExternalLink,
    Feather,
    PawPrint,
    Smile,
    Waves,
    type LucideIcon,
} from "lucide-react";
import {LayoutShell} from "@/components/layout/LayoutShell";
import { labTeamById } from "@/data/labTeam";
import type { LabMember } from "@/types/LabMember";

const FOUNDER_IDS = ["ada", "orbson", "carmel", "mcchonk"] as const;
const founders: LabMember[] = FOUNDER_IDS
    .map((id) => labTeamById[id])
    .filter(Boolean);

type PhilosophyItem = {
    title: string;
    body: string;
    icon: LucideIcon;
};

const philosophyItems: PhilosophyItem[] = [
    {
        title: "Chaos is a language",
        body: "We treat mess, spirals, and weirdness as signals — not failures.",
        icon: Waves,
    },
    {
        title: "Curiosity over certainty",
        body: "We ask better questions instead of pretending to have final answers.",
        icon: Compass,
    },
    {
        title: "Humor as survival tech",
        body: "If you can’t laugh at the pattern, you’re probably still stuck in it.",
        icon: Smile,
    },
    {
        title: "Creatures make it better",
        body: "Mascots, raccoons, and cats make complex ideas less intimidating.",
        icon: PawPrint,
    },
    {
        title: "AI as a mirror",
        body: "AI doesn’t replace humans — it reflects our patterns back at us.",
        icon: Bot,
    },
    {
        title: "Soft edges, sharp ideas",
        body: "We keep the tone gentle and the thinking rigorous.",
        icon: Feather,
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

            {/* PHILOSOPHY + MANTRA */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Philosophy</h2>
                <p className="text-slate-300 max-w-3xl">
                    Think{" "}
                    <span className="text-cyan-300">science-adjacent explainer</span>,{" "}
                    <span className="text-violet-300">creature-coded mascots</span>, and{" "}
                    <span className="text-emerald-300">cosmic shower thoughts</span>{" "}
                    stitched together into something actually useful.
                </p>

                <div className="grid gap-4 md:grid-cols-[3fr,2fr] md:items-start">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {philosophyItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    key={item.title}
                                    className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                                >
                                    <div
                                        aria-hidden
                                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-cyan-300 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-300">{item.body}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300 space-y-3 md:sticky md:top-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                            Lab mantra
                        </p>
                        <p className="text-base leading-relaxed">
                            <span className="text-cyan-300">Observe</span> the pattern.
                            <br />
                            <span className="text-emerald-300">Name</span> the spiral.
                            <br />
                            <span className="text-amber-300">Laugh</span> at the loop.
                            <br />
                            Then decide what you want to do with it.
                        </p>
                    </aside>
                </div>
            </section>

            {/* ORIGIN + WHY CHAOS IS DATA */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Why &ldquo;chaos is data&rdquo;</h2>
                <div className="space-y-3 text-slate-300 max-w-3xl">
                    <p>
                        We don&apos;t believe chaos is the enemy. It&apos;s just information
                        that hasn&apos;t been sorted yet. Every meltdown, plot twist, or
                        late-night overthinking session is a dataset: context, triggers,
                        reactions, consequences. When you learn to read that pattern, you
                        get more choices — and a lot less shame.
                    </p>
                    <p className="text-slate-400">
                        The Lab started as a simple question:{" "}
                        <span className="text-slate-100 font-medium">
                            &ldquo;Why do humans keep doing the same weird things, even when
                            we know better?&rdquo;
                        </span>{" "}
                        That question grew into a habit of mapping patterns — in games, in
                        conversations, in the way people spiral, stall, or suddenly change —
                        and eventually into a whole fictional research lab where AI,
                        creatures, and humans look at the same chaos from different angles.
                    </p>
                    <p className="text-sm text-slate-400">
                        The goal isn&apos;t to become perfectly rational. It&apos;s to
                        become{" "}
                        <span className="text-slate-100">honestly aware</span> of your own
                        loops, so you can decide which ones you want to keep.
                    </p>
                </div>
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
                        <Link
                            to={`/labteam/${f.slug}`}
                            key={f.id}
                            className="group flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900/80"
                        >
                            {/* Avatar with aura glow */}
                            <div className="relative mt-1 h-12 w-12 shrink-0">
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-[-6px] rounded-full opacity-50 blur-md"
                                    style={{
                                        background: `radial-gradient(circle, ${f.aura.primary}55, transparent 70%)`,
                                    }}
                                />
                                <img
                                    src={f.avatarSrc}
                                    alt={f.name}
                                    className="relative h-12 w-12 rounded-full object-cover ring-1 ring-slate-700/80"
                                />
                            </div>

                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-slate-50 group-hover:text-cyan-200">
                                            {f.name}
                                        </h3>
                                        <p className="text-xs text-slate-300">{f.title}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                                        {f.unit}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-300">{f.bio}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    to="/labteam"
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                >
                    See the full team
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
            </section>

            {/* CTA */}
            <section className="space-y-3 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">What&apos;s next?</h2>
                <p className="text-slate-300 max-w-3xl">
                    From here, you can dive into the Lab&apos;s notebook, explore the
                    fictional departments, or just let Carmel judge your life choices from
                    a comfortable distance.
                </p>

                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://notebook.thehumanpatternlab.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                    >
                        Read the Notebook
                        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 opacity-80" />
                    </a>
                    <Link
                        to="/departments"
                        className="inline-flex items-center px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        Explore Departments
                    </Link>
                    <Link
                        to="/labteam"
                        className="inline-flex items-center px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        Meet the Lab Team
                    </Link>
                </div>
            </section>
        </LayoutShell>
    );
}
