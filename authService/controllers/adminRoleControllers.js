const asyncHandler = require("express-async-handler");
const AdminRole = require("../models/adminRoleModel");
const {
    adminRoleValidation,
    roleIdValidation,
    updateAdminRoleValidation,
} = require("../validation/authValidation");
const createError = require("http-errors");

const createAdminRole = asyncHandler(async (req, res) => {
    const joiResult = await adminRoleValidation.validateAsync(req.body);

    const roleNameExist = await AdminRole.findOne({
        adminRoleName: joiResult.adminRoleName,
        status: "active",
        deletedAt: null,
    });
    if (roleNameExist) {
        throw createError.Conflict("Admin role name already exist!");
    }
    const adminRoleCreate = await AdminRole.create({
        ...joiResult,
        status: "active",
    });
    if (adminRoleCreate) {
        res.status(201).json({
            _id: adminRoleCreate._id,
            adminRoleName: adminRoleCreate.adminRoleName,
        });
    } else {
        throw createError.Conflict("Unable to create Admin Role");
    }
});

const adminRoleGetById = asyncHandler(async (req, res) => {
    const joiResult = await roleIdValidation.validateAsync(req.body);

    const getRole = await AdminRole.findOne({
        _id: joiResult.roleId,
        status: "active",
        deletedAt: null,
    }).select("_id adminRoleName");

    if (getRole) {
        res.status(201).json(getRole);
    } else {
        throw createError.NotFound("Admin Role not found");
    }
});

const getListOfAdminRole = asyncHandler(async (req, res) => {
    const getAllRole = await AdminRole.find({
        status: "active",
        deletedAt: null,
    }).select("_id adminRoleName");

    if (getAllRole) {
        res.status(201).json(getAllRole);
    } else {
        throw createError.NotFound("Admin Role not found");
    }
});

const updateAdminRoleById = asyncHandler(async (req, res) => {
    const joiResult = await updateAdminRoleValidation.validateAsync(req.body);

    const roleNameExist = await AdminRole.findOne({
        adminRoleName: joiResult.adminRoleName,
        status: "active",
        deletedAt: null,
    });
    if (roleNameExist) {
        throw createError.Conflict("Admin Role already exist");
    }
    const adminRoleUpdate = await AdminRole.findOneAndUpdate(
        {
            _id: joiResult.roleId,
            status: "active",
            deletedAt: null,
        },
        {
            adminRoleName: joiResult.adminRoleName,
            updatedAt: new Date().toISOString(),
        },
        { new: true, select: "adminRoleName" }
    );

    if (adminRoleUpdate) {
        res.status(201).json(adminRoleUpdate);
    } else {
        throw createError.BadRequest("Unable to update role");
    }
});

const deleteAdminRoleById = asyncHandler(async (req, res) => {
    const joiResult = await roleIdValidation.validateAsync(req.body);

    const adminRoleDelete = await AdminRole.findOneAndUpdate(
        {
            _id: joiResult.roleId,
            status: "active",
            deletedAt: null,
        },
        {
            status: "delete",
            deletedAt: new Date().toISOString(),
        }
    );

    if (adminRoleDelete) {
        res.status(200).json({
            message: "Role deleted successfully",
        });
    } else {
        throw createError.BadRequest("Unable to delete admin role");
    }
});

module.exports = {
    createAdminRole,
    adminRoleGetById,
    getListOfAdminRole,
    updateAdminRoleById,
    deleteAdminRoleById,
};
