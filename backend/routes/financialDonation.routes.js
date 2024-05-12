import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import {
    createFinancialDonationSchema,
    updateFinancialDonationSchema,
} from "../schemas/financialDonation.schema.js";
import {
    getFinancialDonationsByCampaign,
    getReinvestmentsByCollaborator,
    createFinancialDonation,
    processPayment,
    updateFinancialDonation,
} from "../controllers/financialDonation.controller.js";
import { authRequired, validateToken } from "../middlewares/validateToken.js";
import { parseFinancialDonation } from "../middlewares/parse.js";

const router = Router();

router.get("/:campaignId", getFinancialDonationsByCampaign);

router.get("/reinvestments/:collaboratorId", getReinvestmentsByCollaborator);

router.post(
    "",
    validateToken,
    parseFinancialDonation,
    validateSchema(createFinancialDonationSchema),
    createFinancialDonation
);

router.post(
    "/process-payment",
    validateToken,
    parseFinancialDonation,
    validateSchema(createFinancialDonationSchema),
    processPayment
);

router.patch(
    "/:id",
    authRequired,
    parseFinancialDonation,
    validateSchema(updateFinancialDonationSchema),
    updateFinancialDonation
);

export default router;
