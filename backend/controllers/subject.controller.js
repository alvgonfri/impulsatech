import FinancialDonation from "../models/financialDonation.model.js";
import TimeDonation from "../models/timeDonation.model.js";

export const getDonationsBySubject = async (req, res) => {
    try {
        const financialDonations = await FinancialDonation.find({
            "collaborator.id": req.params.id,
        }).populate({
            path: "campaign",
            match: { eliminated: false },
        });

        const timeDonations = await TimeDonation.find({
            "collaborator.id": req.params.id,
        }).populate({
            path: "campaign",
            match: { eliminated: false },
        });

        const donations = financialDonations.concat(timeDonations);

        donations.sort((a, b) => {
            return b.updatedAt - a.updatedAt;
        });

        res.status(200).json(donations);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
