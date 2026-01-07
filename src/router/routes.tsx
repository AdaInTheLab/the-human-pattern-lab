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
import {createBrowserRouter, Outlet } from "react-router-dom";
import { useEffect,  lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

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
import { VideoDetailPage } from "@/pages/VideoDetailPage";
import { DepartmentDetailPage } from "@/pages/DepartmentDetailPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import { adminRoutes } from "@/pages/admin/admin.routes";

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
import {AdminDashboardPage} from "@/pages/admin/pages/AdminDashboardPage";
import {AdminDeniedPage} from "@/pages/admin/pages/AdminDeniedPage";
import LabNoteDetailPage from "@/pages/LabNoteDetailPage";

function GATracker() {
    const loc = useLocation();

    useEffect(() => {
        const id = import.meta.env.VITE_GA_ID as string | undefined;
        if (!id || !window.gtag) return;

        window.gtag("config", id, { page_path: loc.pathname + loc.search });
    }, [loc]);

    return null;
}

function PageLoader() {
    return <div className="p-6 text-slate-300">Loading…</div>;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: (<Suspense fallback={<PageLoader />}><HomePage /></Suspense>)},

            { path: "about", element: (<Suspense fallback={<PageLoader />}><AboutPage /> </Suspense> )},
            { path: "departments", element: (<Suspense fallback={<PageLoader />}><DepartmentsPage /></Suspense> ) },

            // Canonical department routes
            { path: "departments/cjo", element: (<Suspense fallback={<PageLoader />}><CjoDepartmentPage /> </Suspense> )},
            { path: "departments/scms", element: (<Suspense fallback={<PageLoader />}><ScmsDepartmentPage /></Suspense> ) },
            { path: "departments/ood", element: (<Suspense fallback={<PageLoader />}><OodDepartmentPage /> </Suspense> )},
            { path: "departments/aoe", element: (<Suspense fallback={<PageLoader />}><AoeDepartmentPage /></Suspense> ) },
            { path: "departments/due", element: (<Suspense fallback={<PageLoader />}><DueDepartmentPage /></Suspense> ) },
            { path: "departments/feline", element: (<Suspense fallback={<PageLoader />}><FelineDepartmentPage /></Suspense> ) },
            { path: "departments/rbs", element: (<Suspense fallback={<PageLoader />}><RbsDepartmentPage /> </Suspense> )},
            { path: "departments/ewu", element: (<Suspense fallback={<PageLoader />}><EwuDepartmentPage /></Suspense> ) },

            // Future-friendly dynamic detail route (if/when needed)
            { path: "departments/:id", element: (<Suspense fallback={<PageLoader />}><DepartmentDetailPage /></Suspense> ) },

            // List
            { path: "lab-notes", element: (<Suspense fallback={<PageLoader />}><LabNotesPage /> </Suspense> )},
            { path: ":locale/lab-notes", element: (<Suspense fallback={<PageLoader />}><LabNotesPage /> </Suspense> )},

            // Detail (pick ONE param name; use slug)
            { path: "lab-notes/:slug", element: <LabNoteDetailPage /> },
            { path: ":locale/lab-notes/:slug", element: <LabNoteDetailPage /> },

            { path: "videos", element: (<Suspense fallback={<PageLoader />}><VideoArchivePage /></Suspense> ) },
            { path: "videos/:slug", element: <VideoDetailPage /> },

            { path: "content-use-policy", element: (<Suspense fallback={<PageLoader />}><ContentUsePolicyPage /> </Suspense> )},
            { path: "merch", element: <MerchPage /> },
            { path: "contact", element: <ContactPage /> },

            { path: "labteam", element: (<Suspense fallback={<PageLoader />}><LabTeamPage /></Suspense> ) },
            { path: "labteam/:memberId", element: <LabMemberDetailPage /> },

            { path: "privacy-policy", element: (<Suspense fallback={<PageLoader />}><PrivacyPolicyPage /> </Suspense> )},

            ...adminRoutes,

            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
