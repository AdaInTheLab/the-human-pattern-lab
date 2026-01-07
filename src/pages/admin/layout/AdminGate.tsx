// src/pages/admin/layout/AdminGate.tsx
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";

type GateStatus = "checking" | "ok" | "error";

export function AdminGate() {
    const navigate = useNavigate();
    const location = useLocation();
    const API = apiBaseUrl;

    const devBypass =
        import.meta.env.DEV && import.meta.env.VITE_ADMIN_DEV_BYPASS === "true";

    const [status, setStatus] = useState<GateStatus>("checking");

    useEffect(() => {
        if (devBypass) {
            setStatus("ok");
            return;
        }

        let alive = true;

        const nextPath = `${location.pathname}${location.search}${location.hash}`;
        const loginUrl = `/admin/login?next=${encodeURIComponent(nextPath)}`;

        (async () => {
            try {
                const res = await fetch(`${API}/auth/me`, {
                    credentials: "include",
                    headers: { Accept: "application/json" },
                });

                if (!alive) return;

                if (res.status === 401) {
                    navigate(loginUrl, { replace: true });
                    return;
                }

                if (res.status === 403) {
                    navigate("/admin/denied", { replace: true });
                    return;
                }

                if (!res.ok) {
                    // Unexpected status: show error (don’t pretend it’s a login problem)
                    setStatus("error");
                    return;
                }

                const data = await res.json();

                const user =
                    data?.user ??
                    data?.me ??
                    data?.data?.user ??
                    data?.data?.me ??
                    (data?.id ? data : null);

                if (!user) {
                    navigate(loginUrl, { replace: true });
                    return;
                }

                setStatus("ok");
            } catch {
                if (!alive) return;
                setStatus("error");
            }
        })();

        return () => {
            alive = false;
        };
    }, [API, devBypass, location.hash, location.pathname, location.search, navigate]);

    if (status === "checking") {
        return <div className="p-6 text-zinc-300">Checking clearance…</div>;
    }

    if (status === "error") {
        return (
            <div className="p-6 text-zinc-300">
                <div className="text-lg font-semibold text-zinc-100">
                    Can’t reach the Lab API
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                    This usually means <code>VITE_API_BASE_URL</code> is wrong, CORS/session
                    settings are off, or the API is down.
                </div>
            </div>
        );
    }

    return <Outlet />;
}