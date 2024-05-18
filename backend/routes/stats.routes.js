import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getCampaignStats,
    getTagRanking,
    getFinancialStats,
    getTimeStats,
} from "../controllers/stats.controller.js";

const router = Router();

router.get("/campaigns", authRequired, getCampaignStats);

router.get("/tags", authRequired, getTagRanking);

router.get("/financial", authRequired, getFinancialStats);

router.get("/time", authRequired, getTimeStats);

export default router;
