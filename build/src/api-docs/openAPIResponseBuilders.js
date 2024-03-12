import { StatusCodes } from "http-status-codes";
import { ServiceResponseSchema } from "@common/models/serviceResponse";
/**
 * Creates an API response object based on the provided schema, description, and status code.
 *
 * @param {z.ZodTypeAny} schema - The schema for the API response.
 * @param {string} description - The description of the API response.
 * @param {number} statusCode - The status code for the API response (default is StatusCodes.OK).
 * @return {object} The API response object.
 */
export function createApiResponse(schema, description, statusCode = StatusCodes.OK) {
    return {
        [statusCode]: {
            description,
            content: {
                "application/json": {
                    schema: ServiceResponseSchema(schema),
                },
            },
        },
    };
}
export function createApiResponses(configs) {
    const responses = {};
    configs.forEach(({ schema, description, statusCode }) => {
        responses[statusCode] = {
            description,
            content: {
                "application/json": {
                    schema: ServiceResponseSchema(schema),
                },
            },
        };
    });
    return responses;
}
