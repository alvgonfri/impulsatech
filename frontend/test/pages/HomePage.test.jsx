import HomePage from "../../src/pages/HomePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../src/context/CampaignContext";

describe("HomePage", () => {
    it("should render the HomePage component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </CampaignProvider>
        );
        expect(
            screen.getByText("Crowdfunding como remedio a la brecha digital")
        ).toBeDefined();
    });
});
