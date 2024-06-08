import { db } from "../utils/db.server";

export type Trip = {
  uuid: string;
  description: string;
  name: string;
  startDate: Date;
  endDate: Date;
  rating: number;
};

export const createTrip = async (tripData: Trip): Promise<Trip> => {
  try {
    const trip = await db.trip.create({ data: tripData });
    return trip;
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error;
  }
};

export const updateTrip = async (
  tripId: string,
  updatedTripData: Trip
): Promise<Trip> => {
  try {
    const updatedTrip = await db.trip.update({
      where: { uuid: tripId },
      data: updatedTripData,
    });
    return updatedTrip;
  } catch (error) {
    console.error("Error updating trip:", error);
    throw error;
  }
};

export const getTripById = async (tripId: string): Promise<Trip | null> => {
  try {
    const trip = await db.trip.findUnique({ where: { uuid: tripId } });
    return trip;
  } catch (error) {
    console.error("Error getting trip:", error);
    throw error;
  }
};

export const getAllTrips = async (): Promise<Trip[]> => {
  try {
    const trips = await db.trip.findMany();
    return trips;
  } catch (error) {
    console.error("Error getting trips:", error);
    throw error;
  }
};

export const getTripByName = async (name: string): Promise<Trip[]> => {
  try {
    const trips = await db.trip.findMany({
      where: { name: name },
    });
    return trips;
  } catch (error) {
    console.error("Error getting trips by name:", error);
    throw error;
  }
};

export const deleteTripById = async (tripId: string): Promise<void> => {
  try {
    await db.trip.delete({ where: { uuid: tripId } });
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};
