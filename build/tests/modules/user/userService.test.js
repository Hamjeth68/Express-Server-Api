"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const userRepository_1 = require("@modules/user/userRepository");
const userService_1 = require("@modules/user/userService");
jest.mock("@modules/user/userRepository");
describe("userService", () => {
    const mockUsers = [
        {
            id: 1,
            name: "Alice",
            email: "alice@example.com",
            age: 42,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: "Bob",
            email: "bob@example.com",
            age: 21,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe("findAll", () => {
        it("return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            userRepository_1.userRepository.findAllAsync.mockReturnValue(mockUsers);
            // Act
            const result = yield userService_1.userService.findAll();
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("Users found");
            expect(result.responseObject).toEqual(mockUsers);
        }));
        it("returns a not found error for no users found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            userRepository_1.userRepository.findAllAsync.mockReturnValue(null);
            // Act
            const result = yield userService_1.userService.findAll();
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("No Users found");
            expect(result.responseObject).toEqual(null);
        }));
        it("handles errors for findAllAsync", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            userRepository_1.userRepository.findAllAsync.mockRejectedValue(new Error("Database error"));
            // Act
            const result = yield userService_1.userService.findAll();
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("Error finding all users");
            expect(result.responseObject).toEqual(null);
        }));
    });
    describe("findById", () => {
        it("returns a user for a valid ID", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testId = 1;
            const mockUser = mockUsers.find((user) => user.id === testId);
            userRepository_1.userRepository.findByIdAsync.mockReturnValue(mockUser);
            // Act
            const result = yield userService_1.userService.findById(testId);
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).toContain("User found");
            expect(result.responseObject).toEqual(mockUser);
        }));
        it("handles errors for findByIdAsync", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testId = 1;
            userRepository_1.userRepository.findByIdAsync.mockRejectedValue(new Error("Database error"));
            // Act
            const result = yield userService_1.userService.findById(testId);
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain(`Error finding user with id ${testId}`);
            expect(result.responseObject).toEqual(null);
        }));
        it("returns a not found error for non-existent ID", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testId = 1;
            userRepository_1.userRepository.findByIdAsync.mockReturnValue(null);
            // Act
            const result = yield userService_1.userService.findById(testId);
            // Assert
            expect(result.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).toContain("User not found");
            expect(result.responseObject).toEqual(null);
        }));
    });
});
