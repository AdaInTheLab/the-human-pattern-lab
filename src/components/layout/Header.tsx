/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Header.tsx
   Purpose: Sticky top navigation with neon orb brand mark and
            pill-style nav. Adds a mobile-friendly menu while
            preserving the Lab's visual identity.
   =========================================================== */

/**
 * @file Header.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-26
 * @description Renders the main site header + navigation.
 *              Desktop shows the full pill-nav row. Mobile shows
 *              a Menu button that expands a styled panel.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
    label: string;
    to: string;
    end?: boolean;
    external?: boolean;
};

const navItems: NavItem[] = [
    { label: "Home", to: "/", end: true },
    { label: "About", to: "/about" },
    { label: "Departments", to: "/departments" },
    { label: "Lab Notes", to: "/lab-notes" },
    { label: "Docs", to: "/docs/", external: true },
    { label: "Videos", to: "/videos" },
    { label: "Content Use", to: "/content-use-policy" },
    { label: "Contact", to: "/contact" },
];

function PillLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
    const base =
        "relative px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200";
    const active =
        "bg-slate-50 text-slate-900 shadow-[0_0_18px_rgba(45,212,191,0.7)]";
    const inactive =
        "text-slate-200 hover:text-white hover:bg-slate-800/60";

    // External links: use <a> but keep pill styling consistent
    if (item.external) {
        return (
            <a
                href={item.to}
                className={`${base} ${inactive}`}
                target="_self"
                rel="noreferrer"
                onClick={onNavigate}
            >
                {item.label}
            </a>
        );
    }

    return (
        <NavLink
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
            {({ isActive }) => (
                <>
                    <span>{item.label}</span>
                    {isActive && (
                        <span className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/60 opacity-60" />
                    )}
                </>
            )}
        </NavLink>
    );
}

export function TopNav() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Close on route change-ish: whenever a nav link is clicked.
    const closeMenu = () => setOpen(false);

    // Close on ESC
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // Close on outside click (panel + button are considered "inside")
    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            const inPanel = panelRef.current?.contains(target);
            const inButton = buttonRef.current?.contains(target);
            if (!inPanel && !inButton) setOpen(false);
        };
        window.addEventListener("mousedown", onMouseDown);
        return () => window.removeEventListener("mousedown", onMouseDown);
    }, [open]);

    // Lock body scroll when menu is open (mobile only-ish)
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const menuLabel = useMemo(() => (open ? "Close" : "Menu"), [open]);

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
                    {/* Desktop pill nav (unchanged vibe) */}
                    <div data-testid="topnav-desktop" className="hidden md:flex gap-1 rounded-full bg-slate-900/80 px-1 py-1 shadow-[0_0_25px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70">
                        {navItems.map((item) => (
                            <PillLink key={item.to} item={item} />
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        className="md:hidden rounded-full bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-200 shadow-[0_0_25px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70 hover:bg-slate-800/60 hover:text-white transition-all duration-200"
                    >
                        {menuLabel}
                    </button>
                </nav>
            </div>

            {/* Mobile dropdown panel (styled to match your pills) */}
            <div data-testid="topnav-mobile"
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
                    open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div ref={panelRef} className="mx-auto max-w-6xl px-4 pb-4">
                    <div className="rounded-2xl bg-slate-900/70 p-2 shadow-[0_0_25px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/70">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <div key={item.to} className="flex">
                                    {/* Give each item a full-width “pill” hit area on mobile */}
                                    <div className="w-full rounded-full bg-slate-950/30 px-1 py-1">
                                        <div className="w-full">
                                            <PillLink
                                                item={item}
                                                onNavigate={closeMenu}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Optional: tiny lore footer */}
                        <div className="mt-3 px-3 pb-1 text-[11px] text-slate-400">
                            Tip: Menu closes on <span className="text-slate-300">Esc</span>, click-away, or navigation. 🦝
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
