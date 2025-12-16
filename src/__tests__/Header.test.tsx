import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteHeader from "@/components/layout/Header";

describe("SiteHeader", () => {
    it("renders primary navigation items", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <SiteHeader />
            </MemoryRouter>
        );

        // Basic presence checks
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Departments")).toBeInTheDocument();
        expect(screen.getByText("Lab Notes")).toBeInTheDocument();
        expect(screen.getByText("Docs")).toBeInTheDocument();
        expect(screen.getByText("Videos")).toBeInTheDocument();
        expect(screen.getByText("Content Use")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders Docs as an external anchor link", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <SiteHeader />
            </MemoryRouter>
        );

        const docs = screen.getByRole("link", { name: "Docs" });
        expect(docs.tagName).toBe("A");
        expect(docs).toHaveAttribute("href", "/docs/");
    });

    it("marks the active route via active styles for an internal link", () => {
        render(
            <MemoryRouter initialEntries={["/about"]}>
                <SiteHeader />
            </MemoryRouter>
        );

        const about = screen.getByRole("link", { name: "About" });
        // your active class sets bg-slate-50 and text-slate-900
        expect(about.className).toContain("bg-slate-50");
        expect(about.className).toContain("text-slate-900");
    });
});
