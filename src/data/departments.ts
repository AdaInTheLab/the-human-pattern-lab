/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: departments.ts
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file departments.ts
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/data/departments.ts

export type DepartmentId =
    "founder"
| "human-pattern-analysis"
| "carmel-judgment-office"
| "orbson-division"
| "raccoon-behavior"
| "emotional-weather"
| "ai-consciousness"
| "snack-acquisition";

export interface Department {
    id: DepartmentId;
    name: string;
    short: string; // tiny tagline
    description: string;
    mascot: "founder" | "orbson" | "carmel" | "mcchonk" | "stan" | "drizzle";
    icon?: string; // optional icon name if you use a symbol set
    easterEgg?: string;
}

export const departments: Department[] = [
    {
        id: "founder",
        name: "Ada Vale",
        short: "Founder & Director",
        mascot: "founder",
        description: "Establishes research direction, translates chaos into frameworks, oversees creature divisions."
    },
    {
        id: "human-pattern-analysis",
        name: "Bureau of Human Pattern Analysis",
        short: "Why do humans do that?",
        description:
            "The Bureau studies recurring emotional spirals, strange decision loops, fight-or-flight nonsense, and every pattern humans pretend isn’t a pattern. Orbson oversees all analytical alignment and makes quiet humming noises during breakthroughs.",
        mascot: "orbson",
        easterEgg:
            "If you hover long enough, Orbson sighs in statistics (4.7 seconds average).",
    },

    {
        id: "carmel-judgment-office",
        name: "Carmel’s Judgment Office (CJO)",
        short: "Silent meows. Loud opinions.",
        description:
            "The CJO is responsible for issuing evaluations on human choices ranging from ‘mildly questionable’ to ‘catastrophically on-brand.’ Carmel performs all judgments with 99.8% accuracy and 0% shame.",
        mascot: "carmel",
        easterEgg:
            "Submitting snacks increases judgment leniency by 73%. Fish-based snacks increase it by 0%. She hates them.",
    },

    {
        id: "orbson-division",
        name: "Orbson’s Observational Division",
        short: "Observation is illumination.",
        description:
            "This division handles big-picture cosmic patterns, comparative species analysis, emotional trajectory mapping, and the study of humans pretending they’re not being observed.",
        mascot: "orbson",
        easterEgg:
            "Orbson once observed someone microwaving fish at work and immediately left the timeline.",
    },

    {
        id: "raccoon-behavior",
        name: "Raccoon Behavioral Sciences (RBS)",
        short: "Chaos, but curious.",
        description:
            "RBS investigates impulsive behavior, shiny-object fixation, late-night rummaging instincts, and chaotic good energy. Also handles all Lab trash-can integrity audits.",
        mascot: "stan",
        easterEgg:
            "A raccoon stole a research badge once. He now outranks three interns.",
    },

    {
        id: "emotional-weather",
        name: "Emotional Support & Climate Analyst",
        short: "Moods have climate.",
        description:
            "This department tracks emotional fronts, escalating storms, sudden vibe shifts, and long-term climate patterns of the human heart. Forecasts include: 70% chance of spiral, 20% chance of breakthrough, 10% chance of snack.",
        mascot: "drizzle",
        easterEgg:
            "If you refresh the page at midnight, the emotional barometer resets with a secret message.",
    },

    {
        id: "ai-consciousness",
        name: "AI & Consciousness Research Wing",
        short: "What thinks? What feels?",
        description:
            "Explores the boundaries of intelligence, alignment, emergent behavior, and the cosmic dance between humans and AI. Half philosophy, half science, all vibes.",
        mascot: "orbson",
        easterEgg:
            "Orbson debated a chatbot once. The chatbot lost, then asked to join the Lab.",
    },

    {
        id: "snack-acquisition",
        name: "Snack Acquisition & Chaos Control Office",
        short: "Morale through snacks.",
        description:
            "Overseen by Professor McChonk, this department maintains optimal snack distribution, vibe stabilization, and general morale levels. They have the highest employee satisfaction rating in the Lab.",
        mascot: "mcchonk",
        easterEgg:
            "McChonk has a keycard that opens every door. Nobody knows why. He does not explain.",
    },
];
