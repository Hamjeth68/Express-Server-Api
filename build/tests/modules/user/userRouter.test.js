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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const userRepository_1 = require("@modules/user/userRepository");
const server_1 = require("@src/server");
describe('User API Endpoints', () => {
    describe('GET /users', () => {
        it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            // Act
            const response = yield (0, supertest_1.default)(server_1.app).get('/users');
            const responseBody = response.body;
            // Assert
            expect(response.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain('Users found');
            expect(responseBody.responseObject.length).toEqual(userRepository_1.users.length);
            responseBody.responseObject.forEach((user, index) => compareUsers(userRepository_1.users[index], user));
        }));
    });
    describe('GET /users/:id', () => {
        it('should return a user for a valid ID', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testId = 1;
            const expectedUser = userRepository_1.users.find((user) => user.id === testId);
            // Act
            const response = yield (0, supertest_1.default)(server_1.app).get(`/users/${testId}`);
            const responseBody = response.body;
            // Assert
            expect(response.statusCode).toEqual(http_status_codes_1.StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain('User found');
            if (!expectedUser)
                fail('Expected user not found in test data');
            compareUsers(expectedUser, responseBody.responseObject);
        }));
        it('should return a not found error for non-existent ID', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testId = Number.MAX_SAFE_INTEGER;
            // Act
            const response = yield (0, supertest_1.default)(server_1.app).get(`/users/${testId}`);
            const responseBody = response.body;
            // Assert
            expect(response.statusCode).toEqual(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(responseBody.success).toBeFalsy();
            expect(responseBody.message).toContain('User not found');
            expect(responseBody.responseObject).toEqual(null);
        }));
        it('should return a bad request for invalid ID format', () => __awaiter(void 0, void 0, void 0, function* () {
            // Act
            const invalidInput = 'abc';
            const response = yield (0, supertest_1.default)(server_1.app).get(`/users/${invalidInput}`);
            const responseBody = response.body;
            // Assert
            expect(response.statusCode).toEqual(http_status_codes_1.StatusCodes.BAD_REQUEST);
            expect(responseBody.success).toBeFalsy();
            expect(responseBody.message).toContain('Invalid input');
            expect(responseBody.responseObject).toEqual(null);
        }));
    });
});
function compareUsers(mockUser, responseUser) {
    if (!mockUser || !responseUser) {
        fail('Invalid test data: mockUser or responseUser is undefined');
    }
    expect(responseUser.id).toEqual(mockUser.id);
    expect(responseUser.name).toEqual(mockUser.name);
    expect(responseUser.email).toEqual(mockUser.email);
    expect(responseUser.age).toEqual(mockUser.age);
    expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
    expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}
