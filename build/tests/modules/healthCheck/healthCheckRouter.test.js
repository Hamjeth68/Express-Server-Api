"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("@src/server");
describe("Health Check API endpoints", () => {
    it("GET / - success", async () => {
        const response = await (0, supertest_1.default)(server_1.app).get("/health-check");
        const result = response.body;
        expect(response.statusCode).toEqual(200);
        expect(result.success).toBeTruthy();
        expect(result.responseObject).toBeNull();
        expect(result.message).toEqual("Service is healthy");
    });
});
