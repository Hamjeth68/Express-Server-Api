// appointmentsService.ts

import { StatusCodes } from "http-status-codes";
import {
  ResponseStatus,
  ServiceResponse,
} from "@common/models/serviceResponse";
import { Appointment } from "@src/modules/appoinments/appoinmentsModel";
import { appointmentRepository } from "@src/modules/appoinments/appoinmentsRepository";
import { logger } from "@src/server";

// Define the appointment service object
export const appointmentService = {
  // Retrieves all appointments from the database
  findAll: async (): Promise<ServiceResponse<Appointment[]>> => {
    try {
      const appointments = await appointmentRepository.findAllAsync();
      if (!appointments || appointments.length === 0) {
        return new ServiceResponse<Appointment[]>(
          ResponseStatus.Failed,
          "No appointments found",
          [],
          StatusCodes.NOT_FOUND,
        );
      }
      return new ServiceResponse<Appointment[]>(
        ResponseStatus.Success,
        "Appointments found",
        appointments,
        StatusCodes.OK,
      );
    } catch (ex) {
      const errorMessage = `Error finding all appointments: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        [],
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },

  // Retrieves a single appointment by its ID
  findById: async (
    id: number,
  ): Promise<ServiceResponse<Appointment | null>> => {
    try {
      const appointment = await appointmentRepository.findByIdAsync(id);
      if (!appointment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Appointment not found",
          null,
          StatusCodes.NOT_FOUND,
        );
      }
      return new ServiceResponse<Appointment>(
        ResponseStatus.Success,
        "Appointment found",
        appointment,
        StatusCodes.OK,
      );
    } catch (ex) {
      const errorMessage = `Error finding appointment with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      throw new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },

  // Creates a new appointment
  create: async (
    appointmentData: Appointment,
  ): Promise<ServiceResponse<Appointment>> => {
    try {
      // Call the repository function to create the appointment
      const createdAppointment =
        await appointmentRepository.create(appointmentData);
      return new ServiceResponse<Appointment>(
        ResponseStatus.Success,
        "Appointment created successfully",
        createdAppointment,
        StatusCodes.CREATED,
      );
    } catch (ex) {
      const errorMessage = `Error creating appointment: ${(ex as Error).message}`;
      logger.error(errorMessage);
      throw new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },

  // Updates an existing appointment
  update: async (
    id: number,
    appointmentData: Appointment,
  ): Promise<ServiceResponse<Appointment | null>> => {
    try {
      // Call the repository function to update the appointment
      const updatedAppointment = await appointmentRepository.update(
        id,
        appointmentData,
      );
      if (!updatedAppointment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Appointment not found",
          null,
          StatusCodes.NOT_FOUND,
        );
      }
      return new ServiceResponse<Appointment>(
        ResponseStatus.Success,
        "Appointment updated successfully",
        updatedAppointment,
        StatusCodes.OK,
      );
    } catch (ex) {
      const errorMessage = `Error updating appointment with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      throw new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },

  // Deletes an existing appointment
  delete: async (id: number): Promise<ServiceResponse<Appointment | null>> => {
    try {
      // Call the repository function to delete the appointment
      const deletedAppointment = await appointmentRepository.delete(id);
      if (!deletedAppointment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Appointment not found",
          null,
          StatusCodes.NOT_FOUND,
        );
      }
      return new ServiceResponse<Appointment>(
        ResponseStatus.Success,
        "Appointment deleted successfully",
        deletedAppointment,
        StatusCodes.OK,
      );
    } catch (ex) {
      const errorMessage = `Error deleting appointment with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      throw new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
};
