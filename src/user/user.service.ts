import { db } from "../utils/db.server";

type User = {
  uuid: string;
  firstName: string;
  email: string;
  username: string;
  lastName: string;
  type: boolean;
  password: string;
};

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

export const getUser = async (email: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

// export const updateUser = async (
//   user: Omit<User, "email">,
//   email: string
// ): Promise<User> => {
//   const { firstName, username } = user;
//   return db.user.update({
//     where: {
//       email,
//     },
//     data: {
//       firstName,
//       username,
//     },
//     select: {
//       uuid: true,
//       firstName: true,
//       username: true,
//     },
//   });
// };
