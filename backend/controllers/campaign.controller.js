import fs from "fs-extra";
import bcrypt from "bcryptjs";
import Campaign from "../models/campaign.model.js";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import FinancialDonation from "../models/financialDonation.model.js";
import TimeDonation from "../models/timeDonation.model.js";
import TimeRecord from "../models/timeRecord.model.js";
import { isOrganization } from "../libs/isOrganization.js";
import {
    getMoneyDonated,
    getMoneyDonatedPercentage,
    getTimeDonated,
    getTimeDonatedPercentage,
} from "../libs/getAmountDonated.js";
import { updateCampaigns } from "../libs/updateCampaigns.js";
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

export const getInterestingCampaigns = async (req, res) => {
    // Interesting campaigns are those 3 ongoing campaigns with the highest percentage of money donated and whose promoter is not the current user
    try {
        const campaigns = await Campaign.find({
            status: "ongoing",
            financialGoal: { $ne: null },
            eliminated: false,
            "promoter.id": { $ne: req.subject.id },
        });
        const campaignsWithDonationsInfo = await Promise.all(
            campaigns.map(async (campaign) => {
                const moneyDonated = await getMoneyDonated(campaign._id);
                const moneyDonatedPercetage = await getMoneyDonatedPercentage(
                    campaign._id
                );
                return Object.assign(campaign.toObject(), {
                    moneyDonated,
                    moneyDonatedPercetage,
                });
            })
        );
        campaignsWithDonationsInfo.sort(
            (a, b) =>
                parseFloat(b.moneyDonatedPercetage) -
                parseFloat(a.moneyDonatedPercetage)
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

export const getCampaignCollaborators = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }

        const financialDonations = await FinancialDonation.find({
            campaign: campaign._id,
        });

        const timeDonations = await TimeDonation.find({
            campaign: campaign._id,
        });

        const collaborators = [
            ...financialDonations.map((donation) => donation.collaborator.id),
            ...timeDonations.map((donation) => donation.collaborator.id),
        ];

        const uniqueCollaborators = Array.from(
            new Set(collaborators.filter(Boolean))
        );

        res.status(200).json(uniqueCollaborators);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCampaignDonations = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }

        const financialDonations = await FinancialDonation.find({
            campaign: campaign._id,
        }).sort({ updatedAt: -1 });

        let financialDonationsWithCollaborators = [];

        for (let donation of financialDonations) {
            if (!donation.anonymous) {
                const model =
                    donation.collaborator.type === "User" ? User : Organization;
                const collaborator = await model.findById(
                    donation.collaborator.id
                );

                financialDonationsWithCollaborators.push({
                    ...donation.toObject(),
                    collaboratorName: collaborator.name,
                });
            } else {
                financialDonationsWithCollaborators.push({
                    ...donation.toObject(),
                });
            }
        }

        const timeDonations = await TimeDonation.find({
            campaign: campaign._id,
        })
            .sort({ updatedAt: -1 })
            .populate("campaign");

        const timeDonationsWithTimeRecords = await Promise.all(
            timeDonations.map(async (timeDonation) => {
                const timeRecords = await TimeRecord.find({
                    timeDonation: timeDonation._id,
                });
                return { ...timeDonation._doc, timeRecords };
            })
        );

        let timeDonationsWithCollaborators = [];

        for (let donation of timeDonationsWithTimeRecords) {
            const model =
                donation.collaborator.type === "User" ? User : Organization;
            const collaborator = await model.findById(donation.collaborator.id);

            timeDonationsWithCollaborators.push({
                ...donation,
                collaboratorName: collaborator.name,
            });
        }

        res.status(200).json({
            financialDonations: financialDonationsWithCollaborators,
            timeDonations: timeDonationsWithCollaborators,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const searchCampaigns = async (req, res) => {
    try {
        const {
            title,
            tags,
            deadline,
            financialGoalMin,
            financialGoalMax,
            timeGoalMin,
            timeGoalMax,
            moneyRemainingMin,
            moneyRemainingMax,
            timeRemainingMin,
            timeRemainingMax,
        } = req.query;
        const query = {};

        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        if (tags) {
            query.tags = { $in: tags.split(",") };
        }

        if (deadline) {
            query.deadline = { $lte: new Date(deadline) };
        }

        if (financialGoalMin || financialGoalMax) {
            query.financialGoal = {};

            if (financialGoalMin) {
                query.financialGoal.$gte = financialGoalMin;
            }

            if (financialGoalMax) {
                query.financialGoal.$lte = financialGoalMax;
            }
        }

        if (timeGoalMin || timeGoalMax) {
            query.timeGoal = {};

            if (timeGoalMin) {
                query.timeGoal.$gte = timeGoalMin;
            }

            if (timeGoalMax) {
                query.timeGoal.$lte = timeGoalMax;
            }
        }

        query.eliminated = false;
        query.status = { $ne: "cancelled" };

        const campaigns = await Campaign.find(query);

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

        const filteredCampaigns = campaignsWithDonationsInfo.filter(
            (campaign) =>
                (!moneyRemainingMin ||
                    campaign.financialGoal - campaign.moneyDonated >=
                        moneyRemainingMin) &&
                (!moneyRemainingMax ||
                    campaign.financialGoal - campaign.moneyDonated <=
                        moneyRemainingMax) &&
                (!timeRemainingMin ||
                    campaign.timeGoal - campaign.timeDonated >=
                        timeRemainingMin) &&
                (!timeRemainingMax ||
                    campaign.timeGoal - campaign.timeDonated <=
                        timeRemainingMax)
        );

        res.status(200).json(filteredCampaigns);
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

        if (
            deadline &&
            timeGoalPeriod &&
            deadline >= timeGoalPeriod.startDate
        ) {
            return res
                .status(400)
                .json([
                    "La fecha límite debe ser anterior al inicio del periodo de recibimiento",
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

        if (timeGoalPeriod && !deadline) {
            let autoDeadline = new Date(timeGoalPeriod.startDate);
            autoDeadline.setDate(autoDeadline.getDate() - 1);

            const newCampaign = new Campaign({
                title,
                description,
                timeGoal,
                timeGoalPeriod,
                financialGoal,
                iban: ibanHash,
                image,
                deadline: autoDeadline,
                tags,
                promoter: {
                    type: promoterType,
                    id: req.subject.id,
                },
            });

            const campaign = await newCampaign.save();
            res.status(201).json(campaign);
        } else {
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
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCampaignsStatus = async (req, res) => {
    try {
        await updateCampaigns();
        res.status(200).send();
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
