import express from "express";
import swaggerUi from "swagger-ui-express";
import { generateOpenAPIDocument } from "./openAPIDocumentGenerator";
/**
 * Creates and returns a router for the OpenAPI documentation
 * @returns {Router} The router for the OpenAPI documentation
 */
export const openAPIRouter = (() => {
    const router = express.Router();
    const openAPIDocument = generateOpenAPIDocument();
    /**
     * Endpoint to serve the OpenAPI JSON document
     */
    router.get("/swagger.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(openAPIDocument);
    });
    /**
     * Endpoint to serve the Swagger UI
     */
    router.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
    return router;
})();
