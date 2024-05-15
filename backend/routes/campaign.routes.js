import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { parseCampign } from "../middlewares/parse.js";
import {
    createCampaignSchema,
    updateCampaignSchema,
} from "../schemas/campaign.schema.js";
import {
    getCampaigns,
    getCampaignsByStatus,
    getFeaturedCampaigns,
    getInterestingCampaigns,
    getCampaignsByPromoter,
    getCampaign,
    getCampaignCollaborators,
    createCampaign,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller.js";

const router = Router();

router.get("", getCampaigns);

router.get("/ongoing", getCampaignsByStatus("ongoing"));

router.get("/completed", getCampaignsByStatus("completed"));

router.get("/cancelled", getCampaignsByStatus("cancelled"));

router.get("/featured", getFeaturedCampaigns);

router.get("/interesting", getInterestingCampaigns);

router.get("/promoter/:id", getCampaignsByPromoter);

router.get("/:id", getCampaign);

router.get("/:id/collaborators", getCampaignCollaborators);

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
