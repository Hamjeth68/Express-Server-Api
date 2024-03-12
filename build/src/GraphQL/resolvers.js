import { AppointmentService } from "../modules/appoinments/appoinmentsService";
const resolvers = {
    Query: {
        getAppointments: () => AppointmentService.getAppointments(),
    },
    Mutation: {
        bookAppointment: (_, { name, email, date, time }) => AppointmentService.bookAppointment(name, email, date, time),
    },
    Appointment: {
        id: (appointment) => appointment.id,
        name: (appointment) => appointment.name,
        email: (appointment) => appointment.email,
        date: (appointment) => appointment.date,
        time: (appointment) => appointment.time,
    },
};
export default resolvers;
