const express = require("express");
const {
    createAdminRoleSettings,
    adminRoleSettingsGetByUserId,
    getListOfAdminRoleSettings,
    updateAdminRoleSettingsById,
    deleteAdminSettingsRoleById,
} = require("../controllers/adminRoleSettingsControllers");

const router = express.Router();

router.route("/create").post(createAdminRoleSettings);
router.route("/get-by-userId").get(adminRoleSettingsGetByUserId);
router.route("/get-all").get(getListOfAdminRoleSettings);
router.route("/update").put(updateAdminRoleSettingsById);
router.route("/delete").delete(deleteAdminSettingsRoleById);

module.exports = router;
