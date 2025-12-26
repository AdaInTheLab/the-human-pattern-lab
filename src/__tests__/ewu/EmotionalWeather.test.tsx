/// <reference types="vitest" />
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmotionalWeather from "@/components/ewu/EmotionalWeatherCard";
import { EMOTIONAL_WEATHER_STATIC } from "@/lib/emotionalWeather";

describe("EmotionalWeather", () => {
    it("renders summary + key fields from signal", () => {
        render(<EmotionalWeather signal={EMOTIONAL_WEATHER_STATIC} />);

        expect(screen.getByRole("region", { name: /emotional weather/i })).toBeInTheDocument();
        expect(screen.getByText(EMOTIONAL_WEATHER_STATIC.summary)).toBeInTheDocument();

        expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
        expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
        expect(screen.getByText(/Wind/i)).toBeInTheDocument();
        expect(screen.getByText(/Precipitation/i)).toBeInTheDocument();
    });
});
