import mongoose from "mongoose";

const timeDonationSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        period: {
            startDate: Date,
            endDate: Date,
        },
        collaborator: {
            type: {
                type: String,
                enum: ["User", "Organization"],
                required: true,
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("TimeDonation", timeDonationSchema);
