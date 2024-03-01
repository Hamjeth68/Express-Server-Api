import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Extend Zod with OpenAPI
extendZodWithOpenApi(z);

// Define the Appointment schema using Zod
export type Appointment = z.infer<typeof AppointmentSchema>;
export const AppointmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  date: z.string(), // Assuming date is a string for simplicity
  time: z.string(), // Assuming time is a string for simplicity
  build: z.string(),
  whatToBuild: z.string(),
  website: z.string().url(),
  contactNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Define the GetAppointment schema using Zod
export const GetAppointmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  date: z.string(), // Assuming date is a string for simplicity
  time: z.string(), // Assuming time is a string for simplicity
  build: z.string(),
  whatToBuild: z.string(),
  website: z.string().url(),
  contactNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Define the CreateAppointment schema using Zod
export const CreateAppointmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  date: z.string(), // Assuming date is a string for simplicity
  time: z.string(), // Assuming time is a string for simplicity
  build: z.string(),
  whatToBuild: z.string(),
  website: z.string().url(),
  contactNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
