import { Router } from "express";
import { getDonationsBySubject } from "../controllers/subject.controller.js";

const router = Router();

router.get("/:id/donations", getDonationsBySubject);

export default router;
