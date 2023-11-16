const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const {
    validateUserSignup,
    validateAdminLogin,
} = require("../validation/authValidation");
const createError = require("http-errors");

const { signAccessToken, signRefreshToken } = require("../helper/jwt_helper");

const registerUser = asyncHandler(async (req, res) => {
    const joiResult = await validateUserSignup.validateAsync(req.body);

    const userExists = await User.findOne({ email: joiResult.email });
    if (userExists) {
        throw createError.Conflict("Email already exist");
    }

    const adminExists = await Admin.findOne({ email: joiResult.email });
    if (adminExists) {
        throw createError.Conflict("Email already exist");
    }

    const hashedPassword = await bcrypt.hash(joiResult.password, 10);
    joiResult.password = hashedPassword;

    const userCreated = await User.create({
        ...joiResult,
        status: "active",
    });
    if (userCreated) {
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
        });
    } else {
        throw createError.BadRequest("Failed to create an user");
    }
});

const userLogin = async (req, res, next) => {
    try {
        const result = await validateAdminLogin.validateAsync(req.body);

        const user = await User.findOne({ email: result.email });
        if (!user) {
            throw createError.NotFound("User not registered!");
        }

        try {
            const isMatch = await bcrypt.compare(
                result.password,
                user.password
            );
            if (!isMatch) {
                throw createError.Unauthorized("Username/Password not valid!");
            }

            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
            res.send({
                status: 200,
                message: "Login successful",
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    fullName: user.fullName,
                    email: user.email,
                },
            });
        } catch (error) {
            throw error;
        }
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        // if (error.isJoi === true) {
        //     return next(createError.BadRequest("Invalid Username/Password!"));
        // }
        next(error);
    }
};
module.exports = { registerUser, userLogin };
