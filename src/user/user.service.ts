import { db } from "../utils/db.server";
import { hashPassword, dehashPassword } from "../utils/password";

type User = {
  email: string;
  uuid: string;
  firstName: string;
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

export const verifyUserPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const user = await getUser(email);

    if (!user) {
      return false;
    }

    const isMatch = await dehashPassword(user.password, password);

    return isMatch;
  } catch (error) {
    console.error("Error verifying user password:", error);
    throw error;
  }
};

// Update user password by email
export const updateUserPassword = async (
  email: string,
  newPassword: string
): Promise<User | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return null;
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
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

// Update user
export const updateUser = async (
  uuid: string,
  userData: Partial<User>
): Promise<User | null> => {
  try {
    const updatedUser = await db.user.update({
      where: { uuid },
      data: userData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
