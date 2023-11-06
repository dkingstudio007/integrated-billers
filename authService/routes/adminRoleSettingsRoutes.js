const express = require("express");
const {
    createAdminRoleSettings,
    adminRoleSettingsGetById,
    getListOfAdminRoleSettings,
    updateAdminRoleSettingsById,
    deleteAdminSettingsRoleById,
} = require("../controllers/adminRoleSettingsControllers");

const router = express.Router();

router.route("/create").post(createAdminRoleSettings);
router.route("/get").get(adminRoleSettingsGetById);
router.route("/get-all").get(getListOfAdminRoleSettings);
router.route("/update").put(updateAdminRoleSettingsById);
router.route("/delete").delete(deleteAdminSettingsRoleById);

module.exports = router;
