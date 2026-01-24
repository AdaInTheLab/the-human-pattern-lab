// src/pages/admin/pages/AdminTokensPage.tsx
import { useEffect, useMemo, useState } from "react";
import { apiBaseUrl } from "@/api/api";
import { CreateTokenModal } from "../components/CreateTokenModal";

type TokenRow = {
    id: string;
    label: string;
    scopes: string[];
    is_active: number;
    expires_at: string | null;
    created_at: string;
    last_used_at: string | null;
};

type LoadState =
    | { status: "loading" }
    | { status: "error"; message: string; code?: number }
    | { status: "ready" };

function formatMaybeDate(iso: string | null) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso; // fallback: show raw
    return d.toLocaleString();
}

function parseTokensPayload(json: any): TokenRow[] {
    // Accept a few shapes so the page doesn't break when backend evolves:
    // { data: [...] }
    // { tokens: [...] }
    // { data: { tokens: [...] } }
    const direct = json?.data ?? json?.tokens ?? json?.data?.tokens;
    if (Array.isArray(direct)) return direct as TokenRow[];
    return [];
}

export function AdminTokensPage() {
    const API = apiBaseUrl;
    const [tokens, setTokens] = useState<TokenRow[]>([]);
    const [state, setState] = useState<LoadState>({ status: "loading" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // stable key in case apiBaseUrl is derived; avoids weird reruns
    const url = useMemo(() => `${API}/admin/tokens`, [API]);

    const loadTokens = async () => {
        setState({ status: "loading" });
        try {
            const res = await fetch(url, {
                credentials: "include",
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                // Try to extract server-provided message
                let serverMsg = "";
                try {
                    const maybeJson = await res.json();
                    serverMsg = maybeJson?.error ?? maybeJson?.message ?? "";
                } catch {
                    // ignore json parse errors; maybe non-json
                }

                const hint =
                    res.status === 401
                        ? "Not authenticated (401). Try logging in again."
                        : res.status === 403
                            ? "Authenticated but not authorized (403)."
                            : res.status >= 500
                                ? "Server error. Check API logs."
                                : "Request failed.";

                throw Object.assign(new Error(serverMsg || hint), { code: res.status });
            }

            const json = await res.json();
            const rows = parseTokensPayload(json);

            setTokens(rows);
            setState({ status: "ready" });
        } catch (e: any) {
            if (e?.name === "AbortError") return;

            setState({
                status: "error",
                message: e?.message ?? "Failed to load tokens",
                code: e?.code,
            });
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        loadTokens();
        return () => controller.abort();
    }, [url]);

    const handleTokenCreated = () => {
        // Reload the token list
        loadTokens();
    };

    if (state.status === "loading") {
        return <div className="p-6 text-zinc-300">Loading API tokens…</div>;
    }

    if (state.status === "error") {
        return (
            <div className="p-6">
                <div className="text-red-400 font-medium">Failed to load tokens</div>
                <div className="text-zinc-400 text-sm mt-1">
                    {state.code ? `HTTP ${state.code} — ` : null}
                    {state.message}
                </div>
                <div className="text-zinc-500 text-xs mt-3">
                    If this is a 401/403, it's an auth/permissions issue. If it's 5xx,
                    it's backend.
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-zinc-100">API Tokens</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors font-medium"
                >
                    + Create Token
                </button>
            </div>

            {tokens.length === 0 ? (
                <div className="text-zinc-400">
                    No tokens minted yet. Create one to get started!
                </div>
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
                                {t.scopes?.length ? t.scopes.join(", ") : "—"}
                            </td>
                            <td className="px-3 py-2 text-center">
                                {t.is_active ? "✅" : "❌"}
                            </td>
                            <td className="px-3 py-2 text-xs text-zinc-400">
                                {formatMaybeDate(t.last_used_at)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <CreateTokenModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTokenCreated={handleTokenCreated}
            />
        </div>
    );
}