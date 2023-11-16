const express = require("express");
const {
    registerAdmin,
    adminLogin,
} = require("../controllers/adminAuthControllers");

const router = express.Router();

router.route("/registration").post(registerAdmin);
router.route("/login").post(adminLogin);

module.exports = router;
