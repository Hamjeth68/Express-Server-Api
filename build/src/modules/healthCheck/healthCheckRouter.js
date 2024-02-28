"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckRouter = exports.healthCheckRegistry = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const openAPIResponseBuilders_1 = require("@api-docs/openAPIResponseBuilders");
const serviceResponse_1 = require("@common/models/serviceResponse");
const httpHandlers_1 = require("@common/utils/httpHandlers");
exports.healthCheckRegistry = new zod_to_openapi_1.OpenAPIRegistry();
exports.healthCheckRouter = (() => {
    const router = express_1.default.Router();
    exports.healthCheckRegistry.registerPath({
        method: 'get',
        path: '/health-check',
        tags: ['Health Check'],
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(zod_1.z.null(), 'Success'),
    });
    router.get('/', (_req, res) => {
        const serviceResponse = new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, 'Service is healthy', null, http_status_codes_1.StatusCodes.OK);
        (0, httpHandlers_1.sendServiceResponse)(serviceResponse, res);
    });
    return router;
})();
