const express = require('express')
const {registerUser} = require("../controllers/userAuthControllers")



const router = express.Router()

router.route('/registration').post(registerUser)


module.exports = router;