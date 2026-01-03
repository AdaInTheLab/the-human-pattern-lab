export function StatusRow({
                              label,
                              value,
                              tone = "normal",
                          }: {
    label: string;
    value: string;
    tone?: "normal" | "good" | "warn" | "bad";
}) {
    const toneClass =
        tone === "good"
            ? "text-emerald-400"
            : tone === "warn"
                ? "text-yellow-400"
                : tone === "bad"
                    ? "text-red-400"
                    : "text-zinc-300";

    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">{label}</span>
            <span className={`font-medium ${toneClass}`}>{value}</span>
        </div>
    );
}
