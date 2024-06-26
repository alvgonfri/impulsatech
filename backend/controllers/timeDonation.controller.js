import TimeDonation from "../models/timeDonation.model.js";
import TimeRecord from "../models/timeRecord.model.js";
import Campaign from "../models/campaign.model.js";
import { isOrganization } from "../libs/isOrganization.js";
import {
    checkIfTimeDonationPeriodIsValid,
    checkIfTimeDonationAmountIsValid,
} from "../libs/checks.js";

export const getTimeDonationsByCampaign = async (req, res) => {
    try {
        const timeDonations = await TimeDonation.find({
            campaign: req.params.campaignId,
        });
        res.status(200).json(timeDonations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTimeToInvestByCollaborator = async (req, res) => {
    // Retrieves time donations made by a collaborator to completed campaigns. The time donations must contain a list of its time records.
    try {
        const collaboratorTimeDonations = await TimeDonation.find({
            "collaborator.id": req.params.collaboratorId,
        }).populate("campaign");

        const timeDonationsFromCompletedCampaigns =
            collaboratorTimeDonations.filter(
                (timeDonation) =>
                    timeDonation.campaign.status === "completed" &&
                    timeDonation.campaign.eliminated === false
            );

        timeDonationsFromCompletedCampaigns.sort((a, b) => {
            if (
                a.campaign.timeGoalPeriod.startDate >
                b.campaign.timeGoalPeriod.startDate
            )
                return 1;
            if (
                a.campaign.timeGoalPeriod.startDate <
                b.campaign.timeGoalPeriod.startDate
            )
                return -1;

            if (a.campaign.createdAt > b.campaign.createdAt) return 1;
            if (a.campaign.createdAt < b.campaign.createdAt) return -1;

            return 0;
        });

        const timeDonationsWithTimeRecords = await Promise.all(
            timeDonationsFromCompletedCampaigns.map(async (timeDonation) => {
                const timeRecords = await TimeRecord.find({
                    timeDonation: timeDonation._id,
                });
                return { ...timeDonation._doc, timeRecords };
            })
        );

        res.status(200).json(timeDonationsWithTimeRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTimeDonation = async (req, res) => {
    try {
        const { amount, period, campaignId } = req.body;

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json(["Campaña no encontrada"]);
        }

        if (!campaign.timeGoal) {
            return res
                .status(400)
                .json(["La campaña no tiene un objetivo de tiempo"]);
        }

        if (campaign.promoter.id.toString() === req.subject.id) {
            return res
                .status(400)
                .json(["No puedes donar tiempo a tu propia campaña"]);
        }

        if (period.startDate > period.endDate) {
            return res
                .status(400)
                .json([
                    "La fecha de inicio no puede ser mayor a la fecha de fin",
                ]);
        }

        if (!(await checkIfTimeDonationPeriodIsValid(period, campaignId))) {
            return res
                .status(400)
                .json([
                    "El periodo de tiempo de la donación debe estar dentro del periodo de tiempo de la campaña",
                ]);
        }

        if (!(await checkIfTimeDonationAmountIsValid(amount, period))) {
            return res
                .status(400)
                .json([
                    "La cantidad de horas donadas no puede ser mayor a la cantidad de horas del periodo de tiempo",
                ]);
        }

        if (campaign.status !== "ongoing") {
            return res
                .status(400)
                .json(["Solo puedes donar a campañas en curso"]);
        }

        const collaboratorType = (await isOrganization(req.subject.id))
            ? "Organization"
            : "User";

        const timeDonation = new TimeDonation({
            amount,
            period,
            collaborator: {
                type: collaboratorType,
                id: req.subject.id,
            },
            campaign: campaignId,
        });
        await timeDonation.save();
        res.status(201).json(timeDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
