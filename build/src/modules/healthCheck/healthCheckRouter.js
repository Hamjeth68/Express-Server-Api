import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { createApiResponse } from "@api-docs/openAPIResponseBuilders";
import { ResponseStatus, ServiceResponse, } from "@common/models/serviceResponse";
import { sendServiceResponse } from "@common/utils/httpHandlers";
export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter = (() => {
    const router = express.Router();
    healthCheckRegistry.registerPath({
        method: "get",
        path: "/health-check",
        tags: ["Health Check"],
        responses: createApiResponse(z.null(), "Success"),
    });
    router.get("/", (_req, res) => {
        const serviceResponse = new ServiceResponse(ResponseStatus.Success, "Service is healthy", null, StatusCodes.OK);
        sendServiceResponse(serviceResponse, res);
    });
    return router;
})();
