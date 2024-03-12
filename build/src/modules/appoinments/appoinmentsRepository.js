// import { Appointment } from "@modules/appoinments/appoinmentsModel";
const appointments = [];
export class AppointmentRepository {
    static getAppointments() {
        return appointments;
    }
    static bookAppointment(appointment) {
        appointments.push(appointment);
    }
}
