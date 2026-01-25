import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Lab Notes", path: "/admin/notes" },
    { label: "API Tokens", path: "/admin/tokens" },
    { label: "Relays", path: "/admin/relays" },
    { label: "API Docs", path: "/admin/docs" },

    // Future controls
    { label: "Users", path: "/admin/users", disabled: true },
    { label: "Flags", path: "/admin/flags", disabled: true },
    { label: "Logs", path: "/admin/logs", disabled: true },
];

export function AdminNav() {
    return (
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-4">
            <h1 className="text-xs uppercase tracking-widest text-zinc-400 mb-6">
                Control Room
            </h1>

            <nav className="space-y-1">
                {NAV_ITEMS.map((item) =>
                        item.disabled ? (
                            <span
                                key={item.label}
                                className="
                block px-3 py-2 rounded
                border-l-2 border-transparent
                text-zinc-600 cursor-not-allowed
              "
                            >
              {item.label}
            </span>
                        ) : (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) =>
                                    `
                  block px-3 py-2 rounded
                  border-l-2 transition-colors
                  ${
                                        isActive
                                            ? "border-cyan-500/60 bg-zinc-800 text-white"
                                            : "border-transparent text-zinc-300 hover:bg-zinc-900"
                                    }
                `
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                )}
            </nav>
        </aside>
    );
}
