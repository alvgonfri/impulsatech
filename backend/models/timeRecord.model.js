import mongoose from "mongoose";

const timeRecordSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
        },
        timeDonation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TimeDonation",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("TimeRecord", timeRecordSchema);
