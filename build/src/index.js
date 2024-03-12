// import { ApolloServer, gql } from "apollo-server-express";
// import express from "express";
// import http from "http";
// import cors from "cors";
// import { getCorsOrigin, getPort } from "@common/utils/envConfig";
// import { logger } from "@src/server";
// import { resolvers } from "@GraphQL/resolvers";
// (async () => {
//   // Define your GraphQL schema and resolvers
//   const typeDefs = gql`
//     type Query {
//       getAppointments: [Appointment!]!
//     }
//     type Mutation {
//       bookAppointment(
//         name: String!
//         email: String!
//         date: String!
//         time: String!
//       ): Appointment!
//     }
//     type Appointment {
//       id: ID!
//       name: String!
//       email: String!
//       date: String!
//       time: String!
//     }
//   `;
//   // Create an Express app and HTTP server
//   const app = express();
//   const httpServer = http.createServer(app);
//   const corsOrigin = getCorsOrigin();
//   // Set up Apollo Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   // Start the Apollo Server
//   await server.start();
//   // Use middleware and start the server
//   app.use(cors({ origin: [corsOrigin], credentials: true }));
//   server.applyMiddleware({ app });
//   const port = getPort();
//   httpServer.listen({ port }, () => {
//     logger.info(
//       `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
//     );
//   });
//   // Handle shutdown signals
//   const onCloseSignal = () => {
//     logger.info("sigint received, shutting down");
//     httpServer.close(() => {
//       logger.info("server closed");
//       process.exit();
//     });
//     setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
//   };
//   process.on("SIGINT", onCloseSignal);
//   process.on("SIGTERM", onCloseSignal);
// })();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import pinoHttp from "pino-http";
import typeDefs from "@GraphQL/typeDefs";
import resolvers from "@GraphQL/resolvers";
const app = express();
// Create a pino-http logger middleware
app.use(pinoHttp());
const server = new ApolloServer({ typeDefs, resolvers });
server
    .start()
    .then(() => {
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
})
    .catch((error) => {
    console.error("Error starting Apollo Server:", error);
});
