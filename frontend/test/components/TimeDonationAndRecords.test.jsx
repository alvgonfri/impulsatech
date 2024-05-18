import TimeDonationAndRecords from "../../src/components/TimeDonationAndRecords";
import { render, screen } from "@testing-library/react";
import { TimeDonationProvider } from "../../src/context/TimeDonationContext";

describe("TimeDonationAndRecords", () => {
    it("should render the TimeDonationAndRecords component correctly", () => {
        const campaign = {
            _id: "1",
            title: "Test Campaign",
            status: "ongoing",
            financialGoal: 1000,
            moneyDonatedPercentage: 50,
            timeGoal: 30,
            timeDonatedPercentage: 60,
        };

        const timeRecords = [
            {
                _id: "1",
                amount: 100,
                date: "2024-01-01T00:00:00.000Z",
                description: "Test Time Record",
            },
        ];

        const donation = {
            _id: "1",
            amount: 100,
            period: {
                startDate: "2024-01-02T00:00:00.000Z",
                endDate: "2024-01-30T00:00:00.000Z",
            },
            updatedAt: "2024-01-01T00:00:00.000Z",
            campaign: campaign,
            timeRecords: timeRecords,
        };
        render(
            <TimeDonationProvider>
                <TimeDonationAndRecords donation={donation} />
            </TimeDonationProvider>
        );

        expect(screen.getByText("Test Campaign")).toBeDefined();
    });
});
