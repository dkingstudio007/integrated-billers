const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const createError = require("http-errors");
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "24h",
                issuer: "Integrated billers",
                audience: userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    //return reject(err);
                    return reject(createError.InternalServerError());
                }

                resolve(token);
            });
        });
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "Integrated billers",
                audience: userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    //return reject(err);
                    return reject(createError.InternalServerError());
                }

                resolve(token);
            });
        });
    },
};
