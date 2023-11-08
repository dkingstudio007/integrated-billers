const mongoose = require("mongoose");

const moduleOrServiceModelSchema = mongoose.Schema(
    {
        moduleOrServiceName: {
            type: String,
            require: true,
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

const ModuleOrService = mongoose.model(
    "ModuleOrService",
    moduleOrServiceModelSchema
);
module.exports = ModuleOrService;
