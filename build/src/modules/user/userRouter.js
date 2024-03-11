"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.userRegistry = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const openAPIResponseBuilders_1 = require("@api-docs/openAPIResponseBuilders");
const httpHandlers_1 = require("@common/utils/httpHandlers");
const userService_1 = require("@modules/user/userService");
const userModel_1 = require("./userModel");
exports.userRegistry = new zod_to_openapi_1.OpenAPIRegistry();
exports.userRegistry.register("User", userModel_1.UserSchema);
exports.userRouter = (() => {
    const router = express_1.default.Router();
    exports.userRegistry.registerPath({
        method: "get",
        path: "/users",
        tags: ["User"],
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(zod_1.z.array(userModel_1.UserSchema), "Success"),
    });
    router.get("/", async (_req, res) => {
        const serviceResponse = await userService_1.userService.findAll();
        (0, httpHandlers_1.sendServiceResponse)(serviceResponse, res);
    });
    exports.userRegistry.registerPath({
        method: "get",
        path: "/users/{id}",
        tags: ["User"],
        request: { params: userModel_1.GetUserSchema.shape.params },
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(userModel_1.UserSchema, "Success"),
    });
    router.get("/:id", (0, httpHandlers_1.validateRequest)(userModel_1.GetUserSchema), async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const serviceResponse = await userService_1.userService.findById(id);
        (0, httpHandlers_1.sendServiceResponse)(serviceResponse, res);
    });
    return router;
})();
