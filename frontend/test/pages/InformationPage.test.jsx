import InformationPage from "../../src/pages/InformationPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("InformationPage", () => {
    it("should render the InformationPage component correctly", () => {
        render(
            <BrowserRouter>
                <InformationPage />
            </BrowserRouter>
        );
        expect(screen.getByText("Conoce más sobre ImpulsaTech")).toBeDefined();
    });
});
