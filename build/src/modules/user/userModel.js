"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSchema = exports.UserSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
const commonValidation_1 = require("@common/utils/commonValidation");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    age: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Input Validation for 'GET users/:id' endpoint
exports.GetUserSchema = zod_1.z.object({
    params: zod_1.z.object({ id: commonValidation_1.commonValidations.id }),
});
