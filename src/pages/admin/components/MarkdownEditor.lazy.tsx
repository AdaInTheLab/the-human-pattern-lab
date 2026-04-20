import { lazy, Suspense } from "react";

const LazyMarkdownEditor = lazy(() =>
    import("./MarkdownEditor").then((m) => ({ default: m.MarkdownEditor }))
);

type Props = React.ComponentProps<typeof LazyMarkdownEditor>;

function EditorFallback({ minRows = 12 }: { minRows?: number }) {
    const minHeight = `${Math.max(minRows, 4) * 22}px`;
    return (
        <div
            className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3 text-sm text-zinc-500"
            style={{ minHeight }}
        >
            Loading editor…
        </div>
    );
}

export function MarkdownEditor(props: Props) {
    return (
        <Suspense fallback={<EditorFallback minRows={props.minRows} />}>
            <LazyMarkdownEditor {...props} />
        </Suspense>
    );
}

export default MarkdownEditor;
