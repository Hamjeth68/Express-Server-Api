"use strict";
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
const httpHandlers_1 = require("@common/utils/httpHandlers");
const appoinmentsService_1 = require("./appoinmentsService");
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
    router.get("/", async (_req, res) => {
        try {
            (0, httpHandlers_1.validateRequest)(appoinmentsModel_1.GetAppointmentSchema);
            const appointments = await appoinmentsService_1.appointmentService.findAll();
            (0, httpHandlers_1.sendServiceResponse)(appointments, res);
            res.json(appointments);
        }
        catch (error) {
            console.error("Error retrieving appointments:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    // Register the GET /appointments/:id endpoint
    exports.appointmentRegistry.registerPath({
        method: "get",
        path: "/appointments/{id}",
        tags: ["Appointments"],
        request: { params: appoinmentsModel_1.GetAppointmentSchema.shape.params },
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(appoinmentsModel_1.AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
    });
    // Define the GET /appointments/:id endpoint
    router.get("/:id", async (req, res) => {
        try {
            (0, httpHandlers_1.validateRequest)(appoinmentsModel_1.GetAppointmentSchema);
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid appointment id" });
                return;
            }
            const appointment = await appoinmentsService_1.appointmentService.findById(id);
            (0, httpHandlers_1.sendServiceResponse)(appointment, res);
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
    });
    // Register the POST /appointments endpoint
    exports.appointmentRegistry.registerPath({
        method: "post",
        path: "/post-appointments",
        tags: ["Appointments"],
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(appoinmentsModel_1.AppointmentSchema, "Success"),
        request: {
            params: appoinmentsModel_1.AppointmentRequestBodySchema.shape.params,
        },
    });
    // Define the POST /appointments endpoint
    router.post("/", async (req, res) => {
        try {
            const appointment = req.body;
            const createdAppointment = await appoinmentsRepository_1.appointmentRepository.create(appointment);
            res.status(201).json(createdAppointment);
        }
        catch (error) {
            console.error("Error creating appointment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    // Register the PUT /appointments/:id endpoint
    exports.appointmentRegistry.registerPath({
        method: "put",
        path: "/appointments/{id}",
        tags: ["Appointments"],
        request: { params: appoinmentsModel_1.GetAppointmentSchema.shape.params },
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(appoinmentsModel_1.AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
    });
    // Define the PUT /appointments/:id endpoint
    router.put("/:id", async (req, res) => {
        try {
            (0, httpHandlers_1.validateRequest)(appoinmentsModel_1.AppointmentSchema);
            const id = parseInt(req.params.id || "", 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid appointment id" });
                return;
            }
            const appointment = req.body;
            const updatedAppointment = await appoinmentsService_1.appointmentService.update(id, appointment);
            (0, httpHandlers_1.sendServiceResponse)(appointment, res);
            res.json(updatedAppointment);
        }
        catch (error) {
            console.error("Error updating appointment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    // Register the DELETE /appointments/:id endpoint
    exports.appointmentRegistry.registerPath({
        method: "delete",
        path: "/appointments/{id}",
        tags: ["Appointments"],
        request: { params: appoinmentsModel_1.GetAppointmentSchema.shape.params },
        responses: (0, openAPIResponseBuilders_1.createApiResponse)(appoinmentsModel_1.AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
    });
    // Define the DELETE /appointments/:id endpoint
    router.delete("/:id", async (req, res) => {
        try {
            (0, httpHandlers_1.validateRequest)(appoinmentsModel_1.GetAppointmentSchema);
            const id = parseInt(req.params.id || "", 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid appointment id" });
                return;
            }
            const deletedAppointment = await appoinmentsService_1.appointmentService.delete(id);
            (0, httpHandlers_1.sendServiceResponse)(deletedAppointment, res);
            res.json(deletedAppointment);
        }
        catch (error) {
            console.error("Error deleting appointment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
})();
