/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: main.tsx
   Purpose: Renders the root React application and mounts the
            Human Pattern Lab interface into the DOM.
   =========================================================== */

/**
 * @file main.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-09
 * @description Entry point of the Human Pattern Lab frontend.
 *              Initializes global providers and mounts the
 *              main React application.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import "./index.css";
import "./i18n";

/// <reference types="vite/client" />

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: any[]) => void;
    }
}

export {};


const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

class RootErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: unknown }
> {
    state = { hasError: false as boolean, error: undefined as unknown };

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }

    componentDidCatch(error: unknown) {
        console.error("[HPL] Uncaught render error:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
                    <div className="max-w-xl space-y-3 rounded-xl border border-slate-800 bg-slate-900/30 p-6">
                        <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                            HPL Recovery Mode
                        </div>
                        <div className="text-lg font-semibold">Something crashed during render.</div>
                        <div className="text-sm text-slate-300">
                            Check the console for details. If this is production, we can add a safer fallback path.
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}


function initGA(measurementId: string) {
    // 1) Create dataLayer + gtag stub immediately
    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
        window.gtag ??
        ((...args: any[]) => {
            window.dataLayer!.push(args);
        });

    // 2) Inject script if not already present
    const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;

    if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = src;
        document.head.appendChild(script);
    }

    // 3) Configure GA
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
        anonymize_ip: true, // optional, but nice
    });
}

if (GA_ID) initGA(GA_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RootErrorBoundary>
            <RouterProvider router={router} />
        </RootErrorBoundary>
    </React.StrictMode>
);