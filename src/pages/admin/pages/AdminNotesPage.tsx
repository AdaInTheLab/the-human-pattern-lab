import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";
import { Panel } from "../components/Panel";
import {SyncLabNotesPanel} from "@/pages/admin/components/SyncLabNotesPanel";

export function AdminNotesPage() {
    const navigate = useNavigate();
    const API = apiBaseUrl;

    const [notes, setNotes] = useState<any[]>([]);
    const [form, setForm] = useState({
        id: "",
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content_html: "",          // ✅ add
        read_time_minutes: 5,
        published_at: new Date().toISOString().split("T")[0],
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const refreshNotes = async () => {
        const res = await fetch(`${API}/admin/notes`, { credentials: "include" });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        const text = await res.text();
        if (!res.ok) throw new Error(`Failed to load notes (${res.status}): ${text}`);

        const json = text ? JSON.parse(text) : null;

        // Accept common shapes:
        const list =
            Array.isArray(json) ? json :
                Array.isArray(json?.notes) ? json.notes :
                    Array.isArray(json?.data?.notes) ? json.data.notes :
                        Array.isArray(json?.data) ? json.data :
                            [];

        setNotes(list);
    };

    useEffect(() => {
        console.log("API base:", API);
        refreshNotes().catch(() => navigate("/admin/login"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API, navigate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "read_time_minutes" ? Number(value) : value,
        }));
    };

    const resetForm = () => {
        setForm({
            id: "",
            title: "",
            slug: "",
            category: "",
            excerpt: "",
            content_html: "",          // ✅ add
            read_time_minutes: 5,
            published_at: new Date().toISOString().split("T")[0],
        });
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${API}/admin/notes`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                // ensure id is included when editing, so backend updates instead of creating
                id: editingId ?? form.id ?? undefined,
            }),
        });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        if (!res.ok) {
            const t = await res.text();
            console.error("Save failed:", res.status, t);
            alert(`Save failed (${res.status}). Check console.`);
            return;
        }

        await refreshNotes();
        resetForm();
    };


    const handleEdit = (note: any) => {
        setForm({
            id: note.id ?? "",
            title: note.title ?? "",
            slug: note.slug ?? "",
            category: note.category ?? "",
            excerpt: note.excerpt ?? "",
            content_html: note.content_html ?? "",
            read_time_minutes: Number(note.read_time_minutes ?? 5),
            published_at: (note.published_at ?? new Date().toISOString()).split("T")[0],
        });
        setEditingId(note.id);

    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this note?")) return;

        const res = await fetch(`${API}/admin/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        if (res.ok) await refreshNotes();
    };

    const handleNotesSync = async () => {
        const res = await fetch(`${API}/admin/notes/sync`, {
            method: "POST",
            credentials: "include", // IMPORTANT if you auth via cookies
            headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        if (!res.ok) {
            const t = await res.text();
            console.error("Import failed:", t);
            alert("Import failed. Check console.");
            return;
        }

        await refreshNotes();
    };

    const EXCERPT_SOFT_LIMIT = 280;
    const excerptLength = form.excerpt.length;
    const overLimit = excerptLength > EXCERPT_SOFT_LIMIT;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-wide text-cyan-300">
                    Shadow Fox Den
                </h1>
                <p className="text-sm uppercase tracking-widest text-zinc-500">
                    Lab Notes — Control Room
                </p>
            </div>
            <SyncLabNotesPanel />
            <Panel title="Notes">
                <div className="-mx-4 -mb-4 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/40">
                        <tr className="text-left">
                            {[
                                "Title",
                                "Slug",
                                "Dept",
                                "Type",
                                "Status",
                                "Published",
                                "Actions",
                            ].map((label) => (
                                <th
                                    key={label}
                                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-200"
                                >
        <span className="inline-flex items-center gap-1">
          {label}
            {label !== "Actions" && (
                <span className="opacity-40 select-none">↕</span>
            )}
        </span>
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/60">
                        {notes.length === 0 ? (
                            <tr>
                                <td className="px-4 py-4 text-zinc-500" colSpan={7}>
                                    No notes found.
                                </td>
                            </tr>
                        ) : (
                            notes.map((n) => (
                                <tr key={n.id} className="hover:bg-zinc-900/30">
                                    <td className="px-4 py-3 text-zinc-100">
                                        {n.title ?? <span className="text-zinc-500">(untitled)</span>}
                                        {n.locale ? (
                                            <span className="ml-2 text-xs text-zinc-500">[{n.locale}]</span>
                                        ) : null}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-zinc-300">{n.slug}</td>
                                    <td className="px-4 py-3 text-zinc-300">{n.department_id ?? "—"}</td>
                                    <td className="px-4 py-3 text-zinc-300">{n.type ?? "—"}</td>
                                    <td className="px-4 py-3 text-zinc-300">{n.status ?? "—"}</td>
                                    <td className="px-4 py-3 text-zinc-300">{n.published_at ?? "—"}</td>

                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(n)}
                                                className="rounded-md border bg-cyan-500/10 px-3 py-1 text-cyan-300 hover:bg-cyan-500/20"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(n.id)}
                                                className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1 text-red-300 hover:bg-red-500/20"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </Panel>


            {/* Editor */}
            <Panel title={editingId ? "Edit Note" : "New Note"} >
                <Panel title={editingId ? "Edit Note" : "New Note"}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                    placeholder="Note title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Slug
                                </label>
                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 font-mono text-zinc-100"
                                    placeholder="my-note-slug"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Category
                                </label>
                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                    placeholder="systems / lore / debug / etc"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Published Date
                                </label>
                                <input
                                    type="date"
                                    name="published_at"
                                    value={form.published_at}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Read Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    name="read_time_minutes"
                                    value={form.read_time_minutes}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block space-y-1">
                                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                                    Excerpt (preview surface)
                                  </span>

                                <textarea
                                    name="excerpt"
                                    value={form.excerpt}
                                    onChange={handleChange}
                                    className={`
                              h-24 w-full resize-y rounded-lg
                              border bg-zinc-950/40 px-3 py-2 text-zinc-100
                              ${overLimit ? "border-vesper/60 ring-1 ring-vesper/40" : "border-zinc-800"}
                            `}
                                                            placeholder="Short summary shown in lists"
                                                        />

                                                        <div
                                                            className={`
                              flex justify-between text-xs font-mono
                              ${overLimit ? "text-vesper" : "text-zinc-500"}
                            `}
                                                        >
                            <span>
                              Used on cards and previews. Full body lives in MD source.
                            </span>

                                                            <span>
                              {excerptLength} / {EXCERPT_SOFT_LIMIT}
                                                                {overLimit && " · preview overflow"}
                            </span>
                                </div>
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="submit"
                                className="rounded-lg border bg-cyan-500/15 px-4 py-2 font-medium text-cyan-200 hover:bg-cyan-500/25"
                            >
                                {editingId ? "Save Changes" : "Create Note"}
                            </button>

                            {editingId ? (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border bg-zinc-800/60 px-4 py-2 font-medium text-zinc-200 hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                            ) : null}
                        </div>
                    </form>
                </Panel>

            </Panel>
        </div>
    );
}