/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: EmotionalWeatherCard.tsx
   Lab Unit: EWU — Emotional Weather Forecasting Unit
   Purpose: Renders the Emotional Weather widget from a typed
            signal object. Styling remains minimal in this step.
   =========================================================== */

/**
 * @file EmotionalWeatherCard.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit EWU — Emotional Weather Forecasting Unit
 * @since 2025-12-26
 * @description Renders a compact Emotional Weather readout.
 *              Uses a typed signal schema; defaults to a static
 *              placeholder until wired to live sources.
 */

import * as React from "react";
import type { EmotionalWeatherSignal } from "@/lib/emotionalWeather";
import { EMOTIONAL_WEATHER_STATIC } from "@/lib/emotionalWeather";

export type EmotionalWeatherProps = {
    id?: string;
    title?: string;
    className?: string;

    /** Provide a signal explicitly (future: hook/API). Defaults to static. */
    signal?: EmotionalWeatherSignal;
};

function TrendGlyph({ trend }: { trend: EmotionalWeatherSignal["temperature"]["trend"] }) {
    // lightweight + readable without icons
    if (trend === "rising") return <span aria-label="Rising">↗</span>;
    if (trend === "falling") return <span aria-label="Falling">↘</span>;
    return <span aria-label="Steady">→</span>;
}

export function EmotionalWeatherCard(props: EmotionalWeatherProps) {
    const { id, title = "Emotional Weather", className, signal = EMOTIONAL_WEATHER_STATIC } = props;

    const headingId = id ? `${id}__heading` : "emotional-weather__heading";
    const descId = id ? `${id}__desc` : "emotional-weather__desc";

    return (
        <section
            id={id}
            className={className}
            aria-labelledby={headingId}
            aria-describedby={descId}
            role="region"
        >
            <header>
                <div className="flex items-baseline justify-between gap-4">
                    <h2 id={headingId} className="text-base font-semibold">
                        {title}
                    </h2>

                    <p className="text-xs text-slate-400">
                        <span className="sr-only">Updated at </span>
                        {new Date(signal.updatedAt).toLocaleString()}
                    </p>
                </div>

                <p id={descId} className="mt-1 text-sm text-slate-200/90">
                    {signal.summary}
                </p>
            </header>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
                        <span>Temperature</span>
                        <TrendGlyph trend={signal.temperature.trend} />
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.temperature.label} <span className="text-slate-400">({signal.temperature.value})</span>
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
                        <span>Pressure</span>
                        <TrendGlyph trend={signal.pressure.trend} />
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.pressure.label} <span className="text-slate-400">({signal.pressure.value})</span>
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                    <div className="text-xs text-slate-300">Wind</div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.wind.label}{" "}
                        <span className="text-slate-400">
              ({signal.wind.intensity}/10{signal.wind.direction ? `, ${signal.wind.direction}` : ""})
            </span>
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                    <div className="text-xs text-slate-300">Precipitation</div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.precipitation.type ?? "none"}{" "}
                        <span className="text-slate-400">({signal.precipitation.chance}%)</span>
                    </div>
                    {signal.precipitation.note ? (
                        <p className="mt-1 text-xs text-slate-300">{signal.precipitation.note}</p>
                    ) : null}
                </div>
            </div>

            {signal.advisory ? (
                <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/20 p-3">
                    <div className="text-xs font-semibold text-slate-200">{signal.advisory.title}</div>
                    <p className="mt-1 text-xs text-slate-300">{signal.advisory.body}</p>
                </div>
            ) : null}
        </section>
    );
}

export default EmotionalWeatherCard;
