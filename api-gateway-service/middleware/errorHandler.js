const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        success: false,
        error: err.message || "Server Error",
        stack: process.env.NODE_ENV === "prod" ? undefined : err.stack,
    });
};

module.exports = errorHandler;
