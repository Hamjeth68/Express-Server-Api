"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const envConfig_1 = require("@common/utils/envConfig");
const server_1 = require("@src/server");
const resolvers_1 = require("@GraphQL/resolvers");
(async () => {
    // Define your GraphQL schema and resolvers
    const typeDefs = (0, apollo_server_express_1.gql) `
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
    // Create an Express app and HTTP server
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const corsOrigin = (0, envConfig_1.getCorsOrigin)();
    // Set up Apollo Server
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    // Start the Apollo Server
    await server.start();
    // Use middleware and start the server
    app.use((0, cors_1.default)({ origin: [corsOrigin], credentials: true }));
    server.applyMiddleware({ app });
    const port = (0, envConfig_1.getPort)();
    httpServer.listen({ port }, () => {
        server_1.logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
    // Handle shutdown signals
    const onCloseSignal = () => {
        server_1.logger.info("sigint received, shutting down");
        httpServer.close(() => {
            server_1.logger.info("server closed");
            process.exit();
        });
        setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };
    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
})();
