/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Layout.tsx
   Purpose: Global app layout with neon lab header, routed
            content, and shared footer.
   =========================================================== */

/**
 * @file Layout.tsx
 * @author Ada
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
import { SiteHeader } from "./Header";
import { Footer } from "./Footer"


export const Layout: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
            {/* Global header / nav */}
            <SiteHeader />

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

