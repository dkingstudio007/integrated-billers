const Joi = require("joi");

const apiServiceValidation = Joi.object({
    moduleId: Joi.array().items(Joi.string()).required(),
    apiServiceName: Joi.string().required(),
    validateTimeInDay: Joi.string().required(),
    apiKey: Joi.string().allow(null, ""),
});

const apiServiceUpdateValidation = Joi.object({
    apiServiceId: Joi.string().required(),
    moduleId: Joi.array().items(Joi.string()).allow(null, ""),
    apiServiceName: Joi.string().allow(null, ""),
    validateTimeInDay: Joi.string().allow(null, ""),
    apiKey: Joi.string().allow(null, ""),
});

const apiServiceIdValidation = Joi.object({
    apiServiceId: Joi.string().required(),
});

const packageValidation = Joi.object({
    moduleId: Joi.array().items(Joi.string()).required(),
    packageName: Joi.string().required(),
    validateTimeInDay: Joi.string().required(),
});

const packageUpdateValidation = Joi.object({
    packageId: Joi.string().required(),
    moduleId: Joi.array().items(Joi.string()).allow(null, ""),
    packageName: Joi.string().allow(null, ""),
    validateTimeInDay: Joi.string().allow(null, ""),
});

const packageIdValidation = Joi.object({
    packageId: Joi.string().required(),
});

const moduleOrServiceValidation = Joi.object({
    moduleOrServiceName: Joi.string().required(),
});

const moduleOrServiceIdValidation = Joi.object({
    serviceId: Joi.string().required(),
});

const moduleOrServiceUpdateValidation = Joi.object({
    moduleOrServiceName: Joi.string().required(),
    serviceId: Joi.string().required(),
});
module.exports = {
    apiServiceValidation,
    apiServiceIdValidation,
    apiServiceUpdateValidation,
    packageValidation,
    moduleOrServiceValidation,
    moduleOrServiceIdValidation,
    moduleOrServiceUpdateValidation,
    packageUpdateValidation,
    packageIdValidation,
    packageValidation,
};
