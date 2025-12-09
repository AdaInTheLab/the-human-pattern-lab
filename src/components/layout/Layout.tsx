/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Layout.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Layout.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @status TODO: set status
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/components/layout/Layout.tsx
import React from "react"
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom"

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/departments", label: "Departments" },
    { to: "/lab-notes", label: "Lab Notes" },
    { to: "/videos", label: "Videos" },
    { to: "/content-use-policy", label: "Content Use" },
    { to: "/contact", label: "Contact" },
]

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            {/* Global header / nav */}
            <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 shadow-md shadow-cyan-900/60">
                            <div className="h-4 w-4 rounded-full bg-slate-950/85" />
                        </div>
                        <div className="leading-tight">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/85">
                                The Human Pattern Lab
                            </p>
                            <p className="text-[0.65rem] text-slate-400">
                                Chaos, patterns, and creatures with opinions
                            </p>
                        </div>
                    </div>

                    {/* Nav links */}
                    <nav className="hidden items-center gap-1 rounded-full bg-slate-900/80 px-1.5 py-1 shadow-md shadow-slate-950/70 md:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    [
                                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                                        isActive
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-300 hover:text-cyan-200 hover:bg-slate-800/70",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
                <ScrollRestoration />
                <Outlet />
            </main>

            {/* Global footer */}
            <SiteFooter />
        </div>
    )
}

/* ----------------------------
   Footer Component
---------------------------- */

const SiteFooter: React.FC = () => {
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
    )
}
