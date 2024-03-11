import { Appointment } from "@modules/appoinments/appoinmentsModel";

// Array to store appointments
const appointments: Appointment[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    date: "2024-03-01",
    time: "10:00",
    build: "New project",
    whatToBuild: "Website",
    website: "https://example.com",
    contactNumber: "1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    date: "2024-03-02",
    time: "11:00",
    build: "Redesign",
    whatToBuild: "Mobile app",
    website: "https://example.com",
    contactNumber: "0987654321",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const appointmentRepository = {
  /**
   * Asynchronously finds all appointments.
   *
   * @return {Promise<Appointment[]>} the list of appointments
   */
  findAllAsync: async (): Promise<Appointment[]> => appointments,

  /**
   * Find an appointment by id asynchronously.
   *
   * @param {number} id - The id of the appointment to find
   * @return {Promise<Appointment | null>} The found appointment or null if not found
   */
  findByIdAsync: async (id: number): Promise<Appointment | null> => {
    try {
      const appointment = appointments.find(
        (appointment) => appointment.id === id,
      );
      return appointment || null;
    } catch (error) {
      console.error("Error finding appointment by id:", error);
      return null;
    }
  },

  /**
   * Create a new appointment.
   *
   * @param {Appointment} appointmentData - The appointment data to be created
   * @return {Promise<Appointment>} The created appointment
   */
  create: async (appointmentData: Appointment): Promise<Appointment> => {
    const newId =
      appointments.length === 0
        ? 1
        : Math.max(...appointments.map(({ id }) => id)) + 1;
    const newAppointment: Appointment = {
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: newId,
    };
    appointments.push(newAppointment);
    return newAppointment;
  },

  /**
   * Update an existing appointment.
   *
   * @param {number} id - The id of the appointment to update
   * @param {Appointment} appointmentData - The updated appointment data
   * @return {Promise<Appointment | null>} The updated appointment or null if not found
   */
  update: async (
    id: number,
    appointmentData: Appointment,
  ): Promise<Appointment | null> => {
    try {
      const existingAppointmentIndex = appointments.findIndex(
        (appointment) => appointment.id === id,
      );
      if (existingAppointmentIndex !== -1) {
        const updatedAppointment: Appointment = {
          ...appointments[existingAppointmentIndex],
          ...appointmentData,
          updatedAt: new Date(),
        };
        appointments[existingAppointmentIndex] = updatedAppointment;
        return updatedAppointment;
      }
      return null;
    } catch (error) {
      console.error("Error updating appointment:", error);
      return null;
    }
  },

  /**
   * Delete an appointment by id.
   *
   * @param {number} id - The id of the appointment to delete
   * @return {Promise<Appointment | null>} The deleted appointment or null if not found
   */
  delete: async (id: number): Promise<Appointment | null> => {
    try {
      const filteredAppointments = appointments.filter(
        (appointment) => appointment.id !== id,
      );
      if (filteredAppointments.length < appointments.length) {
        appointments.splice(0, appointments.length, ...filteredAppointments);
        return (
          appointments.find((appointment) => appointment.id === id) || null
        );
      }
      return null;
    } catch (error) {
      console.error("Error deleting appointment:", error);
      return null;
    }
  },

  /**
   * Find an appointment by email asynchronously.
   *
   * @param {string} email - The email of the appointment to find
   * @return {Promise<Appointment | null>} The found appointment or null if not found
   */
  findByEmailAsync: async (email: string): Promise<Appointment | null> => {
    try {
      const appointment = appointments.find(
        (appointment) => appointment.email === email,
      );
      return appointment || null;
    } catch (error) {
      console.error("Error finding appointment by email:", error);
      return null;
    }
  },

  /**
   * Find an appointment by date asynchronously.
   *
   * @param {string} date - The date of the appointment to find
   * @return {Promise<Appointment | null>} The found appointment or null if not found
   */
  findByDateAsync: async (date: string): Promise<Appointment | null> => {
    try {
      const appointment = appointments.find(
        (appointment) => appointment.date === date,
      );
      return appointment || null;
    } catch (error) {
      console.error("Error finding appointment by date:", error);
      return null;
    }
  },

  /**
   * Find an appointment by time asynchronously.
   *
   * @param {string} time - The time of the appointment to find
   * @return {Promise<Appointment | null>} The found appointment or null if not found
   */
  findByTimeAsync: async (time: string): Promise<Appointment | null> => {
    try {
      const appointment = appointments.find(
        (appointment) => appointment.time === time,
      );
      return appointment || null;
    } catch (error) {
      console.error("Error finding appointment by time:", error);
      return null;
    }
  },
};
