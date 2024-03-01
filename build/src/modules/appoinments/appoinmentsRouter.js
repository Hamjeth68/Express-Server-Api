"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = exports.appointmentRegistry = void 0;
const express_1 = __importDefault(require("express"));
const appoinmentsModel_1 = require("@modules/appoinments/appoinmentsModel");
const appoinmentsRepository_1 = require("@modules/appoinments/appoinmentsRepository");
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const openAPIResponseBuilders_1 = require("@api-docs/openAPIResponseBuilders");
const zod_1 = require("zod");
// Create a new OpenAPIRegistry instance
exports.appointmentRegistry = new zod_to_openapi_1.OpenAPIRegistry();
// Register the Appointment schema
exports.appointmentRegistry.register("Appointment", appoinmentsModel_1.AppointmentSchema);
// Initialize the appointment router
exports.appointmentRouter = (() => {
    const router = express_1.default.Router();
    // Register the GET /appointments endpoint
    exports.appointmentRegistry.registerPath({
        method: "get",
        path: "/appointments",
        tags: ["Appointments"],
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(zod_1.z.array(appoinmentsModel_1.AppointmentSchema), "Success"), // Assuming you have a createApiResponse function
    });
    // Define the GET /appointments endpoint
    router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appointments = yield appoinmentsRepository_1.appointmentRepository.findAllAsync();
            res.json(appointments);
        }
        catch (error) {
            console.error("Error retrieving appointments:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }));
    // Register the GET /appointments/:id endpoint
    exports.appointmentRegistry.registerPath({
        method: "get",
        path: "/appointments/{id}",
        tags: ["Appointments"],
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(appoinmentsModel_1.AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
    });
    // Define the GET /appointments/:id endpoint
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id || "", 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid appointment id" });
                return;
            }
            const appointment = yield appoinmentsRepository_1.appointmentRepository.findByIdAsync(id);
            if (!appointment) {
                res.status(404).json({ error: "Appointment not found" });
            }
            else {
                res.json(appointment);
            }
        }
        catch (error) {
            console.error("Error retrieving appointment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }));
    // Other endpoints (POST, PUT, DELETE) follow a similar pattern
    return router;
})();
