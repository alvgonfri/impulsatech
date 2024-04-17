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
        timeGoalPeriod: {
            startDate: Date,
            endDate: Date,
        },
        financialGoal: {
            type: Number,
        },
        image: {
            public_id: String,
            secure_url: String,
        },
        deadline: {
            type: Date,
        },
        tags: {
            type: [
                {
                    type: String,
                    enum: [
                        "Educación digital",
                        "Acceso a la tecnología",
                        "Acceso a la información",
                        "Conectividad",
                        "Habilidades digitales",
                        "Inclusión digital",
                        "Emprendimiento tecnológico",
                        "Desarrollo de software",
                    ],
                },
            ],
        },
        promoter: {
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Campaign", campaignSchema);
