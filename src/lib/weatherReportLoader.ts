import {
    EMOTIONAL_WEATHER_STATIC,
    type EmotionalWeatherSignal,
    type EwSeverity,
} from "@/lib/emotionalWeather";

const REPORT_FILES = import.meta.glob("/src/weather-report/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
}) as Record<string, string>;

type Frontmatter = {
    id?: string;
    date?: string;
    tags?: string[];
};

function parseFrontmatter(src: string): { data: Frontmatter; body: string } {
    const m = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!m) return { data: {}, body: src };

    const [, yaml, body] = m;
    const data: Frontmatter = {};

    for (const line of yaml.split("\n")) {
        const entry = line.match(/^\s*([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/);
        if (!entry) continue;
        const [, key, rawValue] = entry;
        const unquoted = rawValue.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");

        if (key === "tags") {
            const arr = rawValue.match(/^\[(.*)\]$/);
            if (arr) {
                data.tags = arr[1]
                    .split(",")
                    .map((s) => s.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"))
                    .filter(Boolean);
            }
        } else if (key === "id" || key === "date") {
            data[key] = unquoted;
        }
    }

    return { data, body };
}

function severityFromPressure(value: number): EwSeverity {
    if (value >= 70) return "high";
    if (value >= 40) return "moderate";
    return "low";
}

function parseWeatherMarkdown(src: string): EmotionalWeatherSignal | null {
    const { data, body } = parseFrontmatter(src);

    const summaryMatch = body.match(/\*\*Summary\*\*:\s*(.+)/);
    const tempMatch = body.match(/\*\*Temperature\*\*:\s*([^(\n]+?)\s*\((\d+)\)(?:\s*[—-]\s*(.+))?/);
    const pressureMatch = body.match(/\*\*Pressure\*\*:\s*([^(\n]+?)\s*\((\d+)\)(?:\s*[—-]\s*(.+))?/);
    const windMatch = body.match(
        /\*\*Wind\*\*:\s*([^(\n]+?)\s*\((\d+)\/10(?:\s*,\s*(inward|outward|mixed))?\)(?:\s*[—-]\s*(.+))?/i
    );
    const precipMatch = body.match(
        /\*\*Precipitation\*\*:\s*([^(\n]+?)\s*\((\d+)%\)(?:\s*[—-]\s*(.+))?/
    );
    const advisoryMatch = body.match(
        /\*\*Advisory\*\*:\s*([^.\n]+)\.?\s*\n+([\s\S]+?)(?:\n\n—|$)/
    );

    if (!summaryMatch || !tempMatch || !pressureMatch || !windMatch || !precipMatch) {
        return null;
    }

    const pressureValue = Number(pressureMatch[2]);

    const dateISO = data.date ? new Date(`${data.date}T12:00:00Z`).toISOString() : new Date().toISOString();

    const precipRaw = precipMatch[1].trim().toLowerCase();
    const precipType: EmotionalWeatherSignal["precipitation"]["type"] =
        precipRaw === "rain" || precipRaw === "storm" || precipRaw === "drizzle" || precipRaw === "none"
            ? precipRaw
            : undefined;

    return {
        version: 1,
        locale: "en",
        updatedAt: dateISO,
        source: "system",

        summary: summaryMatch[1].trim(),
        severity: severityFromPressure(pressureValue),

        temperature: {
            value: Number(tempMatch[2]),
            label: tempMatch[1].trim(),
            trend: "steady",
        },

        pressure: {
            value: pressureValue,
            label: pressureMatch[1].trim(),
            trend: "steady",
        },

        wind: {
            intensity: Number(windMatch[2]),
            label: windMatch[1].trim(),
            direction: (windMatch[3]?.toLowerCase() as EmotionalWeatherSignal["wind"]["direction"]) ?? "mixed",
        },

        precipitation: {
            chance: Number(precipMatch[2]),
            type: precipType,
            note: precipMatch[3]?.trim(),
        },

        advisory: advisoryMatch
            ? {
                  title: advisoryMatch[1].trim(),
                  body: advisoryMatch[2].trim().replace(/\s+/g, " "),
              }
            : undefined,

        tags: data.tags,
    };
}

function pickLatest(): EmotionalWeatherSignal | null {
    const entries = Object.entries(REPORT_FILES);
    if (entries.length === 0) return null;

    const sorted = entries.sort(([a], [b]) => b.localeCompare(a));
    for (const [, src] of sorted) {
        const parsed = parseWeatherMarkdown(src);
        if (parsed) return parsed;
    }
    return null;
}

export const EMOTIONAL_WEATHER_LATEST: EmotionalWeatherSignal =
    pickLatest() ?? EMOTIONAL_WEATHER_STATIC;
