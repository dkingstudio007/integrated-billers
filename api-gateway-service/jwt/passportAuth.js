const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

const verifyUserFromToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, jwtSecret);
        const user = { id: decoded.sub };
        return user;
    } catch (err) {
        throw err;
    }
};

const configureJwtStrategy = async () => {
    return new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const user = await verifyUserFromToken(jwt_payload);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });
};

module.exports = { configureJwtStrategy };
