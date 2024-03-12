// import express, { Request, Response, Router } from "express";
// import {
//   AppointmentRequestBodySchema,
//   AppointmentSchema,
//   GetAppointmentSchema,
// } from "@modules/appoinments/appoinmentsModel";
// import { appointmentRepository } from "@modules/appoinments/appoinmentsRepository";

// import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// import { createApiResponse } from "@api-docs/openAPIResponseBuilders";
// import { z } from "zod";

// import {
//   sendServiceResponse,
//   validateRequest,
// } from "@common/utils/httpHandlers";

// import { appointmentService } from "./appoinmentsService";

// // Create a new OpenAPIRegistry instance
// export const appointmentRegistry = new OpenAPIRegistry();

// // Register the Appointment schema
// appointmentRegistry.register("Appointment", AppointmentSchema);

// // Initialize the appointment router
// export const appointmentRouter: Router = (() => {
//   const router = express.Router();

//   // Register the GET /appointments endpoint
//   appointmentRegistry.registerPath({
//     method: "get",
//     path: "/appointments",
//     tags: ["Appointments"],
//     responses: createApiResponse(z.array(AppointmentSchema), "Success"), // Assuming you have a createApiResponse function
//   });

//   // Define the GET /appointments endpoint
//   router.get("/", async (_req: Request, res: Response) => {
//     try {
//       validateRequest(GetAppointmentSchema);
//       const appointments = await appointmentService.findAll();
//       sendServiceResponse(appointments, res);
//       res.json(appointments);
//     } catch (error) {
//       console.error("Error retrieving appointments:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Register the GET /appointments/:id endpoint
//   appointmentRegistry.registerPath({
//     method: "get",
//     path: "/appointments/{id}",
//     tags: ["Appointments"],
//     request: { params: GetAppointmentSchema.shape.params },
//     responses: createApiResponse(AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
//   });

//   // Define the GET /appointments/:id endpoint
//   router.get("/:id", async (req: Request, res: Response) => {
//     try {
//       validateRequest(GetAppointmentSchema);
//       const id = parseInt(req.params.id as string, 10);
//       if (isNaN(id)) {
//         res.status(400).json({ error: "Invalid appointment id" });
//         return;
//       }
//       const appointment = await appointmentService.findById(id);
//       sendServiceResponse(appointment, res);

//       if (!appointment) {
//         res.status(404).json({ error: "Appointment not found" });
//       } else {
//         res.json(appointment);
//       }
//     } catch (error) {
//       console.error("Error retrieving appointment:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Register the POST /appointments endpoint
//   appointmentRegistry.registerPath({
//     method: "post",
//     path: "/appointments",
//     tags: ["Appointments"],
//     responses: createApiResponse(AppointmentSchema, "Success"),
//     request: {
//       params: AppointmentRequestBodySchema.shape.params,
//     },
//   });

//   // Define the POST /appointments endpoint
//   router.post("/", async (req: Request, res: Response) => {
//     try {
//       const appointment = req.body;
//       const createdAppointment =
//         await appointmentRepository.create(appointment);
//       res.status(201).json(createdAppointment);
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Register the PUT /appointments/:id endpoint

//   appointmentRegistry.registerPath({
//     method: "put",
//     path: "/appointments/{id}",
//     tags: ["Appointments"],
//     request: { params: GetAppointmentSchema.shape.params },
//     responses: createApiResponse(AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
//   });

//   // Define the PUT /appointments/:id endpoint
//   router.put("/:id", async (req: Request, res: Response) => {
//     try {
//       validateRequest(AppointmentSchema);
//       const id = parseInt(req.params.id || "", 10);
//       if (isNaN(id)) {
//         res.status(400).json({ error: "Invalid appointment id" });
//         return;
//       }
//       const appointment = req.body;
//       const updatedAppointment = await appointmentService.update(
//         id,
//         appointment,
//       );
//       sendServiceResponse(appointment, res);
//       res.json(updatedAppointment);
//     } catch (error) {
//       console.error("Error updating appointment:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Register the DELETE /appointments/:id endpoint
//   appointmentRegistry.registerPath({
//     method: "delete",
//     path: "/appointments/{id}",
//     tags: ["Appointments"],
//     request: { params: GetAppointmentSchema.shape.params },
//     responses: createApiResponse(AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
//   });

//   // Define the DELETE /appointments/:id endpoint
//   router.delete("/:id", async (req: Request, res: Response) => {
//     try {
//       validateRequest(GetAppointmentSchema);
//       const id = parseInt(req.params.id || "", 10);
//       if (isNaN(id)) {
//         res.status(400).json({ error: "Invalid appointment id" });
//         return;
//       }
//       const deletedAppointment = await appointmentService.delete(id);
//       sendServiceResponse(deletedAppointment, res);
//       res.json(deletedAppointment);
//     } catch (error) {
//       console.error("Error deleting appointment:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   return router;
// })();
