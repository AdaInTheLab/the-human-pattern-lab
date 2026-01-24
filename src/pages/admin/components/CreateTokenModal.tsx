// src/pages/admin/components/CreateTokenModal.tsx
import { useState } from "react";
import { apiBaseUrl } from "@/api/api";

type CreateTokenModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onTokenCreated: () => void;
};

type CreateState =
    | { status: "form" }
    | { status: "creating" }
    | { status: "success"; token: string; tokenId: string }
    | { status: "error"; message: string };

export function CreateTokenModal({ isOpen, onClose, onTokenCreated }: CreateTokenModalProps) {
    const [label, setLabel] = useState("");
    const [state, setState] = useState<CreateState>({ status: "form" });
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCreate = async () => {
        if (!label.trim()) {
            setState({ status: "error", message: "Label is required" });
            return;
        }

        setState({ status: "creating" });

        try {
            const res = await fetch(`${apiBaseUrl}/admin/tokens`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    label: label.trim(),
                    scopes: ["admin"],
                    expires_at: null, // Never expires
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to create token: ${res.status} ${errorText}`);
            }

            const json = await res.json();

            if (!json.ok || !json.data?.token) {
                throw new Error("Invalid response from server");
            }

            setState({
                status: "success",
                token: json.data.token,
                tokenId: json.data.id,
            });
        } catch (e: any) {
            setState({
                status: "error",
                message: e?.message ?? "Failed to create token",
            });
        }
    };

    const handleCopy = async () => {
        if (state.status === "success") {
            await navigator.clipboard.writeText(state.token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDone = () => {
        onTokenCreated();
        onClose();
        // Reset state for next time
        setState({ status: "form" });
        setLabel("");
        setCopied(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl">
                {/* Form State */}
                {state.status === "form" && (
                    <>
                        <h3 className="text-xl font-semibold text-zinc-100 mb-4">
                            Create API Token
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">
                                Token Label
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="e.g., Claude AI Agent"
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500"
                                autoFocus
                            />
                        </div>
                        <div className="text-xs text-zinc-500 mb-4">
                            This token will have <code className="text-teal-400">admin</code> scope
                            and never expire.
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors"
                            >
                                Generate Token
                            </button>
                        </div>
                    </>
                )}

                {/* Creating State */}
                {state.status === "creating" && (
                    <div className="text-center py-8">
                        <div className="text-zinc-300 mb-2">Generating token...</div>
                        <div className="text-zinc-500 text-sm">This will only take a moment</div>
                    </div>
                )}

                {/* Success State */}
                {state.status === "success" && (
                    <>
                        <h3 className="text-xl font-semibold text-teal-400 mb-4">
                            ✅ Token Created!
                        </h3>
                        <div className="bg-red-900/20 border border-red-700 rounded p-4 mb-4">
                            <div className="text-red-400 font-semibold mb-2">
                                ⚠️ Copy this token now!
                            </div>
                            <div className="text-red-300 text-sm">
                                For security reasons, this token will only be shown once.
                                If you lose it, you'll need to create a new one.
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-zinc-400 mb-2">
                                Your Bearer Token
                            </label>
                            <div className="bg-zinc-800 border border-zinc-700 rounded p-3 font-mono text-xs text-teal-300 break-all">
                                {state.token}
                            </div>
                        </div>

                        <div className="bg-zinc-800 border border-zinc-700 rounded p-3 mb-4 text-xs text-zinc-400">
                            <div className="font-semibold text-zinc-300 mb-2">
                                💡 How to use this token:
                            </div>
                            <div className="space-y-1">
                                <div>1. Copy the token above</div>
                                <div>2. Give it to your AI agent (Claude, GPT, etc.)</div>
                                <div>3. Agent can use it to create Lab Notes autonomously</div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded transition-colors"
                            >
                                {copied ? "✓ Copied!" : "Copy Token"}
                            </button>
                            <button
                                onClick={handleDone}
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </>
                )}

                {/* Error State */}
                {state.status === "error" && (
                    <>
                        <h3 className="text-xl font-semibold text-red-400 mb-4">Error</h3>
                        <div className="bg-red-900/20 border border-red-700 rounded p-4 mb-4">
                            <div className="text-red-300">{state.message}</div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setState({ status: "form" })}
                                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}