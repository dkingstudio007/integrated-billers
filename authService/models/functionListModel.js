const mongoose = require("mongoose");

const functionListModelSchema = mongoose.Schema(
    {
        functionName: {
            type: String,
            require: true,
        },
        apiEndPoint: {
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

const Function = mongoose.model("Function", functionListModelSchema);
module.exports = Function;
