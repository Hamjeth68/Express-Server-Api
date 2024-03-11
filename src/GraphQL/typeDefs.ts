import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getAppointments: [Appointment!]!
  }

  type Mutation {
    bookAppointment(
      name: String!
      email: String!
      date: String!
      time: String!
    ): Appointment!
  }

  type Appointment {
    id: ID!
    name: String!
    email: String!
    date: String!
    time: String!
  }
`;

export default typeDefs;
