import TermsOfUsePage from "../../../src/pages/legal/TermsOfUsePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("TermsOfUsePage", () => {
    it("should render the TermsOfUsePage component correctly", () => {
        render(
            <BrowserRouter>
                <TermsOfUsePage />
            </BrowserRouter>
        );
        expect(screen.getByText("Términos de Uso")).toBeDefined();
    });
});
