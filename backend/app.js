import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN_LOCAL }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);

export default app;
