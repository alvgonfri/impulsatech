import Navbar from "../../src/components/Navbar";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthContext from "../../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
    it("should render the Navbar component correctly when user is authenticated", () => {
        const user = { name: "Test User" };
        const isAuthenticated = true;
        const contextValue = { user, isAuthenticated };

        render(
            <AuthContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText("Test User"));
        expect(screen.getByText("Mi perfil")).toBeDefined();
    });

    it("should render the Navbar component correctly when user is not authenticated", () => {
        const user = null;
        const isAuthenticated = false;
        const contextValue = { user, isAuthenticated };

        render(
            <AuthContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Iniciar sesión")).toBeDefined();
        expect(screen.getByText("Registrarse")).toBeDefined();
    });
});
