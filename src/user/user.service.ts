import { db } from "../utils/db.server";
import { hashPassword } from "../utils/password";

type User = {
  uuid: string;
  firstName: string;
  email: string;
  username: string;
  lastName: string;
  type: boolean;
  password: string;
};

//get all users
export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      uuid: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      type: true,
      password: true,
    },
  });
};

//get user by email
export const getUser = async (email: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

//create user
export const createUser = async (userData: User): Promise<User> => {
  try {
    const hashedPassword = await hashPassword(userData.password);

    const newUser = await db.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user by email
export const updateUser = async (
  email: string,
  userData: User
): Promise<User | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return null; // User not found
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: userData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Re-throw error for proper handling in the router
  }
};
