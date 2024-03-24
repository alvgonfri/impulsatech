import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["ongoing", "completed", "cancelled"],
            default: "ongoing",
        },
        timeGoal: {
            type: Number,
        },
        financialGoal: {
            type: Number,
        },
        image: {
            type: String,
            trim: true,
        },
        deadline: {
            type: Date,
        },
        promoter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Campaign", campaignSchema);
