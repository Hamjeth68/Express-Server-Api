import express from "express";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import http from "http";
import pinoHttp from "pino-http";
import typeDefs from "@GraphQL/typeDefs";
import resolvers from "@GraphQL/resolvers";
import { getPort } from "@common/utils/envConfig";
import { logger } from "./server";

const app = express();

// Create a pino-http logger middleware
app.use(pinoHttp());

/**
 * Start the GraphQL server
 *
 * @param {express.Application} app The express application
 * @param {import("apollo-server-express").ApolloServer} server The Apollo Server
 * @returns {Promise<void>} A promise that resolves when the server is ready
 */
const startServer = async (
  app: express.Application,
  server: ApolloServer<ExpressContext>,
) => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    const port = getPort();

    httpServer.listen(port, () => {
      logger.info(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });

    const onCloseSignal = () => {
      logger.info("SIGINT/SIGTERM received, shutting down");
      httpServer.close(() => {
        logger.info("Server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
    logger.error("Error starting Apollo Server:", error);
    process.exit(1);
    
    
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
startServer(app, server).catch((error) => {
  console.error("Error starting Apollo Server:", error);
  logger.error("Error starting Apollo Server:", error);
  process.exit(1);
  
});

export default server;
