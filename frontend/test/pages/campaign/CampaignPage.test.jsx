import CampaignPage from "../../../src/pages/campaign/CampaignPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CampaignPage", () => {
    it("should render the CampaignPage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CampaignPage />
                </BrowserRouter>
            </CampaignProvider>
        );

        expect(screen.getByText("Estado:")).toBeDefined();
    });
});
