import { AppointmentService } from "../../src/modules/appoinments/appoinmentsService";

describe("AppointmentService", () => {
  it("should return an array of appointments", () => {
    const appointments = AppointmentService.getAppointments();
    expect(appointments).toBeInstanceOf(Array);
  });

  it("should book a new appointment", () => {
    const appointment = AppointmentService.bookAppointment(
      "John Doe",
      "john@example.com",
      "2024-03-15",
      "10:00 AM",
    );
    expect(appointment).toBeDefined();
    // Add more assertions as needed
  });
});
