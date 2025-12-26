/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: emotionalWeather.ts
   Lab Unit: EWU — Emotional Weather Forecasting Unit
   Purpose: Defines the Emotional Weather signal schema and a
            static, typed baseline object for UI rendering.
   =========================================================== */

/**
 * @file emotionalWeather.ts
 * @author Ada
 * @assistant Lyric
 * @lab-unit EWU — Emotional Weather Forecasting Unit
 * @since 2025-12-26
 * @description Typed emotional weather “signal” schema + a static
 *              placeholder object to support early UI scaffolding.
 */

export type EwSeverity = "low" | "moderate" | "high";
export type EwTrend = "rising" | "steady" | "falling";

export type EwWind = {
    intensity: number; // 0–10
    label: string; // human readable, e.g. "Restless"
    direction?: "inward" | "outward" | "mixed";
};

export type EwPrecipitation = {
    chance: number; // 0–100
    type?: "drizzle" | "rain" | "storm" | "none";
    note?: string;
};

export type EmotionalWeatherSignal = {
    version: 1;

    // Meta
    locale: "en" | "ko";
    updatedAt: string; // ISO-8601 string
    source: "static" | "user" | "system";

    // Core readout (deliberately simple, future-extendable)
    summary: string; // one-liner
    severity: EwSeverity;

    // “Measurements” (metaphorical, but consistent)
    temperature: {
        value: number; // 0–100 (comfort/activation)
        label: string; // e.g. "Warm"
        trend: EwTrend;
    };

    pressure: {
        value: number; // 0–100 (tension/weight)
        label: string; // e.g. "Heavy"
        trend: EwTrend;
    };

    wind: EwWind;
    precipitation: EwPrecipitation;

    // Guidance
    advisory?: {
        title: string;
        body: string;
    };

    // Reserved for later: tags, correlations, contributors, etc.
    tags?: string[];
};

/** Tiny helper: keeps the object honest at runtime for tests. */
export function isEmotionalWeatherSignal(x: unknown): x is EmotionalWeatherSignal {
    if (!x || typeof x !== "object") return false;
    const obj = x as Record<string, unknown>;
    return (
        obj.version === 1 &&
        (obj.locale === "en" || obj.locale === "ko") &&
        typeof obj.updatedAt === "string" &&
        (obj.source === "static" || obj.source === "user" || obj.source === "system") &&
        typeof obj.summary === "string" &&
        (obj.severity === "low" || obj.severity === "moderate" || obj.severity === "high") &&
        typeof obj.temperature === "object" &&
        typeof obj.pressure === "object" &&
        typeof obj.wind === "object" &&
        typeof obj.precipitation === "object"
    );
}

export function assertEmotionalWeatherSignal(x: unknown): asserts x is EmotionalWeatherSignal {
    if (!isEmotionalWeatherSignal(x)) {
        throw new Error("Invalid EmotionalWeatherSignal shape");
    }
}

/**
 * Static placeholder readout (Step 2)
 * - intentionally stable + typed
 * - copy will be refined later in Polish
 */
export const EMOTIONAL_WEATHER_STATIC: EmotionalWeatherSignal = {
    version: 1,
    locale: "en",
    updatedAt: new Date().toISOString(),
    source: "static",

    summary: "Mostly calm with a chance of restless thoughts.",
    severity: "low",

    temperature: {
        value: 62,
        label: "Warm",
        trend: "steady",
    },

    pressure: {
        value: 38,
        label: "Light",
        trend: "falling",
    },

    wind: {
        intensity: 3,
        label: "Breezy",
        direction: "mixed",
    },

    precipitation: {
        chance: 15,
        type: "drizzle",
        note: "Low-grade feelings may pass through quietly.",
    },

    advisory: {
        title: "Gentle Conditions",
        body: "Small check-ins recommended. No umbrella required, but keep one emotionally nearby.",
    },

    tags: ["ewu", "baseline", "placeholder"],
};
