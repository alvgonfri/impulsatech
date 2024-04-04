import { Router } from "express";
import {
    register,
    registerOrganization,
    login,
    logout,
    verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, registerOrganizationSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/register-organization", validateSchema(registerOrganizationSchema), registerOrganization);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify-token", verifyToken);

export default router;
