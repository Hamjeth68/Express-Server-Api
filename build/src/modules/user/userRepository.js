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
exports.userRepository = exports.users = void 0;
exports.users = [
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
exports.userRepository = {
    /**
     * Asynchronously finds all users.
     *
     * @return {Promise<User[]>} the list of users
     */
    findAllAsync: () => __awaiter(void 0, void 0, void 0, function* () {
        return exports.users;
    }),
    /**
     * Find a user by id asynchronously.
     *
     * @param {number} id - The id of the user to find
     * @return {Promise<User | null>} The found user or null if not found
     */
    findByIdAsync: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return exports.users.find((user) => user.id === id) || null;
    }),
};
