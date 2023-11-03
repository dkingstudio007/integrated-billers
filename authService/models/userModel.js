const mongoose = require("mongoose");

const userModelSchema = mongoose.Schema(
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
            default: null,
        },
        middleName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            default: null,
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
        phoneNumber: {
            type:String,
            default:null
        },
        presentAddress:{
            type:String,
            default:null
        },
        permanentAddress:{
            type: String,
            default:null
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

const User = mongoose.model("User", userModelSchema);
module.exports = User;