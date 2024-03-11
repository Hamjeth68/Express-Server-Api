import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerBase } from 'apollo-server-core'; // Import ApolloServerBase
import resolvers from '@GraphQL/resolvers';
import typeDefs from '@GraphQL/typeDefs';

const server = new ApolloServer({ typeDefs, resolvers });

// Cast server to ApolloServerBase
const testServer = server as unknown as ApolloServerBase;

describe('GraphQL API', () => {
  it('should book a new appointment', async () => {
    const { mutate } = createTestClient(testServer); // Use testServer
    const BOOK_APPOINTMENT = gql`
      mutation BookAppointment($name: String!, $email: String!, $date: String!, $time: String!) {
        bookAppointment(name: $name, email: $email, date: $date, time: $time) {
          id
          name
          email
          date
          time
        }
      }
    `;

    const variables = {
      name: 'John Doe',
      email: 'john@example.com',
      date: '2024-03-15',
      time: '10:00 AM',
    };

    const { data } = await mutate({ mutation: BOOK_APPOINTMENT, variables });
    expect(data.bookAppointment).toBeDefined();
    // Add more assertions as needed
  });

  // Add more integration tests as needed
});
