/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: HomePage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file HomePage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { LabTeamPreview } from "@/components/home/LabTeamPreview";
import { RecentLabNotesPreview } from "@/components/home/RecentLabNotesPreview";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { LayoutShell } from "@/components/layout/LayoutShell";

export function HomePage() {
    return (
        <LayoutShell>
            <Hero />
            <Pillars />
            <LabTeamPreview />
            <RecentLabNotesPreview />
            <FeaturedVideo />
        </LayoutShell>
    );
}
