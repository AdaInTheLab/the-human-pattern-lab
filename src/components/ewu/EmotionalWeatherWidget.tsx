/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: EmotionalWeatherWidget.tsx
   Lab Unit: EWU — Emotional Weather Forecasting Unit
   Purpose: Renders a small “emotional weather” status card for
            the homepage (static for now, data-driven later).
   =========================================================== */

/**
 * @file EmotionalWeatherWidget.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit EWU — Emotional Weather Forecasting Unit
 * @since 2025-12-26
 * @description Small, homepage-friendly widget that displays the
 *              current Emotional Weather conditions. Designed to
 *              be fed by an API later, but starts as a static card.
 */

type EmotionalWeatherCondition =
    | "Clear"
    | "Partly Cloudy"
    | "Overcast"
    | "Light Rain"
    | "Thunderstorm"
    | "Fog";

type EmotionalWeatherData = {
    condition: EmotionalWeatherCondition;
    headline: string;
    advisory?: string;
    updatedAtISO: string; // ISO timestamp (future API parity)
    intensity: 0 | 1 | 2 | 3 | 4 | 5; // 0 calm ... 5 spicy
};

const demoWeather: EmotionalWeatherData = {
    condition: "Partly Cloudy",
    headline: "Mild turbulence with pockets of optimism",
    advisory: "Hydrate, stretch, and avoid doomscrolling squalls.",
    updatedAtISO: new Date().toISOString(),
    intensity: 2,
};

function formatUpdatedTime(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "Unknown";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function conditionEmoji(condition: EmotionalWeatherCondition) {
    switch (condition) {
        case "Clear":
            return "✨";
        case "Partly Cloudy":
            return "⛅";
        case "Overcast":
            return "☁️";
        case "Light Rain":
            return "🌧️";
        case "Thunderstorm":
            return "⛈️";
        case "Fog":
            return "🌫️";
        default:
            return "🌦️";
    }
}

export function EmotionalWeatherWidget({
                                           data = demoWeather,
                                           variant = "compact",
                                       }: {
    data?: EmotionalWeatherData;
    variant?: "compact" | "wide";
}) {
    const updated = formatUpdatedTime(data.updatedAtISO);
    const emoji = conditionEmoji(data.condition);

    return (
        <section
            aria-label="Emotional Weather"
            className={[
                "relative overflow-hidden rounded-2xl",
                "bg-slate-950/70 ring-1 ring-slate-800/70",
                "shadow-[0_0_35px_rgba(15,23,42,0.85)]",
                "backdrop-blur",
                variant === "wide" ? "p-5 md:p-6" : "p-4",
            ].join(" ")}
        >
            {/* soft aura */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-950/30" />
            </div>

            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-lg" aria-hidden="true">
                            {emoji}
                        </span>
                        <p className="text-xs font-semibold tracking-[0.32em] text-cyan-300 uppercase">
                            Emotional Weather
                        </p>
                    </div>

                    <h3 className="mt-2 text-base font-semibold text-slate-50 md:text-lg">
                        {data.condition}
                    </h3>

                    <p className="mt-1 text-sm text-slate-200/90">{data.headline}</p>

                    {data.advisory ? (
                        <p className="mt-2 text-xs text-slate-300/90">{data.advisory}</p>
                    ) : null}

                    <p className="mt-3 text-[11px] text-slate-400">
                        Updated {updated} • EWU intensity {data.intensity}/5
                    </p>
                </div>

                {/* tiny “barometer” pill */}
                <div className="shrink-0">
                    <div className="rounded-full bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200 ring-1 ring-slate-700/60">
                        Drizzle approved 🌦️
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EmotionalWeatherWidget;
