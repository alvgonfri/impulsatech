import express from "express";
import { Router } from "express";
import { webhook } from "../controllers/financialDonation.controller.js";

const router = Router();

router.post("", express.raw({ type: "application/json" }), webhook);

export default router;
