import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        image: {
            public_id: String,
            secure_url: String,
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

export default mongoose.model("Post", postSchema);
