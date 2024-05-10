import cron from "node-cron";
import app from "./app.js";
import { connectDB } from "./db.js";
import { updateCampaigns } from "./libs/updateCampaigns.js";

connectDB();

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", process.env.PORT || 3000);
});

// Cron job to check campaigns every hour
cron.schedule("0 * * * *", () => {
    console.log("Running cron job to check campaigns");
    updateCampaigns();
});
