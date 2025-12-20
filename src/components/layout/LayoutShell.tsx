/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LayoutShell.tsx
   Purpose: Shared page layout shell for all main views.
   =========================================================== */

/**
 * @file LayoutShell.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit Core UI
 * @since 2025-12-08
 * @description Provides a consistent page container with title,
 *              eyebrow, description, and optional header actions.
 */

import React from "react"

type LayoutShellProps = {
    /** Small label above the title, e.g. "Lab Directory" */
    eyebrow?: string
    /** Main page heading */
    title?: string
    /** Optional description text under the title */
    description?: string
    /** Optional right-side content in the header (buttons, filters, etc.) */
    headerRight?: React.ReactNode
    /** Extra classes for the outer wrapper */
    className?: string
    /** Extra classes for the inner content area */
    contentClassName?: string
    /** Page body */
    children: React.ReactNode
}

/**
 * LayoutShell
 *
 * Reusable page wrapper that:
 * - Centers content
 * - Controls max-width
 * - Adds consistent padding & spacing
 * - Renders an optional header (eyebrow / title / description / actions)
 */
export const LayoutShell: React.FC<LayoutShellProps> = ({
                                                            eyebrow,
                                                            title,
                                                            description,
                                                            headerRight,
                                                            className = "",
                                                            contentClassName = "",
                                                            children,
                                                        }) => {
    return (
        <main
            className={`w-full ${className}`.trim()}
        >
            <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6 lg:py-12">
                {(eyebrow || title || description || headerRight) && (
                    <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between">
                        <div>
                            {eyebrow && (
                                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">
                                    {eyebrow}
                                </p>
                            )}

                            {title && (
                                <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                                    {title}
                                </h1>
                            )}

                            {description && (
                                <p className="mt-2 max-w-2xl text-sm text-slate-300/90 md:text-base">
                                    {description}
                                </p>
                            )}
                        </div>

                        {headerRight && (
                            <div className="shrink-0">
                                {headerRight}
                            </div>
                        )}
                    </header>
                )}

                <section className={`flex flex-col gap-12 ${contentClassName}`}>
                    {children}
                </section>
            </div>
        </main>
    )
}
