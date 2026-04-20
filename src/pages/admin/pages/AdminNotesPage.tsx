import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { apiBaseUrl } from "@/api/api";
import { Panel } from "../components/Panel";
import {SyncLabNotesPanel} from "@/pages/admin/components/SyncLabNotesPanel";
import { MarkdownEditor } from "@/pages/admin/components/MarkdownEditor.lazy";
import { NoteCard } from "@/pages/admin/components/NoteCard";
import { useToast } from "@/pages/admin/components/Toast";
import { slugify } from "@/pages/admin/utils/slugify";
import { Drawer } from "@/pages/admin/components/Drawer";
import { RevisionHistory } from "@/pages/admin/components/RevisionHistory";

type NoteType = "labnote" | "paper" | "memo" | "lore" | "weather" | "tail";

type AdminNotesPageProps = {
    /** When set, list is filtered to this type, form locks to it, and the type field is hidden. */
    fixedType?: NoteType;
    /** Header overrides for scoped views (e.g. "Notebook"). */
    heading?: string;
    eyebrow?: string;
};

const blankFormFor = (fixedType?: NoteType) => ({
    id: "",
    title: "",
    subtitle: "",
    slug: "",
    locale: "en",
    type: fixedType ?? "labnote",
    status: "draft",

    department_id: "SCMS",
    dept: "",
    card_style: "",

    category: "",
    excerpt: "",
    summary: "",

    content_markdown: "",

    shadow_density: 4,
    coherence_score: 1.0,
    safer_landing: true,
    read_time_minutes: 5,
    published_at: new Date().toISOString().split("T")[0],
});

export function AdminNotesPage({ fixedType, heading, eyebrow }: AdminNotesPageProps = {}) {
    const navigate = useNavigate();
    const toast = useToast();
    const API = apiBaseUrl;
    const formRef = useRef<HTMLFormElement | null>(null);

    const [notes, setNotes] = useState<any[]>([]);
    const [form, setForm] = useState(blankFormFor(fixedType));
    const [baseline, setBaseline] = useState(blankFormFor(fixedType));
    const [slugTouched, setSlugTouched] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [revisionsRefreshKey, setRevisionsRefreshKey] = useState(0);

    const [editingId, setEditingId] = useState<string | null>(null);
    const isEditing = Boolean(editingId);

    const isDirty = useMemo(
        () => JSON.stringify(form) !== JSON.stringify(baseline),
        [form, baseline]
    );

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

    const filteredNotes = useMemo(
        () => (fixedType ? notes.filter((n) => n?.type === fixedType) : notes),
        [notes, fixedType]
    );

    useEffect(() => {
        refreshNotes().catch(() => navigate("/admin/login"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API, navigate]);

    // Unsaved changes guard
    useEffect(() => {
        if (!isDirty) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [isDirty]);

    // Cmd/Ctrl+S submits the form (only when the drawer is open)
    useEffect(() => {
        if (!drawerOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
                if (!formRef.current) return;
                e.preventDefault();
                formRef.current.requestSubmit();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [drawerOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "title") {
            setForm((prev) => ({
                ...prev,
                title: value,
                // Auto-generate slug while creating + slug untouched
                slug: !slugTouched && !isEditing ? slugify(value) : prev.slug,
            }));
            return;
        }

        if (name === "slug") {
            setSlugTouched(true);
        }

        setForm((prev) => ({
            ...prev,
            [name]: name === "read_time_minutes" ? Number(value) : value,
        }));
    };

    const resetForm = () => {
        const blank = blankFormFor(fixedType);
        setForm(blank);
        setBaseline(blank);
        setSlugTouched(false);
        setEditingId(null);
    };

    const openForNew = () => {
        resetForm();
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        resetForm();
        setDrawerOpen(false);
    };

    const requestCloseDrawer = () => {
        if (isDirty) {
            const ok = window.confirm("Discard unsaved changes?");
            if (!ok) return false;
        }
        closeDrawer();
    };

    const CARD_STYLE_OPTIONS = [
        { value: "", label: "Auto (from department)" },
        { value: "scms", label: "SCMS (neutral)" },
        { value: "vesper", label: "Vesper (purple)" },
        { value: "sage", label: "Sage (emerald)" },
        { value: "lyric", label: "Lyric (neon green)" },
        { value: "coda", label: "Coda (amber)" },
    ];

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
            toast.error(`Save failed (${res.status})`, "Check console for details.");
            return;
        }

        toast.success(isEditing ? "Note updated" : "Note created", form.title || form.slug);
        await refreshNotes();
        setRevisionsRefreshKey((k) => k + 1);
        closeDrawer();
    };

    const handleEdit = async (note: any) => {
        // optional but recommended: fetch full record (includes content_markdown)
        const res = await fetch(
            `${API}/admin/notes/${encodeURIComponent(note.slug)}?locale=${encodeURIComponent(note.locale ?? "en")}`,
            { credentials: "include" }
        );
        const full = res.ok ? await res.json() : note;

        const nextForm = {
            id: full.id ?? "",
            title: full.title ?? "",
            subtitle: full.subtitle ?? "",
            slug: full.slug ?? "",
            locale: full.locale ?? "en",
            type: fixedType ?? full.type ?? "labnote",
            status: full.status ?? "draft",

            department_id: full.department_id ?? "SCMS",
            dept: full.dept ?? "",
            card_style: full.card_style ?? "",

            category: full.category ?? "",
            excerpt: full.excerpt ?? "",
            summary: full.summary ?? "",

            content_markdown: full.content_markdown ?? "",

            shadow_density: Number(full.shadow_density ?? 4),
            coherence_score: Number(full.coherence_score ?? 1.0),
            safer_landing: Boolean(full.safer_landing ?? true),
            read_time_minutes: Number(full.read_time_minutes ?? 5),
            published_at: (full.published_at ?? new Date().toISOString()).split("T")[0],
        };
        setForm(nextForm);
        setBaseline(nextForm);
        setSlugTouched(true);

        setEditingId(full.id);
        setDrawerOpen(true);
    };

    const handleDelete = async (id: string, label?: string) => {
        const res = await fetch(`${API}/admin/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");

        if (res.ok) {
            toast.success("Note deleted", label);
            await refreshNotes();
        } else {
            toast.error("Delete failed", `Status ${res.status}`);
        }
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
            toast.error("Markdown sync failed", "Check console for details.");
            return;
        }

        toast.success("Markdown sync complete");
        await refreshNotes();
    };

    const EXCERPT_SOFT_LIMIT = 280;
    const excerptLength = form.summary.length;
    const overLimit = excerptLength > EXCERPT_SOFT_LIMIT;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-wide text-cyan-300">
                        {heading ?? "Shadow Fox Den"}
                    </h1>
                    <p className="text-sm uppercase tracking-widest text-zinc-500">
                        {eyebrow ?? "Lab Notes — Control Room"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={openForNew}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
                >
                    <Plus aria-hidden className="h-4 w-4" />
                    {fixedType === "labnote" ? "New Note" : "New"}
                </button>
            </div>
            <SyncLabNotesPanel />
            <Panel title={`Notes (${filteredNotes.length})`}>
                {filteredNotes.length === 0 ? (
                    <p className="text-sm text-zinc-500">No notes found.</p>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {filteredNotes.map((n) => (
                            <NoteCard
                                key={n.id}
                                note={n}
                                onEdit={() => handleEdit(n)}
                                onDelete={() => handleDelete(n.id, n.title ?? n.slug)}
                            />
                        ))}
                    </div>
                )}
            </Panel>

            {/* Editor drawer */}
            <Drawer
                open={drawerOpen}
                onClose={closeDrawer}
                onRequestClose={requestCloseDrawer}
                eyebrow={fixedType === "labnote" ? "Notebook" : "Note"}
                title={isEditing ? form.title || form.slug || "Edit note" : "New note"}
                headerRight={
                    isDirty ? (
                        <span className="text-xs text-amber-400/80">Unsaved</span>
                    ) : null
                }
                footer={
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => formRef.current?.requestSubmit()}
                            className="rounded-lg border bg-cyan-500/15 px-4 py-2 font-medium text-cyan-200 hover:bg-cyan-500/25"
                        >
                            {editingId ? "Save changes" : "Create note"}
                        </button>
                        <button
                            type="button"
                            onClick={requestCloseDrawer}
                            className="rounded-lg border bg-zinc-800/60 px-4 py-2 font-medium text-zinc-200 hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <span className="ml-auto text-[11px] text-zinc-600">
                            <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">⌘S</kbd>{" "}
                            to save
                        </span>
                    </div>
                }
            >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                            {/* SUBTITLE*/}
                            <label className="block">
                                <div className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
                                    Subtitle <span className="text-zinc-600">(card hook)</span>
                                </div>
                                <input
                                    value={form.subtitle ?? ""}
                                    onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100"
                                    placeholder="One sentence. Shows on cards + hover."
                                    maxLength={180}
                                />
                            </label>
                            {/* SLUG*/}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">
                                    Slug
                                    {!slugTouched && !isEditing && form.title ? (
                                        <span className="ml-2 normal-case tracking-normal text-[10px] text-zinc-600">
                                            auto from title
                                        </span>
                                    ) : null}
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

                            {/* DEPARTMENT / TYPE / LOCALE */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500">Department</label>
                                    <input name="department_id" value={form.department_id}
                                           readOnly={isEditing}
                                           onChange={handleChange}
                                           className={`w-full rounded-lg border px-3 py-2 ${
                                               isEditing
                                                   ? "border-zinc-800 bg-zinc-950/40 text-zinc-400 cursor-not-allowed"
                                                   : "border-zinc-800 bg-zinc-950/40 text-zinc-100"
                                           }`} />
                                </div>
                                {fixedType ? null : (
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-zinc-500">Type</label>
                                        <input name="type" value={form.type}
                                               readOnly={isEditing}
                                               onChange={handleChange}
                                               className={`w-full rounded-lg border px-3 py-2 ${
                                                   isEditing
                                                       ? "border-zinc-800 bg-zinc-950/40 text-zinc-400 cursor-not-allowed"
                                                       : "border-zinc-800 bg-zinc-950/40 text-zinc-100"
                                               }`} />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500">Locale</label>
                                    <input name="locale" value={form.locale}
                                           readOnly={isEditing}
                                           onChange={handleChange}
                                           className={`w-full rounded-lg border px-3 py-2 ${
                                               isEditing
                                                   ? "border-zinc-800 bg-zinc-950/40 text-zinc-400 cursor-not-allowed"
                                                   : "border-zinc-800 bg-zinc-950/40 text-zinc-100"
                                           }`} />
                                </div>
                            </div>


                            {/* CATEGORY / READ TIME / STYLE */}
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Category */}
                                <label className="block">
                                    <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                        Category
                                    </div>
                                    <input
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                        placeholder="systems / lore / debug / etc"
                                    />
                                </label>

                                {/* Read Time */}
                                <label className="block">
                                    <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                        Read Time (minutes)
                                    </div>
                                    <input
                                        type="number"
                                        min={1}
                                        name="read_time_minutes"
                                        value={form.read_time_minutes}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                    />
                                </label>

                                {/* Card Style */}
                                <label className="block">
                                    <div className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                                        Card Style <span className="text-zinc-600">(override)</span>
                                    </div>
                                    <select
                                        value={form.card_style ?? ""}
                                        onChange={(e) =>
                                            setForm((p) => ({ ...p, card_style: e.target.value }))
                                        }
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100"
                                    >
                                        {CARD_STYLE_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="mt-1 text-[11px] text-zinc-500">
                                        Presentation only. Does not change ownership/department.
                                    </div>
                                </label>
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                {/* PUBLISHED DATE */}
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

                                {/* STATUS */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange as any}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                    >
                                        <option value="draft">draft</option>
                                        <option value="published">published</option>
                                        <option value="archived">archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* EXCERPT */}
                        <div className="space-y-2">
                            <label className="block space-y-1">
                                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                                    Excerpt (preview surface)
                                  </span>

                                <textarea
                                    name="summary"
                                    value={form.summary}
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

                        {/* BODY */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-zinc-500">
                                Body (Markdown)
                            </label>
                            <MarkdownEditor
                                value={form.content_markdown}
                                onChange={(next) =>
                                    setForm((p) => ({ ...p, content_markdown: next }))
                                }
                                placeholder={"# Title\n\nWrite the note body here…"}
                                minRows={20}
                            />
                        </div>
                    </form>

                    {isEditing && form.slug ? (
                        <div className="mt-4">
                            <RevisionHistory
                                slug={form.slug}
                                locale={form.locale}
                                refreshKey={revisionsRefreshKey}
                            />
                        </div>
                    ) : null}
            </Drawer>
        </div>
    );
}