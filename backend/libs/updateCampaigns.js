import Campaign from "../models/campaign.model.js";
import {
    getMoneyDonatedPercentage,
    getTimeDonatedPercentage,
} from "./getAmountDonated.js";

// This function updates the campaigns that have reached their deadline
export async function updateCampaigns() {
    try {
        const campaigns = await Campaign.find({
            deadline: new Date().toISOString().slice(0, 10),
        });

        const campaignsWithDonationsInfo = await Promise.all(
            campaigns.map(async (campaign) => {
                const moneyDonatedPercetage = await getMoneyDonatedPercentage(
                    campaign._id
                );
                const timeDonatedPercentage = await getTimeDonatedPercentage(
                    campaign._id
                );
                return Object.assign(campaign.toObject(), {
                    moneyDonatedPercetage,
                    timeDonatedPercentage,
                });
            })
        );

        let goalsAchieved = false;

        for (const campaign of campaignsWithDonationsInfo) {
            if (campaign.financialGoal && campaign.timeGoal) {
                goalsAchieved =
                    campaign.moneyDonatedPercetage >= 100 &&
                    campaign.timeDonatedPercentage >= 100;
            } else if (campaign.financialGoal) {
                goalsAchieved = campaign.moneyDonatedPercetage >= 100;
            } else if (campaign.timeGoal) {
                goalsAchieved = campaign.timeDonatedPercentage >= 100;
            }

            if (goalsAchieved) {
                await Campaign.findByIdAndUpdate(campaign._id, {
                    status: "completed",
                });
            } else {
                await Campaign.findByIdAndUpdate(campaign._id, {
                    status: "cancelled",
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}