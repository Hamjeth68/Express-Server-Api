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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const appoinmentsRepository_1 = require("@modules/appoinments/appoinmentsRepository");
const express_1 = __importDefault(require("express"));
const appoinmentsRouter_1 = require("@modules/appoinments/appoinmentsRouter");
jest.mock('@src/modules/appointments/appointmentsRepository');
describe('Appointment Router', () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/appointments', appoinmentsRouter_1.appointmentRouter);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('GET /appointments', () => {
        it('should return a list of appointments', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock the appointmentRepository methods
            const mockAppointments = [
                { id: 1,
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
                { id: 2,
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
            const response = yield (0, supertest_1.default)(app).get('/appointments');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAppointments);
        }));
        it('should handle errors and return 500 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.findAllAsync.mockRejectedValue(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app).get('/appointments');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        }));
    });
    describe('GET /appointments/:id', () => {
        it('should return an appointment by id', () => __awaiter(void 0, void 0, void 0, function* () {
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
            appoinmentsRepository_1.appointmentRepository.findByIdAsync.mockResolvedValue(mockAppointment);
            const response = yield (0, supertest_1.default)(app).get('/appointments/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAppointment);
        }));
        it('should handle errors and return 500 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            appoinmentsRepository_1.appointmentRepository.findByIdAsync.mockRejectedValue(new Error('Database error'));
            const response = yield (0, supertest_1.default)(app).get('/appointments/1');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        }));
    });
});
