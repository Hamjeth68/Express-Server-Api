import request from "supertest";

import express, { Express } from "express";
import { Appointment } from "@modules/appoinments/appoinmentsModel";
import { appointmentRouter } from "@modules/appoinments/appoinmentsRouter";
import { appointmentRepository } from "@modules/appoinments/appoinmentsRepository";

jest.mock("@modules/appointments/appointmentsRepository");

describe("Appointment Router", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/appointments", appointmentRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const mockAppointment: Appointment = {
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

  (appointmentRepository.create as jest.Mock).mockResolvedValue(
    mockAppointment,
  );

  describe("POST /appointments", () => {
    it("should create a new appointment", async () => {
      // Send request
      const response = await request(app)
        .post("/appointments")
        .send(mockAppointment);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockAppointment);
    });

    it("should handle errors and return 500 status code", async () => {
      // Mock error
      (appointmentRepository.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      // Send request
      const response = await request(app)
        .post("/appointments")
        .send(mockAppointment);

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /appointments", () => {
    it("should return a list of appointments", async () => {
      // Mock data
      const mockAppointments: Appointment[] = [
        {
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
        },
        {
          id: 2,
          name: "Appointment 2",
          date: "2022-01-02",
          time: "11:00",
          email: "bQWJi@example.com",
          build: "Build 2",
          whatToBuild: "What to build 2",
          website: "https://example.com",
          contactNumber: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (appointmentRepository.findAllAsync as jest.Mock).mockResolvedValue(
        mockAppointments,
      );

      // Send request
      const response = await request(app).get("/appointments");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it("should handle errors and return 500 status code", async () => {
      // Mock error
      (appointmentRepository.findAllAsync as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      // Send request
      const response = await request(app).get("/appointments");

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("PUT /appointments/:id", () => {
    it("should update an existing appointment", async () => {
      // Mock data
      const updatedAppointment: Appointment = {
        id: 1,
        name: "Updated Appointment",
        date: "2022-01-04",
        time: "13:00",
        email: "updated@example.com",
        build: "Updated Build",
        whatToBuild: "Updated build details",
        website: "https://example.com",
        contactNumber: "9999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (appointmentRepository.update as jest.Mock).mockResolvedValue(
        updatedAppointment,
      );

      // Send request
      const response = await request(app)
        .put("/appointments/1")
        .send(updatedAppointment);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedAppointment);
    });

    it("should handle errors and return 500 status code", async () => {
      // Mock error
      (appointmentRepository.update as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      // Send request
      const response = await request(app).put("/appointments/1").send({
        name: "Updated Appointment",
        date: "2022-01-04",
        time: "13:00",
        email: "updated@example.com",
        build: "Updated Build",
        whatToBuild: "Updated build details",
        website: "https://example.com",
        contactNumber: "9999999999",
      });

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("DELETE /appointments/:id", () => {
    it("should delete an existing appointment", async () => {
      // Mock data
      const deletedAppointment: Appointment = {
        id: 1,
        name: "Deleted Appointment",
        date: "2022-01-01",
        time: "10:00",
        email: "deleted@example.com",
        build: "Deleted Build",
        whatToBuild: "Deleted build details",
        website: "https://example.com",
        contactNumber: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (appointmentRepository.delete as jest.Mock).mockResolvedValue(
        deletedAppointment,
      );

      // Send request
      const response = await request(app).delete("/appointments/1");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedAppointment);
    });

    it("should handle errors and return 500 status code", async () => {
      // Mock error
      (appointmentRepository.delete as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      // Send request
      const response = await request(app).delete("/appointments/1");

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
