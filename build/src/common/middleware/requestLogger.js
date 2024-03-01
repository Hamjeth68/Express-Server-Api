"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const pino_http_1 = require("pino-http");
const envConfig_1 = require("@common/utils/envConfig");
/**
 * Generates a request logger middleware with the given options.
 *
 * @param {Options} options - optional options for the request logger
 * @return {RequestHandler[]} an array of request handler middleware
 */
const requestLogger = (options) => {
    const pinoOptions = Object.assign({ customProps: customProps, redact: ["request.headers", "response.headers"], genReqId,
        customLogLevel,
        customSuccessMessage, customReceivedMessage: (req) => `request received: ${req.method}`, customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`, customAttributeKeys }, options);
    return [responseBodyMiddleware, (0, pino_http_1.pinoHttp)(pinoOptions)];
};
const customAttributeKeys = {
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
const customProps = (req, res) => ({
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
const responseBodyMiddleware = (_req, res, next) => {
    const env = (0, envConfig_1.getNodeEnv)() !== "production";
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
const customLogLevel = (_req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500)
        return "warn";
    if (res.statusCode >= 500 || err)
        return "error";
    if (res.statusCode >= 300 && res.statusCode < 400)
        return "silent";
    return "info";
};
/**
 * Function to generate a custom success message based on the request and response.
 *
 * @param {IncomingMessage} req - the incoming message object
 * @param {ServerResponse<IncomingMessage>} res - the server response object
 * @return {string} the custom success message based on the conditions
 */
const customSuccessMessage = (req, res) => {
    if (res.statusCode === 404)
        return "resource not found";
    return `${req.method} completed`;
};
/**
 * Generates a unique request ID if not already present in the request object, and sets it in the response header if generated.
 *
 * @param {IncomingMessage} req - the incoming request object
 * @param {ServerResponse<IncomingMessage>} res - the server response object
 * @return {string} the generated or existing request ID
 */
const genReqId = (req, res) => {
    var _a;
    const existingID = (_a = req.id) !== null && _a !== void 0 ? _a : req.headers["x-request-id"];
    if (existingID)
        return existingID;
    const id = (0, crypto_1.randomUUID)();
    res.setHeader("X-Request-Id", id);
    return id;
};
exports.default = requestLogger;
