import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import Campaign from "../models/campaign.model.js";

export async function checkIfEmailExists(email) {
    try {
        const user = await User.findOne({ email });
        const organization = await Organization.findOne({ email });

        return user || organization;
    } catch (error) {
        console.error(error);
    }
}

export function checkIfDateIsFuture(date) {
    try {
        const parsedDate = new Date(date).toISOString().slice(0, 10);
        return parsedDate > new Date().toISOString().slice(0, 10);
    } catch (error) {
        console.error(error);
    }
}

export async function checkIfTimeDonationPeriodIsValid(period, campaignId) {
    try {
        const campaign = await Campaign.findById(campaignId);
        return (
            new Date(period.startDate) >=
                new Date(campaign.timeGoalPeriod.startDate) &&
            new Date(period.endDate) <=
                new Date(campaign.timeGoalPeriod.endDate)
        );
    } catch (error) {
        console.error(error);
    }
}

export async function checkIfTimeDonationAmountIsValid(amount, period) {
    try {
        const startDate = new Date(period.startDate);
        const endDate = new Date(period.endDate);
        const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        return amount <= days * 24;
    } catch (error) {
        console.error(error);
    }
}
