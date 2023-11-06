const express = require("express");
const { registerAdmin } = require("../controllers/adminAuthControllers");


const router = express.Router();

router.route("/registration").post(registerAdmin);

module.exports = router;
