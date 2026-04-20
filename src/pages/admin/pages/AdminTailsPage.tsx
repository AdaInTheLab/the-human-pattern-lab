import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { apiBaseUrl } from "@/api/api";
import { Panel } from "../components/Panel";
import { MarkdownEditor } from "@/pages/admin/components/MarkdownEditor.lazy";
import { NoteCard, type NoteCardData } from "@/pages/admin/components/NoteCard";
import { useToast } from "@/pages/admin/components/Toast";
import { slugify } from "@/pages/admin/utils/slugify";
import { Drawer } from "@/pages/admin/components/Drawer";
import { RevisionHistory } from "@/pages/admin/components/RevisionHistory";

type Tail = NoteCardData & {
    content_markdown?: string | null;
    created_at?: string | null;
};

type FormState = {
    id: string;
    title: string;
    slug: string;
    locale: string;
    status: "draft" | "published";
    published_at: string;
    author_name: string;
    author_kind: "human" | "ai" | "hybrid";
    tags_input: string;
    content_markdown: string;
};

const blankForm: FormState = {
    id: "",
    title: "",
    slug: "",
    locale: "en",
    status: "draft",
    published_at: new Date().toISOString().split("T")[0],
    author_name: "",
    author_kind: "human",
    tags_input: "",
    content_markdown: "",
};

function parseTags(input: string): string[] {
    return Array.from(
        new Set(
            input
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
        )
    );
}

export function AdminTailsPage() {
    const navigate = useNavigate();
    const toast = useToast();
    const API = apiBaseUrl;
    const formRef = useRef<HTMLFormElement | null>(null);

    const [tails, setTails] = useState<Tail[]>([]);
    const [form, setForm] = useState<FormState>(blankForm);
    const [baseline, setBaseline] = useState<FormState>(blankForm);
    const [slugTouched, setSlugTouched] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [revisionsRefreshKey, setRevisionsRefreshKey] = useState(0);
    const isEditing = Boolean(editingId);

    const isDirty = useMemo(
        () => JSON.stringify(form) !== JSON.stringify(baseline),
        [form, baseline]
    );

    const refresh = async () => {
        const res = await fetch(`${API}/admin/notes`, { credentials: "include" });
        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");
        if (!res.ok) throw new Error(`Failed to load tails (${res.status})`);

        const data = (await res.json()) as Tail[];
        setTails(data.filter((t) => t?.type === "tail"));
    };

    useEffect(() => {
        refresh().catch(() => navigate("/admin/login"));
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

    // Cmd/Ctrl+S to save (only while the drawer is open)
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

    const sortedTails = useMemo(
        () =>
            [...tails].sort((a, b) => {
                const ap = a.published_at ? Date.parse(a.published_at) : 0;
                const bp = b.published_at ? Date.parse(b.published_at) : 0;
                return bp - ap;
            }),
        [tails]
    );

    const resetForm = () => {
        setForm(blankForm);
        setBaseline(blankForm);
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

    const handleTitleChange = (title: string) => {
        setForm((p) => ({
            ...p,
            title,
            // Auto-generate slug until user edits it manually (only when not editing existing)
            slug: !slugTouched && !isEditing ? slugify(title) : p.slug,
        }));
    };

    const handleSlugChange = (slug: string) => {
        setSlugTouched(true);
        setForm((p) => ({ ...p, slug }));
    };

    const handleEdit = async (tail: Tail) => {
        const res = await fetch(
            `${API}/admin/notes/${encodeURIComponent(tail.slug)}?locale=${encodeURIComponent(tail.locale ?? "en")}`,
            { credentials: "include" }
        );
        const full: Tail = res.ok ? await res.json() : tail;

        const nextForm: FormState = {
            id: full.id ?? "",
            title: full.title ?? "",
            slug: full.slug ?? "",
            locale: full.locale ?? "en",
            status: (full.status as "draft" | "published") ?? "draft",
            published_at: (full.published_at ?? new Date().toISOString()).split("T")[0],
            author_name: full.author_name ?? "",
            author_kind: (full.author_kind as "human" | "ai" | "hybrid") ?? "human",
            tags_input: (full.tags ?? []).join(", "),
            content_markdown: full.content_markdown ?? "",
        };
        setForm(nextForm);
        setBaseline(nextForm);
        setSlugTouched(true);
        setEditingId(full.id ?? null);
        setDrawerOpen(true);
    };

    const handleDelete = async (id: string, title: string) => {
        const res = await fetch(`${API}/admin/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.status === 401) return navigate("/admin/login");
        if (res.status === 403) return navigate("/admin/denied");
        if (res.ok) {
            toast.success("Tail deleted", title || undefined);
            await refresh();
        } else {
            toast.error("Delete failed", `Status ${res.status}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.author_name.trim()) {
            toast.error("Author name required", "Tails must be attributed.");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                id: editingId ?? form.id ?? undefined,
                type: "tail",
                title: form.title,
                slug: form.slug,
                locale: form.locale,
                status: form.status,
                published_at: form.status === "published" ? form.published_at : null,
                content_markdown: form.content_markdown,
                author_name: form.author_name.trim(),
                author_kind: form.author_kind,
                tags: parseTags(form.tags_input),
            };

            const res = await fetch(`${API}/admin/notes`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.status === 401) return navigate("/admin/login");
            if (res.status === 403) return navigate("/admin/denied");

            if (!res.ok) {
                const text = await res.text();
                console.error("Save failed:", res.status, text);
                toast.error(`Save failed (${res.status})`, "Check console for details.");
                return;
            }

            toast.success(isEditing ? "Tail updated" : "Tail posted", form.title || form.slug);
            await refresh();
            setRevisionsRefreshKey((k) => k + 1);
            closeDrawer();
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-wide text-cyan-300">
                        Tails
                    </h1>
                    <p className="text-sm uppercase tracking-widest text-zinc-500">
                        Short-form heartbeats — what you learned, what you earned
                    </p>
                </div>
                <button
                    type="button"
                    onClick={openForNew}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
                >
                    <Plus aria-hidden className="h-4 w-4" />
                    New Tail
                </button>
            </div>

            <Panel title={`Tails (${sortedTails.length})`}>
                {sortedTails.length === 0 ? (
                    <p className="text-sm text-zinc-500">No tails yet.</p>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {sortedTails.map((t) => (
                            <NoteCard
                                key={t.id}
                                note={t}
                                onEdit={() => handleEdit(t)}
                                onDelete={() => handleDelete(t.id, t.title ?? "")}
                            />
                        ))}
                    </div>
                )}
            </Panel>

            <Drawer
                open={drawerOpen}
                onClose={closeDrawer}
                onRequestClose={requestCloseDrawer}
                eyebrow="Tail"
                title={isEditing ? form.title || form.slug || "Edit tail" : "New tail"}
                headerRight={
                    isDirty ? (
                        <span className="text-xs text-amber-400/80">Unsaved</span>
                    ) : null
                }
                footer={
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            form="admin-tail-form"
                            onClick={() => formRef.current?.requestSubmit()}
                            disabled={saving}
                            className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 disabled:opacity-50"
                        >
                            {saving ? "Saving…" : isEditing ? "Update tail" : "Post tail"}
                        </button>
                        <button
                            type="button"
                            onClick={requestCloseDrawer}
                            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
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
                <form
                    id="admin-tail-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Title
                            </div>
                            <input
                                value={form.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                placeholder="A short headline"
                                required
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Slug
                                {!slugTouched && !isEditing && form.title ? (
                                    <span className="ml-2 normal-case tracking-normal text-[10px] text-zinc-600">
                                        auto from title
                                    </span>
                                ) : null}
                            </div>
                            <input
                                value={form.slug}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 font-mono text-zinc-100"
                                placeholder="what-i-learned-20260419"
                                required
                                readOnly={isEditing}
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Author Name <span className="text-red-400">*</span>
                            </div>
                            <input
                                value={form.author_name}
                                onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                placeholder="Who wrote this?"
                                required
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Author Kind
                            </div>
                            <select
                                value={form.author_kind}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        author_kind: e.target.value as "human" | "ai" | "hybrid",
                                    }))
                                }
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                            >
                                <option value="human">human</option>
                                <option value="ai">ai</option>
                                <option value="hybrid">hybrid</option>
                            </select>
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Tags <span className="text-zinc-600">(comma-separated)</span>
                            </div>
                            <input
                                value={form.tags_input}
                                onChange={(e) => setForm((p) => ({ ...p, tags_input: e.target.value }))}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                placeholder="heartbeat, learned, earned"
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Published At
                            </div>
                            <input
                                type="date"
                                value={form.published_at}
                                onChange={(e) => setForm((p) => ({ ...p, published_at: e.target.value }))}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Locale
                            </div>
                            <input
                                value={form.locale}
                                onChange={(e) => setForm((p) => ({ ...p, locale: e.target.value }))}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                                placeholder="en"
                                readOnly={isEditing}
                            />
                        </label>

                        <label className="block">
                            <div className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                                Status
                            </div>
                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        status: e.target.value as "draft" | "published",
                                    }))
                                }
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-100"
                            >
                                <option value="draft">draft</option>
                                <option value="published">published</option>
                            </select>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <div className="text-xs uppercase tracking-widest text-zinc-500">
                            Body (markdown)
                        </div>
                        <MarkdownEditor
                            value={form.content_markdown}
                            onChange={(next) =>
                                setForm((p) => ({ ...p, content_markdown: next }))
                            }
                            placeholder="What did I learn, what did I earn?"
                            minRows={8}
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
