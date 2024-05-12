import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import FinancialDonation from "../models/financialDonation.model.js";
import TimeDonation from "../models/timeDonation.model.js";

export const getSubject = async (req, res) => {
    try {
        const subjectId = req.params.id;

        const user = await User.findById(subjectId).select("-password");

        if (!user) {
            const organization = await Organization.findById(subjectId).select(
                "-password"
            );

            if (!organization) {
                return res.status(404).json({ message: "Subject not found" });
            }

            return res.status(200).json(organization);
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

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
        res.status(500).json(error);
    }
};
