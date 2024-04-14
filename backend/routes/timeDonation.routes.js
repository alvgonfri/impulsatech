import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { createTimeDonationSchema } from "../schemas/timeDonation.schema.js";
import {
    getTimeDonationsByCampaign,
    createTimeDonation,
} from "../controllers/timeDonation.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/:campaignId", getTimeDonationsByCampaign);

router.post(
    "",
    authRequired,
    validateSchema(createTimeDonationSchema),
    createTimeDonation
);

export default router;
