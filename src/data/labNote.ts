/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: labNote.ts
   Purpose: Canonical dataset for Lab Notes used across the site.
   =========================================================== */

/**
 * @file labNote.ts
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Code Management Suite
 * @status Active
 * @since 2025-12-25
 * @description Strongly-typed Lab Note that returns one record
 */

// src/data/labNotes.ts

type ApiLabNote = {
    id: string;
    title: string;
    subtitle?: string;
    summary?: string;
    contentHtml: string;
    content_ref?: string;// can be full HTML, not just excerpt
    published?: string;
    tags?: string[];
    readingTime?: number;
    department_id?: string;
    shadow_density?: number;
    safer_landing?: boolean;
    created?: string;
    updated?: string;
    card_style?: string;
};
