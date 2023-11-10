const asyncHandler = require("express-async-handler");
const Package = require("../models/packageModel");
const {
    packageUpdateValidation,
    packageIdValidation,
    packageValidation,
} = require("../validation/serviceAndPackageValidation");
const createError = require("http-errors");

const createPackage = asyncHandler(async (req, res) => {
    const joiResult = await packageValidation.validateAsync(req.body);

    const packageNameExist = await Package.findOne({
        packageName: joiResult.packageName,
        status: "active",
        deletedAt: null,
    });
    if (packageNameExist) {
        throw createError.Conflict("Package name already exist!");
    }
    const packageCreate = await Package.create({
        ...joiResult,
        status: "active",
    });
    if (packageCreate) {
        res.status(201).json({
            _id: packageCreate._id,
            packageName: packageCreate.packageName,
            moduleId: packageCreate.moduleId,
            validateTimeInDay: packageCreate.validateTimeInDay,
        });
    } else {
        throw createError.Conflict("Unable to create Package");
    }
});

const packageGetById = asyncHandler(async (req, res) => {
    const joiResult = await packageIdValidation.validateAsync(req.body);

    const packageService = await Package.findOne({
        _id: joiResult.packageId,
        status: "active",
        deletedAt: null,
    })
        .select("packageName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (packageService) {
        res.status(201).json(packageService);
    } else {
        throw createError.NotFound("package not found");
    }
});

const getListOfPackage = asyncHandler(async (req, res) => {
    const getPackageList = await Package.find({
        status: "active",
        deletedAt: null,
    })
        .select("packageName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (getPackageList) {
        res.status(201).json(getPackageList);
    } else {
        throw createError.NotFound("Package not found");
    }
});

const updatePackageById = asyncHandler(async (req, res) => {
    const joiResult = await packageUpdateValidation.validateAsync(req.body);

    if (joiResult.packageName) {
        const packageNameExist = await Package.findOne({
            packageName: joiResult.packageName,
            status: "active",
            deletedAt: null,
        });
        if (packageNameExist) {
            throw createError.Conflict("Package name already exist!");
        }
    }
    const packageUpdate = await Package.findOneAndUpdate(
        {
            _id: joiResult.packageId,
            status: "active",
            deletedAt: null,
        },
        {
            ...joiResult,
            updatedAt: new Date().toISOString(),
        },
        { new: true }
    )
        .select("packageName moduleId validateTimeInDay")
        .populate("moduleId", "moduleOrServiceName");

    if (packageUpdate) {
        res.status(201).json(packageUpdate);
    } else {
        throw createError.BadRequest("Unable to update package");
    }
});

const deletePackageById = asyncHandler(async (req, res) => {
    const joiResult = await packageIdValidation.validateAsync(req.body);

    const packageDelete = await Package.findOneAndUpdate(
        {
            _id: joiResult.packageId,
            status: "active",
            deletedAt: null,
        },
        {
            status: "delete",
            deletedAt: new Date().toISOString(),
        }
    );

    if (packageDelete) {
        res.status(200).json({
            message: "Package deleted successfully",
        });
    } else {
        throw createError.BadRequest("Unable to delete api package");
    }
});

module.exports = {
    createPackage,
    packageGetById,
    getListOfPackage,
    updatePackageById,
    deletePackageById,
};
