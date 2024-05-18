import Footer from "../../src/components/Footer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
    it("should render the Footer component correctly", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        expect(screen.getByText("© 2024 ImpulsaTech")).toBeDefined();
    });
});
