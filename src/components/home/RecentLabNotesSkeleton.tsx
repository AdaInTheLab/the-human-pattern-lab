export function RecentLabNotesSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-[0_18px_45px_rgba(3,7,18,0.9)] backdrop-blur-sm"
                    aria-hidden="true"
                >
                    {/* subtle corner glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_55%)] opacity-60 mix-blend-screen" />

                    {/* shimmer */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                    <div className="relative space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-4 w-20 rounded-full bg-slate-800/70" />
                            <div className="h-3 w-16 rounded bg-slate-800/60" />
                        </div>

                        <div className="h-5 w-3/4 rounded bg-slate-800/70" />

                        <div className="space-y-2">
                            <div className="h-4 w-full rounded bg-slate-800/60" />
                            <div className="h-4 w-11/12 rounded bg-slate-800/50" />
                            <div className="h-4 w-2/3 rounded bg-slate-800/40" />
                        </div>
                    </div>

                    <div className="relative mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                        <div className="h-3 w-16 rounded bg-slate-800/50" />
                        <div className="h-4 w-20 rounded bg-slate-800/50" />
                    </div>
                </div>
            ))}

            {/* Tailwind keyframes anchor */}
            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}