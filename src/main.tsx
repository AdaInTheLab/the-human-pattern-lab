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

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
