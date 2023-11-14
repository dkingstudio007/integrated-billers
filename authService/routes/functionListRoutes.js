const express = require("express");
const {
    getListOfFunctionList,
    createFunction,
} = require("../controllers/functionListControllers");

const router = express.Router();
const { verifyAccessToken } = require("../helper/jwt_helper");

router.route("/").get(verifyAccessToken, getListOfFunctionList);
router.route("/create").post(createFunction);

module.exports = router;
