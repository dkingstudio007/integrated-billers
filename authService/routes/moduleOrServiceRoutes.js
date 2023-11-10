const express = require("express");
const {
    createModuleOrService,
    moduleOrServiceGetById,
    getListOfModuleOrService,
    updateModuleOrServiceById,
    deleteServiceOrModuleById,
} = require("../controllers/moduleOrServiceControllers");

const router = express.Router();

router.route("/create").post(createModuleOrService);
router.route("/get").get(moduleOrServiceGetById);
router.route("/get-all").get(getListOfModuleOrService);
router.route("/update").put(updateModuleOrServiceById);
router.route("/delete").delete(deleteServiceOrModuleById);

module.exports = router;
