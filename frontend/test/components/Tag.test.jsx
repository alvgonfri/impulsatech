import Tag from "../../src/components/Tag";
import { render, screen } from "@testing-library/react";

describe("Tag", () => {
    it("should render the Tag component correctly", () => {
        render(<Tag text="Test Tag" />);

        expect(screen.getByText("Test Tag")).toBeDefined();
    });
});
