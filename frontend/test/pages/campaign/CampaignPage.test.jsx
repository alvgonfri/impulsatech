import CampaignPage from "../../../src/pages/campaign/CampaignPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";
import { FinancialDonationProvider } from "../../../src/context/FinancialDonationContext";
import { TimeDonationProvider } from "../../../src/context/TimeDonationContext";
import { AuthProvider } from "../../../src/context/AuthContext";

describe("CampaignPage", () => {
    it("should render the CampaignPage component correctly", () => {
        render(
            <AuthProvider>
                <CampaignProvider>
                    <FinancialDonationProvider>
                        <TimeDonationProvider>
                            <BrowserRouter>
                                <CampaignPage />
                            </BrowserRouter>
                        </TimeDonationProvider>
                    </FinancialDonationProvider>
                </CampaignProvider>
            </AuthProvider>
        );

        expect(screen.getByText("Compartir")).toBeDefined();
    });
});
