import Campaign from "../models/campaign.model.js";
import FinancialDonation from "../models/financialDonation.model.js";
import TimeDonation from "../models/timeDonation.model.js";

// It returns the number of campaigns by status
export const getCampaignStats = async (req, res) => {
    try {
        const stats = await Campaign.aggregate([
            {
                $match: {
                    eliminated: false,
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const result = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// It returns the 5 most used tags in campaigns
export const getTagRanking = async (req, res) => {
    try {
        const stats = await Campaign.aggregate([
            {
                $unwind: "$tags",
            },
            {
                $group: {
                    _id: "$tags",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        const result = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// It returns the total and average amount of money donated to campaigns with at least one financial donation
export const getFinancialStats = async (req, res) => {
    try {
        const stats = await FinancialDonation.aggregate([
            {
                $lookup: {
                    from: "campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaign",
                },
            },
            {
                $unwind: "$campaign",
            },
            {
                $match: {
                    "campaign.eliminated": false,
                    "campaign.financialGoal": { $exists: true },
                },
            },
            {
                $group: {
                    _id: "$campaign._id",
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $group: {
                    _id: null,
                    averageTotalAmount: { $avg: "$totalAmount" },
                    totalDonated: { $sum: "$totalAmount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    averageTotalAmount: 1,
                    totalDonated: 1,
                },
            },
        ]);

        res.status(200).json(
            stats[0] || { averageTotalAmount: 0, totalDonated: 0 }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// It returns the total and average amount of time donated to campaigns with at least one time donation
export const getTimeStats = async (req, res) => {
    try {
        const stats = await TimeDonation.aggregate([
            {
                $lookup: {
                    from: "campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaign",
                },
            },
            {
                $unwind: "$campaign",
            },
            {
                $match: {
                    "campaign.eliminated": false,
                    "campaign.timeGoal": { $exists: true },
                },
            },
            {
                $group: {
                    _id: "$campaign._id",
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $group: {
                    _id: null,
                    averageTotalAmount: { $avg: "$totalAmount" },
                    totalDonated: { $sum: "$totalAmount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    averageTotalAmount: 1,
                    totalDonated: 1,
                },
            },
        ]);

        res.status(200).json(
            stats[0] || { averageTotalAmount: 0, totalDonated: 0 }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
