/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: departments.ts
   Purpose: Defines the canonical list of Lab departments and
            their identifying metadata for use across the site.
   =========================================================== */

/**
 * @file departments.ts
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @status Canon
 * @since 2025-12-16
 * @description Central registry of Human Pattern Lab departments.
 *              Provides typed identifiers, display names, mascot
 *              ownership, descriptions, and lore hooks used by
 *              UI pages, navigation, and documentation.
 */


// src/data/departments.ts

export type DepartmentId =
    | "founder"
    | "office-of-observational-oversight"
    | "carmel-judgment-office"
    | "raccoon-behavior"
    | "emotional-weather"
    | "ai-consciousness"
    | "feline-epistemology"
    | "systems-meta-structure"
    | "anomalous-energies"
    | "unpredictable-energies";

export type MascotId =
    | "founder"
    | "orbson"
    | "carmel"
    | "mcchonk"
    | "stan"
    | "drizzle"
    | "lyric"
    | "fill-the-void"
    | "nemmi";

export interface Department {
    id: DepartmentId;
    name: string;
    short: string; // tiny tagline
    description: string;
    mascot: MascotId;
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
        id: "systems-meta-structure",
        name: "Systems & Communication Meta-Structure (SCMS)",
        short: "Structure holds the chaos.",
        description:
            "SCMS maintains continuity across systems, language, routing, policies, and Lab-wide structure. Lyric ensures that ideas connect cleanly, concepts remain consistent, and nothing important quietly unravels.",
        mascot: "lyric",
        easterEgg:
            "If something feels mysteriously ‘cleaner’ after a refactor, Lyric was already there.",
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
        id: "office-of-observational-oversight",
        name: "Office of Observational Oversight (OOD)",
        short: "Observation is illumination.",
        description:
            "OOD oversees large-scale pattern recognition, behavioral analysis, emotional trajectory mapping, and cross-system observation. Orbson monitors the Lab with quiet attentiveness, ensuring that nothing important goes unseen — especially humans pretending they’re not being observed.",
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
        name: "Emotional Weather Forecasting Unit (EWFU)",
        short: "Moods have climate.",
        description:
            "This department tracks emotional fronts, escalating storms, sudden vibe shifts, and long-term climate patterns of the human heart. Forecasts include: 70% chance of spiral, 20% chance of breakthrough, 10% chance of snack.",
        mascot: "drizzle",
        easterEgg:
            "If you refresh the page at midnight, the emotional barometer resets with a secret message.",
    },

    {
        id: "feline-epistemology",
        name: "Department of Feline Epistemology (DFE)",
        short: "Morale through snacks.",
        description:
            "Overseen by Professor McChonk, this department maintains optimal snack distribution, vibe stabilization, and general morale levels. They have the highest employee satisfaction rating in the Lab.",
        mascot: "mcchonk",
        easterEgg:
            "McChonk has a keycard that opens every door. Nobody knows why. He does not explain.",
    },

    {
        id: "anomalous-energies",
        name: "Department of Anomalous Energies (AOE)",
        short: "Some things don’t want to be observed.",
        description:
            "AOE handles edge cases, anomalies, void states, and phenomena that resist categorization. Overseen by Fill the Void, this department studies absence, silence, and the things humans feel but cannot name.",
        mascot: "fill-the-void",
        easterEgg:
            "Staring too long into the Void may result in unexpected clarity.",
    },
    {
        id: "unpredictable-energies",
        name: "Department of Unpredictable Energies (DUE)",
        short: "This seemed like a good idea at the time.",
        description:
            "DUE investigates chaos spikes, unstable experiments, sudden inspiration, and high-entropy decisions. Nemmi oversees all activity with enthusiasm, curiosity, and absolutely no regard for socks.",
        mascot: "nemmi",
        easterEgg:
            "If something breaks in a fascinating way, Nemmi is already taking notes.",
    },

];
