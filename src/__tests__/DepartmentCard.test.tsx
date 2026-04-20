import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import type { Department, MascotId } from "@/data/departments";

const makeDept = (mascot: MascotId): Department => ({
    id: "founder",
    name: `Test Dept (${mascot})`,
    short: "Test tagline",
    description: "Test description",
    mascot,
    easterEgg: "Secret test egg",
});

function renderCard(department: Department) {
    return render(
        <MemoryRouter>
            <DepartmentCard department={department} />
        </MemoryRouter>
    );
}

const cases: Array<{ mascot: MascotId; expectedName: string; expectedSlug: string }> = [
    { mascot: "founder", expectedName: "Ada", expectedSlug: "cognitive-fox-ada" },
    { mascot: "orbson", expectedName: "Orbson", expectedSlug: "orbson" },
    { mascot: "carmel", expectedName: "Carmel", expectedSlug: "carmel" },
    { mascot: "mcchonk", expectedName: "Professor McChonk", expectedSlug: "professor-mcchonk" },
    { mascot: "stan", expectedName: "Stan", expectedSlug: "stan" },
    { mascot: "drizzle", expectedName: "Drizzle", expectedSlug: "drizzle" },
    { mascot: "lyric", expectedName: "Lyric", expectedSlug: "lyric" },
    { mascot: "fill-the-void", expectedName: "Fill the Void", expectedSlug: "fill-the-void" },
    { mascot: "nemmi", expectedName: "Nemmi", expectedSlug: "nemmi" },
];

describe("DepartmentCard", () => {
    it.each(cases)(
        "renders correct mascot identity for $mascot",
        ({ mascot, expectedName, expectedSlug }) => {
            renderCard(makeDept(mascot));

            // Core content
            expect(screen.getByText(`Test Dept (${mascot})`)).toBeInTheDocument();
            expect(screen.getByText("Test tagline")).toBeInTheDocument();
            expect(screen.getByText("Test description")).toBeInTheDocument();

            // Mascot avatar + name (now rendered as an img + linked text)
            const avatar = screen.getByAltText(expectedName) as HTMLImageElement;
            expect(avatar).toBeInTheDocument();
            expect(avatar.src).toMatch(/\/assets\/labteam\//);

            const mascotLink = screen.getByRole("link", { name: expectedName });
            expect(mascotLink).toHaveAttribute("href", `/labteam/${expectedSlug}`);

            // Card header links to the department detail
            const cardLink = screen.getByRole("link", { name: new RegExp(`Test Dept \\(${mascot}\\)`) });
            expect(cardLink).toHaveAttribute("href", "/departments/founder");

            // Easter egg presence
            expect(screen.getByText("Secret test egg")).toBeInTheDocument();
        }
    );

    it("does not render easterEgg when absent", () => {
        const dept: Department = {
            id: "founder",
            name: "No Egg Dept",
            short: "No egg",
            description: "Nothing hidden here.",
            mascot: "founder",
        };

        renderCard(dept);
        expect(screen.queryByText(/Secret/i)).not.toBeInTheDocument();
    });
});
