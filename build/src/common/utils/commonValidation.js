"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidations = void 0;
const zod_1 = require("zod");
exports.commonValidations = {
    id: zod_1.z
        .string()
        .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
        .transform(Number)
        .refine((num) => num > 0, 'ID must be a positive number'),
    // ... other common validations
};
