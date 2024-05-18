import CampaignStateCard from "../../src/components/CampaignStateCard";
import { render, screen } from "@testing-library/react";

describe("CampaignStateCard", () => {
    it("should render the CampaignStateCard component correctly", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        render(<CampaignStateCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });

    it("should render the CampaignStateCard component correctly with no financial goal", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        render(<CampaignStateCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });

    it("should render the CampaignStateCard component correctly with no time goal", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
        };

        render(<CampaignStateCard campaign={campaign} />);

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });
});
