/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Footer.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Footer.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/layout/Footer.tsx

export function Footer() {
    return (
        <footer className="border-t border-slate-800/80 bg-slate-950/95">
            <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-400 lg:px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <p className="font-medium text-slate-200">
                            The Human Pattern Lab
                        </p>
                        <p className="max-w-md text-[0.7rem] text-slate-400/90">
                            A tiny research lab mapping human chaos into patterns, emotional
                            weather reports, and better conversations with creatures & AI.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
              Quick links
            </span>
                        <a
                            href="/labteam"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300"
                        >
                            Lab Team
                        </a>
                        <a
                            href="/lab-notes"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300"
                        >
                            Lab Notes
                        </a>
                        <a
                            href="/videos"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300"
                        >
                            Video Archive
                        </a>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[0.65rem] text-slate-500">
                    <p>© {new Date().getFullYear()} The Human Pattern Lab.</p>
                    <p>Powered by coffee, chaos, and a small army of mascots.</p>
                </div>
            </div>
        </footer>
    );
}
