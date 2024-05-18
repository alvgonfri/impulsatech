import TimeRecordPage from "../../../src/pages/timeRecord/TimeRecordPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";
import { TimeDonationProvider } from "../../../src/context/TimeDonationContext";

describe("TimeRecordPage", () => {
    it("should render the TimeRecordPage component correctly", () => {
        render(
            <AuthProvider>
                <TimeDonationProvider>
                    <BrowserRouter>
                        <TimeRecordPage />
                    </BrowserRouter>
                </TimeDonationProvider>
            </AuthProvider>
        );
        expect(screen.getByText("Registro de tiempo")).toBeDefined();
    });
});
