import FinancialDonationSuccess from "../../../src/pages/financialDonation/FinancialDonationSuccess";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("FinancialDonationSuccess", () => {
    it("should render the FinancialDonationSuccess component correctly", () => {
        render(
            <BrowserRouter>
                <FinancialDonationSuccess />
            </BrowserRouter>
        );

        expect(
            screen.getByText("¡Donación realizada con éxito!")
        ).toBeDefined();
    });
});
