/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabMember.ts
   Purpose: Shared type definition for Lab mascots and faculty.
   =========================================================== */

/**
 * @file LabMember.ts
 * @author Dara
 * @assistant Lyric
 * @lab-unit Mascot Systems
 * @status lore-critical
 * @since 2025-12-08
 * @description Strongly-typed model for Lab members used by cards,
 *              pages, and data modules like `labteam.ts`.
 */

export interface MascotAura {
    /** Tailwind-ish hex or CSS colors for gradients/glows */
    primary: string;
    secondary: string;
    accent: string;
}

export type LabMemberStatus =
    | "lore-critical"
    | "guest";

export interface LabMemberLink {
    label: string;
    href: string;
    kind?: "doc" | "route" | "external";
}

export interface LabMember {
    /** Stable ID used in routing and lookups */
    id: string;
    /** URL-safe slug for routes like /labteam/:slug */
    slug: string;
    /** Display name (e.g., "Carmel") */
    name: string;
    /** Optional emoji used in UI chips/cards */
    emoji?: string;

    /** Short title/role shown on cards */
    title: string;
    /** High-level unit they belong to (e.g., Raccoon Behavioral Sciences) */
    unit: string;
    /** A slightly more specific department/focus label */
    department: string;

    /** One–two sentence primary bio for cards */
    bio: string;
    /** Extra detail for detail views or tooltips */
    longBio?: string;

    /** Thematically relevant focus areas */
    focusAreas: string[];

    /** Visual aura used by cards/avatars */
    aura: MascotAura;

    /** Lore/architecture status */
    status: LabMemberStatus;

    /** Badges like "Founder Avatar", "Emotional Weather" */
    badges?: string[];

    /** Anchor into Mascot Lore docs (e.g., "carmel") */
    docAnchor?: string;

    /** Helpful cross-links (docs, routes, external) */
    links?: LabMemberLink[];
}
