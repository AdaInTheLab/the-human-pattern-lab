/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Footer.tsx
   Purpose: Global footer with Lab branding, quick links,
            GitHub link, and neon-hover aesthetics.
   =========================================================== */

/**
 * @file Footer.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems, Chaos & Meta-Structures
 * @status Active
 * @since 2025-12-10
 * @description Shared footer with cosmic neon styling,
 *              quick navigation links, GitHub presence,
 *              and Lab identity messaging.
 */

export function Footer() {
    return (
        <footer className="border-t border-slate-800/80 bg-slate-950/95">
            <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-400 lg:px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Branding block */}
                    <div className="space-y-1">
                        <p className="font-medium text-slate-200">
                            The Human Pattern Lab
                        </p>
                        <p className="max-w-md text-[0.7rem] text-slate-400/90">
                            A tiny research lab mapping human chaos into patterns,
                            emotional weather reports, and better conversations
                            with creatures & AI.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap items-center gap-3">
    <span className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
        Quick links
    </span>

                        <a
                            href="/labteam"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                            Lab Team
                        </a>

                        <a
                            href="/lab-notes"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                            Lab Notes
                        </a>

                        <a
                            href="/videos"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                            Video Archive
                        </a>

                        {/* 🌐 Privacy Policy */}
                        <a
                            href="/privacy-policy"
                            className="text-[0.7rem] text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                            Privacy &amp; Data
                        </a>

                        {/* GITHUB LINK WITH NEON ANIMATION */}
                        <a
                            href="https://github.com/AdaInTheLab"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit the Human Pattern Lab on GitHub"
                            className="group flex items-center gap-1 text-[0.7rem] text-slate-300 transition-all hover:text-cyan-300"
                        >
                            <div className="relative flex h-4 w-4 items-center justify-center">
                                {/* Glow ring */}
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 blur-md transition-all duration-300 group-hover:opacity-60 group-hover:blur-lg" />

                                {/* GitHub Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-[1.13]"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.621.069-.609.069-.609 1.004.071 1.533 1.04 1.533 1.04.892 1.535 2.341 1.092 2.91.835.091-.647.35-1.093.636-1.344-2.22-.254-4.555-1.115-4.555-4.958 0-1.095.39-1.99 1.029-2.69-.103-.254-.446-1.278.098-2.664 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.852.004 1.71.115 2.51.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.386.203 2.41.1 2.664.64.7 1.028 1.595 1.028 2.69 0 3.853-2.339 4.701-4.566 4.949.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            GitHub
                        </a>
                    </div>
                </div>

                {/* Bottom footer line */}
                <div className="mt-4 flex items-center justify-between text-[0.65rem] text-slate-500">
                    <p>© {new Date().getFullYear()} The Human Pattern Lab.</p>
                    <p>Powered by coffee, chaos, and a small army of mascots.</p>
                </div>
            </div>
        </footer>
    );
}
