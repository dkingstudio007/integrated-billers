const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel")
const User= require("../models/userModel")
const {validateAdminSignup} = require("../validation/authValidation")


const registerAdmin = asyncHandler(async(req,res)=>{

    const joiResult =  await validateAdminSignup.validateAsync(req.body);
    const adminExists = await Admin.findOne({email: joiResult.email})
    if(adminExists){
        res.status(400)
        throw new Error("Email already exist")
    }
    const userExists = await User.findOne({email: joiResult.email})
    if(userExists){
        res.status(400)
        throw new Error("Email already exist")
    }

    const hashedPassword = await bcrypt.hash(joiResult.password, 10);
    joiResult.password = hashedPassword;

    const AdminCreate =  await Admin.create({
        ...joiResult,
        status: "active",
    })
    if (AdminCreate){
        res.status(201).json({
            _id: AdminCreate._id,
            email: AdminCreate.email,
            firstName: AdminCreate.firstName,
            middleName: AdminCreate.middleName,
            lastName: AdminCreate.lastName,
            profilePhotoUrl: AdminCreate.profilePhotoUrl,
            
        })
    }else{
        res.status(400)
        throw new Error("Failed to create an user")
    }
})

module.exports = {registerAdmin}
