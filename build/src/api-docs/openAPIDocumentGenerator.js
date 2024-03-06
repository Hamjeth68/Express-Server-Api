"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenAPIDocument = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const appoinmentsRouter_1 = require("@modules/appoinments/appoinmentsRouter");
const healthCheckRouter_1 = require("@modules/healthCheck/healthCheckRouter");
const userRouter_1 = require("@modules/user/userRouter");
/**
 * Generate an OpenAPI document using the provided registry and return it.
 *
 * @return {object} the generated OpenAPI document
 */
function generateOpenAPIDocument() {
    const registry = new zod_to_openapi_1.OpenAPIRegistry([healthCheckRouter_1.healthCheckRegistry, userRouter_1.userRegistry, appoinmentsRouter_1.appointmentRegistry]);
    const generator = new zod_to_openapi_1.OpenApiGeneratorV31(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Swagger API",
        },
        externalDocs: {
            description: "View the raw OpenAPI Specification in JSON format",
            url: "/swagger.json",
        },
    });
}
exports.generateOpenAPIDocument = generateOpenAPIDocument;
