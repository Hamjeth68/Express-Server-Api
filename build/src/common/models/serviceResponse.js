"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponseSchema = exports.ServiceResponse = exports.ResponseStatus = void 0;
const zod_1 = require("zod");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 0] = "Success";
    ResponseStatus[ResponseStatus["Failed"] = 1] = "Failed";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
class ServiceResponse {
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
exports.ServiceResponse = ServiceResponse;
/**
 * Create a service response schema based on the provided data schema.
 *
 * @param {T} dataSchema - The data schema to build the response schema from
 * @return {z.ZodObject} The service response schema
 */
const ServiceResponseSchema = (dataSchema) => zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string(),
    responseObject: dataSchema.optional(),
    statusCode: zod_1.z.number(),
});
exports.ServiceResponseSchema = ServiceResponseSchema;
