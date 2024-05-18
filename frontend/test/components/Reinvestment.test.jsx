import ReinvestmentCard from "../../src/components/ReinvestmentCard";
import { render, screen } from "@testing-library/react";

describe("ReinvestmentCard", () => {
    it("should render the ReinvestmentCard component correctly", () => {
        const reinvestment = {
            _id: "1",
            amount: 100,
            updatedAt: "2024-01-01T00:00:00.000Z",
        };

        render(<ReinvestmentCard reinvestment={reinvestment} />);

        expect(screen.getByText("100 €")).toBeDefined();
    });
});
