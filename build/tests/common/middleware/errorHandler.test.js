"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const errorHandler_1 = __importDefault(require("@common/middleware/errorHandler"));
describe("Error Handler Middleware", () => {
    const app = (0, express_1.default)();
    // Setup a route that throws an error
    app.get("/error", () => {
        throw new Error("Test error");
    });
    // Use your error handler middleware
    app.use((0, errorHandler_1.default)());
    it("should return 404 for unknown routes", async () => {
        const response = await (0, supertest_1.default)(app).get("/unknown");
        expect(response.status).toBe(http_status_codes_1.StatusCodes.NOT_FOUND);
    });
    it("should handle thrown errors with 500 status code", async () => {
        const response = await (0, supertest_1.default)(app).get("/error");
        expect(response.status).toBe(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    });
});
