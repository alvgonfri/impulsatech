import Tooltip from "../../src/components/Tooltip";
import { render, screen } from "@testing-library/react";

describe("Tooltip", () => {
    it("should render the Tooltip component correctly", () => {
        render(<Tooltip text="Test Tooltip" />);

        expect(screen.getByText("Test Tooltip")).toBeDefined();
    });
});
