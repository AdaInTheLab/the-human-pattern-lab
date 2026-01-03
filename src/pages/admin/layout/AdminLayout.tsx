import { Outlet } from "react-router-dom";
import {AdminNav} from "@/pages/admin/layout/AdminNav";
import {AdminSystemRail} from "@/pages/admin/layout/AdminSystemRail";
import { DevBypassBadge } from "@/pages/admin/components/DevBypassBadge";

const showDevBadge = import.meta.env.DEV;

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-black text-zinc-100 flex">
            <AdminNav />
            <main className="flex-1 p-6 overflow-y-auto pb-20 relative">
                <Outlet />
            </main>
            <AdminSystemRail />
            <DevBypassBadge enabled={showDevBadge} />
        </div>
    );
}
