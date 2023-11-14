const express = require("express");
const {
    createApiService,
    apiServiceGetById,
    getListOfApiService,
    updateApiServiceById,
    deleteApiServiceById,
} = require("../controllers/apiServiceControllers");

const router = express.Router();

router.route("/create").post(createApiService);
router.route("/get").get(apiServiceGetById);
router.route("/get-all").get(getListOfApiService);
router.route("/update").put(updateApiServiceById);
router.route("/delete").delete(deleteApiServiceById);

module.exports = router;
