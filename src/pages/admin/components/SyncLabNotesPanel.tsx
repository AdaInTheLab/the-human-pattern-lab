import { useState } from "react";

type SyncResult = {
    ok: true;
    rootDir: string;
    locales: string[];
    scanned: number;
    upserted: number;
    skipped: number;
    errors: Array<{ file: string; error: string }>;
};

type SyncError = {
    ok?: false;
    error: string;
};

type Result = SyncResult | SyncError | null;

export function SyncLabNotesPanel() {
    const [syncing, setSyncing] = useState(false);
    const [result, setResult] = useState<Result>(null);

    async function runSync() {
        setSyncing(true);
        setResult(null);

        try {
            const res = await fetch("/api/admin/notes/sync", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.ok === false) {
                throw new Error(data?.error || `Sync failed (${res.status})`);
            }

            setResult(data);
        } catch (err: any) {
            setResult({ ok: false, error: err?.message ?? String(err) });
        } finally {
            setSyncing(false);
        }
    }

    return (
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <header className="flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-widest text-zinc-400">
                    Markdown Sync
                </h2>

                <button
                    onClick={runSync}
                    disabled={syncing}
                    className="
            px-3 py-2 rounded-md text-sm
            bg-zinc-800 hover:bg-zinc-700
            disabled:opacity-50 disabled:cursor-not-allowed
          "
                >
                    {syncing ? "Syncing…" : "Sync Markdown → DB"}
                </button>
            </header>

            {result && "error" in result && (
                <div className="text-sm text-red-400">
                    ❌ {result.error}
                </div>
            )}

            {result && "ok" in result && result.ok && (
                <div className="text-sm text-zinc-300 space-y-1">
                    <div>📁 Root: <span className="text-zinc-400">{result.rootDir}</span></div>
                    <div>🌍 Locales: {result.locales.join(", ")}</div>
                    <div>📄 Scanned: {result.scanned}</div>
                    <div>✏️ Upserted: {result.upserted}</div>
                    <div>⏭ Skipped: {result.skipped}</div>

                    {result.errors.length > 0 && (
                        <details className="mt-2">
                            <summary className="cursor-pointer text-red-300">
                                ⚠ Errors ({result.errors.length})
                            </summary>
                            <ul className="mt-2 space-y-1">
                                {result.errors.map((e, i) => (
                                    <li key={i} className="text-xs text-red-200">
                                        {e.file}: {e.error}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    )}
                </div>
            )}
        </section>
    );
}
