import PrivacyPolicyPage from "../../../src/pages/legal/PrivacyPolicyPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("PrivacyPolicyPage", () => {
    it("should render the PrivacyPolicyPage component correctly", () => {
        render(
            <BrowserRouter>
                <PrivacyPolicyPage />
            </BrowserRouter>
        );
        expect(screen.getByText("Política de Privacidad")).toBeDefined();
    });
});
