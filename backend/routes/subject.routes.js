import { Router } from "express";
import {
    getSubject,
    getDonationsBySubject,
} from "../controllers/subject.controller.js";

const router = Router();

router.get("/:id", getSubject);

router.get("/:id/donations", getDonationsBySubject);

export default router;
