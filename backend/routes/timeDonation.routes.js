import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { createTimeDonationSchema } from "../schemas/timeDonation.schema.js";
import {
    getTimeDonationsByCampaign,
    getTimeToInvestByCollaborator,
    createTimeDonation,
} from "../controllers/timeDonation.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { parseTimeDonation } from "../middlewares/parse.js";

const router = Router();

router.get("/:campaignId", getTimeDonationsByCampaign);

router.get("/invest/:collaboratorId", getTimeToInvestByCollaborator);

router.post(
    "",
    authRequired,
    parseTimeDonation,
    validateSchema(createTimeDonationSchema),
    createTimeDonation
);

export default router;
