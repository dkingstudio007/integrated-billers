const asyncHandler = require("express-async-handler");
const AdminRole = require("../models/adminRoleModel");
const { adminRoleValidation } = require("../validation/authValidation");

const createAdminRole = asyncHandler(async (req, res) => {
    const joiResult = await adminRoleValidation.validateAsync(req.body);

    const roleNameExist = await AdminRole.findOne({
        adminRoleName: joiResult.adminRoleName,
    });
    if (roleNameExist) {
        res.status(400);
        throw new Error("Admin Role already exist");
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
        res.status(400);
        throw new Error("Unable to create Admin Role");
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
        res.status(404);
        throw new Error("Role not Found");
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
        res.status(404);
        throw new Error("Role not Found");
    }
});

const updateAdminRoleById = asyncHandler(async (req, res) => {
    const joiResult = await adminRoleValidation.validateAsync(req.body);

    const roleNameExist = await AdminRole.findOne({
        adminRoleName: joiResult.adminRoleName,
    });
    if (roleNameExist) {
        res.status(400);
        throw new Error("Admin Role already exist");
    }
    const adminRoleUpdate = await AdminRole.findOneAndUpdate(
        {
            _id: joiResult.roleId,
            status: "active",
            deletedAt: null,
        },
        {
            adminRoleName: joiResult.AdminRole,
            updatedAt: new Date().toISOString(),
        },{ new: true }
        
    );

    if (adminRoleUpdate) {
        res.status(201).json(adminRoleUpdate);
    } else {
        res.status(400);
        throw new Error("Unable to update role");
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
        },
        { new: true }
    );

    if (adminRoleDelete ) {
        res.status(204).send("Role deleted successfully");
    } else {
        res.status(400);
        throw new Error("Unable to delete role");
    }
});

module.exports = {
    createAdminRole,
    adminRoleGetById,
    getListOfAdminRole,
    updateAdminRoleById,
    deleteAdminRoleById
};
