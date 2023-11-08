const express = require("express");
const {
    getListOfFunctionList,
    createFunction,
} = require("../controllers/functionListControllers");

const router = express.Router();

router.route("/").get(getListOfFunctionList);
router.route("/create").post(createFunction);

module.exports = router;
