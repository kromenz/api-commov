import { db } from "../utils/db.server";

type Location = {
  uuid: string;
  name: string;
  description: string;
  typeId: string;
  rating: number;
  latitude: number;
  longitude: number;
};

export const createLocation = async (
  locationData: Location
): Promise<Location> => {
  try {
    const location = await db.location.create({ data: locationData });
    return location;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

export const getLocationById = async (
  locationId: string
): Promise<Location | null> => {
  try {
    const location = await db.location.findUnique({
      where: { uuid: locationId },
    });
    return location;
  } catch (error) {
    console.error("Error getting location:", error);
    throw error;
  }
};

export const getAllLocations = async (): Promise<Location[]> => {
  try {
    const locations = await db.location.findMany();
    return locations;
  } catch (error) {
    console.error("Error getting locations:", error);
    throw error;
  }
};

export const updateLocation = async (
  locationId: string,
  updatedLocationData: Partial<Location>
): Promise<Location | null> => {
  try {
    const updatedLocation = await db.location.update({
      where: { uuid: locationId },
      data: updatedLocationData,
    });
    return updatedLocation;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

export const deleteLocation = async (locationId: string): Promise<void> => {
  try {
    await db.location.delete({ where: { uuid: locationId } });
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
};
