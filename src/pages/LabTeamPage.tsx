/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabTeamPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file LabTeamPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
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
