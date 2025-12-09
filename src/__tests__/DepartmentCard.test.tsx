/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: DepartmentCard.test.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file DepartmentCard.test.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

import { render } from "@testing-library/react"
import {DepartmentCard} from "@/components/departments/DepartmentCard"

export const mockEmotionalWeatherDept = {
    id: "emotional-weather",
    name: "Emotional Weather Forecasting Unit",
    short: "EWFU",
    description:
        "A specialized division dedicated to detecting emotional storms, monitoring vibe pressure systems, and issuing warnings before someone’s feelings go supernova.",
    mascot: "drizzle",
    contact: {
        email: "drizzle@thehumanpatternlab.com",
        extension: "404", // obviously
    },
    metadata: {
        createdAt: "2024-11-20",
        updatedAt: "2024-11-20"
    }
} as const


it("matches snapshot", () => {
    const { container } = render(<DepartmentCard department={mockEmotionalWeatherDept} />)
    expect(container).toMatchSnapshot()
})