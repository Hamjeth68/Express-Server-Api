"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentSchema = exports.GetAppointmentSchema = exports.AppointmentSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
// Extend Zod with OpenAPI
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.AppointmentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    date: zod_1.z.string(), // Assuming date is a string for simplicity
    time: zod_1.z.string(), // Assuming time is a string for simplicity
    build: zod_1.z.string(),
    whatToBuild: zod_1.z.string(),
    website: zod_1.z.string().url(),
    contactNumber: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Define the GetAppointment schema using Zod
exports.GetAppointmentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    date: zod_1.z.string(), // Assuming date is a string for simplicity
    time: zod_1.z.string(), // Assuming time is a string for simplicity
    build: zod_1.z.string(),
    whatToBuild: zod_1.z.string(),
    website: zod_1.z.string().url(),
    contactNumber: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Define the CreateAppointment schema using Zod
exports.CreateAppointmentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    date: zod_1.z.string(), // Assuming date is a string for simplicity
    time: zod_1.z.string(), // Assuming time is a string for simplicity
    build: zod_1.z.string(),
    whatToBuild: zod_1.z.string(),
    website: zod_1.z.string().url(),
    contactNumber: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
