type ApiTokenRow = {
    id: string;
    label: string;
    scopes: string[];
    is_active: 0 | 1;
    expires_at: string | null;
    created_by_user: string | null;
    last_used_at: string | null;
    created_at: string;
};

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error?: { code?: string; message?: string } };

function apiBase(): string {
    // match whatever you do elsewhere (VITE_API_BASE_URL, etc.)
    return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8001";
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${apiBase()}${path}`, {
        credentials: "include", // IMPORTANT for GitHub session cookie auth
        headers: {
            "content-type": "application/json",
            ...(init?.headers ?? {}),
        },
        ...init,
    });

    const json = (await res.json().catch(() => ({}))) as any;

    if (!res.ok) {
        const msg = json?.error?.message || json?.error || `HTTP ${res.status}`;
        throw new Error(msg);
    }
    return json as T;
}

export const adminTokensClient = {
    async list(): Promise<ApiTokenRow[]> {
        const out = await apiFetch<ApiOk<ApiTokenRow[]> | ApiErr>("/admin/tokens");
        if (!("ok" in out) || (out as any).ok !== true) throw new Error("Request failed");
        return (out as ApiOk<ApiTokenRow[]>).data;
    },

    async mint(input: { label: string; scopes: string[]; expires_at?: string | null }): Promise<{ id: string; token: string }> {
        const out = await apiFetch<ApiOk<{ id: string; token: string }> | ApiErr>("/admin/tokens", {
            method: "POST",
            body: JSON.stringify(input),
        });
        if ((out as any).ok !== true) throw new Error("Request failed");
        return (out as ApiOk<{ id: string; token: string }>).data;
    },

    async revoke(id: string): Promise<void> {
        const out = await apiFetch<{ ok: true } | ApiErr>(`/admin/tokens/${id}/revoke`, {
            method: "POST",
        });
        if ((out as any).ok !== true) throw new Error("Request failed");
    },
};
