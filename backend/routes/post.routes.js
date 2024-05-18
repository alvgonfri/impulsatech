import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createPostSchema } from "../schemas/post.schema.js";
import {
    createPost,
    getPostsByCampaign,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/:campaignId", authRequired, getPostsByCampaign);

router.post("", authRequired, validateSchema(createPostSchema), createPost);

export default router;
