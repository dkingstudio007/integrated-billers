const asyncHandler = require("express-async-handler");
const AdminRoleSettings = require("../models/adminRoleSettingsModel");
const createError = require("http-errors");
const {
    adminRoleSettingsValidation,
    roleSettingsIdValidation,
    UpdateAdminRoleSettingsValidation,
    userIdValidation,
} = require("../validation/authValidation");

const createAdminRoleSettings = asyncHandler(async (req, res) => {
    const joiResult = await adminRoleSettingsValidation.validateAsync(req.body);

    const checkUniqueAdminUser = await AdminRoleSettings.findOne({
        adminUserId: joiResult.adminUserId,
        status: "active",
        deletedAt: null,
    });

    if (checkUniqueAdminUser) {
        throw createError.Conflict("Admin role Already exist");
    }

    const adminRoleSettingsCreate = await AdminRoleSettings.create({
        ...joiResult,
        status: "active",
    });

    if (adminRoleSettingsCreate) {
        res.status(201).json({
            _id: adminRoleSettingsCreate._id,
            roleId: adminRoleSettingsCreate.roleId,
            functionId: adminRoleSettingsCreate.functionId,
            adminUserId: adminRoleSettingsCreate.adminUserId,
        });
    } else {
        throw createError.BadRequest("Unable to create Admin Role settings");
    }
});

const adminRoleSettingsGetByUserId = asyncHandler(async (req, res) => {
    const joiResult = await userIdValidation.validateAsync(req.body);

    const getRoleSettings = await AdminRoleSettings.findOne({
        adminUserId: joiResult.userId,
        status: "active",
        deletedAt: null,
    })
        .select("_id roleId functionId adminUserId")
        .populate("roleId", "adminRoleName")
        .populate("functionId", "functionName apiEndPoint");
    if (getRoleSettings) {
        res.status(201).json(getRoleSettings);
    } else {
        throw createError.NotFound("Admin Role settings not found");
    }
});

const getListOfAdminRoleSettings = asyncHandler(async (req, res) => {
    const getAllRoleSettings = await AdminRoleSettings.find({
        status: "active",
        deletedAt: null,
    })
        .select("_id roleId functionId adminUserId")
        .populate("roleId", "adminRoleName")
        .populate("functionId", "functionName apiEndPoint");

    if (getAllRoleSettings) {
        res.status(201).json(getAllRoleSettings);
    } else {
        throw createError.BadRequest("Admin Role settings not found");
    }
});

const updateAdminRoleSettingsById = asyncHandler(async (req, res) => {
    const joiResult = await UpdateAdminRoleSettingsValidation.validateAsync(
        req.body
    );

    const adminRoleSettingsUpdate = await AdminRoleSettings.findOneAndUpdate(
        {
            _id: joiResult.roleSettingsId,
            status: "active",
            deletedAt: null,
        },
        {
            ...joiResult,
            updatedAt: new Date().toISOString(),
        },
        { new: true }
    )
        .select("_id roleId functionId adminUserId")
        .populate("roleId", "adminRoleName")
        .populate("functionId", "functionName apiEndPoint");
    if (adminRoleSettingsUpdate) {
        res.status(201).json(adminRoleSettingsUpdate);
    } else {
        throw createError.BadRequest("Unable to Update Admin Role settings");
    }
});

const deleteAdminSettingsRoleById = asyncHandler(async (req, res) => {
    const joiResult = await roleSettingsIdValidation.validateAsync(req.body);

    const adminRoleSettingsDelete = await AdminRoleSettings.findOneAndUpdate(
        {
            _id: joiResult.roleSettingsId,
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
        res.status(201).json({
            message: "Role admin settings deleted successfully",
        });
    } else {
        throw createError.BadRequest("Unable to delete Admin Role settings");
    }
});

module.exports = {
    createAdminRoleSettings,
    adminRoleSettingsGetByUserId,
    getListOfAdminRoleSettings,
    updateAdminRoleSettingsById,
    deleteAdminSettingsRoleById,
};
