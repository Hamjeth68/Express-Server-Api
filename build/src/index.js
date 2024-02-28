"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = require("@common/utils/envConfig");
const server_1 = require("@src/server");
const port = (0, envConfig_1.getPort)();
const server = server_1.app.listen(port, () => {
    server_1.logger.info(`Server listening on port ${port}`);
});
const onCloseSignal = () => {
    server_1.logger.info('sigint received, shutting down');
    server.close(() => {
        server_1.logger.info('server closed');
        process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};
process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
