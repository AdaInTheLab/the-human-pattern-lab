// src/pages/admin/pages/AdminTokensPage.tsx
import { useEffect, useState } from "react";
import { apiBaseUrl } from "@/api/api";

type TokenRow = {
    id: string;
    label: string;
    scopes: string[];
    is_active: number;
    expires_at: string | null;
    created_at: string;
    last_used_at: string | null;
};

export function AdminTokensPage() {
    const API = apiBaseUrl;
    const [tokens, setTokens] = useState<TokenRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                const res = await fetch(`${API}/admin/tokens`, {
                    credentials: "include",
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const json = await res.json();
                if (!alive) return;

                setTokens(json.data ?? []);
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message ?? "Failed to load tokens");
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, [API]);

    if (loading) {
        return <div className="p-6 text-zinc-300">Loading API tokens…</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-red-400">
                Failed to load tokens: {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                API Tokens
            </h2>

            {tokens.length === 0 ? (
                <div className="text-zinc-400">No tokens minted yet.</div>
            ) : (
                <table className="w-full text-sm text-zinc-300 border border-zinc-800">
                    <thead className="bg-zinc-900 text-zinc-400">
                    <tr>
                        <th className="px-3 py-2 text-left">Label</th>
                        <th className="px-3 py-2 text-left">Scopes</th>
                        <th className="px-3 py-2">Active</th>
                        <th className="px-3 py-2">Last Used</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tokens.map((t) => (
                        <tr key={t.id} className="border-t border-zinc-800">
                            <td className="px-3 py-2">{t.label}</td>
                            <td className="px-3 py-2 font-mono text-xs">
                                {t.scopes.join(", ")}
                            </td>
                            <td className="px-3 py-2 text-center">
                                {t.is_active ? "✅" : "❌"}
                            </td>
                            <td className="px-3 py-2 text-xs text-zinc-400">
                                {t.last_used_at ?? "—"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
