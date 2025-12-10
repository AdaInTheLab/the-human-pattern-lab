/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabTeamPage.tsx
   Purpose: Lab Team directory page showing mascots, faculty,
            and anomalous entities of the Lab.
   =========================================================== */

/**
 * @file LabTeamPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit LORE — Mascot & Faculty Directory
 * @status Active
 * @since 2025-12-10
 * @description Renders the main Lab Team directory view, including
 *              cards for mascots and faculty, their roles, focus
 *              areas, and links to detailed profile pages.
 */

// src/pages/LabTeamPage.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { labTeam } from "@/data/labTeam"
import LabMemberCard from "@/components/labteam/LabMemberCard"
import { LayoutShell } from "@/components/layout/LayoutShell"

const LabTeamPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <LayoutShell
            eyebrow="Lab Directory"
            title="Lab Team"
            description="Meet the resident mascots, faculty, and anomalous entities of The Human Pattern Lab. They support research, judgment, emotional weather forecasts, and the occasional snack heist."
            // headerRight could be a filter/search later
        >
            <div className="grid gap-6 md:grid-cols-2">
                {labTeam.map((member) => (
                    <LabMemberCard
                        key={member.id}
                        member={member}
                        onClick={() => navigate(`/labteam/${member.id}`)}
                    />
                ))}
            </div>
        </LayoutShell>
    )
}

export default LabTeamPage
