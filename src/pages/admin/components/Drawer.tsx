import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    /** Title shown in the sticky header. */
    title: string;
    /** Optional subtitle/eyebrow. */
    eyebrow?: string;
    /** Optional node rendered in the header right slot (e.g. status badge). */
    headerRight?: ReactNode;
    /** Optional sticky footer (e.g. save/cancel buttons). */
    footer?: ReactNode;
    /** Body content. */
    children: ReactNode;
    /** Max width class (Tailwind). Default: max-w-3xl. */
    maxWidthClass?: string;
    /**
     * Called when the user attempts to close the drawer (Esc, backdrop, close button).
     * Return false to cancel the close (e.g. to warn about unsaved changes).
     */
    onRequestClose?: () => boolean | void;
};

export function Drawer({
    open,
    onClose,
    title,
    eyebrow,
    headerRight,
    footer,
    children,
    maxWidthClass = "max-w-3xl",
    onRequestClose,
}: Props) {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const tryClose = () => {
        if (onRequestClose) {
            const shouldClose = onRequestClose();
            if (shouldClose === false) return;
        }
        onClose();
    };

    // Lock body scroll + Esc to close
    useEffect(() => {
        if (!open) return;

        lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                tryClose();
            }
        };
        window.addEventListener("keydown", onKey);

        // Focus the panel for a11y (so Tab keeps keyboard users inside)
        requestAnimationFrame(() => {
            panelRef.current?.focus();
        });

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            // Restore focus to whatever triggered the open
            lastFocusedRef.current?.focus?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            aria-hidden={!open}
            className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        >
            {/* Backdrop */}
            <div
                onClick={tryClose}
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                tabIndex={-1}
                className={`absolute right-0 top-0 flex h-full w-full ${maxWidthClass} flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60 outline-none transition-transform duration-200 ease-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-800 bg-zinc-950/95 px-5 py-4 backdrop-blur">
                    <div className="min-w-0 flex-1">
                        {eyebrow ? (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                {eyebrow}
                            </p>
                        ) : null}
                        <h2 className="mt-0.5 text-lg font-semibold text-zinc-100 truncate">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        {headerRight}
                        <button
                            type="button"
                            onClick={tryClose}
                            aria-label="Close drawer"
                            className="rounded-md border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        >
                            <X aria-hidden className="h-4 w-4" />
                        </button>
                    </div>
                </header>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

                {/* Footer */}
                {footer ? (
                    <footer className="sticky bottom-0 z-10 border-t border-zinc-800 bg-zinc-950/95 px-5 py-3 backdrop-blur">
                        {footer}
                    </footer>
                ) : null}
            </div>
        </div>,
        document.body
    );
}
