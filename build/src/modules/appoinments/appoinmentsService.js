"use strict";
// appointmentsService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const serviceResponse_1 = require("@common/models/serviceResponse");
const appoinmentsRepository_1 = require("@src/modules/appoinments/appoinmentsRepository");
const server_1 = require("@src/server");
// Define the appointment service object
exports.appointmentService = {
    // Retrieves all appointments from the database
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appointments = yield appoinmentsRepository_1.appointmentRepository.findAllAsync();
            if (!appointments || appointments.length === 0) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "No appointments found", [], http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Appointments found", appointments, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding all appointments: ${ex.message}`;
            server_1.logger.error(errorMessage);
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, [], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    // Retrieves a single appointment by its ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appointment = yield appoinmentsRepository_1.appointmentRepository.findByIdAsync(id);
            if (!appointment) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "Appointment not found", null, http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Appointment found", appointment, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding appointment with id ${id}: ${ex.message}`;
            server_1.logger.error(errorMessage);
            throw new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    // Creates a new appointment
    create: (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Call the repository function to create the appointment
            const createdAppointment = yield appoinmentsRepository_1.appointmentRepository.create(appointmentData);
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Appointment created successfully", createdAppointment, http_status_codes_1.StatusCodes.CREATED);
        }
        catch (ex) {
            const errorMessage = `Error creating appointment: ${ex.message}`;
            server_1.logger.error(errorMessage);
            throw new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    // Updates an existing appointment
    update: (id, appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Call the repository function to update the appointment
            const updatedAppointment = yield appoinmentsRepository_1.appointmentRepository.update(id, appointmentData);
            if (!updatedAppointment) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "Appointment not found", null, http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Appointment updated successfully", updatedAppointment, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error updating appointment with id ${id}: ${ex.message}`;
            server_1.logger.error(errorMessage);
            throw new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    // Deletes an existing appointment
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Call the repository function to delete the appointment
            const deletedAppointment = yield appoinmentsRepository_1.appointmentRepository.delete(id);
            if (!deletedAppointment) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "Appointment not found", null, http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Appointment deleted successfully", deletedAppointment, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error deleting appointment with id ${id}: ${ex.message}`;
            server_1.logger.error(errorMessage);
            throw new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
};
