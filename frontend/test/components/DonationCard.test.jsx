import DonationCard from "../../src/components/DonationCard";
import { render, screen } from "@testing-library/react";

describe("DonationCard", () => {
    it("should render the DonationCard component correctly for a financial donation", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            status: "ongoing",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        const donation = {
            _id: "1",
            amount: 100,
            anonymous: true,
            updatedAt: "2024-01-01T00:00:00.000Z",
            campaign: campaign,
        };

        render(<DonationCard donation={donation} />);

        expect(screen.getByText("100 €")).toBeDefined();
    });

    it("should render the DonationCard component correctly for a time donation", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            status: "ongoing",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        const donation = {
            _id: "1",
            amount: 100,
            period: {
                startDate: "2024-01-02T00:00:00.000Z",
                endDate: "2024-01-30T00:00:00.000Z",
            },
            updatedAt: "2024-01-01T00:00:00.000Z",
            campaign: campaign,
        };

        render(<DonationCard donation={donation} />);

        expect(screen.getByText("100 h")).toBeDefined();
    });
});
