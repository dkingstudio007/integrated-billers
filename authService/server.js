const express = require("express");
const dotenv = require("dotenv");
const createError = require("http-errors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminRoleRoutes = require("./routes/adminRoleRoutes");
const adminRoleSettingsRoutes = require("./routes/adminRoleSettingsRoutes");
const functionListRoutes = require("./routes/functionListRoutes");
const swagger = require("./swagger/swagger");
const moduleOrServiceRoutes = require("./routes/moduleOrServiceRoutes");
const apiServiceRoutes = require("./routes/apiServiceRoutes");
const packageRoutes = require("./routes/packageRoutes");
const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/admin-role", adminRoleRoutes);
app.use("/api/admin-role-settings", adminRoleSettingsRoutes);
app.use("/api/admin/function-list", functionListRoutes);
app.use("/api/admin/service", moduleOrServiceRoutes);
app.use("/api/admin/api-service", apiServiceRoutes);
app.use("/api/admin/package", packageRoutes);
app.use("/api/user", userRoutes);

app.get("/api/auth", async (req, res, next) => {
    res.send({
        code: 200,
        message: "This is auth service",
    });
});

app.get("/api/b", async (req, res, next) => {
    res.send({
        code: 200,
        message: "This is auth service b",
    });
});

app.use(async (req, res, next) => {
    next(createError.NotFound("This route does not exist!"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});
swagger(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    console.log(`Swagger is running on http://localhost:${PORT}/api-docs`);
});
