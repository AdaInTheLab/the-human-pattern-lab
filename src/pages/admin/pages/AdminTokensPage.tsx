// src/pages/admin/pages/AdminTokensPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Ban } from "lucide-react";
import { apiBaseUrl } from "@/api/api";
import { CreateTokenModal } from "../components/CreateTokenModal";
import { useToast } from "@/pages/admin/components/Toast";

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
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
}

function parseTokensPayload(json: any): TokenRow[] {
    const direct = json?.data ?? json?.tokens ?? json?.data?.tokens;
    if (Array.isArray(direct)) return direct as TokenRow[];
    return [];
}

export function AdminTokensPage() {
    const API = apiBaseUrl;
    const navigate = useNavigate();
    const toast = useToast();
    const [tokens, setTokens] = useState<TokenRow[]>([]);
    const [state, setState] = useState<LoadState>({ status: "loading" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmingRevokeId, setConfirmingRevokeId] = useState<string | null>(null);
    const [revokingId, setRevokingId] = useState<string | null>(null);

    const url = useMemo(() => `${API}/admin/tokens`, [API]);

    const loadTokens = async () => {
        setState({ status: "loading" });
        try {
            const res = await fetch(url, {
                credentials: "include",
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                let serverMsg = "";
                try {
                    const maybeJson = await res.json();
                    serverMsg = maybeJson?.error ?? maybeJson?.message ?? "";
                } catch {
                    // ignore
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const handleTokenCreated = () => {
        loadTokens();
    };

    const handleRevoke = async (id: string, label: string) => {
        setRevokingId(id);
        try {
            const res = await fetch(`${API}/admin/tokens/${encodeURIComponent(id)}/revoke`, {
                method: "POST",
                credentials: "include",
            });

            if (res.status === 401) return navigate("/admin/login");
            if (res.status === 403) return navigate("/admin/denied");

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                console.error("Revoke failed:", res.status, text);
                toast.error(`Revoke failed (${res.status})`, "Check console for details.");
                return;
            }

            toast.success("Token revoked", label);
            setConfirmingRevokeId(null);
            await loadTokens();
        } finally {
            setRevokingId(null);
        }
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
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
                >
                    <Plus aria-hidden className="h-4 w-4" />
                    Create Token
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
                            <th className="px-3 py-2">Status</th>
                            <th className="px-3 py-2">Last Used</th>
                            <th className="px-3 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((t) => {
                            const isActive = Boolean(t.is_active);
                            const isConfirming = confirmingRevokeId === t.id;
                            const isRevoking = revokingId === t.id;

                            return (
                                <tr key={t.id} className="border-t border-zinc-800">
                                    <td className={`px-3 py-2 ${isActive ? "" : "text-zinc-500 line-through"}`}>
                                        {t.label}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-xs">
                                        {t.scopes?.length ? (
                                            <div className="flex flex-wrap gap-1">
                                                {t.scopes.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {isActive ? (
                                            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                                                active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                                revoked
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-zinc-400">
                                        {formatMaybeDate(t.last_used_at)}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        {isActive ? (
                                            isConfirming ? (
                                                <div className="inline-flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRevoke(t.id, t.label)}
                                                        disabled={isRevoking}
                                                        className="rounded border border-red-500/40 bg-red-500/20 px-2 py-0.5 text-[11px] font-medium text-red-200 disabled:opacity-50"
                                                    >
                                                        {isRevoking ? "Revoking…" : "Confirm"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmingRevokeId(null)}
                                                        className="rounded border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-400 hover:text-zinc-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmingRevokeId(t.id)}
                                                    title="Revoke token"
                                                    className="inline-flex items-center gap-1 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/20"
                                                >
                                                    <Ban aria-hidden className="h-3.5 w-3.5" />
                                                    Revoke
                                                </button>
                                            )
                                        ) : (
                                            <span className="text-[11px] text-zinc-600">—</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
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
