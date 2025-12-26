/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Hero.tsx
   Lab Unit: UI — Home Surface (EWU integration point)
   Purpose: Renders the homepage hero copy, primary CTAs, and
            the Orbson intro orb. Hosts small “at-a-glance”
            widgets like Emotional Weather (EWU).
   =========================================================== */

/**
 * @file Hero.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit UI — Home Surface (EWU integration point)
 * @since 2025-12-26
 * @description Homepage hero section with CTA links and Orbson
 *              visual. Includes the Emotional Weather widget as
 *              a compact “front page” card.
 */

// src/components/home/Hero.tsx
import { Link } from "react-router-dom";
import EmotionalWeatherCard from "@/components/ewu/EmotionalWeatherCard";

export function Hero() {
    return (
        <section className="grid gap-8 sm:grid-cols-[3fr,2fr] sm:items-start">
            {/* LEFT: copy + CTAs */}
            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
                    Welcome to
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                    The Human Pattern Lab
                </h1>
                <p className="text-lg text-slate-300">
                    A small research lab at the edge of chaos where{" "}
                    <span className="text-cyan-300">AI</span>,{" "}
                    <span className="text-violet-300">creatures</span>, and{" "}
                    <span className="text-emerald-300">humans</span> study each other —
                    mostly for science, partly for fun.
                </p>
                <p className="text-sm text-slate-400">
                    Orbson&apos;s current hypothesis:{" "}
                    <span className="text-slate-200 font-medium">
        chaos is just data we haven&apos;t graphed yet.
      </span>
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                        to="/departments"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                    >
                        Enter the Lab
                    </Link>
                    <Link
                        to="/lab-notes"
                        className="inline-flex items-center px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        View Lab Notes
                    </Link>
                </div>
            </div>

            {/* RIGHT: EWU + Orbson */}
            <div className="space-y-4">
               {/* Orbson orb */}
                <div className="relative">
                    {/* Aura glow */}
                    <div className="aspect-square w-full max-w-sm mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 blur-2xl opacity-40 animate-orbson-glow" />

                    {/* Inner orb */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-40 w-40 md:h-56 md:w-56 rounded-full border border-cyan-300/40 bg-slate-900/80 flex flex-col items-center justify-center shadow-xl shadow-cyan-500/20 animate-orbson-float">
                            <img
                                src="/assets/labteam/orbson.png"
                                alt="Orbson"
                                className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-lg"
                            />

                            <div className="mt-2 text-center">
                                <div className="text-sm font-medium text-slate-200">Orbson</div>
                                <div className="text-xs text-slate-400">
                                    Director of Observational <br />
                                    Oversight
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* EWU — Emotional Weather */}
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <EmotionalWeatherCard id="ewu-hero-widget" />
                </div>
            </div>
        </section>


    );
}
