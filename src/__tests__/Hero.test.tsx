/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: Hero.test.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file Hero.test.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "@/components/home/Hero";

describe("Hero", () => {
    it("renders the lab title and CTA links", () => {
        render(
            <MemoryRouter>
                <Hero />
            </MemoryRouter>
        );

        expect(
            screen.getByText("The Human Pattern Lab")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /enter the lab/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /view lab notes/i })
        ).toBeInTheDocument();
    });
});
