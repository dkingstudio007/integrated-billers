const asyncHandler = require("express-async-handler");
const AdminRoleSettings = require("../models/adminRoleSettingsModel");
const createError = require("http-errors");
const {
    adminRoleSettingsValidation,
    roleSettingsIdValidation,
    UpdateAdminRoleSettingsValidation,
} = require("../validation/authValidation");

const createAdminRoleSettings = asyncHandler(async (req, res) => {
    const joiResult = await adminRoleSettingsValidation.validateAsync(req.body);

    const roleSettingsNameExist = await AdminRoleSettings.findOne({
        roleSettingsName: joiResult.roleSettingsName,
        status: "active",
    });
    if (roleSettingsNameExist) {
        throw createError(404, "Admin Role settings already exist");
    }
    const adminRoleSettingsCreate = await AdminRoleSettings.create({
        ...joiResult,
        status: "active",
    });
    if (adminRoleSettingsCreate) {
        res.status(201).json({
            _id: adminRoleSettingsCreate._id,
            roleSettingsName: adminRoleSettingsCreate.roleSettingsName,
            roleId: adminRoleSettingsCreate.roleId,
            functionId: adminRoleSettingsCreate.functionId,
        });
    } else {
        throw createError(400, "Unable to create Admin Role settings");
    }
});

const adminRoleSettingsGetById = asyncHandler(async (req, res) => {
    const joiResult = await roleSettingsIdValidation.validateAsync(req.body);

    const getRoleSettings = await AdminRoleSettings.findOne({
        _id: joiResult.roleSettingsId,
        status: "active",
        deletedAt: null,
    }).select("_id roleSettingsName roleId functionId");
    if (getRoleSettings) {
        res.status(201).json(getRole);
    } else {
        throw createError(404, "Admin Role settings not found");
    }
});

const getListOfAdminRoleSettings = asyncHandler(async (req, res) => {
    const getAllRoleSettings = await AdminRoleSettings.find({
        status: "active",
        deletedAt: null,
    }).select("_id roleSettingsName roleId functionId");

    if (getAllRoleSettings) {
        res.status(201).json(getAllRoleSettings);
    } else {
        throw createError(404, "Admin Role settings not found");
    }
});

const updateAdminRoleSettingsById = asyncHandler(async (req, res) => {
    const joiResult = await UpdateAdminRoleSettingsValidation.validateAsync(
        req.body
    );

    const roleSettingsNameExist = await AdminRoleSettings.findOne({
        roleSettingsName: joiResult.roleSettingsName,
        status: "active",
    });
    if (roleSettingsNameExist) {
        throw createError(404, "Admin Role settings already exist");
    }
    const adminRoleSettingsUpdate = await AdminRoleSettings.findOneAndUpdate(
        {
            _id: joiResult.roleSettingsId,
            status: "active",
            deletedAt: null,
        },
        {
            adminRoleName: joiResult.AdminRole,
            updatedAt: new Date().toISOString(),
        },
        { new: true }
    );

    if (adminRoleSettingsUpdate) {
        res.status(201).json(adminRoleSettingsUpdate);
    } else {
        throw createError(400, "Unable to Update Admin Role settings");
    }
});

const deleteAdminSettingsRoleById = asyncHandler(async (req, res) => {
    const joiResult = await roleSettingsIdValidation.validateAsync(req.body);

    const adminRoleSettingsDelete = await AdminRoleSettings.findOneAndUpdate(
        {
            _id: joiResult.roleId,
            status: "active",
            deletedAt: null,
        },
        {
            status: "delete",
            deletedAt: new Date().toISOString(),
        },
        { new: true }
    );

    if (adminRoleSettingsDelete) {
        res.status(204).send("Role admin settings deleted successfully");
    } else {
        throw createError(400, "Unable to delete Admin Role settings");
    }
});

module.exports = {
    createAdminRoleSettings,
    adminRoleSettingsGetById,
    getListOfAdminRoleSettings,
    updateAdminRoleSettingsById,
    deleteAdminSettingsRoleById,
};
