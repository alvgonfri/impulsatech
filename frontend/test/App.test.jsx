import App from "../src/App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    it("should render the home page by default", () => {
        render(<App />);
        expect(
            screen.getByText("Crowdfunding como remedio a la brecha digital")
        ).toBeDefined();
    });
});
