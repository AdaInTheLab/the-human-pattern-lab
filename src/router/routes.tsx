/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: routes.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file routes.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
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
import { NotFoundPage } from "@/pages/NotFoundPage";
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
            { path: "lab-notes/:slug", element: <LabNoteDetailPage /> },

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
