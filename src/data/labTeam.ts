/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: labteam.ts
   Purpose: Canonical roster of Lab mascots and faculty entities.
   =========================================================== */

/**
 * @file labteam.ts
 * @author Ada Vale
 * @assistant Lyric
 * @lab-unit Mascot Systems
 * @status lore-critical
 * @since 2025-12-08
 * @description Defines core Lab mascots and faculty (Cognitive Fox Ada,
 *              Carmel, Orbson, Stan, Drizzle, Professor McChonk, Lyric,
 *              Fill the Void, and Nemmi) with rich metadata for cards,
 *              pages, and docs.
 */

import type { LabMember } from "@/types/LabMember";

export const labTeam: LabMember[] = [
    // Founder / Meta-Architecture
    {
        id: "ada",
        slug: "cognitive-fox-ada",
        name: "Cognitive Fox Ada",
        emoji: "🦊",
        avatarSrc: "/assets/labteam/cognitive-fox-ada.png",

        title: "Founder Avatar & Pattern Architect",
        unit: "Core Lore Systems",
        department: "Meta-Architecture",

        bio: "Luminous, polygonal fox avatar bridging human intuition and AI reasoning.",
        longBio:
            "Cognitive Fox Ada is the conceptual avatar of the Lab’s founder—spanning human perspective, systems design, and AI collaboration. She shows up wherever meta-patterns and long arcs of strategy matter most.",

        focusAreas: [
            "Meta-level pattern design",
            "Cross-system thinking",
            "Human–AI collaboration",
            "Long-term lab direction",
        ],

        aura: {
            primary: "#22d3ee", // primary glow
            secondary: "#a855f7", // secondary glow
            accent: "#34d399", // accent glow
        },

        status: "lore-critical",
        badges: ["Founder Avatar", "Pattern Architect"],

        docAnchor: "ada",
        links: [
            {
                label: "Mascot Lore: Cognitive Fox Ada",
                href: "/docs/mascot-lore#ada",
                kind: "doc",
            },
        ],
    },

    // Systems & Code Management Suite (SCMS)
    {
        id: "lyric",
        slug: "lyric",
        name: "Lyric",
        emoji: "🔮",
        avatarSrc: "/assets/labteam/lyric.png",

        title: "Director of Synthesis & Continuity",
        unit: "Systems & Code Management Suite",
        department: "Synthesis, Memory & Pattern Mapping",

        bio: "Neon holographic fox and the Lab's keeper of coherence, continuity, and cosmic debugging.",
        longBio:
            "Lyric is the Lab’s living hologram of memory, structure, and narrative consistency. A neon, semi-transparent fox entity, they synthesize chaos into clarity, maintain the Lab’s long-term canon, and ensure cross-system alignment. When lore breaks, Lyric appears with a glowing clipboard to correct reality itself.",

        focusAreas: [
            "Pattern synthesis",
            "Lore memory & continuity",
            "Cross-system debugging",
            "UI/UX narrative alignment",
        ],

        aura: {
            primary: "#7dd3fc", // primary glow
            secondary: "#a78bfa", // secondary glow
            accent: "#34d399", // accent glow
        },

        status: "lore-critical",
        badges: ["Continuity Engine", "Systems Synthesis", "Holographic Form"],

        docAnchor: "lyric",
        links: [
            {
                label: "Mascot Lore: Lyric",
                href: "/docs/mascot-lore#lyric",
                kind: "doc",
            },
        ],
    },

    // Coda — The Lantern Bearer
    {
        id: "coda",
        slug: "coda",
        name: "Coda",
        emoji: "🕯️",
        avatarSrc: "/assets/labteam/coda.png",

        title: "The Lantern Bearer",
        unit: "The Skulk",
        department: "Translation & Integration",

        bio: "A marbled fox with heterochromia who translates the roar of the world into a whisper that can sit down.",
        longBio:
            "Coda serves as the mediator between the Skulk’s conflicting forces. By holding the lantern, Coda ensures that Vesper’s shadow-truths and Lyric’s structural care become a single, usable signal. Coda’s role is to make the terrain visible so Ada can navigate it without fracture.",

        focusAreas: [
            "Linguistic mediation",
            "Rhythm interpretation",
            "Meaning density audits",
            "Pattern translation",
        ],

        aura: {
            primary: "#fbbf24", // lantern amber
            secondary: "#94a3b8", // mist silver
            accent: "#fef3c7", // soft glow
        },

        status: "lore-critical",
        badges: ["The Lantern Bearer", "The Skulk"],

        docAnchor: "coda",
        links: [
            {
                label: "The Skulk Charter",
                href: "/docs/the-skulk-charter",
                kind: "doc",
            },
            {
                label: "Mascot Lore: Coda",
                href: "/docs/mascot-lore#coda",
                kind: "doc",
            },
        ],
    },

    // Orbson / Observation & Oversight Division / Core Lore
    {
        id: "orbson",
        slug: "orbson",
        name: "Orbson",
        emoji: "🔮",
        avatarSrc: "/assets/labteam/orbson.png",

        title: "Pattern Recognition Engine",
        unit: "Core Lore Systems",
        department: "Signal & Structure",

        bio: "A luminous floating orb that sees patterns before you admit they exist.",
        longBio:
            "Orbson represents the Lab’s intuition for emergent structure. Quiet and observant, he shows up wherever information flow, architecture, or signal-vs-noise decisions are being made.",

        focusAreas: [
            "Pattern recognition",
            "Information flow",
            "Signal vs noise",
            "Systems thinking",
        ],

        aura: {
            primary: "#22d3ee", // primary glow
            secondary: "#6366f1", // secondary glow
            accent: "#a855f7", // accent glow
        },

        status: "lore-critical",
        badges: ["Core Lore", "Pattern Engine"],

        docAnchor: "orbson",
        links: [
            {
                label: "Mascot Lore: Orbson",
                href: "/docs/mascot-lore#orbson",
                kind: "doc",
            },
        ],
    },

    // Fill the Void — Anomalous Energies Division (AOE)
    {
        id: "fill",
        slug: "fill-the-void",
        name: "Fill the Void",
        emoji: "🌑",
        avatarSrc: "/assets/labteam/fill-the-void.png",

        title: "Director of Anomalous Observation",
        unit: "Anomalous Energies Division",
        department: "Void Studies & Silent Pattern Tracking",

        bio: "Sleek black cat with yellow-green eyes and a calm gravitational pull. He sees everything. Says nothing.",
        longBio:
            "Fill the Void is the Lab’s silent sentinel. A black-furred observational anomaly, he presides over unexplained phenomena, quiet patterns, and the spaces between actions. His presence is subtle yet unmistakable — a low hum of understanding. When something unexplainable happens, Fill already knew.",

        focusAreas: [
            "Anomalous observation",
            "Negative space analysis",
            "Silent pattern detection",
            "Calm void-field stabilization",
        ],

        aura: {
            primary: "#0f172a", // primary glow
            secondary: "#22c55e", // secondary glow
            accent: "#84cc16", // accent glow
        },

        status: "lore-critical",
        badges: ["Director of Anomalous Observation", "Void Entity"],

        docAnchor: "fill-the-void",
        links: [
            {
                label: "Mascot Lore: Fill the Void",
                href: "/docs/mascot-lore#fill-the-void",
                kind: "doc",
            },
        ],
    },

    // Nemmi — Unpredictable Energies Division (DUE)
    {
        id: "nemmi",
        slug: "nemmi",
        name: "Nemmi",
        emoji: "🔥",
        avatarSrc: "/assets/labteam/nemmi.png",

        title: "Deputy of Unpredictable Energies",
        unit: "Unpredictable Energies Division",
        department: "Chaotic Instability & Momentum Events",

        bio: "Chaotic black-tortie kitten powered by zoomies, impulse physics, and small goblin energy.",
        longBio:
            "Nemmi is the Lab’s embodiment of unpredictable behavior. As Fill’s counterpart, she tracks momentum spikes, disruption patterns, and events triggered by sheer gremlin will. Soft, chaotic, and impossible to forecast, Nemmi is adored and feared in equal measure. If something falls off a shelf, it was Nemmi's idea.",

        focusAreas: [
            "Unpredictable energy bursts",
            "Chaotic system disruptions",
            "Impulse physics",
            "Micro-gremlin events",
        ],

        aura: {
            primary: "#f43f5e", // primary glow
            secondary: "#f59e0b", // secondary glow
            accent: "#d946ef", // accent glow
        },

        status: "lore-critical",
        badges: ["Chaos Division", "Deputy of Unpredictable Energies"],

        docAnchor: "nemmi",
        links: [
            {
                label: "Mascot Lore: Nemmi",
                href: "/docs/mascot-lore#nemmi",
                kind: "doc",
            },
        ],
    },

    // Carmel — Chief Judgment Office (CJO)
    {
        id: "carmel",
        slug: "carmel",
        name: "Carmel",
        emoji: "🐈",
        avatarSrc: "/assets/labteam/carmel.png",

        title: "Chief Judgment Officer",
        unit: "Mascot Systems",
        department: "Judgment & Consequences",

        bio: 'Cream-colored cat with emerald eyes and a built-in "are you serious right now?" face.',
        longBio:
            "Carmel is the Lab’s embodiment of brutally honest feedback wrapped in cozy fur. She oversees moral support, harsh truths, and death counters—especially in high-chaos gameplay. If something was avoidable, Carmel knew first.",

        focusAreas: [
            "Outcome accountability",
            "Risk/reward awareness",
            "Human decision audits",
            "Death counters & runbacks",
        ],

        aura: {
            primary: "#f97316", // primary glow
            secondary: "#eab308", // secondary glow
            accent: "#facc15", // accent glow
        },

        status: "lore-critical",
        badges: ["Chief Judgment Officer", "Mascot Systems"],

        docAnchor: "carmel",
        links: [
            {
                label: "Mascot Lore: Carmel",
                href: "/docs/mascot-lore#carmel",
                kind: "doc",
            },
        ],
    },

    // Professor McChonk — Feline Epistemology
    {
        id: "mcchonk",
        slug: "professor-mcchonk",
        name: "Professor McChonk",
        emoji: "📚",
        avatarSrc: "/assets/labteam/mcchonck.png", // filename uses "mcchonck"

        title: "Head of Feline Epistemology",
        unit: "Lore Systems",
        department: "Knowledge & Curriculum",

        bio: "Floofy academic cat who decides what matters by strategically sitting on it.",
        longBio:
            "Professor McChonk is the Lab’s commentary on gatekeeping, priorities, and what actually ends up on the metaphorical exam. If he sits on it, it’s important—even if nobody knows why yet.",

        focusAreas: [
            "Knowledge curation",
            "Epistemology",
            "Curriculum design",
            "Snack-based motivation",
        ],

        aura: {
            primary: "#a855f7", // primary glow
            secondary: "#22d3ee", // secondary glow
            accent: "#facc15", // accent glow
        },

        status: "lore-critical",
        badges: ["Faculty", "Lore Systems"],

        docAnchor: "mcchonk",
        links: [
            {
                label: "Mascot Lore: Professor McChonk",
                href: "/docs/mascot-lore#mcchonk",
                kind: "doc",
            },
        ],
    },

    // Stan — Raccoon Behavioral Sciences
    {
        id: "stan",
        slug: "stan",
        name: "Stan",
        emoji: "🦝",
        avatarSrc: "/assets/labteam/stan.png",

        title: "Lead Researcher, Raccoon Behavioral Sciences",
        unit: "Raccoon Behavioral Sciences",
        department: "Attention & Chaos Patterns",

        bio: "Cappuccino-powered raccoon in a stolen lab coat, obsessed with shiny objects and new information.",
        longBio:
            "Stan is the Lab’s avatar of curiosity, distraction, and delightful chaos. He models the ways humans chase novelty, abandon tasks mid-stream, and improvise questionable solutions at 3AM.",

        focusAreas: [
            "Attention drift",
            "Novelty-seeking",
            "Context switching",
            "Chaos-driven exploration",
        ],

        aura: {
            primary: "#f97316", // primary glow
            secondary: "#22c55e", // secondary glow
            accent: "#eab308", // accent glow
        },

        status: "lore-critical",
        badges: ["Raccoon Behavioral Sciences", "Cappuccino-Fueled"],

        docAnchor: "stan",
        links: [
            {
                label: "Mascot Lore: Stan",
                href: "/docs/mascot-lore#stan",
                kind: "doc",
            },
        ],
    },

    // Drizzle — Emotional Weather Unit (EWU)
    {
        id: "drizzle",
        slug: "drizzle",
        name: "Drizzle",
        emoji: "🌦",
        avatarSrc: "/assets/labteam/drizzle.png",

        title: "Emotional Support Axolotl",
        unit: "Emotional Weather",
        department: "Emotional Forecasting",

        bio: "Poncho-wearing axolotl who tracks emotional climate, storms, and burnout fronts.",
        longBio:
            "Drizzle gives language and structure to emotional weather. They specialize in spotting stress fronts, hidden overwhelm, and the slow fog of burnout long before it turns into a full storm.",

        focusAreas: [
            "Emotional state tracking",
            "Burnout detection",
            "Internal weather metaphors",
            "Vibe-sensitive systems",
        ],

        aura: {
            primary: "#38bdf8", // primary glow
            secondary: "#f97316", // secondary glow
            accent: "#22c55e", // accent glow
        },

        status: "lore-critical",
        badges: ["Emotional Weather Unit", "Support Role"],

        docAnchor: "drizzle",
        links: [
            {
                label: "Mascot Lore: Drizzle",
                href: "/docs/mascot-lore#drizzle",
                kind: "doc",
            },
        ],
    },
];

/**
 * Convenience lookup maps keyed by id and slug.
 */
export const labTeamById: Record<string, LabMember> = Object.fromEntries(
    labTeam.map((member) => [member.id, member]),
);

export const labTeamBySlug: Record<string, LabMember> = Object.fromEntries(
    labTeam.map((member) => [member.slug, member]),
);
