import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { parseCampign } from "../middlewares/parseCampaign.js";
import {
    createCampaignSchema,
    updateCampaignSchema,
} from "../schemas/campaign.schema.js";
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

router.post(
    "",
    authRequired,
    parseCampign,
    validateSchema(createCampaignSchema),
    createCampaign
);

router.patch(
    "/:id",
    authRequired,
    parseCampign,
    validateSchema(updateCampaignSchema),
    updateCampaign
);

router.delete("/:id", authRequired, deleteCampaign);

export default router;
