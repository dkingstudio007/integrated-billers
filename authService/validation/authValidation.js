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

const adminRoleSettingsValidation = Joi.object({
    roleSettingsName: Joi.string().required(),
    roleId: Joi.string().required(),
    functionId: Joi.array().items(Joi.string()),
});

const UpdateAdminRoleSettingsValidation = Joi.object({
    roleSettingsId: Joi.string().required(),
    roleSettingsName: Joi.string().allow(null, ""),
    roleId: Joi.string().allow(null, ""),
    functionId: Joi.array().items(Joi.string()).allow(null, ""),
});

const apiServiceValidation = Joi.object({
    moduleId: Joi.array().items(Joi.string()),
    apiServiceName: Joi.string(),
    validateTime: Joi.string()
        .allow(null, "")
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .message(
            'Invalid date format. Please provide the date in the format "YYYY-MM-DD"'
        ),
    apiKey: Joi.string(),
});

const packageValidation = Joi.object({
    moduleId: Joi.array().items(Joi.string()),
    packageName: Joi.string(),
    validateTime: Joi.string()
        .allow(null, "")
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .message(
            'Invalid date format. Please provide the date in the format "YYYY-MM-DD"'
        ),
});

const adminRoleValidation = Joi.object({
    adminRoleName: Joi.string().required(),
});

const updateAdminRoleValidation = Joi.object({
    roleId: Joi.string().required(),
    adminRoleName: Joi.string().required().allow(null, ""),
    roleId: Joi.string().required().allow(null, ""),
});

const roleIdValidation = Joi.object({
    roleId: Joi.string().required(),
});

const roleSettingsIdValidation = Joi.object({
    roleSettingsId: Joi.string().required(),
});

module.exports = {
    validateUserSignup,
    validateAdminSignup,
    validateUserLogin,
    adminRoleSettingsValidation,
    apiServiceValidation,
    packageValidation,
    adminRoleValidation,
    updateAdminRoleValidation,
    roleIdValidation,
    roleSettingsIdValidation,
};
