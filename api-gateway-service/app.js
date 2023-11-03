const express = require("express");
const httpProxy = require("http-proxy");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const devConfig = require("./config/dev");
const prodConfig = require("./config/prod");

const environment = process.env.NODE_ENV || "dev";
const config = environment === "prod" ? prodConfig : devConfig;

const port = process.env.PORT || config.PORT;
const mongodbUri = process.env.MONGODB_URI || config.MONGODB_URI;

const app = express();

const proxy = httpProxy.createProxyServer();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

// Define JWT authentication strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};
passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        // Here, you would typically verify the JWT payload and user in your user database.
        // For simplicity, we'll just assume the token is valid.
        return done(null, { id: jwt_payload.sub });
    })
);

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

// Logging middleware using Morgan
app.use(morgan("combined"));

// Authentication middleware
app.use(passport.initialize());

app.listen(port, () => {
    console.log(`API Gateway is running on port ${port}`);
});
