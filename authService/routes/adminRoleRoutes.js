const express = require("express");
const {
    createAdminRole,
    adminRoleGetById,
    getListOfAdminRole,
    updateAdminRoleById,
    deleteAdminRoleById,
} = require("../controllers/adminRoleControllers");

const router = express.Router();

router.route("/create").post(createAdminRole);
router.route("/get").get(adminRoleGetById);
router.route("/get-all").get(getListOfAdminRole);
router.route("/update").put(updateAdminRoleById);
router.route("/delete").delete(deleteAdminRoleById);

module.exports = router;
