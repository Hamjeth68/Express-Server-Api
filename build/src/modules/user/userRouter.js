import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { z } from "zod";
import { createApiResponse } from "@api-docs/openAPIResponseBuilders";
import { sendServiceResponse, validateRequest, } from "@common/utils/httpHandlers";
import { userService } from "@modules/user/userService";
import { GetUserSchema, UserSchema } from "./userModel";
export const userRegistry = new OpenAPIRegistry();
userRegistry.register("User", UserSchema);
export const userRouter = (() => {
    const router = express.Router();
    userRegistry.registerPath({
        method: "get",
        path: "/users",
        tags: ["User"],
        responses: createApiResponse(z.array(UserSchema), "Success"),
    });
    router.get("/", async (_req, res) => {
        const serviceResponse = await userService.findAll();
        sendServiceResponse(serviceResponse, res);
    });
    userRegistry.registerPath({
        method: "get",
        path: "/users/{id}",
        tags: ["User"],
        request: { params: GetUserSchema.shape.params },
        responses: createApiResponse(UserSchema, "Success"),
    });
    router.get("/:id", validateRequest(GetUserSchema), async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const serviceResponse = await userService.findById(id);
        sendServiceResponse(serviceResponse, res);
    });
    return router;
})();
