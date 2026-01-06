// src/pages/admin/layout/AdminGate.tsx
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";

export function AdminGate() {
    const navigate = useNavigate();
    const location = useLocation();
    const API = apiBaseUrl;

    const devBypass =
        import.meta.env.DEV && import.meta.env.VITE_ADMIN_DEV_BYPASS === "true";

    const [status, setStatus] = useState<"checking" | "ok">("checking");

    useEffect(() => {
        // ✅ If dev bypass is enabled, don't gate the UI at all
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

                // 401 = not logged in -> go to admin login
                if (res.status === 401) {
                    navigate(loginUrl, { replace: true });
                    return;
                }

                // 403 = logged in but forbidden/allowlist/etc -> go to denied
                if (res.status === 403) {
                    navigate("/admin/denied", { replace: true });
                    return;
                }

                // Any other non-OK -> treat as not authorized (or API misrouted/down)
                if (!res.ok) {
                    navigate(loginUrl, { replace: true });
                    return;
                }

                const data = await res.json();

                // accept common shapes, but prefer { user }
                const user =
                    data?.user ??
                    data?.me ??
                    data?.data?.user ??
                    data?.data?.me ??
                    (data?.id ? data : null);

                // If API returns 200 but user is null, treat as unauthenticated
                if (!user) {
                    navigate(loginUrl, { replace: true });
                    return;
                }

                if (alive) setStatus("ok");
            } catch {
                // Network error / CORS / API down: treat as unauthenticated
                navigate(loginUrl, { replace: true });
            }
        })();

        return () => {
            alive = false;
        };
    }, [API, devBypass, location.hash, location.pathname, location.search, navigate]);

    if (status === "checking") {
        return <div className="p-6 text-zinc-300">Checking clearance…</div>;
    }

    return <Outlet />;
}
