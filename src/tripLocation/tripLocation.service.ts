import { Location } from "@prisma/client";
import { db } from "../utils/db.server";

export type TripLocation = {
  tripId: string;
  locationId: string;
};

export const createTripLocation = async (
  tripId: string,
  locationId: string
): Promise<TripLocation> => {
  try {
    const newTripLocation = await db.tripLocation.create({
      data: {
        tripId,
        locationId,
      },
    });
    return newTripLocation;
  } catch (error) {
    console.error("Error creating trip location:", error);
    throw error;
  }
};

export const getTripLocationByIds = async (
  tripId: string,
  locationId: string
): Promise<TripLocation | null> => {
  try {
    const tripLocation = await db.tripLocation.findUnique({
      where: { tripId_locationId: { tripId, locationId } },
    });
    return tripLocation;
  } catch (error) {
    console.error("Error getting trip location by IDs:", error);
    throw error;
  }
};

export const getAllTripLocations = async (): Promise<TripLocation[]> => {
  try {
    const allTripLocations = await db.tripLocation.findMany();
    return allTripLocations;
  } catch (error) {
    console.error("Error getting all trip locations:", error);
    throw error;
  }
};

export const getLocationsByTripId = async (
  tripId: string
): Promise<Location[]> => {
  try {
    const tripLocations = await db.tripLocation.findMany({
      where: {
        tripId: {
          equals: tripId,
        },
      },
      select: {
        location: true,
      },
    });

    const locations: Location[] = tripLocations.map(
      (tripLocation) => tripLocation.location
    );

    return locations;
  } catch (error) {
    console.error("Error getting locations by trip ID:", error);
    throw error;
  }
};

export const deleteTripLocationByIds = async (
  tripId: string,
  locationId: string
): Promise<void> => {
  try {
    await db.tripLocation.delete({
      where: { tripId_locationId: { tripId, locationId } },
    });
  } catch (error) {
    console.error("Error deleting trip location by IDs:", error);
    throw error;
  }
};
