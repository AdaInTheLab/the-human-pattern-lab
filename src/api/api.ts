const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";
export const API_BASE_URL = rawBase.replace(/\/$/, ""); // no trailing slash

export function apiUrl(path: string) {
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${p}`;
}
