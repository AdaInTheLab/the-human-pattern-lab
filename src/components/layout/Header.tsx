/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Header.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Header.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

import React from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
    label: string;
    to: string;
    end?: boolean;
};

const navItems: NavItem[] = [
    { label: "Home", to: "/", end: true },
    { label: "About", to: "/about" },
    { label: "Departments", to: "/departments" },
    { label: "Lab Notes", to: "/lab-notes" },
    { label: "Videos", to: "/videos" },
    { label: "Content Use", to: "/content-use-policy" },
    { label: "Contact", to: "/contact" },
];

export const SiteHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
                {/* Brand block */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Neon orb logo */}
                    <div className="relative h-9 w-9 rounded-full bg-slate-900/80 p-[2px] shadow-[0_0_25px_rgba(56,189,248,0.45)]">
                        <div className="h-full w-full rounded-full bg-gradient-to-tr from-violet-500 via-sky-400 to-emerald-400 animate-pulse" />
                        <div className="pointer-events-none absolute inset-[-6px] rounded-full border border-cyan-300/25 blur-[1px]" />
                    </div>

                    <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.32em] text-cyan-300 uppercase">
              The Human Pattern Lab
            </span>
                        <span className="text-[11px] text-slate-300 md:text-xs">
              Chaos, patterns, and creatures with opinions
            </span>
                    </div>
                </div>

                {/* Nav block */}
                <nav className="flex items-center justify-end">
                    <div className="flex gap-1 rounded-full bg-slate-900/80 px-1 py-1 shadow-[0_0_25px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) => {
                                    const base =
                                        "relative px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200";
                                    const active =
                                        "bg-slate-50 text-slate-900 shadow-[0_0_18px_rgba(45,212,191,0.7)]";
                                    const inactive =
                                        "text-slate-200 hover:text-white hover:bg-slate-800/60";
                                    return `${base} ${isActive ? active : inactive}`;
                                }}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <span className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/60/80 opacity-60" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;