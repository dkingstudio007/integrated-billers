const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel")
const User = require("../models/userModel")
const {validateUserSignup} = require("../validation/authValidation")


const registerUser = asyncHandler(async(req,res)=>{

    const joiResult =  await validateUserSignup.validateAsync(req.body);

    const userExists = await User.findOne({email: joiResult.email})
    if(userExists){
        res.status(400)
        throw new Error("Email already exist")
    }

    const adminExists = await Admin.findOne({email: joiResult.email})
    if(adminExists){
        res.status(400)
        throw new Error("Email already exist")
    }

    const hashedPassword = await bcrypt.hash(joiResult.password, 10);
    joiResult.password = hashedPassword;

    const userCreated =  await User.create({
        ...joiResult,
        status: "active",
    })
    if (userCreated){
        res.status(201).json({
            _id: userCreated._id,
            email: userCreated.email,
            firstName: userCreated.firstName,
            middleName: userCreated.middleName,
            lastName: userCreated.lastName,
            profilePhotoUrl: userCreated.profilePhotoUrl,
            phoneNumber: userCreated.phoneNumber,
            presentAddress: userCreated.presentAddress,
            permanentAddress: userCreated.permanentAddress,
            
        })
    }else{
        res.status(400)
        throw new Error("Failed to create an user")
    }
})

module.exports = {registerUser}
