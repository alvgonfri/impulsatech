import CampaignSearch from "../../../src/pages/campaign/CampaignSearch";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "../../../src/context/CampaignContext";

describe("CampaignSearch", () => {
    it("should render the CampaignSearch component correctly", () => {
        render(
            <CampaignProvider>
                <BrowserRouter>
                    <CampaignSearch />
                </BrowserRouter>
            </CampaignProvider>
        );
        expect(screen.getByText("Búsqueda de campañas")).toBeDefined();
    });
});
