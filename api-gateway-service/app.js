const express = require("express");
const httpProxy = require("http-proxy");
// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const dotenv = require("dotenv");
var cors = require('cors');
const createError = require("http-errors");
dotenv.config();
const devConfig = require("./config/dev");
const prodConfig = require("./config/prod");
const swagger = require("./swagger/swagger.js");
const { devInfoLogger, devErrorLogger } = require("./logger/devLogger.js");
const { prodInfoLogger, prodErrorLogger } = require("./logger/prodLogger.js");
const Logger = require("./logger/prodLogger.js");
const errorHandler = require("./middleware/errorHandler.js");
//const { configureJwtStrategy } = require("./jwt/passportAuth");

const environment = process.env.NODE_ENV || "dev";
const config = environment === "prod" ? prodConfig : devConfig;
const infoLogger = environment === "prod" ? prodInfoLogger : devInfoLogger;
const errorLogger = environment === "prod" ? prodErrorLogger : devErrorLogger;

const port = process.env.PORT || config.PORT;
const mongodbUri = process.env.MONGODB_URI || config.MONGODB_URI;

const app = express();
const proxy = httpProxy.createProxyServer();
app.use(cors());
//passport.use(configureJwtStrategy());

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

//app.use(morgan("combined"));
//app.use(passport.initialize());
swagger(app);

app.use(infoLogger);
app.get("/api-gateway-service", async (req, res, next) => {
    res.send({
        code: 200,
        message: "This is test",
    });
});

app.get("/api-gateway-error", async (req, res, next) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.all("/api/*", apiLimiter, (req, res) => {
    // Route product requests to the Product Service
    //console.log(req);
    proxy.web(req, res, { target: "http://localhost:5000" });
});

// app.all(
//     "/project/*",
//     apiLimiter,
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         // Route product requests to the Product Service
//         proxy.web(req, res, { target: "http://project-service:3001" });
//     }
// );
// app.all(
//     "/project-2/*",
//     apiLimiter,
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         // Route product requests to the Product Service
//         proxy.web(req, res, { target: "http://project2-service:3002" });
//     }
// );
app.use(errorHandler);
app.use(errorLogger);
app.use(async (req, res, next) => {
    next(createError.NotFound("This route does not exist!"));
});
// Handle errors from the microservices
proxy.on("error", (err, req, res) => {
    res.status(500).send({ message: "Service unavailable" });
});

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
    console.log(`Swagger is running on http://localhost:${port}/api-docs`);
});
