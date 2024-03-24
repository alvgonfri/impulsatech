import CampaignFormPage from "../../../src/pages/campaign/CampaignFormPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CampaignFormPage", () => {
    it("should render the CampaignFormPage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CampaignFormPage />
                </BrowserRouter>
            </CampaignProvider>
        );
        expect(screen.getByText("Crea una campaña")).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Crear campaña" })
        ).toBeDefined();
    });
});
