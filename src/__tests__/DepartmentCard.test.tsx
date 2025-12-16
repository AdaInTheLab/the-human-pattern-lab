import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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

const cases: Array<{ mascot: MascotId; expectedName: string; expectedEmoji: string }> = [
    { mascot: "founder", expectedName: "Ada", expectedEmoji: "🦊" },
    { mascot: "orbson", expectedName: "Orbson", expectedEmoji: "👁️" },
    { mascot: "carmel", expectedName: "Carmel", expectedEmoji: "😼" },
    { mascot: "mcchonk", expectedName: "Professor McChonk", expectedEmoji: "🍩" },
    { mascot: "stan", expectedName: "Stan", expectedEmoji: "🦝" },
    { mascot: "drizzle", expectedName: "Drizzle", expectedEmoji: "🌧️" },
    { mascot: "lyric", expectedName: "Lyric", expectedEmoji: "🔮" },
    { mascot: "fill-the-void", expectedName: "Fill the Void", expectedEmoji: "🌘" },
    { mascot: "nemmi", expectedName: "Nemmi", expectedEmoji: "🔥" },
];

describe("DepartmentCard", () => {
    it.each(cases)("renders correct mascot identity for $mascot", ({ mascot, expectedName, expectedEmoji }) => {
        render(<DepartmentCard department={makeDept(mascot)} />);

        // Core content
        expect(screen.getByText(`Test Dept (${mascot})`)).toBeInTheDocument();
        expect(screen.getByText("Test tagline")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();

        // Mascot footer
        expect(screen.getByText("Mascot:")).toBeInTheDocument();
        expect(screen.getByText(expectedName)).toBeInTheDocument();

        // Emoji icon
        expect(screen.getByText(expectedEmoji)).toBeInTheDocument();

        // Easter egg presence
        expect(screen.getByText("Secret test egg")).toBeInTheDocument();
    });

    it("does not render easterEgg when absent", () => {
        const dept: Department = {
            id: "founder",
            name: "No Egg Dept",
            short: "No egg",
            description: "Nothing hidden here.",
            mascot: "founder",
        };

        render(<DepartmentCard department={dept} />);
        expect(screen.queryByText(/Secret/i)).not.toBeInTheDocument();
    });
});
