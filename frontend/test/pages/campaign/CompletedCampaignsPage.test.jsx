import CompletedCampaignsPage from "../../../src/pages/campaign/CompletedCampaignsPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CompletedCampaignsPage", () => {
    it("should render the CompletedCampaignsPage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CompletedCampaignsPage />
                </BrowserRouter>
            </CampaignProvider>
        );

        expect(screen.getByText("Campañas completadas")).toBeDefined();
    });
});
