import mongoose from "mongoose";

const financialDonationSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        anonymous: {
            type: Boolean,
            required: true,
        },
        collaborator: {
            type: {
                type: String,
                enum: ["User", "Organization"],
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("FinancialDonation", financialDonationSchema);
