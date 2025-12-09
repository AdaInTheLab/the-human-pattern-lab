/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Hero.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Hero.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/home/Hero.tsx
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
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

            {/* Orbson orb placeholder */}
            <div className="relative">
                <div className="aspect-square w-full max-w-sm mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 blur-2xl opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-40 w-40 md:h-56 md:w-56 rounded-full border border-cyan-300/40 bg-slate-900/80 flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <span className="text-sm text-center text-slate-200">
              Orbson
              <span className="block text-xs text-slate-400 mt-1">
                Director of Observational Oversight
              </span>
            </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
