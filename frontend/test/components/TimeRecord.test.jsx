import TimeRecord from "../../src/components/TimeRecord";
import { render, screen } from "@testing-library/react";

describe("TimeRecord", () => {
    it("should render the TimeRecord component correctly", () => {
        const record = {
            _id: "1",
            amount: 100,
            date: "2024-01-01T00:00:00.000Z",
            description: "Test Time Record",
        };

        render(<TimeRecord record={record} />);

        expect(screen.getByText("100 h")).toBeDefined();
    });
});
