import PostFormPage from "../../../src/pages/post/PostFormPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("PostFormPage", () => {
    it("should render the PostFormPage component correctly", () => {
        render(
            <AuthProvider>
                <CampaignProvider>
                    <BrowserRouter>
                        <PostFormPage />
                    </BrowserRouter>
                </CampaignProvider>
            </AuthProvider>
        );
        expect(screen.getByText("Publicar")).toBeDefined();
    });
});
