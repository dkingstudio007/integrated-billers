const mongoose = require("mongoose");

const adminModelSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        firstName: {
            type: String,
            require: true,
        },
        middleName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            require: true,
        },
        profilePhotoUrl: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            enum: ["active", "delete", "pending", "deactivate"],
            require: true,
        },
        adminRole: {
            type: String,
            default: null,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        updatedAt: {
            type: Date,
            default: null,
        },
        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", adminModelSchema);
module.exports = Admin;
