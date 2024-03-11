"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_codes_1 = require("http-status-codes");
const serviceResponse_1 = require("@common/models/serviceResponse");
const userRepository_1 = require("@modules/user/userRepository");
const server_1 = require("@src/server");
exports.userService = {
    // Retrieves all users from the database
    findAll: async () => {
        try {
            const users = await userRepository_1.userRepository.findAllAsync();
            if (!users) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "No users found", [], http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "Users found", users, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding all users: ${ex.message}`;
            server_1.logger.error(errorMessage);
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, [], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    // Retrieves a single user by their ID
    findById: async (id) => {
        try {
            const user = await userRepository_1.userRepository.findByIdAsync(id);
            if (!user) {
                return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, "User not found", null, http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Success, "User found", user, http_status_codes_1.StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding user with id ${id}:, ${ex.message}`;
            server_1.logger.error(errorMessage);
            return new serviceResponse_1.ServiceResponse(serviceResponse_1.ResponseStatus.Failed, errorMessage, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
