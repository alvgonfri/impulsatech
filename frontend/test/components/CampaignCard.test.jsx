import CampaignCard from "../../src/components/CampaignCard";
import { render, screen } from "@testing-library/react";

describe("CampaignCard", () => {
    it("should render the CampaignCard component correctly", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        render(<CampaignCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });

    it("should render the CampaignCard component correctly with no financial goal", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        render(<CampaignCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });

    it("should render the CampaignCard component correctly with no time goal", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
        };

        render(<CampaignCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });
});
