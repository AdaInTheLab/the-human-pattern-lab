/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: NotFoundPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file NotFoundPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/NotFoundPage.tsx
import React from "react"
import { LayoutShell } from "@/components/layout/LayoutShell"
import { Link } from "react-router-dom"

export const NotFoundPage: React.FC = () => {
    return (
        <LayoutShell
            eyebrow="404"
            title="Signal Lost"
            description="We couldn’t map that route in the current version of this universe."
            className="pb-16"
        >
            <div className="space-y-4 text-sm text-slate-200">
                <p>
                    The page you’re looking for doesn’t exist, or it fell through a lore rewrite.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition-colors hover:border-cyan-400/80 hover:text-cyan-200"
                >
                    ← Back to Home
                </Link>
            </div>
        </LayoutShell>
    )
}
