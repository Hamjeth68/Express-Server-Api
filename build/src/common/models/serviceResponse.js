import { z } from "zod";
export var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 0] = "Success";
    ResponseStatus[ResponseStatus["Failed"] = 1] = "Failed";
})(ResponseStatus || (ResponseStatus = {}));
export class ServiceResponse {
    /**
     * Constructor for creating a new Response object.
     *
     * @param {ResponseStatus} status - the status of the response
     * @param {string} message - the message of the response
     * @param {T} responseObject - the response object
     * @param {number} statusCode - the status code of the response
     */
    constructor(status, message, responseObject, statusCode) {
        this.success = status === ResponseStatus.Success;
        this.message = message;
        this.responseObject = responseObject;
        this.statusCode = statusCode;
    }
}
/**
 * Create a service response schema based on the provided data schema.
 *
 * @param {T} dataSchema - The data schema to build the response schema from
 * @return {z.ZodObject} The service response schema
 */
export const ServiceResponseSchema = (dataSchema) => z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
});
