const asyncHandler = require("express-async-handler");
const Function = require("../models/functionListModel");
const createError = require("http-errors");

const getListOfFunctionList = asyncHandler(async (req, res) => {
    const getAllFunction = await Function.find({
        status: "active",
        deletedAt: null,
    }).select("_id adminRoleName");

    if (getAllFunction) {
        res.status(201).json(getAllRole);
    } else {
        throw createError(404, "Function list not found for admin role");
    }
});

module.exports = {
    getListOfFunctionList,
};
