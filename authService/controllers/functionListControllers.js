const asyncHandler = require("express-async-handler");
const Function = require("../models/functionListModel");
const createError = require("http-errors");

const createFunction = asyncHandler(async (req, res) => {
    const functionCreate = await Function.create({
        ...req.body,
        status: "active",
    });
    if (functionCreate) {
        res.status(201).send("created");
    } else {
        throw createError.Conflict("Unable to create function");
    }
});

const getListOfFunctionList = asyncHandler(async (req, res) => {
    const getAllFunction = await Function.find({
        status: "active",
        deletedAt: null,
    }).select("-createdAt -updatedAt -deletedAt");

    if (getAllFunction) {
        res.status(201).json(getAllFunction);
    } else {
        throw createError.NotFound("Function list not found e");
    }
});

module.exports = {
    getListOfFunctionList,
    createFunction,
};
