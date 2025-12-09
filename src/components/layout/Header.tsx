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

// src/components/layout/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItems = [
    { to: "/", label: "{t(\"nav.home\")}" },
    { to: "/about", label: "{t(\"nav.about\")}" },
    { to: "/departments", label: "{t(\"nav.departments\")}" },
    { to: "/lab-notes", label: "{t(\"nav.lab-notes\")}" },
    { to: "/videos", label: "{t(\"nav.videos\")}" },
    { to: "/content-use-policy", label: "{t(\"nav.content-use-policy\")}" },
    { to: "/contact", label: "{t(\"nav.contact\")}" },
];
const { t } = useTranslation("common");

export function Header() {
    return (
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500" />
                    <span className="font-semibold tracking-wide">
            The Human Pattern Lab
          </span>
                </Link>

                {/* NAVIGATION */}
                <nav className="hidden md:flex gap-4 text-sm">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) =>
                                `px-2 py-1 rounded-full transition ${
                                    isActive
                                        ? "bg-slate-800 text-cyan-300"
                                        : "text-slate-300 hover:bg-slate-800/60 hover:text-cyan-200"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

            </div>
        </header>
    );
}
