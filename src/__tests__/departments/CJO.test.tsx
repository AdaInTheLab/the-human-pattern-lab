// src/__tests__/departments/CJO.test.tsx
import { render, screen } from "@testing-library/react";
import { CjoDepartmentPage } from "../../departments";

describe("CJO Department Page", () => {
    it("renders the page title", () => {
        render(<CjoDepartmentPage />);
        expect(
            screen.getByRole("heading", { name: /chief judgment office/i })
        ).toBeInTheDocument();
    });

    it("shows its mascot or key section", () => {
        expect(
            screen.getByText(/carmel/i) // adjust text as needed
        ).toBeInTheDocument();
    });
});
