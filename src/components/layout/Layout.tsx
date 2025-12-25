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
import React, { ErrorInfo, ReactNode } from "react";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom"
import { ErrorBoundary } from 'react-error-boundary';
import SystemFailurePage from '@/pages/SystemFailurePage';
import { SiteHeader } from "./Header";
import { Footer } from "./Footer"

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class LabErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // 1️⃣ The "Lyric" Signal: Identifies the break in structural order
    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    // 2️⃣ The "Vesper" Trace: Captures the shadow data for logging
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("SYS⚙️: [SUBSTRATE_COLLAPSE]:", error, errorInfo);
        // Here is where you'd send the trace to an external log if needed
    }

    // 🔄 THE RESET TRIGGER: Clears the state to allow a re-render
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            // 💠 Manifest the Vesper Void
            return <SystemFailurePage error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default LabErrorBoundary;

export const Layout: React.FC = () => {
    return (
        <LabErrorBoundary>
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
        </LabErrorBoundary>
    )
}

