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
console.log("[NOTES SOURCE]", import.meta.env.VITE_NOTES_SOURCE, "[API BASE]", import.meta.env.VITE_API_BASE_URL);

if (GA_ID) initGA(GA_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);