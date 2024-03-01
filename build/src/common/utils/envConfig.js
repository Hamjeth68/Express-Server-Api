"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = exports.getCorsOrigin = exports.getNodeEnv = exports.getPort = void 0;
const getPort = () => getEnvVar("PORT", "number");
exports.getPort = getPort;
const getNodeEnv = () => getEnvVar("NODE_ENV", "string");
exports.getNodeEnv = getNodeEnv;
const getCorsOrigin = () => getEnvVar("CORS_ORIGIN", "string");
exports.getCorsOrigin = getCorsOrigin;
/**
 * Retrieves the value of the specified environment variable and performs type checking before returning it.
 *
 * @param {string} key - The name of the environment variable to retrieve.
 * @param {"string" | "number" | "boolean" | "array" } type - The expected type of the environment variable value.
 * @return {T} The value of the environment variable, with the expected type.
 */
function getEnvVar(key, type) {
    const value = process.env[key];
    if (value == null) {
        throw new Error(`Unknown process.env.${key}: ${value}. Is your .env file setup?`);
    }
    if (type === "number") {
        const numValue = parseInt(value);
        if (Number.isNaN(numValue)) {
            throw new Error(`process.env.${key} must be a number. Got ${value}`);
        }
        return numValue;
    }
    if (type === "boolean") {
        const boolValue = value === "true";
        if (boolValue !== true && boolValue !== false) {
            throw new Error(`process.env.${key} must be a boolean. Got ${value}`);
        }
        return boolValue;
    }
    if (type === "array") {
        const arrayValue = value.split(",");
        if (!Array.isArray(arrayValue)) {
            throw new Error(`process.env.${key} must be an array. Got ${value}`);
        }
        return arrayValue;
    }
    return value;
}
exports.getEnvVar = getEnvVar;
