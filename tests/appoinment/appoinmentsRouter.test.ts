import request from "supertest";
import { appointmentRepository } from "@modules/appoinments/appoinmentsRepository";

import express, { Express } from 'express';
import { Appointment } from "@modules/appoinments/appoinmentsModel";
import { appointmentRouter } from "@modules/appoinments/appoinmentsRouter";

jest.mock('@src/modules/appointments/appointmentsRepository');

describe('Appointment Router', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/appointments', appointmentRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /appointments', () => {
    it('should return a list of appointments', async () => {
        // Mock the appointmentRepository methods
      const mockAppointments: Appointment[] = [
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
      (appointmentRepository.findAllAsync as jest.Mock).mockResolvedValue(mockAppointments);

      const response = await request(app).get('/appointments');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it('should handle errors and return 500 status code', async () => {
      (appointmentRepository.findAllAsync as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/appointments');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /appointments/:id', () => {
    it('should return an appointment by id', async () => {
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
      (appointmentRepository.findByIdAsync as jest.Mock).mockResolvedValue(mockAppointment);

      const response = await request(app).get('/appointments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointment);
    });

    it('should handle errors and return 500 status code', async () => {
      (appointmentRepository.findByIdAsync as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/appointments/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });



});
