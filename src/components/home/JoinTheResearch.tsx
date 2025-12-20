/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: JoinTheResearch.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file JoinTheResearch.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/home/JoinTheResearch.tsx
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export function JoinTheResearch() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus("error");
            return;
        }

        // Fake async submit — replace later with real API call
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 600);
    };

    return (
        <section
            aria-labelledby="join-the-research-heading"
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8"
        >
            <div className="grid gap-6 md:grid-cols-[3fr,2fr] items-center">
                {/* LEFT BLOCK — COPY */}
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                        Join the research
                    </p>

                    <h2 id="join-the-research-heading" className="text-xl md:text-2xl font-semibold">
                        Get transmissions from the Lab.
                    </h2>

                    <p className="text-sm md:text-base text-slate-300">
                        Occasional updates on new Lab Notes, videos, and strange discoveries
                        about humans, AI, and whatever Carmel is judging this week.
                        No spam. No doom. Just patterns.
                    </p>

                    <p className="text-xs text-slate-500">
                        Orbson sends the emails. Carmel approves subject lines for ✨vibes.✨
                    </p>
                </div>

                {/* RIGHT BLOCK — FORM + FUTURE COMMUNITY */}
                <div className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <label className="block text-xs font-medium text-slate-200 mb-1">
                            Email address
                        </label>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status !== "idle") setStatus("idle");
                                }}
                                placeholder="you@galaxy.net"
                                className="w-full rounded-full border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                            />

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                {status === "submitting" ? "Transmitting..." : "Subscribe"}
                            </button>
                        </div>

                        {status === "success" && (
                            <p className="text-[11px] text-emerald-300 mt-1">
                                You&apos;re in. First report will arrive soon™.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-[11px] text-rose-300 mt-1">
                                Orbson squints at the empty field. Try adding an email.
                            </p>
                        )}
                    </form>

                    <div className="border-t border-slate-800 pt-3 text-xs text-slate-400 space-y-1">
                        <p className="font-medium text-slate-200">Future community access</p>
                        <p>
                            We&apos;re building a cozy corner for pattern-obsessed humans,
                            AI enjoyers, creature theorists, and chaos researchers.
                        </p>

                        <p>
                            When the <span className="text-cyan-300">Lab Discord</span> opens,
                            newsletter humans get first invite.
                        </p>

                        <div className="pt-1">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
                            >
                                Want to collaborate? →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
