const express = require("express");
const {
    createAdminRoleSettings,
    adminRoleSettingsGetByUserId,
    getListOfAdminRoleSettings,
    updateAdminRoleSettingsById,
    deleteAdminSettingsRoleById,
} = require("../controllers/adminRoleSettingsControllers");
const { verifyAccessToken } = require("../helper/jwt_helper");

const router = express.Router();

router.route("/create").post(verifyAccessToken, createAdminRoleSettings);
router
    .route("/get-by-userId")
    .get(verifyAccessToken, adminRoleSettingsGetByUserId);
router.route("/get-all").get(verifyAccessToken, getListOfAdminRoleSettings);
router.route("/update").put(verifyAccessToken, updateAdminRoleSettingsById);
router.route("/delete").delete(verifyAccessToken, deleteAdminSettingsRoleById);

module.exports = router;
