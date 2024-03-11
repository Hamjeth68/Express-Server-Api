import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { commonValidations } from "@common/utils/commonValidation";
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
  params: z.object({ id: commonValidations.id }),
});

// Define the CreateAppointment schema using Zod
export const CreateAppointmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  date: z.string(),
  time: z.string(),
  build: z.string(),
  whatToBuild: z.string(),
  website: z.string().url(),
  contactNumber: z.string(),
}).transform((data) => ({
  ...data,
  createdAt: new Date(), // Automatically generate createdAt
  updatedAt: new Date(), // Automatically generate updatedAt
}));



export const AppointmentRequestBodySchema = z.object({
  params: z.object({ id: commonValidations.id,
  name: z.string(),
  email: z.string().email(),
  date: z.string(),
  time: z.string(),
  build: z.string(),
  whatToBuild: z.string(),
  website: z.string().url(),
  contactNumber: z.string(),
}),
});