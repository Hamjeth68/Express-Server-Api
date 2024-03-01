import { User } from "@modules/user/userModel";

export const users: User[] = [
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

export const userRepository = {
  /**
   * Asynchronously finds all users.
   *
   * @return {Promise<User[]>} the list of users
   */
  findAllAsync: async (): Promise<User[]> => {
    return users;
  },

  /**
   * Find a user by id asynchronously.
   *
   * @param {number} id - The id of the user to find
   * @return {Promise<User | null>} The found user or null if not found
   */
  findByIdAsync: async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },
};
