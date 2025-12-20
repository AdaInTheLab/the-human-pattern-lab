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
 * @lab-unit SCMS — Systems, Chaos & Meta-Structures
 * @since 2025-12-10
 * @description Defines all route paths, nested layouts, and
 *              dynamic department/member/lab note routing.
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
import NotFoundPage from "@/pages/NotFoundPage";
import LabTeamPage from "@/pages/LabTeamPage";
import LabMemberDetailPage from "@/pages/LabMemberDetailPage";
import { LabNoteDetailPage } from "@/pages/LabNoteDetailPage";
import { VideoDetailPage } from "@/pages/VideoDetailPage";
import { DepartmentDetailPage } from "@/pages/DepartmentDetailPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import Login from '@/pages/Login'; // Your login page
import Admin from '@/pages/Admin'; // The new admin UI

import {
    CjoDepartmentPage,
    ScmsDepartmentPage,
    OodDepartmentPage,
    AoeDepartmentPage,
    DueDepartmentPage,
    FelineDepartmentPage,
    RbsDepartmentPage,
    EwuDepartmentPage,
} from "@/departments";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },

            { path: "about", element: <AboutPage /> },
            { path: "departments", element: <DepartmentsPage /> },

            // Canonical department routes
            { path: "departments/cjo", element: <CjoDepartmentPage /> },
            { path: "departments/scms", element: <ScmsDepartmentPage /> },
            { path: "departments/ood", element: <OodDepartmentPage /> },
            { path: "departments/aoe", element: <AoeDepartmentPage /> },
            { path: "departments/due", element: <DueDepartmentPage /> },
            { path: "departments/feline", element: <FelineDepartmentPage /> },
            { path: "departments/rbs", element: <RbsDepartmentPage /> },
            { path: "departments/ewu", element: <EwuDepartmentPage /> },

            // Future-friendly dynamic detail route (if/when needed)
            { path: "departments/:id", element: <DepartmentDetailPage /> },

            { path: "lab-notes", element: <LabNotesPage /> },
            { path: "lab-notes/:id", element: <LabNoteDetailPage /> },

            { path: "videos", element: <VideoArchivePage /> },
            { path: "videos/:slug", element: <VideoDetailPage /> },

            { path: "content-use-policy", element: <ContentUsePolicyPage /> },
            { path: "merch", element: <MerchPage /> },
            { path: "contact", element: <ContactPage /> },

            { path: "labteam", element: <LabTeamPage /> },
            { path: "labteam/:memberId", element: <LabMemberDetailPage /> },

            { path: "privacy-policy", element: <PrivacyPolicyPage /> },

            { path: "login", element: <Login /> },
            { path: "admin", element: <Admin /> }, // Protected admin den

            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
