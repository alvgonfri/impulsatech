import FinancialDonation from "../models/financialDonation.model.js";
import { isOrganization } from "../libs/isOrganization.js";

export const createFinancialDonation = async (req, res) => {
    try {
        const { amount, anonymous, campaignId } = req.body;

        let collaboratorType = null;
        if (!anonymous) {
            collaboratorType = (await isOrganization(req.subject.id))
                ? "Organization"
                : "User";
        }

        const financialDonation = anonymous
            ? new FinancialDonation({
                  amount,
                  anonymous,
                  campaign: campaignId,
              })
            : new FinancialDonation({
                  amount,
                  anonymous,
                  collaborator: {
                      type: collaboratorType,
                      id: req.subject.id,
                  },
                  campaign: campaignId,
              });
        await financialDonation.save();
        res.status(201).json(financialDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
