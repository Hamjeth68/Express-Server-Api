"use strict";
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
    findAllAsync: async () => {
        return exports.users;
    },
    /**
     * Find a user by id asynchronously.
     *
     * @param {number} id - The id of the user to find
     * @return {Promise<User | null>} The found user or null if not found
     */
    findByIdAsync: async (id) => {
        return exports.users.find((user) => user.id === id) || null;
    },
};
