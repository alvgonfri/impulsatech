import fs from "fs-extra";
import bcrypt from "bcryptjs";
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
import { uploadImage } from "../libs/cloudinary.js";

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
        const page = parseInt(req.query.page) || 1;
        const pageSize = 12;
        const startIndex = (page - 1) * pageSize;
        const totalPages = Math.ceil(
            (await Campaign.countDocuments({ status, eliminated: false })) /
                pageSize
        );

        const campaigns = await Campaign.find({ status, eliminated: false })
            .skip(startIndex)
            .limit(pageSize)
            .sort({ createdAt: -1 });
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
        res.status(200).json({
            campaigns: campaignsWithDonationsInfo,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedCampaigns = async (req, res) => {
    // Featured campaigns are those 3 ongoing campaigns with the highest percentage of money donated and time donated
    try {
        const campaigns = await Campaign.find({
            status: "ongoing",
            eliminated: false,
        });
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
        campaignsWithDonationsInfo.sort(
            (a, b) =>
                parseFloat(b.moneyDonatedPercetage) +
                parseFloat(b.timeDonatedPercentage) -
                (parseFloat(a.moneyDonatedPercetage) +
                    parseFloat(a.timeDonatedPercentage))
        );
        res.status(200).json(campaignsWithDonationsInfo.slice(0, 3));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCampaignsByPromoter = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            "promoter.id": req.params.id,
            eliminated: false,
        }).sort({ createdAt: -1 });
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
            iban,
            deadline,
            tags,
        } = req.body;
        let image;
        let ibanHash;

        if (iban) {
            ibanHash = await bcrypt.hash(iban, 10);
        }

        if (!timeGoal && !financialGoal) {
            return res
                .status(400)
                .json([
                    "La campaña debe tener al menos un objetivo, ya sea de tiempo o económico",
                ]);
        }

        if (financialGoal && !iban) {
            return res
                .status(400)
                .json([
                    "Si se establece un objetivo económico, se debe indicar un IBAN",
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
            const { public_id, secure_url } = await uploadImage(
                req.files.image.tempFilePath,
                "campaigns"
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
            iban: ibanHash,
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
