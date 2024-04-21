import Campaign from "../models/campaign.model.js";
import FinancialDonation from "../models/financialDonation.model.js";
import TimeDonation from "../models/timeDonation.model.js";

export async function getMoneyDonated(campaignId) {
    try {
        const financialDonations = await FinancialDonation.find({
            campaign: campaignId,
        });
        return financialDonations.reduce(
            (acc, financialDonation) => acc + financialDonation.amount,
            0
        );
    } catch (error) {
        console.error(error);
    }
}

export async function getMoneyDonatedPercentage(campaignId) {
    try {
        const campaign = await Campaign.findById(campaignId);
        const moneyDonated = await getMoneyDonated(campaignId);
        if (moneyDonated === 0) return 0;
        if (moneyDonated >= campaign.financialGoal) return 100;
        const percentage = (moneyDonated / campaign.financialGoal) * 100;
        return percentage.toFixed(2);
    } catch (error) {
        console.error(error);
    }
}

export async function getTimeDonated(campaignId) {
    try {
        const timeDonations = await TimeDonation.find({
            campaign: campaignId,
        });
        return timeDonations.reduce(
            (acc, timeDonation) => acc + timeDonation.amount,
            0
        );
    } catch (error) {
        console.error(error);
    }
}

export async function getTimeDonatedPercentage(campaignId) {
    try {
        const campaign = await Campaign.findById(campaignId);
        const timeDonated = await getTimeDonated(campaignId);
        if (timeDonated === 0) return 0;
        if (timeDonated >= campaign.timeGoal) return 100;
        const percentage = (timeDonated / campaign.timeGoal) * 100;
        return percentage.toFixed(2);
    } catch (error) {
        console.error(error);
    }
}
