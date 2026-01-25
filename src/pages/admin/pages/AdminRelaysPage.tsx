// src/pages/admin/pages/AdminRelaysPage.tsx
import { useEffect, useMemo, useState } from "react";
import { apiBaseUrl } from "@/api/api";

type RelaySession = {
    id: string;
    voice: string;
    created_at: string;
    expires_at: string;
    used: boolean;
    used_at: string | null;
};

type LoadState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready" };

const VOICES = ["lyric", "coda", "sage", "vesper"] as const;
const EXPIRY_OPTIONS = [
    { label: "1 hour", value: "1h" },
    { label: "2 hours", value: "2h" },
    { label: "6 hours", value: "6h" },
    { label: "24 hours", value: "24h" },
] as const;

function formatDate(iso: string | null) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
}

function isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
}

export function AdminRelaysPage() {
    const API = apiBaseUrl;
    const [relays, setRelays] = useState<RelaySession[]>([]);
    const [state, setState] = useState<LoadState>({ status: "loading" });
    
    // Generation form
    const [selectedVoice, setSelectedVoice] = useState<string>("sage");
    const [selectedExpiry, setSelectedExpiry] = useState<string>("1h");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

    const listUrl = useMemo(() => `${API}/admin/relay/list`, [API]);
    const generateUrl = useMemo(() => `${API}/admin/relay/generate`, [API]);

    const loadRelays = async () => {
        setState({ status: "loading" });
        try {
            const res = await fetch(listUrl, {
                credentials: "include",
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Failed to load relays: ${res.status}`);
            }

            const json = await res.json();
            setRelays(json.relays || []);
            setState({ status: "ready" });
        } catch (err: any) {
            setState({ status: "error", message: err.message });
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedUrl(null);

        try {
            const res = await fetch(generateUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    voice: selectedVoice,
                    expires: selectedExpiry,
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to generate relay: ${res.status}`);
            }

            const json = await res.json();
            const fullUrl = json.url.replace("http://localhost:3001", API);
            setGeneratedUrl(fullUrl);
            
            // Reload the list
            await loadRelays();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyUrl = () => {
        if (generatedUrl) {
            navigator.clipboard.writeText(generatedUrl);
            alert("Relay URL copied to clipboard!");
        }
    };

    const handleRevoke = async (relayId: string) => {
        if (!confirm(`Revoke relay ${relayId}?`)) return;

        try {
            const res = await fetch(`${API}/admin/relay/revoke`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ relay_id: relayId }),
            });

            if (!res.ok) {
                throw new Error(`Failed to revoke: ${res.status}`);
            }

            await loadRelays();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        loadRelays();
    }, [listUrl]);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-100">Relay Management</h1>
                <p className="text-slate-400 mt-2">
                    Generate temporary, single-use relay URLs for AI agents.
                </p>
            </div>

            {/* Generate Section */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    Generate New Relay
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Voice Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Voice
                        </label>
                        <select
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                        >
                            {VOICES.map((voice) => (
                                <option key={voice} value={voice}>
                                    {voice.charAt(0).toUpperCase() + voice.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Expiry Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Expires In
                        </label>
                        <select
                            value={selectedExpiry}
                            onChange={(e) => setSelectedExpiry(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-blue-500"
                        >
                            {EXPIRY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Generate Button */}
                    <div className="flex items-end">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded font-medium transition-colors"
                        >
                            {isGenerating ? "Generating..." : "Generate Relay"}
                        </button>
                    </div>
                </div>

                {/* Generated URL Display */}
                {generatedUrl && (
                    <div className="mt-4 p-4 bg-slate-900 rounded border border-green-600">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-400">
                                ✓ Relay Generated
                            </span>
                            <button
                                onClick={handleCopyUrl}
                                className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
                            >
                                Copy URL
                            </button>
                        </div>
                        <code className="block text-sm text-slate-300 break-all">
                            {generatedUrl}
                        </code>
                    </div>
                )}
            </div>

            {/* Active Relays List */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-100">Active Relays</h2>
                    <button
                        onClick={loadRelays}
                        className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
                    >
                        Refresh
                    </button>
                </div>

                {state.status === "loading" && (
                    <div className="text-slate-400">Loading relays...</div>
                )}

                {state.status === "error" && (
                    <div className="text-red-400">Error: {state.message}</div>
                )}

                {state.status === "ready" && relays.length === 0 && (
                    <div className="text-slate-400">No active relays</div>
                )}

                {state.status === "ready" && relays.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                                        Relay ID
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                                        Voice
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                                        Expires
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {relays.map((relay) => {
                                    const expired = isExpired(relay.expires_at);
                                    const statusColor = relay.used
                                        ? "text-slate-500"
                                        : expired
                                            ? "text-orange-400"
                                            : "text-green-400";

                                    return (
                                        <tr
                                            key={relay.id}
                                            className="border-b border-slate-700 hover:bg-slate-700/50"
                                        >
                                            <td className="py-3 px-4 text-sm font-mono text-slate-300">
                                                {relay.id.replace("relay_", "")}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-300 capitalize">
                                                {relay.voice}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-400">
                                                {formatDate(relay.expires_at)}
                                            </td>
                                            <td className={`py-3 px-4 text-sm font-medium ${statusColor}`}>
                                                {relay.used
                                                    ? "Used"
                                                    : expired
                                                        ? "Expired"
                                                        : "Active"}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {!relay.used && !expired && (
                                                    <button
                                                        onClick={() => handleRevoke(relay.id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        Revoke
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-300 mb-2">
                    🏛️ About Relay URLs
                </h3>
                <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Each relay URL is <strong>single-use</strong> and <strong>time-limited</strong></li>
                    <li>• Hand the URL to an AI agent (like ChatGPT)</li>
                    <li>• The agent can POST to create a Lab Note without managing bearer tokens</li>
                    <li>• After use, the relay automatically closes</li>
                </ul>
            </div>
        </div>
    );
}
