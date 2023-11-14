const express = require("express");
const {
    createPackage,
    packageGetById,
    getListOfPackage,
    updatePackageById,
    deletePackageById,
} = require("../controllers/packageControllers");

const router = express.Router();

router.route("/create").post(createPackage);
router.route("/get").get(packageGetById);
router.route("/get-all").get(getListOfPackage);
router.route("/update").put(updatePackageById);
router.route("/delete").delete(deletePackageById);

module.exports = router;
