// src/pages/admin/layout/AdminGate.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";

export function AdminGate() {
    const navigate = useNavigate();
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

        (async () => {
            try {
                const res = await fetch(`${API}/auth/me`, { credentials: "include" });

                // If API is down or misrouted, treat as not authorized.
                if (!res.ok) throw new Error("auth/me failed");

                const data = await res.json();

                // accept common shapes
                const user =
                    data?.user ??
                    data?.me ??
                    data?.data?.user ??
                    data?.data?.me ??
                    (data?.id ? data : null);

                console.log("[AdminGate] auth/me", { status: res.status, data });

                if (!user) {
                    navigate("/login", { replace: true });
                    return;
                }


                if (alive) setStatus("ok");
            } catch {
                navigate("/login", { replace: true });
            }
        })();

        return () => {
            alive = false;
        };
    }, [API, navigate]);

    if (status === "checking") {
        return <div className="p-6 text-zinc-300">Checking clearance…</div>;
    }

    return <Outlet />;
}
