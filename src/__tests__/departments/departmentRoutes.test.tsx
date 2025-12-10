import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import {
    CjoDepartmentPage,
    ScmsDepartmentPage,
    OodDepartmentPage,
    AoeDepartmentPage,
    DueDepartmentPage,
    FelineDepartmentPage,
    RbsDepartmentPage,
    EwuDepartmentPage,
} from "@/departments";

function renderDepartmentRoute(path: string, element: ReactElement) {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path={path} element={element} />
            </Routes>
        </MemoryRouter>
    );
}

describe("department routes", () => {
    it("navigates to /departments/cjo", () => {
        renderDepartmentRoute("/departments/cjo", <CjoDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /chief judgment office/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/scms", () => {
        renderDepartmentRoute("/departments/scms", <ScmsDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /systems, chaos & meta-structures/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/ood", () => {
        renderDepartmentRoute("/departments/ood", <OodDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /observational oversight division/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/aoe", () => {
        renderDepartmentRoute("/departments/aoe", <AoeDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /department of anomalous energies/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/due", () => {
        renderDepartmentRoute("/departments/due", <DueDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /department of unpredictable energies/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/feline", () => {
        renderDepartmentRoute("/departments/feline", <FelineDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /feline epistemology department/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/rbs", () => {
        renderDepartmentRoute("/departments/rbs", <RbsDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /raccoon behavioral sciences division/i,
            })
        ).toBeInTheDocument();
    });

    it("navigates to /departments/ewu", () => {
        renderDepartmentRoute("/departments/ewu", <EwuDepartmentPage />);

        expect(
            screen.getByRole("heading", {
                name: /emotional weather forecasting unit/i,
            })
        ).toBeInTheDocument();
    });
});
