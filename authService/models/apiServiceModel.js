const mongoose = require("mongoose");

const apiServiceModelSchema = mongoose.Schema(
    {
        moduleId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ModuleOrService",
            },
        ],
        apiServiceName: {
            type: String,
            require: true,
        },
        validateTime: {
            type: Date,
        },
        apiKey: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "delete", "pending", "deactivate"],
            require: true,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
        updatedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const ApiService = mongoose.model("ApiService", apiServiceModelSchema);
module.exports = ApiService;
