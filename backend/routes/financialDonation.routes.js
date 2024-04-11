import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { createFinancialDonationSchema } from "../schemas/financialDonation.schema.js";
import { createFinancialDonation } from "../controllers/financialDonation.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post(
    "",
    validateToken,
    validateSchema(createFinancialDonationSchema),
    createFinancialDonation
);

export default router;
