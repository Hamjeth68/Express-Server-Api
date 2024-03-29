"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.sendServiceResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const serviceResponse_1 = require("@common/models/serviceResponse");
/**
 * Helper function to send a ServiceResponse to the client.
 * @param serviceResponse ServiceResponse to send to client.
 * @param response Express response to modify.
 */
const sendServiceResponse = (serviceResponse, response) => {
    response.status(serviceResponse.statusCode).json(serviceResponse);
};
exports.sendServiceResponse = sendServiceResponse;
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body, query: req.query, params: req.params });
        next();
    }
    catch (err) {
        const errorMessage = `Invalid input: ${err.errors.map((e) => e.message).join(", ")}`;
        const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        res
            .status(statusCode)
            .send(new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, statusCode));
    }
};
exports.validateRequest = validateRequest;
