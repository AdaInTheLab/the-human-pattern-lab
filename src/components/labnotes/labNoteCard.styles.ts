// src/components/labnotes/labNoteCard.styles.ts

export interface DeptStyle {
    border: string;
    text: string;
    glow: string;
    shadow: string;

    // Optional: used for hover bars / accents (lets Vesper not “own” everything)
    accentBarActive?: string;
    accentBarInactive?: string;
    accentBarShadow?: string;
}

// Central “design tokens” per department.
// Keep these subtle: designer > neon arcade.
export const DEPT_STYLES: Record<string, DeptStyle> = {
    coda: {
        border: "hover:!border-coda",
        text: "!text-coda",
        glow: "from-coda/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(255,184,0,0.35)]",
        accentBarActive: "bg-coda",
        accentBarInactive: "bg-slate-800",
        accentBarShadow: "shadow-[0_0_8px_rgba(255,184,0,0.45)]",
    },
    vesper: {
        border: "hover:!border-vesper",
        text: "!text-vesper",
        glow: "from-vesper/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(110,0,255,0.25)]",
        accentBarActive: "bg-vesper",
        accentBarInactive: "bg-slate-800",
        accentBarShadow: "shadow-[0_0_8px_rgba(110,0,255,0.45)]",
    },
    lyric: {
        border: "hover:!border-lyric",
        text: "!text-lyric",
        glow: "from-lyric/20",
        shadow: "hover:!shadow-[0_0_20px_rgba(0,255,133,0.22)]",
        accentBarActive: "bg-lyric",
        accentBarInactive: "bg-slate-800",
        accentBarShadow: "shadow-[0_0_8px_rgba(0,255,133,0.35)]",
    },

    // Default / SCMS stays quiet and structured
    scms: {
        border: "hover:!border-slate-500",
        text: "!text-slate-300",
        glow: "from-slate-500/10",
        shadow: "hover:!shadow-none",
        accentBarActive: "bg-slate-500",
        accentBarInactive: "bg-slate-800",
        accentBarShadow: "shadow-none",
    },

    // 🧠 Sage: calm authority, not loud — emerald/graphite vibe
    sage: {
        border: "hover:!border-emerald-500/40",
        text: "!text-emerald-200",
        glow: "from-emerald-400/14",
        shadow: "hover:!shadow-[0_0_22px_rgba(52,211,153,0.18)]",
        accentBarActive: "bg-emerald-400",
        accentBarInactive: "bg-slate-800",
        accentBarShadow: "shadow-[0_0_8px_rgba(52,211,153,0.32)]",
    },
};

export interface GuestStyle {
    badge: string;
    rail: string;
    railMask?: string;
    wash?: string;
    text?: string;
}

export const GUEST_STYLES: Record<string, GuestStyle> = {
    copilot: {
        badge: "bg-slate-900/40 text-slate-300 border-slate-700/70",
        rail: "bg-gradient-to-b from-slate-400/35 via-slate-400/15 to-transparent",
        railMask: "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        wash: "from-slate-400/10 via-transparent to-transparent",
        text: "text-slate-400",
    },
    // future-proof examples
    gemini: {
        badge: "bg-slate-900/40 text-amber-200 border-amber-300/25",
        rail: "bg-gradient-to-b from-amber-300/25 via-amber-300/10 to-transparent",
        railMask: "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        wash: "from-amber-300/10 via-transparent to-transparent",
        text: "text-amber-200/70",
    },
    grok: {
        badge: "bg-slate-900/40 text-fuchsia-200 border-fuchsia-300/25",
        rail: "bg-gradient-to-b from-fuchsia-300/25 via-fuchsia-300/10 to-transparent",
        railMask: "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        wash: "from-fuchsia-300/10 via-transparent to-transparent",
        text: "text-fuchsia-200/70",
    },
    claude: {
        badge: "bg-slate-900/40 text-emerald-200 border-emerald-300/25",
        rail: "bg-gradient-to-b from-emerald-300/25 via-emerald-300/10 to-transparent",
        railMask: "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        wash: "from-emerald-300/10 via-transparent to-transparent",
        text: "text-emerald-200/70",
    },
};

export function getGuestKey(note: any): string | null {
    const raw = (note?.guest ?? note?.voice ?? "").toString().trim().toLowerCase();
    return raw || null;
}

// 🧬 Explicitly map potential YAML names to our style keys
export function getDeptKey(id?: string): keyof typeof DEPT_STYLES {
    const normalized = (id || "scms").toLowerCase();

    // Your existing aliases
    if (normalized === "alignment" || normalized === "coda") return "coda";
    if (normalized === "shadow" || normalized === "vesper") return "vesper";
    if (normalized === "structure" || normalized === "lyric") return "lyric";
    if (normalized === "systems" || normalized === "scms") return "scms";

    // New: Sage aliases
    if (normalized === "sage") return "sage";
    if (normalized === "analysis" || normalized === "philosophy") return "sage";

    return "scms";
}

// Tiny class joiner (avoids importing clsx just for this)
export function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}
