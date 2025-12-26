import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { TopNav } from "@/components/layout/Header";

function renderHeader(initialPath = "/") {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <TopNav />
        </MemoryRouter>
    );
}

const labels = [
    "Home",
    "About",
    "Departments",
    "Lab Notes",
    "Docs",
    "Videos",
    "Content Use",
    "Contact",
];

describe("TopNav (Site Header)", () => {
    it("renders the brand identity", () => {
        renderHeader("/");
        expect(screen.getByText("The Human Pattern Lab")).toBeInTheDocument();
    });

    it("renders primary navigation items (desktop nav)", () => {
        renderHeader("/");

        const desktop = screen.getByTestId("topnav-desktop");
        const q = within(desktop);

        labels.forEach((label) => {
            expect(q.getByRole("link", { name: label })).toBeInTheDocument();
        });
    });

    it("renders Docs as an external anchor link (desktop nav)", () => {
        renderHeader("/");

        const desktop = screen.getByTestId("topnav-desktop");
        const docs = within(desktop).getByRole("link", { name: "Docs" });

        expect(docs).toHaveAttribute("href", "/docs/");
    });

    it("applies active styles to the current route (desktop nav)", () => {
        renderHeader("/about");

        const desktop = screen.getByTestId("topnav-desktop");
        const about = within(desktop).getByRole("link", { name: "About" });

        expect(about.className).toContain("bg-slate-50");
        expect(about.className).toContain("text-slate-900");
    });

    it("opens and closes the mobile menu", async () => {
        const user = userEvent.setup();
        renderHeader("/");

        const toggle = screen.getByRole("button", { name: /toggle menu/i });
        expect(toggle).toHaveAttribute("aria-expanded", "false");

        await user.click(toggle);
        expect(toggle).toHaveAttribute("aria-expanded", "true");

        const mobile = screen.getByTestId("topnav-mobile");
        const q = within(mobile);

        // now that it's open, the mobile links should be queryable
        expect(q.getByRole("link", { name: "Lab Notes" })).toBeInTheDocument();

        await user.keyboard("{Escape}");
        expect(toggle).toHaveAttribute("aria-expanded", "false");
    });
});
