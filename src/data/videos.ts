/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: videos.ts
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file videos.ts
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/data/videos.ts

export type VideoCategory =
    | "AI Discussions"
    | "Human Behavior"
    | "Philosophy"
    | "Carmel’s Judgment Logs"
    | "Orbson Reports"
    | "Short"
    | "Full Episode";

export interface LabVideo {
    id: string;
    title: string;
    slug: string;
    category: VideoCategory;
    description: string;
    duration: string; // e.g. "12:34"
    youtubeId: string; // actual YouTube video ID
    isFeatured?: boolean;
}

export const labVideos: LabVideo[] = [
    {
        id: "ai-humans-better-conversation",
        title: "AI & Humans: A Better Conversation",
        slug: "ai-humans-better-conversation",
        category: "AI Discussions",
        description:
            "Instead of treating AI like a prophecy orb or an apocalypse engine, what if we just... talked better?",
        duration: "18:22",
        youtubeId: "YOUR_YT_ID_1", // ← replace with real ID
        isFeatured: true,
    },
    {
        id: "why-humans-spiral",
        title: "Why Humans Spiral",
        slug: "why-humans-spiral",
        category: "Human Behavior",
        description:
            "A guided tour through feedback loops, anxiety spirals, and why 'just stop thinking about it' doesn’t work.",
        duration: "14:09",
        youtubeId: "YOUR_YT_ID_2",
    },
    {
        id: "carmel-judgment-log-01",
        title: "Carmel’s Judgment Log #01",
        slug: "carmel-judgment-log-01",
        category: "Carmel’s Judgment Logs",
        description:
            "Carmel reviews some truly questionable human decisions and assigns a scientifically accurate Judgment Score.",
        duration: "09:41",
        youtubeId: "YOUR_YT_ID_3",
    },
];
