import Alert from "../../src/components/Alert";
import { render, screen } from "@testing-library/react";

describe("Alert", () => {
    it("should render the Alert component correctly", () => {
        render(<Alert text="Test Alert" />);

        expect(screen.getByText("Test Alert")).toBeDefined();
    });
});
