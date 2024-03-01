import { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Handles unexpected requests by sending a 404 Not Found status code.
 *
 * @param {_req} - the request object
 * @param {res} - the response object
 * @return {void}
 */
const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

/**
 * Adds the error to the request log and calls the next middleware with the error.
 *
 * @param {Error} err - The error to be added to the request log
 * @param {Request} _req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function in the middleware chain
 * @return {void}
 */
const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

/**
 * Error request handler for handling default errors.
 *
 * @param {Error} _err - the error object
 * @param {Request} _req - the request object
 * @param {Response} res - the response object
 * @return {void} no return value
 */
const defaultErrorRequestHandler: ErrorRequestHandler = (_err, _req, res) => {
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export default () => [
  unexpectedRequest,
  addErrorToRequestLog,
  defaultErrorRequestHandler,
];
