const asyncHandler = require("express-async-handler");
const ApiService = require("../models/apiServiceModel");
const {
    apiServiceValidation,
    apiServiceIdValidation,
    apiServiceUpdateValidation,
} = require("../validation/serviceAndPackageValidation");
const createError = require("http-errors");

const createApiService = asyncHandler(async (req, res) => {
    const joiResult = await apiServiceValidation.validateAsync(req.body);

    const apiServiceNameExist = await ApiService.findOne({
        apiServiceName: joiResult.apiServiceName,
        status: "active",
        deletedAt: null,
    });
    if (apiServiceNameExist) {
        throw createError.Conflict("Service name already exist!");
    }
    const apiServiceCreate = await ApiService.create({
        ...joiResult,
        status: "active",
    });
    if (apiServiceCreate) {
        res.status(201).json({
            _id: apiServiceCreate._id,
            apiServiceName: apiServiceCreate.apiServiceName,
            moduleId: apiServiceCreate.moduleId,
            validateTimeInDay: apiServiceCreate.validateTimeInDay,
        });
    } else {
        throw createError.Conflict("Unable to create api service");
    }
});

const apiServiceGetById = asyncHandler(async (req, res) => {
    const joiResult = await apiServiceIdValidation.validateAsync(req.body);

    const getApiService = await ApiService.findOne({
        _id: joiResult.apiServiceId,
        status: "active",
        deletedAt: null,
    })
        .select("apiServiceName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (getApiService) {
        res.status(201).json(getApiService);
    } else {
        throw createError.NotFound("api Service not found");
    }
});

const getListOfApiService = asyncHandler(async (req, res) => {
    const getApiServiceList = await ApiService.find({
        status: "active",
        deletedAt: null,
    })
        .select("apiServiceName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (getApiServiceList) {
        res.status(201).json(getApiServiceList);
    } else {
        throw createError.NotFound("api Service not found");
    }
});

const updateApiServiceById = asyncHandler(async (req, res) => {
    const joiResult = await apiServiceUpdateValidation.validateAsync(req.body);

    if (joiResult.apiServiceName) {
        const apiServiceNameExist = await ApiService.findOne({
            apiServiceName: joiResult.apiServiceName,
            status: "active",
            deletedAt: null,
        });
        if (apiServiceNameExist) {
            throw createError.Conflict("Service name already exist!");
        }
    }
    const apiServiceUpdate = await ApiService.findOneAndUpdate(
        {
            _id: joiResult.apiServiceId,
            status: "active",
            deletedAt: null,
        },
        {
            ...joiResult,
            updatedAt: new Date().toISOString(),
        },
        { new: true }
    )
        .select("apiServiceName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (apiServiceUpdate) {
        res.status(201).json(apiServiceUpdate);
    } else {
        throw createError.BadRequest("Unable to update api service");
    }
});

const deleteApiServiceById = asyncHandler(async (req, res) => {
    const joiResult = await apiServiceIdValidation.validateAsync(req.body);

    const apiServiceDelete = await ApiService.findOneAndUpdate(
        {
            _id: joiResult.apiServiceId,
            status: "active",
            deletedAt: null,
        },
        {
            status: "delete",
            deletedAt: new Date().toISOString(),
        }
    );

    if (apiServiceDelete) {
        res.status(200).json({
            message: "Api service deleted successfully",
        });
    } else {
        throw createError.BadRequest("Unable to delete api service");
    }
});

module.exports = {
    createApiService,
    apiServiceGetById,
    getListOfApiService,
    updateApiServiceById,
    deleteApiServiceById,
};
