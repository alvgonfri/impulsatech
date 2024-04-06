import Campaign from "../models/campaign.model.js";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import { isOrganization } from "../libs/isOrganization.js";

export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }

        let promoter = null;
        if (campaign.promoter.type === "User") {
            promoter = await User.findById(campaign.promoter.id);
        } else {
            promoter = await Organization.findById(campaign.promoter.id);
        }

        promoter = promoter.toObject();
        delete promoter.password;

        res.status(200).json(
            Object.assign(campaign.toObject(), { promoter: promoter })
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCampaign = async (req, res) => {
    try {
        const { title, description, timeGoal, financialGoal, image, deadline } =
            req.body;

        if (!timeGoal && !financialGoal) {
            return res
                .status(400)
                .json([
                    "La campaña debe tener al menos un objetivo, ya sea de tiempo o económico",
                ]);
        }

        const promoterType = (await isOrganization(req.subject.id))
            ? "Organization"
            : "User";

        const newCampaign = new Campaign({
            title,
            description,
            timeGoal,
            financialGoal,
            image,
            deadline,
            promoter: {
                type: promoterType,
                id: req.subject.id,
            },
        });
        const campaign = await newCampaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCampaign = async (req, res) => {
    try {
        if (req.body.status) {
            if (
                req.body.status !== "ongoing" &&
                req.body.status !== "completed" &&
                req.body.status !== "cancelled"
            ) {
                return res
                    .status(400)
                    .json({ message: "Estado de campaña no válido" });
            }
        }
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
