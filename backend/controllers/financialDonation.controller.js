import FinancialDonation from "../models/financialDonation.model.js";
import Campaign from "../models/campaign.model.js";
import { isOrganization } from "../libs/isOrganization.js";
import { stripe } from "../config.js";

export const getFinancialDonationsByCampaign = async (req, res) => {
    try {
        const financialDonations = await FinancialDonation.find({
            campaign: req.params.campaignId,
        });
        res.status(200).json(financialDonations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFinancialDonation = async (req, res) => {
    try {
        const { amount, anonymous, campaignId } = req.body;

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json(["Campaña no encontrada"]);
        }

        if (!campaign.financialGoal) {
            return res
                .status(400)
                .json(["La campaña no tiene un objetivo financiero"]);
        }

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

export const processPayment = async (req, res) => {
    try {
        const { amount, campaignId } = req.body;

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json(["Campaña no encontrada"]);
        }

        if (!campaign.financialGoal) {
            return res
                .status(400)
                .json(["La campaña no tiene un objetivo financiero"]);
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Donación a " + campaign.title,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CORS_ORIGIN}/financial-donation/success`,
            cancel_url: `${process.env.CORS_ORIGIN}/financial-donation/cancel`,
        });

        res.status(201).json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
