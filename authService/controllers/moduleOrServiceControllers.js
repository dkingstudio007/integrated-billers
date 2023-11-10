const asyncHandler = require("express-async-handler");
const ModuleOrService = require("../models/moduleOrServiceModel");
const {
    moduleOrServiceValidation,
    moduleOrServiceIdValidation,
    moduleOrServiceUpdateValidation,
} = require("../validation/serviceAndPackageValidation");
const createError = require("http-errors");

const createModuleOrService = asyncHandler(async (req, res) => {
    const joiResult = await moduleOrServiceValidation.validateAsync(req.body);

    const moduleNameExist = await ModuleOrService.findOne({
        moduleOrServiceName: joiResult.moduleOrServiceName,
        status: "active",
        deletedAt: null,
    });
    if (moduleNameExist) {
        throw createError.Conflict("Service name already exist!");
    }
    const moduleCreate = await ModuleOrService.create({
        ...joiResult,
        status: "active",
    });
    if (moduleCreate) {
        res.status(201).json({
            _id: moduleCreate._id,
            moduleOrServiceName: moduleCreate.moduleOrServiceName,
        });
    } else {
        throw createError.Conflict("Unable to create service");
    }
});

const moduleOrServiceGetById = asyncHandler(async (req, res) => {
    const joiResult = await moduleOrServiceIdValidation.validateAsync(req.body);

    const getModule = await ModuleOrService.findOne({
        _id: joiResult.serviceId,
        status: "active",
        deletedAt: null,
    }).select("moduleOrServiceName");

    if (getModule) {
        res.status(201).json(getModule);
    } else {
        throw createError.NotFound("Module not found");
    }
});

const getListOfModuleOrService = asyncHandler(async (req, res) => {
    const getModuleList = await ModuleOrService.find({
        status: "active",
        deletedAt: null,
    }).select("moduleOrServiceName");

    if (getModuleList) {
        res.status(201).json(getModuleList);
    } else {
        throw createError.NotFound("Service not found");
    }
});

const updateModuleOrServiceById = asyncHandler(async (req, res) => {
    const joiResult = await moduleOrServiceUpdateValidation.validateAsync(
        req.body
    );

    const moduleNameExist = await ModuleOrService.findOne({
        moduleOrServiceName: joiResult.moduleOrServiceName,
        status: "active",
        deletedAt: null,
    });
    if (moduleNameExist) {
        throw createError.Conflict("Service name already exist!");
    }
    const ServiceUpdate = await ModuleOrService.findOneAndUpdate(
        {
            _id: joiResult.serviceId,
            status: "active",
            deletedAt: null,
        },
        {
            moduleOrServiceName: joiResult.moduleOrServiceName,
            updatedAt: new Date().toISOString(),
        },
        { new: true }
    ).select("moduleOrServiceName");

    if (ServiceUpdate) {
        res.status(201).json(ServiceUpdate);
    } else {
        throw createError.BadRequest("Unable to update service");
    }
});

const deleteServiceOrModuleById = asyncHandler(async (req, res) => {
    const joiResult = await moduleOrServiceIdValidation.validateAsync(req.body);

    const serviceDelete = await ModuleOrService.findOneAndUpdate(
        {
            _id: joiResult.serviceId,
            status: "active",
            deletedAt: null,
        },
        {
            status: "delete",
            deletedAt: new Date().toISOString(),
        }
    );

    if (serviceDelete) {
        res.status(200).json({
            message: "Service deleted successfully",
        });
    } else {
        throw createError.BadRequest("Unable to delete service");
    }
});

module.exports = {
    createModuleOrService,
    moduleOrServiceGetById,
    getListOfModuleOrService,
    updateModuleOrServiceById,
    deleteServiceOrModuleById,
};
