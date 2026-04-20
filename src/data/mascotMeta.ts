import type { MascotId } from "@/data/departments";

export const mascotEmoji: Record<MascotId, string> = {
    founder: "🦊",
    orbson: "👁️",
    carmel: "😼",
    mcchonk: "🍩",
    stan: "🦝",
    drizzle: "🌧️",
    lyric: "🔮",
    "fill-the-void": "🌘",
    nemmi: "🔥",
};

export const mascotName: Record<MascotId, string> = {
    founder: "Ada",
    orbson: "Orbson",
    carmel: "Carmel",
    mcchonk: "Professor McChonk",
    stan: "Stan",
    drizzle: "Drizzle",
    lyric: "Lyric",
    "fill-the-void": "Fill the Void",
    nemmi: "Nemmi",
};

/** Avatar image paths (mirrors labTeam). */
export const mascotAvatar: Record<MascotId, string> = {
    founder: "/assets/labteam/cognitive-fox-ada.png",
    orbson: "/assets/labteam/orbson.png",
    carmel: "/assets/labteam/carmel.png",
    mcchonk: "/assets/labteam/mcchonck.png",
    stan: "/assets/labteam/stan.png",
    drizzle: "/assets/labteam/drizzle.png",
    lyric: "/assets/labteam/lyric.png",
    "fill-the-void": "/assets/labteam/fill-the-void.png",
    nemmi: "/assets/labteam/nemmi.png",
};

/** Lab team slug used for /labteam/:slug routes. */
export const mascotProfileSlug: Record<MascotId, string> = {
    founder: "cognitive-fox-ada",
    orbson: "orbson",
    carmel: "carmel",
    mcchonk: "professor-mcchonk",
    stan: "stan",
    drizzle: "drizzle",
    lyric: "lyric",
    "fill-the-void": "fill-the-void",
    nemmi: "nemmi",
};
