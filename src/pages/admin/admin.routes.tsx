// src/pages/admin/admin.routes.tsx
import { Navigate } from "react-router-dom";
import { Suspense } from "react";

import { AdminLayout } from "@/pages/admin/layout";
import { AdminGate } from "@/pages/admin/layout/AdminGate";

import { AdminLoginPage } from "@/pages/admin/pages/AdminLoginPage";
import { AdminDeniedPage } from "@/pages/admin/pages/AdminDeniedPage";
import { AdminDashboardPage } from "@/pages/admin/pages/AdminDashboardPage";
import { AdminNotesPage } from "@/pages/admin/pages/AdminNotesPage";
import AdminApiDocsPage from "@/pages/admin/AdminApiDocsPage";

function PageLoader() {
    return <div className="p-6 text-slate-300">Loading…</div>;
}

export const adminRoutes = [
    // Public (NOT behind AdminLayout)
    {
        path: "login",
        element: (
            <Suspense fallback={<PageLoader />}>
                <AdminLoginPage />
            </Suspense>
        ),
    },

    // Public (inside AdminLayout is optional; I like it outside so it feels "blocked")
    {
        path: "denied",
        element: (
            <Suspense fallback={<PageLoader />}>
                <AdminDeniedPage />
            </Suspense>
        ),
    },

    // Guarded admin area
    {
        path: "admin",
        element: <AdminGate />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: "dashboard", element: <AdminDashboardPage /> },
                    { path: "notes", element: <AdminNotesPage /> },
                    { path: "docs", element: <AdminApiDocsPage /> },

                    { path: "*", element: <Navigate to="dashboard" replace /> },
                ],
            },
        ],
    }
];
