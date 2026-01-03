export function SystemToggle({
                          label,
                          disabled,
                          danger,
                      }: {
    label: string;
    disabled?: boolean;
    danger?: boolean;
}) {
    return (
        <div
            className={`
        flex items-center justify-between
        text-sm
        ${disabled ? "text-zinc-600" : "text-zinc-300"}
        ${danger ? "text-red-400" : ""}
      `}
        >
            <span>{label}</span>
            <input type="checkbox" disabled className="opacity-40" />
        </div>
    );
}
