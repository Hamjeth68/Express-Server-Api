"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const pino_1 = require("pino");
const openAPIRouter_1 = require("@api-docs/openAPIRouter");
const errorHandler_1 = __importDefault(require("@common/middleware/errorHandler"));
const rateLimiter_1 = __importDefault(require("@common/middleware/rateLimiter"));
const requestLogger_1 = __importDefault(require("@common/middleware/requestLogger"));
const envConfig_1 = require("@common/utils/envConfig");
const healthCheckRouter_1 = require("@modules/healthCheck/healthCheckRouter");
const userRouter_1 = require("@modules/user/userRouter");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
const logger = (0, pino_1.pino)({ name: 'server start' });
exports.logger = logger;
const app = (0, express_1.default)();
exports.app = app;
const corsOrigin = (0, envConfig_1.getCorsOrigin)();
// Middlewares
app.use((0, cors_1.default)({ origin: [corsOrigin], credentials: true }));
app.use((0, helmet_1.default)());
app.use(rateLimiter_1.default);
// Request logging
app.use((0, requestLogger_1.default)());
// Routes
app.use('/health-check', healthCheckRouter_1.healthCheckRouter);
app.use('/users', userRouter_1.userRouter);
// Swagger UI
app.use(openAPIRouter_1.openAPIRouter);
// Error handlers
app.use((0, errorHandler_1.default)());
