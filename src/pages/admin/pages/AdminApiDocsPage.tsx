import { Panel } from "@/pages/admin/components/Panel";
import { apiBaseUrl } from "@/api/api";

function CodeBlock({ children }: { children: string }) {
    return (
        <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 overflow-x-auto text-xs text-zinc-200">
      <code>{children}</code>
    </pre>
    );
}

function EndpointRow({
                         method,
                         path,
                         desc,
                     }: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    desc: string;
}) {
    const methodClass =
        method === "GET"
            ? "text-emerald-400"
            : method === "POST"
                ? "text-cyan-400"
                : method === "PUT"
                    ? "text-yellow-400"
                    : "text-red-400";

    return (
        <div className="flex items-start justify-between gap-4 py-2 border-t border-zinc-800 first:border-t-0">
            <div className="min-w-0">
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold ${methodClass}`}>{method}</span>
                    <span className="font-mono text-sm text-zinc-200 truncate">{path}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{desc}</p>
            </div>
        </div>
    );
}

export function AdminApiDocsPage() {
    const API = apiBaseUrl();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-wide text-cyan-300">
                    Admin API Docs
                </h1>
                <p className="text-sm uppercase tracking-widest text-zinc-500">
                    Control Room Reference
                </p>
            </div>

            <Panel title="Base URL">
                <div className="space-y-3">
                    <p className="text-sm text-zinc-400">
                        All routes below are relative to:
                    </p>
                    <CodeBlock>{API}</CodeBlock>
                </div>
            </Panel>

            <Panel title="Auth Semantics">
                <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                    <p>
                        These admin endpoints are protected by session auth (GitHub OAuth).
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <span className="text-zinc-300 font-medium">401 Unauthorized</span>{" "}
                            — not logged in (no valid session)
                        </li>
                        <li>
                            <span className="text-zinc-300 font-medium">403 Forbidden</span>{" "}
                            — logged in, but not on the admin allowlist
                        </li>
                    </ul>
                    <p className="text-xs text-zinc-500 italic">
                        “Carmel squints at invalid slugs.” (Translation: API may validate.)
                    </p>
                </div>
            </Panel>

            <Panel title="Endpoints">
                <div className="space-y-1">
                    <EndpointRow
                        method="GET"
                        path="/admin/notes"
                        desc="List notes (admin view)."
                    />
                    <EndpointRow
                        method="POST"
                        path="/admin/notes"
                        desc="Create a note (or upsert by slug depending on API behavior)."
                    />
                    <EndpointRow
                        method="PUT"
                        path="/admin/notes/:id"
                        desc="Update a note by id."
                    />
                    <EndpointRow
                        method="DELETE"
                        path="/admin/notes/:id"
                        desc="Delete a note by id."
                    />
                    <EndpointRow
                        method="GET"
                        path="/health"
                        desc="Service health check."
                    />
                </div>
            </Panel>

            <Panel title="Quick Calls">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-zinc-400 mb-2">List notes</p>
                        <CodeBlock>{`curl -i "${API}/admin/notes" --cookie-jar cookies.txt --cookie cookies.txt`}</CodeBlock>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-400 mb-2">Create / upsert note</p>
                        <CodeBlock>{`curl -i -X POST "${API}/admin/notes" \\
  -H "Content-Type: application/json" \\
  --cookie-jar cookies.txt --cookie cookies.txt \\
  -d '{
    "title": "The Quiet Flame",
    "slug": "the-quiet-flame",
    "category": "labnote",
    "excerpt": "Some knowledge is meant to warm, not burn.",
    "read_time_minutes": 3,
    "published_at": "2026-01-02"
  }'`}</CodeBlock>
                    </div>
                </div>
            </Panel>
        </div>
    );
}
