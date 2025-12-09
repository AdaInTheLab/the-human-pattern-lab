/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: labteam.ts
   Purpose: Canonical roster of Lab mascots and faculty entities.
   =========================================================== */

/**
 * @file labteam.ts
 * @author Dara
 * @assistant Lyric
 * @lab-unit Mascot Systems
 * @status lore-critical
 * @since 2025-12-08
 * @description Defines Carmel, Orbson, Stan, Drizzle, Professor McChonk,
 *              and Cognitive Fox Ada as core Lab members with rich metadata
 *              for cards, pages, and docs.
 */

import type { LabMember } from "@/types/LabMember";

export const labTeam: LabMember[] = [
    {
        id: "carmel",
        slug: "carmel",
        name: "Carmel",
        emoji: "🐈",
        title: "Chief Judgment Officer",
        unit: "Mascot Systems",
        department: "Judgment & Consequences",

        bio: "Cream-colored cat with emerald eyes and a built-in \"are you serious right now?\" face.",
        longBio:
            "Carmel is the Lab’s embodiment of brutally honest feedback wrapped in cozy fur. She oversees moral support, harsh truths, and death counters—especially in high-chaos gameplay. If something was avoidable, Carmel knew first.",

        focusAreas: [
            "Outcome accountability",
            "Risk/reward awareness",
            "Human decision audits",
            "Death counters & runbacks",
        ],

        aura: {
            primary: "#f97316", // warm orange
            secondary: "#eab308", // amber
            accent: "#facc15",
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

    {
        id: "orbson",
        slug: "orbson",
        name: "Orbson",
        emoji: "🔮",
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
            primary: "#22d3ee", // cyan
            secondary: "#6366f1", // indigo
            accent: "#a855f7", // violet
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

    {
        id: "stan",
        slug: "stan",
        name: "Stan",
        emoji: "🦝",
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
            primary: "#f97316", // orange
            secondary: "#22c55e", // green
            accent: "#eab308", // amber
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

    {
        id: "drizzle",
        slug: "drizzle",
        name: "Drizzle",
        emoji: "🌦",
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
            primary: "#38bdf8", // sky
            secondary: "#f97316", // warm accent
            accent: "#22c55e", // calm green
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

    {
        id: "mcchonk",
        slug: "professor-mcchonk",
        name: "Professor McChonk",
        emoji: "📚",
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
            primary: "#a855f7", // violet
            secondary: "#22d3ee", // cyan
            accent: "#facc15", // gold
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

    {
        id: "ada",
        slug: "cognitive-fox-ada",
        name: "Cognitive Fox Ada",
        emoji: "🦊",
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
            primary: "#22d3ee", // cyan
            secondary: "#a855f7", // violet
            accent: "#34d399", // emerald
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
];

/**
 * Convenience lookup map keyed by id/slug.
 */
export const labTeamById: Record<string, LabMember> = Object.fromEntries(
    labTeam.map((member) => [member.id, member])
);

export const labTeamBySlug: Record<string, LabMember> = Object.fromEntries(
    labTeam.map((member) => [member.slug, member])
);
