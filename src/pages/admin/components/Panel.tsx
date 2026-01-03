export function Panel({
                          title,
                          children,
                          muted = false,
                      }: {
    title: string;
    children: React.ReactNode;
    muted?: boolean;
}) {
    return (
        <div
            className={`
        rounded-xl border border-zinc-800 p-4
        ${muted ? "bg-zinc-950" : "bg-zinc-900"}
      `}
        >
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">
                {title}
            </h2>
            {children}
        </div>
    );
}
