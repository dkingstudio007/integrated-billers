const mongoose = require("mongoose");

const packageModelSchema =
    ({
        moduleId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ModuleOrService",
            },
        ],
        packageName: {
            type: String,
            require: true,
        },
        validateTime: {
            type: Date,
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
    });

const Package = mongoose.model("Package", packageModelSchema);
module.exports = Package;
