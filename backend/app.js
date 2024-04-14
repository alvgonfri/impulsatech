import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import financialDonationRoutes from "./routes/financialDonation.routes.js";
import timeDonationRoutes from "./routes/timeDonation.routes.js";

const app = express();

const corsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
    })
);

app.use("/api/v1", authRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/financial-donations", financialDonationRoutes);
app.use("/api/v1/time-donations", timeDonationRoutes);

export default app;
