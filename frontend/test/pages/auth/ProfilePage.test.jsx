import ProfilePage from "../../../src/pages/auth/ProfilePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";
import { SubjectProvider } from "../../../src/context/SubjectContext";
import { CampaignProvider } from "../../../src/context/CampaignContext";
import { FinancialDonationProvider } from "../../../src/context/FinancialDonationContext";

describe("ProfilePage", () => {
    it("should render the ProfilePage component correctly", () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SubjectProvider>
                        <CampaignProvider>
                            <FinancialDonationProvider>
                                <ProfilePage />
                            </FinancialDonationProvider>
                        </CampaignProvider>
                    </SubjectProvider>
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.getByText("No hay biografía")).toBeDefined();
    });
});
