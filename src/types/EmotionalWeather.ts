type EmotionalWeather = {
    condition: string;          // "Light Cognitive Fog"
    icon: "sun" | "cloud" | "drizzle" | "storm" | "clear";
    intensity: 1 | 2 | 3 | 4 | 5; // optional future use
    note?: string;              // optional flavor text
    updated_at: string;         // ISO date
    source: "EWU";              // Emotional Weather Unit
};
