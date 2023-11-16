const express = require("express");
const {
    createApiService,
    apiServiceGetById,
    getListOfApiService,
    updateApiServiceById,
    deleteApiServiceById,
} = require("../controllers/apiServiceControllers");
const { verifyAccessToken } = require("../helper/jwt_helper");

const router = express.Router();

router.route("/create").post(verifyAccessToken, createApiService);
router.route("/get").get(verifyAccessToken, apiServiceGetById);
router.route("/get-all").get(verifyAccessToken, getListOfApiService);
router.route("/update").put(verifyAccessToken, updateApiServiceById);
router.route("/delete").delete(verifyAccessToken, deleteApiServiceById);

module.exports = router;
