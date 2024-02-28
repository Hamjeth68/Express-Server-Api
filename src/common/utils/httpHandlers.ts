import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";

import {
  ResponseStatus,
  ServiceResponse,
} from "@common/models/serviceResponse";

/**
 * Helper function to send a ServiceResponse to the client.
 * @param serviceResponse ServiceResponse to send to client.
 * @param response Express response to modify.
 */
export const sendServiceResponse = (
  serviceResponse: ServiceResponse<unknown>,
  response: Response,
) => {
  response.status(serviceResponse.statusCode).json(serviceResponse);
};

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
      const statusCode = StatusCodes.BAD_REQUEST;
      res
        .status(statusCode)
        .send(
          new ServiceResponse<null>(
            ResponseStatus.Failed,
            errorMessage,
            null,
            statusCode,
          ),
        );
    }
  };
