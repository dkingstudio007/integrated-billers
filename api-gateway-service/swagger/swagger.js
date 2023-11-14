const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "My REST API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["../app.js"],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
