import Campaign from "../models/campaign.model.js";
import FinancialDonation from "../models/financialDonation.model.js";

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
        const percentage = (moneyDonated / campaign.financialGoal) * 100;
        return percentage.toFixed(2);
    } catch (error) {
        console.error(error);
    }
}
