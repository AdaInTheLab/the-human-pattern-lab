import { describe, expect, it } from "vitest";
import {
    EMOTIONAL_WEATHER_STATIC,
    assertEmotionalWeatherSignal,
    isEmotionalWeatherSignal,
} from "@/lib/emotionalWeather";

describe("EWU emotional weather data", () => {
    it("static object conforms to schema (type guard)", () => {
        expect(isEmotionalWeatherSignal(EMOTIONAL_WEATHER_STATIC)).toBe(true);
    });

    it("assert helper does not throw for valid object", () => {
        expect(() => assertEmotionalWeatherSignal(EMOTIONAL_WEATHER_STATIC)).not.toThrow();
    });

    it("guard rejects obviously invalid shapes", () => {
        expect(isEmotionalWeatherSignal(null)).toBe(false);
        expect(isEmotionalWeatherSignal({})).toBe(false);
        expect(isEmotionalWeatherSignal({ version: 2 })).toBe(false);
        expect(isEmotionalWeatherSignal({ version: 1, locale: "en" })).toBe(false);
    });

    it("measurements stay within expected ranges (sanity)", () => {
        const s = EMOTIONAL_WEATHER_STATIC;

        expect(s.temperature.value).toBeGreaterThanOrEqual(0);
        expect(s.temperature.value).toBeLessThanOrEqual(100);

        expect(s.pressure.value).toBeGreaterThanOrEqual(0);
        expect(s.pressure.value).toBeLessThanOrEqual(100);

        expect(s.wind.intensity).toBeGreaterThanOrEqual(0);
        expect(s.wind.intensity).toBeLessThanOrEqual(10);

        expect(s.precipitation.chance).toBeGreaterThanOrEqual(0);
        expect(s.precipitation.chance).toBeLessThanOrEqual(100);
    });
});
