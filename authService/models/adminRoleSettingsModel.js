const mongoose = require("mongoose")

const adminRoleSettingsModelSchema = ({
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminRole",
    },
    functionId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Function"
    }],
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

const AdminRoleSettings = mongoose.model("AdminRoleSettings",adminRoleSettingsModelSchema );
module.exports = AdminRoleSettings;