const express = require("express");
const {
    getListOfFunctionList,
} = require("../controllers/functionListControllers");

const router = express.Router();

router.route("/").get(getListOfFunctionList);

module.exports = router;
