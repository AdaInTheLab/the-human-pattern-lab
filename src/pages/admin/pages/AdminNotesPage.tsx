import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";
import { Panel } from "../components/Panel";

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
        read_time_minutes: 5,
        published_at: new Date().toISOString().split("T")[0],
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const refreshNotes = async () => {
        const res = await fetch(`${API}/admin/notes`, { credentials: "include" });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");
        if (!res.ok) throw new Error("Failed to load notes");

        setNotes(await res.json());
    };

    useEffect(() => {
        refreshNotes().catch(() => navigate("/admin/login"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API, navigate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({
            id: "",
            title: "",
            slug: "",
            category: "",
            excerpt: "",
            read_time_minutes: 5,
            published_at: new Date().toISOString().split("T")[0],
        });
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API}/admin/notes/${editingId}`
            : `${API}/admin/notes`;

        const res = await fetch(url, {
            method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        if (res.ok) {
            await refreshNotes();
            resetForm();
        }
    };

    const handleEdit = (note: any) => {
        setForm(note);
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

            {/* Notes table */}
            <Panel title="Notes">
                <div className="-mx-4 -mb-4">
                    {/* ...your table exactly as-is... */}
                </div>
            </Panel>

            {/* Editor */}
            <Panel title={editingId ? "Edit Note" : "New Note"} >
                {/* your form exactly as-is */}
            </Panel>
        </div>
    );
}