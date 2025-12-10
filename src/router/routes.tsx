/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: routes.tsx
   Purpose: Central router configuration for the Lab front-end.
   =========================================================== */

/**
 * @file routes.tsx
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @since 2025-12-09
 * @description Defines all public routes, layout nesting, and
 *              detail views for the Human Pattern Lab site.
 */
// src/router/routes.tsx
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { DepartmentsPage } from "@/pages/DepartmentsPage";
import { LabNotesPage } from "@/pages/LabNotesPage";
import { VideoArchivePage } from "@/pages/VideoArchivePage";
import { ContentUsePolicyPage } from "@/pages/ContentUsePolicyPage";
import { MerchPage } from "@/pages/MerchPage";
import { ContactPage } from "@/pages/ContactPage";
import  NotFoundPage  from "@/pages/NotFoundPage";
import LabTeamPage from "@/pages/LabTeamPage"
import LabMemberDetailPage from "@/pages/LabMemberDetailPage"

// (Optional) detail pages if/when you make them:
import { LabNoteDetailPage } from "@/pages/LabNoteDetailPage";
import { VideoDetailPage } from "@/pages/VideoDetailPage";
import { DepartmentDetailPage } from "@/pages/DepartmentDetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },

            { path: "about", element: <AboutPage /> },
            { path: "departments", element: <DepartmentsPage /> },

            { path: "lab-notes", element: <LabNotesPage /> },
            { path: "lab-notes/:id", element: <LabNoteDetailPage /> },

            { path: "videos", element: <VideoArchivePage /> },
            { path: "videos/:slug", element: <VideoDetailPage /> },

            { path: "content-use-policy", element: <ContentUsePolicyPage /> },
            { path: "merch", element: <MerchPage /> },
            { path: "contact", element: <ContactPage /> },

            // Optional: department detail route later
            { path: "departments/:id", element: <DepartmentDetailPage /> },
            { path: "labteam", element: <LabTeamPage /> },
            { path: "labteam/:memberId", element: <LabMemberDetailPage /> },

            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
