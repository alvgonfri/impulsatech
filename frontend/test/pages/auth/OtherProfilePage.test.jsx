import OtherProfilePage from "../../../src/pages/auth/OtherProfilePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";
import { SubjectProvider } from "../../../src/context/SubjectContext";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("OtherProfilePage", () => {
    it("should render the OtherProfilePage component correctly", () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SubjectProvider>
                        <CampaignProvider>
                            <OtherProfilePage />
                        </CampaignProvider>
                    </SubjectProvider>
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.getByText("No hay biografía")).toBeDefined();
    });
});
