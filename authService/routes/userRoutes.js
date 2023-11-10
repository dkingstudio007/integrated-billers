const express = require("express");
const {
    registerUser,
    userLogin,
} = require("../controllers/userAuthControllers");

const router = express.Router();

router.route("/registration").post(registerUser);
router.route("/login").post(userLogin);

module.exports = router;
