import HomePage from "../../src/pages/HomePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
    it("should render the HomePage component correctly", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(screen.getByText("Página de inicio")).toBeDefined();
    });
});
