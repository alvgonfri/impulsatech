import FinancialDonationCancel from "../../../src/pages/financialDonation/FinancialDonationCancel";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("FinancialDonationCancel", () => {
    it("should render the FinancialDonationCancel component correctly", () => {
        render(
            <BrowserRouter>
                <FinancialDonationCancel />
            </BrowserRouter>
        );

        expect(screen.getByText("¡Donación cancelada!")).toBeDefined();
    });
});
