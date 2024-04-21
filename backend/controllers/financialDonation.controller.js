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

        if (campaign.promoter.id.toString() === req.subject.id) {
            return res
                .status(400)
                .json(["No puedes donar dinero a tu propia campaña"]);
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

        if (campaign.promoter.id.toString() === req.subject.id) {
            return res
                .status(400)
                .json(["No puedes donar dinero a tu propia campaña"]);
        }

        if (campaign.status !== "ongoing") {
            return res
                .status(400)
                .json(["Solo puedes donar a campañas en curso"]);
        }

        const customer = await stripe.customers.create({
            metadata: {
                anonymous,
                collaboratorType: anonymous
                    ? null
                    : (await isOrganization(req.subject.id))
                    ? "Organization"
                    : "User",
                collaboratorId: anonymous ? null : req.subject.id,
                campaignId,
            },
        });

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
            customer: customer.id,
            mode: "payment",
            success_url: `${process.env.CORS_ORIGIN}/financial-donation/success`,
            cancel_url: `${process.env.CORS_ORIGIN}/financial-donation/cancel`,
        });

        res.status(201).json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ message: error.message, message2: "error 2" });
    }
};

export const webhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        stripe.customers.retrieve(
            event.data.object.customer,
            async (err, customer) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .send(`Webhook Error: ${err.message}`);
                }

                const financialDonation = new FinancialDonation({
                    amount: event.data.object.amount_total / 100,
                    anonymous: customer.metadata.anonymous,
                    collaborator: {
                        type: customer.metadata.collaboratorType,
                        id: customer.metadata.collaboratorId,
                    },
                    campaign: customer.metadata.campaignId,
                });

                await financialDonation.save();
            }
        );
    }

    res.status(200).send();
};
