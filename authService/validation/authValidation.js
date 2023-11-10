const Joi = require("joi");

const validateUserSignup = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(null, ""),
    lastName: Joi.string().required(),
    profilePhotoUrl: Joi.string().uri().allow(null),
    phoneNumber: Joi.string().min(11).max(14),
    presentAddress: Joi.string().allow(null, ""),
    permanentAddress: Joi.string().allow(null, ""),
});

const validateAdminSignup = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(null, ""),
    lastName: Joi.string().required(),
    profilePhotoUrl: Joi.string().uri().allow(null),
});

const validateUserLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

// admin role settings

const adminRoleSettingsValidation = Joi.object({
    roleId: Joi.string().required(),
    functionId: Joi.array().items(Joi.string()).required(),
    adminUserId: Joi.string().required(),
});

const UpdateAdminRoleSettingsValidation = Joi.object({
    roleSettingsId: Joi.string().required(),
    roleId: Joi.string().allow(null, ""),
    functionId: Joi.array().items(Joi.string()).allow(null, ""),
});

const roleSettingsIdValidation = Joi.object({
    roleSettingsId: Joi.string().required(),
});

const userIdValidation = Joi.object({
    userId: Joi.string().required(),
});

// admin role
const adminRoleValidation = Joi.object({
    adminRoleName: Joi.string().required(),
});

const updateAdminRoleValidation = Joi.object({
    roleId: Joi.string().required(),
    adminRoleName: Joi.string().required(),
});

const roleIdValidation = Joi.object({
    roleId: Joi.string().required(),
});
const validateAdminLogin = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    validateUserSignup,
    validateAdminSignup,
    validateUserLogin,
    adminRoleSettingsValidation,
    adminRoleValidation,
    updateAdminRoleValidation,
    roleIdValidation,
    roleSettingsIdValidation,
    UpdateAdminRoleSettingsValidation,
    userIdValidation,
    validateAdminLogin,
};
