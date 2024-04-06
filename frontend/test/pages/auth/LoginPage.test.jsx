import LoginPage from "../../../src/pages/auth/LoginPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/context/AuthContext";

describe("LoginPage", () => {
    it("should render the LoginPage component correctly", () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(screen.getByText("Inicia sesión")).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Iniciar sesión" })
        ).toBeDefined();
    });
});
