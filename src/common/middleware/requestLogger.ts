import { randomUUID } from "crypto";
import { Request, RequestHandler, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { LevelWithSilent } from "pino";
import { CustomAttributeKeys, Options, pinoHttp } from "pino-http";

import { getNodeEnv } from "@common/utils/envConfig";

type PinoCustomProps = {
  request: Request;
  response: Response;
  err: Error;
  responseBody: unknown;
};

/**
 * Generates a request logger middleware with the given options.
 *
 * @param {Options} options - optional options for the request logger
 * @return {RequestHandler[]} an array of request handler middleware
 */
const requestLogger = (options?: Options): RequestHandler[] => {
  const pinoOptions: Options = {
    customProps: customProps as unknown as Options["customProps"],
    redact: ["request.headers", "response.headers"],
    genReqId,
    customLogLevel,
    customSuccessMessage,
    customReceivedMessage: (req) => `request received: ${req.method}`,
    customErrorMessage: (_req, res) =>
      `request errored with status code: ${res.statusCode}`,
    customAttributeKeys,
    ...options,
  };
  return [responseBodyMiddleware, pinoHttp(pinoOptions)];
};

const customAttributeKeys: CustomAttributeKeys = {
  req: "request",
  res: "response",
  err: "error",
  responseTime: "timeTaken",
};

/**
 * Creates and returns custom properties for logging.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {PinoCustomProps} the custom properties for logging
 */
const customProps = (req: Request, res: Response): PinoCustomProps => ({
  request: req,
  response: res,
  err: res.locals.err,
  responseBody: res.locals.responseBody,
});

/**
 * Middleware to store the response body in locals if the environment is not production.
 *
 * @param {_req} - The request object
 * @param {res} - The response object
 * @param {next} - The next function to be called
 */
const responseBodyMiddleware: RequestHandler = (_req, res, next) => {
  const env = getNodeEnv() !== "production";
  if (env) {
    const originalSend = res.send;
    res.send = function (content) {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};

/**
 * Returns the appropriate log level based on the response status code and error.
 *
 * @param {IncomingMessage} _req - the request object
 * @param {ServerResponse<IncomingMessage>} res - the response object
 * @param {Error} [err] - an optional error object
 * @return {LevelWithSilent} the log level
 */
const customLogLevel = (
  _req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  err?: Error,
): LevelWithSilent => {
  if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
  if (res.statusCode >= 500 || err) return "error";
  if (res.statusCode >= 300 && res.statusCode < 400) return "silent";
  return "info";
};

/**
 * Function to generate a custom success message based on the request and response.
 *
 * @param {IncomingMessage} req - the incoming message object
 * @param {ServerResponse<IncomingMessage>} res - the server response object
 * @return {string} the custom success message based on the conditions
 */
const customSuccessMessage = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): string => {
  if (res.statusCode === 404) return "resource not found";
  return `${req.method} completed`;
};

/**
 * Generates a unique request ID if not already present in the request object, and sets it in the response header if generated.
 *
 * @param {IncomingMessage} req - the incoming request object
 * @param {ServerResponse<IncomingMessage>} res - the server response object
 * @return {string} the generated or existing request ID
 */
const genReqId = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const existingID = req.id ?? req.headers["x-request-id"];
  if (existingID) return existingID;
  const id = randomUUID();
  res.setHeader("X-Request-Id", id);
  return id;
};

export default requestLogger;
