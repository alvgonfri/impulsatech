import RegisterPage from "../../../src/pages/user/RegisterPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";

describe("RegisterPage", () => {
    it("should render the RegisterPage component correctly", () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <RegisterPage />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(screen.getByText("Únete a ImpulsaTech")).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Registrarse" })
        ).toBeDefined();
    });
});
