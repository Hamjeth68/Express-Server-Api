import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse, } from "@common/models/serviceResponse";
/**
 * Helper function to send a ServiceResponse to the client.
 * @param serviceResponse ServiceResponse to send to client.
 * @param response Express response to modify.
 */
export const sendServiceResponse = (serviceResponse, response) => {
    response.status(serviceResponse.statusCode).json(serviceResponse);
};
export const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body, query: req.query, params: req.params });
        next();
    }
    catch (err) {
        const errorMessage = `Invalid input: ${err.errors.map((e) => e.message).join(", ")}`;
        const statusCode = StatusCodes.BAD_REQUEST;
        res
            .status(statusCode)
            .send(new ServiceResponse(ResponseStatus.Failed, errorMessage, null, statusCode));
    }
};
