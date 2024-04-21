import Footer from "../../src/components/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
    it("should render the Footer component correctly", () => {
        render(<Footer />);

        expect(screen.getByText("© 2024 ImpulsaTech")).toBeDefined();
    });
});
