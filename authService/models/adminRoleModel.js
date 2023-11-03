const mongoose = require("mongoose")

const adminRoleModelSchema = ({
    adminRoleName:{
        type: String,
        require: true
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
    })

const AdminRole = mongoose.model("AdminRole",adminRoleModelSchema );
module.exports = AdminRole;