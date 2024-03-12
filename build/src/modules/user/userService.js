import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse, } from "@common/models/serviceResponse";
import { userRepository } from "@modules/user/userRepository";
import { logger } from "@src/server";
export const userService = {
    // Retrieves all users from the database
    findAll: async () => {
        try {
            const users = await userRepository.findAllAsync();
            if (!users) {
                return new ServiceResponse(ResponseStatus.Failed, "No users found", [], StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse(ResponseStatus.Success, "Users found", users, StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding all users: ${ex.message}`;
            logger.error(errorMessage);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, [], StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    // Retrieves a single user by their ID
    findById: async (id) => {
        try {
            const user = await userRepository.findByIdAsync(id);
            if (!user) {
                return new ServiceResponse(ResponseStatus.Failed, "User not found", null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse(ResponseStatus.Success, "User found", user, StatusCodes.OK);
        }
        catch (ex) {
            const errorMessage = `Error finding user with id ${id}:, ${ex.message}`;
            logger.error(errorMessage);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
