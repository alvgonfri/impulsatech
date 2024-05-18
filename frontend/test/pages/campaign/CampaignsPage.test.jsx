import CampaignsPage from "../../../src/pages/campaign/CampaignsPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CampaignsPage", () => {
    it("should render the CampaignsPage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CampaignsPage />
                </BrowserRouter>
            </CampaignProvider>
        );

        expect(screen.getByText("Campañas en curso")).toBeDefined();
    });
});
