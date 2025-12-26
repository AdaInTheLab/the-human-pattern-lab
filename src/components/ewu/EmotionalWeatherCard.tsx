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
import {
    Thermometer,
    Gauge,
    Wind as WindIcon,
    CloudDrizzle,
    ArrowUp,
    ArrowDown,
    ArrowRight,
} from "lucide-react";

function TrendIcon({ trend }: { trend: "rising" | "steady" | "falling" }) {
    const cls = "h-3 w-3 text-slate-400";
    if (trend === "rising") return <ArrowUp className={cls} aria-label="Rising trend" />;
    if (trend === "falling") return <ArrowDown className={cls} aria-label="Falling trend" />;
    return <ArrowRight className={cls} aria-label="Steady trend" />;
}

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
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h2 id={headingId} className="text-sm font-semibold text-slate-100">
                            {title}
                        </h2>
                        <p id={descId} className="mt-1 text-sm text-slate-200/90">
                            {signal.summary}
                        </p>
                    </div>

                    <time
                        className="shrink-0 text-[11px] leading-none text-slate-500"
                        dateTime={signal.updatedAt}
                        aria-label={`Updated at ${new Date(signal.updatedAt).toLocaleString()}`}
                        title={new Date(signal.updatedAt).toLocaleString()}
                    >
                        {new Date(signal.updatedAt).toLocaleDateString()}
                    </time>
                </div>
            </header>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
                {/* Temperature */}
                <div className="rounded-lg border border-white/10 bg-slate-950/25 p-2.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Thermometer className="h-3 w-3" aria-hidden="true" />
              Temperature
            </span>
                        <TrendIcon trend={signal.temperature.trend} />
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.temperature.label}{" "}
                        <span className="text-slate-500">({signal.temperature.value})</span>
                    </div>
                </div>

                {/* Pressure */}
                <div className="rounded-lg border border-white/10 bg-slate-950/25 p-2.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Gauge className="h-3 w-3" aria-hidden="true" />
              Pressure
            </span>
                        <TrendIcon trend={signal.pressure.trend} />
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.pressure.label}{" "}
                        <span className="text-slate-500">({signal.pressure.value})</span>
                    </div>
                </div>

                {/* Wind */}
                <div className="rounded-lg border border-white/10 bg-slate-950/25 p-2.5">
                    <div className="text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <WindIcon className="h-3 w-3" aria-hidden="true" />
              Wind
            </span>
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.wind.label}{" "}
                        <span className="text-slate-500">
              ({signal.wind.intensity}/10
                            {signal.wind.direction ? `, ${signal.wind.direction}` : ""})
            </span>
                    </div>
                </div>

                {/* Precipitation */}
                <div className="rounded-lg border border-white/10 bg-slate-950/25 p-2.5">
                    <div className="text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CloudDrizzle className="h-3 w-3" aria-hidden="true" />
              Precipitation
            </span>
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                        {signal.precipitation.type ?? "none"}{" "}
                        <span className="text-slate-500">({signal.precipitation.chance}%)</span>
                    </div>
                    {signal.precipitation.note ? (
                        <p className="mt-1 text-[11px] leading-snug text-slate-400">
                            {signal.precipitation.note}
                        </p>
                    ) : null}
                </div>
            </div>

            {signal.advisory ? (
                <div className="mt-3 rounded-lg border border-white/10 bg-slate-950/10 p-2.5">
                    <div className="text-[11px] font-semibold text-slate-200">
                        {signal.advisory.title}
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-slate-400">
                        {signal.advisory.body}
                    </p>
                </div>
            ) : null}
        </section>
    );
}

export default EmotionalWeatherCard;
