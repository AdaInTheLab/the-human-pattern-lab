import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type MouseEvent as ReactMouseEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
    Bold,
    Italic,
    Link2,
    Code,
    List,
    ListOrdered,
    Quote,
    Heading,
} from "lucide-react";

type Mode = "write" | "preview";

type Props = {
    value: string;
    onChange: (next: string) => void;
    placeholder?: string;
    minRows?: number;
    /** id on the root, useful for labelling */
    id?: string;
};

// Visually match the zinc/cyan admin palette on top of one-dark.
const editorTheme = EditorView.theme(
    {
        "&": {
            backgroundColor: "transparent",
            fontSize: "13px",
        },
        ".cm-scroller": {
            fontFamily:
                "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
            lineHeight: "1.55",
        },
        ".cm-content": {
            padding: "12px 14px",
            caretColor: "#67e8f9",
        },
        ".cm-focused": {
            outline: "none",
        },
        ".cm-gutters": {
            backgroundColor: "transparent",
            border: "none",
            color: "#52525b",
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "rgba(103, 232, 249, 0.18)",
        },
        ".cm-activeLine": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
        },
    },
    { dark: true }
);

export function MarkdownEditor({
    value,
    onChange,
    placeholder,
    minRows = 12,
    id,
}: Props) {
    const [mode, setMode] = useState<Mode>("write");
    const cmRef = useRef<ReactCodeMirrorRef | null>(null);

    /** Wrap the current selection with `before` + `after`. If selection is empty, insert `phText`. */
    const wrapSelection = useCallback((before: string, after: string, phText: string) => {
        const view = cmRef.current?.view;
        if (!view) return;

        const { state } = view;
        const sel = state.selection.main;
        const hasSel = sel.from !== sel.to;
        const inner = hasSel ? state.doc.sliceString(sel.from, sel.to) : phText;

        const insert = `${before}${inner}${after}`;
        const innerStart = sel.from + before.length;
        const innerEnd = innerStart + inner.length;

        view.dispatch({
            changes: { from: sel.from, to: sel.to, insert },
            selection: { anchor: innerStart, head: innerEnd },
        });
        view.focus();
    }, []);

    const prefixLines = useCallback((prefix: string, phText: string) => {
        const view = cmRef.current?.view;
        if (!view) return;

        const { state } = view;
        const sel = state.selection.main;
        const startLine = state.doc.lineAt(sel.from);
        const endLine = state.doc.lineAt(sel.to);

        const emptySelection = sel.from === sel.to;
        const emptyLine = startLine.length === 0;

        if (emptySelection && emptyLine) {
            // Drop the placeholder on an empty line and select it.
            view.dispatch({
                changes: { from: sel.from, insert: `${prefix}${phText}` },
                selection: {
                    anchor: sel.from + prefix.length,
                    head: sel.from + prefix.length + phText.length,
                },
            });
            view.focus();
            return;
        }

        const changes = [];
        for (let n = startLine.number; n <= endLine.number; n++) {
            const line = state.doc.line(n);
            changes.push({ from: line.from, insert: prefix });
        }
        view.dispatch({ changes });
        view.focus();
    }, []);

    const insertLink = useCallback(() => {
        const view = cmRef.current?.view;
        if (!view) return;

        const { state } = view;
        const sel = state.selection.main;
        const selected = sel.from !== sel.to ? state.doc.sliceString(sel.from, sel.to) : "link text";
        const snippet = `[${selected}](url)`;
        const urlStart = sel.from + snippet.lastIndexOf("url");

        view.dispatch({
            changes: { from: sel.from, to: sel.to, insert: snippet },
            selection: { anchor: urlStart, head: urlStart + 3 },
        });
        view.focus();
    }, []);

    const shortcutKeymap = Prec.highest(
        keymap.of([
            {
                key: "Mod-b",
                run: () => {
                    wrapSelection("**", "**", "bold text");
                    return true;
                },
            },
            {
                key: "Mod-i",
                run: () => {
                    wrapSelection("*", "*", "italic text");
                    return true;
                },
            },
            {
                key: "Mod-e",
                run: () => {
                    wrapSelection("`", "`", "code");
                    return true;
                },
            },
            {
                key: "Mod-k",
                run: () => {
                    insertLink();
                    return true;
                },
            },
        ])
    );

    // Escape preview mode with Esc
    useEffect(() => {
        if (mode !== "preview") return;
        const onKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") setMode("write");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mode]);

    const toolButton = (
        label: string,
        Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>,
        onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void
    ) => (
        <button
            type="button"
            title={label}
            aria-label={label}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500/60"
        >
            <Icon aria-hidden className="h-4 w-4" />
        </button>
    );

    const minHeight = `${Math.max(minRows, 4) * 22}px`;

    return (
        <div id={id} className="rounded-lg border border-zinc-800 bg-zinc-950/40">
            {/* Header: tabs + toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-2 py-1.5">
                <div role="tablist" className="flex gap-1">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={mode === "write"}
                        onClick={() => setMode("write")}
                        className={`rounded px-2.5 py-1 text-xs uppercase tracking-widest transition ${
                            mode === "write"
                                ? "bg-zinc-800 text-zinc-100"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        Write
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={mode === "preview"}
                        onClick={() => setMode("preview")}
                        className={`rounded px-2.5 py-1 text-xs uppercase tracking-widest transition ${
                            mode === "preview"
                                ? "bg-zinc-800 text-zinc-100"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {mode === "write" && (
                    <div className="flex items-center gap-0.5">
                        {toolButton("Heading", Heading, () =>
                            prefixLines("## ", "Heading")
                        )}
                        {toolButton("Bold (Cmd/Ctrl+B)", Bold, () =>
                            wrapSelection("**", "**", "bold text")
                        )}
                        {toolButton("Italic (Cmd/Ctrl+I)", Italic, () =>
                            wrapSelection("*", "*", "italic text")
                        )}
                        {toolButton("Link (Cmd/Ctrl+K)", Link2, insertLink)}
                        {toolButton("Code (Cmd/Ctrl+E)", Code, () =>
                            wrapSelection("`", "`", "code")
                        )}
                        {toolButton("Quote", Quote, () =>
                            prefixLines("> ", "quote")
                        )}
                        {toolButton("Bullet list", List, () =>
                            prefixLines("- ", "list item")
                        )}
                        {toolButton("Numbered list", ListOrdered, () =>
                            prefixLines("1. ", "list item")
                        )}
                    </div>
                )}
            </div>

            {/* Body */}
            {mode === "write" ? (
                <CodeMirror
                    ref={cmRef}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    theme={oneDark}
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        highlightActiveLineGutter: false,
                        highlightActiveLine: false,
                        drawSelection: true,
                        history: true,
                        autocompletion: false,
                    }}
                    extensions={[
                        shortcutKeymap,
                        markdown({ base: markdownLanguage, codeLanguages: [] }),
                        EditorView.lineWrapping,
                        editorTheme,
                    ]}
                    style={{ minHeight }}
                />
            ) : (
                <div className="px-3 py-3 text-sm">
                    {value.trim() ? (
                        <article
                            className={[
                                "max-w-none leading-relaxed text-zinc-200",
                                "[&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-zinc-50",
                                "[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-zinc-50",
                                "[&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-50",
                                "[&_p]:my-2",
                                "[&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cyan-200",
                                "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6",
                                "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6",
                                "[&_li]:my-1",
                                "[&_blockquote]:border-l-2 [&_blockquote]:border-zinc-700 [&_blockquote]:pl-3 [&_blockquote]:text-zinc-400 [&_blockquote]:italic",
                                "[&_code]:rounded [&_code]:bg-zinc-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-cyan-200",
                                "[&_pre]:rounded-md [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:bg-zinc-950/60 [&_pre]:p-3 [&_pre]:overflow-x-auto",
                                "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs",
                                "[&_hr]:my-4 [&_hr]:border-zinc-800",
                                "[&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs",
                                "[&_th]:border [&_th]:border-zinc-800 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:text-zinc-200",
                                "[&_td]:border [&_td]:border-zinc-800 [&_td]:px-2 [&_td]:py-1",
                                "[&_img]:my-3 [&_img]:max-w-full [&_img]:rounded",
                            ].join(" ")}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
                        </article>
                    ) : (
                        <p className="text-zinc-500 italic">Nothing to preview yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MarkdownEditor;
