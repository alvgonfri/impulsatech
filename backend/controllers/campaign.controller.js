import fs from "fs-extra";
import Campaign from "../models/campaign.model.js";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import { isOrganization } from "../libs/isOrganization.js";
import {
    getMoneyDonated,
    getMoneyDonatedPercentage,
    getTimeDonated,
    getTimeDonatedPercentage,
} from "../libs/getAmountDonated.js";
import { uploadCampaignImage } from "../libs/cloudinary.js";

export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        const campaignsWithDonationsInfo = await Promise.all(
            campaigns.map(async (campaign) => {
                const moneyDonated = await getMoneyDonated(campaign._id);
                const moneyDonatedPercetage = await getMoneyDonatedPercentage(
                    campaign._id
                );
                const timeDonated = await getTimeDonated(campaign._id);
                const timeDonatedPercentage = await getTimeDonatedPercentage(
                    campaign._id
                );
                return Object.assign(campaign.toObject(), {
                    moneyDonated,
                    moneyDonatedPercetage,
                    timeDonated,
                    timeDonatedPercentage,
                });
            })
        );
        res.status(200).json(campaignsWithDonationsInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCampaignsByStatus = (status) => async (req, res) => {
    try {
        const campaigns = await Campaign.find({ status });
        const campaignsWithDonationsInfo = await Promise.all(
            campaigns.map(async (campaign) => {
                const moneyDonated = await getMoneyDonated(campaign._id);
                const moneyDonatedPercetage = await getMoneyDonatedPercentage(
                    campaign._id
                );
                const timeDonated = await getTimeDonated(campaign._id);
                const timeDonatedPercentage = await getTimeDonatedPercentage(
                    campaign._id
                );
                return Object.assign(campaign.toObject(), {
                    moneyDonated,
                    moneyDonatedPercetage,
                    timeDonated,
                    timeDonatedPercentage,
                });
            })
        );
        res.status(200).json(campaignsWithDonationsInfo);
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

        const moneyDonated = await getMoneyDonated(campaign._id);
        const moneyDonatedPercetage = await getMoneyDonatedPercentage(
            campaign._id
        );

        const timeDonated = await getTimeDonated(campaign._id);
        const timeDonatedPercentage = await getTimeDonatedPercentage(
            campaign._id
        );

        let promoter = null;
        if (campaign.promoter.type === "User") {
            promoter = await User.findById(campaign.promoter.id);
        } else {
            promoter = await Organization.findById(campaign.promoter.id);
        }

        promoter = promoter.toObject();
        delete promoter.password;

        res.status(200).json({
            ...campaign.toObject(),
            moneyDonated,
            moneyDonatedPercetage,
            timeDonated,
            timeDonatedPercentage,
            promoter,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCampaign = async (req, res) => {
    try {
        const {
            title,
            description,
            timeGoal,
            timeGoalPeriod,
            financialGoal,
            deadline,
            tags,
        } = req.body;
        let image;

        if (!timeGoal && !financialGoal) {
            return res
                .status(400)
                .json([
                    "La campaña debe tener al menos un objetivo, ya sea de tiempo o económico",
                ]);
        }

        if (timeGoal && !timeGoalPeriod) {
            return res
                .status(400)
                .json([
                    "Si se establece un objetivo de tiempo, se debe indicar el periodo de tiempo",
                ]);
        }

        if (timeGoal && timeGoalPeriod.startDate > timeGoalPeriod.endDate) {
            return res
                .status(400)
                .json([
                    "La fecha de inicio no puede ser mayor a la fecha de fin",
                ]);
        }

        if (tags && tags.length > 3) {
            return res
                .status(400)
                .json(["No se pueden seleccionar más de 3 etiquetas"]);
        }

        const promoterType = (await isOrganization(req.subject.id))
            ? "Organization"
            : "User";

        if (req.files && req.files.image) {
            const { public_id, secure_url } = await uploadCampaignImage(
                req.files.image.tempFilePath
            );

            await fs.remove(req.files.image.tempFilePath);

            image = { public_id, secure_url };
        }

        const newCampaign = new Campaign({
            title,
            description,
            timeGoal,
            timeGoalPeriod,
            financialGoal,
            image,
            deadline,
            tags,
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
        const campaignInDB = await Campaign.findById(req.params.id);

        const subject = await User.findById(req.subject.id);

        if (!campaignInDB) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }

        if (req.body.eliminated && !subject.isAdmin) {
            return res
                .status(403)
                .json(["No tienes permiso para eliminar la campaña"]);
        }

        if (
            req.body.status &&
            req.subject.id !== campaignInDB.promoter.id.toString()
        ) {
            return res
                .status(403)
                .json([
                    "No tienes permiso para cambiar el estado de la campaña",
                ]);
        }

        if (req.body.status) {
            if (
                req.body.status !== "ongoing" &&
                req.body.status !== "completed" &&
                req.body.status !== "cancelled"
            ) {
                return res
                    .status(400)
                    .json(["El estado de la campaña no es válido"]);
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
