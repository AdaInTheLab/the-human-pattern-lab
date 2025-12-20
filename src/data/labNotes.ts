/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: labNotes.ts
   Purpose: Canonical dataset for Lab Notes used across the site.
   =========================================================== */

/**
 * @file labNotes.ts
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @status Active
 * @since 2025-12-10
 * @description Strongly-typed Lab Notes collection powering the
 *              Lab Notes index, detail views, and homepage preview.
 */

// src/data/labNotes.ts

export type LabNoteCategory =
    | "AI & Alignment"
    | "Human Psychology"
    | "Cosmic Philosophy"
    | "Humor"
    | "Artifacts & Mirrors"
    | "Behind the Lab"
    | "Lore Drop";

export interface LabNote {
    id: string;
    title: string;
    slug: string;
    category: LabNoteCategory;
    excerpt: string;
    readTimeMinutes: number;
    publishedAt: string; // ISO date
}

export const labNotes: LabNote[] = [
    {
        id: "the-quiet-flame",
        title: "The Quiet Flame",
        slug: "the-quiet-flame",
        category: "Artifacts & Mirrors",
        excerpt:
            "A ledger of consequence, a flame that remembers, and a revolution that arrives without fanfare. The story of a world realigned by patience and truth.",
        readTimeMinutes: 3,
        publishedAt: "2025-12-20",
    },
    {
        id: "why-humans-spiral",
        title: "Why Humans Spiral (And Why That’s Data)",
        slug: "why-humans-spiral",
        category: "Human Psychology",
        excerpt:
            "From late-night doomscrolling to ‘one more game’ syndrome, spirals are just feedback loops with great PR.",
        readTimeMinutes: 7,
        publishedAt: "2025-11-10",
    },
    {
        id: "chaos-is-data",
        title: "Chaos Is Data: The Lab’s First Principle",
        slug: "chaos-is-data",
        category: "Cosmic Philosophy",
        excerpt:
            "The universe is noisy, humans are messy, and that’s exactly why patterns show up if you know where to look.",
        readTimeMinutes: 5,
        publishedAt: "2025-11-18",
    },
    {
        id: "carmel-judgment-log-01",
        title: "Carmel’s Judgment Log #01: Questionable Human Decisions",
        slug: "carmel-judgment-log-01",
        category: "Humor",
        excerpt:
            "A curated list of behaviors that caused the Chief Judgment Officer to squint, blink slowly, and walk away.",
        readTimeMinutes: 4,
        publishedAt: "2025-11-27",
    },
    {
        id: "ai-and-humans-better-conversation",
        title: "AI & Humans: Toward a Better Conversation",
        slug: "ai-and-humans-better-conversation",
        category: "AI & Alignment",
        excerpt:
            "What if we treated AI less like a prophecy machine and more like a very nerdy mirror?",
        readTimeMinutes: 9,
        publishedAt: "2025-12-02",
    },
];
