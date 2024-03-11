"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// Sample appointments data (you can replace this with your actual data source)
const appointments = [];
const resolvers = {
    Query: {
        getAppointments: () => appointments,
    },
    Mutation: {
        bookAppointment: (_, { name, email, date, time }) => {
            // Generate a unique ID for the new appointment
            const id = appointments.length + 1;
            // Create the new appointment object
            const newAppointment = {
                id: id.toString(),
                name,
                email,
                date,
                time,
            };
            // Add the new appointment to the appointments array
            appointments.push(newAppointment);
            // Return the newly created appointment
            return newAppointment;
        },
    },
    Appointment: {
        // Resolve the ID field for an appointment
        id: (appointment) => appointment.id,
        // Resolve the name field for an appointment
        name: (appointment) => appointment.name,
        // Resolve the email field for an appointment
        email: (appointment) => appointment.email,
        // Resolve the date field for an appointment
        date: (appointment) => appointment.date,
        // Resolve the time field for an appointment
        time: (appointment) => appointment.time,
    },
};
exports.resolvers = resolvers;
