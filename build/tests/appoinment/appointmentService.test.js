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
Object.defineProperty(exports, "__esModule", { value: true });
const appoinmentsService_1 = require("@src/modules/appoinments/appoinmentsService");
const appoinmentsRepository_1 = require("@src/modules/appoinments/appoinmentsRepository");
const http_status_codes_1 = require("http-status-codes");
describe("Appointment Service", () => {
    const mockAppointmentData = {
        id: 1,
        name: "Appointment 1",
        date: "2022-01-01",
        time: "10:00",
        email: "bQWJi@example.com",
        build: "Build 1",
        whatToBuild: "What to build 1",
        website: "https://example.com",
        contactNumber: "1234567890",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("findAll", () => {
        it("should return a list of appointments", () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.findAllAsync = jest.fn().mockResolvedValue([mockAppointmentData]);
            const result = yield appoinmentsService_1.appointmentService.findAll();
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Appointments found");
            expect(result.responseObject).toEqual([mockAppointmentData]);
        }));
        it("should handle errors when retrieving appointments", () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.findAllAsync = jest.fn().mockRejectedValue(new Error("Database error"));
            const result = yield appoinmentsService_1.appointmentService.findAll();
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("Error finding all appointments");
            expect(result.responseObject).toEqual([]);
        }));
    });
    describe("findById", () => {
        it("should return an appointment for a valid ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.findByIdAsync = jest.fn().mockResolvedValue(mockAppointmentData);
            const result = yield appoinmentsService_1.appointmentService.findById(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Appointment found");
            expect(result.responseObject).toEqual(mockAppointmentData);
        }));
        it("should return a not found error for non-existent ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 999;
            appoinmentsRepository_1.appointmentRepository.findByIdAsync = jest.fn().mockResolvedValue(null);
            const result = yield appoinmentsService_1.appointmentService.findById(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain(`Appointment not found`);
            expect(result.responseObject).toEqual(null);
        }));
        it("should handle errors when retrieving a specific appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.findByIdAsync = jest.fn().mockRejectedValue(new Error("Database error"));
            const result = yield appoinmentsService_1.appointmentService.findById(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain(`Error finding appointment with id ${id}`);
            expect(result.responseObject).toEqual(null);
        }));
    });
    describe("create", () => {
        it("should create a new appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.create = jest.fn().mockResolvedValue(mockAppointmentData);
            const result = yield appoinmentsService_1.appointmentService.create(mockAppointmentData);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.CREATED);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Appointment created successfully");
            expect(result.responseObject).toEqual(mockAppointmentData);
        }));
        it("should handle errors when creating a new appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.create = jest.fn().mockRejectedValue(new Error("Database error"));
            const result = yield appoinmentsService_1.appointmentService.create(mockAppointmentData);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("Error creating appointment");
            expect(result.responseObject).toEqual(null);
        }));
    });
    describe("update", () => {
        it("should update an existing appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.update = jest.fn().mockResolvedValue(mockAppointmentData);
            const result = yield appoinmentsService_1.appointmentService.update(id, mockAppointmentData);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Appointment updated successfully");
            expect(result.responseObject).toEqual(mockAppointmentData);
        }));
        it("should return a not found error when updating a non-existent appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 999;
            appoinmentsRepository_1.appointmentRepository.update = jest.fn().mockResolvedValue(null);
            const result = yield appoinmentsService_1.appointmentService.update(id, mockAppointmentData);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("Appointment not found");
            expect(result.responseObject).toEqual(null);
        }));
        it("should handle errors when updating an appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.update = jest.fn().mockRejectedValue(new Error("Database error"));
            const result = yield appoinmentsService_1.appointmentService.update(id, mockAppointmentData);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain(`Error updating appointment with id ${id}`);
            expect(result.responseObject).toEqual(null);
        }));
    });
    describe("delete", () => {
        it("should delete an existing appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.delete = jest.fn().mockResolvedValue(mockAppointmentData);
            const result = yield appoinmentsService_1.appointmentService.delete(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Appointment deleted successfully");
            expect(result.responseObject).toEqual(mockAppointmentData);
        }));
        it("should return a not found error when deleting a non-existent appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 999;
            appoinmentsRepository_1.appointmentRepository.delete = jest.fn().mockResolvedValue(null);
            const result = yield appoinmentsService_1.appointmentService.delete(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("Appointment not found");
            expect(result.responseObject).toEqual(null);
        }));
        it("should handle errors when deleting an appointment", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            appoinmentsRepository_1.appointmentRepository.delete = jest.fn().mockRejectedValue(new Error("Database error"));
            const result = yield appoinmentsService_1.appointmentService.delete(id);
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain(`Error deleting appointment with id ${id}`);
            expect(result.responseObject).toEqual(null);
        }));
    });
});
