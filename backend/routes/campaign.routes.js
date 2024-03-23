import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { campaignSchema } from "../schemas/campaign.schema.js";
import {
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller.js";

const router = Router();

router.get("", getCampaigns);

router.get("/:id", getCampaign);

router.post("", authRequired, validateSchema(campaignSchema), createCampaign);

router.patch(
    "/:id",
    authRequired,
    validateSchema(campaignSchema),
    updateCampaign
);

router.delete("/:id", authRequired, deleteCampaign);

export default router;
