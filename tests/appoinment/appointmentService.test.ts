import { appointmentService } from "@src/modules/appoinments/appoinmentsService";
import { appointmentRepository } from "@src/modules/appoinments/appoinmentsRepository";
import { StatusCodes } from "http-status-codes";

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
    it("should return a list of appointments", async () => {
      appointmentRepository.findAllAsync = jest.fn().mockResolvedValue([mockAppointmentData]);

      const result = await appointmentService.findAll();

      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Appointments found");
      expect(result.responseObject).toEqual([mockAppointmentData]);
    });

    it("should handle errors when retrieving appointments", async () => {
      appointmentRepository.findAllAsync = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await appointmentService.findAll();

      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Error finding all appointments");
      expect(result.responseObject).toEqual([]);
    });
  });

  describe("findById", () => {
    it("should return an appointment for a valid ID", async () => {
      const id = 1;
      appointmentRepository.findByIdAsync = jest.fn().mockResolvedValue(mockAppointmentData);

      const result = await appointmentService.findById(id);

      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Appointment found");
      expect(result.responseObject).toEqual(mockAppointmentData);
    });

    it("should return a not found error for non-existent ID", async () => {
      const id = 999;
      appointmentRepository.findByIdAsync = jest.fn().mockResolvedValue(null);

      const result = await appointmentService.findById(id);

      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Appointment not found`);
      expect(result.responseObject).toEqual(null);
    });

    it("should handle errors when retrieving a specific appointment", async () => {
      const id = 1;
      appointmentRepository.findByIdAsync = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await appointmentService.findById(id);

      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error finding appointment with id ${id}`);
      expect(result.responseObject).toEqual(null);
    });
  });

  describe("create", () => {
    it("should create a new appointment", async () => {
      appointmentRepository.create = jest.fn().mockResolvedValue(mockAppointmentData);

      const result = await appointmentService.create(mockAppointmentData);

      expect(result.statusCode).toEqual(StatusCodes.CREATED);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Appointment created successfully");
      expect(result.responseObject).toEqual(mockAppointmentData);
    });

    it("should handle errors when creating a new appointment", async () => {
      appointmentRepository.create = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await appointmentService.create(mockAppointmentData);

      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Error creating appointment");
      expect(result.responseObject).toEqual(null);
    });
  });

  describe("update", () => {
    it("should update an existing appointment", async () => {
      const id = 1;
      appointmentRepository.update = jest.fn().mockResolvedValue(mockAppointmentData);

      const result = await appointmentService.update(id, mockAppointmentData);

      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Appointment updated successfully");
      expect(result.responseObject).toEqual(mockAppointmentData);
    });

    it("should return a not found error when updating a non-existent appointment", async () => {
      const id = 999;
      appointmentRepository.update = jest.fn().mockResolvedValue(null);

      const result = await appointmentService.update(id, mockAppointmentData);

      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Appointment not found");
      expect(result.responseObject).toEqual(null);
    });

    it("should handle errors when updating an appointment", async () => {
      const id = 1;
      appointmentRepository.update = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await appointmentService.update(id, mockAppointmentData);

      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error updating appointment with id ${id}`);
      expect(result.responseObject).toEqual(null);
    });
  });

  describe("delete", () => {
    it("should delete an existing appointment", async () => {
      const id = 1;
      appointmentRepository.delete = jest.fn().mockResolvedValue(mockAppointmentData);

      const result = await appointmentService.delete(id);

      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Appointment deleted successfully");
      expect(result.responseObject).toEqual(mockAppointmentData);
    });

    it("should return a not found error when deleting a non-existent appointment", async () => {
      const id = 999;
      appointmentRepository.delete = jest.fn().mockResolvedValue(null);

      const result = await appointmentService.delete(id);

      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Appointment not found");
      expect(result.responseObject).toEqual(null);
    });

    it("should handle errors when deleting an appointment", async () => {
      const id = 1;
      appointmentRepository.delete = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await appointmentService.delete(id);

      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error deleting appointment with id ${id}`);
      expect(result.responseObject).toEqual(null);
    });
  });
});