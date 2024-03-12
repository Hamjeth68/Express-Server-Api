import { AppointmentService } from "../modules/appoinments/appoinmentsService";

const resolvers = {
  Query: {
    getAppointments: () => AppointmentService.getAppointments(),
  },
  Mutation: {
    bookAppointment: (_: any, { name, email, date, time }: any) =>
      AppointmentService.bookAppointment(name, email, date, time),
  },
  Appointment: {
    id: (appointment: any) => appointment.id,
    name: (appointment: any) => appointment.name,
    email: (appointment: any) => appointment.email,
    date: (appointment: any) => appointment.date,
    time: (appointment: any) => appointment.time,
  },
};

export default resolvers;
