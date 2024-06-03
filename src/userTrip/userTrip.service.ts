import { db } from "../utils/db.server";
import { Trip } from "../trip/trip.service";
import { User } from "@prisma/client";

type UserTripData = {
  userId: string;
  tripId: string;
};

export const tripsByUser = async (userId: string): Promise<Trip[]> => {
  try {
    const userTrips = await db.userTrip.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
      select: {
        trip: true,
      },
    });

    const trips: Trip[] = userTrips.map((userTrip) => userTrip.trip);

    return trips;
  } catch (error) {
    console.error("Error mapping trips by user ID:", error);
    throw error;
  }
};

export const userExists = async (userId: string): Promise<boolean> => {
  try {
    const user = await db.user.findUnique({
      where: {
        uuid: userId,
      },
    });
    return !!user;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw error;
  }
};

export const getUsersByTrip = async (tripId: string): Promise<User[]> => {
  try {
    const userTrips = await db.userTrip.findMany({
      where: {
        tripId: {
          equals: tripId,
        },
      },
      select: {
        user: true,
      },
    });

    const users: User[] = userTrips.map((userTrip) => userTrip.user);

    return users;
  } catch (error) {
    console.error("Error fetching users by trip ID:", error);
    throw error;
  }
};

export const getAllUserTrips = async (): Promise<UserTripData[]> => {
  try {
    const userTrips = await db.userTrip.findMany();
    return userTrips.map(({ userId, tripId }) => ({ userId, tripId }));
  } catch (error) {
    console.error("Error getting userTrips:", error);
    throw error;
  }
};

export const createUserTrip = async (
  userId: string,
  tripId: string
): Promise<UserTripData> => {
  try {
    const createdUserTrip = await db.userTrip.create({
      data: {
        userId,
        tripId,
      },
    });
    return createdUserTrip;
  } catch (error) {
    console.error("Error creating userTrip:", error);
    throw error;
  }
};

export const deleteUserTrip = async (
  userId: string,
  tripId: string
): Promise<void> => {
  try {
    await db.userTrip.deleteMany({
      where: {
        userId,
        tripId,
      },
    });
  } catch (error) {
    console.error("Error deleting userTrip:", error);
    throw error;
  }
};

export const deleteUserTripsByTrip = async (tripId: string): Promise<void> => {
  try {
    await db.userTrip.deleteMany({
      where: {
        tripId,
      },
    });
  } catch (error) {
    console.error("Error deleting userTrips by trip:", error);
    throw error;
  }
};
