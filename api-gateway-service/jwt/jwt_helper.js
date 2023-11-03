const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
            const jwtOptions = {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: jwtSecret,
                expiresIn: "24h",
                issuer: "CPL",
                audience: userId,
            };

            

            // const options = {
            //     expiresIn: "24h",
            //     issuer: "CPL",
            //     audience: userId,
            // };

            // JWT.sign(payload, secret, options, (err, token) => {
            //     if (err) {
            //         console.log(err.message);
            //         //return reject(err);
            //         return reject(createError.InternalServerError());
            //     }

            //     resolve(token);
            // });
        });
    },
};
