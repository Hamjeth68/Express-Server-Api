"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const appoinmentsRouter_1 = require("@modules/appoinments/appoinmentsRouter");
const appoinmentsRepository_1 = require("@modules/appoinments/appoinmentsRepository");
jest.mock("@modules/appointments/appointmentsRepository");
describe("Appointment Router", () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use("/appointments", appoinmentsRouter_1.appointmentRouter);
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
    const mockAppointment = {
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
    appoinmentsRepository_1.appointmentRepository.create.mockResolvedValue(mockAppointment);
    describe("POST /appointments", () => {
        it("should create a new appointment", async () => {
            // Send request
            const response = await (0, supertest_1.default)(app)
                .post("/appointments")
                .send(mockAppointment);
            // Assertions
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockAppointment);
        });
        it("should handle errors and return 500 status code", async () => {
            // Mock error
            appoinmentsRepository_1.appointmentRepository.create.mockRejectedValue(new Error("Database error"));
            // Send request
            const response = await (0, supertest_1.default)(app)
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
            const mockAppointments = [
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
            appoinmentsRepository_1.appointmentRepository.findAllAsync.mockResolvedValue(mockAppointments);
            // Send request
            const response = await (0, supertest_1.default)(app).get("/appointments");
            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAppointments);
        });
        it("should handle errors and return 500 status code", async () => {
            // Mock error
            appoinmentsRepository_1.appointmentRepository.findAllAsync.mockRejectedValue(new Error("Database error"));
            // Send request
            const response = await (0, supertest_1.default)(app).get("/appointments");
            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });
    describe("PUT /appointments/:id", () => {
        it("should update an existing appointment", async () => {
            // Mock data
            const updatedAppointment = {
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
            appoinmentsRepository_1.appointmentRepository.update.mockResolvedValue(updatedAppointment);
            // Send request
            const response = await (0, supertest_1.default)(app)
                .put("/appointments/1")
                .send(updatedAppointment);
            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedAppointment);
        });
        it("should handle errors and return 500 status code", async () => {
            // Mock error
            appoinmentsRepository_1.appointmentRepository.update.mockRejectedValue(new Error("Database error"));
            // Send request
            const response = await (0, supertest_1.default)(app).put("/appointments/1").send({
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
            const deletedAppointment = {
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
            appoinmentsRepository_1.appointmentRepository.delete.mockResolvedValue(deletedAppointment);
            // Send request
            const response = await (0, supertest_1.default)(app).delete("/appointments/1");
            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(deletedAppointment);
        });
        it("should handle errors and return 500 status code", async () => {
            // Mock error
            appoinmentsRepository_1.appointmentRepository.delete.mockRejectedValue(new Error("Database error"));
            // Send request
            const response = await (0, supertest_1.default)(app).delete("/appointments/1");
            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });
});
