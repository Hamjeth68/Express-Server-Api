import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
//import { appointmentRegistry } from "@modules/appoinments/appoinmentsRouter";

import { healthCheckRegistry } from "@modules/healthCheck/healthCheckRouter";
import { userRegistry } from "@modules/user/userRouter";

/**
 * Generate an OpenAPI document using the provided registry and return it.
 *
 * @return {object} the generated OpenAPI document
 */
export function generateOpenAPIDocument(): object {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    // appointmentRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

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
