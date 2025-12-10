import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { LabMemberCard } from "@/components/labteam/LabMemberCard";
import { labTeam } from "@/data/labTeam";

describe("LabMemberCard", () => {
    const member = labTeam[0]; // Carmel, lore-critical queen

    it("renders name, title, and unit/department", () => {
        render(
            <MemoryRouter>
                <LabMemberCard member={member} />
            </MemoryRouter>
        );

        // Name is unique, so getByText is fine
        expect(screen.getByText(member.name)).toBeInTheDocument();

        // Title appears in both the header and a badge, so allow multiple
        const titleMatches = screen.getAllByText(member.title);
        expect(titleMatches.length).toBeGreaterThan(0);

        const unitLine = screen.getByText(
            (_, el) =>
                el?.textContent ===
                `${member.unit}${member.department ? ` · ${member.department}` : ""}`
        );
        expect(unitLine).toBeInTheDocument();
    });

    it("renders avatar with correct alt and src", () => {
        render(
            <MemoryRouter>
                <LabMemberCard member={member} />
            </MemoryRouter>
        );

        const img = screen.getByAltText(member.name) as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(member.avatarSrc); // relative → resolved by jsdom
    });

    it("links to the member detail route", () => {
        render(
            <MemoryRouter>
                <LabMemberCard member={member} />
            </MemoryRouter>
        );

        const detailLink = screen.getByRole("link", { name: /view profile/i });
        expect(detailLink).toHaveAttribute("href", `/labteam/${member.slug}`);
    });

    it("renders focus areas when present", () => {
        render(
            <MemoryRouter>
                <LabMemberCard member={member} />
            </MemoryRouter>
        );

        member.focusAreas.forEach((focus) => {
            expect(screen.getByText(focus)).toBeInTheDocument();
        });
    });
});
