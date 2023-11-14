const express = require("express");
const {
    createAdminRole,
    adminRoleGetById,
    getListOfAdminRole,
    updateAdminRoleById,
    deleteAdminRoleById,
} = require("../controllers/adminRoleControllers");
const { verifyAccessToken } = require("../helper/jwt_helper");

const router = express.Router();

router.route("/create").post(verifyAccessToken, createAdminRole);
router.route("/get").get(verifyAccessToken, adminRoleGetById);
router.route("/get-all").get(verifyAccessToken, getListOfAdminRole);
router.route("/update").put(verifyAccessToken, updateAdminRoleById);
router.route("/delete").delete(verifyAccessToken, deleteAdminRoleById);

module.exports = router;
