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
const { configureJwtStrategy } = require("./jwt/passportAuth");

const environment = process.env.NODE_ENV || "dev";
const config = environment === "prod" ? prodConfig : devConfig;

const port = process.env.PORT || config.PORT;
const mongodbUri = process.env.MONGODB_URI || config.MONGODB_URI;

const app = express();
const proxy = httpProxy.createProxyServer();
passport.use(await configureJwtStrategy());

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(morgan("combined"));
app.use(passport.initialize());

app.all(
    "/project/*",
    apiLimiter,
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Route product requests to the Product Service
        proxy.web(req, res, { target: "http://project-service:3001" });
    }
);
app.all(
    "/project-2/*",
    apiLimiter,
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Route product requests to the Product Service
        proxy.web(req, res, { target: "http://project2-service:3002" });
    }
);

// Handle errors from the microservices
proxy.on("error", (err, req, res) => {
    console.error(err);
    res.status(500).send("Service unavailable");
});

app.listen(port, () => {
    console.log(`API Gateway is running on port ${port}`);
});
