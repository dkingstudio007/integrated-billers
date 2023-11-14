const { transports, format, createLogger } = require("winston");
const expressWinston = require("express-winston");

// const logger = createLogger({
//     level: "info",
//     format: format.combine(
//         format.json(),
//         format.timestamp(),
//         format.prettyPrint(),
//         format.metadata()
//     ),
//     statusLevels: true,
//     defaultMeta: { service: "api-gateway-service" },
//     transports: [
//         //
//         // - Write all logs with importance level of `error` or less to `error.log`
//         // - Write all logs with importance level of `info` or less to `combined.log`
//         //
//         new transports.File({ filename: "error.log", level: "error" }),
//         new transports.File({ filename: "combined.log" }),
//         new transports.Console(),
//     ],
// });

const prodInfoLogger = expressWinston.logger({
    level: "info",
    defaultMeta: { service: "api-gateway-service" },
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/combined.log" }),
        new transports.MongoDB({
            db: process.env.MONGODB_DEV_URI,
            options: {
                useUnifiedTopology: true,
            },
            collection: "logs",
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint(),
        format.metadata()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
        return false;
    },
});

const prodErrorLogger = expressWinston.errorLogger({
    level: "error",
    defaultMeta: { service: "api-gateway-service" },
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log" }),
        new transports.MongoDB({
            db: process.env.MONGODB_DEV_URI,
            options: {
                useUnifiedTopology: true,
            },
            collection: "logs",
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint(),
        format.metadata()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
        return false;
    },
});

module.exports = { prodInfoLogger, prodErrorLogger };
