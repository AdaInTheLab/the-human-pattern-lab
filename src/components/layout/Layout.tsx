/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Layout.tsx
   Purpose: Global app layout with neon lab header, routed
            content, and shared footer.
   =========================================================== */

/**
 * @file Layout.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit SCMS — Systems, Chaos & Meta-Structures
 * @status Active
 * @since 2025-12-10
 * @description Provides the core page shell: sticky neon header,
 *              routed content outlet, scroll restoration, and
 *              global footer for The Human Pattern Lab site.
 */

// src/components/layout/Layout.tsx
import React from "react"
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom"
import { Footer } from "./Footer"

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
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
            {/* Global header / nav */}
            <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6 lg:py-3.5">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        {/* Neon orb logo */}
                        <div className="relative h-9 w-9 rounded-full bg-slate-900/80 p-[2px] shadow-[0_0_24px_rgba(56,189,248,0.65)]">
                            <div className="h-full w-full rounded-full bg-gradient-to-tr from-violet-500 via-sky-400 to-emerald-400 animate-pulse" />
                            <div className="pointer-events-none absolute inset-[-5px] rounded-full border border-cyan-300/40 blur-[1px]" />
                            <div className="pointer-events-none absolute inset-[7px] rounded-full bg-slate-950/90" />
                        </div>

                        <div className="leading-tight">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                                The Human Pattern Lab
                            </p>
                            <p className="text-[0.68rem] text-slate-300">
                                Chaos, patterns, and creatures with opinions
                            </p>
                        </div>
                    </div>

                    {/* Nav links */}
                    <nav className="hidden items-center md:flex">
                        <div className="flex gap-1 rounded-full bg-slate-900/85 px-1.5 py-1 shadow-[0_0_26px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) => {
                                        const base =
                                            "relative rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200";
                                        const active =
                                            "bg-slate-50 text-slate-900 shadow-[0_0_18px_rgba(45,212,191,0.8)]";
                                        const inactive =
                                            "text-slate-200 hover:text-white hover:bg-slate-800/70";
                                        return `${base} ${isActive ? active : inactive}`
                                    }}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span>{item.label}</span>
                                            {isActive && (
                                                <span className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/70" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
                <ScrollRestoration />
                <Outlet />
            </main>

            {/* Global footer */}
            <Footer />
        </div>
    )
}

