// src/GraphQL/resolvers.ts
const appointments: { id: string; name: any; email: any; date: any; time: any; }[] = [];

const resolvers = {
  Query: {
    getAppointments: () => appointments,
  },
  Mutation: {
    bookAppointment: async (_: any, { name, email, date, time }: any) => {
      // Generate a unique ID for the new appointment
      const id = await (async () => appointments.length + 1)();
      
      // Create the new appointment object
      const newAppointment = {
        id: id.toString(),
        name,
        email,
        date,
        time
      };
      
      // Add the new appointment to the appointments array
      await (async () => appointments.push(newAppointment))();
      
      // Return the newly created appointment
      return newAppointment;
    }

  },
  Appointment: {
    // Resolve the ID field for an appointment
    id: (appointment: { id: any; }) => appointment.id,
    // Resolve the name field for an appointment
    name: (appointment: { name: any; }) => appointment.name,
    // Resolve the email field for an appointment
    email: (appointment: { email: any; }) => appointment.email,
    // Resolve the date field for an appointment
    date: (appointment: { date: any; }) => appointment.date,
    // Resolve the time field for an appointment
    time: (appointment: { time: any; }) => appointment.time,
  }
};

export {  resolvers };
