import { describe, it, expect } from "vitest";
import { departments } from "@/data/departments";

describe("departments registry", () => {
    it("has unique department ids", () => {
        const ids = departments.map((d) => d.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("has non-empty required fields", () => {
        for (const d of departments) {
            expect(d.name.trim().length).toBeGreaterThan(0);
            expect(d.short.trim().length).toBeGreaterThan(0);
            expect(d.description.trim().length).toBeGreaterThan(0);
            expect(d.mascot).toBeTruthy();
        }
    });
});
