const express = require("express");
const {
    createPackage,
    packageGetById,
    getListOfPackage,
    updatePackageById,
    deletePackageById,
} = require("../controllers/packageControllers");
const { verifyAccessToken } = require("../helper/jwt_helper");
const router = express.Router();

router.route("/create").post(verifyAccessToken, createPackage);
router.route("/get").get(verifyAccessToken, packageGetById);
router.route("/get-all").get(verifyAccessToken, getListOfPackage);
router.route("/update").put(verifyAccessToken, updatePackageById);
router.route("/delete").delete(verifyAccessToken, deletePackageById);

module.exports = router;
