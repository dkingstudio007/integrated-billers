const express = require("express");
const {
    createModuleOrService,
    moduleOrServiceGetById,
    getListOfModuleOrService,
    updateModuleOrServiceById,
    deleteServiceOrModuleById,
} = require("../controllers/moduleOrServiceControllers");
const { verifyAccessToken } = require("../helper/jwt_helper");

const router = express.Router();

router.route("/create").post(verifyAccessToken, createModuleOrService);
router.route("/get").get(verifyAccessToken, moduleOrServiceGetById);
router.route("/get-all").get(verifyAccessToken, getListOfModuleOrService);
router.route("/update").put(verifyAccessToken, updateModuleOrServiceById);
router.route("/delete").delete(verifyAccessToken, deleteServiceOrModuleById);

module.exports = router;
