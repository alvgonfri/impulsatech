import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { createTimeRecordSchema } from "../schemas/timeRecord.schema.js";
import { createTimeRecord } from "../controllers/timeRecord.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { parseTimeRecord } from "../middlewares/parse.js";

const router = Router();

router.post(
    "",
    authRequired,
    parseTimeRecord,
    validateSchema(createTimeRecordSchema),
    createTimeRecord
);

export default router;
