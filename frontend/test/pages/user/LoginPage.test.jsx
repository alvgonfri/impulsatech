import LoginPage from "../../../src/pages/user/LoginPage";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

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
