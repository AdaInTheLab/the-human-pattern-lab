import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type Toast = {
    id: number;
    variant: ToastVariant;
    title: string;
    description?: string;
};

type ToastInput = {
    title: string;
    description?: string;
    variant?: ToastVariant;
    durationMs?: number;
};

type ToastContextValue = {
    push: (input: ToastInput) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3500;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextId = useRef(1);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const push = useCallback(
        (input: ToastInput) => {
            const id = nextId.current++;
            const toast: Toast = {
                id,
                variant: input.variant ?? "info",
                title: input.title,
                description: input.description,
            };
            setToasts((prev) => [...prev, toast]);

            const duration = input.durationMs ?? DEFAULT_DURATION;
            window.setTimeout(() => dismiss(id), duration);
        },
        [dismiss]
    );

    const value = useMemo<ToastContextValue>(
        () => ({
            push,
            success: (title, description) => push({ title, description, variant: "success" }),
            error: (title, description) => push({ title, description, variant: "error" }),
            info: (title, description) => push({ title, description, variant: "info" }),
        }),
        [push]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                aria-live="polite"
                aria-atomic="true"
                className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2"
            >
                {toasts.map((t) => (
                    <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastCard({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const Icon =
        toast.variant === "success"
            ? CheckCircle2
            : toast.variant === "error"
            ? XCircle
            : Info;

    const accent =
        toast.variant === "success"
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : toast.variant === "error"
            ? "border-red-500/40 bg-red-500/10 text-red-200"
            : "border-cyan-500/40 bg-cyan-500/10 text-cyan-200";

    return (
        <div
            role="status"
            onClick={onDismiss}
            className={`pointer-events-auto flex items-start gap-2.5 rounded-lg border p-3 shadow-lg backdrop-blur transition-all duration-200 ${accent} ${
                visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
        >
            <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-tight">{toast.title}</div>
                {toast.description ? (
                    <div className="mt-0.5 text-xs opacity-80">{toast.description}</div>
                ) : null}
            </div>
        </div>
    );
}

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used inside <ToastProvider>");
    }
    return ctx;
}
