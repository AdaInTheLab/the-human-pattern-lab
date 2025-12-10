import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LabTeamPage from "@/pages/LabTeamPage";
import { labTeam } from "@/data/labTeam";

describe("LabTeamPage", () => {
    const renderPage = () =>
        render(
            <MemoryRouter>
                <LabTeamPage />
            </MemoryRouter>
        );

    it("renders without crashing and shows the main heading", () => {
        renderPage();

        expect(
            screen.getByRole("heading", { name: /lab team/i })
        ).toBeInTheDocument();

        expect(
            screen.getByText(/resident mascots, faculty, and anomalous entities/i)
        ).toBeInTheDocument();
    });

    it("renders a card for each lab member", () => {
        renderPage();

        labTeam.forEach((member) => {
            // Name should be unique enough to use getByText
            expect(screen.getByText(member.name)).toBeInTheDocument();

            // Title may appear in multiple places (title line + badge), so allow multiples
            const titleMatches = screen.getAllByText(member.title);
            expect(titleMatches.length).toBeGreaterThan(0);
        });
    });

    it("renders avatars for each member (by alt text)", () => {
        renderPage();

        labTeam.forEach((member) => {
            const img = screen.getByAltText(member.name);
            expect(img).toBeInTheDocument();
        });
    });
});
