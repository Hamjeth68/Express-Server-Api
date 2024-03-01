import express, { Request, Response, Router } from "express";
import {  AppointmentSchema } from "@modules/appoinments/appoinmentsModel";
import { appointmentRepository } from "@modules/appoinments/appoinmentsRepository";



import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiResponse } from "@api-docs/openAPIResponseBuilders";
import { z } from "zod";


// Create a new OpenAPIRegistry instance
export const appointmentRegistry = new OpenAPIRegistry();

// Register the Appointment schema
appointmentRegistry.register("Appointment", AppointmentSchema);

// Initialize the appointment router
export const appointmentRouter: Router = (() => {
  const router = express.Router();

  // Register the GET /appointments endpoint
  appointmentRegistry.registerPath({
    method: "get",
    path: "/appointments",
    tags: ["Appointments"],
    responses: createApiResponse(z.array(AppointmentSchema), "Success"), // Assuming you have a createApiResponse function
  });

  // Define the GET /appointments endpoint
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const appointments = await appointmentRepository.findAllAsync();
      res.json(appointments);
      
    } catch (error) {
      console.error("Error retrieving appointments:", error);
      res.status(500).json({ error: "Internal Server Error" });
     
    }
  });

  // Register the GET /appointments/:id endpoint
  appointmentRegistry.registerPath({
    method: "get",
    path: "/appointments/{id}",
    tags: ["Appointments"],
    responses: createApiResponse(AppointmentSchema, "Success"), // Assuming you have a createApiResponse function
  });

  // Define the GET /appointments/:id endpoint
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id || "", 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment id" });
        return;
      }
      const appointment = await appointmentRepository.findByIdAsync(id);
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
      } else {
        res.json(appointment);
      }
    } catch (error) {
      console.error("Error retrieving appointment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
  // Other endpoints (POST, PUT, DELETE) follow a similar pattern

  return router;
})();
