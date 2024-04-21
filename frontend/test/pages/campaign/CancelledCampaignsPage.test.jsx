import CancelledCampaignsPage from "../../../src/pages/campaign/CancelledCampaignsPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CancelledCampaignsPage", () => {
    it("should render the CancelledCampaignsPage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CancelledCampaignsPage />
                </BrowserRouter>
            </CampaignProvider>
        );

        expect(screen.getByText("Campañas canceladas")).toBeDefined();
    });
});
