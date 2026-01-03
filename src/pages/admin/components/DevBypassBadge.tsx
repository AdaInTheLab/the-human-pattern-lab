type Props = {
    enabled?: boolean;
    label?: string;
};

export function DevBypassBadge({
                                   enabled = true,
                                   label = "DEV AUTH BYPASS",
                               }: Props) {
    if (!enabled) return null;

    return (
        <div className="absolute bottom-6 left-30 -translate-x-1/2">
            <div className="
        inline-flex items-center gap-2
        rounded-full border border-zinc-800
        bg-zinc-950/90 px-4 py-2
        text-xs font-semibold tracking-widest
        text-yellow-300
        shadow-lg shadow-black/40
        backdrop-blur
      ">
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                {label}
            </div>
        </div>
    );
}
